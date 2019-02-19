---
name: Python Data Structures
menu: Data Structures
---

# Python Data Structures

## Array Chunks

```python
def arrayChunk(arr, size):
    print(arr)
    if (size == 0):
        return []
    if (len(arr) < size):
        return [arr]
    tmp = []
    chunkedArr = []
    for i, d in enumerate(arr):
        tmp.append(d)
        if (i % size == size - 1 or i == len(arr) - 1):
            chunkedArr.append(tmp)
            tmp = []
    return chunkedArr
```

## Palindromes

```python
import re

def isPalindrome(string):
    reStr = re.sub("[^a-zA-Z]", "", string).strip().lower()
    return reStr[::-1] == reStr
```
