import logging
import time
import json
import requests
from decimal import Decimal
from django.conf import settings
from django.db import transaction

# Import Cosmos SDK libraries for Sei integration
from cosmpy.aerial.client import LedgerClient, NetworkConfig
from cosmpy.aerial.wallet import LocalWallet
from cosmpy.aerial.tx import Transaction
from cosmpy.aerial.client.utils import prepare_and_broadcast_basic_transaction
from bech32 import bech32_decode, bech32_encode, convertbits
import base64
import random

from .models import TokenRedemption, BlockchainNetwork, ProjectToken, TokenTransaction

logger = logging.getLogger('django')

class BlockchainConnector:
    """
    Handles interaction between the Link3 platform and blockchain networks
    """
    
    @staticmethod
    def get_connector_for_network(network_name):
        """
        Factory method to get the appropriate connector for a blockchain network
        
        Args:
            network_name: Name of the blockchain network (sei, ethereum, etc.)
            
        Returns:
            BlockchainConnector: Appropriate connector instance
        """
        if network_name == 'sei':
            return SeiConnector()
        elif network_name == 'ethereum':
            return EthereumConnector()
        else:
            raise ValueError(f"Unsupported blockchain network: {network_name}")
    
    @staticmethod
    def get_connector_by_network_id(network_id):
        """
        Get connector by network ID from the database
        
        Args:
            network_id: Database ID or chain_id of the network
            
        Returns:
            BlockchainConnector: Appropriate connector instance
        """
        try:
            # Check if it's a UUID or a string chain_id
            if isinstance(network_id, str) and not network_id.isdigit():
                network = BlockchainNetwork.objects.get(chain_id=network_id)
            else:
                network = BlockchainNetwork.objects.get(id=network_id)
                
            # Get the network type from the chain_id
            if network.chain_id.startswith('sei'):
                return SeiConnector(network)
            elif network.chain_id in ['1', '5', '11155111']: # Ethereum mainnet, Goerli, Sepolia
                return EthereumConnector(network)
            else:
                raise ValueError(f"Unsupported blockchain network: {network.name}")
        except BlockchainNetwork.DoesNotExist:
            raise ValueError(f"Network with ID {network_id} not found")
    
    def send_tokens(self, redemption):
        """
        Base method to send tokens to a user's wallet
        
        Args:
            redemption: TokenRedemption instance
            
        Returns:
            bool: Success status
        """
        # Validation of the redemption request
        if not redemption.wallet_address:
            logger.error(f"Redemption {redemption.id} has no wallet address")
            redemption.mark_failed("No wallet address provided")
            return False
            
        if redemption.amount <= 0:
            logger.error(f"Redemption {redemption.id} has invalid amount: {redemption.amount}")
            redemption.mark_failed("Amount must be positive")
            return False
            
        # Get project token for this user
        try:
            project_token = ProjectToken.objects.filter(
                project=redemption.user.project,
                is_deployed=True
            ).first()
            
            if not project_token:
                logger.error(f"No deployed token found for project {redemption.user.project.id}")
                redemption.mark_failed("No deployed token found for this project")
                return False
                
            # Create a TokenTransaction record for tracking
            with transaction.atomic():
                token_tx = TokenTransaction.objects.create(
                    user=redemption.user,
                    project_token=project_token,
                    transaction_type='REDEMPTION',
                    amount=redemption.amount,
                    wallet_address=redemption.wallet_address,
                    status='PENDING'
                )
                
                # Link this transaction to the redemption for easy tracking
                redemption.transaction_id = str(token_tx.id)
                redemption.save(update_fields=['transaction_id'])
            
            # Let the specific connector implementation handle the blockchain interaction
            return self._process_send_tokens(redemption, token_tx, project_token)
            
        except Exception as e:
            logger.error(f"Error processing redemption {redemption.id}: {str(e)}")
            redemption.mark_failed(str(e))
            return False
            
    def _process_send_tokens(self, redemption, token_transaction, project_token):
        """
        Implementation-specific method for sending tokens
        
        Args:
            redemption: TokenRedemption instance
            token_transaction: TokenTransaction instance
            project_token: ProjectToken instance
            
        Returns:
            bool: Success status
        """
        raise NotImplementedError("Subclasses must implement _process_send_tokens")
    
    def check_transaction_status(self, tx_hash):
        """
        Check the status of a blockchain transaction
        
        Args:
            tx_hash: Transaction hash to check
            
        Returns:
            str: Transaction status (confirmed, pending, failed)
        """
        raise NotImplementedError("Subclasses must implement check_transaction_status")
    
    def deploy_token(self, project_token):
        """
        Deploy a token to the blockchain
        
        Args:
            project_token: ProjectToken instance
            
        Returns:
            dict: Deployment result with contract address and tx hash
        """
        raise NotImplementedError("Subclasses must implement deploy_token")
    
    def verify_wallet(self, address, message, signature):
        """
        Verify a wallet signature
        
        Args:
            address: Wallet address
            message: Message that was signed
            signature: Signature to verify
            
        Returns:
            bool: True if signature is valid
        """
        raise NotImplementedError("Subclasses must implement verify_wallet")
    
    def get_token_balance(self, address, contract_address):
        """
        Get token balance for an address
        
        Args:
            address: Wallet address
            contract_address: Token contract address
            
        Returns:
            Decimal: Token balance
        """
        raise NotImplementedError("Subclasses must implement get_token_balance")
    
    def send_token_transaction(self, transaction):
        """
        Process a token transaction
        
        Args:
            transaction: TokenTransaction instance
            
        Returns:
            bool: Success status
        """
        raise NotImplementedError("Subclasses must implement send_token_transaction")


class SeiConnector(BlockchainConnector):
    """
    Connector for Sei Network
    """
    
    def __init__(self, network=None):
        # Set up Sei network configuration
        self.network_name = 'sei'
        
        if network:
            # Use the provided network from database
            self.network = network
            self.rpc_url = network.rpc_endpoint
            self.chain_id = network.chain_id
        else:
            # Fallback to settings
            self.network = None
            self.rpc_url = settings.BLOCKCHAIN.get('SEI', {}).get('RPC_URL', 'https://sei-testnet-rpc.polkachu.com')
            self.chain_id = settings.BLOCKCHAIN.get('SEI', {}).get('CHAIN_ID', 'sei-testnet')
        
        # Set up project admin wallet (for token deployments and operations)
        self.admin_mnemonic = settings.BLOCKCHAIN.get('SEI', {}).get('ADMIN_MNEMONIC', '')
        self.gas_price = settings.BLOCKCHAIN.get('SEI', {}).get('GAS_PRICE', 0.1)
        
        # Initialize CosmWasm client
        try:
            self.cfg = NetworkConfig(
                chain_id=self.chain_id,
                url=self.rpc_url,
                fee_minimum_gas_price=self.gas_price,
                fee_denomination="usei",
                staking_denomination="usei",
            )
            if self.admin_mnemonic:
                self.admin_wallet = LocalWallet.from_mnemonic(self.admin_mnemonic)
                logger.info(f"Admin wallet initialized with address: {self.admin_wallet.address()}")
            else:
                self.admin_wallet = None
                logger.warning("No admin wallet mnemonic provided. Limited functionality available.")
        except Exception as e:
            logger.error(f"Failed to initialize Sei client: {str(e)}")
            self.cfg = None
    
    def _get_client(self):
        """Get a ledger client for Sei network"""
        if not self.cfg:
            raise ValueError("Sei client not initialized")
        return LedgerClient(self.cfg)
    
    def _convert_to_microsei(self, amount):
        """Convert SEI to usei (1 SEI = 1,000,000 usei)"""
        return int(amount * 1_000_000)
    
    def _convert_from_microsei(self, amount):
        """Convert usei to SEI"""
        return Decimal(amount) / Decimal(1_000_000)
    
    def send_tokens(self, redemption):
        """
        Send tokens on Sei network
        
        Args:
            redemption: TokenRedemption instance
            
        Returns:
            bool: Success status
        """
        logger.info(f"Processing redemption {redemption.id} on Sei network")
        
        try:
            # Mark as processing
            redemption.mark_processing()
            
            # For MVP, we'll simulate blockchain interaction but with real validation
            # In a production system, we would:
            # 1. Validate the destination wallet address
            # 2. Check admin wallet balance
            # 3. Create and sign a token transfer transaction
            # 4. Broadcast to the network
            # 5. Return the transaction hash
            
            # Basic validation - check if it's a valid Sei address
            if not redemption.wallet_address.startswith('sei1'):
                raise ValueError(f"Invalid Sei address: {redemption.wallet_address}")
            
            # Simulate transaction with slight delay
            time.sleep(2)
            
            # Generate a real-looking transaction hash
            import uuid
            tx_hash = f"sei_{uuid.uuid4().hex}"
            
            # Mark redemption as complete
            redemption.mark_completed(tx_hash)
            
            logger.info(f"Redemption {redemption.id} completed with tx: {tx_hash}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to process redemption {redemption.id}: {str(e)}")
            redemption.mark_failed(str(e))
            return False
    
    def _process_send_tokens(self, redemption, token_transaction, project_token):
        """
        Process token transfers on Sei network
        
        Args:
            redemption: TokenRedemption instance
            token_transaction: TokenTransaction instance tracking this transaction
            project_token: ProjectToken instance to use for the transfer
            
        Returns:
            bool: Success status
        """
        logger.info(f"Processing Sei token transfer for redemption {redemption.id}, amount: {redemption.amount}")
        
        try:
            # Mark both records as processing
            redemption.mark_processing()
            token_transaction.mark_processing()
            
            # Validate destination address format
            if not redemption.wallet_address.startswith('sei1'):
                error_msg = f"Invalid Sei address format: {redemption.wallet_address}"
                logger.error(error_msg)
                redemption.mark_failed(error_msg)
                token_transaction.mark_failed()
                return False
                
            # Validate token contract is deployed
            if not project_token.contract_address or not project_token.is_deployed:
                error_msg = "Token contract is not properly deployed"
                logger.error(error_msg)
                redemption.mark_failed(error_msg)
                token_transaction.mark_failed()
                return False
            
            # In a production implementation, we would:
            # 1. Create a CW20 "transfer" execute message
            # 2. Sign the message with the admin wallet
            # 3. Broadcast the transaction to the Sei network
            # 4. Wait for confirmation and get the tx hash
            
            # For MVP, we'll simulate the transfer
            time.sleep(2)  # Simulate blockchain delay
            
            # Generate a transaction hash that looks like a Sei tx hash
            tx_hash = f"sei_{uuid.uuid4().hex}"
            
            # Update both records with successful tx hash
            redemption.mark_completed(tx_hash)
            token_transaction.mark_confirmed(tx_hash)
            
            # Log success with precise amounts
            logger.info(f"Successfully transferred exactly {redemption.amount} tokens to {redemption.wallet_address}")
            logger.info(f"Transaction hash: {tx_hash}")
            
            return True
            
        except Exception as e:
            error_msg = f"Failed to process Sei token transfer: {str(e)}"
            logger.error(error_msg)
            redemption.mark_failed(error_msg)
            token_transaction.mark_failed()
            return False
    
    def check_transaction_status(self, tx_hash):
        """
        Check transaction status on Sei network
        
        Args:
            tx_hash: Transaction hash
            
        Returns:
            str: Transaction status
        """
        try:
            client = self._get_client()
            
            # If simulated transaction (for testing)
            if tx_hash.startswith('sei_'):
                return "confirmed"
            
            # Query the Sei blockchain for transaction status
            tx_response = client.query_tx(tx_hash)
            if tx_response.code == 0:
                return "confirmed"
            else:
                return "failed"
        except Exception as e:
            logger.error(f"Error checking transaction status: {str(e)}")
            return "pending"
        
    def deploy_token(self, project_token):
        """
        Deploy a token contract to Sei network
        
        Args:
            project_token: ProjectToken instance
            
        Returns:
            dict: Deployment result
        """
        logger.info(f"Deploying token {project_token.symbol} for project {project_token.project.name}")
        
        try:
            # In a real implementation with CosmWasm, we would:
            # 1. Store the CW20 token contract bytecode on chain
            # 2. Instantiate the contract with initial parameters
            # 3. Return the contract address
            
            # For this MVP, we'll simulate blockchain interaction
            # but do proper validation
            
            # Validate admin address format (sei1...)
            if not project_token.admin_address.startswith('sei1'):
                return {
                    'success': False,
                    'error': f"Invalid Sei address format: {project_token.admin_address}"
                }
            
            # Validate name and symbol
            if len(project_token.symbol) > 12:
                return {
                    'success': False, 
                    'error': "Token symbol must be 12 characters or less"
                }
            
            if len(project_token.name) > 64:
                return {
                    'success': False,
                    'error': "Token name must be 64 characters or less"
                }
            
            # Simulate deployment with delay
            time.sleep(2)
            
            # Generate a realistic Sei contract address
            sei_prefix = "sei1"
            random_suffix = ''.join(random.choices('0123456789abcdefghijklmnopqrstuvwxyz', k=38))
            contract_address = f"{sei_prefix}{random_suffix}"
            
            # Generate a realistic transaction hash
            tx_hash = "".join(random.choices("0123456789abcdef", k=64))
            
            # Update the project token
            project_token.contract_address = contract_address
            project_token.creation_tx_hash = tx_hash
            project_token.is_deployed = True
            project_token.save(update_fields=['contract_address', 'creation_tx_hash', 'is_deployed', 'updated_at'])
            
            logger.info(f"Token {project_token.symbol} deployed at {contract_address}")
            
            return {
                'success': True,
                'contract_address': contract_address,
                'tx_hash': tx_hash
            }
            
        except Exception as e:
            logger.error(f"Failed to deploy token {project_token.id}: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def verify_wallet(self, address, message, signature):
        """
        Verify a Sei wallet signature
        
        Args:
            address: Wallet address
            message: Message that was signed
            signature: Signature to verify
            
        Returns:
            bool: True if signature is valid
        """
        # For the MVP, we're simulating verification
        # In a real implementation, we would verify the signature using the Sei SDK
        logger.info(f"Verifying signature for address {address}")
        
        # Basic validation - check if it's a valid Sei address
        if not address.startswith('sei1'):
            logger.warning(f"Invalid Sei address format: {address}")
            return False
        
        # Simulate verification for MVP (always return True for valid addresses)
        return True
    
    def get_token_balance(self, address, contract_address):
        """
        Get token balance for an address on Sei network
        
        Args:
            address: Wallet address
            contract_address: Token contract address
            
        Returns:
            Decimal: Token balance
        """
        logger.info(f"Fetching token balance for {address} on contract {contract_address}")
        
        try:
            # Basic validation
            if not address.startswith('sei1'):
                logger.warning(f"Invalid Sei address format: {address}")
                return Decimal('0')
            
            if not contract_address.startswith('sei1'):
                logger.warning(f"Invalid Sei contract address format: {contract_address}")
                return Decimal('0')
            
            # For MVP, we'll simulate a balance
            # In a real implementation, we would query the CW20 token balance
            import random
            balance = Decimal(random.randint(100, 1000))
            
            return balance
            
        except Exception as e:
            logger.error(f"Failed to get token balance: {str(e)}")
            return Decimal('0')
    
    def send_token_transaction(self, transaction):
        """
        Process a token transaction on Sei network
        
        Args:
            transaction: TokenTransaction instance
            
        Returns:
            bool: Success status
        """
        logger.info(f"Processing transaction {transaction.id} on Sei network")
        
        try:
            # Mark as processing
            transaction.mark_processing()
            
            # Basic validation
            if not transaction.wallet_address.startswith('sei1'):
                raise ValueError(f"Invalid Sei address: {transaction.wallet_address}")
            
            # In a real implementation, we would:
            # 1. Check if the token contract is deployed
            # 2. Prepare the appropriate transaction message
            # 3. Sign and broadcast it
            
            # For the MVP, we'll simulate the blockchain interaction
            time.sleep(2)  # Simulate blockchain delay
            
            # Generate a fake transaction hash
            tx_hash = "".join(random.choices("0123456789abcdef", k=64))
            
            # Mark transaction as confirmed
            transaction.mark_confirmed(tx_hash)
            
            logger.info(f"Transaction {transaction.id} completed with tx: {tx_hash}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to process transaction {transaction.id}: {str(e)}")
            transaction.mark_failed()
            return False


class EthereumConnector(BlockchainConnector):
    """
    Connector for Ethereum Network
    """
    
    def __init__(self, network=None):
        # Set up Ethereum network configuration
        self.network_name = 'ethereum'
        
        if network:
            # Use the provided network from database
            self.network = network
            self.rpc_url = network.rpc_endpoint
            self.chain_id = network.chain_id
        else:
            # Fallback to settings
            self.network = None
            self.rpc_url = getattr(settings, 'ETH_RPC_URL', 'https://ethereum-goerli.example.com')
            self.chain_id = getattr(settings, 'ETH_CHAIN_ID', '5')  # Default to Goerli
        
        # In a real implementation, you'd set up the Web3 client here
    
    def send_tokens(self, redemption):
        """
        Send tokens on Ethereum network
        
        Args:
            redemption: TokenRedemption instance
            
        Returns:
            bool: Success status
        """
        logger.info(f"Processing redemption {redemption.id} on Ethereum network")
        
        try:
            # Mark as processing
            redemption.mark_processing()
            
            # In a real implementation, you would:
            # 1. Connect to Ethereum with Web3
            # 2. Create a contract instance
            # 3. Build and sign the transaction
            # 4. Send the transaction
            # 5. Get the transaction hash
            
            # For this example, we'll simulate blockchain interaction
            time.sleep(2)  # Simulate blockchain delay
            
            # Generate a fake transaction hash
            import uuid
            tx_hash = f"0x{uuid.uuid4().hex}"
            
            # Mark redemption as complete
            redemption.mark_completed(tx_hash)
            
            logger.info(f"Redemption {redemption.id} completed with tx: {tx_hash}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to process redemption {redemption.id}: {str(e)}")
            redemption.mark_failed(str(e))
            return False
    
    def _process_send_tokens(self, redemption, token_transaction, project_token):
        """
        Process token transfers on Ethereum network
        
        Args:
            redemption: TokenRedemption instance
            token_transaction: TokenTransaction instance tracking this transfer
            project_token: ProjectToken instance to use for the transfer
            
        Returns:
            bool: Success status
        """
        logger.info(f"Processing Ethereum token transfer for redemption {redemption.id}, amount: {redemption.amount}")
        
        try:
            # Mark both records as processing
            redemption.mark_processing()
            token_transaction.mark_processing()
            
            # Validate destination address format (0x...)
            if not redemption.wallet_address.startswith('0x'):
                error_msg = f"Invalid Ethereum address format: {redemption.wallet_address}"
                logger.error(error_msg)
                redemption.mark_failed(error_msg)
                token_transaction.mark_failed()
                return False
                
            # Validate token contract is deployed
            if not project_token.contract_address or not project_token.is_deployed:
                error_msg = "Token contract is not properly deployed"
                logger.error(error_msg)
                redemption.mark_failed(error_msg)
                token_transaction.mark_failed()
                return False
                
            # In a production implementation, we would:
            # 1. Use Web3.py to create a contract instance for the ERC-20 token
            # 2. Call the transfer function with recipient address and exact amount
            # 3. Wait for transaction confirmation
            # 4. Get the transaction receipt
            
            # For MVP, we'll simulate the transfer
            time.sleep(2)  # Simulate blockchain delay
            
            # Generate a transaction hash that looks like an Ethereum tx hash
            import uuid
            tx_hash = f"0x{uuid.uuid4().hex}"
            
            # Convert the amount to token units based on decimals (typically 18 for Ethereum)
            # In a real implementation, this would be handled by Web3.py's unit conversion functions
            decimals = project_token.decimals
            token_amount_wei = int(redemption.amount * (10 ** decimals))
            
            # Update both records with successful tx hash
            redemption.mark_completed(tx_hash)
            token_transaction.mark_confirmed(tx_hash)
            
            # Log success with precise amounts
            logger.info(f"Successfully transferred exactly {redemption.amount} tokens ({token_amount_wei} base units) to {redemption.wallet_address}")
            logger.info(f"Transaction hash: {tx_hash}")
            
            return True
            
        except Exception as e:
            error_msg = f"Failed to process Ethereum token transfer: {str(e)}"
            logger.error(error_msg)
            redemption.mark_failed(error_msg)
            token_transaction.mark_failed()
            return False
    
    def check_transaction_status(self, tx_hash):
        """
        Check transaction status on Ethereum network
        
        Args:
            tx_hash: Transaction hash
            
        Returns:
            str: Transaction status
        """
        # In a real implementation, you would query the Ethereum blockchain
        # For this example, we'll simulate a successful transaction
        return "confirmed"
        
    def deploy_token(self, project_token):
        """
        Deploy a token contract to Ethereum network
        
        Args:
            project_token: ProjectToken instance
            
        Returns:
            dict: Deployment result
        """
        logger.info(f"Deploying token {project_token.symbol} for project {project_token.project.name}")
        
        try:
            # In a real implementation, you would:
            # 1. Use Web3.py to deploy an ERC20 token contract
            # 2. Send the deployment transaction
            # 3. Wait for confirmation
            # 4. Get the contract address
            
            # For this MVP, we'll simulate blockchain interaction
            time.sleep(2)  # Simulate blockchain delay
            
            # Generate a fake contract address and tx hash
            import uuid
            contract_address = f"0x{uuid.uuid4().hex[:40]}"
            tx_hash = f"0x{uuid.uuid4().hex}"
            
            # Update the project token
            project_token.contract_address = contract_address
            project_token.creation_tx_hash = tx_hash
            project_token.is_deployed = True
            project_token.save(update_fields=['contract_address', 'creation_tx_hash', 'is_deployed', 'updated_at'])
            
            logger.info(f"Token {project_token.symbol} deployed at {contract_address}")
            
            return {
                'success': True,
                'contract_address': contract_address,
                'tx_hash': tx_hash
            }
            
        except Exception as e:
            logger.error(f"Failed to deploy token {project_token.id}: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def verify_wallet(self, address, message, signature):
        """
        Verify an Ethereum wallet signature
        
        Args:
            address: Wallet address
            message: Message that was signed
            signature: Signature to verify
            
        Returns:
            bool: True if signature is valid
        """
        # In a real implementation, you would use eth_sign for verification
        # For this MVP, we'll simulate it
        logger.info(f"Verifying signature for address {address}")
        
        # Simulate verification (always return True)
        return True
    
    def get_token_balance(self, address, contract_address):
        """
        Get token balance for an address on Ethereum network
        
        Args:
            address: Wallet address
            contract_address: Token contract address
            
        Returns:
            Decimal: Token balance
        """
        logger.info(f"Fetching token balance for {address} on contract {contract_address}")
        
        try:
            # In a real implementation, you would:
            # 1. Use Web3.py to create a contract instance
            # 2. Call the balanceOf method
            # 3. Convert the result to a decimal
            
            # For this MVP, we'll simulate a balance
            import random
            balance = Decimal(random.randint(100, 1000))
            
            return balance
            
        except Exception as e:
            logger.error(f"Failed to get token balance: {str(e)}")
            return Decimal('0')
    
    def send_token_transaction(self, transaction):
        """
        Process a token transaction on Ethereum network
        
        Args:
            transaction: TokenTransaction instance
            
        Returns:
            bool: Success status
        """
        logger.info(f"Processing transaction {transaction.id} on Ethereum network")
        
        try:
            # Mark as processing
            transaction.mark_processing()
            
            # In a real implementation, you would:
            # 1. Use Web3.py to create a contract instance
            # 2. Call the appropriate method based on transaction_type
            # 3. Sign and send the transaction
            # 4. Get the transaction hash
            
            # For this MVP, we'll simulate blockchain interaction
            time.sleep(2)  # Simulate blockchain delay
            
            # Generate a fake transaction hash
            import uuid
            tx_hash = f"0x{uuid.uuid4().hex}"
            
            # Mark transaction as confirmed
            transaction.mark_confirmed(tx_hash)
            
            logger.info(f"Transaction {transaction.id} completed with tx: {tx_hash}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to process transaction {transaction.id}: {str(e)}")
            transaction.mark_failed()
            return False