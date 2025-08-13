/**
 * Common utility functions for Myth of Tragedy frontend
 * Following DRY principle to eliminate code duplication
 */

/**
 * Format Ethereum address to shortened display format
 * @param {string} address - The full Ethereum address
 * @returns {string} Formatted address (e.g., "0x1234...5678")
 */
function formatAddress(address) {
  if (!address || address.length < 42) {
    return address || '';
  }
  return address.slice(0, 6) + '...' + address.slice(-4);
}

/**
 * Validate if a string is a valid Ethereum address
 * @param {string} address - The address to validate
 * @returns {boolean} True if valid Ethereum address
 */
function isValidAddress(address) {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Parse error messages from Web3/MetaMask errors
 * @param {Error} error - The error object
 * @returns {string} User-friendly error message
 */
function parseWeb3Error(error) {
  if (error.code === 4001) {
    return 'Transaction rejected by user';
  }
  if (error.code === 4902) {
    return 'Please add the requested network to MetaMask';
  }
  if (error.code === -32002) {
    return 'Please check MetaMask for pending requests';
  }
  if (error.message && error.message.includes('insufficient funds')) {
    return 'Insufficient funds for transaction';
  }
  return error.message || 'An unknown error occurred';
}

/**
 * Format Wei to Ether with specified decimals
 * @param {string|number} wei - Value in Wei
 * @param {number} decimals - Number of decimal places (default: 4)
 * @returns {string} Formatted Ether value
 */
function formatEther(wei, decimals = 4) {
  if (!wei) {
    return '0';
  }

  // Convert to string if needed
  const weiStr = wei.toString();

  // Handle ethers.js v5 compatibility
  if (
    typeof ethers !== 'undefined' &&
    ethers.utils &&
    ethers.utils.formatEther
  ) {
    const etherValue = ethers.utils.formatEther(weiStr);
    return parseFloat(etherValue).toFixed(decimals);
  }

  // Manual conversion if ethers not available
  const etherValue = parseInt(weiStr) / 1e18;
  return etherValue.toFixed(decimals);
}

/**
 * Convert Ether to Wei
 * @param {string|number} ether - Value in Ether
 * @returns {string} Value in Wei
 */
function parseEther(ether) {
  if (!ether) {
    return '0';
  }

  // Handle ethers.js v5 compatibility
  if (
    typeof ethers !== 'undefined' &&
    ethers.utils &&
    ethers.utils.parseEther
  ) {
    return ethers.utils.parseEther(ether.toString()).toString();
  }

  // Manual conversion if ethers not available
  return (parseFloat(ether) * 1e18).toString();
}

/**
 * Sleep/delay function for async operations
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after delay
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Truncate string to specified length with ellipsis
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated string
 */
function truncateString(str, maxLength) {
  if (!str || str.length <= maxLength) {
    return str || '';
  }
  return str.slice(0, maxLength - 3) + '...';
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    return success;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    formatAddress,
    isValidAddress,
    parseWeb3Error,
    formatEther,
    parseEther,
    sleep,
    truncateString,
    copyToClipboard,
  };
}
