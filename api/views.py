from django.shortcuts import render
from django.db import transaction
from datetime import timedelta

import logging
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action, api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny

# Add these imports for Swagger/OpenAPI documentation
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from users.models import Project, AppUser, HashKeyRotation
from users.hash_service import HashKeyService
from tokenization.models import TokenizationRule, Interaction
from blockchain.models import TokenRedemption
from authentication.auth import APIKeyAuthentication
from tokenization.engine import TokenizationEngine
from decimal import Decimal
from django.utils import timezone
from .serializers import (
    ProjectSerializer,
    TokenizationRuleSerializer,
    AppUserSerializer,
    InteractionSerializer,
    TokenRedemptionSerializer,
    InteractionRequestSerializer,
    RedemptionRequestSerializer
)
from blockchain.connector import BlockchainConnector
from users.hashkey import HashKeyManager
from users.utils import generate_random_user_id
from . import schema  # Add missing import for schema module

logger = logging.getLogger('django')

class ProjectAPIKeyPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # API key auth sets the project as the auth object
        return request.auth is not None


class ProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoints for project management
    """
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        # In a real implementation, filter by owner
        return Project.objects.all()
    
    @action(detail=True, methods=['post'])
    def regenerate_api_key(self, request, pk=None):
        """Generate a new API key for the project"""
        project = self.get_object()
        import uuid
        project.api_key = f"link3_{uuid.uuid4().hex}"
        project.save()
        return Response({'api_key': project.api_key})


class TokenizationRuleViewSet(viewsets.ModelViewSet):
    """
    API endpoints for managing tokenization rules
    """
    serializer_class = TokenizationRuleSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        return TokenizationRule.objects.filter(project_id=self.kwargs.get('project_pk'))
    
    def perform_create(self, serializer):
        project_id = self.kwargs.get('project_pk')
        serializer.save(project_id=project_id)


class InteractionAPIView(APIView):
    """
    API endpoint for recording user interactions with hash key rotation
    """
    authentication_classes = [APIKeyAuthentication]
    permission_classes = [ProjectAPIKeyPermission]
    
    @swagger_auto_schema(
        operation_description="Process a user interaction and award tokens based on tokenization rules",
        request_body=InteractionRequestSerializer,
        responses={
            200: openapi.Response(
                description="Interaction processed successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'tokens_earned': openapi.Schema(type=openapi.TYPE_NUMBER),
                        'token_balance': openapi.Schema(type=openapi.TYPE_NUMBER),
                        'new_hash_key': openapi.Schema(type=openapi.TYPE_STRING),
                        'user_id': openapi.Schema(type=openapi.TYPE_STRING),
                        'message': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            ),
            400: "Bad request, validation failed",
        }
    )
    def post(self, request):
        """Process a user interaction with hash key rotation"""
        serializer = InteractionRequestSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # Get data from validated serializer
        action_type = serializer.validated_data['action_type']
        hash_key = serializer.validated_data.get('hash_key')
        user_id = serializer.validated_data.get('user_id')
        metadata = serializer.validated_data.get('metadata', {})
        
        # Get project from auth
        project = request.auth
        
        logger.info(f"Processing {action_type} for project {project.name}")
        
        if hash_key:
            # Existing user with hash key
            try:
                # Validate hash key format
                hash_data = HashKeyManager.validate_hash_key(hash_key)
                if not hash_data:
                    return Response({
                        'error': 'Invalid hash key format or signature',
                        'success': False
                    }, status=status.HTTP_400_BAD_REQUEST)
                
                # Check database
                hash_obj = HashKeyRotation.objects.get(
                    previous_hash_key=hash_key,
                    is_active=True
                )
                user = hash_obj.user
                
                # Log hash key validation
                print(f"Validated hash key: {hash_key} for user: {user.external_id}")
                
                # Expire the old hash key
                hash_obj.is_active = False
                hash_obj.save()
                
                # Log hash key expiration
                print(f"Expired hash key: {hash_key} for user: {user.external_id}")
                
            except HashKeyRotation.DoesNotExist:
                return Response({
                    'error': 'Invalid or expired hash key',
                    'success': False
                }, status=status.HTTP_400_BAD_REQUEST)
                
        elif user_id:
            # Returning user with known ID
            user, created = AppUser.objects.get_or_create(
                project=project,
                external_id=user_id,
                defaults={
                    'token_balance': 0
                }
            )
            logger.info(f"{'Created' if created else 'Found'} user with ID: {user_id}")
        else:
            # New user with auto-generated ID
            auto_user_id = HashKeyManager.generate_user_id()
            user = AppUser.objects.create(
                project=project,
                external_id=auto_user_id,
                token_balance=0
            )
            
            # Log new user creation
            print(f"Created new user: {auto_user_id}")
        
        # Process the interaction
        tokenizer = TokenizationEngine(project)
        result = tokenizer.process_interaction(action_type, user, metadata)
        
        # Generate new hash key
        new_hash_key = HashKeyManager.create_hash_key(
            user_id=user.external_id,
            token_balance=user.token_balance,
            project_id=str(project.id)
        )
        
        # Store the new hash key
        HashKeyRotation.objects.create(
            user=user,
            previous_hash_key=new_hash_key,
            is_active=True,
            expires_at=timezone.now() + timedelta(days=30)
        )
        
        # Log new hash key creation
        print(f"Created new hash key: {new_hash_key} for user: {user.external_id}")
        
        # Add new hash key to result
        result['new_hash_key'] = new_hash_key
        
        if not hash_key and not user_id:
            result['user_id'] = user.external_id
        
        return Response(result)

class UserBalanceView(APIView):
    """
    API endpoint to get a user's token balance
    """
    authentication_classes = [APIKeyAuthentication]
    permission_classes = [ProjectAPIKeyPermission]
    
    def get(self, request, external_id):
        """Get token balance for a specific user"""
        project = request.auth
        
        try:
            user = AppUser.objects.get(project=project, external_id=external_id)
            return Response({
                'user_id': external_id,
                'token_balance': user.token_balance,
                'wallet_address': user.wallet_address,
                'last_seen': user.last_seen
            })
        except AppUser.DoesNotExist:
            return Response(
                {'error': f'User with ID {external_id} not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )


class UserBalanceByHashView(APIView):
    """
    API endpoint to get a user's token balance by hash key
    """
    authentication_classes = [APIKeyAuthentication]
    permission_classes = [ProjectAPIKeyPermission]
    
    def get(self, request, hash_key):
        """Get token balance using hash key"""
        project = request.auth
        
        try:
            # First try to find by current hash key
            user = AppUser.objects.get(project=project, current_hash_key=hash_key)
            
            # Generate a new hash key as part of balance check
            new_hash_key = HashKeyService.generate_hash_key()
            
            # Update with rotation
            with transaction.atomic():
                # Store the previous hash key
                HashKeyRotation.objects.create(
                    user=user,
                    previous_hash_key=user.current_hash_key,
                    expires_at=timezone.now() + timedelta(hours=24),
                    is_active=True
                )
                
                # Update with new hash
                user.current_hash_key = new_hash_key
                user.save(update_fields=['current_hash_key', 'last_seen'])
            
            return Response({
                'success': True,
                'token_balance': str(user.token_balance),
                'wallet_address': user.wallet_address,
                'new_hash_key': new_hash_key
            })
        except AppUser.DoesNotExist:
            # Try to find by previous hash key
            try:
                rotation = HashKeyRotation.objects.filter(
                    previous_hash_key=hash_key,
                    user__project=project,
                    is_active=True
                ).select_related('user').first()
                
                if rotation:
                    user = rotation.user
                    # Generate a new hash key
                    new_hash_key = HashKeyService.generate_hash_key()
                    
                    # Update the user and expire the old hash
                    with transaction.atomic():
                        rotation.is_active = False
                        rotation.save(update_fields=['is_active'])
                        
                        user.current_hash_key = new_hash_key
                        user.save(update_fields=['current_hash_key', 'last_seen'])
                    
                    return Response({
                        'success': True,
                        'token_balance': str(user.token_balance),
                        'wallet_address': user.wallet_address,
                        'new_hash_key': new_hash_key
                    })
                
                return Response(
                    {'success': False, 'error': 'Invalid or expired hash key'}, 
                    status=status.HTTP_404_NOT_FOUND
                )
            except Exception as e:
                logger.error(f"Error processing balance request: {str(e)}")
                return Response(
                    {'success': False, 'error': str(e)}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )


class TokenRedemptionView(APIView):
    """
    API endpoint for token redemption (off-chain to on-chain)
    """
    authentication_classes = [APIKeyAuthentication]
    permission_classes = [ProjectAPIKeyPermission]
    
    @swagger_auto_schema(
        operation_description="Convert off-chain tokens to on-chain tokens in a user's wallet",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['user_id', 'amount', 'wallet_address'],
            properties={
                'user_id': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description="External user ID"
                ),
                'amount': openapi.Schema(
                    type=openapi.TYPE_NUMBER,
                    description="Amount of tokens to redeem"
                ),
                'wallet_address': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description="Blockchain wallet address to receive the tokens"
                ),
            }
        ),
        responses={
            200: openapi.Response(
                description="Redemption initiated successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'id': openapi.Schema(type=openapi.TYPE_STRING, format='uuid'),
                        'user': openapi.Schema(type=openapi.TYPE_STRING),
                        'amount': openapi.Schema(type=openapi.TYPE_STRING),
                        'status': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            enum=['pending', 'processing', 'completed', 'failed']
                        ),
                        'transaction_hash': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description="Blockchain transaction hash (null until processed)"
                        ),
                        'created_at': openapi.Schema(type=openapi.TYPE_STRING, format='date-time'),
                    }
                )
            ),
            400: "Bad request, validation failed or insufficient balance",
            404: "User not found",
            500: "Internal server error"
        }
    )
    def post(self, request):
        """Process token redemption request"""
        project = request.auth
        user_id = request.data.get('user_id')
        amount = request.data.get('amount')
        wallet_address = request.data.get('wallet_address')
        
        if not user_id or not amount or not wallet_address:
            return Response(
                {'error': 'user_id, amount, and wallet_address are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            # Get the user
            user = AppUser.objects.get(project=project, external_id=user_id)
            
            # Check if they have enough balance
            amount_decimal = Decimal(str(amount))
            if user.token_balance < amount_decimal:
                return Response(
                    {'error': 'Insufficient balance'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Update wallet address if needed
            if not user.wallet_address:
                user.wallet_address = wallet_address
                user.save(update_fields=['wallet_address'])
            elif user.wallet_address != wallet_address:
                return Response(
                    {'error': 'User already has a different wallet address linked'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            with transaction.atomic():
                # Create redemption record
                redemption = TokenRedemption.objects.create(
                    user=user,
                    amount=amount_decimal,
                    wallet_address=wallet_address,
                    status='pending'
                )
                
                # Deduct tokens from user's balance
                user.token_balance -= amount_decimal
                user.save(update_fields=['token_balance'])
            
            # Queue blockchain transaction in background
            # In a real implementation, you would use Celery or another task queue
            # For now, we'll process synchronously
            connector = BlockchainConnector.get_connector_for_network(project.blockchain_network)
            success = connector.send_tokens(redemption)
            
            # Return the redemption record
            serializer = TokenRedemptionSerializer(redemption)
            return Response(serializer.data)
            
        except AppUser.DoesNotExist:
            return Response(
                {'error': f'User with ID {user_id} not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            logger.error(f"Error processing redemption: {e}")
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class TokenRedemptionByHashView(APIView):
    """
    API endpoint for token redemption using hash key
    """
    authentication_classes = [APIKeyAuthentication]
    permission_classes = [ProjectAPIKeyPermission]
    
    def post(self, request):
        """Process token redemption using hash key"""
        serializer = RedemptionRequestSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        project = request.auth
        hash_key = serializer.validated_data['hash_key']
        amount = serializer.validated_data['amount']
        wallet_address = serializer.validated_data['wallet_address']
        
        try:
            # First try current hash key
            try:
                user = AppUser.objects.get(project=project, current_hash_key=hash_key)
            except AppUser.DoesNotExist:
                # Try rotation history
                rotation = HashKeyRotation.objects.filter(
                    previous_hash_key=hash_key,
                    user__project=project,
                    is_active=True
                ).select_related('user').first()
                
                if rotation:
                    user = rotation.user
                else:
                    return Response(
                        {'success': False, 'error': 'Invalid or expired hash key'}, 
                        status=status.HTTP_404_NOT_FOUND
                    )
            
            # Generate a new hash key
            new_hash_key = HashKeyService.generate_hash_key()
            
            # Update the hash key and continue with redemption
            with transaction.atomic():
                # Store the old hash key in rotation
                if user.current_hash_key:
                    HashKeyRotation.objects.create(
                        user=user,
                        previous_hash_key=user.current_hash_key,
                        expires_at=timezone.now() + timedelta(hours=24),
                        is_active=True
                    )
                
                # Update with new hash key
                user.current_hash_key = new_hash_key
                user.last_seen = timezone.now()
                
                # Check if they have enough balance
                amount_decimal = Decimal(str(amount))
                if user.token_balance < amount_decimal:
                    user.save(update_fields=['current_hash_key', 'last_seen'])
                    return Response({
                        'success': False,
                        'error': 'Insufficient balance',
                        'token_balance': str(user.token_balance),
                        'requested_amount': str(amount_decimal),
                        'new_hash_key': new_hash_key
                    })
                
                # Update wallet address if needed
                if not user.wallet_address:
                    user.wallet_address = wallet_address
                elif user.wallet_address != wallet_address:
                    user.save(update_fields=['current_hash_key', 'last_seen'])
                    return Response({
                        'success': False,
                        'error': 'User already has a different wallet address linked',
                        'current_wallet': user.wallet_address,
                        'new_hash_key': new_hash_key
                    })
                
                # Reduce user's balance immediately
                user.token_balance -= amount_decimal
                user.save()
                
                # Create redemption record
                redemption = TokenRedemption.objects.create(
                    user=user,
                    amount=amount_decimal,
                    wallet_address=wallet_address,
                    status='pending',
                    transaction_hash=None  # Will be updated when processed
                )
            
            # Process blockchain transaction
            connector = BlockchainConnector.get_connector_for_network(project.blockchain_network)
            connector.send_tokens(redemption)  # Process in foreground for now
            
            # Return success response
            return Response({
                'success': True,
                'redemption_id': str(redemption.id),
                'amount': str(amount_decimal),
                'new_balance': str(user.token_balance),
                'status': redemption.status,
                'transaction_hash': redemption.transaction_hash,
                'wallet_address': wallet_address,
                'new_hash_key': new_hash_key
            })
                
        except Exception as e:
            logger.error(f"Error processing redemption: {str(e)}")
            return Response({
                'success': False,
                'error': str(e),
                'new_hash_key': HashKeyService.generate_hash_key()
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserInteractionsView(APIView):
    """
    API endpoint to get a user's interaction history
    """
    authentication_classes = [APIKeyAuthentication]
    permission_classes = [ProjectAPIKeyPermission]
    
    def get(self, request, external_id):
        """Get interaction history for a specific user"""
        project = request.auth
        
        try:
            user = AppUser.objects.get(project=project, external_id=external_id)
            interactions = Interaction.objects.filter(user=user).order_by('-timestamp')[:100]
            
            serializer = InteractionSerializer(interactions, many=True)
            return Response(serializer.data)
            
        except AppUser.DoesNotExist:
            return Response(
                {'error': f'User with ID {external_id} not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )


class UserInteractionsByHashView(APIView):
    """
    API endpoint to get a user's interaction history by hash key
    """
    authentication_classes = [APIKeyAuthentication]
    permission_classes = [ProjectAPIKeyPermission]
    
    def get(self, request, hash_key):
        """Get interaction history using hash key"""
        project = request.auth
        
        try:
            # First try current hash key
            try:
                user = AppUser.objects.get(project=project, current_hash_key=hash_key)
            except AppUser.DoesNotExist:
                # Try rotation history
                rotation = HashKeyRotation.objects.filter(
                    previous_hash_key=hash_key,
                    user__project=project,
                    is_active=True
                ).select_related('user').first()
                
                if rotation:
                    user = rotation.user
                else:
                    return Response(
                        {'success': False, 'error': 'Invalid or expired hash key'}, 
                        status=status.HTTP_404_NOT_FOUND
                    )
            
            # Generate a new hash key
            new_hash_key = HashKeyService.generate_hash_key()
            
            # Update the hash key
            with transaction.atomic():
                # Store the old hash key in rotation
                if user.current_hash_key:
                    HashKeyRotation.objects.create(
                        user=user,
                        previous_hash_key=user.current_hash_key,
                        expires_at=timezone.now() + timedelta(hours=24),
                        is_active=True
                    )
                
                # Update with new hash key
                user.current_hash_key = new_hash_key
                user.save(update_fields=['current_hash_key', 'last_seen'])
            
            # Get interactions
            interactions = Interaction.objects.filter(user=user).order_by('-timestamp')[:100]
            serializer = InteractionSerializer(interactions, many=True)
            
            # Return with interactions and new hash key
            return Response({
                'success': True,
                'interactions': serializer.data,
                'new_hash_key': new_hash_key
            })
            
        except Exception as e:
            logger.error(f"Error getting interactions: {str(e)}")
            return Response({
                'success': False,
                'error': str(e),
                'new_hash_key': HashKeyService.generate_hash_key()
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@authentication_classes([APIKeyAuthentication])
@permission_classes([ProjectAPIKeyPermission])
def project_stats(request):
    """Get summary statistics for a project"""
    project = request.auth
    
    users_count = AppUser.objects.filter(project=project).count()
    interactions_count = Interaction.objects.filter(user__project=project).count()
    total_tokens = AppUser.objects.filter(project=project).values('token_balance')
    total_tokens_awarded = sum(item['token_balance'] for item in total_tokens)
    
    return Response({
        'users_count': users_count,
        'interactions_count': interactions_count,
        'total_tokens_awarded': total_tokens_awarded
    })


class BalanceAPIView(APIView):
    authentication_classes = [APIKeyAuthentication]
    permission_classes =[AllowAny]
    
    def get(self, request, hash_key):
        """Get a user's balance using their hash key"""
        # Get project from auth
        project = request.auth
        
        # First validate hash key format
        hash_data = HashKeyManager.validate_hash_key(hash_key)
        if not hash_data:
            return Response({
                'error': 'Invalid hash key format or signature',
                'success': False
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Then check database
        try:
            hash_obj = HashKeyRotation.objects.get(
                previous_hash_key=hash_key,
                is_active=True
            )
            user = hash_obj.user
            
            # Verify user belongs to the current project
            if user.project != project:
                return Response({
                    'error': 'Hash key not valid for this project',
                    'success': False
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Expire the hash key since it was used for authentication
            hash_obj.is_active = False
            hash_obj.save()
            
            # Generate a new hash key
            new_hash_key = HashKeyManager.create_hash_key(
                user_id=user.external_id,
                token_balance=user.token_balance,
                project_id=str(project.id)
            )
            
            # Store the new hash key
            HashKeyRotation.objects.create(
                user=user,
                previous_hash_key=new_hash_key,
                is_active=True,
                expires_at=timezone.now() + timedelta(days=30)  # Longer expiration
            )
            
            # Return the balance and new hash key
            return Response({
                'success': True,
                'token_balance': user.token_balance,
                'new_hash_key': new_hash_key
            })
            
        except HashKeyRotation.DoesNotExist:
            return Response({
                'error': 'Invalid or expired hash key',
                'success': False
            }, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_description="Get a user's balance using their hash key (POST method)",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['hash_key'],
            properties={
                'hash_key': openapi.Schema(type=openapi.TYPE_STRING, description='User hash key')
            }
        ),
        responses={
            200: openapi.Response(
                description="User balance and new hash key",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
                        'token_balance': openapi.Schema(type=openapi.TYPE_NUMBER),
                        'new_hash_key': openapi.Schema(type=openapi.TYPE_STRING)
                    }
                )
            ),
            400: "Bad request, validation failed"
        }
    )
    def post(self, request):
        """Get a user's balance using their hash key (POST method)"""
        hash_key = request.data.get('hash_key')
        
        if not hash_key:
            return Response({
                'error': 'Hash key is required',
                'success': False
            }, status=status.HTTP_400_BAD_REQUEST)
            
        # Get project from auth
        project = request.auth
        
        # First validate hash key format
        hash_data = HashKeyManager.validate_hash_key(hash_key)
        if not hash_data:
            return Response({
                'error': 'Invalid hash key format or signature',
                'success': False
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Then check database
        try:
            hash_obj = HashKeyRotation.objects.get(
                previous_hash_key=hash_key,
                is_active=True
            )
            user = hash_obj.user
            
            # Verify user belongs to the current project
            if user.project != project:
                return Response({
                    'error': 'Hash key not valid for this project',
                    'success': False
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Expire the hash key since it was used for authentication
            hash_obj.is_active = False
            hash_obj.save()
            
            # Generate a new hash key
            new_hash_key = HashKeyManager.create_hash_key(
                user_id=user.external_id,
                token_balance=user.token_balance,
                project_id=str(project.id)
            )
            
            # Store the new hash key
            HashKeyRotation.objects.create(
                user=user,
                previous_hash_key=new_hash_key,
                is_active=True,
                expires_at=timezone.now() + timedelta(days=30)  # Longer expiration
            )
            
            # Return the balance and new hash key
            return Response({
                'success': True,
                'token_balance': user.token_balance,
                'new_hash_key': new_hash_key
            })
            
        except HashKeyRotation.DoesNotExist:
            return Response({
                'error': 'Invalid or expired hash key',
                'success': False
            }, status=status.HTTP_400_BAD_REQUEST)

class ApiTestView(APIView):
    authentication_classes = [APIKeyAuthentication]
    permission_classes = [AllowAny]
    
    @swagger_auto_schema(
        operation_description="Test endpoint to verify API authentication is working",
        responses={
            200: openapi.Response(
                description="API is functioning correctly",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'status': openapi.Schema(type=openapi.TYPE_STRING)
                    }
                )
            )
        }
    )
    def get(self, request):
        return Response({"status": "API authentication working"})
