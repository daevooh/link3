import requests
import sys
import os
import json
from colorama import init, Fore, Style

# Initialize colorama for colored output
init()

# Base URL of your API
BASE_URL = "http://127.0.0.1:8000"
API_URL = f"{BASE_URL}/api"
DOCS_URL = f"{BASE_URL}/docs/?format=openapi"

def print_header(text):
    """Print a formatted header"""
    print(f"\n{Fore.BLUE}{Style.BRIGHT}" + "="*50)
    print(f" {text} ".center(50, '='))
    print("="*50 + f"{Style.RESET_ALL}\n")

def print_success(text):
    """Print a success message"""
    print(f"{Fore.GREEN}✓ {text}{Style.RESET_ALL}")

def print_error(text):
    """Print an error message"""
    print(f"{Fore.RED}✗ {text}{Style.RESET_ALL}")

def print_warning(text):
    """Print a warning message"""
    print(f"{Fore.YELLOW}! {text}{Style.RESET_ALL}")

def print_info(text):
    """Print an info message"""
    print(f"{Fore.CYAN}ℹ {text}{Style.RESET_ALL}")

def test_docs_availability():
    """Test if the API documentation is available"""
    print_header("Testing API Documentation Availability")
    
    try:
        # Check Swagger UI
        response = requests.get(f"{BASE_URL}/docs/")
        if response.status_code == 200:
            print_success("Swagger UI is available")
        else:
            print_error(f"Swagger UI returned status code {response.status_code}")
        
        # Check ReDoc
        response = requests.get(f"{BASE_URL}/redoc/")
        if response.status_code == 200:
            print_success("ReDoc is available")
        else:
            print_error(f"ReDoc returned status code {response.status_code}")
        
        # Check OpenAPI Schema
        response = requests.get(f"{BASE_URL}/docs/?format=openapi")
        if response.status_code == 200:
            print_success("OpenAPI schema is available")
            
            # Try to parse the schema to check if it's valid JSON
            try:
                schema = response.json()
                print_info(f"OpenAPI schema contains {len(schema['paths'])} endpoints")
                return schema
            except json.JSONDecodeError:
                print_error("Failed to decode OpenAPI schema as JSON")
                return None
        else:
            print_error(f"OpenAPI schema returned status code {response.status_code}")
            return None
            
    except requests.exceptions.ConnectionError:
        print_error("Failed to connect to API. Is the server running?")
        return None

def test_terms_and_contact_pages():
    """Test if the terms and contact pages are available"""
    print_header("Testing Terms of Service and Contact Pages")
    
    # Check Terms of Service page
    try:
        response = requests.get(f"{BASE_URL}/terms/")
        if response.status_code == 200:
            print_success("Terms of Service page is available")
        else:
            print_error(f"Terms of Service page returned status code {response.status_code}")
    except requests.exceptions.ConnectionError:
        print_error("Failed to connect to Terms of Service page")
    
    # Check Contact page
    try:
        response = requests.get(f"{BASE_URL}/contact/")
        if response.status_code == 200:
            print_success("Contact page is available")
        else:
            print_error(f"Contact page returned status code {response.status_code}")
    except requests.exceptions.ConnectionError:
        print_error("Failed to connect to Contact page")

def check_endpoint_documentation(schema):
    """Check that all endpoints are properly documented"""
    print_header("Checking Endpoint Documentation")
    
    if not schema:
        print_error("No schema available to check")
        return
    
    paths = schema.get('paths', {})
    
    if not paths:
        print_error("No paths found in the OpenAPI schema")
        return
    
    # Count statistics
    total_endpoints = 0
    documented_endpoints = 0
    undocumented_endpoints = []
    
    # Check blockchain endpoints
    blockchain_endpoints = [path for path in paths if '/networks/' in path or '/tokens/' in path]
    print_info(f"Found {len(blockchain_endpoints)} blockchain API endpoints")
    
    # Check tokenization endpoints
    tokenization_endpoints = [path for path in paths if '/tokenization/' in path]
    print_info(f"Found {len(tokenization_endpoints)} tokenization API endpoints")
    
    # Check user & interaction endpoints
    user_endpoints = [path for path in paths if '/users/' in path or '/interaction' in path]
    print_info(f"Found {len(user_endpoints)} user interaction API endpoints")
    
    for path, methods in paths.items():
        for method, details in methods.items():
            if method in ['get', 'post', 'put', 'patch', 'delete']:
                total_endpoints += 1
                
                # Check if the endpoint has a description and parameters
                if not details.get('description') and not details.get('summary'):
                    undocumented_endpoints.append(f"{method.upper()} {path}")
                else:
                    documented_endpoints += 1
    
    if documented_endpoints == total_endpoints:
        print_success(f"All {total_endpoints} endpoints are documented")
    else:
        print_warning(f"{documented_endpoints} out of {total_endpoints} endpoints are documented")
        
        if undocumented_endpoints:
            print_info("Undocumented endpoints:")
            for endpoint in undocumented_endpoints:
                print(f"  - {endpoint}")

def test_key_api_endpoints(schema):
    """Test that key API endpoints are available and functioning"""
    print_header("Testing Key API Endpoints")
    
    # Test list of endpoints to check availability (just existence, not functionality)
    test_endpoints = [
        # Blockchain endpoints
        "/api/networks/",
        "/api/tokens/",
        
        # Tokenization endpoints
        "/api/tokenization/rules/",
        "/api/tokenization/action-types/",
        "/api/tokenization/stats/",
        
        # User endpoints
        "/api/test/",
        "/api/interaction/",
    ]
    
    for endpoint in test_endpoints:
        try:
            response = requests.get(f"{BASE_URL}{endpoint}")
            # We don't care about auth failures (401/403), just that the endpoint exists
            if response.status_code in [200, 401, 403]:
                print_success(f"{endpoint} is available (status: {response.status_code})")
            else:
                print_error(f"{endpoint} returned unexpected status {response.status_code}")
        except requests.exceptions.ConnectionError:
            print_error(f"Failed to connect to {endpoint}")

def check_serializers_and_schemas(schema):
    """Check that serializers and schemas are properly defined"""
    print_header("Checking Serializers and Response Schemas")
    
    if not schema:
        print_error("No schema available to check")
        return
    
    paths = schema.get('paths', {})
    components = schema.get('components', {})
    schemas = components.get('schemas', {})
    
    print_info(f"Found {len(schemas)} schema definitions")
    
    # Check for common serializers we expect to see
    expected_schemas = [
        "TokenizationRule", 
        "Interaction", 
        "AppUser", 
        "ProjectToken"
    ]
    
    for expected in expected_schemas:
        found = False
        for schema_name in schemas:
            if expected in schema_name:
                found = True
                print_success(f"Found schema for {expected}")
                break
        
        if not found:
            print_warning(f"Could not find schema for {expected}")
    
    # Check that POST endpoints have request bodies
    for path, methods in paths.items():
        if 'post' in methods:
            if 'requestBody' in methods['post']:
                print_success(f"POST {path} has a request body defined")
            else:
                print_warning(f"POST {path} is missing request body schema")

def main():
    """Run all tests"""
    print_header("API Documentation Validation Test")
    
    # Test if the docs are available
    schema = test_docs_availability()
    
    # Test terms and contact pages
    test_terms_and_contact_pages()
    
    # Check that all endpoints are documented
    check_endpoint_documentation(schema)
    
    # Test key API endpoints
    test_key_api_endpoints(schema)
    
    # Check serializers and schemas
    check_serializers_and_schemas(schema)
    
    print_header("Test Complete")

if __name__ == "__main__":
    main()