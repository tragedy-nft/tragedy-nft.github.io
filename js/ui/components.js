/**
 * Common UI components for Myth of Tragedy
 * Reusable components to eliminate duplication across HTML files
 */

/**
 * Create a language switcher component
 * @param {string} currentLang - Current language ('en' or 'ja')
 * @param {Function} onSwitch - Callback when language is switched
 * @returns {HTMLElement} Language switcher element
 */
function createLanguageSwitcher(currentLang = 'en', onSwitch) {
  const container = document.createElement('div');
  container.className = 'language-tabs';
  container.innerHTML = `
    <button class="lang-tab ${currentLang === 'en' ? 'active' : ''}" data-lang="en">
      English
    </button>
    <button class="lang-tab ${currentLang === 'ja' ? 'active' : ''}" data-lang="ja">
      日本語
    </button>
  `;

  // Add click handlers
  container.querySelectorAll('.lang-tab').forEach((tab) => {
    tab.addEventListener('click', (e) => {
      const lang = e.target.dataset.lang;

      // Update active state
      container.querySelectorAll('.lang-tab').forEach((t) => {
        t.classList.toggle('active', t.dataset.lang === lang);
      });

      // Call callback
      if (onSwitch) {
        onSwitch(lang);
      }
    });
  });

  return container;
}

/**
 * Create a wallet connection button
 * @param {Object} options - Button options
 * @returns {HTMLElement} Wallet button element
 */
function createWalletButton(options = {}) {
  const {
    connectText = 'Connect Wallet',
    className = 'wallet-button',
    onClick = null,
  } = options;

  const button = document.createElement('button');
  button.className = className;
  button.textContent = connectText;
  button.dataset.connected = 'false';

  if (onClick) {
    button.addEventListener('click', onClick);
  }

  return button;
}

/**
 * Update wallet button state
 * @param {HTMLElement} button - Wallet button element
 * @param {boolean} connected - Connection state
 * @param {string} address - Wallet address (optional)
 */
function updateWalletButton(button, connected, address = null) {
  button.dataset.connected = connected ? 'true' : 'false';

  if (connected && address) {
    const formatted = address.slice(0, 6) + '...' + address.slice(-4);
    button.textContent = formatted;
  } else if (connected) {
    button.textContent = button.dataset.connectedText || 'Connected';
  } else {
    button.textContent = button.dataset.connectText || 'Connect Wallet';
  }
}

/**
 * Create a loading spinner
 * @param {string} message - Loading message
 * @returns {HTMLElement} Loading element
 */
function createLoadingSpinner(message = 'Loading...') {
  const container = document.createElement('div');
  container.className = 'loading-container';
  container.innerHTML = `
    <div class="loading-spinner"></div>
    <p class="loading-message">${message}</p>
  `;
  return container;
}

/**
 * Show transaction status modal
 * @param {Object} options - Modal options
 */
function showTransactionModal(options) {
  const {
    title = 'Transaction',
    message = '',
    status = 'pending', // pending, success, error
    txHash = null,
    onClose = null,
  } = options;

  // Remove existing modal
  const existing = document.getElementById('tx-modal');
  if (existing) {
    existing.remove();
  }

  // Create modal
  const modal = document.createElement('div');
  modal.id = 'tx-modal';
  modal.className = 'modal-overlay';

  const statusIcon = {
    pending: '⏳',
    success: '✅',
    error: '❌',
  }[status];

  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>${statusIcon} ${title}</h3>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body">
        <p>${message}</p>
        ${
          txHash
            ? `
          <div class="tx-hash">
            <span>Transaction: </span>
            <a href="#" class="tx-link" target="_blank">${txHash.slice(0, 10)}...${txHash.slice(-8)}</a>
          </div>
        `
            : ''
        }
      </div>
      ${
        status !== 'pending'
          ? `
        <div class="modal-footer">
          <button class="modal-button">Close</button>
        </div>
      `
          : ''
      }
    </div>
  `;

  // Add to page
  document.body.appendChild(modal);

  // Add event handlers
  const closeBtn = modal.querySelector('.modal-close');
  const footerBtn = modal.querySelector('.modal-button');

  const closeModal = () => {
    modal.remove();
    if (onClose) {
      onClose();
    }
  };

  closeBtn.addEventListener('click', closeModal);
  if (footerBtn) {
    footerBtn.addEventListener('click', closeModal);
  }

  // Update explorer link based on network
  if (txHash) {
    const txLink = modal.querySelector('.tx-link');
    // This should be updated based on current network
    txLink.href = `https://polygonscan.com/tx/${txHash}`;
  }

  return modal;
}

/**
 * Show alert message
 * @param {string} message - Alert message
 * @param {string} type - Alert type (success, error, warning, info)
 * @param {number} duration - Auto-hide duration in ms (0 = no auto-hide)
 */
function showAlert(message, type = 'info', duration = 5000) {
  // Remove existing alerts
  document.querySelectorAll('.alert-message').forEach((el) => el.remove());

  const alert = document.createElement('div');
  alert.className = `alert-message alert-${type}`;

  const icon = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  }[type];

  alert.innerHTML = `
    <span class="alert-icon">${icon}</span>
    <span class="alert-text">${message}</span>
    <button class="alert-close">&times;</button>
  `;

  document.body.appendChild(alert);

  // Animate in
  setTimeout(() => alert.classList.add('show'), 10);

  // Close handler
  const close = () => {
    alert.classList.remove('show');
    setTimeout(() => alert.remove(), 300);
  };

  alert.querySelector('.alert-close').addEventListener('click', close);

  // Auto-hide
  if (duration > 0) {
    setTimeout(close, duration);
  }
}

/**
 * Create mobile MetaMask instruction modal
 * @returns {HTMLElement} Instruction modal
 */
function createMobileInstructions() {
  const modal = document.createElement('div');
  modal.className = 'mobile-instructions-modal';
  modal.innerHTML = `
    <div class="instructions-content">
      <h3>Connect MetaMask on Mobile</h3>
      <ol>
        <li>Open MetaMask app</li>
        <li>Tap the menu (≡) in the top left</li>
        <li>Select "Browser"</li>
        <li>Navigate to this website</li>
        <li>Click "Connect Wallet" again</li>
      </ol>
      <div class="instructions-buttons">
        <button class="open-metamask">Open MetaMask</button>
        <button class="close-instructions">Close</button>
      </div>
    </div>
  `;

  // Open MetaMask handler
  modal.querySelector('.open-metamask').addEventListener('click', () => {
    const dappUrl = window.location.href;
    const metamaskUrl = `https://metamask.app.link/dapp/${dappUrl.replace(/^https?:\/\//, '')}`;
    window.location.href = metamaskUrl;
  });

  // Close handler
  modal.querySelector('.close-instructions').addEventListener('click', () => {
    modal.remove();
  });

  return modal;
}

/**
 * Initialize common UI styles
 * This should be called once per page
 */
function initializeUIStyles() {
  // Check if styles already added
  if (document.getElementById('common-ui-styles')) {
    return;
  }

  const styles = document.createElement('style');
  styles.id = 'common-ui-styles';
  styles.textContent = `
    /* Language Switcher */
    .language-tabs {
      display: inline-flex;
      border-radius: 8px;
      overflow: hidden;
      margin: 10px 0;
    }
    
    .lang-tab {
      padding: 8px 16px;
      border: none;
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .lang-tab:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    
    .lang-tab.active {
      background: #4a90e2;
    }
    
    /* Loading Spinner */
    .loading-container {
      text-align: center;
      padding: 20px;
    }
    
    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    /* Modal */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    
    .modal-content {
      background: #1a1a2e;
      border-radius: 12px;
      padding: 24px;
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .modal-close {
      background: none;
      border: none;
      color: #fff;
      font-size: 24px;
      cursor: pointer;
      padding: 0;
      width: 30px;
      height: 30px;
    }
    
    /* Alert Messages */
    .alert-message {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 16px 20px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
      transform: translateX(400px);
      transition: transform 0.3s ease;
      z-index: 1001;
    }
    
    .alert-message.show {
      transform: translateX(0);
    }
    
    .alert-success { background: #27ae60; color: white; }
    .alert-error { background: #e74c3c; color: white; }
    .alert-warning { background: #f39c12; color: white; }
    .alert-info { background: #3498db; color: white; }
    
    .alert-close {
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
      margin-left: 10px;
    }
  `;

  document.head.appendChild(styles);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createLanguageSwitcher,
    createWalletButton,
    updateWalletButton,
    createLoadingSpinner,
    showTransactionModal,
    showAlert,
    createMobileInstructions,
    initializeUIStyles,
  };
}
