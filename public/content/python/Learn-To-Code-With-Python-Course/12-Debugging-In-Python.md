# 12: Debugging In Python

`pdb` is a built in module in Python that helps us with debugging.

```py
import pdb

def add(a, b):
	pdb.set_trace()
	return a + b

add(4, 'str')
```
