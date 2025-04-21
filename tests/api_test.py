import requests
import json
import argparse
import time
import sys
import os
import urllib.parse

def test_tokenization_with_hash_keys(api_key, base_url="http://localhost:8000/api/v1"):
    """Test the complete token earning flow with hash key rotation"""
    print("\n====== Testing Link3 Tokenization with Hash Keys ======\n")
    
    headers = {
        'Content-Type': 'application/json',
        'X-API-Key': api_key
    }
    
    # Add this to your test_tokenization_with_hash_keys function
    print("\n----- Testing API Authentication -----")
    test_url = f"{base_url}/test/"
    print(f"\nRequest: GET {test_url}")

    try:
        response = requests.get(
            test_url,
            headers=headers
        )
        
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            print("✅ API authentication working correctly")
        else:
            print("❌ API authentication not working")
            
    except Exception as e:
        print(f"Error testing API: {str(e)}")
    
    # Step 1: First login (should earn login tokens)
    print("----- Step 1: First Login (Token Reward) -----")
    
    payload = {
        "action_type": "login",
        "metadata": {},
        "user_id": f"test_user_{int(time.time())}"  # Unique user ID based on timestamp
    }
    
    print(f"\nRequest: POST {base_url}/interaction/")
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
    print(f"\nResponse: {json.dumps(data, indent=2)}")
    
    # Extract values for next request
    first_tokens = data.get('tokens_earned', 0)
    total_balance = data.get('token_balance', 0)
    hash_key = data.get('new_hash_key')
    
    print(f"\nTokens earned: {first_tokens}")
    print(f"Current balance: {total_balance}")
    print(f"Hash key received: {hash_key[:20]}...\n")
    
    # Step 2: Watch a video (using hash key from Step 1)
    print("----- Step 2: Video Watch (Token Reward) -----")
    
    payload = {
        "action_type": "video_watch",
        "hash_key": hash_key,  # Use hash key from previous response
        "metadata": {
            "duration_seconds": 120,  # 2 minutes should trigger multiplier
            "video_id": "test-video-001"
        }
    }
    
    print(f"\nRequest: POST {base_url}/interaction/")
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
    print(f"\nResponse: {json.dumps(data, indent=2)}")
    
    # Extract updated values
    video_tokens = data.get('tokens_earned', 0)
    new_total = data.get('token_balance', 0)
    new_hash_key = data.get('new_hash_key')
    
    print(f"\nTokens earned from video: {video_tokens}")
    print(f"New total balance: {new_total}")
    print(f"New hash key received: {new_hash_key[:20]}...\n")
    
    # Verify the hash key exists in database (and expect it to be INACTIVE)
    print("\nVerifying hash key database behavior...")
    try:
        # Setup Django
        sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'link3_project.settings')
        import django
        django.setup()
        
        from users.models import HashKeyRotation
        
        # The ORIGINAL hash key should be marked inactive now
        original_hash = HashKeyRotation.objects.filter(
            previous_hash_key=hash_key
        ).first()
        
        if original_hash:
            print(f"✅ Original hash key found in database")
            print(f"   User: {original_hash.user.external_id}")
            print(f"   Active: {original_hash.is_active}")
            print(f"   Created: {original_hash.created_at}")
            
            # It should be inactive - this is EXPECTED
            if not original_hash.is_active:
                print(f"✅ Hash key correctly marked as inactive after use")
            else:
                print(f"❌ Hash key still marked as active after use (security issue)")
        else:
            print(f"❌ Original hash key not found in database!")
        
        # The NEW hash key should be active
        new_hash = HashKeyRotation.objects.filter(
            previous_hash_key=new_hash_key,
            is_active=True
        ).first()
        
        if new_hash:
            print(f"✅ New hash key correctly stored and active")
            print(f"   User: {new_hash.user.external_id}")
            print(f"   Created: {new_hash.created_at}")
        else:
            print(f"❌ New hash key not found as active in database!")
            
    except Exception as e:
        print(f"Error checking database: {str(e)}")
    
    # Verify balance increased correctly
    expected_total = float(first_tokens) + float(video_tokens)
    actual_total = float(new_total)
    
    if abs(expected_total - actual_total) < 0.00001:  # Account for floating point imprecision
        print("✅ Balance calculation correct!")
    else:
        print(f"❌ Balance calculation error! Expected {expected_total}, got {actual_total}")
    
    # Step 3: Check balance using hash key
    print("\n----- Step 3: Check Balance API -----")
    
    balance_url = f"{base_url}/balance/"
    balance_payload = {"hash_key": new_hash_key}
    print(f"\nRequest: POST {balance_url}")
    print(f"Payload: {json.dumps(balance_payload, indent=2)}")
    
    try:
        response = requests.post(
            balance_url,
            headers=headers,
            json=balance_payload
        )
        
        print(f"Status: {response.status_code}")
        
        if response.status_code != 200:
            print(f"ERROR: Failed with status {response.status_code}")
            print(response.text)
            return
        
        data = response.json()
        print(f"\nResponse: {json.dumps(data, indent=2)}")
        
        # Verify the balance matches
        balance_from_api = data.get('token_balance', 0)
        
        if abs(float(balance_from_api) - actual_total) < 0.00001:
            print("✅ Balance API returning correct amount!")
        else:
            print(f"❌ Balance API error! Expected {actual_total}, got {balance_from_api}")
            
    except Exception as e:
        print(f"Error checking balance: {str(e)}")
    
    print("\n====== Testing Complete ======")
    print(f"Total tokens earned: {new_total}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Test Link3 Tokenization with Hash Keys')
    parser.add_argument('--api-key', required=True, help='Your Link3 API key')
    parser.add_argument('--base-url', default='http://localhost:8000/api/v1', help='Base API URL')
    
    args = parser.parse_args()
    
    test_tokenization_with_hash_keys(args.api_key, args.base_url)