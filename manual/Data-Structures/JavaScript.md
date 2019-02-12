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
const fizzBuzz = (i) => {
  switch (i) {
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
