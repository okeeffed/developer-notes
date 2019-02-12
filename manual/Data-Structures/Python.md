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
