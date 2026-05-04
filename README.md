# Sorting Algorithm Visualizer

An interactive web-based visualization tool for understanding how different sorting algorithms work step by step. Watch the sorting process unfold with real-time animations, color-coded actions, and detailed execution traces.

## Features

- **Multiple Sorting Algorithms**: QuickSort, Bubble Sort, Insertion Sort, Merge Sort, Selection Sort
- **Step-by-Step Visualization**: See each comparison, swap, and pivot operation in real-time
- **Custom Input**: Enter any comma-separated array to visualize
- **Color-Coded Actions**: 
  - **Pivot** - Green highlight for pivot selection
  - **Comparing** - Yellow/Gold for value comparisons
  - **Swapping** - Blue for element swaps
  - **Sorted** - Green for finalized sorted elements
- **Live Code Highlighting**: See the exact line of code executing at each step
- **Call Stack Visualization**: Track recursive function calls for recursive algorithms
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Performance Metrics**: Original vs. sorted array output

## Algorithms Included

1. **QuickSort** - Divide-and-conquer with pivot-based partitioning
2. **Bubble Sort** - Simple comparison-based sorting
3. **Insertion Sort** - Efficient for small datasets
4. **Merge Sort** - Stable O(n log n) divide-and-conquer
5. **Selection Sort** - Find minimum and place at correct position

## How to Use

1. **Select Algorithm**: Choose a sorting algorithm from the dropdown
2. **Enter Array**: Input comma-separated numbers (e.g., `3, 5, 2, 6, 1`)
3. **Visualize**: Click the "Visualize" button to start the animation
4. **Reset**: Click "Reset" to clear and start over

## Installation

No installation required! Open `quicksort.html` in any modern web browser.

### Optional: Local Development Server
```bash
# If you have Python installed
python -m http.server 8000

# Or with Node.js
npx http-server
