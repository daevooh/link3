import logging
import uuid
from decimal import Decimal
from django.utils import timezone
from django.db import transaction
from django.db.models import Q
import requests
import time
from .models import ProjectToken, TokenTransaction, BlockchainNetwork, UserWallet, TokenCreationRequest
from .connector import BlockchainConnector

logger = logging.getLogger('django')

class NetworkService:
    """
    Service for blockchain network management
    """
    
    @staticmethod
    def list_networks(active_only=True, testnet_only=False, mainnet_only=False, chain_type=None):
        """
        List available blockchain networks with filtering options
        
        Args:
            active_only: If True, only active networks are returned
            testnet_only: If True, only testnet networks are returned
            mainnet_only: If True, only mainnet networks are returned
            chain_type: Optional filter by chain type (e.g., 'sei', 'ethereum')
            
        Returns:
            QuerySet: BlockchainNetwork objects
        """
        filters = Q()
        
        if active_only:
            filters &= Q(is_active=True)
            
        if testnet_only:
            filters &= Q(is_testnet=True)
            
        if mainnet_only:
            filters &= Q(is_testnet=False)
            
        if chain_type:
            filters &= Q(name__icontains=chain_type) | Q(chain_id__icontains=chain_type)
            
        return BlockchainNetwork.objects.filter(filters)
    
    @staticmethod
    def add_network(name, chain_id, rpc_endpoint, explorer_url=None, is_testnet=True, is_active=True):
        """
        Add a new blockchain network
        
        Args:
            name: Network name
            chain_id: Chain ID
            rpc_endpoint: RPC endpoint URL
            explorer_url: Block explorer URL (optional)
            is_testnet: Whether this is a testnet
            is_active: Whether the network should be active
            
        Returns:
            dict: Result with network details
        """
        try:
            # Check if network with this chain_id already exists
            if BlockchainNetwork.objects.filter(chain_id=chain_id).exists():
                return {
                    'success': False,
                    'error': f'Network with chain ID {chain_id} already exists'
                }
            
            # Create the network
            network = BlockchainNetwork.objects.create(
                name=name,
                chain_id=chain_id,
                rpc_endpoint=rpc_endpoint,
                explorer_url=explorer_url,
                is_testnet=is_testnet,
                is_active=is_active
            )
            
            logger.info(f"Created new blockchain network: {name} ({chain_id})")
            
            return {
                'success': True,
                'network_id': network.id,
                'message': f'Network {name} created successfully',
                'network': {
                    'id': network.id,
                    'name': network.name,
                    'chain_id': network.chain_id,
                    'rpc_endpoint': network.rpc_endpoint,
                    'explorer_url': network.explorer_url,
                    'is_testnet': network.is_testnet,
                    'is_active': network.is_active
                }
            }
            
        except Exception as e:
            logger.error(f"Error creating network: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }
    
    @staticmethod
    def update_network(network_id, **update_fields):
        """
        Update an existing blockchain network
        
        Args:
            network_id: Network ID to update
            update_fields: Fields to update (name, rpc_endpoint, explorer_url, is_active)
            
        Returns:
            dict: Result with updated network details
        """
        try:
            # Get the network
            try:
                network = BlockchainNetwork.objects.get(id=network_id)
            except BlockchainNetwork.DoesNotExist:
                return {
                    'success': False,
                    'error': f'Network with ID {network_id} not found'
                }
            
            # Update allowed fields
            allowed_fields = ['name', 'rpc_endpoint', 'explorer_url', 'is_active']
            update_dict = {}
            
            for field, value in update_fields.items():
                if field in allowed_fields:
                    setattr(network, field, value)
                    update_dict[field] = value
            
            # Save changes if any fields were updated
            if update_dict:
                network.save()
                logger.info(f"Updated network {network.name}: {update_dict}")
                
                return {
                    'success': True,
                    'message': f'Network {network.name} updated successfully',
                    'network': {
                        'id': network.id,
                        'name': network.name,
                        'chain_id': network.chain_id,
                        'rpc_endpoint': network.rpc_endpoint,
                        'explorer_url': network.explorer_url,
                        'is_testnet': network.is_testnet,
                        'is_active': network.is_active
                    }
                }
            else:
                return {
                    'success': False,
                    'error': 'No valid fields provided for update'
                }
            
        except Exception as e:
            logger.error(f"Error updating network: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }
    
    @staticmethod
    def toggle_network(network_id):
        """
        Toggle a network's active status
        
        Args:
            network_id: Network ID to toggle
            
        Returns:
            dict: Result with updated status
        """
        try:
            # Get the network
            try:
                network = BlockchainNetwork.objects.get(id=network_id)
            except BlockchainNetwork.DoesNotExist:
                return {
                    'success': False,
                    'error': f'Network with ID {network_id} not found'
                }
            
            # Toggle status
            network.is_active = not network.is_active
            network.save(update_fields=['is_active'])
            
            status = "enabled" if network.is_active else "disabled"
            logger.info(f"Network {network.name} {status}")
            
            return {
                'success': True,
                'message': f'Network {network.name} {status} successfully',
                'is_active': network.is_active
            }
            
        except Exception as e:
            logger.error(f"Error toggling network status: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }
    
    @staticmethod
    def check_network_health(network_id):
        """
        Check if a network's RPC endpoint is responding correctly
        
        Args:
            network_id: Network ID to check
            
        Returns:
            dict: Health status information
        """
        try:
            # Get the network
            try:
                network = BlockchainNetwork.objects.get(id=network_id)
            except BlockchainNetwork.DoesNotExist:
                return {
                    'success': False,
                    'error': f'Network with ID {network_id} not found'
                }
            
            # Try to make a basic RPC call to check if endpoint is up
            start_time = time.time()
            
            try:
                # For Ethereum-compatible networks
                if network.chain_id.isdigit() or network.name.lower().startswith('ethereum'):
                    payload = {"jsonrpc": "2.0", "method": "eth_blockNumber", "params": [], "id": 1}
                    response = requests.post(network.rpc_endpoint, json=payload, timeout=5)
                    response_data = response.json()
                    
                    if 'result' in response_data:
                        is_healthy = True
                        block_number = int(response_data['result'], 16)
                        details = f"Current block: {block_number}"
                    else:
                        is_healthy = False
                        details = f"Error: {response_data.get('error', 'Unknown error')}"
                        
                # For Cosmos-based networks like Sei
                elif network.chain_id.lower().startswith('sei') or network.name.lower().startswith('sei'):
                    # Status endpoint
                    response = requests.get(f"{network.rpc_endpoint}/status", timeout=5)
                    response_data = response.json()
                    
                    if response.status_code == 200:
                        is_healthy = True
                        block_height = response_data.get('result', {}).get('sync_info', {}).get('latest_block_height', 'Unknown')
                        details = f"Current block height: {block_height}"
                    else:
                        is_healthy = False
                        details = f"Error: {response.status_code} - {response.text}"
                        
                else:
                    # Generic check - just see if endpoint responds
                    response = requests.get(network.rpc_endpoint, timeout=5)
                    is_healthy = response.status_code < 400
                    details = f"Response code: {response.status_code}"
                    
                response_time = round((time.time() - start_time) * 1000, 2)  # Convert to ms
                
                # Log health status
                if is_healthy:
                    logger.info(f"Network {network.name} is healthy. {details} (response time: {response_time}ms)")
                else:
                    logger.warning(f"Network {network.name} health check failed. {details}")
                
                return {
                    'success': True,
                    'network': {
                        'id': network.id,
                        'name': network.name,
                        'chain_id': network.chain_id
                    },
                    'is_healthy': is_healthy,
                    'response_time_ms': response_time,
                    'details': details,
                    'timestamp': timezone.now()
                }
                
            except requests.RequestException as e:
                logger.error(f"Network health check failed for {network.name}: {str(e)}")
                
                return {
                    'success': False,
                    'network': {
                        'id': network.id,
                        'name': network.name,
                        'chain_id': network.chain_id
                    },
                    'is_healthy': False,
                    'error': str(e),
                    'timestamp': timezone.now()
                }
                
        except Exception as e:
            logger.error(f"Error checking network health: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }


class TokenService:
    """
    Service for token-related operations
    """
    
    @staticmethod
    def list_networks(active_only=True):
        """
        List available blockchain networks
        
        Args:
            active_only: If True, only active networks are returned
            
        Returns:
            QuerySet: BlockchainNetwork objects
        """
        networks = BlockchainNetwork.objects.all()
        
        if active_only:
            networks = networks.filter(is_active=True)
            
        return networks
    
    @staticmethod
    def create_token(project, name, symbol, total_supply, admin_address, network_id, decimals=18):
        """
        Create a new token for a project (not deployed yet)
        
        Args:
            project: Project instance
            name: Token name
            symbol: Token symbol
            total_supply: Total supply of tokens
            admin_address: Admin wallet address
            network_id: Blockchain network ID
            decimals: Token decimals
            
        Returns:
            dict: Created token details
        """
        try:
            # Get the network
            try:
                if isinstance(network_id, str) and not network_id.isdigit():
                    network = BlockchainNetwork.objects.get(chain_id=network_id, is_active=True)
                else:
                    network = BlockchainNetwork.objects.get(id=network_id, is_active=True)
            except BlockchainNetwork.DoesNotExist:
                return {
                    'success': False,
                    'error': f"Network with ID {network_id} not found or not active"
                }
            
            # Check if a token with this symbol already exists for this project and network
            if ProjectToken.objects.filter(project=project, symbol=symbol, network=network).exists():
                return {
                    'success': False,
                    'error': f"Token with symbol {symbol} already exists for this project on {network.name}"
                }
            
            # Create token in database (not deployed yet)
            token = ProjectToken.objects.create(
                project=project,
                name=name,
                symbol=symbol,
                network=network,
                total_supply=total_supply,
                admin_address=admin_address,
                decimals=decimals,
                is_deployed=False
            )
            
            logger.info(f"Created token {token.symbol} for project {project.name}")
            
            return {
                'success': True,
                'token_id': token.id,
                'name': token.name,
                'symbol': token.symbol,
                'is_deployed': False,
                'message': 'Token created successfully. Ready for deployment.'
            }
            
        except Exception as e:
            logger.error(f"Error creating token: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }
    
    @staticmethod
    def deploy_token(token_id):
        """
        Deploy a token to the blockchain
        
        Args:
            token_id: Token UUID
            
        Returns:
            dict: Deployment result
        """
        try:
            # Get the token
            token = ProjectToken.objects.get(id=token_id)
            
            if token.is_deployed:
                return {
                    'success': False,
                    'error': 'Token is already deployed'
                }
            
            # Get the appropriate connector based on network
            connector = BlockchainConnector.get_connector_by_network_id(token.network.id)
            
            # Deploy the token
            result = connector.deploy_token(token)
            
            if result['success']:
                logger.info(f"Token {token.symbol} deployed successfully at {result['contract_address']}")
                return {
                    'success': True,
                    'token_id': token.id,
                    'contract_address': token.contract_address,
                    'tx_hash': token.creation_tx_hash,
                    'message': f"Token {token.symbol} deployed successfully"
                }
            else:
                logger.error(f"Failed to deploy token: {result.get('error', 'Unknown error')}")
                return result
            
        except ProjectToken.DoesNotExist:
            logger.error(f"Token with ID {token_id} not found")
            return {
                'success': False,
                'error': f"Token with ID {token_id} not found"
            }
        except Exception as e:
            logger.error(f"Error deploying token: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }
    
    @staticmethod
    def connect_wallet(user, wallet_address, network_id, verification_message=None, verification_signature=None):
        """
        Connect a wallet to a user
        
        Args:
            user: AppUser instance
            wallet_address: Blockchain wallet address
            network_id: Network ID
            verification_message: Optional verification message
            verification_signature: Optional signature
            
        Returns:
            dict: Connection result
        """
        try:
            # Get the network
            try:
                if isinstance(network_id, str) and not network_id.isdigit():
                    network = BlockchainNetwork.objects.get(chain_id=network_id, is_active=True)
                else:
                    network = BlockchainNetwork.objects.get(id=network_id, is_active=True)
            except BlockchainNetwork.DoesNotExist:
                return {
                    'success': False,
                    'error': f"Network with ID {network_id} not found or not active"
                }
            
            # Check if wallet already exists
            if UserWallet.objects.filter(user=user, address=wallet_address, network=network).exists():
                return {
                    'success': False,
                    'error': 'Wallet already connected to this user'
                }
            
            is_verified = False
            
            # If signature provided, verify it
            if verification_message and verification_signature:
                connector = BlockchainConnector.get_connector_by_network_id(network.id)
                is_verified = connector.verify_wallet(wallet_address, verification_message, verification_signature)
            
            # Create the wallet
            wallet = UserWallet.objects.create(
                user=user,
                address=wallet_address,
                network=network,
                is_verified=is_verified,
                verification_message=verification_message,
                verification_signature=verification_signature
            )
            
            logger.info(f"Connected wallet {wallet_address[:10]}... to user {user.external_id}")
            
            return {
                'success': True,
                'wallet_id': wallet.id,
                'is_verified': wallet.is_verified,
                'message': 'Wallet connected successfully'
            }
            
        except Exception as e:
            logger.error(f"Error connecting wallet: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }
    
    @staticmethod
    def redeem_tokens(user, amount, wallet_address, project_token=None):
        """
        Redeem tokens from off-chain to on-chain
        
        Args:
            user: AppUser instance
            amount: Amount to redeem
            wallet_address: Destination wallet address
            project_token: Optional ProjectToken instance (if None, uses the user's project token)
            
        Returns:
            dict: Redemption result
        """
        try:
            # Check user balance
            if user.token_balance < amount:
                return {
                    'success': False,
                    'error': 'Insufficient balance',
                    'available_balance': user.token_balance
                }
            
            # Get the project token
            if not project_token:
                # Try to find a token for the user's project
                try:
                    project_token = ProjectToken.objects.filter(
                        project=user.project,
                        is_deployed=True
                    ).first()
                    
                    if not project_token:
                        return {
                            'success': False,
                            'error': 'No deployed token found for this project'
                        }
                except Exception as e:
                    logger.error(f"Error finding project token: {str(e)}")
                    return {
                        'success': False,
                        'error': 'No deployed token found for this project'
                    }
            
            # Create transaction record
            with transaction.atomic():
                # Create the transaction record
                token_transaction = TokenTransaction.objects.create(
                    user=user,
                    project_token=project_token,
                    transaction_type='REDEMPTION',
                    amount=amount,
                    wallet_address=wallet_address,
                    status='PENDING'
                )
                
                # Get the appropriate connector based on network
                connector = BlockchainConnector.get_connector_by_network_id(project_token.network.id)
                
                # Execute the redemption
                result = connector.send_token_transaction(token_transaction)
                
                if result:
                    # Deduct from user's balance
                    user.token_balance -= amount
                    user.save(update_fields=['token_balance'])
                    
                    logger.info(f"Redeemed {amount} tokens for user {user.external_id}")
                    
                    return {
                        'success': True,
                        'transaction_id': token_transaction.id,
                        'tx_hash': token_transaction.tx_hash,
                        'new_balance': user.token_balance,
                        'message': 'Tokens redeemed successfully'
                    }
                else:
                    return {
                        'success': False,
                        'error': 'Failed to process redemption'
                    }
            
        except Exception as e:
            logger.error(f"Error redeeming tokens: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }
    
    @staticmethod
    def get_token_balance(wallet_address, project_token):
        """
        Get the on-chain token balance for a wallet
        
        Args:
            wallet_address: Wallet address
            project_token: ProjectToken instance
            
        Returns:
            dict: Balance information
        """
        try:
            if not project_token.is_deployed or not project_token.contract_address:
                return {
                    'success': False,
                    'error': 'Token is not deployed'
                }
            
            # Get the appropriate connector based on network
            connector = BlockchainConnector.get_connector_by_network_id(project_token.network.id)
            
            # Get the balance
            balance = connector.get_token_balance(wallet_address, project_token.contract_address)
            
            return {
                'success': True,
                'balance': balance,
                'token_symbol': project_token.symbol,
                'token_address': project_token.contract_address
            }
            
        except Exception as e:
            logger.error(f"Error getting token balance: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }
    
    @staticmethod
    def create_token_request(project, name, symbol, total_supply, admin_address, network_id, decimals=18):
        """
        Create a new token creation request for a project (to be approved by admin)
        
        Args:
            project: Project instance
            name: Token name
            symbol: Token symbol
            total_supply: Total supply of tokens
            admin_address: Admin wallet address
            network_id: Blockchain network ID
            decimals: Token decimals
            
        Returns:
            dict: Created token request details
        """
        try:
            # Get the network
            try:
                if isinstance(network_id, str) and not network_id.isdigit():
                    network = BlockchainNetwork.objects.get(chain_id=network_id, is_active=True)
                else:
                    network = BlockchainNetwork.objects.get(id=network_id, is_active=True)
            except BlockchainNetwork.DoesNotExist:
                return {
                    'success': False,
                    'error': f"Network with ID {network_id} not found or not active"
                }
            
            # Check if a pending or approved token request with this symbol already exists for this project and network
            if TokenCreationRequest.objects.filter(
                project=project, 
                symbol=symbol, 
                network=network,
                status__in=['pending', 'approved']
            ).exists():
                return {
                    'success': False,
                    'error': f"Token request with symbol {symbol} already exists for this project on {network.name}"
                }
            
            # Create token creation request in database
            token_request = TokenCreationRequest.objects.create(
                project=project,
                name=name,
                symbol=symbol,
                network=network,
                total_supply=total_supply,
                admin_address=admin_address,
                decimals=decimals,
                status='pending'
            )
            
            logger.info(f"Created token request {token_request.symbol} for project {project.name}")
            
            return {
                'success': True,
                'request_id': token_request.id,
                'name': token_request.name,
                'symbol': token_request.symbol,
                'status': token_request.status,
                'message': 'Token request created successfully. Pending admin approval.'
            }
            
        except Exception as e:
            logger.error(f"Error creating token request: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }
    
    @staticmethod
    def approve_token_request(request_id, reviewer, notes=None):
        """
        Approve a token creation request
        
        Args:
            request_id: Token request UUID
            reviewer: AppUser instance who is approving the request
            notes: Optional review notes
            
        Returns:
            dict: Approval result
        """
        try:
            # Get the token request
            token_request = TokenCreationRequest.objects.get(id=request_id)
            
            if token_request.status != 'pending':
                return {
                    'success': False,
                    'error': f'Token request is already {token_request.get_status_display()}'
                }
            
            with transaction.atomic():
                # Approve the request
                token_request.approve(reviewer, notes)
                
                # Create the actual token
                token_result = TokenService.create_token(
                    project=token_request.project,
                    name=token_request.name,
                    symbol=token_request.symbol,
                    total_supply=token_request.total_supply,
                    admin_address=token_request.admin_address,
                    network_id=token_request.network.id,
                    decimals=token_request.decimals
                )
                
                if token_result['success']:
                    # Store the token ID in the request for reference
                    token_request.token_id = token_result['token_id']
                    token_request.save(update_fields=['token_id'])
                    
                    logger.info(f"Token request {token_request.symbol} approved by {reviewer.external_id} and token created")
                    
                    return {
                        'success': True,
                        'request_id': token_request.id,
                        'token_id': token_result['token_id'],
                        'status': token_request.status,
                        'message': f"Token request for {token_request.symbol} approved and token created successfully"
                    }
                else:
                    # Revert to pending if token creation fails
                    token_request.status = 'pending'
                    token_request.save(update_fields=['status'])
                    
                    logger.error(f"Token request approved but token creation failed: {token_result.get('error')}")
                    
                    return {
                        'success': False,
                        'error': f"Token request approved but token creation failed: {token_result.get('error')}"
                    }
            
        except TokenCreationRequest.DoesNotExist:
            logger.error(f"Token request with ID {request_id} not found")
            return {
                'success': False,
                'error': f"Token request with ID {request_id} not found"
            }
        except Exception as e:
            logger.error(f"Error approving token request: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }
    
    @staticmethod
    def reject_token_request(request_id, reviewer, rejection_reason=None):
        """
        Reject a token creation request
        
        Args:
            request_id: Token request UUID
            reviewer: AppUser instance who is rejecting the request
            rejection_reason: Reason for rejection
            
        Returns:
            dict: Rejection result
        """
        try:
            # Get the token request
            token_request = TokenCreationRequest.objects.get(id=request_id)
            
            if token_request.status != 'pending':
                return {
                    'success': False,
                    'error': f'Token request is already {token_request.get_status_display()}'
                }
            
            # Reject the request
            token_request.status = 'rejected'
            token_request.reviewed_by = reviewer
            token_request.reviewed_at = timezone.now()
            token_request.review_notes = rejection_reason
            token_request.save()
            
            logger.info(f"Token request {token_request.symbol} rejected by {reviewer.external_id}")
            
            return {
                'success': True,
                'request_id': token_request.id,
                'status': token_request.status,
                'message': f"Token request for {token_request.symbol} rejected"
            }
            
        except TokenCreationRequest.DoesNotExist:
            logger.error(f"Token request with ID {request_id} not found")
            return {
                'success': False,
                'error': f"Token request with ID {request_id} not found"
            }
        except Exception as e:
            logger.error(f"Error rejecting token request: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }
    
    @staticmethod
    def deploy_approved_token(request_id):
        """
        Deploy a token from an approved request to the blockchain
        
        Args:
            request_id: Token request UUID
            
        Returns:
            dict: Deployment result
        """
        try:
            # Get the token request
            token_request = TokenCreationRequest.objects.get(id=request_id)
            
            if token_request.status != 'approved':
                return {
                    'success': False,
                    'error': f'Token request must be approved first. Current status: {token_request.get_status_display()}'
                }
            
            with transaction.atomic():
                # Create the ProjectToken
                project_token = ProjectToken.objects.create(
                    project=token_request.project,
                    name=token_request.name,
                    symbol=token_request.symbol,
                    network=token_request.network,
                    total_supply=token_request.total_supply,
                    admin_address=token_request.admin_address,
                    decimals=token_request.decimals,
                    is_deployed=False
                )
                
                # Deploy the token
                connector = BlockchainConnector.get_connector_by_network_id(token_request.network.id)
                result = connector.deploy_token(project_token)
                
                if result['success']:
                    # Link the deployed token to the request and update status
                    token_request.deployed_token = project_token
                    token_request.status = 'deployed'
                    token_request.save(update_fields=['deployed_token', 'status', 'updated_at'])
                    
                    logger.info(f"Token {project_token.symbol} from request {request_id} deployed successfully at {result['contract_address']}")
                    return {
                        'success': True,
                        'token_id': project_token.id,
                        'request_id': token_request.id,
                        'contract_address': project_token.contract_address,
                        'tx_hash': project_token.creation_tx_hash,
                        'message': f"Token {project_token.symbol} deployed successfully"
                    }
                else:
                    # Deployment failed, rollback transaction will delete the ProjectToken
                    logger.error(f"Failed to deploy token from request: {result.get('error', 'Unknown error')}")
                    return result
            
        except TokenCreationRequest.DoesNotExist:
            logger.error(f"Token request with ID {request_id} not found")
            return {
                'success': False,
                'error': f"Token request with ID {request_id} not found"
            }
        except Exception as e:
            logger.error(f"Error deploying token from request: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }
            
    @staticmethod
    def list_token_requests(project=None, status=None):
        """
        List token creation requests with optional filtering
        
        Args:
            project: Optional Project instance to filter by
            status: Optional status to filter by
            
        Returns:
            QuerySet: TokenCreationRequest objects
        """
        requests = TokenCreationRequest.objects.all()
        
        if project:
            requests = requests.filter(project=project)
            
        if status:
            if isinstance(status, list):
                requests = requests.filter(status__in=status)
            else:
                requests = requests.filter(status=status)
                
        return requests.order_by('-submitted_at')
    
    @staticmethod
    def list_token_requests(status=None, project=None):
        """
        List token creation requests with optional filters
        
        Args:
            status: Optional filter by status ('pending', 'approved', 'rejected')
            project: Optional filter by project
            
        Returns:
            QuerySet: TokenCreationRequest objects
        """
        requests = TokenCreationRequest.objects.all().order_by('-created_at')
        
        if status:
            requests = requests.filter(status=status)
            
        if project:
            requests = requests.filter(project=project)
            
        return requests
    
    @staticmethod
    def approve_token_request(request_id, approved_by=None):
        """
        Approve a token creation request and create the token
        
        Args:
            request_id: TokenCreationRequest ID
            approved_by: User who approved the request (optional)
            
        Returns:
            dict: Approval result with token details
        """
        try:
            # Get the request
            try:
                token_request = TokenCreationRequest.objects.get(id=request_id)
            except TokenCreationRequest.DoesNotExist:
                return {
                    'success': False,
                    'error': f"Token request with ID {request_id} not found"
                }
            
            # Check if request is already processed
            if token_request.status != 'pending':
                return {
                    'success': False,
                    'error': f"Token request is already {token_request.status}"
                }
            
            # Create token from the request
            token_result = TokenService.create_token(
                project=token_request.project,
                name=token_request.name,
                symbol=token_request.symbol,
                total_supply=token_request.total_supply,
                admin_address=token_request.admin_address,
                network_id=token_request.network.id,
                decimals=token_request.decimals
            )
            
            if not token_result['success']:
                return {
                    'success': False,
                    'error': f"Failed to create token: {token_result.get('error')}"
                }
            
            # Update request status
            token_request.status = 'approved'
            token_request.processed_at = timezone.now()
            token_request.processed_by = approved_by
            token_request.token_id = token_result.get('token_id')
            token_request.save(update_fields=['status', 'processed_at', 'processed_by', 'token_id'])
            
            logger.info(f"Approved token request {token_request.id} for {token_request.symbol}")
            
            return {
                'success': True,
                'request_id': token_request.id,
                'token_id': token_result.get('token_id'),
                'name': token_request.name,
                'symbol': token_request.symbol,
                'message': 'Token request approved successfully. Token created.'
            }
            
        except Exception as e:
            logger.error(f"Error approving token request: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }
    
    @staticmethod
    def reject_token_request(request_id, reason=None, rejected_by=None):
        """
        Reject a token creation request
        
        Args:
            request_id: TokenCreationRequest ID
            reason: Reason for rejection (optional)
            rejected_by: User who rejected the request (optional)
            
        Returns:
            dict: Rejection result
        """
        try:
            # Get the request
            try:
                token_request = TokenCreationRequest.objects.get(id=request_id)
            except TokenCreationRequest.DoesNotExist:
                return {
                    'success': False,
                    'error': f"Token request with ID {request_id} not found"
                }
            
            # Check if request is already processed
            if token_request.status != 'pending':
                return {
                    'success': False,
                    'error': f"Token request is already {token_request.status}"
                }
            
            # Update request status
            token_request.status = 'rejected'
            token_request.rejection_reason = reason
            token_request.processed_at = timezone.now()
            token_request.processed_by = rejected_by
            token_request.save(update_fields=['status', 'rejection_reason', 'processed_at', 'processed_by'])
            
            logger.info(f"Rejected token request {token_request.id} for {token_request.symbol}")
            
            return {
                'success': True,
                'request_id': token_request.id,
                'name': token_request.name,
                'symbol': token_request.symbol,
                'reason': reason,
                'message': 'Token request rejected successfully.'
            }
            
        except Exception as e:
            logger.error(f"Error rejecting token request: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }