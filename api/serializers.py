from rest_framework import serializers
from users.models import Project, AppUser
from tokenization.models import TokenizationRule, Interaction
from blockchain.models import TokenRedemption

class ProjectSerializer(serializers.ModelSerializer):
    """
    Serializer for Project model.
    
    Used for project creation, updates, and listing.
    """
    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'website', 'api_key', 'token_name', 
                 'token_symbol', 'token_supply', 'blockchain_network', 'owner_wallet_address', 
                 'created_at', 'updated_at', 'is_active']
        read_only_fields = ['id', 'api_key', 'created_at', 'updated_at']

class TokenizationRuleSerializer(serializers.ModelSerializer):
    """
    Serializer for TokenizationRule model.
    
    Used for defining and managing rules that determine how tokens are awarded
    for different user actions.
    """
    class Meta:
        model = TokenizationRule
        fields = ['id', 'project', 'action_type', 'custom_action_name', 'base_amount', 
                 'cooldown_hours', 'cooldown_minutes', 'one_time', 'multiplier', 
                 'min_duration_seconds', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class AppUserSerializer(serializers.ModelSerializer):
    """
    Serializer for AppUser model.
    
    Used for user information and token balance tracking.
    """
    class Meta:
        model = AppUser
        fields = ['id', 'project', 'external_id', 'wallet_address', 'token_balance',
                 'created_at', 'last_seen']
        read_only_fields = ['id', 'created_at', 'last_seen']

class InteractionSerializer(serializers.ModelSerializer):
    """
    Serializer for Interaction model.
    
    Used for viewing interaction history and token awards.
    """
    class Meta:
        model = Interaction
        fields = ['id', 'user', 'action_type', 'tokens_earned', 'metadata', 'timestamp']
        read_only_fields = ['id', 'timestamp']

class TokenRedemptionSerializer(serializers.ModelSerializer):
    """
    Serializer for TokenRedemption model.
    
    Used for tracking token redemption requests and their status.
    """
    class Meta:
        model = TokenRedemption
        fields = ['id', 'user', 'amount', 'status', 'transaction_hash', 'error',
                 'created_at', 'updated_at']
        read_only_fields = ['id', 'status', 'transaction_hash', 'error', 'created_at', 'updated_at']

class InteractionRequestSerializer(serializers.Serializer):
    """
    Serializer for validating interaction requests.
    
    Used to process and validate incoming interaction requests.
    """
    user_id = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    hash_key = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    action_type = serializers.CharField(required=True)
    metadata = serializers.JSONField(required=False, default=dict)
    
    def validate(self, data):
        """
        Validate that either user_id or hash_key is provided.
        """
        user_id = data.get('user_id')
        hash_key = data.get('hash_key')
        
        # For new users, neither is required
        # For existing users, one of them must be provided
        
        return data

class RedemptionRequestSerializer(serializers.Serializer):
    """
    Serializer for validating token redemption requests.
    
    Used to process and validate incoming redemption requests.
    """
    hash_key = serializers.CharField(required=True)
    amount = serializers.DecimalField(max_digits=18, decimal_places=6, required=True)
    wallet_address = serializers.CharField(required=True)
    
    def validate_amount(self, value):
        """Validate amount is a positive decimal"""
        try:
            amount = Decimal(str(value))
            if amount <= 0:
                raise serializers.ValidationError("Amount must be greater than zero")
            return value
        except (ValueError, TypeError, InvalidOperation):
            raise serializers.ValidationError("Amount must be a valid number")
    
    def validate_wallet_address(self, value):
        """Validate wallet address format"""
        # This is a basic validation - implement network-specific validation as needed
        if not value or len(value) < 10:
            raise serializers.ValidationError("Invalid wallet address format")
        return value