/**
 * ContractManager - Unified contract management for Myth of Tragedy
 *
 * Features:
 * - Centralized contract initialization and management
 * - Network-aware contract loading
 * - ABI management
 * - Integration with deployment.json and setting.json
 * - Cached contract calls support
 */

class ContractManager {
  constructor() {
    this.contracts = {};
    this.provider = null;
    this.signer = null;
    this.networkId = null;
    this.abis = {};
    this.deployment = null;
    this.settings = null;
    this.contractsConfig = null;
  }

  /**
   * Initialize the contract manager
   * @param {ethers.Provider} provider - Ethers provider
   * @param {string} configFile - Which config file to use ('deployment', 'campaign', 'settings')
   * @param {ethers.Signer} signer - Ethers signer (optional)
   * @returns {Promise<void>}
   */
  async initialize(provider, configFile = 'deployment', signer = null) {
    this.provider = provider;
    this.signer = signer;
    
    // Get network ID from provider
    const network = await this.provider.getNetwork();
    this.networkId = Number(network.chainId);
    
    console.log(`ContractManager initializing on network ${this.networkId}`);

    // Load only the specified configuration
    await this.loadConfiguration(configFile);

    // Initialize ABIs
    await this.initializeABIs();

    // Initialize contracts from the specified config
    await this.initializeContractsFromConfig(configFile);
  }

  /**
   * Load specific configuration file
   */
  async loadConfiguration(configFile) {
    try {
      const response = await fetch(`/config/${configFile}.json`);
      if (response.ok) {
        const config = await response.json();
        this[configFile] = config;
        console.log(`${configFile} configuration loaded`);
      }
    } catch (error) {
      console.error(`Failed to load ${configFile}.json:`, error);
    }
  }

  /**
   * Load all configuration files (deprecated - kept for compatibility)
   */
  async loadConfigurations() {
    // Try to use existing CONTRACTS_CONFIG if available
    if (typeof CONTRACTS_CONFIG !== 'undefined' && CONTRACTS_CONFIG) {
      this.contractsConfig = CONTRACTS_CONFIG;
      console.log('Using existing CONTRACTS_CONFIG');
    }

    // Load deployment.json
    try {
      const deploymentResponse = await fetch('/config/deployment.json');
      if (deploymentResponse.ok) {
        this.deployment = await deploymentResponse.json();
        console.log('Deployment configuration loaded');
      }
    } catch (error) {
      console.error('Failed to load deployment.json:', error);
    }

    // Load settings.json
    try {
      const settingResponse = await fetch('/config/settings.json');
      if (settingResponse.ok) {
        this.settings = await settingResponse.json();
        console.log('Settings configuration loaded');
      }
    } catch (error) {
      console.error('Failed to load settings.json:', error);
    }

    // Load campaign.json for campaign contracts
    try {
      const campaignResponse = await fetch('/config/campaign.json');
      if (campaignResponse.ok) {
        this.campaign = await campaignResponse.json();
        console.log('Campaign configuration loaded');
      }
    } catch (error) {
      console.error('Failed to load campaign.json:', error);
    }
  }

  /**
   * Initialize ABIs for all contract types
   */
  async initializeABIs() {
    // Try to load ABIs from files first
    const abiFiles = {
      BankedNFT: '/abi/BankedNFT.abi.json',
      MetadataBank: '/abi/TragedyMetadata.abi.json',
      TragedyComposer: '/abi/TragedyComposer.abi.json',
      LegendaryBank: '/abi/LegendaryBank.abi.json',
    };

    for (const [contractName, abiPath] of Object.entries(abiFiles)) {
      try {
        const response = await fetch(abiPath);
        if (response.ok) {
          this.abis[contractName] = await response.json();
          console.log(`Loaded ${contractName} ABI from file`);
        }
      } catch (error) {
        console.warn(`Failed to load ${contractName} ABI file:`, error);
      }
    }

    // If not loaded from file, use hardcoded ABIs as fallback
    if (!this.abis.LegendaryBank) {
      this.abis.LegendaryBank = [
        'function getLegendaryCount() view returns (uint256)',
        'function legendaryIds(uint256 index) view returns (uint256)',
        'function isLegendaryId(uint256 tokenId) view returns (bool)',
        'function getLegendaryTitle(uint256 tokenId) view returns (string)',
        'function getLegendaryDescription(uint256 tokenId) view returns (string)',
      ];
    }
  }


  /**
   * Initialize contracts from specific config
   */
  async initializeContractsFromConfig(configFile) {
    const config = this[configFile];
    if (!config || !config.contracts) {
      console.warn(`No contracts found in ${configFile} config`);
      return;
    }

    // Handle different config formats
    if (configFile === 'deployment') {
      // deployment.json format
      const contractMapping = {
        BankedNFT: 'bankedNFT',
        MetadataBank: 'metadataBank',
        TragedyComposer: 'composer',
        MonsterBank: 'monsterBank',
        ItemBank: 'itemBank',
        BackgroundBank: 'backgroundBank',
        EffectBank: 'effectBank',
        LegendaryBank: 'LegendaryBank',
      };

      for (const [deploymentName, internalName] of Object.entries(contractMapping)) {
        const address = config.contracts[deploymentName];
        if (address && this.isValidAddress(address)) {
          const abi = this.abis[deploymentName] || [];
          await this.addContract(internalName, address, abi);
        }
      }
    } else if (configFile === 'campaign') {
      // campaign.json format - load contracts
      
      for (const [contractName, address] of Object.entries(config.contracts)) {
        if (this.isValidAddress(address)) {
          const abi = this.abis[contractName] || [
            'function mint() public',
            'function balanceOf(address owner) view returns (uint256)',
            'event Transfer(address indexed from, address indexed to, uint256 tokenId)'
          ];
          await this.addContract(contractName.toLowerCase(), address, abi);
        }
      }
    } else if (configFile === 'settings') {
      // settings.json format
      for (const [contractName, address] of Object.entries(config.contracts)) {
        if (this.isValidAddress(address)) {
          const abi = this.abis[contractName] || ['function mint() public'];
          await this.addContract(contractName.toLowerCase(), address, abi);
        }
      }
    }
  }

  /**
   * Initialize all contracts (deprecated - kept for compatibility)
   */
  async initializeContracts() {
    // Contract name mapping (deployment.json name -> internal name)
    const contractMapping = {
      BankedNFT: 'bankedNFT',
      MetadataBank: 'metadataBank',
      TragedyComposer: 'composer',
      MonsterBank: 'monsterBank',
      ItemBank: 'itemBank',
      BackgroundBank: 'backgroundBank',
      EffectBank: 'effectBank',
      LegendaryBank: 'LegendaryBank',
    };

    // Initialize from deployment.json
    if (this.deployment && this.deployment.contracts) {
      for (const [deploymentName, internalName] of Object.entries(
        contractMapping
      )) {
        const address = this.deployment.contracts[deploymentName];
        if (address && this.isValidAddress(address)) {
          await this.addContract(
            internalName,
            address,
            this.abis[deploymentName] || []
          );
        }
      }
    }

    // Initialize from setting.json
    if (this.settings && this.settings.contracts) {
      for (const [contractName, address] of Object.entries(
        this.settings.contracts
      )) {
        if (this.isValidAddress(address)) {
          const abi = this.abis[contractName] || ['function mint() public'];
          await this.addContract(contractName.toLowerCase(), address, abi);
        }
      }
    }

    // Initialize from campaign.json
    if (this.campaign && this.campaign.contracts) {
      for (const [contractName, address] of Object.entries(
        this.campaign.contracts
      )) {
        if (this.isValidAddress(address)) {
          // Use a simple ABI for campaign contract with mint function
          const abi = this.abis[contractName] || [
            'function mint() public',
            'function balanceOf(address owner) view returns (uint256)',
            'event Transfer(address indexed from, address indexed to, uint256 tokenId)'
          ];
          await this.addContract(contractName.toLowerCase(), address, abi);
        }
      }
    }

    // Initialize from contracts-config.js if available
    if (this.contractsConfig && this.contractsConfig.networks) {
      const networkConfig = this.contractsConfig.networks[this.networkId];
      if (networkConfig && networkConfig.contracts) {
        for (const [contractName, address] of Object.entries(
          networkConfig.contracts
        )) {
          if (this.isValidAddress(address)) {
            const deploymentName = Object.keys(contractMapping).find(
              (key) => contractMapping[key] === contractName
            );
            const abi = this.abis[deploymentName] || [];
            await this.addContract(contractName, address, abi);
          }
        }
      }
    }
  }

  /**
   * Add a contract instance
   * @param {string} name - Contract name
   * @param {string} address - Contract address
   * @param {Array} abi - Contract ABI
   */
  async addContract(name, address, abi) {
    if (!this.isValidAddress(address)) {
      console.warn(`Invalid address for contract ${name}: ${address}`);
      return;
    }

    try {
      // Create contract instance
      const contract = new ethers.Contract(
        address,
        abi,
        this.signer || this.provider
      );

      // Verify contract exists by checking code
      const code = await this.provider.getCode(address);
      if (code === '0x') {
        console.warn(`No contract found at address ${address} for ${name}`);
        return;
      }

      this.contracts[name] = contract;
      console.log(`Contract ${name} initialized at ${address}`);
    } catch (error) {
      console.error(`Failed to initialize contract ${name}:`, error);
    }
  }

  /**
   * Get a contract instance by name
   * @param {string} name - Contract name
   * @returns {ethers.Contract} Contract instance
   */
  getContract(name) {
    const contract = this.contracts[name];
    if (!contract) {
      console.warn(`Contract ${name} not found`);
    }
    return contract;
  }

  /**
   * Get all contract instances
   * @returns {Object} All contracts
   */
  getAllContracts() {
    return this.contracts;
  }

  /**
   * Update signer for all contracts
   * @param {ethers.Signer} signer - New signer
   */
  updateSigner(signer) {
    this.signer = signer;

    // Update signer for all existing contracts
    for (const [name, contract] of Object.entries(this.contracts)) {
      this.contracts[name] = contract.connect(signer);
    }

    console.log('Updated signer for all contracts');
  }

  /**
   * Get contract address
   * @param {string} name - Contract name
   * @returns {string} Contract address
   */
  getContractAddress(name) {
    const contract = this.contracts[name];
    return contract ? contract.target || contract.address : null;
  }

  /**
   * Check if address is valid
   * @param {string} address - Address to check
   * @returns {boolean}
   */
  isValidAddress(address) {
    return (
      address &&
      address !== '0x0000000000000000000000000000000000000000' &&
      /^0x[a-fA-F0-9]{40}$/.test(address)
    );
  }

  /**
   * Call a contract method with optional caching
   * @param {string} contractName - Contract name
   * @param {string} method - Method name
   * @param {Array} params - Method parameters
   * @param {Object} options - Options (e.g., { cache: rpcCache })
   * @returns {Promise<any>} Method result
   */
  async call(contractName, method, params = [], options = {}) {
    const contract = this.getContract(contractName);
    if (!contract) {
      throw new Error(`Contract ${contractName} not found`);
    }

    // If cache is provided and method is a view function
    if (
      options.cache &&
      contract.interface.getFunction(method).stateMutability === 'view'
    ) {
      const cacheKey = options.cache.createCacheKey(
        `${contractName}.${method}`,
        params,
        this.networkId
      );

      // Check cache first
      const cachedValue = await options.cache.get(cacheKey);
      if (cachedValue !== null) {
        console.log(`Cache hit for ${contractName}.${method}`);
        return cachedValue;
      }

      // Call contract method
      const result = await contract[method](...params);

      // Cache the result
      await options.cache.set(cacheKey, result, method);

      return result;
    }

    // Direct call without caching
    return await contract[method](...params);
  }

  /**
   * Execute a transaction
   * @param {string} contractName - Contract name
   * @param {string} method - Method name
   * @param {Array} params - Method parameters
   * @param {Object} options - Transaction options (value, gasLimit, etc.)
   * @returns {Promise<Object>} Transaction receipt
   */
  async execute(contractName, method, params = [], options = {}) {
    const contract = this.getContract(contractName);
    if (!contract) {
      throw new Error(`Contract ${contractName} not found`);
    }

    if (!this.signer) {
      throw new Error('Signer required for transactions');
    }

    // Execute transaction
    const tx = await contract[method](...params, options);

    // Wait for confirmation
    const receipt = await tx.wait();

    return receipt;
  }

  /**
   * Get contract events
   * @param {string} contractName - Contract name
   * @param {string} eventName - Event name
   * @param {Object} filter - Event filter
   * @returns {Promise<Array>} Events
   */
  async getEvents(contractName, eventName, filter = {}) {
    const contract = this.getContract(contractName);
    if (!contract) {
      throw new Error(`Contract ${contractName} not found`);
    }

    const eventFilter = contract.filters[eventName](...Object.values(filter));
    return await contract.queryFilter(eventFilter);
  }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContractManager;
}
