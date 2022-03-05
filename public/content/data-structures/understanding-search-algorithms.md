---
menu: Data Structures
name: Understanding Search Algorithms
---

# Understanding Search Algorithms

## Resources

1. [Binary Search Hacker Noons](https://hackernoon.com/programming-with-js-binary-search-aaf86cef9cb3)
2. [Rotated Array](https://programmingpraxis.com/2010/10/12/rotate-an-array/)

## Linear Search Analogy

We have an unsorted queue of people of various heights and sizes. How can we find if a person of a particular height exists in this queue? We can simply iterate through the queue and return the position of the person in the queue if found (ie index in the array) or `-1` to signify they do not exist! This runs in O(n) time.

## Linear Search Implementation

```javascript
const linearSearch = (arr, needle) => {
  for (let [index, value] of Object.entries(arr)) {
    if (value === needle) {
      return index;
    }
  }

  return -1;
};
```

## Binary Search Analogy

Imagine you have a queue of people in a numerically sorted arrangement from shortest to tallest. What is the most efficient way for us to search through them given a particular height that we wish to find?

The answer is the `binary search`. We set a start marker to be index 0, and we set the end marker to be the count for the number of people in our queue (in computer speak, the length of the array). While the start marker is less than the end marker, we iterate through with a method of finding the mid point between the start and end marker ((start + end) / 2).

If that value found at the midpoint is equal to the needle, we return that mid point value as it equates to the index in the array.

If we do not, we first check if that array value at that index is smaller than the needle. If yes, we increase the start marker by one. This enables us to search the next midpoint which will be a bigger value than before. If it is not, we decrease the end marker by one. This enables us to search the next midpoint which will be a smaller value than before. Remember: this happens because our use case is that the list has been sorted.

This search enables us to perform with O(log n).

## Binary Search Implementation

```javascript
const binarySearch = (arr, needle) => {
  let start = 0;
  let end = arr.length;

  while (start < end) {
    let mid = Math.floor((start + end) / 2);
    if (arr[mid] === needle) {
      return mid;
    } else if (arr[mid] < needle) {
      start++;
    } else {
      end--;
    }
  }

  return -1;
};

module.exports = {
  search,
};
```
