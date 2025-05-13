"""
Context processors for authentication app.
"""
from django.conf import settings

def reown_settings(request):
    """
    Makes Reown AppKit settings available in templates.
    """
    return {
        'REOWN_CLIENT_ID': settings.REOWN_CLIENT_ID,
        'REOWN_API_URL': settings.REOWN_API_URL,
    }
