import hashlib
import time
import uuid
from datetime import datetime, timedelta
from django.utils import timezone
from django.db import transaction
from .models import AppUser, HashKeyRotation

class HashKeyService:
    """
    Service for generating and managing hash keys for user identification
    This implementation uses manual expiration instead of time-based checks
    """
    
    @staticmethod
    def generate_hash_key():
        """
        Generate a new hash key 
        
        Returns:
            str: A new random hash key
        """
        # Create a random hash that doesn't depend on user ID
        timestamp = int(time.time())
        random_salt = uuid.uuid4().hex
        hash_input = f"{timestamp}:{random_salt}:{uuid.uuid4()}"
        
        # Generate SHA-256 hash
        hash_key = hashlib.sha256(hash_input.encode()).hexdigest()
        
        return hash_key
    
    @staticmethod
    def get_or_create_user_by_hash(project, hash_key=None):
        """
        Find a user by hash key or create a new one
        
        Args:
            project: The project 
            hash_key: Hash key from client (None for new users)
            
        Returns:
            tuple: (user, created, new_hash_key)
        """
        user = None
        created = False
        
        # Generate a new hash key for this transaction
        new_hash_key = HashKeyService.generate_hash_key()
        
        # If no hash_key provided, we'll create a new user
        if not hash_key:
            # Generate a random external_id since we don't use actual user IDs
            external_id = f"user_{uuid.uuid4().hex}"
            
            user = AppUser.objects.create(
                project=project,
                external_id=external_id,
                current_hash_key=new_hash_key,
                token_balance=0
            )
            created = True
            return user, created, new_hash_key
            
        # Try to find user by current hash key
        try:
            user = AppUser.objects.get(
                project=project,
                current_hash_key=hash_key
            )
            
            # User found, update their hash key
            with transaction.atomic():
                # Store the old hash key before replacing
                HashKeyRotation.objects.create(
                    user=user,
                    previous_hash_key=hash_key,
                    expires_at=timezone.now() + timedelta(hours=24),  # Reference field
                    is_active=True
                )
                
                # Update user with new hash
                user.current_hash_key = new_hash_key
                user.last_seen = timezone.now()
                user.save(update_fields=['current_hash_key', 'last_seen'])
                
            return user, False, new_hash_key
            
        except AppUser.DoesNotExist:
            # Check if this is a previous hash key
            rotation = HashKeyRotation.objects.filter(
                previous_hash_key=hash_key,
                user__project=project,
                is_active=True
            ).select_related('user').first()
            
            if rotation:
                # Found via rotation, update with new hash
                user = rotation.user
                
                with transaction.atomic():
                    # Expire the old hash key
                    rotation.expire()
                    
                    # Create a new rotation entry for the current hash
                    HashKeyRotation.objects.create(
                        user=user,
                        previous_hash_key=user.current_hash_key,
                        expires_at=timezone.now() + timedelta(hours=24),  # Reference field
                        is_active=True
                    )
                    
                    # Update user with new hash
                    user.current_hash_key = new_hash_key
                    user.last_seen = timezone.now()
                    user.save(update_fields=['current_hash_key', 'last_seen'])
                    
                return user, False, new_hash_key
            else:
                # No valid hash found, create new user
                external_id = f"user_{uuid.uuid4().hex}"
                
                user = AppUser.objects.create(
                    project=project,
                    external_id=external_id,
                    current_hash_key=new_hash_key,
                    token_balance=0
                )
                created = True
                return user, created, new_hash_key