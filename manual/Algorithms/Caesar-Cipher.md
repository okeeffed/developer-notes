---
menu: Algorithms
name: Caesar Cipher
---

# Causar Cipher

## Answer

```javascript
function CaesarCipher(str, num) {
  // handle base case
  if (num === 0) {
    return str;
  }

  let finalStr = '';
  for (let i = 0; i < str.length; i++) {
    if (/[^a-zA-Z]/gi.test(str[i])) {
      finalStr += str[i];
      continue;
    }

    // 1. handle char code conversion
    let charCode = str.charCodeAt(i) + num;
    // 2. handle char code > a/A + 26
    if (charCode > 90 && /[A-Z]/.test(str[i])) {
      charCode = charCode - 26;
    } else if (charCode > 122 && /[a-z]/.test(str[i])) {
      charCode = charCode - 26;
    }

    // 3. handle str conversion from char code
    finalStr += String.fromCharCode(charCode);
  }

  return finalStr;
}
```
