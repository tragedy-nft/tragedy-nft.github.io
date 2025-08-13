// Centralized contract configuration for all networks
// This file loads contract addresses from deployment.json

let blockchainConfig = null;

// Load blockchain configuration
async function loadBlockchainConfigForContracts() {
  try {
    const response = await fetch('/config/blockchain.json');
    if (response.ok) {
      blockchainConfig = await response.json();
      console.log(
        'Blockchain config loaded in contracts-config:',
        blockchainConfig
      );

      // Update CONTRACTS_CONFIG with blockchain config values
      if (blockchainConfig.networks.polygon) {
        CONTRACTS_CONFIG.networks[137].name =
          blockchainConfig.networks.polygon.name;
        CONTRACTS_CONFIG.networks[137].rpcUrl =
          blockchainConfig.networks.polygon.rpcUrl;
      }
      if (blockchainConfig.networks.bonsoleil) {
        CONTRACTS_CONFIG.networks[21201].name =
          blockchainConfig.networks.bonsoleil.name;
        CONTRACTS_CONFIG.networks[21201].rpcUrl =
          blockchainConfig.networks.bonsoleil.rpcUrl;
      }
      return true;
    }
  } catch (error) {
    console.error('Failed to load blockchain.json in contracts-config:', error);
  }
  return false;
}

const CONTRACTS_CONFIG = {
  // Network configurations
  networks: {
    // Bon-Soleil Testnet (Development)
    21201: {
      name: 'Bon-Soleil Testnet',
      chainIdHex: '0x52d1',
      rpcUrl: 'https://dev2.bon-soleil.com/rpc',
      blockExplorer: 'https://dev2.bon-soleil.com/explorer',
      contracts: {}, // Will be populated from deployment.json
    },
    // Polygon Mainnet (Production)
    137: {
      name: 'Polygon Mainnet',
      chainIdHex: '0x89',
      rpcUrl: 'https://polygon-rpc.com',
      blockExplorer: 'https://polygonscan.com',
      contracts: {
        bankedNFT: '0x0000000000000000000000000000000000000000', // TODO: Deploy and update
        metadataBank: '0x0000000000000000000000000000000000000000', // TODO: Deploy and update
        composer: '0x0000000000000000000000000000000000000000', // TODO: Deploy and update
        LegendaryBank: '0x0000000000000000000000000000000000000000', // TODO: Deploy and update
      },
    },
  },

  // Default network for the application
  defaultNetworkId: 21201, // Bon-Soleil Testnet for testing

  // Helper function to get contract address by network
  getContract: function (networkId, contractName) {
    const network = this.networks[networkId];
    if (!network || !network.contracts[contractName]) {
      console.error(
        `Contract ${contractName} not found for network ${networkId}`
      );
      return null;
    }
    return network.contracts[contractName];
  },

  // Helper function to get network configuration
  getNetwork: function (networkId) {
    return this.networks[networkId] || null;
  },

  // Helper function to check if address is valid (not zero address)
  isValidAddress: function (address) {
    return address && address !== '0x0000000000000000000000000000000000000000';
  },

  // Load deployment data from deployment.json
  loadDeployment: async function () {
    try {
      const response = await fetch('/config/deployment.json');
      if (!response.ok) {
        throw new Error(`Failed to load deployment.json: ${response.status}`);
      }
      const deployment = await response.json();

      // Map deployment.json contract names to contracts-config names
      const contractMapping = {
        BankedNFT: 'bankedNFT',
        MetadataBank: 'metadataBank',
        TragedyComposer: 'composer',
        MonsterBank: 'monsterBank',
        ItemBank: 'itemBank',
        BackgroundBank: 'backgroundBank',
        EffectBank: 'effectBank',
        TragedyMetadata: 'tragedyMetadata',
        LegendaryBank: 'LegendaryBank',
        MonsterBank1: 'monsterBank1',
        MonsterBank2: 'monsterBank2',
        ItemBank1: 'itemBank1',
        ItemBank2: 'itemBank2',
      };

      // Update network contracts based on deployment
      if (deployment.network === 'chain-21201') {
        // Update Bon-Soleil testnet contracts
        for (const [deploymentName, configName] of Object.entries(
          contractMapping
        )) {
          if (deployment.contracts[deploymentName]) {
            this.networks[21201].contracts[configName] =
              deployment.contracts[deploymentName];
          }
        }
      }

      console.log(
        'Contracts loaded from deployment.json:',
        this.networks[21201].contracts
      );
      return true;
    } catch (error) {
      console.error('Failed to load deployment.json:', error);
      return false;
    }
  },
};

// Make CONTRACTS_CONFIG globally available
if (typeof window !== 'undefined') {
  window.CONTRACTS_CONFIG = CONTRACTS_CONFIG;
}

// Auto-load deployment data when script loads
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', async () => {
    await loadBlockchainConfigForContracts();
    CONTRACTS_CONFIG.loadDeployment();
  });
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONTRACTS_CONFIG;
}
