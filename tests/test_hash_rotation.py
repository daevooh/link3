import requests
import json
import argparse
import time
import sys
import os

def test_hash_key_rotation(api_key, user_id=None, base_url="http://localhost:8000/api/v1"):
    """Test hash key rotation with multiple interactions for the same user"""
    print("\n====== Testing Hash Key Rotation for Existing User ======")
    
    headers = {
        'Content-Type': 'application/json',
        'X-API-Key': api_key
    }
    
    # Step 1: Initial interaction to get a hash key
    if user_id is None:
        # Create a new user with a timestamp-based ID
        user_id = f"rotation_test_user_{int(time.time())}"
        print(f"\nCreating new test user: {user_id}")
    else:
        print(f"\nUsing existing user: {user_id}")
    
    # First interaction (login)
    print("\n----- Step 1: Initial Login -----")
    payload = {
        "action_type": "login",
        "user_id": user_id,
        "metadata": {}
    }
    
    print(f"Request: POST {base_url}/interaction/")
    print(f"Payload: {json.dumps(payload, indent=2)}")
    
    response = requests.post(
        f"{base_url}/interaction/",
        headers=headers,
        json=payload
    )
    
    if response.status_code != 200:
        print(f"ERROR: Failed with status {response.status_code}")
        print(response.text)
        return
    
    data = response.json()
    print(f"Response: {json.dumps(data, indent=2)}")
    
    # Get the hash key for the next request
    hash_key = data.get('new_hash_key')
    tokens_earned = data.get('tokens_earned', 0)
    token_balance = data.get('token_balance', 0)
    
    print(f"\nUser: {user_id}")
    print(f"Tokens earned: {tokens_earned}")
    print(f"Current balance: {token_balance}")
    print(f"Hash key: {hash_key[:20]}...")
    
    # Step 2: Second interaction using the hash key
    print("\n----- Step 2: Video Watch with Hash Key -----")
    
    payload = {
        "action_type": "video_watch",
        "hash_key": hash_key,
        "metadata": {
            "duration_seconds": 120,
            "video_id": "test-vid-001"
        }
    }
    
    print(f"Request: POST {base_url}/interaction/")
    print(f"Payload: {json.dumps(payload, indent=2)}")
    
    response = requests.post(
        f"{base_url}/interaction/",
        headers=headers,
        json=payload
    )
    
    if response.status_code != 200:
        print(f"ERROR: Failed with status {response.status_code}")
        print(response.text)
        return
    
    data = response.json()
    print(f"Response: {json.dumps(data, indent=2)}")
    
    # Get the new hash key and updated balance
    new_hash_key = data.get('new_hash_key')
    video_tokens = data.get('tokens_earned', 0)
    new_balance = data.get('token_balance', 0)
    
    print(f"\nUser: {user_id}")
    print(f"Tokens earned: {video_tokens}")
    print(f"New balance: {new_balance}")
    print(f"New hash key: {new_hash_key[:20]}...")
    
    # Verify the balance increased correctly
    expected_balance = float(token_balance) + float(video_tokens)
    if abs(float(new_balance) - expected_balance) < 0.0001:
        print(f"✅ Balance updated correctly: {token_balance} + {video_tokens} = {new_balance}")
    else:
        print(f"❌ Balance error! Expected {expected_balance}, got {new_balance}")
    
    # Step 3: Verify hash key rotation in database
    # Step 3: Verify hash key rotation in database
    try:
        # Setup Django
        sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'link3_project.settings')
        import django
        django.setup()
        
        from users.models import HashKeyRotation, AppUser
        
        print("\n----- Database Verification -----")
        
        # Check the user
        user = AppUser.objects.get(external_id=user_id)
        print(f"User found: {user.external_id}")
        print(f"Token balance in DB: {user.token_balance}")
        
        # Check the first hash key (should be inactive)
        old_hash = HashKeyRotation.objects.filter(
            previous_hash_key=hash_key
        ).first()
        
        if old_hash:
            print(f"\nOriginal hash key found in database")
            print(f"  User: {old_hash.user.external_id}")
            print(f"  Active: {old_hash.is_active}")
            
            if not old_hash.is_active:
                print(f"✅ Hash key correctly marked as inactive after use")
            else:
                print(f"❌ Hash key still active after use (security issue)")
        else:
            print(f"❌ Original hash key not found in database!")
        
        # Check the new hash key (should be active)
        new_hash = HashKeyRotation.objects.filter(
            previous_hash_key=new_hash_key
        ).first()
        
        if new_hash:
            print(f"\nNew hash key found in database")
            print(f"  User: {new_hash.user.external_id}")
            print(f"  Active: {new_hash.is_active}")
            
            if new_hash.is_active:
                print(f"✅ New hash key correctly marked as active")
            else:
                print(f"❌ New hash key not active (error)")
        else:
            print(f"❌ New hash key not found in database!")
        
        # List all hash keys for this user
        all_keys = HashKeyRotation.objects.filter(user=user).order_by('-created_at')
        print(f"\nAll hash keys for user {user_id}: {all_keys.count()}")
        
        for i, key in enumerate(all_keys[:5]):  # Show only the most recent 5
            print(f"  {i+1}. {'ACTIVE' if key.is_active else 'inactive'} - Created: {key.created_at}")
        
    except Exception as e:
        print(f"Error during database verification: {str(e)}")
        
        # Step 4: Make a third request using the new hash key
        print("\n----- Step 3: Third Interaction with New Hash Key -----")
        
        payload = {
            "action_type": "share",
            "hash_key": new_hash_key,
            "metadata": {
                "platform": "twitter",
                "url": "https://example.com/shared-content"
            }
        }
        
        print(f"Request: POST {base_url}/interaction/")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(
            f"{base_url}/interaction/",
            headers=headers,
            json=payload
        )
        
        if response.status_code != 200:
            print(f"ERROR: Failed with status {response.status_code}")
            print(response.text)
            return
        
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        # Get the newest hash key and final balance
        final_hash_key = data.get('new_hash_key')
        share_tokens = data.get('tokens_earned', 0)
        final_balance = data.get('token_balance', 0)
        
        print(f"\nUser: {user_id}")
        print(f"Tokens earned: {share_tokens}")
        print(f"Final balance: {final_balance}")
        print(f"Final hash key: {final_hash_key[:20]}...")
        
        # Verify the balance increased correctly
        expected_final = float(new_balance) + float(share_tokens)
        if abs(float(final_balance) - expected_final) < 0.0001:
            print(f"✅ Final balance correct: {new_balance} + {share_tokens} = {final_balance}")
        else:
            print(f"❌ Final balance error! Expected {expected_final}, got {final_balance}")
        
        print("\n====== Hash Key Rotation Test Complete ======")
        return user_id

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Test Link3 Hash Key Rotation')
    parser.add_argument('--api-key', required=True, help='Your Link3 API key')
    parser.add_argument('--user-id', help='Existing user ID to test with (optional)')
    parser.add_argument('--base-url', default='http://localhost:8000/api/v1', help='Base API URL')
    
    args = parser.parse_args()
    
    test_hash_key_rotation(args.api_key, args.user_id, args.base_url)