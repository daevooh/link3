from django.db import models
import uuid
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth.models import User

class DeveloperProfile(models.Model):
    """
    Extended profile for developers using the Link3 platform
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='developer_profile')
    is_verified = models.BooleanField(default=False)
    verification_code = models.CharField(max_length=64, blank=True, null=True)
    verification_sent_at = models.DateTimeField(blank=True, null=True)
    company_name = models.CharField(max_length=255, blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username} - {'Verified' if self.is_verified else 'Unverified'}"
    
    def generate_verification_code(self):
        """Generate a verification code for email confirmation"""
        import secrets
        self.verification_code = secrets.token_hex(16)
        self.verification_sent_at = timezone.now()
        self.save(update_fields=['verification_code', 'verification_sent_at'])
        return self.verification_code
    
    def verify(self):
        """Mark the developer as verified"""
        self.is_verified = True
        self.verification_code = None  # Clear the code once verified
        self.save(update_fields=['is_verified', 'verification_code'])

class Project(models.Model):
    """
    Represents a web2 project integrating with Link3
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    api_key = models.CharField(max_length=64, unique=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    # Link to developer who owns this project - make nullable initially
    developer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects', null=True, blank=True)
    
    # Token configuration
    token_name = models.CharField(max_length=100, blank=True, null=True)
    token_symbol = models.CharField(max_length=10, blank=True, null=True)
    token_supply = models.BigIntegerField(default=0)
    token_contract_address = models.CharField(max_length=255, blank=True, null=True)
    
    # Blockchain information
    blockchain_network = models.CharField(max_length=50, default='sei')
    owner_wallet_address = models.CharField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        return self.name


class AppUser(models.Model):
    """
    Represents users in client applications
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='users')
    external_id = models.CharField(max_length=255)  # ID in the client system
    current_hash_key = models.CharField(max_length=255, blank=True, null=True)  # Add this field
    wallet_address = models.CharField(max_length=255, blank=True, null=True)
    token_balance = models.DecimalField(max_digits=36, decimal_places=18, default=0)
    created_at = models.DateTimeField(default=timezone.now)
    last_seen = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ('project', 'external_id')
        
    def __str__(self):
        return f"{self.project.name} - {self.external_id}"
    
    def generate_hash_key(self):
        """Generate a new hash key for this user and rotate the old one"""
        import secrets
        
        # Generate a new secure random hash
        new_hash = secrets.token_hex(32)
        
        # Store this hash key for the user
        old_hash = self.current_hash_key if hasattr(self, 'current_hash_key') else None
        self.current_hash_key = new_hash
        self.save()
        
        # Create a rotation record if needed
        if old_hash:
            HashKeyRotation.objects.create(
                user=self,
                previous_hash_key=old_hash,
                is_active=True,
                expires_at=timezone.now() + timedelta(hours=24)
            )
        
        return new_hash

class HashKeyRotation(models.Model):
    """
    Tracks hash key rotations for user privacy
    Hash keys are manually expired when a new one is requested
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='hash_keys')
    previous_hash_key = models.CharField(max_length=500, unique=True)  # Make sure this is long enough
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()  # Reference field for manual expiration checks
    is_active = models.BooleanField(default=True)  # Flag to mark if hash key is still active
    last_used_at = models.DateTimeField(null=True, blank=True)  # Track when it was used
    
    class Meta:
        indexes = [
            models.Index(fields=['previous_hash_key']),
            models.Index(fields=['is_active']),
        ]
        
    def __str__(self):
        return f"Hash key for {self.user.external_id} ({self.is_active})"
    
    @staticmethod
    def validate_hash_key(hash_key, project):
        """Validate a hash key within a specific project context"""
        try:
            hash_obj = HashKeyRotation.objects.get(
                previous_hash_key=hash_key,
                is_active=True,
                user__project=project  # This ensures project-specific validation
            )
            return hash_obj.user
        except HashKeyRotation.DoesNotExist:
            return None
    
    def expire(self):
        """Manually expire this hash key"""
        self.is_active = False
        self.expires_at = timezone.now()
        self.save(update_fields=['is_active', 'expires_at'])
    
    def use(self):
        """Mark this hash key as used and expired"""
        self.is_active = False
        self.last_used_at = timezone.now()
        self.save()