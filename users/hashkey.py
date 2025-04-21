import uuid
import hmac
import hashlib
import json
import base64
from django.conf import settings
from django.utils import timezone

class HashKeyManager:
    """
    Manages creation, validation, and rotation of hash keys
    """
    
    @staticmethod
    def generate_user_id():
        """Generate a random user ID"""
        return f"user_{uuid.uuid4().hex[:16]}"
    
    @staticmethod
    def create_hash_key(user_id, token_balance=0, project_id=None):
        """
        Create a new hash key encoding user ID and balance
        
        Args:
            user_id: User's ID
            token_balance: Current token balance
            project_id: Project ID for additional security
            
        Returns:
            str: Encoded hash key
        """
        # Create payload with essential information
        payload = {
            'user_id': user_id,
            'balance': str(token_balance),  # Convert to string for consistency
            'timestamp': timezone.now().timestamp(),
            'nonce': uuid.uuid4().hex
        }
        
        if project_id:
            payload['project_id'] = str(project_id)
            
        # Convert payload to JSON and encode
        payload_bytes = json.dumps(payload).encode('utf-8')
        encoded_payload = base64.urlsafe_b64encode(payload_bytes).decode('utf-8')
        
        # Create signature with secret key
        signature = hmac.new(
            settings.SECRET_KEY.encode('utf-8'),
            encoded_payload.encode('utf-8'),
            hashlib.sha256
        ).hexdigest()
        
        # Combine payload and signature
        return f"{encoded_payload}.{signature}"
    
    @staticmethod
    def validate_hash_key(hash_key):
        """
        Validate a hash key and extract information
        
        Args:
            hash_key: Hash key to validate
            
        Returns:
            dict: Extracted payload or None if invalid
        """
        try:
            # Split payload and signature
            encoded_payload, signature = hash_key.split('.')
            
            # Verify signature
            expected_signature = hmac.new(
                settings.SECRET_KEY.encode('utf-8'),
                encoded_payload.encode('utf-8'),
                hashlib.sha256
            ).hexdigest()
            
            if not hmac.compare_digest(signature, expected_signature):
                return None
                
            # Decode payload
            payload_bytes = base64.urlsafe_b64decode(encoded_payload)
            payload = json.loads(payload_bytes.decode('utf-8'))
            
            # Check if hash key is expired (optional)
            timestamp = payload.get('timestamp', 0)
            now = timezone.now().timestamp()
            if now - timestamp > 86400:  # 24 hours
                return None
                
            return payload
            
        except Exception:
            return None

