// src/reown-appkit-connector.js
// Using fallback imports in case of dependency issues
import { createAppKit } from "@reown/appkit";

// Try to import the adapter but wrap in try-catch for resilience
let ethersAdapter;
try {
  // First try ethers5 adapter
  const { Ethers5Adapter } = require("@reown/appkit-adapter-ethers5");
  ethersAdapter = new Ethers5Adapter();
} catch (e) {
  console.warn("Could not load Ethers5Adapter, falling back to defaults");
  ethersAdapter = null;
}

// Import networks
import { mainnet } from "@reown/appkit/networks";

// Application metadata
const metadata = {
  name: "Link3 Developer Portal",
  description: "Web3 authentication for Link3 platform",
  url: window.location.origin,
  icons: ["https://placehold.co/400x400/4287f5/ffffff?text=Link3"], // Use a placeholder if logo not found
};

// Create a reown instance with configuration from documentation
const reownAppKit = createAppKit({
  adapters: ethersAdapter ? [ethersAdapter] : [],
  projectId: window.REOWN_CLIENT_ID || '56b29646dee3d7b8afbe2071a2cf088d', // Use client secret as project ID
  metadata: metadata,
  networks: [mainnet],
  features: {
    analytics: false, // Disable analytics to avoid 403 errors
    email: true,
    socials: ['google', 'github', 'discord']
  },
  themeMode: 'light'
});

// Extract the client ID from the script tag if available
const scriptTag = document.currentScript || document.querySelector('script[data-client-id]');
if (scriptTag && scriptTag.dataset && scriptTag.dataset.clientId) {
    window.REOWN_CLIENT_ID = scriptTag.dataset.clientId;
}

// Expose to window for legacy code or template access
window.ReownAppKit = reownAppKit;

// Example: create a connector class (like before, but using the npm SDK)
class ReownAppkitConnector {
    constructor(config = {}) {
        this.clientId = config.clientId || window.REOWN_CLIENT_ID || '';
        this.redirectUrl = config.redirectUrl || window.location.origin + '/signup/';
        this.callbackPath = config.callbackPath || '/auth/reown/callback/';
        this.onLoginSuccess = config.onLoginSuccess || (() => {});
        this.onLoginError = config.onLoginError || ((err) => console.error('Reown login error:', err));
        this.reownAppKit = null;
        this.userProfile = null;

        this.init();
    }async init() {
        try {
            // Use the already created instance
            this.reownAppKit = window.ReownAppKit;

            // If this is a callback URL, handle authentication
            if (this.isCallbackUrl()) {
                await this.handleAuthCallback();
            }
        } catch (error) {
            this.onLoginError(error);
        }
    }    async connectWallet() {
        try {
            if (!this.reownAppKit) throw new Error('Reown AppKit not initialized');
            
            // Open the modal to connect wallet
            const connection = await this.reownAppKit.open();
            return connection;
        } catch (error) {
            this.onLoginError(error);
            throw error;
        }
    }

    async login() {
        try {
            if (!this.reownAppKit) await this.init();
            
            // Open the modal and it will handle the authentication flow
            // Using a simple approach without Promise.race to avoid race condition issues
            // that could interfere with the auth flow
            console.log('Opening Reown authentication modal...');
            await this.reownAppKit.open({
                view: 'Sign',
                signMessage: 'Sign this message to authenticate with Link3'
            });
            
            // After successful authentication, handle callback
            if (this.isCallbackUrl()) {
                await this.handleAuthCallback();
            }        } catch (error) {
            console.error('Login error:', error);
            
            // Handle specific error types to provide better user experience
            if (error.message && (
                error.message.includes('403') || 
                error.message.includes('Connection') || 
                error.message.includes('interrupted'))) {
                error.message = 'Web3 wallet connection service encountered an issue. Please try again later or use email signup.';
            }
            
            this.onLoginError(error);
            throw error;
            // Handle specific error types
            let errorMessage = error.message;
            if (errorMessage.includes('Connection interrupted') || errorMessage.includes('status of 403')) {
                errorMessage = 'Connection to Web3 service failed. Please try again later or contact support.';
            }
            
            const customError = new Error(errorMessage);
            this.onLoginError(customError);
            throw customError;
        }
    }

    async handleAuthCallback() {
        try {
            const result = await this.reownAppKit.handleCallback();
            if (result && result.token) {
                sessionStorage.setItem('reown_auth_token', result.token);
                this.userProfile = await this.getUserProfile();

                // Send to backend
                const formData = new FormData();
                formData.append('reown_auth_token', result.token);
                if (this.userProfile) {
                    formData.append('reown_user_id', this.userProfile.id);
                    formData.append('reown_user_email', this.userProfile.email || '');
                    formData.append('reown_user_name', this.userProfile.name || '');
                    formData.append('reown_wallet_address', this.userProfile.wallet_address || '');
                }

                const response = await fetch(this.callbackPath, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-CSRFToken': this.getCsrfToken()
                    }
                });

                const data = await response.json();
                if (data.success) {
                    this.onLoginSuccess(data);
                } else {
                    throw new Error(data.error || 'Authentication failed');
                }
            } else {
                throw new Error('Invalid authentication response');
            }
        } catch (error) {
            this.onLoginError(error);
            throw error;
        }
    }

    async getUserProfile() {
        try {
            const token = sessionStorage.getItem('reown_auth_token');
            if (!token) throw new Error('Not authenticated');
            const profile = await this.reownAppKit.getUserProfile(token);
            this.userProfile = profile;
            return profile;
        } catch (error) {
            this.onLoginError(error);
            return null;
        }
    }

    isAuthenticated() {
        return !!sessionStorage.getItem('reown_auth_token');
    }

    isCallbackUrl() {
        return window.location.search.includes('code=');
    }

    getCsrfToken() {
        const name = 'csrftoken=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookies = decodedCookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return '';
    }
}

// Expose the connector globally for template usage
window.ReownAppkitConnector = ReownAppkitConnector;