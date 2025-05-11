from django.test import LiveServerTestCase
from django.contrib.auth import get_user_model
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from developer_portal.models import Project, TokenCreationRequest
from django.utils import timezone
from django.urls import reverse

User = get_user_model()

class TokenRequestButtonsUITest(LiveServerTestCase):
    """UI Tests for token request edit and cancel buttons"""
    
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        # Set up Selenium WebDriver
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')  # Run tests without UI
        options.add_argument('--disable-gpu')
        options.add_argument('--window-size=1920,1080')
        cls.selenium = webdriver.Chrome(options=options)
        cls.selenium.implicitly_wait(10)
    
    @classmethod
    def tearDownClass(cls):
        cls.selenium.quit()
        super().tearDownClass()
    
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
    
    def login(self):
        """Helper method to login user"""
        self.selenium.get(f'{self.live_server_url}/login/')
        username_input = self.selenium.find_element(By.NAME, 'username')
        password_input = self.selenium.find_element(By.NAME, 'password')
        username_input.send_keys('testdeveloper')
        password_input.send_keys('testpassword123')
        self.selenium.find_element(By.XPATH, '//button[@type="submit"]').click()
        WebDriverWait(self.selenium, 10).until(
            EC.url_contains('dashboard')
        )
    
    def test_edit_button_click(self):
        """Test if clicking the edit button redirects to the edit form"""
        self.login()
        
        # Go to token request view page
        view_url = f'{self.live_server_url}{reverse("developer_portal:view_token_request", kwargs={"request_id": self.pending_token_request.id})}'
        self.selenium.get(view_url)
        
        # Find and click edit button
        try:
            edit_button = WebDriverWait(self.selenium, 10).until(
                EC.element_to_be_clickable((By.XPATH, '//a[contains(@href, "edit-token-request")]'))
            )
            edit_button.click()
            
            # Check if redirected to edit form
            WebDriverWait(self.selenium, 10).until(
                EC.url_contains('edit-token-request')
            )
            
            # Check if form is populated with correct data
            token_name_input = self.selenium.find_element(By.NAME, 'token_name')
            self.assertEqual(token_name_input.get_attribute('value'), 'Test Token')
            
        except TimeoutException:
            self.fail("Edit button not found or not clickable")
    
    def test_cancel_button_click(self):
        """Test if clicking the cancel button shows confirmation and processes cancellation"""
        self.login()
        
        # Go to token request view page
        view_url = f'{self.live_server_url}{reverse("developer_portal:view_token_request", kwargs={"request_id": self.pending_token_request.id})}'
        self.selenium.get(view_url)
        
        # Find and click cancel button
        try:
            cancel_button = WebDriverWait(self.selenium, 10).until(
                EC.element_to_be_clickable((By.XPATH, '//button[contains(text(), "Cancel Request")]'))
            )
            cancel_button.click()
            
            # Check if confirmation modal appears
            try:
                WebDriverWait(self.selenium, 10).until(
                    EC.visibility_of_element_located((By.ID, 'cancelConfirmationModal'))
                )
                
                # Confirm cancellation
                confirm_button = self.selenium.find_element(By.XPATH, '//button[contains(text(), "Confirm Cancellation")]')
                confirm_button.click()
                
                # Check if redirected to token requests list
                WebDriverWait(self.selenium, 10).until(
                    EC.url_contains('token-requests')
                )
                
                # Check for success message
                success_message = WebDriverWait(self.selenium, 10).until(
                    EC.visibility_of_element_located((By.CLASS_NAME, 'alert-success'))
                )
                self.assertIn('successfully cancelled', success_message.text.lower())
                
            except TimeoutException:
                self.fail("Confirmation modal not found")
                
        except TimeoutException:
            self.fail("Cancel button not found or not clickable")
    
    def test_edit_form_submission(self):
        """Test if edit form submission works correctly"""
        self.login()
        
        # Go directly to edit form
        edit_url = f'{self.live_server_url}{reverse("developer_portal:edit_token_request", kwargs={"request_id": self.pending_token_request.id})}'
        self.selenium.get(edit_url)
        
        # Modify form fields
        token_name_input = self.selenium.find_element(By.NAME, 'token_name')
        token_name_input.clear()
        token_name_input.send_keys('Updated Token Name')
        
        token_symbol_input = self.selenium.find_element(By.NAME, 'token_symbol')
        token_symbol_input.clear()
        token_symbol_input.send_keys('UTK')
        
        # Submit the form
        submit_button = self.selenium.find_element(By.XPATH, '//button[@type="submit"]')
        submit_button.click()
        
        # Check if redirected to view page
        try:
            WebDriverWait(self.selenium, 10).until(
                EC.url_contains('view-token-request')
            )
            
            # Check for success message
            success_message = WebDriverWait(self.selenium, 10).until(
                EC.visibility_of_element_located((By.CLASS_NAME, 'alert-success'))
            )
            self.assertIn('successfully updated', success_message.text.lower())
            
            # Check if displayed data is updated
            page_content = self.selenium.page_source
            self.assertIn('Updated Token Name', page_content)
            self.assertIn('UTK', page_content)
            
        except TimeoutException:
            self.fail("Form submission failed or success message not found")
            
    def test_cancel_button_disabled_states(self):
        """Test if cancel button is properly disabled for non-pending requests"""
        # Change token request status to approved
        self.pending_token_request.status = 'approved'
        self.pending_token_request.save()
        
        self.login()
        
        # Go to token request view page
        view_url = f'{self.live_server_url}{reverse("developer_portal:view_token_request", kwargs={"request_id": self.pending_token_request.id})}'
        self.selenium.get(view_url)
        
        # Check if cancel button is not present or disabled
        try:
            # Try to find a disabled cancel button or confirm it's not present
            disabled_buttons = self.selenium.find_elements(By.XPATH, '//button[contains(text(), "Cancel Request")][@disabled]')
            if not disabled_buttons:
                # If no disabled button, check that no cancel button exists at all
                cancel_buttons = self.selenium.find_elements(By.XPATH, '//button[contains(text(), "Cancel Request")]')
                self.assertEqual(len(cancel_buttons), 0, "Cancel button should not be present for approved requests")
            
        except Exception as e:
            self.fail(f"Error checking cancel button disabled state: {str(e)}")
            
    def test_edit_button_disabled_states(self):
        """Test if edit button is properly disabled for approved/processed requests"""
        # Change token request status to approved
        self.pending_token_request.status = 'approved'
        self.pending_token_request.save()
        
        self.login()
        
        # Go to token request view page
        view_url = f'{self.live_server_url}{reverse("developer_portal:view_token_request", kwargs={"request_id": self.pending_token_request.id})}'
        self.selenium.get(view_url)
        
        # Check if edit button is not present
        edit_links = self.selenium.find_elements(By.XPATH, '//a[contains(@href, "edit-token-request")]')
        self.assertEqual(len(edit_links), 0, "Edit button should not be present for approved requests")