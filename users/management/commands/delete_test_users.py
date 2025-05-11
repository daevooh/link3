from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from users.models import DeveloperProfile, Project
from tokenization.models import Interaction

class Command(BaseCommand):
    help = 'Delete fake users and their associated data created for testing'

    def add_arguments(self, parser):
        parser.add_argument('--prefix', type=str, default='test_', help='Username prefix for test users to delete')
        parser.add_argument('--project', action='store_true', help='Also delete the test project')
        parser.add_argument('--confirm', action='store_true', help='Skip confirmation prompt')

    def handle(self, *args, **options):
        prefix = options['prefix']
        delete_project = options['project']
        confirm = options['confirm']
        
        # Count items to be deleted
        test_users = User.objects.filter(username__startswith=prefix)
        test_user_count = test_users.count()
        
        interaction_count = Interaction.objects.filter(user__username__startswith=prefix).count()
        
        self.stdout.write(self.style.WARNING(f'About to delete:'))
        self.stdout.write(f'- {test_user_count} test users with prefix "{prefix}"')
        self.stdout.write(f'- {interaction_count} interactions from test users')
        
        project = None
        if delete_project:
            project = Project.objects.filter(name='Test Analytics Project').first()
            if project:
                self.stdout.write(f'- Test project: {project.name}')
        
        if not confirm:
            confirmation = input('\nAre you sure you want to delete this test data? (yes/no): ')
            if confirmation.lower() != 'yes':
                self.stdout.write(self.style.ERROR('Operation cancelled.'))
                return
        
        # Delete interactions first to avoid foreign key constraints
        Interaction.objects.filter(user__username__startswith=prefix).delete()
        self.stdout.write(f'Deleted {interaction_count} test interactions.')
        
        # Delete test users
        test_users.delete()
        self.stdout.write(f'Deleted {test_user_count} test users.')
        
        # Delete test project if requested
        if delete_project and project:
            project.delete()
            self.stdout.write(f'Deleted test project: {project.name}')
        
        self.stdout.write(self.style.SUCCESS('Successfully cleaned up test data from the database!'))