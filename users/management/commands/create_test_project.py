from django.core.management.base import BaseCommand
from users.models import Project
from django.utils import timezone
import uuid

class Command(BaseCommand):
    help = 'Creates a test project with API key for development and testing'

    def add_arguments(self, parser):
        parser.add_argument('--name', type=str, default='Test Project', help='Project name')
        parser.add_argument('--apikey', type=str, help='Custom API key (optional)')

    def handle(self, *args, **options):
        name = options['name']
        custom_key = options['apikey']
        
        # Generate an API key if not provided
        api_key = custom_key or f"link3_{uuid.uuid4().hex}"
        
        # Check if a project with this name already exists
        existing = Project.objects.filter(name=name).first()
        
        if existing:
            self.stdout.write(f"A project named '{name}' already exists.")
            self.stdout.write(f"Current API key: {existing.api_key}")
            
            # Ask if user wants to update the key
            update = input("Update API key? (y/n): ").lower().strip() == 'y'
            
            if update:
                existing.api_key = api_key
                existing.save(update_fields=['api_key'])
                self.stdout.write(self.style.SUCCESS(f"Updated API key: {api_key}"))
            else:
                self.stdout.write("No changes made.")
            
            return
        
        # Create a new project with fields from your actual model
        project = Project.objects.create(
            name=name,
            description="Test project created for development and testing",
            website="https://example.com",
            api_key=api_key,
            created_at=timezone.now(),
            is_active=True,
            token_name='Test Token',
            token_symbol='TEST',
            token_supply=1000000,  # 1 million tokens
            token_contract_address='',  # Empty for now
            blockchain_network='sei',
            owner_wallet_address='sei1example123456789abcdef'
        )
        
        self.stdout.write(self.style.SUCCESS(f"Created project '{project.name}'"))
        self.stdout.write(self.style.SUCCESS(f"API Key: {project.api_key}"))
        self.stdout.write("\nUse this API key in your test scripts with:")
        self.stdout.write(f"python tests/api_test.py --api-key \"{project.api_key}\"")