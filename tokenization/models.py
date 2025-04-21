from django.db import models
import uuid
from users.models import Project, AppUser
from django.utils import timezone

class ActionType(models.Model):
    """
    Model representing different types of actions that can be rewarded with tokens
    """
    id = models.CharField(primary_key=True, max_length=50)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    is_standard = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class TokenizationRule(models.Model):
    """
    Rules for token rewards based on user actions
    """
    ACTION_TYPES = [
        ('login', 'Login'),
        ('like', 'Like'),
        ('comment', 'Comment'),
        ('share', 'Share'),
        ('purchase', 'Purchase'),
        ('video_watch', 'Video Watch'),
        ('profile_completion', 'Profile Completion'),
        ('custom', 'Custom Action'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='tokenization_rules')
    action_type = models.CharField(max_length=50, choices=ACTION_TYPES)
    custom_action_name = models.CharField(max_length=100, blank=True, null=True)
    base_amount = models.DecimalField(max_digits=18, decimal_places=8)
    cooldown_hours = models.FloatField(null=True, blank=True)
    cooldown_minutes = models.FloatField(null=True, blank=True)
    one_time = models.BooleanField(default=False)
    multiplier = models.FloatField(null=True, blank=True)
    min_duration_seconds = models.IntegerField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Add the description field
    description = models.TextField(blank=True, help_text="Description of the tokenization rule")
    
    class Meta:
        unique_together = ('project', 'action_type', 'custom_action_name')
        
    def __str__(self):
        if self.action_type == 'custom' and self.custom_action_name:
            return f"{self.project.name} - {self.custom_action_name}"
        return f"{self.project.name} - {self.action_type}"


class Interaction(models.Model):
    """
    Records user interactions that earned tokens
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='interactions')
    action_type = models.CharField(max_length=50)
    tokens_earned = models.DecimalField(max_digits=18, decimal_places=8)
    metadata = models.JSONField(default=dict, blank=True)
    timestamp = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"{self.user} - {self.action_type} - {self.tokens_earned} tokens"
