---
menu: Algorithms
name: Bracket Matcher
---

# Bracket Matcher

## Answers

```javascript
function BracketMatcher(str) {
  let left = 0;
  let right = 0;
  str
    .replace(/[^\(\)]/gi, '')
    .split('')
    .map(bracket => {
      if (bracket === '(') left++;
      if (bracket === ')') right++;
    });
  return left === right ? 1 : 0;
}
```
