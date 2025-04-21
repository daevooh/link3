from django.core.management.base import BaseCommand
from django.utils import timezone
import time
import logging
from blockchain.models import TokenTransaction
from blockchain.connector import BlockchainConnector

logger = logging.getLogger('django')

class Command(BaseCommand):
    help = 'Monitor pending blockchain transactions and update their status'

    def add_arguments(self, parser):
        parser.add_argument(
            '--continuous',
            action='store_true',
            help='Run in continuous mode, checking transactions every minute',
        )
        parser.add_argument(
            '--interval',
            type=int,
            default=60,
            help='Interval in seconds between checks when running in continuous mode',
        )
        parser.add_argument(
            '--max-age',
            type=int,
            default=24,
            help='Maximum age of transactions to check in hours (default: 24)',
        )

    def handle(self, *args, **options):
        continuous = options['continuous']
        interval = options['interval']
        max_age = options['max_age']
        
        # Format for nice output
        self.stdout.write(self.style.NOTICE("\n======== LINK3 TRANSACTION MONITOR ========"))
        self.stdout.write(f"Started at: {timezone.now().strftime('%Y-%m-%d %H:%M:%S')}")
        self.stdout.write(f"Mode: {'Continuous' if continuous else 'One-time'}")
        if continuous:
            self.stdout.write(f"Interval: {interval} seconds")
        self.stdout.write(f"Max transaction age: {max_age} hours")
        self.stdout.write("="*45)
        
        # Run once or continuously
        if continuous:
            try:
                while True:
                    self.check_transactions(max_age)
                    self.stdout.write(f"Waiting {interval} seconds until next check...")
                    time.sleep(interval)
            except KeyboardInterrupt:
                self.stdout.write(self.style.SUCCESS("\nMonitor stopped by user. Goodbye!"))
        else:
            self.check_transactions(max_age)
            
    def check_transactions(self, max_age):
        """Check pending and processing transactions and update their status"""
        # Calculate cutoff time
        cutoff_time = timezone.now() - timezone.timedelta(hours=max_age)
        
        # Get transactions to check
        pending_txs = TokenTransaction.objects.filter(
            status__in=['PENDING', 'PROCESSING'],
            created_at__gt=cutoff_time
        )
        
        if not pending_txs:
            self.stdout.write(f"No pending transactions found (checked at {timezone.now().strftime('%H:%M:%S')})")
            return
            
        self.stdout.write(f"\nChecking {pending_txs.count()} transaction(s) at {timezone.now().strftime('%H:%M:%S')}")
        self.stdout.write("-" * 45)
        
        # Check each transaction
        for tx in pending_txs:
            try:
                self.stdout.write(f"Transaction {tx.id}: {tx.transaction_type} - {tx.status}")
                
                # Skip if no transaction hash yet
                if not tx.tx_hash:
                    self.stdout.write(self.style.WARNING(f"  No transaction hash for {tx.id} - skipping"))
                    continue
                
                # Get the appropriate connector for this network
                connector = BlockchainConnector.get_connector_by_network_id(tx.project_token.network.id)
                
                # Check status
                status = connector.check_transaction_status(tx.tx_hash)
                
                # Update transaction status based on blockchain status
                if status == "confirmed" and tx.status != 'CONFIRMED':
                    tx.mark_confirmed(tx.tx_hash)
                    self.stdout.write(self.style.SUCCESS(f"  ✓ Transaction {tx.id} confirmed on-chain"))
                    
                elif status == "failed" and tx.status != 'FAILED':
                    tx.mark_failed()
                    self.stdout.write(self.style.ERROR(f"  ✗ Transaction {tx.id} failed on-chain"))
                    
                elif status == "pending" and tx.status == 'PENDING':
                    # If still pending after some time, mark as processing
                    time_pending = timezone.now() - tx.created_at
                    if time_pending.total_seconds() > 300:  # 5 minutes
                        tx.mark_processing()
                        self.stdout.write(self.style.WARNING(f"  ⟳ Transaction {tx.id} marked as processing (pending for {time_pending.total_seconds()/60:.1f} minutes)"))
                    else:
                        self.stdout.write(f"  ⧖ Transaction {tx.id} still pending ({time_pending.total_seconds()/60:.1f} minutes)")
                        
                else:
                    self.stdout.write(f"  ⧖ Transaction {tx.id} status unchanged: {tx.status}")
                    
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"  Error checking transaction {tx.id}: {str(e)}"))
                logger.error(f"Error monitoring transaction {tx.id}: {str(e)}")
                
        # Summary
        confirmed = TokenTransaction.objects.filter(status='CONFIRMED').count()
        failed = TokenTransaction.objects.filter(status='FAILED').count()
        pending = TokenTransaction.objects.filter(status__in=['PENDING', 'PROCESSING']).count()
        
        self.stdout.write("\nTransaction Summary:")
        self.stdout.write(f"  Confirmed: {confirmed}")
        self.stdout.write(f"  Failed: {failed}")
        self.stdout.write(f"  Pending: {pending}")