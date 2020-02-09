---
menu: Algorithms
name: Vowel Count
---

# Vowel Count

## Answer

```javascript
function VowelCount(str) {
  const matches = str.match(/[aeiou]/gi);
  if (!matches) return 0;
  return matches.length;
}
```
