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
5. [Pivoting to Quick Sort](https://medium.com/basecs/pivoting-to-understand-quicksort-part-1-75178dfb9313)

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

The analogy: Imagine a line of people of vary heights. We want to set them from shortest to tallest. We set a marker at the first person. Then from the marker to be the current minimum, and we iterate through the list and compare to the minimum. If the current position is less, we set that position for the current minimum value.

Once we have our minimum and complete the iteration, we compare the marker and the min marker, and if the min marker is less than the marker we swap places.

1. Set the first unsorted person as the current minimum.
2. Go up the entire line and set a new marker on the shortest person.
3. Once you have the marker and have gone through the line, return to the position of the unsorted person. Swap the unsorted person with the marked shortest person for that iteration.
4. Repeat from the next unsorted person.

## Selection Sort Implementation

```javascript
const selectionSort = array => {
  // 1. Set the marker to be the first unsorted member
  // 2. Iterate through the list and set the marker to be an number less than the current marker
  // 3. When list is complete, swap elements
  // 4. Repeat with next marker
  for (let i = 0; i < array.length; i++) {
    let marker = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[marker]) {
        marker = j;
      }
    }

    let tempMember = array[i];
    array[i] = array[marker];
    array[marker] = tempMember;
  }
  return array;
};

module.exports = {
  selectionSort,
};
```

## Bubble Sort

## Bubble Sort Implementation

```javascript
const sort = array => {
  // 1. do (while swapped)
  // 2. set swapped to false
  // 3. set marker to 1
  // 4. iterate through array comparing "sibling" pairs
  // 5. if first sibling less than other, swap siblings
  // 6. set swapped to true
  let swapped = true;
  do {
    swapped = false;
    for (let i = 1; i < array.length; i++) {
      if (array[i] < array[i - 1]) {
        let temp = array[i];
        array[i] = array[i - 1];
        array[i - 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
  return array;
};

module.exports = {
  sort,
};
```

## Merge Sort Implementation

```javascript
const mergeSort = array => {
  // 1. base case length === 1 return array
  // 2. set left and right array based on midpoint, recursively call
  // 3. after recursive calls return, merge together
  if (array.length < 2) {
    return array;
  }

  const midpoint = Math.floor(array.length / 2);
  const leftArray = array.slice(0, midpoint);
  const rightArray = array.slice(midpoint);

  mergeSort(leftArray);
  mergeSort(rightArray);

  return merge(leftArray, rightArray, array);
};

const merge = (leftArray, rightArray, array) => {
  let index = 0;

  while (leftArray.length && rightArray.length) {
    if (rightArray[0] < leftArray[0]) {
      array[index++] = rightArray.shift();
    } else {
      array[index++] = leftArray.shift();
    }
  }

  while (leftArray.length) {
    array[index++] = leftArray.shift();
  }

  while (rightArray.length) {
    array[index++] = rightArray.shift();
  }

  return array;
};

module.exports = {
  sort: mergeSort,
};
```

## Quick Sort

Quicksort is a divide + conquer algorithm that sorts a collecton by choosing a pivot point, and partitioning the collection around the pivot, so that elements smaller than the pivot are before it, and elements larger are after it.

It continues to choose a pivot point and break down the collection into single-element lists, before combining them back together to form one sorted list.

1. Determine the `pivot`, which is a somewhat arbitrary element in the collection.
2. Using that pivot point, partition the larger unsorted colelction into two smaller lists. It uses some smart logic to decide on the partition: it moves all the smaller elements before the pivot element and larger after the pivot element.

![Quicksort in action](https://miro.medium.com/max/3008/1*cHKEM0Ni1YaU8WeEgepq3g.jpeg)

For this example, we take wisdom from resource [5]:

> We’ll choose the last element as the pivot for now. As it turns out, there are many different ways to choose a pivot element, and what you choose does matter — but more on that in a bit. It’s pretty common to see implementations of quicksort with the last element as the pivot, so that’s what we’ll do here, too.

Also from the article:

> A quicksort algorithm should always aim to choose the middle-most element as its pivot. Some algorithms will _literally_ select the center-most item as the pivot, while others will select the first or the last element. But when we say “middle-most” element, what we mean is an element at the median of the entire unsorted collection. This ends up being super crucial because we want the two partitioned halves — the elements smaller than the pivot and the elements larger than the pivot — to be mostly equal. If they’re unequal or lopsided, we can run into some big problems!

## Quick Sort in Action

Given the array `[9, 12, 9, 2, 17, 1, 6]`:

![Quicksort in action](https://miro.medium.com/max/3392/1*rjpGqzlhNO8SdqgQYAp76w.jpeg)

![Quicksort Recursion](https://miro.medium.com/max/3264/1*md0dT0BAlkRiWlWnbH61GQ.jpeg)

![Quicksort conquering](https://miro.medium.com/max/2944/1*d5Ampu8dRE_N0X3MLcGBOw.jpeg)

Quicksort here doesn't create a new array and copies elements in correct order, but that is not exactly the case. Quicksort is preferred because it doesn't take up much space during sorting. It does this by swapping instead.

## Quick Sort Algorithm

1. Choose a pivot (normally highest index)
2. Choose left reference (lowest index)
3. Choose right reference (highest but not pivot)
4. While left ref is less than pivot, move pointer up one to the right. While right ref is more than pivot, move pointer one element to the left.
5. If both left is greater and right is smaller than pivot, swap the two references.
6. Once the index of the left is greater than (or equal to) the index of the right reference, swap the pivot with the element at the left reference.

![Running the steps part 1](https://miro.medium.com/max/3392/1*sxpPWeeEHFmFh9dL3C0J8Q.jpeg)
![Running the steps part 2](https://miro.medium.com/max/3520/1*4sq6T2DrkV8SZX-c0pheZQ.jpeg)
![Running the steps part 3](https://miro.medium.com/max/3420/1*RTi3gv4W5L-avsKJ26b0CQ.jpeg)

## Quick Sort Implementation

The swap function itself is not very complicated. The important thing to remember is the recursive quicksort function and the partitioning.

The mental model and analogy most relevant to myself here is the boxing analogy. A boxer with a dominant right and weaker left will want to bring the left up to the pivot and right down to it.

Consider each partition almost like a sparring session. We set the pivot to be the middle level between the left and right, and then while the left is less than or equal to the right in strength, we iterate through a "training".

Each training requires that while the array[left] is less than the pivot, we push up the left value. While the array[right] is more than the pivot value, we pull it down. Imagine pushing the strength of pushing punches on one side and pulling them back on the other.

Finally, at the end of the that iteration of training, if the left value itself (the index and not the list value) is less than the right, we swap the strength levels (elements) at those places and push the left strength value up again by one and reduce the right by one.

```javascript
/**
 * Remember by thinking your dominate right should always be strong (bigger) or equal
 * to your left. Within that condition, your left wants to reach the pivot, the right
 * wants to come down to its level. Once all is said and done, if left is smaller than
 * right, swap the values.
 *
 * @param {*} array
 * @param {*} left
 * @param {*} right
 * @returns
 */
const partition = (array, left, right) => {
  const pivot = array[Math.floor((left + right) / 2)];
  while (left <= right) {
    // Continue shifting the left index up until larger than pivot
    while (array[left] < pivot) {
      left++;
    }

    // Continue shifting the right index down until larger than pivot
    while (array[right] > pivot) {
      right--;
    }

    // if left is smaller or equal to right, swap and push left and right indexes down
    if (left <= right) {
      const temp = array[left];
      array[left] = array[right];
      array[right] = temp;

      left++;
      right--;
    }
  }
  return left;
};

/**
 * Remember using "LEFT RIGHT PIVOT, LEFT PIVOT, PIVOT RIGHT" boxing mental model.
 *
 *
 * @param {*} array
 * @param {*} leftIndex
 * @param {*} rightIndex
 * @returns
 */
const quickSort = (array, leftIndex, rightIndex) => {
  // recursion base case
  if (array.length < 2) {
    return array;
  }

  // set pivot through partition
  let pivotIndex = partition(array, leftIndex, rightIndex);

  // recursively call quick sort if pivot - 1 is still larger than left index
  if (leftIndex < pivotIndex - 1) {
    quickSort(array, leftIndex, pivotIndex - 1);
  }

  // recursively call quick sort if right index is still larger than pivot
  if (pivotIndex < rightIndex) {
    quickSort(array, pivotIndex, rightIndex);
  }
  return array;
};

const sort = array => {
  console.log(array);
  quickSort(array, 0, array.length - 1);
  console.log(array);
  return array;
};

module.exports = {
  sort,
};
```

## Quick Sort Shorter Implementation

This pivot uses the first index of the array and also has a bigger space complexity.

```javascript
// Create an array to sort
var array = [9, 2, 5, 6, 4, 3, 7, 10, 1, 12, 8, 11];

// Basic implementation (pivot is the first element of the array)
function quicksort(array) {
  if (array.length == 0) return [];

  var left = [],
    right = [],
    pivot = array[0];

  for (var i = 1; i < array.length; i++) {
    if (array[i] < pivot) left.push(array[i]);
    else right.push(array[i]);
  }

  return quicksort(left).concat(pivot, quicksort(right));
}

console.log(quicksort(array.slice())); // => [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
```

## Quick Sort Warning

Two unequally-sized partitions can be problematic. Why? See the following:

![Problematic Quicksort](https://miro.medium.com/max/3392/1*AuOVk7USUwVhrbmejkg5sQ.jpeg)

Time complexity of quicksort is dependent upon what we choose to be our partition and how sorted the list already is.

Average runtime for an unsorted list + partition close to median is O(n log n).

Average runtime for a sorted (or near-sorted) list or a partition that is far from the median is O(n^2).

Don't use quicksort for nearly sorted lists.
