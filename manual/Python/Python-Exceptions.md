---
name: Python Exceptions
menu: Python
---

# Python Exceptions

The base example is to use a try/except block. You can raise exceptions in code that can be caught by the except block.

```python
try:
    linux_interaction()
except:
    print('Linux function was not executed')
```

## Example case

```python
class LinkedList:
    def __init__(self, head=None):
        self.head = head

    def getFirst(self):
        if self.head == None:
            raise Exception("No items in list")
        else:
            return self.head
```
