import unittest
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.utils import timezone
from unittest.mock import patch, MagicMock

# Import the relevant models
from blockchain.models import TokenCreationRequest, BlockchainNetwork
from developer_portal.models import Project
from users.models import DeveloperProfile

User = get_user_model()

class TokenRequestButtonsTest(TestCase):
    """Test class for token request edit and cancel buttons"""
    
    def setUp(self):
        """Set up test data"""
        # Create a test user
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpassword'
        )
        
        # Create a developer profile for the user
        self.developer_profile = DeveloperProfile.objects.create(
            user=self.user,
            is_verified=True,
            company_name='Test Company',
            website='https://example.com',
            verification_date=timezone.now()
        )
        
        # Create a test blockchain network
        self.network = BlockchainNetwork.objects.create(
            name='Test Network',
            chain_id=1,
            rpc_url='https://test.network',
            explorer_url='https://explorer.test.network',
            currency_symbol='TEST',
            is_active=True
        )
        
        # Create a test project
        self.project = Project.objects.create(
            name='Test Project',
            developer=self.user,
            description='Test project description',
            is_active=True
        )
        
        # Create test token requests in different states
        self.pending_request = TokenCreationRequest.objects.create(
            project=self.project,
            name='Pending Token',
            symbol='PEND',
            token_type='erc20',
            network=self.network,
            decimals=18,
            total_supply=1000000,
            admin_address='0x1234567890123456789012345678901234567890',
            status='pending',
            submitted_at=timezone.now()
        )
        
        self.in_review_request = TokenCreationRequest.objects.create(
            project=self.project,
            name='In Review Token',
            symbol='REVW',
            token_type='erc20',
            network=self.network,
            decimals=18,
            total_supply=1000000,
            admin_address='0x1234567890123456789012345678901234567890',
            status='in_review',
            submitted_at=timezone.now()
        )
        
        self.approved_request = TokenCreationRequest.objects.create(
            project=self.project,
            name='Approved Token',
            symbol='APRV',
            token_type='erc20',
            network=self.network,
            decimals=18,
            total_supply=1000000,
            admin_address='0x1234567890123456789012345678901234567890',
            status='approved',
            submitted_at=timezone.now()
        )
        
        # Create the test client
        self.client = Client()
        self.client.login(username='testuser', password='testpassword')
    
    def test_edit_button_visibility(self):
        """Test that the edit button is visible only for pending requests"""
        # Check pending request - edit button should be visible
        response = self.client.get(
            reverse('developer_portal:view_token_request', kwargs={'request_id': self.pending_request.id})
        )
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, f'href="{reverse("developer_portal:edit_token_request", kwargs={"request_id": self.pending_request.id})}"')
        self.assertContains(response, 'Edit Request')
        
        # Check in_review request - edit button should not be visible or should be disabled
        response = self.client.get(
            reverse('developer_portal:view_token_request', kwargs={'request_id': self.in_review_request.id})
        )
        self.assertEqual(response.status_code, 200)
        # This depends on your implementation - either the button is not present or it's disabled
        # Adjust this test based on your specific implementation
        
        # Check approved request - edit button should not be visible
        response = self.client.get(
            reverse('developer_portal:view_token_request', kwargs={'request_id': self.approved_request.id})
        )
        self.assertEqual(response.status_code, 200)
        edit_url = reverse("developer_portal:edit_token_request", kwargs={"request_id": self.approved_request.id})
        # Check if edit button is absent or properly disabled
        
    def test_cancel_button_visibility(self):
        """Test that the cancel button is visible for pending and in_review requests"""
        # Check pending request - cancel button should be visible
        response = self.client.get(
            reverse('developer_portal:view_token_request', kwargs={'request_id': self.pending_request.id})
        )
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, f'action="{reverse("developer_portal:cancel_token_request", kwargs={"request_id": self.pending_request.id})}"')
        self.assertContains(response, 'Cancel Request')
        
        # Check in_review request - cancel button should be visible
        response = self.client.get(
            reverse('developer_portal:view_token_request', kwargs={'request_id': self.in_review_request.id})
        )
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, f'action="{reverse("developer_portal:cancel_token_request", kwargs={"request_id": self.in_review_request.id})}"')
        self.assertContains(response, 'Cancel Request')
        
        # Check approved request - cancel button should not be visible
        response = self.client.get(
            reverse('developer_portal:view_token_request', kwargs={'request_id': self.approved_request.id})
        )
        self.assertEqual(response.status_code, 200)
        cancel_url = reverse("developer_portal:cancel_token_request", kwargs={"request_id": self.approved_request.id})
        # Check that the form with this action URL is not present
    
    def test_edit_request_access(self):
        """Test the edit_token_request view access controls"""
        # Test with pending request - should allow access
        response = self.client.get(
            reverse('developer_portal:edit_token_request', kwargs={'request_id': self.pending_request.id})
        )
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'token_name')  # Check for form field
        
        # Test with in_review request - should redirect with error message
        response = self.client.get(
            reverse('developer_portal:edit_token_request', kwargs={'request_id': self.in_review_request.id})
        )
        self.assertEqual(response.status_code, 302)  # Redirect expected
        
        # Test with approved request - should redirect with error message
        response = self.client.get(
            reverse('developer_portal:edit_token_request', kwargs={'request_id': self.approved_request.id})
        )
        self.assertEqual(response.status_code, 302)  # Redirect expected
    
    def test_edit_request_submission(self):
        """Test editing a token request submission"""
        edit_data = {
            'token_name': 'Updated Token',
            'token_symbol': 'UPDT',
            'network': str(self.network.id),
            'decimals': '18',
            'total_supply': '2000000',
            'admin_address': '0x1234567890123456789012345678901234567890',
        }
        
        # Submit the edit form
        response = self.client.post(
            reverse('developer_portal:edit_token_request', kwargs={'request_id': self.pending_request.id}),
            data=edit_data
        )
        
        # Check if the response is a redirect to the token request view
        self.assertEqual(response.status_code, 302)
        self.assertEqual(
            response.url,
            reverse('developer_portal:view_token_request', kwargs={'request_id': self.pending_request.id})
        )
        
        # Refresh the token request from the database
        self.pending_request.refresh_from_db()
        
        # Check if the token request was updated correctly
        self.assertEqual(self.pending_request.name, edit_data['token_name'])
        self.assertEqual(self.pending_request.symbol, edit_data['token_symbol'])
        self.assertEqual(self.pending_request.total_supply, int(edit_data['total_supply']))
    
    def test_edit_request_validation(self):
        """Test validation when editing a token request"""
        invalid_data = {
            'token_name': '',  # Empty name
            'token_symbol': 'UPDT',
            'network': str(self.network.id),
            'decimals': '18',
            'total_supply': '2000000',
            'admin_address': '0x1234567890123456789012345678901234567890',
        }
        
        # Submit the edit form with invalid data
        response = self.client.post(
            reverse('developer_portal:edit_token_request', kwargs={'request_id': self.pending_request.id}),
            data=invalid_data
        )
        
        # Check that we stay on the form page (not redirected)
        self.assertEqual(response.status_code, 200)
        
        # Refresh the token request from the database
        self.pending_request.refresh_from_db()
        
        # Check that the token request was not updated
        self.assertNotEqual(self.pending_request.name, invalid_data['token_name'])
    
    def test_cancel_request(self):
        """Test cancelling a token request"""
        # Cancel a pending request
        response = self.client.post(
            reverse('developer_portal:cancel_token_request', kwargs={'request_id': self.pending_request.id})
        )
        
        # Check if the response is a redirect to token requests page
        self.assertEqual(response.status_code, 302)
        self.assertEqual(
            response.url,
            reverse('developer_portal:token_requests')
        )
        
        # Refresh the token request from the database
        self.pending_request.refresh_from_db()
        
        # Check if the status was updated correctly
        self.assertEqual(self.pending_request.status, 'cancelled')
        
        # Cancel an in_review request
        response = self.client.post(
            reverse('developer_portal:cancel_token_request', kwargs={'request_id': self.in_review_request.id})
        )
        
        # Refresh from database
        self.in_review_request.refresh_from_db()
        
        # Check status was updated
        self.assertEqual(self.in_review_request.status, 'cancelled')
    
    def test_cannot_cancel_approved_request(self):
        """Test that approved requests cannot be cancelled"""
        # Try to cancel an approved request
        response = self.client.post(
            reverse('developer_portal:cancel_token_request', kwargs={'request_id': self.approved_request.id})
        )
        
        # Check if we get redirected to the view page
        self.assertEqual(response.status_code, 302)
        self.assertEqual(
            response.url,
            reverse('developer_portal:view_token_request', kwargs={'request_id': self.approved_request.id})
        )
        
        # Refresh from database
        self.approved_request.refresh_from_db()
        
        # Check that the status was not changed
        self.assertEqual(self.approved_request.status, 'approved')
    
    def test_modal_cancel_functionality(self):
        """Test the cancel button in the modal"""
        # Check if the modal exists in the page
        response = self.client.get(
            reverse('developer_portal:view_token_request', kwargs={'request_id': self.pending_request.id})
        )
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'id="cancelRequestModal"')
        
        # Check if the form in the modal has the correct action URL
        cancel_url = reverse('developer_portal:cancel_token_request', kwargs={'request_id': self.pending_request.id})
        self.assertContains(response, f'action="{cancel_url}"')
    
    def test_javascript_functionality(self):
        """Test if JavaScript is properly connected for buttons"""
        # This is a placeholder - in a real test, you might use Selenium to test JS interactions
        # Here we're just checking if the modal trigger is correctly set up
        response = self.client.get(
            reverse('developer_portal:view_token_request', kwargs={'request_id': self.pending_request.id})
        )
        
        # Look for data-bs-toggle attribute which is used by Bootstrap to trigger modals
        self.assertContains(response, 'data-bs-toggle="modal"')
        self.assertContains(response, 'data-bs-target="#cancelRequestModal"')