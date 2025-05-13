/**
 * Mock Reown AppKit SDK for Development
 * 
 * This is a mock implementation of the Reown AppKit SDK for development purposes.
 * It simulates the behavior of the Reown AppKit without requiring the actual SDK.
 */

(function(global) {
    console.log('Mock Reown AppKit loaded');

    class MockReownAppKit {
        constructor(config) {
            console.log('Mock Reown AppKit initialized with config:', config);
            this.clientId = config.clientId;
            this.redirectUrl = config.redirectUrl;
            this.connected = false;
            this.mockUserId = 'mock-reown-user-123';
            this.mockWalletAddress = '0x8723aF12233dFFff912121012aabc56E789eee';
        }

        async connectWallet() {
            console.log('Mock: Connecting wallet...');
            // Simulate delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.connected = true;
            return {
                address: this.mockWalletAddress,
                chainId: '1',
                status: 'connected'
            };
        }

        async authenticate() {
            console.log('Mock: Authenticating...');
            if (!this.connected) {
                throw new Error('Wallet not connected');
            }
            
            // Instead of redirecting, we'll simulate the callback by adding query params to the URL
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('code', 'mock-auth-code-123');
            
            // Change URL without reloading the page
            window.history.pushState({}, '', currentUrl);
            
            return true;
        }

        async handleCallback() {
            console.log('Mock: Handling callback...');
            // Simulate delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            return {
                token: 'mock-auth-token-' + Math.random().toString(36).substring(2, 15),
                userId: this.mockUserId
            };
        }

        async getUserProfile() {
            console.log('Mock: Getting user profile...');
            // Simulate delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            return {
                id: this.mockUserId,
                name: 'Mock User',
                email: 'mockuser@example.com',
                wallet_address: this.mockWalletAddress
            };
        }
    }

    // Add to global scope
    global.ReownAppKit = MockReownAppKit;
    console.log('Mock Reown AppKit registered as global.ReownAppKit');

})(window);
