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
