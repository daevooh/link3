from rest_framework import authentication, exceptions
from users.models import Project
from developer_portal.models import APIKey
from django.utils import timezone
import logging

logger = logging.getLogger('django')

class APIKeyAuthentication(authentication.BaseAuthentication):
    """
    Custom authentication using API key from header
    """
    def authenticate(self, request):
        # Try to get API key from header (preferred method)
        api_key = request.META.get('HTTP_X_API_KEY')
        
        # Fallback to Authorization header (Bearer token)
        if not api_key and 'HTTP_AUTHORIZATION' in request.META:
            auth = request.META['HTTP_AUTHORIZATION'].split()
            if len(auth) == 2 and auth[0].lower() == 'bearer':
                api_key = auth[1]
        
        if not api_key:
            return None
        
        try:
            # First try to find the key in our APIKey model
            key_obj = APIKey.objects.filter(key=api_key, is_active=True).select_related('project').first()
            
            if key_obj:
                # Update last used time
                key_obj.last_used = timezone.now()
                key_obj.save(update_fields=['last_used'])
                
                # Return the project as the auth object
                return (None, key_obj.project)
            
            # Fallback to check Project.api_key for backwards compatibility
            project = Project.objects.get(api_key=api_key, is_active=True)
            return (None, project)  # Return the project as the auth object
            
        except Project.DoesNotExist:
            logger.warning(f"Invalid API key attempt: {api_key[:10]}...")
            raise exceptions.AuthenticationFailed('Invalid API key')