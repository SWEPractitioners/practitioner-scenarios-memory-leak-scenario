const SearchCacheService = require('./services/SearchCacheService');

const searchService = new SearchCacheService();

// Simulate product search
const products = [
  { id: 1, name: 'Laptop', category: 'electronics' },
  { id: 2, name: 'Phone', category: 'electronics' },
  { id: 3, name: 'Headphones', category: 'electronics' },
  { id: 4, name: 'Keyboard', category: 'electronics' },
  { id: 5, name: 'Mouse', category: 'electronics' },
];

// Simulate searches
console.log('Starting product search service...');

function simulateSearch() {
  const queries = ['laptop', 'phone', 'keyboard', 'mouse', 'headphones', 'tablet', 'monitor', 'speaker'];
  const randomQuery = queries[Math.floor(Math.random() * queries.length)] + '-' + Date.now();
  
  const results = searchService.search(randomQuery, products);
  console.log(`Search for "${randomQuery}": ${results.length} results, Cache size: ${searchService.getCacheSize()}`);
}

// Run searches
let searchCount = 0;
const interval = setInterval(() => {
  simulateSearch();
  searchCount++;
  
  if (searchCount >= 100) {
    clearInterval(interval);
    console.log('\n--- Final Stats ---');
    console.log(`Total searches: ${searchCount}`);
    console.log(`Final cache size: ${searchService.getCacheSize()}`);
    console.log(`Memory usage: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`);
  }
}, 10);

