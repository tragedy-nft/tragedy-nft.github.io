# The Mythical Cursed-Nightmare: Frontend

> "Adding cursed developers to a late nightmare project makes it later."
> — Inspired by Frederick P. Brooks Jr.

A dark fantasy NFT collection frontend showcasing 10,000 algorithmically generated tragic essays. This is an homage to "The Mythical Man-Month" but explores the dark patterns of generative art through an immersive web experience.

## 🎭 Collection Overview

Each NFT represents a unique combination of four cursed elements:

- **Species**: The protagonist of the tragedy (10 types)
- **Equipment**: Their tool of fate (10 types)
- **Realm**: The stage where tragedy unfolds (10 types)
- **Curse**: The force that drives the narrative (10 types)

**Total Supply**: 10,000 unique combinations
**Generation**: Deterministic based on token ID
**Storage**: Fully on-chain metadata and SVG images

## 🏗️ Architecture

This frontend is a **vanilla JavaScript application** designed for maximum compatibility and minimal dependencies:

### Core Technologies

- **HTML5** - Semantic structure
- **CSS3** - Custom styling with dark fantasy theme
- **Vanilla JavaScript** - No frameworks, pure web standards
- **Web3/Ethers.js** - Blockchain integration via CDN
- **SVG** - Scalable vector graphics for all assets

### Key Features

- 📱 **Mobile-responsive design** with PWA capabilities
- 🎨 **Real-time NFT generation** and preview
- 🔗 **Web3 wallet integration** (MetaMask, WalletConnect)
- ⚡ **Static site deployment** ready (no build process required)
- 🎭 **Interactive visual effects** for each curse type

## 📁 Project Structure

```
frontend/
├── index.html              # Landing page with countdown
├── summon.html            # NFT minting interface
├── generate.html          # NFT preview and generation
├── story.html             # Project lore and background
├── essays.html            # Collection essays page
├── manifesto.html          # Project manifesto
├── campaign.html          # SBT campaign page
├── cache-test.html        # RPC cache testing interface
├── viewer/
│   └── index.html        # NFT viewer application
├── css/
│   └── styles.css        # Main stylesheet
├── js/
│   ├── config/
│   │   └── contracts.js  # Centralized contract configuration
│   ├── wallet/
│   │   └── manager.js    # Unified wallet management
│   ├── contracts/
│   │   ├── manager.js    # Contract management system
│   │   ├── web3-integration.js  # Web3 integration layer
│   │   └── cache.js      # RPC cache implementation
│   ├── ui/
│   │   ├── components.js # Reusable UI components
│   │   ├── translations.js     # Multi-language support
│   │   └── campaign-translations.js  # Campaign translations
│   └── utils/
│       └── format.js     # Formatting utilities
├── assets/
│   ├── monsters/         # 10 monster SVG files
│   └── config/           # Configuration templates
├── config/
│   ├── blockchain.json   # Network configuration
│   ├── deployment.json   # Contract deployment addresses
│   ├── setting.json      # Application settings
│   └── campaign.json     # Campaign configuration
├── abi/                  # Contract ABI files
└── docs/
    ├── effect_ideas.md   # Visual effects documentation
    ├── MANIFEST.md       # Project philosophical manifesto
    ├── TECHNICAL_STANDARDS.md  # Technical documentation
    └── RPC_CACHE_PROPOSAL.md   # RPC caching strategy
```

## 🎨 Visual Elements

### Monster Species (10 types)

- Werewolf, Goblin, Frankenstein, Demon, Dragon
- Zombie, Vampire, Mummy, Succubus, Skeleton

### Equipment Items (10 types)

- Crown, Sword, Shield, Poison, Torch
- Wine, Scythe, Magic Wand, Arm, Head

### Realms/Backgrounds (10 types)

- Bloodmoon, Abyss, Decay, Corruption, Venom
- Void, Inferno, Frost, Ragnarok, Shadow

### Curse Effects (10 types)

- Seizure, Mind Blast, Confusion, Meteor, Bats
- Poisoning, Lightning, Blizzard, Burning, Brain Wash

## ⚡ Getting Started

### Prerequisites

- Modern web browser with ES6+ support
- Web3 wallet (MetaMask recommended)
- Local web server for development (optional)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Serve the files** (for development)

   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js
   npx serve .

   # Or simply open index.html in your browser
   ```

3. **Configure blockchain settings**
   - Edit `config/blockchain.json` for network settings
   - Update contract addresses as needed

### Deployment

This is a static site that can be deployed to:

- **GitHub Pages**
- **Netlify**
- **Vercel**
- **IPFS** (for decentralized hosting)
- Any static file hosting service

No build process required - just upload the files!

## 🎮 User Features

### NFT Generation & Preview

- Real-time NFT generation based on token ID
- Interactive preview with visual effects
- Dynamic name generation with rarity indicators
- Synergy system highlighting special combinations

### Wallet Integration

- Connect with MetaMask, WalletConnect, and mobile wallets
- Transaction management for minting
- Balance and ownership tracking

### Rarity System

- **Common** (40%) → **Legendary** (5%)
- **Special Combos**: Enhanced rarity for specific combinations
- **Legendary IDs**: 30 special token IDs with unique stories
- **Synergy Bonuses**: Multi-element combinations

### Special Features

- **Legendary Token Stories**: Unique narratives for special IDs
- **Dynamic Pricing**: Smart contract-based pricing strategy
- **Multi-language Support**: English/Japanese translations
- **Mobile Optimization**: Responsive design for all devices

## 🧙‍♂️ Synergy System

### Dual Synergies (Implemented)

Perfect combinations between Species + Equipment:

- **Vampire + Wine** = "Blood Sommelier" (Legendary)
- **Skeleton + Scythe** = "Death's Herald" (Legendary)
- **Dragon + Crown** = "The Fallen Monarch" (Legendary)

### Legendary Token IDs (30 special IDs)

Special stories and automatic Legendary rarity:

- **#1**: "The Genesis" - The first existence
- **#666**: "The Beast Awakened" - The prophesied destroyer
- **#1337**: "The Chosen One" - Elite among the damned
- **#9999**: "The Final Guardian" - The last sentinel

## 🛠️ Development

### Code Style

- Vanilla JavaScript (ES6+)
- Semantic HTML5
- CSS3 with custom properties
- SVG for all graphics
- ESLint for code quality
- Prettier for code formatting

### Key Components

- `WalletManager` - Unified wallet connection handling
- `ContractManager` - Centralized contract management
- `RPCCache` - Efficient blockchain data caching
- UI Components - Reusable UI elements (modals, alerts, etc.)

### Configuration

- `config/blockchain.json` - Network settings
- `config/deployment.json` - Contract addresses
- `config/setting.json` - Application settings
- `js/config/contracts.js` - Contract configuration
- `package.json` - Development dependencies

### Development Commands

```bash
# Install dependencies
npm install

# Run linter
npm run lint

# Format code
npm run format

# Start local server
npm run serve
```

## 🎭 Philosophy

Just as Brooks taught us there's "No Silver Bullet" in software engineering, this collection teaches us there's no universal cure for curses. Each NFT represents a unique exploration of digital darkness, algorithmically generated yet deeply meaningful.

This frontend serves as a gateway to that darkness - a carefully crafted interface that transforms cold algorithms into warm, interactive experiences. Every interaction is designed to immerse users in the tragic beauty of generative art.

---

_"In the realm of cursed nightmares, every number tells a story, every combination births a tragedy, and every collector becomes a curator of digital darkness."_
