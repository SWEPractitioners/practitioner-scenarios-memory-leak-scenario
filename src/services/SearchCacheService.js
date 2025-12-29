/**
 * SearchCacheService - Ürün arama sonuçlarını cache'ler
 * 
 * 🐛 BUG: Bu serviste bir memory leak var!
 * Göreviniz bu leak'i tespit edip düzeltmek.
 */

class SearchCacheService { 
  constructor() {
    // 🐛 Problem: Static-like cache that never gets cleared
    this.cache = {};
  }

  /**
   * Ürünleri arar ve sonuçları cache'ler
   */
  search(query, products) {
    // Check cache first
    if (this.cache[query]) {
      console.log(`Cache hit for: ${query}`);
      return this.cache[query];
    }

    // Filter products (simple search)
    const results = products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );

    // 🐛 BUG: Adding to cache without any limit or cleanup
    // Her yeni sorgu cache'e ekleniyor ama hiç temizlenmiyor!
    this.cache[query] = results;

    return results;
  }

  /**
   * Cache boyutunu döndürür
   */
  getCacheSize() {
    return Object.keys(this.cache).length;
  }

  // TODO: Öğrencinin eklemesi gereken metodlar:
  // - clearOldEntries() 
  // - setMaxCacheSize()
  // - useLRU()
}

module.exports = SearchCacheService;

/**
 * ===============================================
 * ÇÖZÜM İPUÇLARI (Platformdan açılabilir):
 * ===============================================
 * 
 * İpucu 1: Cache'in bir boyut limiti olmalı
 * 
 * İpucu 2: LRU (Least Recently Used) pattern kullanılabilir
 * 
 * İpucu 3: Map() kullanarak insertion order korunabilir
 * 
 * ===============================================
 * ÖRNEK ÇÖZÜM:
 * ===============================================
 * 
 * constructor() {
 *   this.cache = new Map();
 *   this.maxSize = 100; // Maximum cache size
 * }
 * 
 * search(query, products) {
 *   if (this.cache.has(query)) {
 *     const results = this.cache.get(query);
 *     // Move to end (most recently used)
 *     this.cache.delete(query);
 *     this.cache.set(query, results);
 *     return results;
 *   }
 * 
 *   const results = products.filter(...);
 * 
 *   // Enforce max size (LRU eviction)
 *   if (this.cache.size >= this.maxSize) {
 *     const oldestKey = this.cache.keys().next().value;
 *     this.cache.delete(oldestKey);
 *   }
 * 
 *   this.cache.set(query, results);
 *   return results;
 * }
 */

