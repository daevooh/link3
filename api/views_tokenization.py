from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets
from rest_framework.decorators import action, api_view, permission_classes
from decimal import Decimal
import uuid
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from tokenization.models import TokenizationRule, Interaction, ActionType
from tokenization.engine import TokenizationEngine
from users.models import Project, AppUser
from .authentication import APIKeyAuthentication
from .serializers import TokenizationRuleSerializer
from api.schema import tokenization_rule_request

import logging

logger = logging.getLogger('django')

from blockchain.models import TokenCreationRequest
from blockchain.services import TokenService
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAdminUser
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class TokenizationRuleViewSet(viewsets.ModelViewSet):
    """
    API endpoints for managing tokenization rules.
    
    Tokenization rules define how users earn tokens through various interactions,
    such as logins, likes, comments, video watching, etc.
    """
    serializer_class = TokenizationRuleSerializer
    authentication_classes = [APIKeyAuthentication]
    
    def get_queryset(self):
        project = self.request.auth
        return TokenizationRule.objects.filter(project=project)
    
    @swagger_auto_schema(
        operation_description="List all tokenization rules for the project",
        responses={
            200: TokenizationRuleSerializer(many=True)
        }
    )
    def list(self, request):
        """Get all tokenization rules for the project"""
        return super().list(request)
    
    @swagger_auto_schema(
        operation_description="Create a new tokenization rule",
        request_body=TokenizationRuleSerializer,
        responses={
            201: TokenizationRuleSerializer,
            400: "Bad request"
        }
    )
    def create(self, request):
        """Create a new tokenization rule"""
        project = request.auth
        
        # Custom validation for custom_action_name
        if request.data.get('action_type') == 'custom' and not request.data.get('custom_action_name'):
            return Response({
                'custom_action_name': ['Custom action name is required when action_type is "custom"']
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Create serializer with project included
        serializer = self.get_serializer(data={**request.data, 'project': project.id})
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(
        operation_description="Get a specific tokenization rule",
        responses={
            200: TokenizationRuleSerializer,
            404: "Rule not found"
        }
    )
    def retrieve(self, request, pk=None):
        """Get a specific tokenization rule"""
        return super().retrieve(request, pk)
    
    @swagger_auto_schema(
        operation_description="Update a tokenization rule",
        request_body=TokenizationRuleSerializer,
        responses={
            200: TokenizationRuleSerializer,
            400: "Bad request",
            404: "Rule not found"
        }
    )
    def update(self, request, pk=None):
        """Update a tokenization rule"""
        return super().update(request, pk)
    
    @swagger_auto_schema(
        operation_description="Partially update a tokenization rule",
        request_body=TokenizationRuleSerializer(partial=True),
        responses={
            200: TokenizationRuleSerializer,
            400: "Bad request",
            404: "Rule not found"
        }
    )
    def partial_update(self, request, pk=None):
        """Partially update a tokenization rule"""
        return super().partial_update(request, pk)
    
    @swagger_auto_schema(
        operation_description="Delete a tokenization rule",
        responses={
            204: "No content",
            404: "Rule not found"
        }
    )
    def destroy(self, request, pk=None):
        """Delete a tokenization rule"""
        return super().destroy(request, pk)
    
    @swagger_auto_schema(
        method='patch',
        operation_description="Toggle the active status of a tokenization rule",
        responses={
            200: openapi.Response(
                description="Status toggled successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'id': openapi.Schema(type=openapi.TYPE_STRING, format='uuid'),
                        'is_active': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            ),
            404: "Rule not found"
        }
    )
    @action(detail=True, methods=['patch'])
    def toggle_status(self, request, pk=None):
        """Toggle the active status of a tokenization rule"""
        try:
            rule = self.get_queryset().get(pk=pk)
            rule.is_active = not rule.is_active
            rule.save(update_fields=['is_active'])
            
            status_msg = "enabled" if rule.is_active else "disabled"
            
            return Response({
                'id': rule.id,
                'is_active': rule.is_active,
                'message': f"Rule '{rule.action_type}' {status_msg} successfully"
            })
            
        except TokenizationRule.DoesNotExist:
            return Response({
                'error': 'Rule not found'
            }, status=status.HTTP_404_NOT_FOUND)

    @swagger_auto_schema(
        operation_description="Get code snippets for implementing a specific tokenization rule",
        responses={
            200: openapi.Response(
                description="Code snippets for the rule",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'id': openapi.Schema(type=openapi.TYPE_STRING, format='uuid'),
                        'action_type': openapi.Schema(type=openapi.TYPE_STRING),
                        'description': openapi.Schema(type=openapi.TYPE_STRING),
                        'code_snippet_js': openapi.Schema(type=openapi.TYPE_STRING),
                        'code_snippet_react': openapi.Schema(type=openapi.TYPE_STRING),
                        'code_snippet_html': openapi.Schema(type=openapi.TYPE_STRING),
                        'code_snippet_sdk': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            ),
            404: "Rule not found"
        }
    )
    @action(detail=True, methods=['get'])
    def code_snippets(self, request, pk=None):
        """Get code snippets for implementing a specific tokenization rule"""
        try:
            rule = self.get_queryset().get(pk=pk)
            
            # Regenerate snippets to ensure they're up to date
            rule.generate_code_snippets()
            
            return Response({
                'id': rule.id,
                'action_type': rule.action_type,
                'custom_action_name': rule.custom_action_name,
                'description': rule.description or f"Tokenization rule for {rule.action_type}",
                'code_snippet_js': rule.code_snippet_js,
                'code_snippet_react': rule.code_snippet_react,
                'code_snippet_html': rule.code_snippet_html,
                'code_snippet_sdk': rule.code_snippet_sdk,
            })
            
        except TokenizationRule.DoesNotExist:
            return Response({
                'error': 'Rule not found'
            }, status=status.HTTP_404_NOT_FOUND)


class ActionTypeListView(APIView):
    """
    API endpoint to get available action types for tokenization rules
    """
    authentication_classes = [APIKeyAuthentication]
    
    @swagger_auto_schema(
        operation_description="Get list of available action types for tokenization rules",
        responses={
            200: openapi.Response(
                description="List of action types",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'action_types': openapi.Schema(
                            type=openapi.TYPE_ARRAY,
                            items=openapi.Schema(
                                type=openapi.TYPE_OBJECT,
                                properties={
                                    'id': openapi.Schema(type=openapi.TYPE_STRING),
                                    'name': openapi.Schema(type=openapi.TYPE_STRING),
                                }
                            )
                        )
                    }
                )
            )
        }
    )
    def get(self, request):
        """Get list of available action types"""
        action_types = [{'id': key, 'name': value} for key, value in TokenizationRule.ACTION_TYPES]
        
        return Response({
            'action_types': action_types
        })


class TokenizationStatsView(APIView):
    """
    API endpoint to get tokenization statistics
    """
    authentication_classes = [APIKeyAuthentication]
    
    @swagger_auto_schema(
        operation_description="Get tokenization statistics for the project",
        manual_parameters=[
            openapi.Parameter(
                'start_date', 
                openapi.IN_QUERY, 
                description="Start date for filtering (YYYY-MM-DD)",
                type=openapi.TYPE_STRING,
                format='date'
            ),
            openapi.Parameter(
                'end_date', 
                openapi.IN_QUERY, 
                description="End date for filtering (YYYY-MM-DD)",
                type=openapi.TYPE_STRING,
                format='date'
            ),
        ],
        responses={
            200: openapi.Response(
                description="Tokenization statistics",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'total_interactions': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'total_tokens_awarded': openapi.Schema(type=openapi.TYPE_NUMBER),
                        'action_breakdown': openapi.Schema(
                            type=openapi.TYPE_ARRAY,
                            items=openapi.Schema(
                                type=openapi.TYPE_OBJECT,
                                properties={
                                    'action_type': openapi.Schema(type=openapi.TYPE_STRING),
                                    'count': openapi.Schema(type=openapi.TYPE_INTEGER),
                                    'tokens': openapi.Schema(type=openapi.TYPE_NUMBER),
                                }
                            )
                        ),
                        'user_engagement': openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties={
                                'total_users': openapi.Schema(type=openapi.TYPE_INTEGER),
                                'active_users': openapi.Schema(type=openapi.TYPE_INTEGER),
                                'average_tokens_per_user': openapi.Schema(type=openapi.TYPE_NUMBER),
                            }
                        )
                    }
                )
            )
        }
    )
    def get(self, request):
        """Get tokenization statistics for the project"""
        project = request.auth
        
        # Get date filters if provided
        from django.db.models import Sum, Count
        import datetime
        
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        
        # Filter interactions by project and date range
        interactions = Interaction.objects.filter(user__project=project)
        
        if start_date:
            try:
                start = datetime.datetime.strptime(start_date, "%Y-%m-%d").date()
                interactions = interactions.filter(timestamp__gte=start)
            except ValueError:
                pass
        
        if end_date:
            try:
                end = datetime.datetime.strptime(end_date, "%Y-%m-%d").date()
                # Add 1 day to include the end date fully
                end = datetime.datetime.combine(end, datetime.time.max)
                interactions = interactions.filter(timestamp__lte=end)
            except ValueError:
                pass
        
        # Calculate stats
        total_interactions = interactions.count()
        total_tokens = interactions.aggregate(total=Sum('tokens_earned'))['total'] or Decimal('0')
        
        # Group by action type
        action_stats = interactions.values('action_type').annotate(
            count=Count('id'),
            tokens=Sum('tokens_earned')
        ).order_by('-count')
        
        action_breakdown = [
            {
                'action_type': stat['action_type'],
                'count': stat['count'],
                'tokens': stat['tokens']
            }
            for stat in action_stats
        ]
        
        # User engagement
        total_users = AppUser.objects.filter(project=project).count()
        active_users = interactions.values('user').distinct().count()
        
        avg_tokens_per_user = Decimal('0')
        if active_users > 0:
            avg_tokens_per_user = total_tokens / active_users
        
        return Response({
            'total_interactions': total_interactions,
            'total_tokens_awarded': total_tokens,
            'action_breakdown': action_breakdown,
            'user_engagement': {
                'total_users': total_users,
                'active_users': active_users,
                'average_tokens_per_user': avg_tokens_per_user
            }
        })


class ActionTypeView(APIView):
    """
    API endpoint for listing action types for tokenization
    """
    authentication_classes = [APIKeyAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    @swagger_auto_schema(
        operation_description="List available action types for tokenization rules",
        responses={200: "List of action types"}
    )
    def get(self, request):
        """Get list of available action types"""
        # Get standard action types
        standard_types = [
            {'id': 'signup', 'name': 'Sign Up', 'description': 'User creates an account'},
            {'id': 'login', 'name': 'Login', 'description': 'User logs into the app'},
            {'id': 'daily_check_in', 'name': 'Daily Check-in', 'description': 'User checks in daily'},
            {'id': 'content_creation', 'name': 'Content Creation', 'description': 'User creates content'},
            {'id': 'content_interaction', 'name': 'Content Interaction', 'description': 'User interacts with content'},
            {'id': 'referral', 'name': 'Referral', 'description': 'User refers another user'},
            {'id': 'purchase', 'name': 'Purchase', 'description': 'User makes a purchase'},
            {'id': 'video_watch', 'name': 'Video Watch', 'description': 'User watches a video'},
            {'id': 'game_achievement', 'name': 'Game Achievement', 'description': 'User completes a game achievement'},
            {'id': 'survey_completion', 'name': 'Survey Completion', 'description': 'User completes a survey'},
            {'id': 'social_share', 'name': 'Social Share', 'description': 'User shares on social media'},
            {'id': 'streak', 'name': 'Streak', 'description': 'User maintains a usage streak'},
            {'id': 'custom', 'name': 'Custom', 'description': 'Custom action type'},
        ]
        
        # Get custom action types from database
        custom_types = ActionType.objects.filter(is_standard=False).values(
            'id', 'name', 'description'
        )
        
        # Combine both lists
        all_types = standard_types + list(custom_types)
        
        return Response(all_types)
    
    @swagger_auto_schema(
        operation_description="Create a custom action type",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['name', 'description'],
            properties={
                'name': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description="Name of the custom action type"
                ),
                'description': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description="Description of the custom action type"
                )
            }
        ),
        responses={201: "Action type created successfully"}
    )
    def post(self, request):
        """Create a custom action type"""
        name = request.data.get('name')
        description = request.data.get('description')
        
        if not name or not description:
            return Response(
                {'error': 'name and description are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create a normalized ID from the name
        action_id = name.lower().replace(' ', '_')
        
        # Check if this action type already exists
        if ActionType.objects.filter(name=name).exists():
            return Response(
                {'error': f'Action type "{name}" already exists'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create the action type
        action_type = ActionType.objects.create(
            id=action_id,
            name=name,
            description=description,
            is_standard=False
        )
        
        return Response({
            'id': action_type.id,
            'name': action_type.name,
            'description': action_type.description,
            'is_standard': action_type.is_standard
        }, status=status.HTTP_201_CREATED)


class RuleListView(APIView):
    """
    API endpoint for listing and creating tokenization rules
    """
    authentication_classes = [APIKeyAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    @swagger_auto_schema(
        operation_description="List all tokenization rules for the authenticated project",
        responses={200: TokenizationRuleSerializer(many=True)}
    )
    def get(self, request):
        """Get list of tokenization rules for the project"""
        project = request.auth
        rules = TokenizationRule.objects.filter(project=project)
        serializer = TokenizationRuleSerializer(rules, many=True)
        return Response(serializer.data)
    
    @swagger_auto_schema(
        operation_description="Create a new tokenization rule",
        request_body=TokenizationRuleSerializer,
        responses={
            201: TokenizationRuleSerializer,
            400: "Bad request, validation failed"
        }
    )
    def post(self, request):
        """Create a new tokenization rule"""
        project = request.auth
        serializer = TokenizationRuleSerializer(data={**request.data, 'project': project.id})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RuleDetailView(APIView):
    """
    API endpoint for managing a specific tokenization rule
    """
    authentication_classes = [APIKeyAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    @swagger_auto_schema(
        operation_description="Get details of a specific tokenization rule",
        responses={
            200: TokenizationRuleSerializer,
            404: "Rule not found"
        }
    )
    def get(self, request, rule_id):
        """Get details for a specific rule"""
        project = request.auth
        try:
            rule = TokenizationRule.objects.get(id=rule_id, project=project)
            serializer = TokenizationRuleSerializer(rule)
            return Response(serializer.data)
        except TokenizationRule.DoesNotExist:
            return Response({'error': f'Rule with ID {rule_id} not found'}, status=status.HTTP_404_NOT_FOUND)
    
    @swagger_auto_schema(
        operation_description="Update a tokenization rule",
        request_body=TokenizationRuleSerializer,
        responses={
            200: TokenizationRuleSerializer,
            400: "Bad request, validation failed",
            404: "Rule not found"
        }
    )
    def put(self, request, rule_id):
        """Update a tokenization rule"""
        project = request.auth
        try:
            rule = TokenizationRule.objects.get(id=rule_id, project=project)
            serializer = TokenizationRuleSerializer(rule, data=request.data, partial=False)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except TokenizationRule.DoesNotExist:
            return Response({'error': f'Rule with ID {rule_id} not found'}, status=status.HTTP_404_NOT_FOUND)
    
    @swagger_auto_schema(
        operation_description="Delete a tokenization rule",
        responses={
            204: "Rule deleted successfully",
            404: "Rule not found"
        }
    )
    def delete(self, request, rule_id):
        """Delete a tokenization rule"""
        project = request.auth
        try:
            rule = TokenizationRule.objects.get(id=rule_id, project=project)
            rule.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except TokenizationRule.DoesNotExist:
            return Response({'error': f'Rule with ID {rule_id} not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def tokenization_stats(request):
    """
    API endpoint for getting tokenization statistics
    """
    project = request.auth
    
    from django.db.models import Sum, Count
    from django.db.models.functions import TruncDay
    from tokenization.models import Interaction
    from django.utils import timezone
    import datetime
    
    # Get total tokens awarded
    total_tokens = Interaction.objects.filter(
        user__project=project
    ).aggregate(
        total_tokens=Sum('tokens_earned')
    )['total_tokens'] or 0
    
    # Get total interactions
    total_interactions = Interaction.objects.filter(
        user__project=project
    ).count()
    
    # Get interactions by type
    interactions_by_type = Interaction.objects.filter(
        user__project=project
    ).values('action_type').annotate(
        count=Count('id'),
        tokens=Sum('tokens_earned')
    ).order_by('-count')
    
    # Get daily interactions for the past week
    today = timezone.now().date()
    one_week_ago = today - datetime.timedelta(days=7)
    
    daily_interactions = Interaction.objects.filter(
        user__project=project,
        timestamp__date__gte=one_week_ago
    ).annotate(
        day=TruncDay('timestamp')
    ).values('day').annotate(
        count=Count('id'),
        tokens=Sum('tokens_earned')
    ).order_by('day')
    
    daily_stats = [
        {
            'date': item['day'].strftime('%Y-%m-%d'),
            'interactions': item['count'],
            'tokens_awarded': float(item['tokens'])
        }
        for item in daily_interactions
    ]
    
    # Fill in missing days with zeros
    dates_map = {item['date']: item for item in daily_stats}
    
    for i in range(7):
        date_str = (one_week_ago + datetime.timedelta(days=i)).strftime('%Y-%m-%d')
        if date_str not in dates_map:
            daily_stats.append({
                'date': date_str,
                'interactions': 0,
                'tokens_awarded': 0.0
            })
    
    # Sort by date
    daily_stats.sort(key=lambda x: x['date'])
    
    # Return statistics
    return Response({
        'total_tokens_awarded': float(total_tokens),
        'total_interactions': total_interactions,
        'interactions_by_type': [
            {
                'action_type': item['action_type'],
                'count': item['count'],
                'tokens_awarded': float(item['tokens'])
            }
            for item in interactions_by_type
        ],
        'daily_stats': daily_stats
    })


class TokenCreationRequestView(APIView):
    """
    API endpoint for managing token creation requests
    """
    permission_classes = [IsAdminUser]
    
    @swagger_auto_schema(
        operation_description="List all token creation requests",
        manual_parameters=[
            openapi.Parameter(
                'status', 
                openapi.IN_QUERY, 
                description="Filter by status (pending, approved, rejected)", 
                type=openapi.TYPE_STRING
            ),
        ],
        responses={
            200: openapi.Response(
                description="List of token creation requests",
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties={
                            'id': openapi.Schema(type=openapi.TYPE_STRING),
                            'token_name': openapi.Schema(type=openapi.TYPE_STRING),
                            'token_symbol': openapi.Schema(type=openapi.TYPE_STRING),
                            'total_supply': openapi.Schema(type=openapi.TYPE_NUMBER),
                            'project': openapi.Schema(type=openapi.TYPE_STRING),
                            'status': openapi.Schema(type=openapi.TYPE_STRING),
                            'created_at': openapi.Schema(type=openapi.TYPE_STRING, format='date-time'),
                            'updated_at': openapi.Schema(type=openapi.TYPE_STRING, format='date-time'),
                        }
                    )
                )
            )
        }
    )
    def get(self, request):
        """List all token creation requests with optional status filter"""
        status_filter = request.query_params.get('status')
        
        # Query token creation requests
        requests = TokenCreationRequest.objects.all()
        
        # Apply status filter if provided
        if status_filter and status_filter in ['pending', 'approved', 'rejected']:
            requests = requests.filter(status=status_filter)
            
        # Order by created date, newest first
        requests = requests.order_by('-created_at')
        
        # Serialize the data
        result = [{
            'id': str(req.id),
            'token_name': req.token_name,
            'token_symbol': req.token_symbol,
            'total_supply': float(req.total_supply),
            'project': str(req.project.id) if req.project else None,
            'project_name': req.project.name if req.project else None,
            'status': req.status,
            'created_at': req.created_at.isoformat(),
            'updated_at': req.updated_at.isoformat() if req.updated_at else None,
        } for req in requests]
        
        return Response(result)
    
    @swagger_auto_schema(
        operation_description="Approve or reject a token creation request",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['action', 'request_id'],
            properties={
                'action': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description="Action to take (approve or reject)",
                    enum=['approve', 'reject']
                ),
                'request_id': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description="ID of the token creation request"
                ),
                'notes': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description="Optional notes about the decision"
                ),
            }
        ),
        responses={
            200: openapi.Response(
                description="Request processed successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            ),
            400: "Invalid request",
            404: "Request not found"
        }
    )
    def post(self, request):
        """Approve or reject a token creation request"""
        action = request.data.get('action')
        request_id = request.data.get('request_id')
        notes = request.data.get('notes', '')
        
        # Validate inputs
        if not action or action not in ['approve', 'reject']:
            return Response({'error': 'Invalid action. Must be "approve" or "reject"'}, 
                           status=status.HTTP_400_BAD_REQUEST)
        
        if not request_id:
            return Response({'error': 'request_id is required'}, 
                           status=status.HTTP_400_BAD_REQUEST)
        
        # Get the token service
        token_service = TokenService()
        
        try:
            # Process the request based on the action
            if action == 'approve':
                result = token_service.approve_token_request(request_id, notes, request.user)
            else:  # reject
                result = token_service.reject_token_request(request_id, notes, request.user)
            
            if result['success']:
                return Response(result)
            else:
                return Response(result, status=status.HTTP_400_BAD_REQUEST)
            
        except TokenCreationRequest.DoesNotExist:
            return Response({'error': f'Token creation request with id {request_id} not found'}, 
                           status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error processing token request: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAdminUser])
@swagger_auto_schema(
    operation_description="Get token creation request statistics",
    responses={
        200: openapi.Response(
            description="Token creation request statistics",
            schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'total_requests': openapi.Schema(type=openapi.TYPE_INTEGER),
                    'pending_count': openapi.Schema(type=openapi.TYPE_INTEGER),
                    'approved_count': openapi.Schema(type=openapi.TYPE_INTEGER),
                    'rejected_count': openapi.Schema(type=openapi.TYPE_INTEGER),
                }
            )
        )
    }
)
def token_request_stats(request):
    """Get statistics about token creation requests"""
    total = TokenCreationRequest.objects.count()
    pending = TokenCreationRequest.objects.filter(status='pending').count()
    approved = TokenCreationRequest.objects.filter(status='approved').count()
    rejected = TokenCreationRequest.objects.filter(status='rejected').count()
    
    return Response({
        'total_requests': total,
        'pending_count': pending,
        'approved_count': approved,
        'rejected_count': rejected,
    })