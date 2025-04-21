from django.core.management.base import BaseCommand
from blockchain.models import BlockchainNetwork
from django.utils import timezone
import textwrap

class Command(BaseCommand):
    help = 'Sets up default blockchain networks for Link3'

    def add_arguments(self, parser):
        parser.add_argument(
            '--reset',
            action='store_true',
            help='Reset existing networks before creating new ones',
        )
        parser.add_argument(
            '--mainnet',
            action='store_true',
            help='Include mainnet networks in setup',
        )
        parser.add_argument(
            '--testnet-only',
            action='store_true',
            help='Only setup testnet networks',
        )

    def handle(self, *args, **options):
        # If reset flag is set, delete all existing networks
        if options['reset']:
            self.stdout.write('Resetting blockchain networks...')
            BlockchainNetwork.objects.all().delete()
            self.stdout.write(self.style.SUCCESS('Existing networks have been deleted'))

        # Determine which network types to set up
        include_mainnet = options['mainnet'] and not options['testnet_only']
        
        # Default testnet networks to set up
        networks = [
            {
                'name': 'Sei Testnet',
                'chain_id': 'sei-testnet',
                'rpc_endpoint': 'https://sei-testnet-rpc.polkachu.com',
                'explorer_url': 'https://sei.explorers.guru/testnet',
                'is_testnet': True
            },
            {
                'name': 'Sei Atlantic-2',
                'chain_id': 'atlantic-2',
                'rpc_endpoint': 'https://rpc.atlantic-2.seinetwork.io',
                'explorer_url': 'https://sei.explorers.guru/testnet/atlantic-2',
                'is_testnet': True
            },
            {
                'name': 'Ethereum Sepolia',
                'chain_id': '11155111',
                'rpc_endpoint': 'https://ethereum-sepolia.publicnode.com',
                'explorer_url': 'https://sepolia.etherscan.io',
                'is_testnet': True
            },
            {
                'name': 'Ethereum Goerli',
                'chain_id': '5',
                'rpc_endpoint': 'https://ethereum-goerli.publicnode.com',
                'explorer_url': 'https://goerli.etherscan.io',
                'is_testnet': True
            },
        ]
        
        # Add mainnet networks if requested
        if include_mainnet:
            mainnet_networks = [
                {
                    'name': 'Sei Mainnet',
                    'chain_id': 'sei-chain',
                    'rpc_endpoint': 'https://sei-rpc.polkachu.com',
                    'explorer_url': 'https://www.seiscan.app',
                    'is_testnet': False
                },
                {
                    'name': 'Ethereum Mainnet',
                    'chain_id': '1',
                    'rpc_endpoint': 'https://ethereum.publicnode.com',
                    'explorer_url': 'https://etherscan.io',
                    'is_testnet': False
                },
            ]
            networks.extend(mainnet_networks)
        
        # Create networks
        created = 0
        updated = 0
        
        self.stdout.write(self.style.NOTICE(f"\nStarting network configuration at {timezone.now().strftime('%Y-%m-%d %H:%M:%S')}"))
        self.stdout.write("="*80)
        
        for network_data in networks:
            network, was_created = BlockchainNetwork.objects.update_or_create(
                chain_id=network_data['chain_id'],
                defaults={
                    'name': network_data['name'],
                    'rpc_endpoint': network_data['rpc_endpoint'],
                    'explorer_url': network_data['explorer_url'],
                    'is_testnet': network_data['is_testnet'],
                    'is_active': True
                }
            )
            
            if was_created:
                created += 1
                message = f"Created network: {network.name}"
                self.stdout.write(self.style.SUCCESS(message))
            else:
                updated += 1
                message = f"Updated network: {network.name}"
                self.stdout.write(self.style.WARNING(message))
                
            # Print network details with indentation
            details = textwrap.dedent(f"""
                  Chain ID: {network.chain_id}
                  RPC URL:  {network.rpc_endpoint}
                  Explorer: {network.explorer_url}
                  Type:     {"Testnet" if network.is_testnet else "Mainnet"}
                  Status:   {"Active" if network.is_active else "Inactive"}
            """).strip()
            
            self.stdout.write(textwrap.indent(details, '    '))
            self.stdout.write("-"*80)
        
        self.stdout.write("="*80)
        
        if created:
            self.stdout.write(self.style.SUCCESS(f'Successfully created {created} blockchain networks'))
        
        if updated:
            self.stdout.write(self.style.SUCCESS(f'Successfully updated {updated} existing blockchain networks'))
            
        if not created and not updated:
            self.stdout.write(self.style.WARNING('No networks created or updated'))
            
        total_networks = BlockchainNetwork.objects.count()
        testnet_count = BlockchainNetwork.objects.filter(is_testnet=True).count()
        mainnet_count = BlockchainNetwork.objects.filter(is_testnet=False).count()
        
        self.stdout.write(f"Total networks configured: {total_networks} ({testnet_count} testnets, {mainnet_count} mainnets)")