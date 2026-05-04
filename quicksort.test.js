const assert = require('assert');
const {
  quickSort,
  quickSortOptimized,
  quickSortIterative
} = require('./quicksort');

function sortedCopy(arr) {
  return arr.slice().sort((a, b) => a - b);
}

const implementations = {
  quickSort,
  quickSortOptimized,
  quickSortIterative
};

describe('QuickSort implementations', () => {
  Object.entries(implementations).forEach(([name, sortFn]) => {
    it(`${name} should handle an empty array`, () => {
      assert.deepStrictEqual(sortFn([]), []);
    });

    it(`${name} should handle a single-element array`, () => {
      assert.deepStrictEqual(sortFn([42]), [42]);
    });

    it(`${name} should sort an already sorted array`, () => {
      const input = [1, 2, 3, 4, 5];
      assert.deepStrictEqual(sortFn(input.slice()), input);
    });

    it(`${name} should sort a reverse sorted array`, () => {
      const input = [5, 4, 3, 2, 1];
      assert.deepStrictEqual(sortFn(input.slice()), sortedCopy(input));
    });

    it(`${name} should sort an array with duplicate values`, () => {
      const input = [4, 1, 3, 4, 2, 4, 1];
      assert.deepStrictEqual(sortFn(input.slice()), sortedCopy(input));
    });

    it(`${name} should sort an array where all values are equal`, () => {
      const input = [7, 7, 7, 7, 7];
      assert.deepStrictEqual(sortFn(input.slice()), input);
    });

    it(`${name} should sort a large random dataset`, () => {
      const large = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 10000));
      assert.deepStrictEqual(sortFn(large.slice()), sortedCopy(large));
    });
  });
  
})