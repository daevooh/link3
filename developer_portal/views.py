from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from users.models import Project, AppUser, DeveloperProfile
from blockchain.models import BlockchainNetwork, ProjectToken
from tokenization.models import TokenizationRule, Interaction
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
    
    if request.method == 'POST' and selected_project:
        # Logic to regenerate API key would go here
        # For now, just show a message
        messages.success(request, "API key regenerated successfully!")
        return redirect('developer_portal:api_keys')
    
    context = {
        'projects': projects,
        'selected_project': selected_project,
    }
    return render(request, 'developer_portal/api_keys.html', context)

@login_required
@verified_developer_required
def delete_api_key(request):
    """Delete an API key"""
    if request.method == 'POST':
        key_id = request.POST.get('key_id')
        if key_id:
            # Find projects owned by the current user
            projects = Project.objects.filter(developer=request.user, is_active=True)
            
            # In a production environment, you would need a proper API key model
            # For now we'll just show a success message as if the key was deleted
            messages.success(request, "API key deleted successfully.")
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
    else:
        rules = []
    
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
                api_key=api_key,
                developer=request.user,
                # Set a default token name and symbol based on project name
                token_name=f"{name} Token",
                token_symbol=name[:4].upper(),
                token_supply=1000000  # Default token supply
            )
            
            messages.success(request, f"Project '{name}' created successfully!")
            return redirect('developer_portal:dashboard')
        else:
            messages.error(request, "Project name is required.")
    
    context = {}
    return render(request, 'developer_portal/create_project.html', context)
