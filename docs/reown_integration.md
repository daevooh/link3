# Reown AppKit Integration for Link3

This document provides an overview of the Reown AppKit integration in the Link3 developer portal, which enables Web3 authentication alongside traditional username/password authentication.

## Overview

Reown AppKit is a Web3 authentication SDK that allows users to authenticate using their blockchain wallets. In the Link3 developer portal, this integration provides users with an alternative sign-up and login method, enhancing the platform's Web3 capabilities.

## Components

The integration consists of several components:

1. **Backend Authentication Client**: `ReownAuthClient` in `authentication/reown.py` handles server-side authentication and verification.
2. **Frontend Connector**: `ReownAppkitConnector` in `static/js/reown-appkit-connector.js` manages the frontend wallet connections and authentication flow.
3. **User Model Integration**: The `DeveloperProfile` model is extended with `reown_id` and `wallet_address` fields to store blockchain-related user information.
4. **Authentication Views**: Callback handlers in `authentication/views.py` process the authentication data from Reown.
5. **Template Integration**: The signup template includes a "Connect with Web3 Wallet" button, triggering the Reown authentication flow.

## Configuration

The Reown integration requires the following configuration settings in `settings.py`:

```python
REOWN_CLIENT_ID = os.environ.get('REOWN_CLIENT_ID', 'link3-app')
REOWN_CLIENT_SECRET = os.environ.get('REOWN_CLIENT_SECRET', '')
REOWN_API_URL = os.environ.get('REOWN_API_URL', 'https://api.reown.com/v1')
```

In production, these values should be set as environment variables for security.

## Authentication Flow

1. **User Initiates Authentication**: User clicks the "Connect with Web3 Wallet" button on the signup page.
2. **Wallet Connection**: Reown AppKit prompts the user to connect their wallet (e.g., MetaMask).
3. **Authentication**: User signs a message to prove wallet ownership.
4. **Callback Processing**: Reown redirects back to the Link3 application with an authentication token.
5. **User Creation/Update**: The backend verifies the token and creates or updates the user account.
6. **Session Establishment**: The user is automatically logged in and redirected to the dashboard.

## Error Handling

The integration includes error handling for common scenarios:
- Failed wallet connections
- Rejected signature requests
- Invalid authentication tokens
- User creation failures

Error messages are displayed to the user with appropriate context.

## Security Considerations

- The Reown authentication flow uses standard OAuth 2.0 practices
- Authentication tokens are only stored in session storage during the authentication process
- Backend validation ensures the authenticity of tokens before user creation
- User accounts are created with random passwords when using Reown authentication

## Testing

To test the Reown integration:

1. Configure test credentials in your environment
2. Start the development server
3. Navigate to the signup page
4. Click "Connect with Web3 Wallet"
5. Complete the authentication flow with a test wallet
6. Verify automatic login and redirection

## Troubleshooting

Common issues:

- **Wallet Connection Fails**: Ensure your browser has a Web3 wallet extension installed and unlocked
- **Authentication Error**: Check the Reown client ID and secret configuration
- **Callback Failure**: Verify that the callback URL is correctly registered in the Reown dashboard
- **Missing User Data**: Check browser console for errors in profile retrieval

## Extension Points

The current implementation can be extended to:
- Support additional wallet providers
- Implement blockchain-specific features for authenticated users
- Enable token-gated access to platform features
- Add additional identity verification steps
