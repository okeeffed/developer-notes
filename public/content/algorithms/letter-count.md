---
menu: Algorithms
name: Letter Count
---

# Letter Count

## Resources

1. [Look around regex blog](https://www.regular-expressions.info/lookaround2.html)

## Answer

```javascript
function LetterCount(str) {
  let maxLen = 0;
  let letterCountIndex = 0;
  const strArr = str.split(' ');
  strArr.map((word, index) => {
    const regex = /([a-z])(\1?)(.?|.+)(\1+)/gi;
    const regMatches = word.toLowerCase().match(regex);
    if (!regMatches) return;

    for (match of regMatches) {
      const repRegex = new RegExp(`[^${match[0]}]`, 'ig');
      const updated = word.replace(repRegex, '');
      if (updated.length > maxLen) {
        maxLen = updated.length;
        letterCountIndex = index;
      }
    }
  });

  if (maxLen === 0) return -1;
  return strArr[letterCountIndex];
}
```
