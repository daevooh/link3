from django.core.management.base import BaseCommand
from django.utils import timezone
import logging
from blockchain.services import RedemptionProcessor

logger = logging.getLogger('django')

class Command(BaseCommand):
    help = 'Process pending token redemption requests'

    def add_arguments(self, parser):
        parser.add_argument('--batch-size', type=int, default=10,
                            help='Number of redemptions to process in a single batch')
        parser.add_argument('--retry-failed', action='store_true',
                            help='Retry failed redemptions with temporary errors')
        parser.add_argument('--check-stuck', action='store_true',
                            help='Check for stuck processing redemptions')

    def handle(self, *args, **options):
        batch_size = options['batch_size']
        start_time = timezone.now()
        self.stdout.write(f"Starting redemption processing at {start_time}")
        
        # Process pending redemptions
        processed_count = RedemptionProcessor.process_pending_redemptions(batch_size=batch_size)
        self.stdout.write(self.style.SUCCESS(f"Processed {processed_count} pending redemptions"))
        
        # Retry failed redemptions if requested
        if options['retry_failed']:
            retried_count = RedemptionProcessor.retry_failed_redemptions(batch_size=batch_size)
            self.stdout.write(self.style.SUCCESS(f"Retried {retried_count} failed redemptions"))
        
        # Check for stuck processing redemptions if requested
        if options['check_stuck']:
            handled_count = RedemptionProcessor.check_processing_redemptions()
            self.stdout.write(self.style.SUCCESS(f"Handled {handled_count} stuck redemptions"))
        
        end_time = timezone.now()
        elapsed = (end_time - start_time).total_seconds()
        self.stdout.write(f"Redemption processing completed in {elapsed:.2f} seconds")