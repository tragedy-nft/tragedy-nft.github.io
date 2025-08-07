// Centralized contract configuration for all networks
// This file should be the single source of truth for all contract addresses

const CONTRACTS_CONFIG = {
    // Network configurations
    networks: {
        // Bon-Soleil Testnet (Development)
        21201: {
            name: 'Bon-Soleil Testnet',
            chainIdHex: '0x52d1',
            rpcUrl: 'https://dev2.bon-soleil.com/rpc',
            blockExplorer: 'https://dev2.bon-soleil.com/explorer',
            contracts: {
                bankedNFT: '0xD8543363D99314fdE362014CF89CF6b5417d2B68',
                metadataBank: '0x565B793c191FE9C0D9980eCDB05A1471aBA198b4',
                legendaryBank: '0xf6691E452fc377c3ea4975696bD20E3CCe4d686a'
            }
        },
        // Base Mainnet (Production)
        8453: {
            name: 'Base',
            chainIdHex: '0x2105',
            rpcUrl: 'https://mainnet.base.org',
            blockExplorer: 'https://basescan.org',
            contracts: {
                bankedNFT: '0x0000000000000000000000000000000000000000', // TODO: Deploy and update
                metadataBank: '0x0000000000000000000000000000000000000000', // TODO: Deploy and update
                legendaryBank: '0x0000000000000000000000000000000000000000' // TODO: Deploy and update
            }
        },
        // Base Sepolia (Testing)
        84532: {
            name: 'Base Sepolia',
            chainIdHex: '0x14a34',
            rpcUrl: 'https://sepolia.base.org',
            blockExplorer: 'https://sepolia.basescan.org',
            contracts: {
                bankedNFT: '0x0000000000000000000000000000000000000000', // TODO: Deploy and update
                metadataBank: '0x0000000000000000000000000000000000000000', // TODO: Deploy and update
                legendaryBank: '0x0000000000000000000000000000000000000000' // TODO: Deploy and update
            }
        }
    },
    
    // Default network for the application
    defaultNetworkId: 21201,
    
    // Helper function to get contract address by network
    getContract: function(networkId, contractName) {
        const network = this.networks[networkId];
        if (!network || !network.contracts[contractName]) {
            console.error(`Contract ${contractName} not found for network ${networkId}`);
            return null;
        }
        return network.contracts[contractName];
    },
    
    // Helper function to get network configuration
    getNetwork: function(networkId) {
        return this.networks[networkId] || null;
    },
    
    // Helper function to check if address is valid (not zero address)
    isValidAddress: function(address) {
        return address && address !== '0x0000000000000000000000000000000000000000';
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONTRACTS_CONFIG;
}