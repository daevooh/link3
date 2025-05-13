"""
Reown AppKit integration for Link3 platform.
This module handles the authentication and identity verification
through Reown's AppKit SDK.
"""
import logging
import requests
from django.conf import settings
from django.urls import reverse
from django.contrib.auth.models import User
from users.models import DeveloperProfile

logger = logging.getLogger('django')

# Reown AppKit API settings
REOWN_API_URL = getattr(settings, 'REOWN_API_URL', 'https://api.reown.com/v1')
REOWN_CLIENT_ID = getattr(settings, 'REOWN_CLIENT_ID', '')
REOWN_CLIENT_SECRET = getattr(settings, 'REOWN_CLIENT_SECRET', '')

class ReownAuthClient:
    """
    Client for interacting with Reown AppKit API for authentication
    and identity verification.
    """
    
    def __init__(self, client_id=None, client_secret=None, api_url=None):
        """Initialize the Reown client with API credentials."""
        self.client_id = client_id or REOWN_CLIENT_ID
        self.client_secret = client_secret or REOWN_CLIENT_SECRET
        self.api_url = api_url or REOWN_API_URL
        
        if not self.client_id or not self.client_secret:
            logger.warning("Reown AppKit API credentials not configured properly")
    
    def verify_auth_token(self, token):
        """
        Verifies a Reown auth token and returns user information
        
        Args:
            token (str): The authentication token from Reown
            
        Returns:
            dict: User information if successful
            None: If verification fails
        """
        try:
            response = requests.post(
                f"{self.api_url}/auth/verify",
                json={"token": token},
                headers={
                    "X-Reown-Client-ID": self.client_id,
                    "X-Reown-Client-Secret": self.client_secret,
                    "Content-Type": "application/json"
                }
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                logger.error(f"Reown token verification failed: {response.status_code}, {response.text}")
                return None
        except Exception as e:
            logger.exception(f"Error verifying Reown token: {str(e)}")
            return None
    
    def get_user_profile(self, user_id):
        """
        Retrieves detailed user profile from Reown
        
        Args:
            user_id (str): The Reown user ID
            
        Returns:
            dict: User profile if successful
            None: If retrieval fails
        """
        try:
            response = requests.get(
                f"{self.api_url}/users/{user_id}",
                headers={
                    "X-Reown-Client-ID": self.client_id,
                    "X-Reown-Client-Secret": self.client_secret
                }
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                logger.error(f"Failed to get Reown user profile: {response.status_code}, {response.text}")
                return None
        except Exception as e:
            logger.exception(f"Error getting Reown user profile: {str(e)}")
            return None

def create_or_update_user_from_reown(reown_data):
    """
    Creates or updates a Django user based on Reown authentication data
    
    Args:
        reown_data (dict): User data from Reown
        
    Returns:
        User: Django User object
    """
    if not reown_data or 'id' not in reown_data:
        logger.error("Invalid Reown data provided")
        return None
    
    # Extract user information
    reown_id = reown_data['id']
    email = reown_data.get('email', '')
    name = reown_data.get('name', '')
    
    # Split name into first and last name
    name_parts = name.split(' ', 1)
    first_name = name_parts[0]
    last_name = name_parts[1] if len(name_parts) > 1 else ''
    
    # Generate a unique username based on email or name
    base_username = email.split('@')[0] if email else name.replace(' ', '')
    username = base_username
    counter = 1
    
    # Ensure username is unique
    while User.objects.filter(username=username).exists():
        username = f"{base_username}{counter}"
        counter += 1
    
    # Try to find existing user by Reown ID in profile or by email
    user = None
    try:
        profile = DeveloperProfile.objects.get(reown_id=reown_id)
        user = profile.user
    except DeveloperProfile.DoesNotExist:
        if email:
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                pass
    
    # Create new user if not found
    if not user:
        user = User.objects.create_user(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name
        )
        
        # Create random password for security
        password = User.objects.make_random_password()
        user.set_password(password)
        user.save()
        
        logger.info(f"Created new user from Reown: {username}")
    
    # Update or create developer profile
    profile, created = DeveloperProfile.objects.get_or_create(
        user=user,
        defaults={
            'reown_id': reown_id,
            'is_verified': True  # Auto-verify users from Reown
        }
    )
    
    if not created:
        profile.reown_id = reown_id
        profile.is_verified = True
        profile.save()
    
    # Additional data can be stored in profile
    if 'wallet_address' in reown_data:
        profile.wallet_address = reown_data.get('wallet_address')
        profile.save()
    
    return user