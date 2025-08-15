/**
 * MetaMask Browser Detection and Modal Display
 * Common functionality for showing MetaMask browser recommendation modal
 */

// Get user language preference
function getUserLanguage() {
  // Check URL parameter first
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  if (langParam && metamaskModalTranslations[langParam]) {
    localStorage.setItem('userLanguage', langParam);
    return langParam;
  }
  
  // Check localStorage
  const savedLang = localStorage.getItem('userLanguage');
  if (savedLang && metamaskModalTranslations[savedLang]) {
    return savedLang;
  }
  
  // Check browser language
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('ja')) return 'ja';
  if (browserLang.startsWith('zh')) return 'zh';
  if (browserLang.startsWith('ko')) return 'ko';
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('fr')) return 'fr';
  
  // Default to English
  return 'en';
}

// Change language function
function changeLanguage(lang) {
  if (metamaskModalTranslations[lang]) {
    localStorage.setItem('userLanguage', lang);
    
    // If modal is currently showing, update it
    const existingModal = document.querySelector('[data-metamask-modal]');
    if (existingModal) {
      existingModal.remove();
      checkBrowserAndShowMetaMaskWarning();
    }
  }
}

// Browser detection and MetaMask recommendation
async function checkBrowserAndShowMetaMaskWarning() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMetaMaskBrowser = window.ethereum && window.ethereum.isMetaMask;
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  
  // Detect WebView other than MetaMask browser
  const isWebView = /(wv|webview)/i.test(userAgent) || 
                   (isMobile && !isMetaMaskBrowser && window.ethereum === undefined);
  
  // Show warning on mobile if not MetaMask browser
  if (isMobile && !isMetaMaskBrowser) {
    const lang = getUserLanguage();
    const translations = metamaskModalTranslations[lang];
    
    // Get current page path for deep link
    const currentPath = window.location.pathname;
    const domain = settingsLoader ? await settingsLoader.getDeeplinkDomain() : 'tragedy-nft.github.io';
    const deepLinkUrl = `https://metamask.app.link/dapp/${domain}${currentPath}`;
    
    const warningModal = document.createElement('div');
    warningModal.setAttribute('data-metamask-modal', 'true');
    warningModal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100000;
      animation: fadeIn 0.3s;
    `;
    
    const warningContent = document.createElement('div');
    warningContent.style.cssText = `
      background: linear-gradient(180deg, #1a0a2a 0%, #0a0a0a 100%);
      border: 2px solid #9b4dff;
      border-radius: 20px;
      padding: 30px;
      text-align: center;
      max-width: 90%;
      width: 400px;
      box-shadow: 0 0 50px rgba(155, 77, 255, 0.5);
      position: relative;
    `;
    
    warningContent.innerHTML = `
      <div style="position: absolute; top: 10px; right: 10px;">
        <select onchange="changeLanguage(this.value)" 
                style="background: rgba(0, 0, 0, 0.5); border: 1px solid #9b4dff; 
                       color: #fff; padding: 5px 10px; border-radius: 15px; 
                       font-size: 0.8rem; cursor: pointer; outline: none;">
          <option value="en" ${lang === 'en' ? 'selected' : ''}>EN</option>
          <option value="ja" ${lang === 'ja' ? 'selected' : ''}>日本語</option>
          <option value="zh" ${lang === 'zh' ? 'selected' : ''}>中文</option>
          <option value="ko" ${lang === 'ko' ? 'selected' : ''}>한국어</option>
          <option value="es" ${lang === 'es' ? 'selected' : ''}>ES</option>
          <option value="fr" ${lang === 'fr' ? 'selected' : ''}>FR</option>
        </select>
      </div>
      <h2 style="color: #9b4dff; font-size: 1.5em; margin-top: 30px; margin-bottom: 20px; text-shadow: 0 0 20px rgba(155, 77, 255, 0.8);">
        ${translations.title}
      </h2>
      <p style="color: #e9d5ff; font-size: 1.1em; margin-bottom: 20px; line-height: 1.6;">
        ${translations.description}<br>
        ${translations.recommendation}
      </p>
      <a href="${deepLinkUrl}" 
         style="display: inline-block; background: #9b4dff; color: white; padding: 15px 30px; 
                border-radius: 10px; text-decoration: none; font-size: 1.1em; 
                box-shadow: 0 4px 20px rgba(155, 77, 255, 0.4); margin-bottom: 15px;
                transition: all 0.3s;"
         onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 6px 30px rgba(155, 77, 255, 0.6)';"
         onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 20px rgba(155, 77, 255, 0.4)';">
        ${translations.openInMetamask}
      </a>
      <br>
      <button onclick="this.parentElement.parentElement.remove()" 
              style="background: transparent; border: 1px solid #666; color: #999; 
                     padding: 10px 20px; border-radius: 5px; cursor: pointer; 
                     font-size: 0.9em; margin-top: 10px;"
              onmouseover="this.style.borderColor='#999'; this.style.color='#ccc';"
              onmouseout="this.style.borderColor='#666'; this.style.color='#999';">
        ${translations.continueAnyway}
      </button>
    `;
    
    warningModal.appendChild(warningContent);
    document.body.appendChild(warningModal);
  }
}

// Add fadeIn animation if not already defined
if (!document.querySelector('style[data-metamask-modal-styles]')) {
  const style = document.createElement('style');
  style.setAttribute('data-metamask-modal-styles', 'true');
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
}