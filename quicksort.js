/**
 * Simple recursive QuickSort implementation.
 *
 * This is the base version, kept simple for clarity.
 * It chooses the last element as pivot and recursively sorts both partitions.
 *
 * @param {number[]} arr - Array to sort.
 * @param {number} [low=0] - Start index.
 * @param {number} [high=arr.length - 1] - End index.
 * @returns {number[]} Sorted array in-place.
 */
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (!Array.isArray(arr)) {
        throw new TypeError('Input must be an array');
    }

    if (low < high) {
        const pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);  // Sort left partition
        quickSort(arr, pivotIndex + 1, high); // Sort right partition
    }

    return arr;
}

/**
 * Partition helper for QuickSort.
 *
 * Chooses the last element as the pivot and rearranges the array
 * so that values <= pivot are on the left, and values > pivot are on the right.
 *
 * @param {number[]} arr - Array being sorted.
 * @param {number} low - Start index for partitioning.
 * @param {number} high - End index for partitioning.
 * @returns {number} Final pivot index.
 */
function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap to move smaller element left
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Place pivot in correct position
    return i + 1;
}

/**
 * Insertion sort used for small partitions.
 *
 * QuickSort is less efficient on very small subarrays due to recursion overhead,
 * so this hybrid approach improves overall performance.
 *
 * @param {number[]} arr - Array to sort.
 * @param {number} low - Start index.
 * @param {number} high - End index.
 */
function insertionSort(arr, low, high) {
    for (let i = low + 1; i <= high; i++) {
        const value = arr[i];
        let j = i - 1;
        while (j >= low && arr[j] > value) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = value;
    }
}

/**
 * Optimized recursive QuickSort.
 *
 * Improvements over the simple version:
 * - uses insertion sort for small partitions
 * - always recurses on the smaller partition first
 * - uses a loop for the larger partition to reduce recursion depth
 *
 * This keeps stack usage closer to O(log n) on average.
 *
 * @param {number[]} arr - Array to sort.
 * @returns {number[]} Sorted array in-place.
 */
function quickSortOptimized(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('Input must be an array');
    }

    function sort(low, high) {
        while (low < high) {
            // Use insertion sort for small ranges
            if (high - low <= 16) {
                insertionSort(arr, low, high);
                break;
            }

            const pivotIndex = partition(arr, low, high);

            const leftSize = pivotIndex - low;
            const rightSize = high - pivotIndex;

            // Recurse on the smaller partition first
            if (leftSize < rightSize) {
                sort(low, pivotIndex - 1);
                low = pivotIndex + 1; // Tail-call elimination for the larger side
            } else {
                sort(pivotIndex + 1, high);
                high = pivotIndex - 1; // Tail-call elimination for the larger side
            }
        }
    }

    sort(0, arr.length - 1);
    return arr;
}

/**
 * Iterative QuickSort using an explicit stack.
 *
 * This version avoids recursion completely by managing its own stack.
 * It still performs in-place partitioning and uses the same partition helper.
 *
 * @param {number[]} arr - Array to sort.
 * @returns {number[]} Sorted array in-place.
 */
function quickSortIterative(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('Input must be an array');
    }

    const stack = [{ low: 0, high: arr.length - 1 }];

    while (stack.length > 0) {
        const { low, high } = stack.pop();
        if (low >= high) continue;

        if (high - low <= 16) {
            insertionSort(arr, low, high);
            continue;
        }

        const pivotIndex = partition(arr, low, high);

        const leftSize = pivotIndex - 1 - low;
        const rightSize = high - (pivotIndex + 1);

        // Push larger partition first so smaller partition is processed next
        if (leftSize > rightSize) {
            if (low < pivotIndex - 1) stack.push({ low, high: pivotIndex - 1 });
            if (pivotIndex + 1 < high) stack.push({ low: pivotIndex + 1, high });
        } else {
            if (pivotIndex + 1 < high) stack.push({ low: pivotIndex + 1, high });
            if (low < pivotIndex - 1) stack.push({ low, high: pivotIndex - 1 });
        }
    }

    return arr;
}

/**
 * Bubble Sort implementation.
 *
 * Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.
 *
 * @param {number[]} arr - Array to sort.
 * @returns {number[]} Sorted array in-place.
 */
function bubbleSort(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('Input must be an array');
    }

    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

/**
 * Insertion Sort implementation.
 *
 * Builds the final sorted array one item at a time.
 *
 * @param {number[]} arr - Array to sort.
 * @returns {number[]} Sorted array in-place.
 */
function insertionSort(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('Input must be an array');
    }

    const n = arr.length;
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}

/**
 * Merge Sort implementation.
 *
 * Divides the array into two halves, sorts them recursively, then merges the sorted halves.
 *
 * @param {number[]} arr - Array to sort.
 * @returns {number[]} Sorted array.
 */
function mergeSort(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('Input must be an array');
    }

    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
}

/**
 * Selection Sort implementation.
 *
 * Repeatedly finds the minimum element from the unsorted portion and puts it at the beginning.
 *
 * @param {number[]} arr - Array to sort.
 * @returns {number[]} Sorted array in-place.
 */
function selectionSort(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('Input must be an array');
    }

    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
}

/**
 * Build trace for Bubble Sort visualization.
 *
 * @param {number[]} numbers - Array to sort.
 * @returns {Array} Array of steps for visualization.
 */
function buildBubbleSortTrace(numbers) {
    const arr = numbers.slice();
    const steps = [];
    const n = arr.length;

    function createStep({
        line,
        message,
        arr,
        active = [],
        swap = [],
        sorted = [],
    }) {
        return {
            line,
            message,
            arr: arr.slice(),
            low: 0,
            high: n - 1,
            pivotIndex: null,
            active,
            swap,
            stack: [],
            sorted: sorted.slice(),
        };
    }

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            steps.push(createStep({
                line: 1,
                message: `Compare arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]})`,
                arr,
                active: [j, j + 1],
            }));

            if (arr[j] > arr[j + 1]) {
                steps.push(createStep({
                    line: 2,
                    message: `Swap arr[${j}] and arr[${j + 1}]`,
                    arr,
                    active: [j, j + 1],
                    swap: [j, j + 1],
                }));
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
        steps.push(createStep({
            line: 3,
            message: `End of pass ${i + 1}, largest element bubbled to position ${n - i - 1}`,
            arr,
            sorted: Array.from({ length: i + 1 }, (_, idx) => n - 1 - idx),
        }));
    }

    steps.push(createStep({
        line: 4,
        message: 'Bubble Sort complete',
        arr,
        sorted: Array.from({ length: n }, (_, idx) => idx),
    }));

    return steps;
}

/**
 * Build trace for Insertion Sort visualization.
 *
 * @param {number[]} numbers - Array to sort.
 * @returns {Array} Array of steps for visualization.
 */
function buildInsertionSortTrace(numbers) {
    const arr = numbers.slice();
    const steps = [];
    const n = arr.length;

    function createStep({
        line,
        message,
        arr,
        active = [],
        swap = [],
        sorted = [],
    }) {
        return {
            line,
            message,
            arr: arr.slice(),
            low: 0,
            high: n - 1,
            pivotIndex: null,
            active,
            swap,
            stack: [],
            sorted: sorted.slice(),
        };
    }

    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;

        steps.push(createStep({
            line: 1,
            message: `Take key = arr[${i}] = ${key}`,
            arr,
            active: [i],
        }));

        while (j >= 0 && arr[j] > key) {
            steps.push(createStep({
                line: 2,
                message: `Compare arr[${j}] (${arr[j]}) > key (${key}), shift right`,
                arr,
                active: [j, j + 1],
            }));
            arr[j + 1] = arr[j];
            steps.push(createStep({
                line: 3,
                message: `Shift arr[${j}] to arr[${j + 1}]`,
                arr,
                active: [j, j + 1],
                swap: [j, j + 1],
            }));
            j--;
        }

        arr[j + 1] = key;
        steps.push(createStep({
            line: 4,
            message: `Insert key at position ${j + 1}`,
            arr,
            active: [j + 1],
            sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
        }));
    }

    steps.push(createStep({
        line: 5,
        message: 'Insertion Sort complete',
        arr,
        sorted: Array.from({ length: n }, (_, idx) => idx),
    }));

    return steps;
}

/**
 * Build trace for Merge Sort visualization.
 *
 * @param {number[]} numbers - Array to sort.
 * @returns {Array} Array of steps for visualization.
 */
function buildMergeSortTrace(numbers) {
    const arr = numbers.slice();
    const steps = [];
    const n = arr.length;

    function createStep({
        line,
        message,
        arr,
        active = [],
        swap = [],
        sorted = [],
    }) {
        return {
            line,
            message,
            arr: arr.slice(),
            low: 0,
            high: n - 1,
            pivotIndex: null,
            active,
            swap,
            stack: [],
            sorted: sorted.slice(),
        };
    }

    function mergeTrace(left, right, start) {
        const result = [];
        let i = 0, j = 0, k = start;

        while (i < left.length && j < right.length) {
            steps.push(createStep({
                line: 1,
                message: `Compare ${left[i]} and ${right[j]}`,
                arr,
                active: [k],
            }));

            if (left[i] <= right[j]) {
                arr[k] = left[i];
                steps.push(createStep({
                    line: 2,
                    message: `Take ${left[i]} from left array`,
                    arr,
                    active: [k],
                }));
                result.push(left[i++]);
            } else {
                arr[k] = right[j];
                steps.push(createStep({
                    line: 3,
                    message: `Take ${right[j]} from right array`,
                    arr,
                    active: [k],
                }));
                result.push(right[j++]);
            }
            k++;
        }

        while (i < left.length) {
            arr[k] = left[i];
            steps.push(createStep({
                line: 4,
                message: `Copy remaining ${left[i]} from left`,
                arr,
                active: [k],
            }));
            result.push(left[i++]);
            k++;
        }

        while (j < right.length) {
            arr[k] = right[j];
            steps.push(createStep({
                line: 5,
                message: `Copy remaining ${right[j]} from right`,
                arr,
                active: [k],
            }));
            result.push(right[j++]);
            k++;
        }

        return result;
    }

    function mergeSortTrace(arr, start = 0) {
        if (arr.length <= 1) {
            steps.push(createStep({
                line: 6,
                message: `Base case: array of length ${arr.length}`,
                arr: numbers.slice(),
            }));
            return arr;
        }

        const mid = Math.floor(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);

        steps.push(createStep({
            line: 7,
            message: `Split into left: [${left}] and right: [${right}]`,
            arr: numbers.slice(),
        }));

        const sortedLeft = mergeSortTrace(left, start);
        const sortedRight = mergeSortTrace(right, start + mid);

        return mergeTrace(sortedLeft, sortedRight, start);
    }

    mergeSortTrace(arr);
    steps.push(createStep({
        line: 8,
        message: 'Merge Sort complete',
        arr,
        sorted: Array.from({ length: n }, (_, idx) => idx),
    }));

    return steps;
}

/**
 * Build trace for Selection Sort visualization.
 *
 * @param {number[]} numbers - Array to sort.
 * @returns {Array} Array of steps for visualization.
 */
function buildSelectionSortTrace(numbers) {
    const arr = numbers.slice();
    const steps = [];
    const n = arr.length;

    function createStep({
        line,
        message,
        arr,
        active = [],
        swap = [],
        sorted = [],
    }) {
        return {
            line,
            message,
            arr: arr.slice(),
            low: 0,
            high: n - 1,
            pivotIndex: null,
            active,
            swap,
            stack: [],
            sorted: sorted.slice(),
        };
    }

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        steps.push(createStep({
            line: 1,
            message: `Find minimum in unsorted portion starting at index ${i}`,
            arr,
            active: [i],
        }));

        for (let j = i + 1; j < n; j++) {
            steps.push(createStep({
                line: 2,
                message: `Compare arr[${j}] (${arr[j]}) with current min arr[${minIndex}] (${arr[minIndex]})`,
                arr,
                active: [j, minIndex],
            }));

            if (arr[j] < arr[minIndex]) {
                minIndex = j;
                steps.push(createStep({
                    line: 3,
                    message: `New minimum found at index ${minIndex}`,
                    arr,
                    active: [j],
                }));
            }
        }

        if (minIndex !== i) {
            steps.push(createStep({
                line: 4,
                message: `Swap arr[${i}] and arr[${minIndex}]`,
                arr,
                active: [i, minIndex],
                swap: [i, minIndex],
            }));
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }

        steps.push(createStep({
            line: 5,
            message: `Position ${i} is now sorted`,
            arr,
            sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
        }));
    }

    steps.push(createStep({
        line: 6,
        message: 'Selection Sort complete',
        arr,
        sorted: Array.from({ length: n }, (_, idx) => idx),
    }));

    return steps;
}

/**
 * Build trace for QuickSort visualization.
 *
 * @param {number[]} numbers - Array to sort.
 * @returns {Array} Array of steps for visualization.
 */
function buildQuickSortTrace(numbers) {
    const arr = numbers.slice();
    const steps = [];
    const stack = [];
    const sorted = [];

    function createStep({
        line,
        message,
        arr,
        low,
        high,
        pivotIndex,
        active = [],
        swap = [],
        stack = [],
        sorted = [],
    }) {
        return {
            line,
            message,
            arr: arr.slice(),
            low,
            high,
            pivotIndex,
            active,
            swap,
            stack: stack.slice(),
            sorted: sorted.slice(),
        };
    }

    function trace(line, data = {}) {
        steps.push(createStep({ line, arr, stack, sorted, ...data }));
    }

    function partitionTrace(low, high) {
        trace(11, {
            message: `Select pivot at index ${high}`,
            low,
            high,
            pivotIndex: high,
        });
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            trace(14, {
                message: `Compare arr[${j}] (${arr[j]}) <= pivot (${pivot})`,
                low,
                high,
                pivotIndex: high,
                active: [j],
                swap: [],
            });
            if (arr[j] <= pivot) {
                trace(15, {
                    message: `Value is <= pivot, increase i and swap`,
                    low,
                    high,
                    pivotIndex: high,
                    active: [j],
                    swap: [],
                });
                i += 1;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                trace(16, {
                    message: `Swap arr[${i}] and arr[${j}]`,
                    low,
                    high,
                    pivotIndex: high,
                    active: [i, j],
                    swap: [i, j],
                });
            }
        }

        trace(19, {
            message: `Swap pivot into correct position at index ${i + 1}`,
            low,
            high,
            pivotIndex: high,
            active: [i + 1, high],
            swap: [i + 1, high],
        });
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        const pivotPosition = i + 1;
        sorted.push(pivotPosition);
        trace(20, {
            message: `Partition complete: pivot index is ${pivotPosition}`,
            low,
            high,
            pivotIndex: pivotPosition,
            active: [],
            swap: [],
        });
        return pivotPosition;
    }

    function quickSortTrace(low, high) {
        stack.push([low, high]);
        trace(1, {
            message: `QuickSort called for range [${low}, ${high}]`,
            low,
            high,
            pivotIndex: null,
            active: [],
            swap: [],
        });
        if (low < high) {
            trace(5, {
                message: `Range has more than one item, partitioning range`,
                low,
                high,
                pivotIndex: null,
                active: [],
                swap: [],
            });
            const pivotPosition = partitionTrace(low, high);
            trace(6, {
                message: `Recursing left side [${low}, ${pivotPosition - 1}]`,
                low,
                high,
                pivotIndex: pivotPosition,
                active: [],
                swap: [],
            });
            quickSortTrace(low, pivotPosition - 1);
            trace(7, {
                message: `Recursing right side [${pivotPosition + 1}, ${high}]`,
                low,
                high,
                pivotIndex: pivotPosition,
                active: [],
                swap: [],
            });
            quickSortTrace(pivotPosition + 1, high);
        }
        trace(9, {
            message: `Return from QuickSort call`,
            low,
            high,
            pivotIndex: null,
            active: [],
            swap: [],
        });
        stack.pop();
    }

    quickSortTrace(0, arr.length - 1);
    return steps;
}

/**
 * Complexity summary:
 *
 * QuickSort:
 * - Average time: O(n log n)
 * - Best time: O(n log n)
 * - Worst time: O(n^2) when pivot choices are poor
 * - Space: O(1) auxiliary + O(log n) recursion or stack on average
 *
 * MergeSort:
 * - Time: O(n log n) always
 * - Space: O(n) auxiliary
 *
 * HeapSort:
 * - Time: O(n log n) always
 * - Space: O(1) auxiliary
 *
 * Built-in JS sort:
 * - Usually O(n log n) average and worst-case for modern engines
 * - Space: typically O(n) auxiliary for TimSort
 * - Usually the best practical choice for general use
 */


const sortingAlgorithms = {
    quickSort,
    quickSortOptimized,
    quickSortIterative,
    bubbleSort,
    insertionSort,
    mergeSort,
    selectionSort,
    buildQuickSortTrace,
    buildBubbleSortTrace,
    buildInsertionSortTrace,
    buildMergeSortTrace,
    buildSelectionSortTrace,
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = sortingAlgorithms;
}

if (typeof window !== 'undefined') {
    window.sortingAlgorithms = sortingAlgorithms;
}