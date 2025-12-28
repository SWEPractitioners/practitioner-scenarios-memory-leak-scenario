/**
 * Solution checker for Memory Leak scenario
 * This script validates if the solution correctly fixes the memory leak
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 Checking solution...\n');

const serviceFile = path.join(__dirname, '../src/services/SearchCacheService.js');
const code = fs.readFileSync(serviceFile, 'utf8');

let score = 0;
const checks = [];

// Check 1: Uses Map instead of plain object
if (code.includes('new Map()') || code.includes('Map()')) {
  checks.push({ name: 'Uses Map for cache', passed: true });
  score += 20;
} else {
  checks.push({ name: 'Uses Map for cache', passed: false, hint: 'Consider using Map() for better LRU support' });
}

// Check 2: Has maxSize or size limit
if (code.includes('maxSize') || code.includes('max_size') || code.includes('MAX_SIZE') || code.includes('limit')) {
  checks.push({ name: 'Has cache size limit', passed: true });
  score += 30;
} else {
  checks.push({ name: 'Has cache size limit', passed: false, hint: 'Add a maxSize property to limit cache growth' });
}

// Check 3: Has cache eviction logic
if (code.includes('delete') && (code.includes('size') || code.includes('length'))) {
  checks.push({ name: 'Has eviction logic', passed: true });
  score += 30;
} else {
  checks.push({ name: 'Has eviction logic', passed: false, hint: 'Add logic to remove old entries when limit is reached' });
}

// Check 4: Doesn't have the original bug pattern
if (!code.includes('this.cache[query] = results') || code.includes('this.cache.set')) {
  checks.push({ name: 'Fixed original bug pattern', passed: true });
  score += 20;
} else {
  checks.push({ name: 'Fixed original bug pattern', passed: false, hint: 'The original cache[query] = results pattern causes memory leak' });
}

// Print results
console.log('Check Results:');
console.log('-'.repeat(50));
checks.forEach(check => {
  const icon = check.passed ? '✅' : '❌';
  console.log(`${icon} ${check.name}`);
  if (!check.passed && check.hint) {
    console.log(`   💡 ${check.hint}`);
  }
});

console.log('-'.repeat(50));
console.log(`\nScore: ${score}/100`);

if (score >= 80) {
  console.log('\n🎉 Excellent! Your solution looks correct!\n');
  process.exit(0);
} else if (score >= 50) {
  console.log('\n⚠️ Getting there! But there are still some issues.\n');
  process.exit(1);
} else {
  console.log('\n❌ Solution needs more work. Check the hints above.\n');
  process.exit(1);
}

