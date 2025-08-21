# Configuration Directory

This directory contains configuration files for the Myth of Tragedy frontend application.

## Files

### blockchain.json

Network configurations for blockchain connectivity.

Structure:

```json
{
  "networks": {
    "polygon": {
      "name": "Polygon",
      "chainId": 137,
      "rpcUrl": "https://polygon-mainnet.g.alchemy.com/v2/{API_KEY}",
      "symbol": "POL",
      "blockExplorer": "https://polygonscan.com"
    },
    "bonsoleil": {
      "name": "Bon-Soleil Testnet",
      "chainId": 21201,
      "rpcUrl": "https://dev2.bon-soleil.com/rpc",
      "symbol": "SOL",
      "blockExplorer": "https://dev2.bon-soleil.com/explorer"
    }
  }
}
```

### deployment.json

Contract deployment addresses for different networks.

Structure:

```json
{
  "version": "1.0.0",
  "network": "chain-21201",
  "contracts": {
    "BankedNFT": "0x...",
    "MetadataBank": "0x...",
    "TragedyComposer": "0x...",
    "MonsterBank": "0x...",
    "ItemBank": "0x...",
    "BackgroundBank": "0x...",
    "EffectBank": "0x...",
    "LegendaryBank": "0x..."
  }
}
```

### setting.json

Application-specific settings and contract addresses.

Structure:

```json
{
  "contracts": {
    "Campaign": "0x...",
    "bankedNFT": "0x...",
    "metadataBank": "0x...",
    "composer": "0x...",
    "itemBank": "0x...",
    "monsterBank": "0x...",
    "backgroundBank": "0x...",
    "effectBank": "0x..."
  }
}
```

### campaign.json

Campaign-specific configuration for SBT minting.

Structure:

```json
{
  "active": true,
  "startDate": "2025-08-01T00:00:00Z",
  "endDate": "2025-08-31T23:59:59Z",
  "contractAddress": "0x...",
  "chainId": 137,
  "features": {
    "freeMint": true,
    "limitedTime": true,
    "soulbound": true
  }
}
```

## Usage

These configuration files are automatically loaded by the application:

1. **blockchain.json** - Loaded by WalletManager and web3 integration components
2. **deployment.json** - Loaded by ContractManager for contract initialization
3. **setting.json** - Used as a fallback for contract addresses
4. **campaign.json** - Used by the campaign page for SBT minting configuration

## Adding New Networks

To add a new network:

1. Add network configuration to `blockchain.json`
2. Update `deployment.json` with contract addresses for the new network
3. Update `js/config/contracts.js` to handle the new network

## Security Notes

- Never commit sensitive data like API keys or private keys
- Use environment variables or secure configuration management for production
- Contract addresses should be verified before deployment
