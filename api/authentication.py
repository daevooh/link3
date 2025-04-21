from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from users.models import Project

class APIKeyAuthentication(BaseAuthentication):
    def authenticate(self, request):
        api_key = request.META.get('HTTP_X_API_KEY') or request.query_params.get('api_key')
        
        if not api_key:
            return None
            
        try:
            project = Project.objects.get(api_key=api_key, is_active=True)
            return (None, project)  # Return None for user, project as auth
        except Project.DoesNotExist:
            raise AuthenticationFailed('Invalid API key')