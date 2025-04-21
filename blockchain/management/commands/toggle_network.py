from django.core.management.base import BaseCommand, CommandError
from blockchain.models import BlockchainNetwork
from django.utils import timezone

class Command(BaseCommand):
    help = 'Enables or disables blockchain networks in the Link3 system'

    def add_arguments(self, parser):
        parser.add_argument(
            'chain_id',
            type=str,
            help='The chain ID of the network to toggle (e.g., "sei-testnet", "1" for Ethereum)'
        )
        parser.add_argument(
            '--enable',
            action='store_true',
            help='Enable the specified network'
        )
        parser.add_argument(
            '--disable',
            action='store_true',
            help='Disable the specified network'
        )
        parser.add_argument(
            '--update-rpc',
            type=str,
            help='Update the RPC endpoint URL for the network'
        )
        parser.add_argument(
            '--update-explorer',
            type=str,
            help='Update the block explorer URL for the network'
        )

    def handle(self, *args, **options):
        chain_id = options['chain_id']
        
        try:
            network = BlockchainNetwork.objects.get(chain_id=chain_id)
        except BlockchainNetwork.DoesNotExist:
            raise CommandError(f'Network with chain_id "{chain_id}" does not exist')
        
        # Determine if we're enabling or disabling the network
        enable_network = options['enable']
        disable_network = options['disable']
        
        # Check for conflicting arguments
        if enable_network and disable_network:
            raise CommandError("Cannot both enable and disable a network at the same time")
        
        # Update RPC endpoint if specified
        if options['update_rpc']:
            network.rpc_endpoint = options['update_rpc']
            self.stdout.write(self.style.SUCCESS(f"Updated RPC endpoint for {network.name}"))
        
        # Update explorer URL if specified
        if options['update_explorer']:
            network.explorer_url = options['update_explorer']
            self.stdout.write(self.style.SUCCESS(f"Updated explorer URL for {network.name}"))
        
        # Toggle network status if specified
        if enable_network:
            network.is_active = True
            status_message = f"Enabled {network.name} network"
        elif disable_network:
            network.is_active = False
            status_message = f"Disabled {network.name} network"
        else:
            # If neither --enable nor --disable specified, toggle the current state
            network.is_active = not network.is_active
            status_message = f"{'Enabled' if network.is_active else 'Disabled'} {network.name} network"
        
        # Save changes
        network.save()
        
        # Show success message with color coding
        if network.is_active:
            self.stdout.write(self.style.SUCCESS(status_message))
        else:
            self.stdout.write(self.style.WARNING(status_message))
        
        # Display current network status
        network_type = "Testnet" if network.is_testnet else "Mainnet"
        status = "ACTIVE" if network.is_active else "INACTIVE"
        
        self.stdout.write("\nCurrent network configuration:")
        self.stdout.write(f"  Name:        {network.name}")
        self.stdout.write(f"  Chain ID:    {network.chain_id}")
        self.stdout.write(f"  Type:        {network_type}")
        self.stdout.write(f"  Status:      {status}")
        self.stdout.write(f"  RPC URL:     {network.rpc_endpoint}")
        self.stdout.write(f"  Explorer:    {network.explorer_url or 'Not configured'}")
        self.stdout.write(f"  Last update: {network.updated_at.strftime('%Y-%m-%d %H:%M:%S')}")