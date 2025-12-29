/**
 * SearchCacheService - Ürün arama sonuçlarını cache'ler
 * 
 * ✅ ÇÖZÜM: LRU (Least Recently Used) cache implementasyonu
 * Memory leak problemi çözülmüş versiyonu
 */

class SearchCacheService { 
  constructor(maxSize = 100) {
    // ✅ Map kullanarak insertion order'ı koruyoruz
    this.cache = new Map();
    // ✅ Maximum cache boyutu belirliyoruz
    this.maxSize = maxSize;
  }

  /**
   * Ürünleri arar ve sonuçları cache'ler
   * LRU pattern ile cache boyutunu kontrol eder
   */
  search(query, products) {
    // Check cache first
    if (this.cache.has(query)) {
      console.log(`Cache hit for: ${query}`);
      const results = this.cache.get(query);
      
      // ✅ LRU: Cache hit olduğunda entry'yi en sona taşı (most recently used)
      this.cache.delete(query);
      this.cache.set(query, results);
      
      return results;
    }

    // Filter products (simple search)
    const results = products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );

    // ✅ Cache boyutu limitini kontrol et
    if (this.cache.size >= this.maxSize) {
      // En eski entry'yi sil (LRU eviction)
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
      console.log(`Cache full, evicting oldest entry: ${oldestKey}`);
    }

    // Yeni sonucu cache'e ekle
    this.cache.set(query, results);

    return results;
  }

  /**
   * Cache boyutunu döndürür
   */
  getCacheSize() {
    return this.cache.size;
  }

  /**
   * Cache'i tamamen temizler
   */
  clearCache() {
    this.cache.clear();
    console.log('Cache cleared');
  }

  /**
   * Belirli bir sorgu cache'den siler
   */
  removeFromCache(query) {
    return this.cache.delete(query);
  }

  /**
   * Maximum cache boyutunu değiştirir
   */
  setMaxCacheSize(newSize) {
    if (newSize < 1) {
      throw new Error('Max cache size must be at least 1');
    }
    
    this.maxSize = newSize;
    
    // Yeni limit daha küçükse, fazla entry'leri sil
    while (this.cache.size > this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
  }

  /**
   * Tüm cache key'lerini döndürür
   */
  getCacheKeys() {
    return Array.from(this.cache.keys());
  }
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

