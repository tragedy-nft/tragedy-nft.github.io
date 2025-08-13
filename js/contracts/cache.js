// RPC Cache Layer for The Mythical Cursed-Nightmare
// Uses IndexedDB for client-side caching of blockchain data

class RPCCache {
  constructor() {
    this.dbName = 'mythOfTragedy_rpc_cache';
    this.version = 1;
    this.db = null;
    this.storeName = 'cache';

    // Cache strategy definitions with TTL in milliseconds
    this.cacheStrategy = {
      // Immutable data - cache forever
      name: { ttl: Infinity },
      symbol: { ttl: Infinity },
      maxSupply: { ttl: Infinity },
      tokenURI: { ttl: Infinity },
      getContractName: { ttl: Infinity },
      getContractSymbol: { ttl: Infinity },
      getMaxSupply: { ttl: Infinity },

      // Slow-changing data - cache for 1 hour
      mintFee: { ttl: 3600000 },
      getNFTPrice: { ttl: 3600000 },

      // Dynamic data - cache for 30 seconds
      totalSupply: { ttl: 30000 },
      balanceOf: { ttl: 30000 },
      getBalance: { ttl: 30000 },
      getTotalSupply: { ttl: 30000 },
      checkOwnership: { ttl: 30000 },

      // Very dynamic data - cache for 5 seconds
      getTransactionReceipt: { ttl: 5000 },
      getBlockNumber: { ttl: 5000 },
    };

    // Statistics for monitoring
    this.stats = {
      hits: 0,
      misses: 0,
      errors: 0,
    };
  }

  // Initialize IndexedDB connection
  async init() {
    return new Promise((resolve, reject) => {
      // Check for IndexedDB support
      if (!window.indexedDB) {
        console.warn('IndexedDB not supported, caching disabled');
        reject(new Error('IndexedDB not supported'));
        return;
      }

      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => {
        console.error('Failed to open IndexedDB:', request.error);
        this.stats.errors++;
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('RPC cache initialized successfully');
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create object store if it doesn't exist
        if (!db.objectStoreNames.contains(this.storeName)) {
          const objectStore = db.createObjectStore(this.storeName, {
            keyPath: 'key',
          });
          objectStore.createIndex('expiry', 'expiry', { unique: false });
          objectStore.createIndex('method', 'method', { unique: false });
          console.log('Cache object store created');
        }
      };
    });
  }

  // Generate cache key from method, params, and chainId
  createCacheKey(method, params, chainId) {
    // Sort params to ensure consistent keys
    const sortedParams = params ? this.sortObjectKeys(params) : {};
    return `${chainId}:${method}:${JSON.stringify(sortedParams)}`;
  }

  // Sort object keys recursively for consistent cache keys
  sortObjectKeys(obj) {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.sortObjectKeys(item));
    }

    const sorted = {};
    Object.keys(obj)
      .sort()
      .forEach((key) => {
        sorted[key] = this.sortObjectKeys(obj[key]);
      });
    return sorted;
  }

  // Get cached value
  async get(key) {
    if (!this.db) {
      return null;
    }

    return new Promise((resolve) => {
      try {
        const transaction = this.db.transaction([this.storeName], 'readonly');
        const store = transaction.objectStore(this.storeName);
        const request = store.get(key);

        request.onsuccess = () => {
          const data = request.result;

          if (!data) {
            this.stats.misses++;
            resolve(null);
            return;
          }

          // Check if cache has expired
          if (data.expiry && Date.now() > data.expiry) {
            this.stats.misses++;
            // Delete expired entry asynchronously
            this.delete(key).catch(console.error);
            resolve(null);
            return;
          }

          this.stats.hits++;
          resolve(data.value);
        };

        request.onerror = () => {
          console.error('Cache get error:', request.error);
          this.stats.errors++;
          resolve(null);
        };
      } catch (error) {
        console.error('Cache get exception:', error);
        this.stats.errors++;
        resolve(null);
      }
    });
  }

  // Set cached value
  async set(key, value, method) {
    if (!this.db) {
      return;
    }

    const strategy = this.cacheStrategy[method];
    if (!strategy) {
      // Method not in cache strategy, don't cache
      return;
    }

    return new Promise((resolve) => {
      try {
        const transaction = this.db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);

        const data = {
          key,
          value,
          method,
          timestamp: Date.now(),
          expiry: strategy.ttl === Infinity ? null : Date.now() + strategy.ttl,
        };

        const request = store.put(data);

        request.onsuccess = () => {
          resolve();
        };

        request.onerror = () => {
          console.error('Cache set error:', request.error);
          this.stats.errors++;
          resolve();
        };
      } catch (error) {
        console.error('Cache set exception:', error);
        this.stats.errors++;
        resolve();
      }
    });
  }

  // Delete cached value
  async delete(key) {
    if (!this.db) {
      return;
    }

    return new Promise((resolve) => {
      try {
        const transaction = this.db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.delete(key);

        request.onsuccess = () => {
          resolve();
        };

        request.onerror = () => {
          console.error('Cache delete error:', request.error);
          this.stats.errors++;
          resolve();
        };
      } catch (error) {
        console.error('Cache delete exception:', error);
        this.stats.errors++;
        resolve();
      }
    });
  }

  // Clear all cached data
  async clear() {
    if (!this.db) {
      return;
    }

    return new Promise((resolve) => {
      try {
        const transaction = this.db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.clear();

        request.onsuccess = () => {
          console.log('Cache cleared successfully');
          this.resetStats();
          resolve();
        };

        request.onerror = () => {
          console.error('Cache clear error:', request.error);
          this.stats.errors++;
          resolve();
        };
      } catch (error) {
        console.error('Cache clear exception:', error);
        this.stats.errors++;
        resolve();
      }
    });
  }

  // Clear expired entries
  async clearExpired() {
    if (!this.db) {
      return;
    }

    return new Promise((resolve) => {
      try {
        const transaction = this.db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const index = store.index('expiry');
        const now = Date.now();

        // Get all entries with expiry less than now
        const range = IDBKeyRange.upperBound(now);
        const request = index.openCursor(range);

        request.onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor && cursor.value.expiry !== null) {
            cursor.delete();
            cursor.continue();
          } else {
            resolve();
          }
        };

        request.onerror = () => {
          console.error('Clear expired error:', request.error);
          this.stats.errors++;
          resolve();
        };
      } catch (error) {
        console.error('Clear expired exception:', error);
        this.stats.errors++;
        resolve();
      }
    });
  }

  // Get cache statistics
  getStats() {
    const total = this.stats.hits + this.stats.misses;
    const hitRate =
      total > 0 ? ((this.stats.hits / total) * 100).toFixed(2) : 0;

    return {
      ...this.stats,
      total,
      hitRate: `${hitRate}%`,
    };
  }

  // Reset statistics
  resetStats() {
    this.stats = {
      hits: 0,
      misses: 0,
      errors: 0,
    };
  }

  // Get cache size (approximate)
  async getCacheSize() {
    if (!this.db) {
      return 0;
    }

    return new Promise((resolve) => {
      try {
        const transaction = this.db.transaction([this.storeName], 'readonly');
        const store = transaction.objectStore(this.storeName);
        const request = store.count();

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = () => {
          console.error('Get cache size error:', request.error);
          resolve(0);
        };
      } catch (error) {
        console.error('Get cache size exception:', error);
        resolve(0);
      }
    });
  }
}

// Export for use in other modules
window.RPCCache = RPCCache;
