---
menu: Algorithms
name: Palindrome
---

# Palindrome

## Answer

```javascript
function Palindrome(str) {
  return (
    str.replace(/\s/gi, '') ===
    str
      .replace(/\s/gi, '')
      .split('')
      .reverse()
      .join('')
  );
}
```
