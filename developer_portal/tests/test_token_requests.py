import json
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model
from developer_portal.models import Project, TokenCreationRequest
from django.utils import timezone

User = get_user_model()

class TokenRequestButtonsTest(TestCase):
    """Test case for token request edit and cancel buttons functionality"""
    
    def setUp(self):
        """Set up test data"""
        # Create a test user
        self.user = User.objects.create_user(
            username='testdeveloper',
            email='testdev@example.com',
            password='testpassword123'
        )
        self.user.is_verified_developer = True
        self.user.save()
        
        # Create a test project
        self.project = Project.objects.create(
            name='Test Project',
            description='Test project description',
            developer=self.user
        )
        
        # Create a pending token request
        self.pending_token_request = TokenCreationRequest.objects.create(
            project=self.project,
            token_name='Test Token',
            token_symbol='TTK',
            token_type='erc20',
            total_supply=1000000,
            decimals=18,
            admin_address='0x1234567890123456789012345678901234567890',
            status='pending',
            created_at=timezone.now(),
            updated_at=timezone.now()
        )
        
        # Create a rejected token request
        self.rejected_token_request = TokenCreationRequest.objects.create(
            project=self.project,
            token_name='Rejected Token',
            token_symbol='RTK',
            token_type='erc20',
            total_supply=1000000,
            decimals=18,
            admin_address='0x1234567890123456789012345678901234567890',
            status='rejected',
            rejection_reason='Test rejection reason',
            created_at=timezone.now(),
            updated_at=timezone.now()
        )
        
        # Create a processed token request (can't be edited or cancelled)
        self.approved_token_request = TokenCreationRequest.objects.create(
            project=self.project,
            token_name='Approved Token',
            token_symbol='ATK',
            token_type='erc20',
            total_supply=1000000,
            decimals=18,
            admin_address='0x1234567890123456789012345678901234567890',
            status='approved',
            created_at=timezone.now(),
            updated_at=timezone.now()
        )
        
        self.client = Client()
        self.client.login(username='testdeveloper', password='testpassword123')
    
    def test_edit_button_visibility(self):
        """Test that edit button is visible for pending and rejected requests only"""
        # Check pending request
        response = self.client.get(reverse('developer_portal:view_token_request', 
                                         kwargs={'request_id': self.pending_token_request.id}))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, f'href="{reverse("developer_portal:edit_token_request", kwargs={"request_id": self.pending_token_request.id})}"')
        
        # Check rejected request
        response = self.client.get(reverse('developer_portal:view_token_request', 
                                         kwargs={'request_id': self.rejected_token_request.id}))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, f'href="{reverse("developer_portal:edit_token_request", kwargs={"request_id": self.rejected_token_request.id})}"')
        
        # Check approved request (should not have edit button)
        response = self.client.get(reverse('developer_portal:view_token_request', 
                                         kwargs={'request_id': self.approved_token_request.id}))
        self.assertEqual(response.status_code, 200)
        self.assertNotContains(response, f'href="{reverse("developer_portal:edit_token_request", kwargs={"request_id": self.approved_token_request.id})}"')
    
    def test_cancel_button_visibility(self):
        """Test that cancel button is visible for pending requests only"""
        # Check pending request
        response = self.client.get(reverse('developer_portal:view_token_request', 
                                         kwargs={'request_id': self.pending_token_request.id}))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, f'action="{reverse("developer_portal:cancel_token_request", kwargs={"request_id": self.pending_token_request.id})}"')
        
        # Check rejected request (should not have cancel button)
        response = self.client.get(reverse('developer_portal:view_token_request', 
                                         kwargs={'request_id': self.rejected_token_request.id}))
        self.assertEqual(response.status_code, 200)
        self.assertNotContains(response, f'action="{reverse("developer_portal:cancel_token_request", kwargs={"request_id": self.rejected_token_request.id})}"')
        
        # Check approved request (should not have cancel button)
        response = self.client.get(reverse('developer_portal:view_token_request', 
                                         kwargs={'request_id': self.approved_token_request.id}))
        self.assertEqual(response.status_code, 200)
        self.assertNotContains(response, f'action="{reverse("developer_portal:cancel_token_request", kwargs={"request_id": self.approved_token_request.id})}"')
    
    def test_edit_token_request_access(self):
        """Test that edit token request view is accessible"""
        response = self.client.get(reverse('developer_portal:edit_token_request', 
                                         kwargs={'request_id': self.pending_token_request.id}))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Edit Token Request')
        
        # Edit should work for rejected requests too
        response = self.client.get(reverse('developer_portal:edit_token_request', 
                                         kwargs={'request_id': self.rejected_token_request.id}))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Edit Token Request')
        
        # Edit should not work for approved requests
        response = self.client.get(reverse('developer_portal:edit_token_request', 
                                         kwargs={'request_id': self.approved_token_request.id}))
        self.assertEqual(response.status_code, 403)  # Should be forbidden or redirect
    
    def test_cancel_token_request(self):
        """Test that cancel token request functionality works"""
        # Test successful cancellation
        response = self.client.post(reverse('developer_portal:cancel_token_request', 
                                          kwargs={'request_id': self.pending_token_request.id}))
        self.assertRedirects(response, reverse('developer_portal:token_requests'))
        
        # Verify that token request status has been changed to cancelled
        updated_token_request = TokenCreationRequest.objects.get(id=self.pending_token_request.id)
        self.assertEqual(updated_token_request.status, 'cancelled')
        
        # Test that cancellation is not allowed for processed requests
        response = self.client.post(reverse('developer_portal:cancel_token_request', 
                                          kwargs={'request_id': self.approved_token_request.id}))
        self.assertEqual(response.status_code, 302)  # Should redirect back with error
        
        # Verify status has not changed
        unchanged_token_request = TokenCreationRequest.objects.get(id=self.approved_token_request.id)
        self.assertEqual(unchanged_token_request.status, 'approved')
    
    def test_submit_edited_token_request(self):
        """Test that submitting edited token request works"""
        updated_data = {
            'token_name': 'Updated Token Name',
            'token_symbol': 'UTK',
            'token_type': 'erc20',
            'total_supply': '2000000',
            'decimals': '18',
            'admin_address': '0x1234567890123456789012345678901234567890',
            'network': '1',  # Assuming network with ID 1 exists
        }
        
        # Test submitting edited token request
        response = self.client.post(
            reverse('developer_portal:edit_token_request', kwargs={'request_id': self.pending_token_request.id}),
            data=updated_data
        )
        
        # Should redirect to view page on success
        self.assertRedirects(response, reverse('developer_portal:view_token_request', 
                                             kwargs={'request_id': self.pending_token_request.id}))
        
        # Verify token request data has been updated
        updated_token_request = TokenCreationRequest.objects.get(id=self.pending_token_request.id)
        self.assertEqual(updated_token_request.token_name, 'Updated Token Name')
        self.assertEqual(updated_token_request.token_symbol, 'UTK')
        self.assertEqual(updated_token_request.total_supply, 2000000)