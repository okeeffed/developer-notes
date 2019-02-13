---
name: JS Data Structures
menu: Data Structures
---

# JavaScript Data Structures

## String reversal

```javascript
const str = 'test';

const reverseOne = (str) => {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed = reversed + str[i];
  }

  return reversed;
};

const reverseTwo = (str) => {
  return str
    .split('')
    .reverse()
    .join('');
};

const reverseThree = (str) => {
  let reversed = '';
  for (let char of str) {
    reversed = char + reversed;
  }

  return reversed;
};

const reverseFour = (str) => {
  let arr = str.split('').reduce((reversed, char) => {
    return char + reversed;
  }, '');

  return reversed;
};
```

## Basic debugger statements

Sometimes that we to pause during execution to do some debugging.

```javascript
const reverse = (str) => {
  debugger;
  let reversed = '';
  for (let char of str) {
    reversed = char + reversed;
  }

  return reversed;
};

reverse(str);
```

From within the terminal, we can then inspect by running:

```shell
node inspect path/to/file.js
cont # to continue execution (can also use c)
repl # kicks you into a js repl
```

## Palindromes

```javascript
const palindrome = (str) => {
  if (typeof str === String) {
    return str === reverse(str);
  } else {
    return false;
  }
};

palindrome('noon'); // true
palindrome('asdf'); // false

const palindromeTwo = (str) => {
  str.split('').every((char, index) => {
    if (i <= Math.ceil(str.length / 2)) {
      return char === str[str.length - 1 - index];
    }
  });
};
```

## Reverse Integer

```javascript
const reverseInt = (n) => {
  // Check if negative
  const isPos = Math.sign(n);
  // 1. cast to string
  const str = n.toString();
  // 2. reverse
  str
    .split('')
    .reverse()
    .join('');
  // 3. cast to int
  const revInt = parseInt(str);
  return isPos > 0 ? revInt : revInt * -1;
  // return isPos * Math.sign(n);
};
```

## Max Chars

```javascript
// 1
// maxChar('abccccccd'); // 'c'
const maxChar = (str) => {
    let obj = {};
    for (let char of str) {
        if (typeof obj[char] !== 'undefined') {
            obj[char] = obj[char] + 1l
        } else {
            obj[char] = 1;
        }
    }

    let maxChar = '';
    let max = 0;
    for (let key of obj) {
        if (obj[key] > max) {
            max = obj[key];
            maxChar = key;
        }
    }

    return maxChar;
};

// 2
const chars = {};
const maxCharTwo = str => {
    for (let char of str) {
        if (!chars[char]) {
            chars[char] = 1;
        } else {
            chars[char]++;
        }
    }

    let maxChar = '';
    let max = 0;

    for (let key of obj) {
        if (obj[key] > max) {
            max = obj[key];
            maxChar = key;
        }
    }
    return maxChar;
}

// 3
const maxCharThree = str => {
    for (let char of str) {
        chars[char] === !chars[char] ? 1 : chars[char]++;
    }
}
```

## Fizz Buzz

```javascript
let fizzBuzz = (i) => {
  switch (true) {
    case i % 3 === 0 && i % 5 === 0:
      return 'fizzbuzz';
    case i % 3 === 0:
      return 'fizz';
    case i % 5 === 0:
      return 'buzz';
    default:
      return i;
  }
};
```

## Array Chunk Problem

One solution:

```javascript
/**
 * Given an 1D array, chunk into 2D based on int
 *
 * @param {*} arr Init array
 * @param {*} i Chunk size
 * @returns {Object} Chunked array object
 */
let arrayChunk = (arr, i) => {
  let tmp = [];
  let chunkedArr = [];
  arr.map((d, index) => {
    tmp.push(d);
    if (index % i === i - 1) {
      chunkedArr.push(tmp);
      tmp = [];
    }
  });

  return chunkedArr;
};
```

Second solution:

```javascript
/**
 * Given an 1D array, chunk into 2D based on int
 *
 * @param {*} arr Init array
 * @param {*} i Chunk size
 * @returns {Object} Chunked array object
 */
let arrayChunk = (arr, i) => {
  const chunkedArr = [];
  for (let el of arr) {
    const last = chunkedArr[chunkedArr.length - 1];

    if (!last || last.length === size) {
      chunkedArr.push([el]);
    } else [
      last.push([el]);
    ]
  }
  return chunkedArr;
};
```

Third solution:

```javascript
/**
 * Given an 1D array, chunk into 2D based on int
 *
 * @param {*} arr Init array
 * @param {*} i Chunk size
 * @returns {Object} Chunked array object
 */
let arrayChunk = (arr, i) => {
  const chunkedArr = [];
  let start = 0;
  let index = 1;
  while (start < arr.length) {
    chunkedArr.push(arr.slice(start, index * i));

    start = start + i;
    index++;
  }
  return chunkedArr;
};
```

Fourth solution:

```javascript
/**
 * Given an 1D array, chunk into 2D based on int
 *
 * @param {*} arr Init array
 * @param {*} i Chunk size
 * @returns {Object} Chunked array object
 */
let arrayChunk = (arr, i) => {
  const chunkedArr = [];
  let start = 0;
  while (start < arr.length) {
    chunkedArr.push(arr.slice(start, start + i));
    start += i;
  }
  return chunkedArr;
};
```

## Anagrams

Solution one:

```javascript
const anagram = (strA, strB) => {
  // use regexp to remove spaces and grammar
  const cmpA = strA.replace(/[^\w]/g, '').toLowerCase();
  const cmpB = strB.replace(/[^\w]/g, '').toLowerCase();

  if (cmpA.length !== cmpB.length) {
    return false;
  }

  let charMapA = {};
  let charMapB = {};
  for (let i in cmpA) {
    if (!charMapA[cmpA[i]]) {
      charMapA[cmpA[i]] = 1;
    } else {
      charMapA[cmpA[i]] = charMapA[cmpA[i]]++;
    }

    if (!charMapB[cmpB[i]]) {
      charMapB[cmpB[i]] = 1;
    } else {
      charMapB[cmpB[i]] = charMapB[cmpB[i]]++;
    }
  }

  const keysA = Object.keys(charMapA);
  const keysB = Object.keys(charMapB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let k in keysA) {
    if (typeof keysB[k] === 'undefined') {
      return false;
    }

    if (keysA[k] !== keysB[k]) {
      return false;
    }
  }

  return true;
};
```

Solution two (basic refactor):

```javascript
const anagram = (strA, strB) => {
  const filterStr = (str) => str.replace(/[^\w]/g, '').toLowerCase();

  // use regexp to remove spaces and grammar
  const cmpA = filterStr(str);
  const cmpB = filterStr(str);

  if (cmpA.length !== cmpB.length) {
    return false;
  }

  let charMapA = {};
  let charMapB = {};
  const mapHelper = (i, str, map) => {
    if (!map[str[i]]) {
      map[str[i]] = 1;
    } else {
      map[str[i]] = map[str[i]]++;
    }
  };

  for (let i in cmpA) {
    mapHelper(i, cmpA, charMapA);
    mapHelper(i, cmpB, charMapB);
  }

  const keysA = Object.keys(charMapA);
  const keysB = Object.keys(charMapB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let k in keysA) {
    if (typeof keysB[k] === 'undefined') {
      return false;
    }

    if (keysA[k] !== keysB[k]) {
      return false;
    }
  }

  return true;
};
```

Solution three:

```javascript
const anagrams = (strA, strB) => {
  const charMapA = buildCharMap(strA);
  const charMapB = buildCharMap(strB);

  if (Object.keys(charMapA).length !== Object.keys(charMapB).length) {
    return false;
  }

  for (let char in charMapA) {
    if (aCharMap[char] !== bCharMap[char]) {
      return false;
    }
  }

  return true;
};

const buildCharMap = (str) => {
  const charMap = {};
  for (let char of str.replace(/[^\w]/g, '').toLowerCase()) {
    charMap[char] = charMap[char] + 1 || 1;
  }

  return charMap;
};
```

Solution four:

```javascript
const anagrams = (strA, strB) => cleanStr(strA) === cleanStr(strB);

const cleanStr = (str) =>
  str
    .replace(/[^\w]/g, '')
    .toLowerCase()
    .split('')
    .sort()
    .join('');
```

## Capitalising a sentece

Easy solution for first of sentence:

```javascript
const capitaliseStr = (str) => str[0].toUpperCase() + str.slice(1);
```

If you actually need to capitalise all sentences...

First solution:

```javascript
const capitaliseStr = (str) => {
  const arr = str.split(' ');

  return arr
    .map((str) => {
      return str[0].toUpperCase() + str.slice(1);
    })
    .join(' ');
};
```

Second solution:

```javascript
const capitaliseStr = (str) => {
  let res = str[0].toUpperCase();
  for (let i = 1; i < str.length; i++) {
    if (str[i - 1] === ' ') {
      res = res + str[i].toUpperCase();
    } else {
      res = res + str[i];
    }
  }
  return res;
};
```

## Stepper

Without a space:

```javascript
const step = (stepper) => {
  let res = '';
  for (let i = 0; i < stepper; i++) {
    let count = 0;
    while (count <= i) {
      res = res + '#';
      count++;
    }

    if (i !== stepper - 1) {
      res = res + '\n';
    }
  }

  console.log(res);
  return res;
};

module.exports = {
  step
};
```

With a space:

```javascript
const step = (stepper) => {
  let res = '';
  for (let i = 0; i < stepper; i++) {
    let count = 0;
    while (count <= i) {
      res = res + '#';
      count++;
    }

    while (count <= stepper) {
      res = res + ' ';
      count++;
    }

    if (i !== stepper - 1) {
      res = res + '\n';
    }
  }

  console.log(res);
  return res;
};

module.exports = {
  step
};
```

Using recursion (doesn't return the string):

```javascript
const step = (n, row = 0, stair = '') => {
  // Complete
  if (n === row) {
    return;
  }

  // Handling a row
  if (n === stair.length) {
    console.log(stair);
    return step(n, row + 1);
  }

  // Handling str on row
  if (stair.length <= row) {
    stair += '#';
  } else {
    stair += ' ';
  }

  return step(n, row, stair);
};
```

## Pyramids

Solution One:

```javascript
const pyramid = (n) => {
  const midpoint = Math.floor((2 * n - 1) / 2);
  let level = '';
  for (let row = 0; row < n; row++) {
    for (let column = 0; column < 2 * n - 1; column++) {
      if (midpoint - row <= column && midpoint + row >= column) {
        level += '#';
      } else {
        level += ' ';
      }

      if (column === 2 * n - 2) {
        level += '\n';
      }
    }
  }

  return level;
};
```

Solution with recursion:

```javascript
const pyramid = (n, row = 0, level = '') => {
  // Complete
  if (n === row) {
    console.log(level);
    return;
  }

  // Handling a row
  if (2 * n - 1 === level.length) {
    console.log(level);
    return pyramid(n, row + 1);
  }

  const midpoint = Math.floor((2 * n - 1) / 2);
  let add = '';
  if (midpoint - row <= level.length && midpoint + row >= level.length) {
    add += '#';
  } else {
    add += ' ';
  }

  return pyramid(n, row, level + add);
};
```

## Vowel Counting

Solution One:

```javascript
let vowels = (str) => {
  let count = 0;
  // could also just use vowels = 'aeiou'
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  for (let char of str) {
    if (vowels.includes(char)) {
      count++;
    }
  }

  return count;
};
```

Solution Two:

```javascript
let vowels = (str) => {
  const matches = str.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
};
```

## General Matrix

Solution One:

```javascript
let matrix = (n) => {
  let mat = [];
  let count = 1;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (j === 0) {
        mat[i] = [];
      }

      mat[i][j] = count;
      count++;
    }
  }

  return mat;
};
```

## Matrix Spiral

Solution One:

```javascript
let matrix = (n) => {
  let results = [];

  // init all 2d arrays
  for (let i = 0; i < n; i++) {
    results.push([]);
  }

  let count = 1;
  let startRow = 0;
  let endRow = n - 1;
  let startCol = 0;
  let endCol = n - 1;

  while (startCol <= endCol && endRow >= startRow) {
    // Top row
    for (let i = startCol; i <= endCol; i++) {
      results[startRow][i] = count;
      count++;
    }
    startRow++;

    // Right col
    for (let i = startRow; i <= endRow; i++) {
      results[i][endCol] = count;
      count++;
    }
    endCol--;

    // Bottom row
    for (let i = endCol; i >= startCol; i--) {
      results[endRow][i] = count;
      count++;
    }
    endRow--;

    // Start col
    for (let i = endRow; i >= startRow; i--) {
      results[i][startCol] = count;
      count++;
    }
    startCol++;
  }
  console.log('results', results);
  // find midpoint to start at (base on even/odd) console.log(results);
  return results;
};
```

## Runtime Complexity

Linear runtime (N):

```javascript
const capitaliseStr = (str) => {
  let res = str[0].toUpperCase();
  for (let i = 1; i < str.length; i++) {
    if (str[i - 1] === ' ') {
      res = res + str[i].toUpperCase();
    } else {
      res = res + str[i];
    }
  }
  return res;
};
```

For an example of quadratic runtime (N^2):

```javascript
const step = (n, row = 0, stair = '') => {
  // Complete
  if (n === row) {
    return;
  }

  // Handling a row
  if (n === stair.length) {
    console.log(stair);
    return step(n, row + 1);
  }

  // Handling str on row
  if (stair.length <= row) {
    stair += '#';
  } else {
    stair += ' ';
  }

  return step(n, row, stair);
};
```

### Determining complexity

How can we determine complexity?

| Time        | Value      | Definition                                                                                                                                              |
| ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Constant    | 1          | No mantter how many elements we're working with, the algorithm/operation/whatever will always take the same amount of time                              |
| Logarithmic | log(n)     | You have this if doubling the number of elements you are iterating over doesn't double the amount of work. Always assume search algorithms to be log(n) |
| Linear      | n          | Iterating through all elements in a colection of data (think arrays)                                                                                    |
| Quasilinear | n * log(n) | You have this if doubling the number of elements you are iterating over doesn't double the amount of work. Always assume sort algorithms to be n*log(n) |
| Quadratic   | n^2        | Every el in a collection has to be compared to every other elements (handshake problem)                                                                 |
| Exponential | 2^n        | If you add a "single" element to a collection, the processing power required doubles                                                                    |

### Big 'O' Notation

| Complexity | Name      |
| ---------- | --------- |
| O(n)       | Linear    |
| O(1)       | Constant  |
| O(n^2)     | Quadratic |

### Common Complexities (Runtime)

| Example                                                           | Likely complexity                              |
| ----------------------------------------------------------------- | ---------------------------------------------- |
| Iterating through simple loop on single collection                | Probably O(n)                                  |
| Iterating through half a collection?                              | Still O(n). There are no constants in runtime. |
| Iterating through 2 different collections with separate for loops | O(n + m)                                       |
| Two nested for loops iterating over the same collection?          | O(n^2)                                         |
| Two nested for loops iterating over different collections?        | O(n*m)                                         |
| Sorting                                                           | O(n*log(n))                                    |
| Two nested for loops                                              | O(n^2)                                         |
| Two nested for loops on different collections                     | O(n*m)                                         |
| Sorting?                                                          | O(n*log(n))                                    |
| Searching a sorted array?                                         | O(log(n))                                      |

### Space Complexity

Extremely similar to performance but related to memory.

## Fibonacci

First solution:

```javascript
const fib = n => {
  const result = [0,1];

  for (let i = 2; i <= n; i++) {
    const a = result[result.length -1];
    const b = result[result.length -2];

    result.push(a + b);
  }

  return result[n];
}
```

Recursive solution one:

```javascript
const fibonacci = (n, iter = 0, value = 1, prev = 0) => {
    // 0, 1, 1, 2, 3, 5 ... handle base cases
    if (n === 0) {
        return 1;
    } else if (n === 1) {
        return 2;
    }

    if (iter < n - 1) {
        const newValue = value + prev;
        return fibonacci(n, iter + 1, newValue, value);
    }

    return value;
};
```

Recursive solution two:

```javascript
const fibonacci = n => {
  if (n < 2) {
    return n;
  }

  return fib(n - 1) + fib(n - 2);
}
```

To get the complexity of the Fibonacci sequence, we need to think about how all the totals come together for the return calls.

![Fibonacci tree](https://res.cloudinary.com/gitgoodclub/image/upload/v1550011633/developer-notes/Screen_Shot_2019-02-13_at_9.46.05_am.png)

We don't care of fib(0) since it comes back with zero.

![Remove fib(0)](https://res.cloudinary.com/gitgoodclub/image/upload/v1550011724/developer-notes/Screen_Shot_2019-02-13_at_9.48.20_am.png)

Therefore for us, we can total calls of `fib(1)` and that is how we see that we get 5 for `fib(4)`.

The time complexity is O(2^n).

## Memoization

Here are some of the performance characteristics of recursion vs quadratic. 

For the recusive function, if we saw the tree that represents all the calls, you will see quickly that each iteration requires two more calls until we reach `fib(1)` and `fib(0)`.

Given the number of operations increases exponentially, we then know that it becomes `O(2^n)`. This is a massive no no.

With the first iterative solutin, we will get linear runtime. 

What the interviewer wants to hear for the recursive answer is that we are wasting resources by recalling the same functions over and over (think of how often `fib(3)` might be called lower in the recursion tree when running `fib(6)`).

What they want to here is `memoization` - store the arguments of each function call along with the result. If the function is called again with the same arguments, return the precomputed results, rather than running the function again. 

Using this will dramatically improve runtime.

### Implementing memoization

Recursive solution with memoization:

```javascript
const memoize(fn) {
  const cache = {};
  return function(...args) {
    if (cache[args]) {
      return cache[args];
    }

    // NOTE: apply is integral - check MDN if you don't know how it works 
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
    const result = fn.apply(this, args);
    cache[args] = result;

    return result;
  };
}

const slowFib = n => {
  if (n < 2) {
    return n;
  }

  return fib(n - 1) + fib(n - 2);
}

const fibonacci = memoize(slowFib);
// fib = memoize(fib); // could also do this if we rename slowFib => fib
```

## What's a data structure?

Data structures are all about runtime complexity:

- Ways of organizing information with optimal 'runtime complexity' for adding or removing records.
- Javascript natively implements several data structures. You will still be asked about 'inferior' data structures.

## Queueing 

Enqueing: push to back, dequeueing: pop from top.

Implementing a queue in JS:

| Queue             | Array equivalent |
| ----------------- | ---------------- |
| Add to queue      | array.unshift(); |
| Remove from queue | array.pop();     |

So we could handicap an array. Why would we do that? Just to basically help hide some of the array functionality to lock it down.

```javascript
export default class Queue {
  constructor() {
    this.data = [];
  }

  add(record) {
    this.data.unshift(record);
  }

  remove() {
    return this.data.pop();
  }
}

// another file 
import Queue from 'path/to/file';
const q = new Queue();

q.add({foo: 'bar'});
const nextInQ = q.remove();
```

## Weave

Weave receives two queues as arguments and combines the contents of each into a new, third queue. The third queue should contain the `alterating` content of the two queues. The function should handle queues of different lengths without inserting `undefined` into the new one.

Image you have queue one `[1,2,3]` and queue two `'hello', 'world', '!` then we want to have `[1, 'hello', 2, 'world', 3, '!']`.

```javascript
// first, update queue
export default class Queue {
  constructor() {
    this.data = [];
  }

  add(record) {
    this.data.unshift(record);
  }

  remove() {
    return this.data.pop();
  }

  peek() {
    return this.data[this.data.length - 1];
  }
}

import Queue from 'path/to/file';
// using weave
function weave(srcOne, srcTwo) {
  const q = new Queue();
}

module.exports = weave;
```

Assuming we have that queue class, one implementation is:

```javascript
const runWeave = (qOne, qTwo) => {
    const weave = new Queue();

    while (qOne.peek() || qTwo.peek()) {
        if (qOne.peek()) {
            weave.add(qOne.remove());
        }

        if (qTwo.peek()) {
            weave.add(qTwo.remove());
        }
    }

    return weave;
}
```

## Stacks

Stack is like a push pop implementation of records. It is `First in, Last out`.

![Stack implemntation](https://res.cloudinary.com/gitgoodclub/image/upload/v1550020065/developer-notes/Screen_Shot_2019-02-13_at_12.07.28_pm.png)

```javascript
class Stack {
  constructor() {
    this.data = [];
  }

  push(record) {
    this.data.push(record);
  }

  pop() {
    return this.data.pop();
  }

  peek() {
    return this.data[this.data.length - 1];
  }
}
```

## Queue from Stacks

Using two stacks, can we emulate a queue?

```javascript
const Stack = require('stack');
const Queue = require('queue');

const s1 = new Stack();
const s2 = new Stack();

const q = new Queue();

const base = ['green', 'blue', 'red'];
// start with ['green', 'blue', 'red']
// act as if we were queueing to get green out first
while (base.length > 0) {
  s1.push(base.unshift());
}

while (s1.peek()) {
  s2.push(s1.pop());
}

// now to act as if it is FIFO
s2.pop(); // gets out green
```

Instead of just emulating, if we create a new queue:

```javascript
class Queue {
  constructor() {
    this.first = new Stack();
    this.second = new Stack();

    add(record) {
      this.first.push(record);
    }

    remove() {
      while (this.first.peek()) {
        this.second.push(this.first.pop());
      }
      const record = this.second.pop();

      while (this.second.peek()) {
        this.first.push(this.second.pop());
      }

      return record;
    }

    peek() {
      while (this.first.peek()) {
        this.second.push(this.first.pop());
      }

      const record = this.second.peek();

      while (this.second.peek()) {
        this.first.push(this.second.pop());
      }

      return record;
    }
  }
}
```

To clarify with the above challenge, it's to go A => StackA => StackB and back treating both the stacks as a queue.

## Linked List

![Basic singularly linked list](https://res.cloudinary.com/gitgoodclub/image/upload/v1550023986/developer-notes/Screen_Shot_2019-02-13_at_1.12.51_pm.png)

A node generally contains data and a reference to the next node and the linked list is the collections of nodes linked to each other.

```javascript
const nodeOne = {
  data: 123
}

const nodeTwo = {
  data: 456
}

nodeOne.next = nodeTwo;
```

We can build a `Node` and `LinkedList` class to help us out here:

```javascript
class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    constructor(head = null) {
        this.head = head;
    }

    insertFirst(data) {
        const node = new Node(data, this.head);
        this.head = node;
    }

    /**
     * Return size of LinkedList
     *
     * @returns {Number} Size of list
     * @memberof LinkedList
     */
    size() {
        if (this.head) {
            // traverse the head
            let node = this.head;
            let size = 1;
            while (node.next) {
                node = node.next;
                size++;
            }

            return size;
        }

        return 0;
    }

    getFirst() {
        return this.head;
    }

    getLast() {
        let node = this.head;
        while (node.next) {
            node = node.next;
        }

        return node;
    }

    /**
     * Note, we might not have to iterate through all the null values.
     *
     * @memberof LinkedList
     */
    clear() {
        if (this.head.next) {
            let node = this.head.next;
            while (node.next) {
                let temp = node.next;
                node = null;
                node = temp;
            }
        }

        this.head = null;
    }

    removeFirst() {
        if (!this.head) {
            return;
        }

        this.head = this.head.next;
    }

    removeLast() {
        if (!this.head) {
            return;
        }

        if (!this.head.next) {
            this.head = null
            return;
        }

        let node = this.head.next;
        let prev = this.head;

        while (node.next) {
            prev = node;
            node = node.next;
        }

        prev.next = null;
    }

    insertLast(data) {
        // this could also be done using this.getLast()
        const n = new Node(data);

        if (!this.head) {
            this.head = n;
            return;
        }

        if (!this.head.next) {
            this.head.next = n;
            return;
        }

        let node = this.head.next;

        while (node.next) {
            node = node.next;
        }

        node.next = n;
    }

    /**
     * Get node at a particular index with head equating to 0.
     *
     * @param {*} index Index to fetch at.
     * @memberof LinkedList
     */
    getAt(index) {
        if (!this.head) {
            return null;
        }

        let count = 0;
        let node = this.head;
        while (count < index) {
            if (!node.next) {
                return null;
            }

            count++;
            node = node.next;
        }

        return node;
    }

    /**
     * Remove at a particular index.
     *
     * @param {*} index index to remove.
     * @memberof LinkedList
     */
    removeAt(index) {
        if (!this.head) {
            return;
        } else if (index === 0 && this.head.next) {
            let node = this.head.next;
            this.head = node;
        }

        let prev = this.head;
        let node = this.head.next;
        let counter = 0;

        while (counter < index) {
            if (!node.next) {
                return;
            }

            prev = node;
            node = node.next;
        }

        prev.next = node.next;
    }

    /**
     * Insert node at a particular index. Ensure it can handle cases where there is a next or no next.
     * Insert at end if index is out of bounds.
     *
     * @param {*} index Index to insert the object at.
     * @memberof LinkedList
     */
    insertAt(data, index) {
        if (!this.head) {
            this.head = new Node(data);
        }

        if (index === 0) {
            this.head = new Node(data, this.head);
        }

        let counter = 0;
        let prev = this.head;
        let node = this.head.next;
        while (counter < index) {
            if (!node.next) {
                node.next = new Node(data);
            }

            prev = node;
            node = node.next;
        }

        prev.next = new Node(data, node);
    }
}
```

## Basic notes on generators

```javascript
function *numbers() {
  yield 1;
  yield 2;
  yield* moreNumbers(); // I will pass another generator, next should continue to receive yields from this function
  yield 6;
  yield 7;
}

function *moreNumbers() {
  yield 3;
  yield 4;
  yield 5;
}

const generator = numbers();

const values = [];
for (let value of generator) {
  values.push(value);
}

console.log(values); // [1,2,3,4,5,6,7]
```

A practical example:

```javascript
class Tree {
  constructor(value = null, children = []) {
    this.value = value;
    this.children = children;
  }
}
```