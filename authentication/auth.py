from rest_framework import authentication, exceptions
from users.models import Project
import logging

logger = logging.getLogger('django')

class APIKeyAuthentication(authentication.BaseAuthentication):
    """
    Custom authentication using API key from header
    """
    def authenticate(self, request):
        api_key = request.META.get('HTTP_X_API_KEY')
        if not api_key:
            return None
        
        try:
            project = Project.objects.get(api_key=api_key, is_active=True)
            return (None, project)  # Return the project as the auth object
        except Project.DoesNotExist:
            logger.warning(f"Invalid API key attempt: {api_key[:10]}...")
            raise exceptions.AuthenticationFailed('Invalid API key')