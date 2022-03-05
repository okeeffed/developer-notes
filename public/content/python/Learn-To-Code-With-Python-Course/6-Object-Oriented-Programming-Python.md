# 6: Object Oriented Programming Python

## Dunder methods

Methods that have the double underscore on each side `__` are dunder methods.

Dunder methods help us to write the implementation of Python specific functions on objects created by our class.

```py
class Toy():
	def __init__(self, color, age):
		self.color = color
		self.age = age

action_figure = Toy('red', 3)
print(action_figure.__str__()) # <__main__.Toy object at 0x7f8b8b8b8d50>
print(str(action_figure)) # <__main__.Toy object at 0x7f8b8b8b8d50> -- the same as before
```

In the above we can see that the built-in function `str` is the implementation of `__str__` method.

The [documentation](https://docs.python.org/3.10/reference/datamodel.html#special-method-names) has a list of dunder methods.

In general, there are a specific few cases where you will use them.

To define your own implementation:

```py
class Toy():
	def __init__(self, color, age):
		self.color = color
		self.age = age

	def __str__(self):
		return f'{self.color} toy'

action_figure = Toy('red', 3)
print(action_figure.__str__()) # red toy
print(str(action_figure)) # red toy -- the same as before
```

Be careful of how you implement these things. You may want to make adjustments for particular comparison operators or methods for lists, dicts.

Some interesting methods:

- `__call__` adjusts the method that runs if the object is to be called like a function.
- `__getitem__` allows us to use the object like a list.

## Multiple Inheritance

```py
# This is now inheriting from both Wizard and Archer
class Hybrid(Wizard, Archer):
	pass
```

## Module Resolution Order

```py
class A:
	num = 10

class B(A):
	pass

class C(A):
	num = 1

class D(B, C):
	pass
```

MRO is a rule for which how Python will resolve the inheritance hierarchy.

If we run `print(D.num)` from the above, we get one.

You can check `D.mro()` to see the order.

You want to be conscious of MRO. MRO uses depth first search to resolve the order.
