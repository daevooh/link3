from django.db import models
from users.models import Project
import secrets
import uuid
from django.utils import timezone

# Create your models here.
class APIKey(models.Model):
    """Model representing an API key for a project"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='api_keys')
    name = models.CharField(max_length=100)
    key = models.CharField(max_length=64, unique=True, editable=False)
    prefix = models.CharField(max_length=8, editable=False)
    scope = models.CharField(max_length=20, default='read_write')
    created_at = models.DateTimeField(auto_now_add=True)
    last_used = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    
    def save(self, *args, **kwargs):
        if not self.key:
            # Generate a new API key if one doesn't exist
            self.key = f"link3_{secrets.token_hex(24)}"
            self.prefix = self.key[:8]
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.name} ({self.prefix})"
