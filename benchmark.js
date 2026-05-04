// d:\ITI\GenAI\Day2\benchmark.js

const { performance } = require('perf_hooks');
const { quickSortOptimized, quickSortIterative } = require('./quicksort');

/**
 * Generate a random numeric array.
 * @param {number} length
 * @param {number} max
 * @returns {number[]}
 */
function randomArray(length, max = 100000) {
  return Array.from({ length }, () => Math.floor(Math.random() * max));
}

/**
 * Measure execution time for a single call.
 * The function receives a fresh copy of the array.
 * @param {Function} fn
 * @param {number[]} arr
 * @returns {number} milliseconds
 */
function measure(fn, arr) {
  const copy = arr.slice();
  const start = performance.now();
  fn(copy);
  const end = performance.now();
  return end - start;
}

/**
 * Run a benchmark over multiple arrays and return the average time.
 * @param {Function} fn
 * @param {number[][]} arrays
 * @returns {number}
 */
function averageTime(fn, arrays) {
  const total = arrays.reduce((sum, arr) => sum + measure(fn, arr), 0);
  return total / arrays.length;
}

/**
 * Built-in numeric sort wrapper.
 * @param {number[]} arr
 * @returns {number[]}
 */
function builtInSort(arr) {
  return arr.slice().sort((a, b) => a - b);
}

/**
 * Print a benchmark result row.
 * @param {string} name
 * @param {number} ms
 */
function report(name, ms) {
  console.log(`${name.padEnd(24)} : ${ms.toFixed(3)} ms`);
}

/**
 * Create test arrays for benchmarking.
 * @param {number} size
 * @param {number} count
 * @returns {number[][]}
 */
function generateWorkload(size, count) {
  return Array.from({ length: count }, () => randomArray(size));
}

/**
 * Run the benchmark comparison.
 * @param {number} size
 * @param {number} runs
 */
function runBenchmark(size = 50000, runs = 5) {
  console.log(`\nBenchmark: ${runs} runs with arrays of size ${size}\n`);

  const workload = generateWorkload(size, runs);

  const quickOptimizedMs = averageTime((arr) => quickSortOptimized(arr), workload);
  report('QuickSort optimized', quickOptimizedMs);

  const quickIterativeMs = averageTime((arr) => quickSortIterative(arr), workload);
  report('QuickSort iterative', quickIterativeMs);

  const builtInMs = averageTime((arr) => builtInSort(arr), workload);
  report('Built-in sort', builtInMs);

  console.log('\nComparison:');
  console.log(`- QuickSort optimized is ${(quickOptimizedMs / builtInMs).toFixed(2)}x built-in`);
  console.log(`- QuickSort iterative is ${(quickIterativeMs / builtInMs).toFixed(2)}x built-in\n`);
}

/**
 * Run some edge-case benchmarks to compare stability.
 */
function runEdgeCaseBenchmarks() {
  const cases = {
    'already sorted': Array.from({ length: 30000 }, (_, i) => i),
    'reverse sorted': Array.from({ length: 30000 }, (_, i) => 30000 - i),
    duplicates: Array.from({ length: 30000 }, () => 42),
  };

  console.log('Edge case benchmark:\n');

  for (const [name, array] of Object.entries(cases)) {
    const quickMs = measure((arr) => quickSortOptimized(arr), array);
    const builtInMs = measure(builtInSort, array);

    console.log(`${name.padEnd(16)} | QuickSort optimized: ${quickMs.toFixed(3)} ms | Built-in: ${builtInMs.toFixed(3)} ms`);
  }

  console.log('');
}

if (require.main === module) {
  runBenchmark(40000, 5);
  runEdgeCaseBenchmarks();
}