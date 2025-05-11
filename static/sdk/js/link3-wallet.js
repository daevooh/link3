/**
 * Link3 Wallet Integration Module
 * Version 1.0.0
 * 
 * This module provides easy integration with Web3 wallets (MetaMask, WalletConnect, etc.)
 * for the Link3 SDK.
 */

class Link3Wallet {
    /**
     * Initialize the wallet integration module
     * @param {Link3SDK} sdk - Link3SDK instance
     * @param {Object} options - Configuration options
     * @param {boolean} options.autoConnect - Try to connect to a wallet automatically (default: false)
     */
    constructor(sdk, options = {}) {
        if (!sdk) {
            throw new Error("Link3SDK instance is required");
        }
        
        this.sdk = sdk;
        this.provider = null;
        this.web3 = null;
        this.accounts = [];
        this.chainId = null;
        this.networkName = null;
        this.options = Object.assign({
            autoConnect: false
        }, options);
        
        // Auto-connect if enabled
        if (this.options.autoConnect) {
            this.connect();
        }
    }
    
    /**
     * Check if Web3 is available in the browser
     * @returns {boolean} Whether Web3 is available
     */
    isWeb3Available() {
        return (
            typeof window !== 'undefined' && 
            (
                typeof window.ethereum !== 'undefined' || 
                typeof window.web3 !== 'undefined'
            )
        );
    }
    
    /**
     * Connect to a Web3 wallet (e.g., MetaMask)
     * @returns {Promise<Object>} Connection result
     */
    async connect() {
        if (!this.isWeb3Available()) {
            throw new Error("Web3 provider not found. Please install MetaMask or another Web3 wallet.");
        }
        
        try {
            this.provider = window.ethereum || window.web3?.currentProvider;
            
            // Request accounts access
            this.accounts = await this.provider.request({ method: 'eth_requestAccounts' });
            
            // Get current chain
            this.chainId = await this.provider.request({ method: 'eth_chainId' });
            this.networkName = this._getNetworkName(this.chainId);
            
            // Set up event listeners
            this._setupEventListeners();
            
            this.sdk.log("Wallet connected:", {
                account: this.accounts[0],
                chainId: this.chainId,
                network: this.networkName
            });
            
            return {
                address: this.accounts[0],
                chainId: this.chainId,
                networkName: this.networkName
            };
        } catch (error) {
            this.sdk.log("Error connecting wallet:", error);
            throw error;
        }
    }
    
    /**
     * Check if wallet is connected
     * @returns {boolean} Whether a wallet is connected
     */
    isConnected() {
        return this.accounts.length > 0;
    }
    
    /**
     * Get the current wallet address
     * @returns {string|null} Current address or null if not connected
     */
    getAddress() {
        return this.accounts[0] || null;
    }
    
    /**
     * Get the current network info
     * @returns {Object|null} Network info or null if not connected
     */
    getNetwork() {
        if (!this.chainId) return null;
        
        return {
            chainId: this.chainId,
            name: this.networkName
        };
    }
    
    /**
     * Sign a message with the connected wallet
     * @param {string} message - Message to sign
     * @returns {Promise<string>} Signature
     */
    async signMessage(message) {
        if (!this.isConnected()) {
            throw new Error("Wallet not connected");
        }
        
        try {
            const from = this.accounts[0];
            
            // Sign the message
            const signature = await this.provider.request({
                method: 'personal_sign',
                params: [message, from]
            });
            
            this.sdk.log("Message signed:", { message, signature });
            return signature;
        } catch (error) {
            this.sdk.log("Error signing message:", error);
            throw error;
        }
    }
    
    /**
     * Switch to a specific Ethereum chain
     * @param {string} chainId - Chain ID in hex format (e.g. '0x1' for Ethereum Mainnet)
     * @returns {Promise<boolean>} Success status
     */
    async switchChain(chainId) {
        if (!this.isConnected()) {
            throw new Error("Wallet not connected");
        }
        
        try {
            await this.provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId }],
            });
            
            // Update local state
            this.chainId = chainId;
            this.networkName = this._getNetworkName(chainId);
            
            this.sdk.log("Switched to chain:", { 
                chainId, 
                networkName: this.networkName 
            });
            
            return true;
        } catch (error) {
            this.sdk.log("Error switching chain:", error);
            throw error;
        }
    }
    
    /**
     * Register a wallet with Link3 SDK and verify it
     * @param {string} networkId - Link3 network ID to associate with the wallet
     * @returns {Promise<Object>} Registered and verified wallet
     */
    async registerAndVerifyWallet(networkId) {
        if (!this.isConnected()) {
            throw new Error("Wallet not connected");
        }
        
        try {
            const address = this.accounts[0];
            
            // Step 1: Register the wallet
            const wallet = await this.sdk.addWallet(address, networkId);
            
            // Step 2: Get verification message
            const message = await this.sdk.getVerificationMessage(wallet.id);
            
            // Step 3: Sign the message
            const signature = await this.signMessage(message);
            
            // Step 4: Verify the wallet
            const verificationResult = await this.sdk.verifyWallet(wallet.id, signature);
            
            this.sdk.log("Wallet registered and verified:", verificationResult);
            
            return {
                wallet: wallet,
                verified: verificationResult.success
            };
        } catch (error) {
            this.sdk.log("Error registering or verifying wallet:", error);
            throw error;
        }
    }
    
    /**
     * Create a redemption request using the connected wallet
     * @param {number} amount - Amount of tokens to redeem
     * @param {string} walletId - ID of the registered wallet to use
     * @returns {Promise<Object>} Redemption result
     */
    async createRedemption(amount, walletId) {
        if (!this.isConnected()) {
            throw new Error("Wallet not connected");
        }
        
        if (!amount || amount <= 0) {
            throw new Error("Amount must be positive");
        }
        
        try {
            const result = await this.sdk.createRedemption({
                amount: amount,
                walletId: walletId
            });
            
            this.sdk.log("Redemption created:", result);
            return result;
        } catch (error) {
            this.sdk.log("Error creating redemption:", error);
            throw error;
        }
    }
    
    /**
     * Get network name from chain ID
     * @private
     * @param {string} chainId - Chain ID in hex format
     * @returns {string} Network name or "Unknown"
     */
    _getNetworkName(chainId) {
        const networks = {
            '0x1': 'Ethereum Mainnet',
            '0x5': 'Goerli Testnet',
            '0x89': 'Polygon',
            '0xaa36a7': 'Sepolia Testnet'
        };
        
        return networks[chainId] || "Unknown Network";
    }
    
    /**
     * Set up event listeners for the wallet provider
     * @private
     */
    _setupEventListeners() {
        if (!this.provider) return;
        
        this.provider.on('accountsChanged', (accounts) => {
            this.accounts = accounts;
            this.sdk.log("Accounts changed:", accounts[0]);
            this._fireEvent('accountsChanged', accounts);
        });
        
        this.provider.on('chainChanged', (chainId) => {
            this.chainId = chainId;
            this.networkName = this._getNetworkName(chainId);
            this.sdk.log("Chain changed:", { 
                chainId, 
                networkName: this.networkName 
            });
            this._fireEvent('chainChanged', { chainId, networkName: this.networkName });
        });
        
        this.provider.on('disconnect', (error) => {
            this.accounts = [];
            this.sdk.log("Wallet disconnected", error);
            this._fireEvent('disconnect', error);
        });
    }
    
    /**
     * Fire custom events for the wallet integration
     * @private
     * @param {string} eventName - Event name
     * @param {*} data - Event data
     */
    _fireEvent(eventName, data) {
        const event = new CustomEvent(`link3:wallet:${eventName}`, { 
            detail: data,
            bubbles: true,
            cancelable: true
        });
        window.dispatchEvent(event);
    }
    
    /**
     * Helper method to detect Sei wallet (Keplr extension)
     * @returns {boolean} Whether Sei wallet is available
     */
    static isSeiWalletAvailable() {
        return typeof window !== 'undefined' && typeof window.keplr !== 'undefined';
    }
}

// For CommonJS environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Link3Wallet;
}