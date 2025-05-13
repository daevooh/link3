"""
Test script for Reown authentication integration.
This script simulates the authentication flow and validates the functionality.
"""
import os
import sys
import json
import requests
import logging
from unittest.mock import MagicMock, patch

# Add the project directory to the path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger('test_reown_auth')

# Django setup
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "link3_project.settings")
import django
django.setup()

from authentication.reown import ReownAuthClient, create_or_update_user_from_reown
from django.contrib.auth.models import User
from users.models import DeveloperProfile

def test_reown_auth_client():
    """Test the ReownAuthClient functionality."""
    logger.info("Testing ReownAuthClient...")
    
    # Create mock client
    client = ReownAuthClient(
        client_id="test_client_id",
        client_secret="test_client_secret",
        api_url="https://test.reown.com/api"
    )
    
    # Verify initialization
    assert client.client_id == "test_client_id"
    assert client.client_secret == "test_client_secret"
    assert client.api_url == "https://test.reown.com/api"
    
    logger.info("ReownAuthClient initialization tests passed")
    
    # Mock the requests.post response for verify_auth_token
    with patch('requests.post') as mock_post:
        # Configure the mock
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            "id": "reown123",
            "email": "test@example.com",
            "name": "Test User",
            "wallet_address": "0x123456789abcdef"
        }
        mock_post.return_value = mock_response
        
        # Call the method
        result = client.verify_auth_token("test_token")
        
        # Verify the result
        assert result is not None
        assert result["id"] == "reown123"
        assert result["email"] == "test@example.com"
        
        # Verify the API was called correctly
        mock_post.assert_called_once_with(
            "https://test.reown.com/api/auth/verify",
            json={"token": "test_token"},
            headers={
                "X-Reown-Client-ID": "test_client_id",
                "X-Reown-Client-Secret": "test_client_secret",
                "Content-Type": "application/json"
            }
        )
        
    logger.info("ReownAuthClient.verify_auth_token tests passed")
    
    # Mock the requests.get response for get_user_profile
    with patch('requests.get') as mock_get:
        # Configure the mock
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            "id": "reown123",
            "email": "test@example.com",
            "name": "Test User",
            "wallet_address": "0x123456789abcdef"
        }
        mock_get.return_value = mock_response
        
        # Call the method
        result = client.get_user_profile("reown123")
        
        # Verify the result
        assert result is not None
        assert result["id"] == "reown123"
        assert result["wallet_address"] == "0x123456789abcdef"
        
        # Verify the API was called correctly
        mock_get.assert_called_once_with(
            "https://test.reown.com/api/users/reown123",
            headers={
                "X-Reown-Client-ID": "test_client_id",
                "X-Reown-Client-Secret": "test_client_secret"
            }
        )
    
    logger.info("ReownAuthClient.get_user_profile tests passed")

def test_user_creation():
    """Test user creation from Reown data."""
    logger.info("Testing user creation from Reown data...")
    
    # Mock user data from Reown
    reown_data = {
        "id": "reown_test_id_12345",
        "email": "reowntest@example.com",
        "name": "Reown Test User",
        "wallet_address": "0xabcdef1234567890"
    }
    
    try:
        # Delete any existing test user to start fresh
        try:
            user = User.objects.get(email="reowntest@example.com")
            user.delete()
            logger.info("Deleted existing test user")
        except User.DoesNotExist:
            pass
        
        # Create user from Reown data
        user = create_or_update_user_from_reown(reown_data)
        
        # Verify user was created correctly
        assert user is not None
        assert user.email == "reowntest@example.com"
        assert user.first_name == "Reown"
        assert user.last_name == "Test User"
        
        # Verify profile was created correctly
        profile = DeveloperProfile.objects.get(user=user)
        assert profile.reown_id == "reown_test_id_12345"
        assert profile.wallet_address == "0xabcdef1234567890"
        assert profile.is_verified is True
        
        logger.info("User creation tests passed")
        
        # Test updating existing user
        updated_reown_data = {
            "id": "reown_test_id_12345",
            "email": "reowntest@example.com",
            "name": "Updated Reown User",
            "wallet_address": "0x9876543210fedcba"
        }
        
        updated_user = create_or_update_user_from_reown(updated_reown_data)
        
        # Verify user was updated correctly
        assert updated_user.id == user.id  # Same user
        assert updated_user.first_name == "Updated"
        
        # Verify profile was updated
        profile.refresh_from_db()
        assert profile.wallet_address == "0x9876543210fedcba"
        
        logger.info("User update tests passed")
        
    finally:
        # Clean up
        try:
            user = User.objects.get(email="reowntest@example.com")
            user.delete()
            logger.info("Test cleanup: Deleted test user")
        except:
            pass

if __name__ == "__main__":
    try:
        logger.info("Starting Reown authentication tests")
        test_reown_auth_client()
        test_user_creation()
        logger.info("All tests passed!")
    except Exception as e:
        logger.error(f"Test failed: {str(e)}", exc_info=True)
        sys.exit(1)
