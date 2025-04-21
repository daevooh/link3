from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from authentication.auth import APIKeyAuthentication
from blockchain.models import BlockchainNetwork, ProjectToken, UserWallet
from blockchain.connector import BlockchainConnector
from users.models import AppUser
from api.schema import (
    network_creation_request,
    token_creation_request, 
    token_deployment_request,
    wallet_creation_request
)

class NetworkListView(APIView):
    """
    API endpoint for listing and creating blockchain networks
    """
    authentication_classes = [APIKeyAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    @swagger_auto_schema(
        operation_description="List all available blockchain networks",
        responses={200: "List of blockchain networks"}
    )
    def get(self, request):
        """Get list of blockchain networks"""
        networks = BlockchainNetwork.objects.all()
        networks_data = [
            {
                'id': str(network.id),
                'name': network.name,
                'chain_id': network.chain_id,
                'is_testnet': network.is_testnet,
                'is_active': network.is_active,
                'explorer_url': network.explorer_url
            } 
            for network in networks
        ]
        return Response(networks_data)
    
    @swagger_auto_schema(
        operation_description="Create a new blockchain network",
        request_body=network_creation_request,
        responses={201: "Network created successfully"}
    )
    def post(self, request):
        """Create a new blockchain network"""
        # Security: Only admins should be able to create networks
        
        name = request.data.get('name')
        chain_id = request.data.get('chain_id')
        rpc_endpoint = request.data.get('rpc_endpoint')
        
        # Validate required fields
        if not all([name, chain_id, rpc_endpoint]):
            return Response(
                {'error': 'name, chain_id, and rpc_endpoint are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if network with same chain_id exists
        if BlockchainNetwork.objects.filter(chain_id=chain_id).exists():
            return Response(
                {'error': f'Network with chain_id {chain_id} already exists'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create the network
        network = BlockchainNetwork.objects.create(
            name=name,
            chain_id=chain_id,
            rpc_endpoint=rpc_endpoint,
            explorer_url=request.data.get('explorer_url', ''),
            is_testnet=request.data.get('is_testnet', True),
            is_active=True
        )
        
        # Return the created network
        return Response({
            'id': str(network.id),
            'name': network.name,
            'chain_id': network.chain_id,
            'rpc_endpoint': network.rpc_endpoint,
            'explorer_url': network.explorer_url,
            'is_testnet': network.is_testnet,
            'is_active': network.is_active,
            'created_at': network.created_at
        }, status=status.HTTP_201_CREATED)


class NetworkDetailView(APIView):
    """
    API endpoint for getting, updating, or deleting a blockchain network
    """
    authentication_classes = [APIKeyAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, network_id):
        """Get details for a specific blockchain network"""
        try:
            network = BlockchainNetwork.objects.get(id=network_id)
            
            return Response({
                'id': str(network.id),
                'name': network.name,
                'chain_id': network.chain_id,
                'rpc_endpoint': network.rpc_endpoint,
                'explorer_url': network.explorer_url,
                'is_testnet': network.is_testnet,
                'is_active': network.is_active,
                'created_at': network.created_at
            })
        except BlockchainNetwork.DoesNotExist:
            return Response(
                {'error': f'Network with ID {network_id} not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
    
    def delete(self, request, network_id):
        """Delete a blockchain network (soft delete)"""
        try:
            network = BlockchainNetwork.objects.get(id=network_id)
            network.is_active = False
            network.save()
            
            return Response(status=status.HTTP_204_NO_CONTENT)
        except BlockchainNetwork.DoesNotExist:
            return Response(
                {'error': f'Network with ID {network_id} not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )


class TokenView(APIView):
    """
    API endpoint for listing and creating tokens
    """
    authentication_classes = [APIKeyAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    @swagger_auto_schema(
        operation_description="List all tokens for the authenticated project",
        responses={200: "List of tokens"}
    )
    def get(self, request):
        """Get list of tokens for the project"""
        # Get the project from the auth token
        project = request.auth
        
        tokens = ProjectToken.objects.filter(admin_project=project)
        tokens_data = [
            {
                'id': str(token.id),
                'name': token.name,
                'symbol': token.symbol,
                'total_supply': token.total_supply,
                'is_deployed': token.is_deployed,
                'contract_address': token.contract_address,
                'network': {
                    'id': str(token.network.id),
                    'name': token.network.name,
                    'chain_id': token.network.chain_id,
                } if token.network else None,
                'created_at': token.created_at
            }
            for token in tokens
        ]
        return Response(tokens_data)
    
    @swagger_auto_schema(
        operation_description="Create a new token",
        request_body=token_creation_request,
        responses={
            201: "Token created successfully",
            400: "Bad request, validation failed"
        }
    )
    def post(self, request):
        """Create a new token"""
        # Get the project from the auth token
        project = request.auth
        
        # Get data from request
        name = request.data.get('name')
        symbol = request.data.get('symbol')
        total_supply = request.data.get('total_supply')
        
        # Validate required fields
        if not all([name, symbol, total_supply]):
            return Response(
                {'error': 'name, symbol, and total_supply are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get network if provided, otherwise use project's default
        network_id = request.data.get('network_id')
        try:
            if network_id:
                network = BlockchainNetwork.objects.get(id=network_id, is_active=True)
            else:
                # Use the project's default network
                network = project.blockchain_network
        except BlockchainNetwork.DoesNotExist:
            return Response(
                {'error': f'Network with ID {network_id} not found or inactive'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create the token
        token = ProjectToken.objects.create(
            admin_project=project,
            name=name,
            symbol=symbol,
            total_supply=total_supply,
            decimals=request.data.get('decimals', 6),  # Default to 6 decimals
            network=network,
            is_deployed=False,  # Not deployed initially
            contract_address=None
        )
        
        # Return the created token
        return Response({
            'id': str(token.id),
            'name': token.name,
            'symbol': token.symbol,
            'total_supply': token.total_supply,
            'decimals': token.decimals,
            'network': {
                'id': str(token.network.id),
                'name': token.network.name,
            },
            'is_deployed': token.is_deployed,
            'created_at': token.created_at
        }, status=status.HTTP_201_CREATED)


class TokenDetailView(APIView):
    """
    API endpoint for getting token details
    """
    authentication_classes = [APIKeyAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, token_id):
        """Get details for a specific token"""
        project = request.auth
        
        try:
            token = ProjectToken.objects.get(id=token_id, admin_project=project)
            
            return Response({
                'id': str(token.id),
                'name': token.name,
                'symbol': token.symbol,
                'total_supply': token.total_supply,
                'decimals': token.decimals,
                'network': {
                    'id': str(token.network.id),
                    'name': token.network.name,
                    'chain_id': token.network.chain_id,
                } if token.network else None,
                'is_deployed': token.is_deployed,
                'contract_address': token.contract_address,
                'created_at': token.created_at
            })
        except ProjectToken.DoesNotExist:
            return Response(
                {'error': f'Token with ID {token_id} not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )


class TokenDeploymentView(APIView):
    """
    API endpoint for deploying a token to the blockchain
    """
    authentication_classes = [APIKeyAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    @swagger_auto_schema(
        operation_description="Deploy a token to its blockchain network",
        request_body=token_deployment_request,
        responses={
            200: "Token deployment initiated",
            400: "Bad request, validation failed",
            404: "Token not found"
        }
    )
    def post(self, request, token_id):
        """Deploy a token to its blockchain network"""
        project = request.auth
        
        try:
            token = ProjectToken.objects.get(id=token_id, admin_project=project)
            
            if token.is_deployed:
                return Response(
                    {'error': 'Token is already deployed'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Get the admin address from the request or use project owner's address
            admin_address = request.data.get('admin_address', project.owner_wallet_address)
            
            if not admin_address:
                return Response(
                    {'error': 'Admin address is required for deployment'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Get the blockchain connector for this network
            connector = BlockchainConnector.get_connector_for_network(token.network)
            
            # Deploy the token
            result = connector.deploy_token(token, admin_address)
            
            if result.get('success'):
                # Update token with contract address
                token.is_deployed = True
                token.contract_address = result.get('contract_address')
                token.save()
                
                return Response({
                    'success': True,
                    'message': 'Token deployed successfully',
                    'contract_address': result.get('contract_address'),
                    'transaction_hash': result.get('transaction_hash'),
                    'block_height': result.get('block_height')
                })
            else:
                return Response({
                    'success': False,
                    'error': result.get('error', 'Unknown error'),
                    'details': result.get('details', {})
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
        except ProjectToken.DoesNotExist:
            return Response(
                {'error': f'Token with ID {token_id} not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class TokenRedemptionView(APIView):
    """
    API endpoint for redeeming tokens on the blockchain
    """
    authentication_classes = [APIKeyAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        """Redeem tokens on the blockchain"""
        project = request.auth
        
        # Get data from request
        token_id = request.data.get('token_id')
        user_wallet_address = request.data.get('wallet_address')
        amount = request.data.get('amount')
        
        if not all([token_id, user_wallet_address, amount]):
            return Response(
                {'error': 'token_id, wallet_address, and amount are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            # Get the token
            token = ProjectToken.objects.get(id=token_id, admin_project=project)
            
            if not token.is_deployed:
                return Response(
                    {'error': 'Token is not deployed to the blockchain yet'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Validate the amount
            try:
                amount = float(amount)
                if amount <= 0:
                    raise ValueError("Amount must be positive")
            except ValueError:
                return Response(
                    {'error': 'Amount must be a positive number'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Get the blockchain connector for this network
            connector = BlockchainConnector.get_connector_for_network(token.network)
            
            # Transfer tokens to the user's wallet
            result = connector.transfer_token(
                token=token,
                to_address=user_wallet_address,
                amount=amount
            )
            
            if result.get('success'):
                return Response({
                    'success': True,
                    'message': 'Token redemption successful',
                    'transaction_hash': result.get('transaction_hash'),
                    'amount': amount
                })
            else:
                return Response({
                    'success': False,
                    'error': result.get('error', 'Unknown error during token transfer'),
                    'details': result.get('details', {})
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
        except ProjectToken.DoesNotExist:
            return Response(
                {'error': f'Token with ID {token_id} not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class UserWalletView(APIView):
    """
    API endpoint for registering user wallets
    """
    authentication_classes = [APIKeyAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    @swagger_auto_schema(
        operation_description="Register a blockchain wallet address for a user",
        request_body=wallet_creation_request,
        responses={
            201: "Wallet registered successfully",
            400: "Bad request, validation failed",
            404: "User not found"
        }
    )
    def post(self, request):
        """Register a blockchain wallet address for a user"""
        project = request.auth
        
        user_id = request.data.get('user_id')
        network_id = request.data.get('network_id')
        address = request.data.get('address')
        
        if not all([user_id, network_id, address]):
            return Response(
                {'error': 'user_id, network_id, and address are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            # Get the user
            user = AppUser.objects.get(project=project, external_id=user_id)
            
            # Get the network
            network = BlockchainNetwork.objects.get(id=network_id, is_active=True)
            
            # Create or update the wallet
            wallet, created = UserWallet.objects.update_or_create(
                user=user,
                network=network,
                defaults={'address': address}
            )
            
            # Also update the user's primary wallet address
            user.wallet_address = address
            user.save(update_fields=['wallet_address'])
            
            return Response({
                'id': str(wallet.id),
                'user_id': user.external_id,
                'network': network.name,
                'address': wallet.address,
                'is_verified': wallet.is_verified,
                'created_at': wallet.created_at
            }, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
            
        except AppUser.DoesNotExist:
            return Response(
                {'error': f'User with ID {user_id} not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except BlockchainNetwork.DoesNotExist:
            return Response(
                {'error': f'Network with ID {network_id} not found or inactive'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class WalletBalanceView(APIView):
    """
    API endpoint for checking on-chain token balances
    """
    authentication_classes = [APIKeyAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        """Get on-chain token balance for a wallet address"""
        project = request.auth
        
        wallet_address = request.query_params.get('wallet_address')
        token_id = request.query_params.get('token_id')
        
        if not wallet_address:
            return Response(
                {'error': 'wallet_address is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            token = None
            if token_id:
                token = ProjectToken.objects.get(id=token_id, admin_project=project)
                
                if not token.is_deployed:
                    return Response(
                        {'error': 'Token has not been deployed yet'}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )
                    
                network = token.network
            else:
                # Use project's default token and network
                token = ProjectToken.objects.filter(admin_project=project, is_deployed=True).first()
                if not token:
                    return Response(
                        {'error': 'No deployed tokens found for this project'}, 
                        status=status.HTTP_404_NOT_FOUND
                    )
                network = token.network
            
            # Get the blockchain connector
            connector = BlockchainConnector.get_connector_for_network(network)
            
            # Get the balance
            balance_result = connector.get_token_balance(token, wallet_address)
            
            if balance_result.get('success'):
                return Response({
                    'token_id': str(token.id),
                    'token_name': token.name,
                    'token_symbol': token.symbol,
                    'wallet_address': wallet_address,
                    'balance': balance_result.get('balance'),
                    'balance_formatted': balance_result.get('balance_formatted')
                })
            else:
                return Response({
                    'error': balance_result.get('error', 'Failed to get balance'),
                    'details': balance_result.get('details', {})
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
        except ProjectToken.DoesNotExist:
            return Response(
                {'error': f'Token with ID {token_id} not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def network_health_check(request, network_id):
    """
    API endpoint to check blockchain network health
    """
    try:
        network = BlockchainNetwork.objects.get(id=network_id, is_active=True)
        
        # Get the blockchain connector
        connector = BlockchainConnector.get_connector_for_network(network)
        
        # Check network health
        health_result = connector.check_health()
        
        if health_result.get('success'):
            return Response({
                'network_id': str(network.id),
                'network_name': network.name,
                'chain_id': network.chain_id,
                'status': 'online',
                'block_height': health_result.get('block_height'),
                'sync_info': health_result.get('sync_info', {}),
                'validator_info': health_result.get('validator_info', {})
            })
        else:
            return Response({
                'network_id': str(network.id),
                'network_name': network.name,
                'status': 'error',
                'error': health_result.get('error', 'Unknown error'),
            }, status=status.HTTP_503_SERVICE_UNAVAILABLE)
            
    except BlockchainNetwork.DoesNotExist:
        return Response(
            {'error': f'Network with ID {network_id} not found or inactive'}, 
            status=status.HTTP_404_NOT_FOUND
        )