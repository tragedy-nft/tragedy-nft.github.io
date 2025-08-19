/**
 * WalletManager - Unified wallet connection management for Myth of Tragedy
 *
 * Features:
 * - Multi-network support (Polygon, Bon-Soleil, etc.)
 * - Automatic network detection and switching
 * - Event handling for account/chain changes
 * - Mobile wallet detection
 * - Standardized error handling
 */

class WalletManager {
  constructor(config = {}) {
    // Configuration
    this.blockchainConfig = null;
    this.networks = {};
    this.defaultNetwork = config.defaultNetwork || 'polygon';

    // State
    this.provider = null;
    this.signer = null;
    this.currentAccount = null;
    this.currentChainId = null;
    this.isConnected = false;

    // Event callbacks
    this.onConnect = config.onConnect || null;
    this.onDisconnect = config.onDisconnect || null;
    this.onAccountChange = config.onAccountChange || null;
    this.onNetworkChange = config.onNetworkChange || null;
    this.onError = config.onError || null;

    // Mobile detection
    this.isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    this.isMetaMaskBrowser =
      typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;

    // Event listeners setup flag
    this.eventListenersSetup = false;
  }

  /**
   * Initialize the wallet manager
   * @returns {Promise<boolean>} Success status
   */
  async init() {
    try {
      // Load blockchain configuration
      await this.loadBlockchainConfig();

      // Check if MetaMask is installed
      if (!this.isMetaMaskInstalled()) {
        console.warn('MetaMask not installed');
        return false;
      }

      // Create provider based on ethers version
      if (ethers.providers && ethers.providers.Web3Provider) {
        // ethers v5
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
      } else if (ethers.BrowserProvider) {
        // ethers v6
        this.provider = new ethers.BrowserProvider(window.ethereum);
      } else {
        console.warn('Could not initialize provider in constructor');
      }

      // Setup event listeners
      this.setupEventListeners();

      // Check if already connected (moved to async initialize method)
      this.checkInitialConnection();

      return true;
    } catch (error) {
      console.error('WalletManager initialization failed:', error);
      this.handleError(error);
      return false;
    }
  }

  /**
   * Load blockchain configuration from blockchain.json
   */
  async loadBlockchainConfig() {
    try {
      const response = await fetch('/config/blockchain.json');
      if (response.ok) {
        this.blockchainConfig = await response.json();
        this.networks = this.blockchainConfig.networks;
        console.log(
          'Blockchain config loaded in WalletManager:',
          this.blockchainConfig
        );
      }
    } catch (error) {
      console.error('Failed to load blockchain.json:', error);
      throw new Error('Failed to load blockchain.json. Configuration file is required.');
    }
  }

  /**
   * Check if MetaMask is installed
   * @returns {boolean}
   */
  isMetaMaskInstalled() {
    return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
  }

  /**
   * Check initial connection status
   */
  async checkInitialConnection() {
    if (!this.provider) {
      return;
    }

    try {
      const accounts = await this.provider.listAccounts();
      if (accounts.length > 0) {
        this.currentAccount = accounts[0];
        // Handle getSigner based on ethers version
        if (
          this.provider.getSigner &&
          typeof this.provider.getSigner === 'function'
        ) {
          try {
            this.signer = this.provider.getSigner();
          } catch (e) {
            this.signer = await this.provider.getSigner();
          }
        }
        this.isConnected = true;

        // Get current chain ID
        let network;
        try {
          network = await this.provider.getNetwork();
          console.log('Current network:', network);
        } catch (e) {
          console.error('Failed to get network:', e);
          if (this.provider.network) {
            network = this.provider.network;
          }
        }

        if (network) {
          // Handle chainId based on ethers version
          if (typeof network.chainId === 'bigint') {
            this.currentChainId = Number(network.chainId);
          } else {
            this.currentChainId = network.chainId;
          }
          
          // Log network details
          const networkConfig = this.blockchainConfig?.networks ? 
            Object.entries(this.blockchainConfig.networks).find(
              ([key, net]) => net.chainId === this.currentChainId
            ) : null;
          
          console.log('Connected to network:', {
            chainId: this.currentChainId,
            networkName: networkConfig ? networkConfig[1].name : 'Unknown',
            networkKey: networkConfig ? networkConfig[0] : null,
            account: this.currentAccount
          });
        }

        // Notify connection
        if (this.onConnect) {
          this.onConnect(this.currentAccount, this.currentChainId);
        }
      }
    } catch (error) {
      console.warn('Failed to check initial connection:', error);
    }
  }

  /**
   * Setup event listeners for MetaMask events
   */
  setupEventListeners() {
    if (this.eventListenersSetup || !window.ethereum) {
      return;
    }

    // Account change event
    window.ethereum.on('accountsChanged', async (accounts) => {
      if (accounts.length > 0) {
        const newAccount = accounts[0];
        const accountChanged = newAccount !== this.currentAccount;
        this.currentAccount = newAccount;
        // Handle getSigner based on ethers version
        if (
          this.provider.getSigner &&
          typeof this.provider.getSigner === 'function'
        ) {
          try {
            this.signer = this.provider.getSigner();
          } catch (e) {
            this.signer = await this.provider.getSigner();
          }
        }
        this.isConnected = true;

        if (accountChanged && this.onAccountChange) {
          this.onAccountChange(newAccount);
        }
      } else {
        // Disconnected
        this.currentAccount = null;
        this.signer = null;
        this.isConnected = false;

        if (this.onDisconnect) {
          this.onDisconnect();
        }
      }
    });

    // Chain change event
    window.ethereum.on('chainChanged', (chainIdHex) => {
      const chainId = parseInt(chainIdHex, 16);
      const chainChanged = chainId !== this.currentChainId;
      this.currentChainId = chainId;

      if (chainChanged && this.onNetworkChange) {
        this.onNetworkChange(chainId);
      }
    });

    this.eventListenersSetup = true;
  }

  /**
   * Connect wallet
   * @param {string} targetNetwork - Target network to connect to
   * @returns {Promise<string>} Connected account address
   */
  async connect(targetNetwork = null) {
    try {
      if (!this.isMetaMaskInstalled()) {
        if (this.isMobile && !this.isMetaMaskBrowser) {
          // Redirect to MetaMask mobile app
          const currentUrl = window.location.href;
          window.location.href = `https://metamask.app.link/dapp/${currentUrl.replace(/^https?:\/\//, '')}`;
          return null;
        } else {
          throw new Error('Please install MetaMask to connect your wallet');
        }
      }

      // Initialize provider if not already done
      if (!this.provider) {
        // Check ethers version and use appropriate provider
        if (ethers.providers && ethers.providers.Web3Provider) {
          // ethers v5
          this.provider = new ethers.providers.Web3Provider(window.ethereum);
        } else if (ethers.BrowserProvider) {
          // ethers v6
          this.provider = new ethers.BrowserProvider(window.ethereum);
        } else {
          throw new Error('Unsupported ethers.js version');
        }
        // Setup event listeners after provider is initialized
        this.setupEventListeners();
      }

      // Request accounts
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      this.currentAccount = accounts[0];
      // Handle getSigner based on ethers version
      if (
        this.provider.getSigner &&
        typeof this.provider.getSigner === 'function'
      ) {
        try {
          // Try v5 style first (synchronous)
          this.signer = this.provider.getSigner();
        } catch (e) {
          // If it fails, try v6 style (async)
          this.signer = await this.provider.getSigner();
        }
      }
      this.isConnected = true;

      // Get current chain ID
      let network;
      try {
        network = await this.provider.getNetwork();
      } catch (e) {
        // Fallback for different ethers versions
        if (this.provider.network) {
          network = this.provider.network;
        } else {
          throw e;
        }
      }

      // Handle chainId based on ethers version
      if (typeof network.chainId === 'bigint') {
        // ethers v6 returns bigint
        this.currentChainId = Number(network.chainId);
      } else {
        // ethers v5 returns number
        this.currentChainId = network.chainId;
      }

      // Switch network if needed
      if (targetNetwork) {
        await this.switchNetwork(targetNetwork);
      }

      // Notify connection
      if (this.onConnect) {
        this.onConnect(this.currentAccount, this.currentChainId);
      }

      return this.currentAccount;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Disconnect wallet (clear local state)
   */
  disconnect() {
    this.currentAccount = null;
    this.signer = null;
    this.isConnected = false;

    if (this.onDisconnect) {
      this.onDisconnect();
    }
  }

  /**
   * Switch to a different network
   * @param {string} networkKey - Network key from blockchain config
   * @returns {Promise<boolean>} Success status
   */
  async switchNetwork(networkKey) {
    try {
      const network = this.networks[networkKey];
      if (!network) {
        throw new Error(`Unknown network: ${networkKey}`);
      }

      const chainIdHex = '0x' + network.chainId.toString(16);

      try {
        // Try to switch to the network
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainIdHex }],
        });
        return true;
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          return await this.addNetwork(networkKey);
        }
        throw switchError;
      }
    } catch (error) {
      console.error('Failed to switch network:', error);
      this.handleError(error);
      return false;
    }
  }

  /**
   * Add a new network to MetaMask
   * @param {string} networkKey - Network key from blockchain config
   * @returns {Promise<boolean>} Success status
   */
  async addNetwork(networkKey) {
    try {
      const network = this.networks[networkKey];
      if (!network) {
        throw new Error(`Unknown network: ${networkKey}`);
      }

      const chainIdHex = '0x' + network.chainId.toString(16);

      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: chainIdHex,
            chainName: network.name,
            nativeCurrency: {
              name: network.symbol,
              symbol: network.symbol,
              decimals: 18,
            },
            rpcUrls: [network.rpcUrl],
            blockExplorerUrls: network.blockExplorer
              ? [network.blockExplorer]
              : [],
          },
        ],
      });

      return true;
    } catch (error) {
      console.error('Failed to add network:', error);
      this.handleError(error);
      return false;
    }
  }

  /**
   * Get current network info
   * @returns {Object} Network info
   */
  getCurrentNetwork() {
    if (!this.currentChainId) {
      return null;
    }

    // Find network by chain ID
    for (const [key, network] of Object.entries(this.networks)) {
      if (network.chainId === this.currentChainId) {
        return { key, ...network };
      }
    }

    return {
      key: 'unknown',
      name: `Unknown Network (${this.currentChainId})`,
      chainId: this.currentChainId,
    };
  }

  /**
   * Check if connected to the correct network
   * @param {string} networkKey - Expected network key
   * @returns {boolean}
   */
  isCorrectNetwork(networkKey) {
    const network = this.networks[networkKey];
    return network && network.chainId === this.currentChainId;
  }

  /**
   * Handle errors in a standardized way
   * @param {Error} error - Error object
   */
  handleError(error) {
    let message = 'An unknown error occurred';

    if (error.code === 4001) {
      message = 'Transaction rejected by user';
    } else if (error.code === 4902) {
      message = 'Please add the requested network to MetaMask';
    } else if (error.code === -32002) {
      message = 'Please check MetaMask for pending requests';
    } else if (error.message) {
      message = error.message;
    }

    if (this.onError) {
      this.onError(error, message);
    }
  }

  /**
   * Get provider instance
   * @returns {ethers.providers.Web3Provider}
   */
  getProvider() {
    return this.provider;
  }

  /**
   * Get signer instance
   * @returns {ethers.Signer}
   */
  getSigner() {
    return this.signer;
  }

  /**
   * Get current account address
   * @returns {string}
   */
  getAccount() {
    return this.currentAccount;
  }

  /**
   * Check if wallet is connected
   * @returns {boolean}
   */
  isWalletConnected() {
    return this.isConnected && this.currentAccount !== null;
  }

  /**
   * Get current chain ID
   * @returns {Promise<number>} Current chain ID
   */
  async getCurrentChainId() {
    if (this.currentChainId) {
      return this.currentChainId;
    }

    if (window.ethereum) {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      return parseInt(chainId, 16);
    }

    throw new Error('No ethereum provider available');
  }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WalletManager;
}
