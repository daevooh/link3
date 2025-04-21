from django.shortcuts import redirect
from django.contrib import messages
from functools import wraps
from users.models import DeveloperProfile

def verified_developer_required(view_func):
    """
    Decorator that checks if a user is a verified developer before allowing
    access to sensitive API and tokenization functionality.
    """
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        # Check if user has a developer profile and is verified
        try:
            profile = request.user.developer_profile
            if not profile.is_verified:
                messages.warning(
                    request, 
                    "You need to verify your developer account before accessing this feature. "
                    "Check your email for verification instructions or request a new code."
                )
                return redirect('developer_portal:verification')
        except (AttributeError, DeveloperProfile.DoesNotExist):
            # Create a developer profile if it doesn't exist
            DeveloperProfile.objects.create(user=request.user)
            messages.warning(
                request, 
                "Your developer account needs to be verified. Please complete the verification process."
            )
            return redirect('developer_portal:verification')
        
        return view_func(request, *args, **kwargs)
    
    return _wrapped_view