from rest_framework import serializers
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

# Import all required models
from users.models import Project, AppUser
from blockchain.models import ProjectToken, BlockchainNetwork, UserWallet
from tokenization.models import TokenizationRule, Interaction
from blockchain.models import TokenRedemption

# This file defines explicit schemas for our models to ensure
# they are properly documented in the OpenAPI schema

# Model schemas
class TokenizationRuleSchema(serializers.Serializer):
    name = serializers.CharField()
    description = serializers.CharField(required=False)
    project = serializers.IntegerField()
    action_type = serializers.IntegerField(required=False)
    token_value = serializers.DecimalField(max_digits=18, decimal_places=6, required=False)
    conditions = serializers.JSONField(required=False)
    is_active = serializers.BooleanField(default=True)

class InteractionSchema(serializers.Serializer):
    user = serializers.CharField()
    action_type = serializers.IntegerField()
    metadata = serializers.JSONField(required=False)
    hash_key = serializers.CharField(required=False)

class AppUserSchema(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    wallet_address = serializers.CharField(required=False)
    is_active = serializers.BooleanField(default=True)

class ProjectTokenSchema(serializers.Serializer):
    name = serializers.CharField()
    symbol = serializers.CharField()
    project = serializers.IntegerField()
    metadata = serializers.JSONField(required=False)
    supply = serializers.IntegerField()
    decimals = serializers.IntegerField(default=18)
    is_deployed = serializers.BooleanField(default=False)

class BlockchainNetworkSchema(serializers.ModelSerializer):
    """Schema for BlockchainNetwork model"""
    class Meta:
        model = BlockchainNetwork
        fields = ['id', 'name', 'chain_id', 'rpc_endpoint', 'explorer_url',
                 'is_testnet', 'is_active', 'created_at', 'updated_at']

class TokenRedemptionSchema(serializers.ModelSerializer):
    """Schema for TokenRedemption model"""
    class Meta:
        model = TokenRedemption
        fields = ['id', 'user', 'amount', 'wallet_address', 'status',
                 'transaction_hash', 'error', 'created_at', 'updated_at']

class UserWalletSchema(serializers.ModelSerializer):
    """Schema for UserWallet model"""
    class Meta:
        model = UserWallet
        fields = ['id', 'user', 'network', 'address', 'is_verified', 
                 'created_at', 'updated_at']

# Request schemas
balance_request_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'user_id': openapi.Schema(type=openapi.TYPE_STRING),
        'token_id': openapi.Schema(type=openapi.TYPE_INTEGER),
    },
    required=['user_id', 'token_id']
)

interaction_request_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'user': openapi.Schema(type=openapi.TYPE_STRING),
        'action_type': openapi.Schema(type=openapi.TYPE_INTEGER),
        'metadata': openapi.Schema(type=openapi.TYPE_OBJECT, additional_properties=True),
        'hash_key': openapi.Schema(type=openapi.TYPE_STRING),
    },
    required=['user', 'action_type']
)

network_request_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'name': openapi.Schema(type=openapi.TYPE_STRING),
        'chain_id': openapi.Schema(type=openapi.TYPE_INTEGER),
        'rpc_url': openapi.Schema(type=openapi.TYPE_STRING),
        'explorer_url': openapi.Schema(type=openapi.TYPE_STRING),
        'is_testnet': openapi.Schema(type=openapi.TYPE_BOOLEAN),
    },
    required=['name', 'chain_id', 'rpc_url']
)

project_request_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'name': openapi.Schema(type=openapi.TYPE_STRING),
        'description': openapi.Schema(type=openapi.TYPE_STRING),
        'owner': openapi.Schema(type=openapi.TYPE_INTEGER),
    },
    required=['name', 'owner']
)

regenerate_api_key_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={},
    required=[]
)

token_request_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'name': openapi.Schema(type=openapi.TYPE_STRING),
        'symbol': openapi.Schema(type=openapi.TYPE_STRING),
        'project': openapi.Schema(type=openapi.TYPE_INTEGER),
        'metadata': openapi.Schema(type=openapi.TYPE_OBJECT, additional_properties=True),
        'supply': openapi.Schema(type=openapi.TYPE_INTEGER),
        'decimals': openapi.Schema(type=openapi.TYPE_INTEGER),
    },
    required=['name', 'symbol', 'project', 'supply']
)

deploy_token_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'network_id': openapi.Schema(type=openapi.TYPE_INTEGER),
    },
    required=['network_id']
)

wallet_request_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'address': openapi.Schema(type=openapi.TYPE_STRING),
        'user': openapi.Schema(type=openapi.TYPE_INTEGER),
        'network': openapi.Schema(type=openapi.TYPE_INTEGER),
    },
    required=['address', 'user']
)

rule_request_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'name': openapi.Schema(type=openapi.TYPE_STRING),
        'description': openapi.Schema(type=openapi.TYPE_STRING),
        'action_type': openapi.Schema(type=openapi.TYPE_INTEGER),
        'token_value': openapi.Schema(type=openapi.TYPE_NUMBER, format='decimal'),
        'conditions': openapi.Schema(type=openapi.TYPE_OBJECT, additional_properties=True),
        'is_active': openapi.Schema(type=openapi.TYPE_BOOLEAN),
    },
    required=['name']
)

redeem_request_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'user_id': openapi.Schema(type=openapi.TYPE_STRING),
        'token_id': openapi.Schema(type=openapi.TYPE_INTEGER),
        'amount': openapi.Schema(type=openapi.TYPE_NUMBER, format='decimal'),
    },
    required=['user_id', 'token_id', 'amount']
)

redeem_blockchain_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'wallet_address': openapi.Schema(type=openapi.TYPE_STRING),
        'token_id': openapi.Schema(type=openapi.TYPE_INTEGER),
        'amount': openapi.Schema(type=openapi.TYPE_NUMBER, format='decimal'),
        'network_id': openapi.Schema(type=openapi.TYPE_INTEGER),
    },
    required=['wallet_address', 'token_id', 'amount', 'network_id']
)

# Response schemas
balance_response_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'user_id': openapi.Schema(type=openapi.TYPE_STRING),
        'token_id': openapi.Schema(type=openapi.TYPE_INTEGER),
        'balance': openapi.Schema(type=openapi.TYPE_NUMBER, format='decimal'),
        'token_name': openapi.Schema(type=openapi.TYPE_STRING),
        'token_symbol': openapi.Schema(type=openapi.TYPE_STRING),
    }
)

interaction_response_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'id': openapi.Schema(type=openapi.TYPE_INTEGER),
        'user': openapi.Schema(type=openapi.TYPE_STRING),
        'action_type': openapi.Schema(type=openapi.TYPE_INTEGER),
        'metadata': openapi.Schema(type=openapi.TYPE_OBJECT, additional_properties=True),
        'token_value': openapi.Schema(type=openapi.TYPE_NUMBER, format='decimal'),
        'created_at': openapi.Schema(type=openapi.TYPE_STRING, format='date-time'),
    }
)

network_response_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'id': openapi.Schema(type=openapi.TYPE_INTEGER),
        'name': openapi.Schema(type=openapi.TYPE_STRING),
        'chain_id': openapi.Schema(type=openapi.TYPE_INTEGER),
        'rpc_endpoint': openapi.Schema(type=openapi.TYPE_STRING),
        'explorer_url': openapi.Schema(type=openapi.TYPE_STRING),
        'is_testnet': openapi.Schema(type=openapi.TYPE_BOOLEAN),
        'is_active': openapi.Schema(type=openapi.TYPE_BOOLEAN),
        'created_at': openapi.Schema(type=openapi.TYPE_STRING, format='date-time'),
        'updated_at': openapi.Schema(type=openapi.TYPE_STRING, format='date-time'),
    }
)

project_response_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'id': openapi.Schema(type=openapi.TYPE_INTEGER),
        'name': openapi.Schema(type=openapi.TYPE_STRING),
        'description': openapi.Schema(type=openapi.TYPE_STRING),
        'owner': openapi.Schema(type=openapi.TYPE_INTEGER),
        'api_key': openapi.Schema(type=openapi.TYPE_STRING),
        'created_at': openapi.Schema(type=openapi.TYPE_STRING, format='date-time'),
    }
)

regenerate_api_key_response_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'api_key': openapi.Schema(type=openapi.TYPE_STRING),
    }
)

token_response_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'id': openapi.Schema(type=openapi.TYPE_INTEGER),
        'name': openapi.Schema(type=openapi.TYPE_STRING),
        'symbol': openapi.Schema(type=openapi.TYPE_STRING),
        'project': openapi.Schema(type=openapi.TYPE_INTEGER),
        'metadata': openapi.Schema(type=openapi.TYPE_OBJECT, additional_properties=True),
        'supply': openapi.Schema(type=openapi.TYPE_INTEGER),
        'decimals': openapi.Schema(type=openapi.TYPE_INTEGER),
        'is_deployed': openapi.Schema(type=openapi.TYPE_BOOLEAN),
        'created_at': openapi.Schema(type=openapi.TYPE_STRING, format='date-time'),
    }
)

deploy_token_response_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'success': openapi.Schema(type=openapi.TYPE_BOOLEAN),
        'transaction_hash': openapi.Schema(type=openapi.TYPE_STRING),
        'contract_address': openapi.Schema(type=openapi.TYPE_STRING),
        'network': openapi.Schema(type=openapi.TYPE_INTEGER),
    }
)

wallet_response_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'id': openapi.Schema(type=openapi.TYPE_INTEGER),
        'address': openapi.Schema(type=openapi.TYPE_STRING),
        'user': openapi.Schema(type=openapi.TYPE_INTEGER),
        'network': openapi.Schema(type=openapi.TYPE_INTEGER),
        'is_verified': openapi.Schema(type=openapi.TYPE_BOOLEAN),
        'created_at': openapi.Schema(type=openapi.TYPE_STRING, format='date-time'),
        'updated_at': openapi.Schema(type=openapi.TYPE_STRING, format='date-time'),
    }
)

rule_response_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'id': openapi.Schema(type=openapi.TYPE_INTEGER),
        'name': openapi.Schema(type=openapi.TYPE_STRING),
        'description': openapi.Schema(type=openapi.TYPE_STRING),
        'project': openapi.Schema(type=openapi.TYPE_INTEGER),
        'action_type': openapi.Schema(type=openapi.TYPE_INTEGER),
        'token_value': openapi.Schema(type=openapi.TYPE_NUMBER, format='decimal'),
        'conditions': openapi.Schema(type=openapi.TYPE_OBJECT, additional_properties=True),
        'is_active': openapi.Schema(type=openapi.TYPE_BOOLEAN),
        'created_at': openapi.Schema(type=openapi.TYPE_STRING, format='date-time'),
    }
)

redeem_response_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'id': openapi.Schema(type=openapi.TYPE_INTEGER),
        'user': openapi.Schema(type=openapi.TYPE_STRING),
        'amount': openapi.Schema(type=openapi.TYPE_NUMBER, format='decimal'),
        'status': openapi.Schema(type=openapi.TYPE_STRING),
        'created_at': openapi.Schema(type=openapi.TYPE_STRING, format='date-time'),
    }
)

redeem_blockchain_response_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'id': openapi.Schema(type=openapi.TYPE_INTEGER),
        'wallet_address': openapi.Schema(type=openapi.TYPE_STRING),
        'amount': openapi.Schema(type=openapi.TYPE_NUMBER, format='decimal'),
        'status': openapi.Schema(type=openapi.TYPE_STRING),
        'transaction_hash': openapi.Schema(type=openapi.TYPE_STRING),
        'created_at': openapi.Schema(type=openapi.TYPE_STRING, format='date-time'),
    }
)

# Error response schemas
error_400_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'error': openapi.Schema(type=openapi.TYPE_STRING),
        'detail': openapi.Schema(type=openapi.TYPE_STRING),
    }
)

error_401_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'error': openapi.Schema(type=openapi.TYPE_STRING),
        'detail': openapi.Schema(type=openapi.TYPE_STRING),
    }
)

error_404_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'error': openapi.Schema(type=openapi.TYPE_STRING),
        'detail': openapi.Schema(type=openapi.TYPE_STRING),
    }
)

error_500_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'error': openapi.Schema(type=openapi.TYPE_STRING),
        'detail': openapi.Schema(type=openapi.TYPE_STRING),
    }
)

# Define aliases for schema variables to match imports in views_blockchain.py
network_creation_request = network_request_schema
token_creation_request = token_request_schema
token_deployment_request = deploy_token_schema
wallet_creation_request = wallet_request_schema

# Define alias for schema variable to match import in views_tokenization.py
tokenization_rule_request = rule_request_schema