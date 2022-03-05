# 11: Modules in Python

Say we have to files in our root:

1. `main.py`
2. `utility.py`

How can we make these useable across files with the help of modules?

Let's say this is our `utility.py` file:

```py
def add(a, b):
		return a + b
```

If I want to use it in `main.py`:

```py
import utility
```

Every time we run a file with imports, there is a `__pycache__` created where a compiled version of the `utility.py` is cached.

## Packages in Python

Say our layout is like so:

```
- main.py
- shopping/shopping_cart.py
- utility.py
```

How can we use `shopping/shopping_cart.py` in `main.py`? What we have done is create a package. A package is a folder containing modules.

This is how it would work:

```py
import shopping.shopping_cart

print(shopping.shopping_cart) # <module 'shopping.shopping_cart' from 'shopping/shopping_cart.py'>
```

Within a package, it is a rule that there is a `__init__.py` file. The interpreter needs it to know that it is a package. It can be completely empty.

## Different ways to import

What happens if you have another package within a package? How does importing begin to work?

The import then becomes:

```py
import shopping.more_shopping_cart.shopping_cart

print(shopping.more_shopping_cart.shopping_cart) # <module 'shopping.shopping_cart' from 'shopping/shopping_cart.py'>
```

But this becomes unclear. What we can do is start to make use of the `from` keyword.

```py
from shopping.more_shopping_cart.shopping_cart import buy

print(buy) # <module 'shopping.shopping_cart' from 'shopping/shopping_cart.py'>
```

What happens when you are going to have function naming collisions?

You can avoid this by importing up a level or importing all with `*`:

```py
# Preferred on the video
from shopping.more_shopping_cart.shopping_cart import *

# Alternative
from shopping.more_shopping_cart import shopping_cart
```

## `__name__`

We need to cover the concept of `__name__` because something you will see often in Python:

```py
if __name__ == '__main__':
	# Something
```

The `__name__` references to module name (including the package).

The `__main__` is the file that is being run. That `if` control statement allows us to do something within a module file when we are running it.

## Python Built-in Modules

Python has a bunch of [built-in modules](https://docs.python.org/3.10/py-modindex.html).

In other languages, this would be known as the standard library.

When you want to learn more about a module, we can use `help`:

```py
import random

help(random) # See help on module
dir(random) # See all the functions in the module
```

## Python Package Index

This section went over the [Python Package Index](https://pypi.python.org/pypi).

## Virtual Environments

Virtual environments allows multiple versions of different modules to be installed on a single machine.

The `venv` folder is where the virtual environment info is stored when using `Virtualenv`.

You can have new environments use `Pipenv`, `Conda`, `Virtualenv` and more.

## Useful modules

### Specialized data types

- [collections](https://docs.python.org/3/library/collections.html). Includes things like `Counter`, `defaultdict`, `namedtuple`, `OrderedDict`, `deque`, etc.
- [datetime](https://docs.python.org/3/library/datetime.html). Includes things like `datetime.datetime`, `datetime.timedelta`, `datetime.timezone`, etc.
- [array](https://docs.python.org/3/library/array.html). Includes things like `array.array`, `array.array_tobytes`, etc. Lists are dynamic, arrays have set memory.
