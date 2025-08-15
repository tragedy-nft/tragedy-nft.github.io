/**
 * Console override for production
 * This script disables console.log in production environments
 * Add this as the first script in your HTML files
 */

(function() {
  // Check if we're in production
  const isProduction = !(
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.includes('dev') ||
    window.location.protocol === 'file:' ||
    new URLSearchParams(window.location.search).get('debug') === 'true'
  );

  if (isProduction) {
    // Store original console methods for error reporting
    const originalError = console.error;
    const originalWarn = console.warn;
    
    // Override console methods in production
    console.log = function() {};
    console.info = function() {};
    console.debug = function() {};
    console.trace = function() {};
    console.dir = function() {};
    console.dirxml = function() {};
    console.group = function() {};
    console.groupCollapsed = function() {};
    console.groupEnd = function() {};
    console.time = function() {};
    console.timeEnd = function() {};
    console.timeLog = function() {};
    console.table = function() {};
    
    // Keep warnings and errors, but you can disable these too if needed
    // console.warn = function() {};
    // console.error = function() {};
  }
})();