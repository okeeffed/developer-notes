---
menu: Algorithms
name: Palindrome Two
---

# Palindrome Two

## Resources

1. [CoderByte](https://www.coderbyte.com/editor/Palindrome%20Two:JavaScript)

## Question

Have the function PalindromeTwo(str) take the str parameter being passed and return the string true if the parameter is a palindrome, (the string is the same forward as it is backward) otherwise return the string false. The parameter entered may have punctuation and symbols but they should not affect whether the string is in fact a palindrome. For example: "Anne, I vote more cars race Rome-to-Vienna" should return true.

## Examples

```shell
Input: "Noel - sees Leon"
Output: true
```

```shell
Input: "A war at Tarawa!"
Output: true
```

## Answer

```javascript
function PalindromeTwo(str) {
  // code goes here
  return (
    str.replace(/[^a-zA-Z0-9]/gi, '').toLowerCase() ===
    str
      .split('')
      .reverse()
      .join('')
      .replace(/[^a-zA-Z0-9]/gi, '')
      .toLowerCase()
  );
}
```
