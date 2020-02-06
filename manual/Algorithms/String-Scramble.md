---
menu: Algorithms
name: String Scramble
---

# String Scramble

## Resources

1. [CoderByte](https://www.coderbyte.com/editor/String%20Scramble:JavaScript)

## Question

Have the function StringScramble(str1,str2) take both parameters being passed and return the string true if a portion of str1 characters can be rearranged to match str2, otherwise return the string false. For example: if str1 is "rkqodlw" and str2 is "world" the output should return true. Punctuation and symbols will not be entered with the parameters.

## Examples

```shell
Input: "cdore" & str2= "coder"
Output: true
```

```shell
Input: "h3llko" & str2 = "hello"
Output: false
```

## Answer

```javascript
function StringScramble(str1, str2) {
  // for each element of str2, remove the punctuation and symbols
  // this is more for robustness
  let filteredStr1 = str1.replace(/[^0-9a-zA-Z]/gi, '');
  let filteredStr2 = str2.replace(/[^0-9a-zA-Z]/gi, '');

  for (let i = 0; i < filteredStr2.length; i++) {
    // replace element if it exists in filteredStr1
    if (filteredStr1.indexOf(filteredStr2[i]) === -1) {
      return false;
    }

    filteredStr1 = filteredStr1.replace(filteredStr2[i], '');
  }

  return true;
}
```
