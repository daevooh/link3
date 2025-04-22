from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from users.models import Project, AppUser, DeveloperProfile
from blockchain.models import BlockchainNetwork, ProjectToken, TokenCreationRequest
from tokenization.models import TokenizationRule, Interaction
from .models import APIKey
from .decorators import verified_developer_required
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings

@login_required
def verification(request):
    """Developer verification view"""
    # Get or create developer profile
    profile, created = DeveloperProfile.objects.get_or_create(user=request.user)
    
    if request.method == 'POST':
        action = request.POST.get('action')
        
        if action == 'request_code':
            # Generate a new verification code
            verification_code = profile.generate_verification_code()
            
            # In a production environment, send this via email
            # For MVP demo purposes, we'll just show it on screen
            try:
                send_mail(
                    'Link3 Developer Verification',
                    f'Your verification code is: {verification_code}',
                    settings.DEFAULT_FROM_EMAIL,
                    [request.user.email],
                    fail_silently=False,
                )
                messages.success(request, "Verification code sent to your email. Please check your inbox.")
            except Exception as e:
                # In case email sending fails in the demo, show code on screen
                messages.warning(request, f"Email service not configured. Your verification code is: {verification_code}")
            
        elif action == 'verify':
            submitted_code = request.POST.get('verification_code')
            if submitted_code and submitted_code == profile.verification_code:
                profile.verify()
                messages.success(request, "Your developer account has been verified! You can now access all features.")
                return redirect('developer_portal:dashboard')
            else:
                messages.error(request, "Invalid verification code. Please try again.")
    
    context = {
        'profile': profile,
    }
    return render(request, 'developer_portal/verification.html', context)

@login_required
@verified_developer_required
def dashboard(request):
    """Main developer portal dashboard view"""
    # In a real-world scenario, we would filter projects for the current logged-in user
    # For now, we'll just get all projects or display a mock project
    projects = Project.objects.filter(developer=request.user, is_active=True)
    
    # You could use the first project or have a selected project stored in session
    selected_project = projects.first()
    
    context = {
        'projects': projects,
        'selected_project': selected_project,
    }
    
    if selected_project:
        # Get project stats
        user_count = AppUser.objects.filter(project=selected_project).count()
        interaction_count = Interaction.objects.filter(user__project=selected_project).count()
        
        # Calculate total tokens awarded
        token_balances = AppUser.objects.filter(project=selected_project).values_list('token_balance', flat=True)
        total_tokens = sum(token_balances)
        
        # Get recent interactions
        recent_interactions = Interaction.objects.filter(
            user__project=selected_project
        ).order_by('-timestamp')[:10]
        
        context.update({
            'user_count': user_count,
            'interaction_count': interaction_count,
            'total_tokens': total_tokens,
            'recent_interactions': recent_interactions,
        })
    
    return render(request, 'developer_portal/dashboard.html', context)

@login_required
@verified_developer_required
def documentation(request):
    """Developer portal documentation view"""
    return render(request, 'developer_portal/documentation.html')

@login_required
@verified_developer_required
def api_keys(request):
    """API keys management view"""
    projects = Project.objects.filter(developer=request.user, is_active=True)
    selected_project = projects.first()
    new_api_key = None
    
    if request.method == 'POST' and selected_project:
        # Create a new API key
        name = request.POST.get('name')
        scope = request.POST.get('scope', 'read_write')
        
        if name:
            # Create the new API key
            api_key = APIKey.objects.create(
                project=selected_project,
                name=name,
                scope=scope
            )
            
            # Store the newly created key to display to the user
            new_api_key = {
                'name': api_key.name,
                'key': api_key.key,
                'prefix': api_key.prefix,
                'scope': api_key.scope
            }
            
            messages.success(request, f"API key '{name}' created successfully!")
    
    # Get all API keys for the selected project
    api_keys = []
    if selected_project:
        api_keys = APIKey.objects.filter(project=selected_project, is_active=True).order_by('-created_at')
    
    context = {
        'projects': projects,
        'selected_project': selected_project,
        'api_keys': api_keys,
        'new_api_key': new_api_key
    }
    return render(request, 'developer_portal/api_keys.html', context)

@login_required
@verified_developer_required
def delete_api_key(request):
    """Delete an API key"""
    if request.method == 'POST':
        key_id = request.POST.get('key_id')
        if key_id:
            try:
                # Find the API key and ensure it belongs to the current user
                api_key = APIKey.objects.filter(
                    id=key_id, 
                    project__developer=request.user
                ).first()
                
                if api_key:
                    # Mark as inactive instead of deleting
                    api_key.is_active = False
                    api_key.save()
                    messages.success(request, "API key deleted successfully.")
                else:
                    messages.error(request, "API key not found or you don't have permission.")
            except Exception as e:
                messages.error(request, f"Error deleting API key: {str(e)}")
        else:
            messages.error(request, "Invalid API key ID.")
    
    return redirect('developer_portal:api_keys')

@login_required
@verified_developer_required
def analytics(request):
    """Analytics dashboard view"""
    projects = Project.objects.filter(developer=request.user, is_active=True)
    selected_project = projects.first()
    
    context = {
        'projects': projects,
        'selected_project': selected_project,
    }
    
    if selected_project:
        # Get daily interaction data for the past 30 days
        # In a real implementation, this would be a more sophisticated query
        # to aggregate data by day
        interactions = Interaction.objects.filter(user__project=selected_project)
        
        # Get action type breakdown
        action_types = Interaction.objects.filter(
            user__project=selected_project
        ).values('action_type').distinct()
        
        context.update({
            'interactions': interactions,
            'action_types': action_types,
        })
    
    return render(request, 'developer_portal/analytics.html', context)

@login_required
@verified_developer_required
def settings(request):
    """Project settings view"""
    projects = Project.objects.filter(developer=request.user, is_active=True)
    selected_project = projects.first()
    blockchain_networks = BlockchainNetwork.objects.filter(is_active=True)
    
    if request.method == 'POST' and selected_project:
        # Handle form submission to update project settings
        # This is a simplified version
        name = request.POST.get('name')
        description = request.POST.get('description')
        website = request.POST.get('website')
        blockchain_network = request.POST.get('blockchain_network')
        
        if name:
            selected_project.name = name
        if description:
            selected_project.description = description
        if website:
            selected_project.website = website
        if blockchain_network:
            selected_project.blockchain_network = blockchain_network
        
        selected_project.save()
        messages.success(request, "Project settings updated successfully!")
        return redirect('developer_portal:settings')
    
    context = {
        'projects': projects,
        'selected_project': selected_project,
        'blockchain_networks': blockchain_networks,
    }
    return render(request, 'developer_portal/settings.html', context)

@login_required
@verified_developer_required
def token_settings(request):
    """Token configuration settings"""
    projects = Project.objects.filter(developer=request.user, is_active=True)
    selected_project = projects.first()
    blockchain_networks = BlockchainNetwork.objects.filter(is_active=True)
    
    # Check if project already has a token
    project_token = None
    if selected_project:
        project_token = ProjectToken.objects.filter(project=selected_project).first()
    
    if request.method == 'POST' and selected_project:
        # Handle token configuration form submission
        token_name = request.POST.get('token_name')
        token_symbol = request.POST.get('token_symbol')
        token_supply = request.POST.get('token_supply')
        
        # Update project token settings
        if token_name:
            selected_project.token_name = token_name
        if token_symbol:
            selected_project.token_symbol = token_symbol
        if token_supply:
            selected_project.token_supply = int(token_supply)
        
        selected_project.save()
        messages.success(request, "Token settings updated successfully!")
        return redirect('developer_portal:token_settings')
    
    context = {
        'projects': projects,
        'selected_project': selected_project,
        'blockchain_networks': blockchain_networks,
        'project_token': project_token,
    }
    return render(request, 'developer_portal/token_settings.html', context)

@login_required
@verified_developer_required
def tokenization_rules(request):
    """Tokenization rules management view"""
    projects = Project.objects.filter(developer=request.user, is_active=True)
    selected_project = projects.first()
    
    if selected_project:
        rules = TokenizationRule.objects.filter(project=selected_project)
        # Ensure code snippets are generated for each rule
        for rule in rules:
            rule.generate_code_snippets()
            rule.save(update_fields=['code_snippet_js', 'code_snippet_react', 'code_snippet_html', 'code_snippet_sdk'])
    else:
        rules = []
    
    # Handle form submissions
    if request.method == 'POST':
        action = request.POST.get('action')
        
        if action == 'add':
            # Create new tokenization rule
            try:
                action_type = request.POST.get('action_type')
                description = request.POST.get('description')
                # Changed from token_amount to base_amount to match the model field
                base_amount = request.POST.get('token_amount')
                cooldown_hours = request.POST.get('cooldown_hours', 0)
                is_active = request.POST.get('is_active') == 'on'
                
                # Handle custom action types
                custom_action_name = None
                if action_type == 'custom':
                    custom_action_name = request.POST.get('custom_action_name')
                    if not custom_action_name:
                        messages.error(request, "Custom action name is required for custom action types.")
                        return redirect('developer_portal:tokenization_rules')
                
                # Create the rule
                rule = TokenizationRule.objects.create(
                    project=selected_project,
                    action_type=action_type,
                    custom_action_name=custom_action_name,
                    description=description,
                    base_amount=base_amount,
                    cooldown_hours=cooldown_hours,
                    is_active=is_active
                )
                # Explicitly generate code snippets to ensure they're created
                rule.generate_code_snippets()
                rule.save(update_fields=['code_snippet_js', 'code_snippet_react', 'code_snippet_html', 'code_snippet_sdk'])
                
                messages.success(request, f"Rule '{action_type}' created successfully!")
            except Exception as e:
                messages.error(request, f"Error creating rule: {str(e)}")
        
        elif action == 'edit':
            # Update existing tokenization rule
            try:
                rule_id = request.POST.get('rule_id')
                rule = TokenizationRule.objects.get(id=rule_id, project=selected_project)
                
                rule.action_type = request.POST.get('action_type')
                rule.description = request.POST.get('description')
                # Changed from token_amount to base_amount to match the model field
                rule.base_amount = request.POST.get('token_amount')
                rule.cooldown_hours = request.POST.get('cooldown_hours', 0)
                rule.is_active = request.POST.get('is_active') == 'on'
                
                # Handle custom action types
                if rule.action_type == 'custom':
                    rule.custom_action_name = request.POST.get('custom_action_name')
                    if not rule.custom_action_name:
                        messages.error(request, "Custom action name is required for custom action types.")
                        return redirect('developer_portal:tokenization_rules')
                else:
                    rule.custom_action_name = None
                    
                # Save the updated rule and regenerate code snippets
                rule.generate_code_snippets()
                rule.save()
                
                messages.success(request, f"Rule '{rule.action_type}' updated successfully!")
            except TokenizationRule.DoesNotExist:
                messages.error(request, "Rule not found.")
            except Exception as e:
                messages.error(request, f"Error updating rule: {str(e)}")
        
        elif action == 'delete':
            # Delete tokenization rule
            try:
                rule_id = request.POST.get('rule_id')
                rule = TokenizationRule.objects.get(id=rule_id, project=selected_project)
                action_type = rule.action_type
                rule.delete()
                
                messages.success(request, f"Rule '{action_type}' deleted successfully!")
            except TokenizationRule.DoesNotExist:
                messages.error(request, "Rule not found.")
            except Exception as e:
                messages.error(request, f"Error deleting rule: {str(e)}")
        
        # Refresh rules after changes
        rules = TokenizationRule.objects.filter(project=selected_project)
        # Ensure code snippets are generated for each rule after any changes
        for rule in rules:
            rule.generate_code_snippets()
            rule.save(update_fields=['code_snippet_js', 'code_snippet_react', 'code_snippet_html', 'code_snippet_sdk'])
    
    context = {
        'projects': projects,
        'selected_project': selected_project,
        'rules': rules,
    }
    return render(request, 'developer_portal/tokenization_rules.html', context)

@login_required
@verified_developer_required
def create_project(request):
    """Create a new project"""
    if request.method == 'POST':
        name = request.POST.get('name')
        description = request.POST.get('description')
        website = request.POST.get('website')
        reward_type = request.POST.get('reward_type', 'off_chain')  # Default to off-chain rewards
        
        if name:
            # Generate a unique API key
            import secrets
            api_key = secrets.token_hex(24)  # 48-character hex string
            
            # Create the project
            project = Project.objects.create(
                name=name,
                description=description,
                website=website,
                api_key=api_key,  # Keep for backward compatibility
                developer=request.user,
                # Set a default token name and symbol based on project name
                token_name=f"{name} Token",
                token_symbol=name[:4].upper(),
                token_supply=1000000  # Default token supply
            )
            
            # Create an initial API key for the project
            APIKey.objects.create(
                project=project,
                name="Default API Key",
                scope="read_write"
            )
            
            messages.success(request, f"Project '{name}' created successfully!")
            return redirect('developer_portal:dashboard')
        else:
            messages.error(request, "Project name is required.")
    
    context = {}
    return render(request, 'developer_portal/create_project.html', context)

@login_required
@verified_developer_required
def create_token_request(request):
    """Create a new token creation request"""
    projects = Project.objects.filter(developer=request.user, is_active=True)
    selected_project = projects.first()
    blockchain_networks = BlockchainNetwork.objects.filter(is_active=True)
    
    # Check if the project already has pending token requests
    existing_pending_requests = None
    if selected_project:
        existing_pending_requests = TokenCreationRequest.objects.filter(
            project=selected_project, 
            status='pending'
        ).first()
    
    # Check if the project already has deployed tokens
    existing_tokens = None
    if selected_project:
        existing_tokens = ProjectToken.objects.filter(
            project=selected_project,
            is_deployed=True
        ).first()
    
    if request.method == 'POST' and selected_project:
        # Extract form data
        name = request.POST.get('token_name')
        symbol = request.POST.get('token_symbol')
        total_supply = request.POST.get('total_supply')
        network_id = request.POST.get('network')
        admin_address = request.POST.get('admin_address')
        decimals = request.POST.get('decimals', 18)
        
        # Validate form data
        if not all([name, symbol, total_supply, network_id, admin_address]):
            messages.error(request, "All fields are required.")
        else:
            try:
                # Convert to appropriate types
                total_supply = int(total_supply)
                decimals = int(decimals)
                network = BlockchainNetwork.objects.get(id=network_id)
                
                # Create token request
                token_request = TokenCreationRequest.objects.create(
                    project=selected_project,
                    name=name,
                    symbol=symbol,
                    total_supply=total_supply,
                    network=network,
                    admin_address=admin_address,
                    decimals=decimals,
                    status='pending'
                )
                
                messages.success(request, "Token creation request submitted successfully! It is now pending admin approval.")
                return redirect('developer_portal:token_requests')
            except BlockchainNetwork.DoesNotExist:
                messages.error(request, "Selected blockchain network is not valid.")
            except ValueError:
                messages.error(request, "Invalid numeric values for total supply or decimals.")
            except Exception as e:
                messages.error(request, f"Error creating token request: {str(e)}")
    
    context = {
        'projects': projects,
        'selected_project': selected_project,
        'blockchain_networks': blockchain_networks,
        'existing_pending_requests': existing_pending_requests,
        'existing_tokens': existing_tokens,
    }
    return render(request, 'developer_portal/create_token_request.html', context)

@login_required
@verified_developer_required
def token_requests(request):
    """View and manage token creation requests"""
    projects = Project.objects.filter(developer=request.user, is_active=True)
    selected_project = projects.first()
    
    # Get all token requests for the selected project
    token_requests = []
    if selected_project:
        token_requests = TokenCreationRequest.objects.filter(
            project=selected_project
        ).order_by('-submitted_at')
    
    # Get deployed tokens for the project
    deployed_tokens = []
    if selected_project:
        deployed_tokens = ProjectToken.objects.filter(
            project=selected_project,
            is_deployed=True
        )
    
    if request.method == 'POST':
        action = request.POST.get('action')
        request_id = request.POST.get('request_id')
        
        if request_id:
            token_request = get_object_or_404(TokenCreationRequest, id=request_id, project__developer=request.user)
            
            if action == 'cancel' and token_request.status in ['pending', 'approved']:
                token_request.cancel()
                messages.success(request, "Token request canceled successfully.")
            else:
                messages.error(request, f"Invalid action: {action}")
        else:
            messages.error(request, "Request ID not provided.")
        
        return redirect('developer_portal:token_requests')
    
    context = {
        'projects': projects,
        'selected_project': selected_project,
        'token_requests': token_requests,
        'deployed_tokens': deployed_tokens,
    }
    return render(request, 'developer_portal/token_requests.html', context)
