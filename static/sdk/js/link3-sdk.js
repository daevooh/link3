/**
 * Link3 JavaScript SDK
 * Version 1.0.0
 * 
 * This SDK allows developers to integrate with Link3's tokenization and blockchain features
 * including token earning, redemption, and wallet management.
 */

class Link3SDK {
    /**
     * Initialize the Link3 SDK
     * @param {Object} config - Configuration options
     * @param {string} config.apiKey - Your project API key
     * @param {string} config.apiUrl - API endpoint URL (optional, defaults to production)
     * @param {boolean} config.debug - Enable debug logging (optional)
     */
    constructor(config) {
        if (!config || !config.apiKey) {
            throw new Error("API key is required to initialize the Link3 SDK");
        }

        this.apiKey = config.apiKey;
        this.apiUrl = config.apiUrl || "https://api.link3.dev/v1";
        this.debug = config.debug || false;
        this.user = null;
        
        this.log("Link3 SDK initialized");
    }

    /**
     * Set the current user for personalized operations
     * @param {string} userId - External user ID
     * @param {Object} metadata - Optional user metadata
     * @returns {Promise<Object>} User object
     */
    async setUser(userId, metadata = {}) {
        if (!userId) {
            throw new Error("User ID is required");
        }

        try {
            const response = await this._apiCall('/users/identify', {
                external_id: userId,
                metadata: metadata
            });

            this.user = response.user;
            this.log("User set:", this.user);
            return this.user;
        } catch (error) {
            this.log("Error setting user:", error);
            throw error;
        }
    }

    /**
     * Get the current user's token balance
     * @returns {Promise<number>} Token balance
     */
    async getBalance() {
        this._requireUser();

        try {
            const response = await this._apiCall('/users/balance');
            this.log("User balance:", response.balance);
            return response.balance;
        } catch (error) {
            this.log("Error getting balance:", error);
            throw error;
        }
    }

    /**
     * Record a user interaction to earn tokens
     * @param {string} actionType - The type of action (e.g., 'page_view', 'comment', 'like')
     * @param {Object} metadata - Additional data about the interaction
     * @returns {Promise<Object>} Result including tokens earned
     */
    async recordInteraction(actionType, metadata = {}) {
        this._requireUser();

        if (!actionType) {
            throw new Error("Action type is required");
        }

        try {
            const response = await this._apiCall('/tokenization/interact', {
                action_type: actionType,
                metadata: metadata
            });
            
            this.log(`Interaction recorded: ${actionType}`, response);
            return response;
        } catch (error) {
            this.log("Error recording interaction:", error);
            throw error;
        }
    }

    /**
     * Get the user's wallets
     * @returns {Promise<Array>} List of user wallets
     */
    async getWallets() {
        this._requireUser();

        try {
            const response = await this._apiCall('/blockchain/wallets');
            this.log("User wallets:", response.wallets);
            return response.wallets;
        } catch (error) {
            this.log("Error getting wallets:", error);
            throw error;
        }
    }

    /**
     * Add a new wallet for the user
     * @param {string} address - Wallet address
     * @param {string} networkId - Blockchain network ID
     * @returns {Promise<Object>} Created wallet
     */
    async addWallet(address, networkId) {
        this._requireUser();

        if (!address || !networkId) {
            throw new Error("Wallet address and network ID are required");
        }

        try {
            const response = await this._apiCall('/blockchain/wallets/add', {
                address: address,
                network_id: networkId
            });
            
            this.log("Wallet added:", response.wallet);
            return response.wallet;
        } catch (error) {
            this.log("Error adding wallet:", error);
            throw error;
        }
    }

    /**
     * Verify wallet ownership with a signature
     * @param {string} walletId - ID of the wallet to verify
     * @param {string} signature - Signature proving ownership
     * @returns {Promise<Object>} Verification result
     */
    async verifyWallet(walletId, signature) {
        this._requireUser();

        if (!walletId || !signature) {
            throw new Error("Wallet ID and signature are required");
        }

        try {
            const response = await this._apiCall('/blockchain/wallets/verify', {
                wallet_id: walletId,
                signature: signature
            });
            
            this.log("Wallet verified:", response);
            return response;
        } catch (error) {
            this.log("Error verifying wallet:", error);
            throw error;
        }
    }

    /**
     * Get message to sign for wallet verification
     * @param {string} walletId - ID of the wallet to verify
     * @returns {Promise<string>} Message to sign
     */
    async getVerificationMessage(walletId) {
        this._requireUser();

        try {
            const response = await this._apiCall('/blockchain/wallets/verification-message', {
                wallet_id: walletId
            });
            
            this.log("Verification message:", response.message);
            return response.message;
        } catch (error) {
            this.log("Error getting verification message:", error);
            throw error;
        }
    }

    /**
     * Get the user's redemption history
     * @param {Object} options - Filter options
     * @param {number} options.page - Page number (optional)
     * @param {number} options.pageSize - Page size (optional)
     * @param {string} options.status - Filter by status (optional)
     * @returns {Promise<Object>} Paginated redemption history
     */
    async getRedemptions(options = {}) {
        this._requireUser();

        try {
            const response = await this._apiCall('/blockchain/redemptions', options);
            this.log("User redemptions:", response);
            return response;
        } catch (error) {
            this.log("Error getting redemptions:", error);
            throw error;
        }
    }

    /**
     * Create a new token redemption request
     * @param {Object} redemptionData - Redemption details
     * @param {number} redemptionData.amount - Amount to redeem
     * @param {string} redemptionData.walletId - Wallet ID to receive tokens
     * @returns {Promise<Object>} Created redemption request
     */
    async createRedemption(redemptionData) {
        this._requireUser();

        if (!redemptionData.amount || !redemptionData.walletId) {
            throw new Error("Amount and wallet ID are required for redemption");
        }

        try {
            const response = await this._apiCall('/blockchain/redemptions/create', redemptionData);
            this.log("Redemption created:", response);
            return response;
        } catch (error) {
            this.log("Error creating redemption:", error);
            throw error;
        }
    }

    /**
     * Get details of a specific redemption
     * @param {string} redemptionId - ID of the redemption
     * @returns {Promise<Object>} Redemption details
     */
    async getRedemptionDetails(redemptionId) {
        this._requireUser();

        if (!redemptionId) {
            throw new Error("Redemption ID is required");
        }

        try {
            const response = await this._apiCall(`/blockchain/redemptions/${redemptionId}`);
            this.log("Redemption details:", response);
            return response;
        } catch (error) {
            this.log("Error getting redemption details:", error);
            throw error;
        }
    }

    /**
     * Get the project's token information
     * @returns {Promise<Object>} Token information
     */
    async getTokenInfo() {
        try {
            const response = await this._apiCall('/tokenization/token-info');
            this.log("Token info:", response);
            return response;
        } catch (error) {
            this.log("Error getting token info:", error);
            throw error;
        }
    }

    /**
     * Make a call to the Link3 API
     * @private
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Request data
     * @returns {Promise<Object>} API response
     */
    async _apiCall(endpoint, data = null) {
        const url = `${this.apiUrl}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            'X-API-Key': this.apiKey,
        };

        // Add user token if available
        if (this.user && this.user.token) {
            headers['Authorization'] = `Bearer ${this.user.token}`;
        }

        const options = {
            method: data ? 'POST' : 'GET',
            headers: headers
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        this.log(`API ${options.method} request to ${endpoint}`);
        
        const response = await fetch(url, options);
        const responseData = await response.json();
        
        if (!response.ok) {
            const error = new Error(responseData.message || 'API request failed');
            error.status = response.status;
            error.details = responseData;
            throw error;
        }
        
        return responseData;
    }

    /**
     * Log debug messages if debug is enabled
     * @private
     */
    log(...args) {
        if (this.debug) {
            console.log('[Link3 SDK]', ...args);
        }
    }

    /**
     * Check if user is set for operations that require a user
     * @private
     */
    _requireUser() {
        if (!this.user) {
            throw new Error("User must be set before performing this operation");
        }
    }
}

// For CommonJS environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Link3SDK;
}