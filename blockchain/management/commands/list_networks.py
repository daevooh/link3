from django.core.management.base import BaseCommand
from blockchain.models import BlockchainNetwork
from django.db.models import Q
from django.utils import timezone
import textwrap

class Command(BaseCommand):
    help = 'Lists all configured blockchain networks in the Link3 system'

    def add_arguments(self, parser):
        parser.add_argument(
            '--active-only',
            action='store_true',
            help='Show only active networks',
        )
        parser.add_argument(
            '--testnet',
            action='store_true',
            help='Show only testnet networks',
        )
        parser.add_argument(
            '--mainnet',
            action='store_true',
            help='Show only mainnet networks',
        )
        parser.add_argument(
            '--chain',
            type=str,
            help='Filter by blockchain type (e.g., "sei", "ethereum")',
        )
        parser.add_argument(
            '--detail',
            action='store_true',
            help='Show detailed information',
        )

    def handle(self, *args, **options):
        # Build query filters based on arguments
        filters = Q()
        
        if options['active_only']:
            filters &= Q(is_active=True)
            
        if options['testnet']:
            filters &= Q(is_testnet=True)
            
        if options['mainnet']:
            filters &= Q(is_testnet=False)
            
        if options['chain']:
            chain_type = options['chain'].lower()
            filters &= Q(chain_id__icontains=chain_type) | Q(name__icontains=chain_type)
        
        # Query networks with filters
        networks = BlockchainNetwork.objects.filter(filters).order_by('is_testnet', 'name')
        
        if not networks.exists():
            self.stdout.write(self.style.WARNING('No blockchain networks found matching your criteria'))
            return
        
        # Display results
        self.stdout.write(self.style.NOTICE(f"\nBlockchain Networks as of {timezone.now().strftime('%Y-%m-%d %H:%M:%S')}"))
        self.stdout.write("="*80)
        
        # Calculate counts
        total_networks = networks.count()
        active_networks = networks.filter(is_active=True).count()
        testnet_count = networks.filter(is_testnet=True).count()
        mainnet_count = networks.filter(is_testnet=False).count()
        
        self.stdout.write(f"Total: {total_networks} networks ({active_networks} active)")
        self.stdout.write(f"Types: {testnet_count} testnets, {mainnet_count} mainnets")
        self.stdout.write("-"*80)
        
        # Display network list with appropriate level of detail
        for i, network in enumerate(networks, 1):
            # Header with network name and status
            status_label = "ACTIVE" if network.is_active else "INACTIVE"
            type_label = "TESTNET" if network.is_testnet else "MAINNET"
            
            # Color coding for active/inactive status
            if network.is_active:
                status_style = self.style.SUCCESS
            else:
                status_style = self.style.ERROR
                
            header = f"{i}. {network.name} ({network.chain_id})"
            self.stdout.write(f"{header} - {status_style(status_label)} - {type_label}")
            
            # If detailed view is requested, show more information
            if options['detail']:
                details = textwrap.dedent(f"""
                    RPC Endpoint: {network.rpc_endpoint}
                    Explorer URL: {network.explorer_url or 'Not configured'}
                    Last Updated: {network.updated_at.strftime('%Y-%m-%d %H:%M:%S')}
                """).strip()
                
                self.stdout.write(textwrap.indent(details, '   '))
            
            if i < total_networks:
                self.stdout.write("-" * 40)
        
        self.stdout.write("="*80)