# 9: Error Handling

## Errors in Python

You can find a list of built-in exceptions on the [docs](https://docs.python.org/3.10/library/exceptions.html#bltin-exceptions).

Example of error handling:

```py
try:
	print(5/0)
except ZeroDivisionError:
	print("You can't divide by zero!")
except NameError as err:
	print(f"You can't divide by zero! {err}")
# To group them together
except (TypeError, ValueError) as err:
	print(f"You can't divide by zero! {err}")
else:
	print('Thank you!')
finally:
	print('This is always printed')
```
