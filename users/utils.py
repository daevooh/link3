import uuid

def generate_random_user_id():
    """Generate a random user ID for new users"""
    return f"user_{uuid.uuid4().hex[:12]}"