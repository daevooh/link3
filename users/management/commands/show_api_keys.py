from django.core.management.base import BaseCommand
from users.models import Project

class Command(BaseCommand):
    help = 'Shows all API keys for projects'

    def handle(self, *args, **options):
        projects = Project.objects.all().order_by('name')
        
        if not projects.exists():
            self.stdout.write("No projects found in the database.")
            self.stdout.write("Run 'python manage.py create_test_project' to create one.")
            return
            
        self.stdout.write(self.style.SUCCESS(f"Found {projects.count()} projects:"))
        
        for project in projects:
            self.stdout.write(f"\nProject: {project.name}")
            self.stdout.write(f"API Key: {project.api_key}")
            self.stdout.write(f"Active: {project.is_active}")
            self.stdout.write(f"Token: {project.token_name} ({project.token_symbol})")
            self.stdout.write(f"Network: {project.blockchain_network}")
            
        self.stdout.write("\nUse an API key with the test script:")
        self.stdout.write("python tests/api_test.py --api-key \"API_KEY_HERE\"")