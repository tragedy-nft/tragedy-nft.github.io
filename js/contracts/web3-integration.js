// Contract integration for The Mythical Cursed-Nightmare NFT
// This module handles all contract operations, delegating wallet management to wallet-manager.js

// Contract configuration
const CONTRACT_CONFIG = {
  // Network-specific contract addresses - MUST be loaded from deployment.json
  addresses: {
    // No default addresses - will throw error if not properly loaded
  },
  abi: [
    // BankedNFT ABI for minting
    'function mint() public payable returns (uint256)',
    'function mintFee() view returns (uint256)',
    'function totalSupply() view returns (uint256)',
    'function balanceOf(address owner) view returns (uint256)',
    'function ownerOf(uint256 tokenId) view returns (address)',
    'function tokenURI(uint256 tokenId) view returns (string)',
    'function maxSupply() view returns (uint256)',
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'event NFTMinted(address indexed to, uint256 indexed tokenId, address indexed creator, string metadataURI)',
    'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
  ],
};

class Web3Integration {
  constructor(walletManager = null) {
    this.walletManager = walletManager;
    this.contract = null;

    // Initialize RPC cache
    this.cache = null;
    this.cacheEnabled = true;
    this.initCache();
  }

  // Set or update wallet manager
  setWalletManager(walletManager) {
    this.walletManager = walletManager;
  }

  // Load contract addresses from deployment.json
  async loadContractAddresses() {
    try {
      const response = await fetch('/config/deployment.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch deployment.json: ${response.status} ${response.statusText}`);
      }
      
      const deployment = await response.json();
      
      if (!deployment.contracts || !deployment.contracts.BankedNFT) {
        throw new Error('BankedNFT address not found in deployment.json');
      }
      
      if (deployment.network === 'chain-21201') {
        CONTRACT_CONFIG.addresses[21201] = deployment.contracts.BankedNFT;
        console.log('Loaded BankedNFT address for chain 21201:', deployment.contracts.BankedNFT);
      } else {
        throw new Error(`Unexpected network in deployment.json: ${deployment.network}`);
      }
      
      return true;
    } catch (error) {
      console.error('CRITICAL: Contract address loading failed:', error);
      // Display user-visible error
      if (typeof window !== 'undefined' && window.alert) {
        window.alert(`CRITICAL ERROR: Failed to load contract configuration.\n\n${error.message}\n\nPlease check deployment.json and reload the page.`);
      }
      throw error; // Re-throw to prevent further execution
    }
  }

  // Initialize cache asynchronously
  async initCache() {
    try {
      if (typeof window.RPCCache !== 'undefined') {
        this.cache = new window.RPCCache();
        await this.cache.init();
        console.log('RPC cache initialized successfully');
      } else {
        console.warn('RPCCache not available, caching disabled');
        this.cacheEnabled = false;
      }
    } catch (error) {
      console.error('Failed to initialize RPC cache:', error);
      this.cacheEnabled = false;
    }
  }

  // Initialize contract for the current network
  async initContract(chainId) {
    if (!this.walletManager) {
      throw new Error('WalletManager not set');
    }

    const signer = this.walletManager.getSigner();
    if (!signer) {
      throw new Error('No signer available');
    }

    const contractAddress = CONTRACT_CONFIG.addresses[chainId];
    
    if (!contractAddress) {
      throw new Error(`No contract address configured for chain ${chainId}. Please ensure deployment.json is loaded.`);
    }
    
    // Validate address format
    if (!ethers.utils.isAddress(contractAddress)) {
      throw new Error(`Invalid contract address for chain ${chainId}: ${contractAddress}`);
    }
    
    console.log(`Initializing contract for chain ${chainId} at address ${contractAddress}`);
    
    try {
      this.contract = new ethers.Contract(
        contractAddress,
        CONTRACT_CONFIG.abi,
        signer
      );
      console.log(
        `Contract initialized successfully on chain ${chainId} at ${contractAddress}`
      );

      // Test contract connection
      try {
        const totalSupply = await this.contract.totalSupply();
        console.log(`Contract test successful - totalSupply: ${totalSupply}`);
      } catch (testError) {
        console.warn('Contract test failed (totalSupply):', testError);
      }
    } catch (initError) {
      console.error('Failed to initialize contract:', initError);
      this.contract = null;
      throw initError;
    }
  }

  // Wrapper method for cached calls
  async cachedCall(method, params, contractCall) {
    // If cache is not enabled, execute directly
    if (!this.cacheEnabled || !this.cache) {
      return await contractCall();
    }

    try {
      // Get current chain ID from wallet manager
      const chainId = await this.walletManager.getCurrentChainId();

      // Create cache key
      const cacheKey = this.cache.createCacheKey(method, params, chainId);

      // Check cache first
      const cachedValue = await this.cache.get(cacheKey);
      if (cachedValue !== null) {
        console.log(`Cache hit for ${method}`);
        return cachedValue;
      }

      // Cache miss, execute contract call
      console.log(`Cache miss for ${method}, calling contract`);
      const result = await contractCall();

      // Store in cache
      await this.cache.set(cacheKey, result, method);

      return result;
    } catch (error) {
      console.error(`Cached call error for ${method}:`, error);
      // On error, fall back to direct call
      return await contractCall();
    }
  }

  // Get contract address for current network
  getContractAddress() {
    if (this.contract) {
      return this.contract.target || this.contract.address;
    }
    return null;
  }

  // Get NFT price from contract
  async getNFTPrice() {
    if (!this.contract) {
      console.warn('getNFTPrice: Contract not initialized');
      throw new Error('Contract not initialized');
    }

    return this.cachedCall('getNFTPrice', null, async () => {
      try {
        console.log(
          'Calling mintFee() on contract:',
          this.contract.target || this.contract.address
        );
        const mintFee = await this.contract.mintFee();
        console.log('mintFee raw value:', mintFee.toString());
        const formattedFee = ethers.utils.formatEther(mintFee);
        console.log('mintFee formatted:', formattedFee);
        return formattedFee;
      } catch (error) {
        console.error('Failed to get NFT price:', error);
        console.error('Error details:', error.message);
        // Default price if contract doesn't have mintFee function
        console.log('Returning default price: 13 POL');
        return '13';
      }
    });
  }

  // Get total supply
  async getTotalSupply() {
    if (!this.contract) {
      console.warn('getTotalSupply: Contract not initialized');
      throw new Error('Contract not initialized');
    }

    return this.cachedCall('getTotalSupply', null, async () => {
      try {
        console.log(
          'Calling totalSupply() on contract:',
          this.contract.target || this.contract.address
        );
        const supply = await this.contract.totalSupply();
        console.log('totalSupply raw value:', supply);
        const supplyString = supply.toString();
        console.log('totalSupply formatted:', supplyString);
        return supplyString;
      } catch (error) {
        console.error('Failed to get total supply:', error);
        console.error('Error details:', error.message);
        throw error;
      }
    });
  }

  // Get max supply
  async getMaxSupply() {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    return this.cachedCall('getMaxSupply', null, async () => {
      try {
        const maxSupply = await this.contract.maxSupply();
        return maxSupply.toString();
      } catch (error) {
        // If maxSupply function doesn't exist, return a default
        return '10000';
      }
    });
  }

  // Get contract name
  async getContractName() {
    if (!this.contract) {
      console.warn('getContractName: Contract not initialized');
      throw new Error('Contract not initialized');
    }

    return this.cachedCall('getContractName', null, async () => {
      try {
        console.log(
          'Calling name() on contract:',
          this.contract.target || this.contract.address
        );
        const contractName = await this.contract.name();
        console.log('Contract name:', contractName);
        return contractName;
      } catch (error) {
        console.error('Failed to get contract name:', error);
        console.error('Error details:', error.message);
        return 'Unknown Collection';
      }
    });
  }

  // Get contract symbol
  async getContractSymbol() {
    if (!this.contract) {
      console.warn('getContractSymbol: Contract not initialized');
      throw new Error('Contract not initialized');
    }

    return this.cachedCall('getContractSymbol', null, async () => {
      try {
        console.log(
          'Calling symbol() on contract:',
          this.contract.target || this.contract.address
        );
        const contractSymbol = await this.contract.symbol();
        console.log('Contract symbol:', contractSymbol);
        return contractSymbol;
      } catch (error) {
        console.error('Failed to get contract symbol:', error);
        console.error('Error details:', error.message);
        return 'UNKNOWN';
      }
    });
  }

  // Mint NFT
  async mintNFT() {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    if (!this.walletManager || !this.walletManager.isWalletConnected()) {
      throw new Error('Wallet not connected');
    }

    try {
      // Get the mint fee from contract
      const mintFee = await this.contract.mintFee();

      // Call mint function with payment
      const tx = await this.contract.mint({
        value: mintFee,
      });

      // Wait for transaction confirmation
      const receipt = await tx.wait();

      // Extract token ID from NFTMinted event
      const mintEvent = receipt.logs.find((log) => {
        try {
          const parsed = this.contract.interface.parseLog(log);
          return parsed.name === 'NFTMinted';
        } catch {
          return false;
        }
      });

      let tokenId = null;
      if (mintEvent) {
        const parsed = this.contract.interface.parseLog(mintEvent);
        tokenId = parsed.args.tokenId.toString();
      }

      return {
        success: true,
        transactionHash: receipt.hash,
        tokenId: tokenId,
        blockNumber: receipt.blockNumber,
      };
    } catch (error) {
      console.error('Minting failed:', error);
      throw error;
    }
  }

  // Check if user owns any NFTs
  async checkOwnership(address = null) {
    if (!this.contract) {
      return 0;
    }

    const checkAddress = address || this.walletManager?.getAccount();
    if (!checkAddress) {
      return 0;
    }

    return this.cachedCall(
      'checkOwnership',
      { address: checkAddress },
      async () => {
        try {
          const balance = await this.contract.balanceOf(checkAddress);
          return balance.toString();
        } catch (error) {
          console.error('Failed to check ownership:', error);
          return 0;
        }
      }
    );
  }

  // Get account balance
  async getBalance(address = null) {
    if (!this.walletManager) {
      throw new Error('WalletManager not set');
    }

    const provider = this.walletManager.getProvider();
    const checkAddress = address || this.walletManager.getAccount();

    if (!provider || !checkAddress) {
      throw new Error('Wallet not connected');
    }

    return this.cachedCall(
      'getBalance',
      { address: checkAddress },
      async () => {
        const balance = await provider.getBalance(checkAddress);
        return ethers.utils.formatEther(balance);
      }
    );
  }

  // Cache management methods
  async clearCache() {
    if (this.cache) {
      await this.cache.clear();
      console.log('RPC cache cleared');
    }
  }

  async getCacheStats() {
    if (this.cache) {
      return this.cache.getStats();
    }
    return null;
  }

  async getCacheSize() {
    if (this.cache) {
      return await this.cache.getCacheSize();
    }
    return 0;
  }

  setCacheEnabled(enabled) {
    this.cacheEnabled = enabled;
    console.log(`RPC cache ${enabled ? 'enabled' : 'disabled'}`);
  }
}

// Create global instance (without wallet manager initially)
window.web3Integration = new Web3Integration();

// Load addresses when DOM is ready
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', async () => {
    // Load BankedNFT address directly from deployment.json
    await window.web3Integration.loadContractAddresses();
  });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Web3Integration;
}
