---
menu: Algorithms
name: Longest Word
---

# Longest Word

## Resources

1. [CoderByte](https://www.coderbyte.com/editor/Longest%20Word:JavaScript)

## Question

Have the function LongestWord(sen) take the sen parameter being passed and return the largest word in the string. If there are two or more words that are the same length, return the first word from the string with that length. Ignore punctuation and assume sen will not be empty.

## Examples

```shell
Input: "fun&!! time"
Output: time
```

```shell
Input: "I love dogs"
Output: love
```

## Answer

```javascript
function LongestWord(sen) {
  const words = sen.split(' ');
  let maxWord = '';
  let max = 0;

  for (let word of words) {
    const filteredWord = word.replace(/[^a-zA-Z0-9]/gi, '');
    if (filteredWord.length > max) {
      maxWord = filteredWord;
      max = filteredWord.length;
    }
  }

  // code goes here
  return maxWord;
}
```
