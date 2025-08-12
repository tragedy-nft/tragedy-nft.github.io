// Centralized contract configuration for all networks
// This file should be the single source of truth for all contract addresses

const CONTRACTS_CONFIG = {
  // Network configurations
  networks: {
    // Bon-Soleil Testnet (Development)
    21201: {
      name: "Bon-Soleil Testnet",
      chainIdHex: "0x52d1",
      rpcUrl: "https://dev2.bon-soleil.com/rpc",
      blockExplorer: "https://dev2.bon-soleil.com/explorer",
      contracts: {
        bankedNFT: "0x7569AcDd1397D73c881340df4faB2917F946E914",
        metadataBank: "0x1658C5Bd050C351E0DBf154913FFA4c9b666447f",
        legendaryBank: "0xb552A7b29BF637667C0f2313D9617d448dd3aB8d",
        composer: "0xfAB3DdC97d66a09A590f054004A3981EA2D7A8E4",
      },
    },
    // Polygon Mainnet (Production)
    137: {
      name: "Polygon",
      chainIdHex: "0x89",
      rpcUrl: "https://polygon-rpc.com",
      blockExplorer: "https://polygonscan.com",
      contracts: {
        bankedNFT: "0x0000000000000000000000000000000000000000", // TODO: Deploy and update
        metadataBank: "0x0000000000000000000000000000000000000000", // TODO: Deploy and update
        legendaryBank: "0x0000000000000000000000000000000000000000", // TODO: Deploy and update
        composer: "0x0000000000000000000000000000000000000000", // TODO: Deploy and update
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
    return address && address !== "0x0000000000000000000000000000000000000000";
  },
};

// Export for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = CONTRACTS_CONFIG;
}
