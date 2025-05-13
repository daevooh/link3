from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth import login
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.conf import settings
import logging

from .reown import ReownAuthClient, create_or_update_user_from_reown

logger = logging.getLogger('django')

@csrf_exempt
@require_POST
def reown_auth_callback(request):
    """
    Handle Reown AppKit authentication callback.
    This endpoint receives authentication data from the frontend after Reown authentication.
    """
    try:
        # Get the auth token from the request
        reown_auth_token = request.POST.get('reown_auth_token')
        
        if not reown_auth_token:
            logger.error("Reown auth callback missing token")
            return JsonResponse({
                'success': False,
                'error': 'Missing authentication token'
            }, status=400)
        
        # Initialize Reown client
        reown_client = ReownAuthClient()
        
        # Verify the token
        user_data = reown_client.verify_auth_token(reown_auth_token)
        if not user_data:
            logger.error("Failed to verify Reown token")
            return JsonResponse({
                'success': False,
                'error': 'Invalid authentication token'
            }, status=401)
        
        # Create or update the user
        user = create_or_update_user_from_reown(user_data)
        if not user:
            logger.error("Failed to create/update user from Reown data")
            return JsonResponse({
                'success': False,
                'error': 'Failed to create user account'
            }, status=500)
        
        # Log the user in
        login(request, user)
        
        # Return success response
        return JsonResponse({
            'success': True,
            'message': 'Authentication successful',
            'redirect_url': '/developer_portal/dashboard/',
            'user_id': user.id
        })
    
    except Exception as e:
        logger.exception(f"Error in Reown auth callback: {str(e)}")
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)
