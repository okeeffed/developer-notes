# Advanced Python: Decorators

Decorators are a way to modify functions and classes at runtime.

## Higher Order Functions

Higher-order functions accepts another function or returns another function.

## Implementing decorators

Here is an example of writing a decorator.

```py
def my_decorator(func):
	def wrap_func():
		print('*****')
		func()
		print('*****')
	return wrap_func

@my_decorator
def hello():
	print('Hello')

hello()
```

Handling decorators with args.

```py
def my_decorator(func):
	def wrap_func(*args, **kwargs):
		print('*****')
		func(*args, **kwargs)
		print('*****')
	return wrap_func

@my_decorator
def hello():
	print('Hello')

hello()
```

## Why do we need decorators?

Examples:

- `performance` decorator to test a code.
- `auth` decorator to check if a user is authenticated.
- `logging` decorator to log a function call.
