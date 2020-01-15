---
menu: Data Structures
name: Understanding Sorting Algorithms
---

# Understanding Sorting Algorithms

## Resources

1. [Time Complexities of Sorting Algorithms](https://www.geeksforgeeks.org/time-complexities-of-all-sorting-algorithms/)
2. [Big-O For Sorting Algorithms](https://www.geeksforgeeks.org/time-complexities-of-all-sorting-algorithms/)
3. [sorting.at](http://sorting.at/)
4. [Visual Go](https://visualgo.net/bn/sorting)

## Big-O Time Complexity from Algorithms

| Algorithm      | Best        | Average     | Worst       |
| -------------- | ----------- | ----------- | ----------- |
| Selection Sort | Ω(n^2)      | θ(n^2)      | O(n^2)      |
| Bubble Sort    | Ω(n)        | θ(n^2)      | O(n^2)      |
| Insertion Sort | Ω(n)        | θ(n^2)      | O(n^2)      |
| Heap Sort      | Ω(n log(n)) | θ(n log(n)) | O(n log(n)) |
| Quick Sort     | Ω(n log(n)) | θ(n log(n)) | O(n^2)      |
| Merge Sort     | Ω(n log(n)) | θ(n log(n)) | O(n log(n)) |
| Bucket Sort    | Ω(n+k)      | θ(n+k)      | O(n^2)      |
| Radix Sort     | Ω(nk)       | θ(nk)       | O(nk)       |

## Selection Sort

```text
repeat (numOfElements - 1) times

  set the first unsorted element as the minimum

  for each of the unsorted elements

    if element < currentMinimum

      set element as new minimum

  swap minimum with first unsorted position
```

The analogy: Imagine a line of people of vary heights. We want to set them from shortest to tallest. What we want to do is the following.

1. Set the first unsorted person as the current minimum.
2. Go up the entire line and set a new marker on the shortest person.
3. Once you have the marker and have gone through the line, return to the position of the unsorted person.
4. Swap the unsorted person with the marked shortest person for that iteration.
5. Repeat from the next unsorted person.
