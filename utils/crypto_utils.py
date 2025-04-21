import os
import base64
import json
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend

# Generate a secure key
def generate_secret_key():
    password = b"your-secure-password"  # Replace with a strong password
    salt = os.urandom(16)  # Random salt
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=100000,
        backend=default_backend()
    )
    return kdf.derive(password)

# Encrypt data
def encrypt_data(data, secret_key):
    # Convert data to JSON string
    json_data = json.dumps(data)
    
    # Add padding to the data
    padder = padding.PKCS7(algorithms.AES.block_size).padder()
    padded_data = padder.update(json_data.encode()) + padder.finalize()
    
    # Generate a random initialization vector (IV)
    iv = os.urandom(16)
    
    # Encrypt the data
    cipher = Cipher(algorithms.AES(secret_key), modes.CBC(iv), backend=default_backend())
    encryptor = cipher.encryptor()
    encrypted_data = encryptor.update(padded_data) + encryptor.finalize()
    
    # Combine IV and encrypted data, then encode in Base64
    return base64.urlsafe_b64encode(iv + encrypted_data).decode()

# Decrypt data
def decrypt_data(encrypted_data, secret_key):
    # Decode Base64
    encrypted_data = base64.urlsafe_b64decode(encrypted_data)
    
    # Extract IV and encrypted data
    iv = encrypted_data[:16]
    encrypted_data = encrypted_data[16:]
    
    # Decrypt the data
    cipher = Cipher(algorithms.AES(secret_key), modes.CBC(iv), backend=default_backend())
    decryptor = cipher.decryptor()
    padded_data = decryptor.update(encrypted_data) + decryptor.finalize()
    
    # Remove padding
    unpadder = padding.PKCS7(algorithms.AES.block_size).unpadder()
    data = unpadder.update(padded_data) + unpadder.finalize()
    
    # Convert JSON string back to dictionary
    return json.loads(data.decode())