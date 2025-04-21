from django.core.management.base import BaseCommand
import logging
import uuid
import time  # Add time module import
from decimal import Decimal
from django.utils import timezone
from blockchain.connector import SeiConnector
from blockchain.models import BlockchainNetwork, ProjectToken, TokenTransaction
from users.models import Project, AppUser

logger = logging.getLogger('django')

class Command(BaseCommand):
    help = 'Test the Sei blockchain integration (token creation and redemption)'

    def add_arguments(self, parser):
        parser.add_argument(
            '--project_id',
            type=str,
            help='Project ID to use for testing (default: create a test project)',
        )
        parser.add_argument(
            '--wallet',
            type=str,
            help='Wallet address to use for testing (must start with sei1)',
        )
        parser.add_argument(
            '--amount',
            type=float,
            default=100.0,
            help='Amount of tokens to redeem in the test (default: 100)',
        )

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("\n======== LINK3 SEI BLOCKCHAIN INTEGRATION TEST ========"))
        self.stdout.write(self.style.NOTICE(f"Starting test at {timezone.now().strftime('%Y-%m-%d %H:%M:%S')}"))
        self.stdout.write("="*56)
        
        # Validate wallet address if provided
        test_wallet = options.get('wallet')
        if test_wallet and not test_wallet.startswith('sei1'):
            self.stdout.write(self.style.ERROR(f"Invalid Sei wallet address: {test_wallet}"))
            self.stdout.write(self.style.ERROR("Wallet address must start with 'sei1'"))
            return
        
        redemption_amount = Decimal(str(options.get('amount', 100.0)))
        if redemption_amount <= 0:
            self.stdout.write(self.style.ERROR(f"Invalid redemption amount: {redemption_amount}"))
            self.stdout.write(self.style.ERROR("Amount must be greater than 0"))
            return
            
        # Get or create a test project
        project_id = options.get('project_id')
        if project_id:
            try:
                project = Project.objects.get(id=project_id)
                self.stdout.write(f"Using existing project: {project.name} ({project.id})")
            except Project.DoesNotExist:
                self.stdout.write(self.style.ERROR(f"Project with ID {project_id} not found"))
                return
        else:
            # Create a test project
            project = Project.objects.create(
                name=f"Link3 Test Project {timezone.now().strftime('%m%d')}",
                api_key=f"link3_{uuid.uuid4().hex}",
                is_active=True
            )
            self.stdout.write(self.style.SUCCESS(f"Created test project: {project.name} ({project.id})"))
        
        # Get or create a test user
        test_user = AppUser.objects.filter(project=project).first()
        if not test_user:
            test_user = AppUser.objects.create(
                project=project,
                external_id=f"test_user_{uuid.uuid4().hex[:8]}",
                token_balance=Decimal('1000')
            )
            self.stdout.write(self.style.SUCCESS(f"Created test user: {test_user.external_id} with 1000 tokens"))
        else:
            self.stdout.write(f"Using existing user: {test_user.external_id}")
            # Ensure user has enough tokens
            if test_user.token_balance < redemption_amount + Decimal('100'):  # Add buffer
                previous_balance = test_user.token_balance
                test_user.token_balance = redemption_amount + Decimal('500')  # Add extra for future tests
                test_user.save(update_fields=['token_balance'])
                self.stdout.write(self.style.SUCCESS(f"Updated user balance: {previous_balance} → {test_user.token_balance} tokens"))
        
        # Get Sei testnet network
        try:
            network = BlockchainNetwork.objects.get(chain_id='sei-testnet')
            self.stdout.write(f"Using Sei testnet: {network.chain_id} at {network.rpc_endpoint}")
        except BlockchainNetwork.DoesNotExist:
            self.stdout.write(self.style.ERROR("Sei testnet network not found. Please run setup_networks command first."))
            return
        
        # Get test wallet
        if not test_wallet:
            test_wallet = "sei10zt65lmhqhhhswlxhj0zcmkxhz8v35xptsf0d2"  # Example sei wallet
            self.stdout.write(self.style.WARNING(f"Using example wallet address: {test_wallet}"))
            self.stdout.write(self.style.WARNING("For real testing, provide a valid Sei wallet with --wallet"))
        else:
            self.stdout.write(f"Using provided wallet: {test_wallet}")
        
        # Initialize SeiConnector
        connector = SeiConnector(network)
        
        # Test 1: Create token
        self.stdout.write(self.style.NOTICE("\n--- Test 1: Token Creation ---"))
        token_name = f"Link3 Test Token {timezone.now().strftime('%m%d%H%M')}"
        token_symbol = f"L3T{uuid.uuid4().hex[:3]}".upper()
        
        self.stdout.write(f"Creating token: {token_name} ({token_symbol})")
        
        # Create token record
        project_token = ProjectToken.objects.create(
            project=project,
            name=token_name,
            symbol=token_symbol,
            network=network,
            total_supply=Decimal('1000000'),
            admin_address=test_wallet,
            decimals=6,
            is_deployed=False
        )
        
        # Deploy token
        self.stdout.write("Deploying token to Sei testnet...")
        start_time = time.time()
        result = connector.deploy_token(project_token)
        elapsed = time.time() - start_time
        
        if result['success']:
            self.stdout.write(self.style.SUCCESS(f"✓ Token deployed successfully in {elapsed:.2f} seconds!"))
            self.stdout.write(f"  Contract address: {project_token.contract_address}")
            self.stdout.write(f"  Transaction hash: {project_token.creation_tx_hash}")
        else:
            self.stdout.write(self.style.ERROR(f"✗ Token deployment failed: {result.get('error', 'Unknown error')}"))
            return
        
        # Test 2: Test token balance check
        self.stdout.write(self.style.NOTICE("\n--- Test 2: Token Balance Check ---"))
        self.stdout.write(f"Checking token balance for wallet: {test_wallet}")
        
        start_time = time.time()
        balance_result = connector.get_token_balance(test_wallet, project_token.contract_address)
        elapsed = time.time() - start_time
        
        self.stdout.write(self.style.SUCCESS(f"✓ Balance check completed in {elapsed:.2f} seconds"))
        self.stdout.write(f"  Token balance: {balance_result} {token_symbol}")
        
        # Test 3: Test token redemption (off-chain to on-chain)
        self.stdout.write(self.style.NOTICE("\n--- Test 3: Token Redemption ---"))
        self.stdout.write(f"User {test_user.external_id} current off-chain balance: {test_user.token_balance} tokens")
        self.stdout.write(f"Redeeming {redemption_amount} tokens to wallet {test_wallet}")
        
        # Import token service to handle the redemption
        from blockchain.services import TokenService
        
        # Perform redemption
        start_time = time.time()
        redemption_result = TokenService.redeem_tokens(
            user=test_user,
            amount=redemption_amount,
            wallet_address=test_wallet,
            project_token=project_token
        )
        elapsed = time.time() - start_time
        
        if redemption_result['success']:
            self.stdout.write(self.style.SUCCESS(f"✓ Redemption successful in {elapsed:.2f} seconds!"))
            self.stdout.write(f"  Transaction ID: {redemption_result.get('transaction_id', 'N/A')}")
            self.stdout.write(f"  Transaction hash: {redemption_result.get('tx_hash', 'N/A')}")
            self.stdout.write(f"  New off-chain balance: {redemption_result.get('new_balance', 'Unknown')}")
            
            # Check if a TokenTransaction was created
            tx_id = redemption_result.get('transaction_id')
            if tx_id:
                try:
                    tx = TokenTransaction.objects.get(id=tx_id)
                    self.stdout.write(f"  Transaction status: {tx.status}")
                    self.stdout.write(f"  Amount: {tx.amount} {token_symbol}")
                except TokenTransaction.DoesNotExist:
                    self.stdout.write(self.style.WARNING("  Transaction record not found in database"))
        else:
            self.stdout.write(self.style.ERROR(f"✗ Redemption failed: {redemption_result.get('error', 'Unknown error')}"))
        
        # Overall test summary
        self.stdout.write(self.style.NOTICE("\n--- Test Summary ---"))
        self.stdout.write(f"Project: {project.name} ({project.id})")
        self.stdout.write(f"Token: {token_name} ({token_symbol})")
        self.stdout.write(f"Contract: {project_token.contract_address}")
        self.stdout.write(f"User: {test_user.external_id} (Balance: {test_user.token_balance})")
        self.stdout.write(f"Wallet: {test_wallet}")
        
        # Add blockchain explorer links
        if network.explorer_url:
            self.stdout.write(self.style.NOTICE("\n--- Blockchain Explorer Links ---"))
            self.stdout.write(f"Network Explorer: {network.explorer_url}")
            
            # Create direct links to contract and wallet
            contract_url = f"{network.explorer_url}/account/{project_token.contract_address}"
            wallet_url = f"{network.explorer_url}/account/{test_wallet}"
            tx_url = f"{network.explorer_url}/txs/{project_token.creation_tx_hash}"
            
            self.stdout.write(f"View Contract: {contract_url}")
            self.stdout.write(f"View Wallet: {wallet_url}")
            self.stdout.write(f"View Deployment Transaction: {tx_url}")
            
            # If we have a redemption transaction, show that link too
            if redemption_result.get('success') and redemption_result.get('tx_hash'):
                redemption_tx_url = f"{network.explorer_url}/txs/{redemption_result.get('tx_hash')}"
                self.stdout.write(f"View Redemption Transaction: {redemption_tx_url}")
            
            self.stdout.write(self.style.WARNING("NOTE: Since we're using simulated transactions for the MVP,"))
            self.stdout.write(self.style.WARNING("      these links may not show real on-chain activity."))
        
        self.stdout.write(self.style.SUCCESS(f"\nSei integration test completed at {timezone.now().strftime('%Y-%m-%d %H:%M:%S')}!"))
        self.stdout.write("="*56)