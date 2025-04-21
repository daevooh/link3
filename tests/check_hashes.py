import os
import sys
import django

# Setup Django
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'link3_project.settings')
django.setup()

from users.models import HashKeyRotation, AppUser

def check_hash_keys():
    # Check if the model exists
    print("Checking HashKeyRotation model...")
    
    # Count all hash keys
    total_keys = HashKeyRotation.objects.count()
    print(f"Total hash keys in database: {total_keys}")
    
    # Count active hash keys
    active_keys = HashKeyRotation.objects.filter(is_active=True).count()
    print(f"Active hash keys: {active_keys}")
    
    # Show users with balances
    users_with_balance = AppUser.objects.filter(token_balance__gt=0)
    print(f"\nUsers with positive balance: {users_with_balance.count()}")
    
    for user in users_with_balance:
        print(f"User {user.external_id}: {user.token_balance} tokens")
        
        # Check hash keys for this user
        user_keys = HashKeyRotation.objects.filter(user=user)
        print(f"  - Hash keys: {user_keys.count()} total")
        
        active_keys = user_keys.filter(is_active=True)
        print(f"  - Active hash keys: {active_keys.count()}")
        
        if active_keys.exists():
            for key in active_keys:
                print(f"    - {key.previous_hash_key[:20]}... (created: {key.created_at})")

if __name__ == "__main__":
    check_hash_keys()


# test the blockain interactions. ===== python manage.py test_sei_integration