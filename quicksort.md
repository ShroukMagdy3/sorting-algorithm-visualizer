# QuickSort in JavaScript

This document explains a QuickSort implementation in JavaScript and how it works.

## What is QuickSort?

QuickSort is a divide-and-conquer sorting algorithm. It works by selecting a pivot element, then partitioning the array so that values less than the pivot come before it and values greater than or equal to the pivot come after it. The algorithm then recursively sorts the left and right partitions.

## Files created

- `quicksort.js` — JavaScript implementation with comments and example usage.

## How the code works

### `quickSort(arr, low, high)`

- `arr`: the array to sort.
- `low`: the starting index of the sub-array that should be sorted.
- `high`: the ending index of the sub-array that should be sorted.

Steps:

1. Check if `arr` is an array. If not, throw a `TypeError`.
2. If the current range has more than one element (`low < high`), partition the range.
3. Recursively sort the left side of the pivot.
4. Recursively sort the right side of the pivot.
5. Return the sorted array.

### `partition(arr, low, high)`

- Selects the element at `arr[high]` as the pivot.
- Uses index `i` to track the boundary of values less than or equal to the pivot.
- Iterates from `low` to `high - 1`:
  - If the current item is `<= pivot`, increment `i` and swap the current item with the item at `i`.
- After the loop, swap the pivot into its final position at `i + 1`.
- Returns the pivot index.

## Example

```js
const sampleArray = [33, 10, 55, 71, 29, 4, 18];
console.log('Original array:', sampleArray);
console.log('Sorted array:  ', quickSort(sampleArray));
```

Expected output:

```
Original array: [33, 10, 55, 71, 29, 4, 18]
Sorted array:   [4, 10, 18, 29, 33, 55, 71]
```

## Notes

- This implementation sorts the array in place.
- The average time complexity is `O(n log n)`.
- The worst-case time complexity is `O(n^2)` when the pivot selection is poor (for example, already sorted data with a bad pivot strategy).
- You can improve pivot selection by choosing a random pivot or the median of the first, middle, and last elements.
