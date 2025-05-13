# Link3 Developer Portal

## Overview

Link3 is a developer platform that provides tokenization services and blockchain integration for application developers. The platform allows developers to authenticate using both traditional methods and Web3 authentication via the Reown AppKit.

## Features

- **User Authentication**
  - Traditional username/password authentication
  - Web3 authentication via Reown AppKit
  - OAuth integration with Google, GitHub, and other providers

- **Developer Portal**
  - Application management dashboard
  - API key generation and management
  - Documentation and SDK access

- **Blockchain Integration**
  - Support for SEI blockchain (primary)
  - Future expansion to Ethereum and other chains
  - Smart contract deployment and management

- **Tokenization Engine**
  - Convert application components into tokenized assets
  - Manage token distribution and economics
  - Track token usage and analytics

## Tech Stack

- **Backend**: Django with Django REST Framework
- **Database**: SQLite (development), PostgreSQL (production)
- **Frontend**: HTML, CSS, JS with Bootstrap 5
- **Build Tools**: Vite.js for JavaScript bundling
- **Web3 Integration**: Reown AppKit SDK
- **Authentication**: Custom Django authentication + Reown Web3 auth

## Project Structure

- `api/` - REST API implementation for the platform
- `authentication/` - User authentication including Reown Web3 integration
- `blockchain/` - Blockchain connectors and services
- `developer_portal/` - Developer dashboard views and logic
- `tokenization/` - Tokenization engine and services
- `users/` - User profile management
- `src/` - Frontend source code (JavaScript modules)
- `static/` - Static assets and compiled JS
- `templates/` - Django HTML templates

## Setting Up Development Environment

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm 9+

### Installation

1. Clone the repository
   ```
   git clone https://github.com/daevooh/link3.git
   cd link3
   ```

2. Set up Python virtual environment
   ```
   python -m venv linkenv
   linkenv\Scripts\Activate.ps1
   pip install -r link3_project/requirements.txt
   ```

3. Install JavaScript dependencies
   ```
   npm install
   ```

4. Build the JavaScript bundle
   ```
   npx vite build
   ```

5. Run migrations
   ```
   cd link3_project
   python manage.py migrate
   ```

6. Run the development server
   ```
   python manage.py runserver
   ```

7. Access the application at http://127.0.0.1:8000/

## Reown AppKit Integration

Link3 uses Reown AppKit for Web3 authentication, allowing users to sign up and log in using their blockchain wallets. The integration handles:

- Wallet connection via Web3Modal
- Authentication via message signing
- User profile creation from wallet information

### Configuration

Set the following environment variables:
```
REOWN_API_URL=https://api.reown.com/v1
REOWN_CLIENT_ID=your_client_id
REOWN_CLIENT_SECRET=your_client_secret
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Roadmap

- Complete Web3 authentication flow with Reown AppKit
- Add support for Ethereum blockchain integration
- Implement token distribution mechanisms
- Develop SDK for easy integration with third-party applications
- Add monitoring and analytics features
- Add the sonenium blockchain
- Add the Eliza and chainline AI to aid tokenomics and DAO vetting
- 
