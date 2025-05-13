/**
 * Reown AppKit Integration for Link3
 * 
 * This script provides integration with Reown AppKit for web3 authentication
 * and identity verification. It handles wallet connections, signing, and
 * authentication flows.
 * 
 * Dependencies:
 * - Reown AppKit SDK (loaded via CDN)
 */

class ReownAppkitConnector {
    /**
     * Initialize the Reown AppKit connector
     * @param {Object} config - Configuration object
     * @param {string} config.clientId - Reown AppKit client ID
     * @param {string} config.redirectUrl - URL to redirect after authentication
     * @param {string} config.callbackPath - Path to handle authentication callback
     * @param {Function} config.onLoginSuccess - Callback function on successful login
     * @param {Function} config.onLoginError - Callback function on login failure
     */
    constructor(config = {}) {
        this.clientId = config.clientId || '';
        this.redirectUrl = config.redirectUrl || window.location.origin + '/signup/';
        this.callbackPath = config.callbackPath || '/auth/reown/callback/';
        this.onLoginSuccess = config.onLoginSuccess || (() => {});
        this.onLoginError = config.onLoginError || ((err) => console.error('Reown login error:', err));
        
        this.reownAppKit = null;
        this.userProfile = null;
        
        // Bind methods
        this.init = this.init.bind(this);
        this.connectWallet = this.connectWallet.bind(this);
        this.login = this.login.bind(this);
        this.handleAuthCallback = this.handleAuthCallback.bind(this);
        this.getUserProfile = this.getUserProfile.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.isCallbackUrl = this.isCallbackUrl.bind(this);
        
        // Load SDK and initialize
        this.loadSdk().then(this.init).catch(err => {
            console.error('Failed to load Reown AppKit:', err);
            this.onLoginError(new Error('Failed to load Reown AppKit SDK'));
        });
    }
    
    /**
     * Load the Reown AppKit SDK from CDN
     */
    async loadSdk() {
        return new Promise((resolve, reject) => {
            if (window.ReownAppKit) {
                console.log('Reown AppKit SDK already loaded');
                resolve(window.ReownAppKit);
                return;
            }
            
            // Try multiple potential CDN URLs
            const cdnUrls = [
                'https://cdn.reown.com/appkit/v1/reown-appkit.min.js',
                'https://cdn.reown.xyz/appkit/v1/reown-appkit.min.js',
                'https://cdn.reown.io/appkit/v1/reown-appkit.min.js',
                'https://unpkg.com/@reown/appkit@latest/dist/reown-appkit.min.js',
                'https://cdn.jsdelivr.net/npm/@reown/appkit@latest/dist/reown-appkit.min.js'
            ];
            
            // Try loading from each URL sequentially
            const tryLoadFromCdn = (index) => {
                if (index >= cdnUrls.length) {
                    reject(new Error('Failed to load Reown AppKit SDK from all CDN sources'));
                    return;
                }
                
                const url = cdnUrls[index];
                console.log(`Attempting to load Reown AppKit SDK from ${url}...`);
                
                const script = document.createElement('script');
                script.src = url;
                script.async = true;
                script.crossOrigin = 'anonymous'; // Add CORS support
                
                script.onload = () => {
                    console.log(`Successfully loaded SDK from ${url}`);
                    if (window.ReownAppKit) {
                        resolve(window.ReownAppKit);
                    } else {
                        console.error('Script loaded but ReownAppKit not defined');
                        tryLoadFromCdn(index + 1);
                    }
                };
                
                script.onerror = () => {
                    console.warn(`Failed to load SDK from ${url}, trying next source...`);
                    tryLoadFromCdn(index + 1);
                };
                
                document.head.appendChild(script);
            };
            
            // Start trying to load from CDNs
            tryLoadFromCdn(0);
            
            // Add timeout to ensure we don't wait forever
            setTimeout(() => {
                if (!window.ReownAppKit) {
                    reject(new Error('Timeout loading Reown AppKit SDK'));
                }
            }, 10000);
        });
    }
    
    /**
     * Initialize the Reown AppKit
     */
    async init() {
        try {
            if (!window.ReownAppKit) {
                console.log('Window.ReownAppKit not found, trying to load SDK first');
                await this.loadSdk();
            }
            
            if (!window.ReownAppKit) {
                throw new Error('Reown AppKit SDK not available after loading');
            }
            
            console.log('Initializing Reown AppKit with clientId:', this.clientId);
            
            // Initialize the SDK
            this.reownAppKit = new window.ReownAppKit({
                clientId: this.clientId,
                redirectUrl: this.redirectUrl
            });
            
            console.log('Reown AppKit SDK initialized successfully');
            
            // Check if this is a callback URL and handle authentication
            if (this.isCallbackUrl()) {
                await this.handleAuthCallback();
            }
        } catch (error) {
            console.error('Error initializing Reown AppKit:', error);
            // Try to display a more informative error
            if (error.message) {
                this.onLoginError(error);
            } else {
                this.onLoginError(new Error('Failed to initialize Reown AppKit'));
            }
        }
    }
    
    /**
     * Connect to a web3 wallet (MetaMask, etc.)
     */
    async connectWallet() {
        try {
            if (!this.reownAppKit) {
                throw new Error('Reown AppKit not initialized');
            }
            
            const connection = await this.reownAppKit.connectWallet();
            console.log('Wallet connected:', connection);
            return connection;
        } catch (error) {
            console.error('Error connecting wallet:', error);
            throw error;
        }
    }
    
    /**
     * Authenticate with Reown
     */
    async login() {
        try {
            if (!window.ReownAppKit) {
                console.error('Window.ReownAppKit is not defined, trying to reload SDK');
                await this.loadSdk();
            }
            
            if (!this.reownAppKit) {
                console.log('Reown AppKit not initialized, initializing now...');
                await this.init();
            }
            
            if (!this.reownAppKit) {
                throw new Error('Failed to initialize Reown AppKit');
            }
            
            console.log('Connecting wallet...');
            // Make sure wallet is connected first
            await this.connectWallet();
            
            console.log('Starting authentication flow...');
            // Start authentication flow
            await this.reownAppKit.authenticate();
            
            // The page will be redirected to the callback URL
        } catch (error) {
            console.error('Reown login error:', error);
            this.onLoginError(error);
            throw error;
        }
    }
    
    /**
     * Handle authentication callback from Reown
     */
    async handleAuthCallback() {
        try {
            if (!this.reownAppKit) {
                await this.init();
            }
            
            // Process the authentication callback
            const result = await this.reownAppKit.handleCallback();
            
            if (result && result.token) {
                // Store token in session storage
                sessionStorage.setItem('reown_auth_token', result.token);
                
                // Get user profile
                this.userProfile = await this.getUserProfile();
                
                // Convert to form data for submission
                const formData = new FormData();
                formData.append('reown_auth_token', result.token);
                
                if (this.userProfile) {
                    formData.append('reown_user_id', this.userProfile.id);
                    formData.append('reown_user_email', this.userProfile.email || '');
                    formData.append('reown_user_name', this.userProfile.name || '');
                    formData.append('reown_wallet_address', this.userProfile.wallet_address || '');
                }
                
                // Submit form data to server
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
                    return data;
                } else {
                    throw new Error(data.error || 'Authentication failed');
                }
            } else {
                throw new Error('Invalid authentication response');
            }
        } catch (error) {
            console.error('Error handling auth callback:', error);
            this.onLoginError(error);
            throw error;
        }
    }
    
    /**
     * Get authenticated user profile
     */
    async getUserProfile() {
        try {
            if (!this.reownAppKit) {
                await this.init();
            }
            
            const token = sessionStorage.getItem('reown_auth_token');
            if (!token) {
                throw new Error('Not authenticated');
            }
            
            const profile = await this.reownAppKit.getUserProfile(token);
            this.userProfile = profile;
            return profile;
        } catch (error) {
            console.error('Error getting user profile:', error);
            return null;
        }
    }
    
    /**
     * Check if the user is authenticated
     */
    isAuthenticated() {
        return !!sessionStorage.getItem('reown_auth_token');
    }
    
    /**
     * Check if current URL is a callback URL
     */
    isCallbackUrl() {
        return window.location.search.includes('code=');
    }
    
    /**
     * Get CSRF token from cookies
     */
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

// Export for usage in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReownAppkitConnector;
}
