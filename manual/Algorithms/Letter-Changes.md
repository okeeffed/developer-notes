---
menu: Algorithms
name: Letter Changes
---

# Letter Changes

## Resources

1. [CoderByte Challenge](https://www.coderbyte.com/information/Letter%20Changes)

## Question

Have the function LetterChanges(str) take the str parameter being passed and modify it using the following algorithm. Replace every letter in the string with the letter following it in the alphabet (ie. c becomes d, z becomes a). Then capitalize every vowel in this new string (a, e, i, o, u) and finally return this modified string.
Examples

## Examples

```shell
Input: "hello*3"
Output: Ifmmp*3
```

```shell
Input: "fun times!"
Output: gvO Ujnft!
```

## Answer

```javascript
function LetterChanges(str) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  // 1. Build out then new string
  let newStr = '';
  for (let i = 0; i < str.length; i++) {
    console.log(str[i]);
    let index = alphabet.indexOf(str[i]);
    if (index === -1) {
      newStr += str[i];
    } else if (index === 25) {
      newStr += 'A';
    } else {
      if (/([aeiou])/gi.test(alphabet[index + 1])) {
        newStr += alphabet[index + 1].toUpperCase();
      } else {
        newStr += alphabet[index + 1];
      }
    }
  }

  // code goes here
  return newStr;
}
```
