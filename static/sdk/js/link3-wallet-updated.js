/**
 * Link3 Wallet Integration Module
 * Version 1.0.1
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
     * Connect to a Web3 provider (MetaMask, etc.)
     * @returns {Promise<Object>} Connection result with address and network info
     */
    async connect() {
        if (!this.isWeb3Available()) {
            throw new Error("Web3 is not available. Please install MetaMask or another wallet.");
        }
        
        try {
            // Modern DApp browsers
            if (window.ethereum) {
                this.provider = window.ethereum;
                
                // Request account access
                this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                
                // Get chain ID
                this.chainId = await window.ethereum.request({ method: 'eth_chainId' });
                
                // Setup network name
                this.networkName = this._getNetworkName(this.chainId);
                
                this.sdk.log("Wallet connected:", {
                    address: this.accounts[0],
                    chainId: this.chainId,
                    networkName: this.networkName
                });
                
                // Setup event listeners
                this._setupEventListeners();
                
                return {
                    address: this.accounts[0],
                    chainId: this.chainId,
                    networkName: this.networkName
                };
            }
            // Legacy DApp browsers
            else if (window.web3) {
                this.provider = window.web3.currentProvider;
                this.web3 = new Web3(this.provider);
                
                // Get accounts
                this.accounts = await this.web3.eth.getAccounts();
                
                // Get network ID
                const networkId = await this.web3.eth.net.getId();
                this.chainId = `0x${networkId.toString(16)}`;
                this.networkName = this._getNetworkName(this.chainId);
                
                this.sdk.log("Legacy wallet connected:", {
                    address: this.accounts[0],
                    chainId: this.chainId,
                    networkName: this.networkName
                });
                
                return {
                    address: this.accounts[0],
                    chainId: this.chainId,
                    networkName: this.networkName
                };
            } else {
                throw new Error("No Ethereum provider found");
            }
        } catch (error) {
            this.sdk.log("Error connecting to wallet:", error);
            throw error;
        }
    }
    
    /**
     * Get accounts from the connected wallet
     * @returns {Promise<Array>} List of addresses
     */
    async getAccounts() {
        if (!this.provider) {
            await this.connect();
        }
        
        try {
            if (this.provider.request) {
                this.accounts = await this.provider.request({ method: 'eth_accounts' });
            } else if (this.web3) {
                this.accounts = await this.web3.eth.getAccounts();
            }
            
            return this.accounts;
        } catch (error) {
            this.sdk.log("Error getting accounts:", error);
            throw error;
        }
    }
    
    /**
     * Sign a message with the connected wallet
     * @param {string} message - Message to sign
     * @param {string} address - Address to sign with (defaults to first connected address)
     * @returns {Promise<string>} Signature
     */
    async signMessage(message, address = null) {
        if (!this.provider) {
            await this.connect();
        }
        
        if (!address) {
            if (!this.accounts || this.accounts.length === 0) {
                await this.getAccounts();
            }
            address = this.accounts[0];
        }
        
        try {
            let signature;
            
            if (this.provider.request) {
                signature = await this.provider.request({
                    method: 'personal_sign',
                    params: [message, address]
                });
            } else if (this.web3) {
                signature = await this.web3.eth.personal.sign(message, address, '');
            } else {
                throw new Error("No provider available for signing");
            }
            
            return signature;
        } catch (error) {
            this.sdk.log("Error signing message:", error);
            throw error;
        }
    }
    
    /**
     * Register and verify a wallet in one step
     * @param {string} networkId - Network ID to register the wallet on
     * @returns {Promise<Object>} Result with wallet and verification status
     */
    async registerAndVerifyWallet(networkId) {
        if (!this.provider) {
            await this.connect();
        }
        
        try {
            // Make sure we have accounts
            if (!this.accounts || this.accounts.length === 0) {
                await this.getAccounts();
            }
            
            const address = this.accounts[0];
            
            // 1. Register the wallet with the backend
            this.sdk.log("Registering wallet:", address);
            const wallet = await this.sdk.addWallet(address, networkId);
            
            // 2. Get verification message
            const message = await this.sdk.getVerificationMessage(wallet.id);
            
            // 3. Sign the message
            this.sdk.log("Signing verification message...");
            const signature = await this.signMessage(message, address);
            
            // 4. Verify the wallet with the signature
            this.sdk.log("Verifying wallet signature...");
            const result = await this.sdk.verifyWallet(wallet.id, signature);
            
            return {
                wallet: result.wallet,
                verified: result.wallet.is_verified
            };
        } catch (error) {
            this.sdk.log("Error in registerAndVerifyWallet:", error);
            throw error;
        }
    }
    
    /**
     * Create a redemption to convert off-chain tokens to on-chain tokens
     * @param {number} amount - Amount to redeem
     * @param {string} walletId - Wallet ID to redeem to
     * @returns {Promise<Object>} Redemption result
     */
    async createRedemption(amount, walletId) {
        try {
            return await this.sdk.createRedemption({
                amount: amount,
                walletId: walletId
            });
        } catch (error) {
            this.sdk.log("Error creating redemption:", error);
            throw error;
        }
    }
    
    /**
     * Get the network name from chain ID
     * @private
     * @param {string} chainIdHex - Chain ID in hex format
     * @returns {string} Network name
     */
    _getNetworkName(chainIdHex) {
        const chainId = parseInt(chainIdHex, 16);
        
        switch (chainId) {
            case 1:
                return 'Ethereum Mainnet';
            case 5:
                return 'Goerli Testnet';
            case 11155111:
                return 'Sepolia Testnet';
            case 137:
                return 'Polygon Mainnet';
            case 80001:
                return 'Mumbai Testnet';
            case 42161:
                return 'Arbitrum One';
            case 421613:
                return 'Arbitrum Goerli';
            case 56:
                return 'BSC Mainnet';
            case 97:
                return 'BSC Testnet';
            case 43114:
                return 'Avalanche C-Chain';
            case 43113:
                return 'Avalanche Fuji Testnet';
            case 10:
                return 'Optimism Mainnet';
            case 420:
                return 'Optimism Goerli';
            case 8217:
                return 'Klaytn Mainnet';
            case 1001:
                return 'Klaytn Testnet';
            case 2020:
                return 'Ronin Mainnet';
            case 2021:
                return 'Ronin Testnet';
            default:
                return `Network ${chainId}`;
        }
    }
    
    /**
     * Setup event listeners for wallet events
     * @private
     */
    _setupEventListeners() {
        if (!this.provider || !this.provider.on) {
            return;
        }
        
        // Listen for account changes
        this.provider.on('accountsChanged', (accounts) => {
            this.sdk.log("Accounts changed:", accounts);
            this.accounts = accounts;
            
            // Emit event that can be captured by the application
            const event = new CustomEvent('link3WalletAccountsChanged', { detail: accounts });
            window.dispatchEvent(event);
        });
        
        // Listen for chain changes
        this.provider.on('chainChanged', (chainId) => {
            this.sdk.log("Chain changed:", chainId);
            this.chainId = chainId;
            this.networkName = this._getNetworkName(chainId);
            
            // Emit event
            const event = new CustomEvent('link3WalletChainChanged', { 
                detail: {
                    chainId: chainId,
                    networkName: this.networkName
                } 
            });
            window.dispatchEvent(event);
        });
        
        // Listen for disconnect
        this.provider.on('disconnect', (error) => {
            this.sdk.log("Wallet disconnected:", error);
            
            // Emit event
            const event = new CustomEvent('link3WalletDisconnected', { detail: error });
            window.dispatchEvent(event);
        });
    }
}

// For CommonJS environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Link3Wallet;
}
