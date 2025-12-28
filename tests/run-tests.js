/**
 * Test runner for Memory Leak scenario
 */

const SearchCacheService = require('../src/services/SearchCacheService');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
    passed++;
  } catch (error) {
    console.log(`❌ ${name}`);
    console.log(`   Error: ${error.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

// Tests
console.log('\n🧪 Running tests...\n');

test('SearchCacheService should be instantiable', () => {
  const service = new SearchCacheService();
  assert(service !== null, 'Service should not be null');
});

test('search() should return results', () => {
  const service = new SearchCacheService();
  const products = [{ id: 1, name: 'Laptop', category: 'electronics' }];
  const results = service.search('laptop', products);
  assert(results.length === 1, 'Should find 1 result');
});

test('search() should cache results', () => {
  const service = new SearchCacheService();
  const products = [{ id: 1, name: 'Laptop', category: 'electronics' }];
  service.search('laptop', products);
  assert(service.getCacheSize() > 0, 'Cache should have entries');
});

test('Cache should have a maximum size limit', () => {
  const service = new SearchCacheService();
  const products = [{ id: 1, name: 'Test', category: 'test' }];
  
  // Perform 200 unique searches
  for (let i = 0; i < 200; i++) {
    service.search(`query-${i}`, products);
  }
  
  const cacheSize = service.getCacheSize();
  
  // Cache should be limited (not grow indefinitely)
  // This test will FAIL until the bug is fixed
  assert(
    cacheSize <= 150, 
    `Cache size should be limited! Current size: ${cacheSize}`
  );
});

test('Cache should not grow indefinitely', () => {
  const service = new SearchCacheService();
  const products = [{ id: 1, name: 'Test', category: 'test' }];
  
  const initialMemory = process.memoryUsage().heapUsed;
  
  // Perform 500 unique searches
  for (let i = 0; i < 500; i++) {
    service.search(`unique-query-${i}-${Date.now()}`, products);
  }
  
  const finalMemory = process.memoryUsage().heapUsed;
  const memoryGrowth = (finalMemory - initialMemory) / 1024 / 1024;
  
  // Memory growth should be limited
  assert(
    memoryGrowth < 10, 
    `Memory grew too much: ${memoryGrowth.toFixed(2)}MB`
  );
});

// Summary
console.log('\n' + '='.repeat(40));
console.log(`Tests: ${passed} passed, ${failed} failed`);
console.log('='.repeat(40) + '\n');

// Exit with error code if any test failed
process.exit(failed > 0 ? 1 : 0);

