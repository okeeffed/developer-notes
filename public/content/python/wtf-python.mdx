---
menu: Python
name: Wtf Python
---

# WTF Python

## Resources

1. [WTF Python interactive](https://colab.research.google.com/github/satwikkansal/wtfpython/blob/master/irrelevant/wtf.ipynb)
2. [WTF Python GitHub](https://github.com/satwikkansal/wtfpython)
3. [Py 2.0 Tutorials](https://docs.python.org/2.0/tut/node5.html)

## Strings Can Be Tricky

The behavior in first and second snippets is due to a CPython optimization (called string interning) that tries to use existing immutable objects in some cases rather than creating a new object every time.

After being "interned," many variables may reference the same string object in memory (saving memory thereby).

In the snippets above, strings are implicitly interned. The decision of when to implicitly intern a string is implementation-dependent. There are some rules that can be used to guess if a string will be interned or not:

1. All length 0 and length 1 strings are interned.
2. Strings are interned at compile time (`'wtf'` will be interned but `''.join(['w', 't', 'f'])` will not be interned)
3. Strings that are not composed of ASCII letters, digits or underscores, are not interned. This explains why `'wtf!'` was not interned due to `!`

When a and b are set to `"wtf!"` in the same line, the Python interpreter creates a new object, then references the second variable at the same time. If you do it on separate lines, it doesn't "know" that there's already wtf! as an object (because `"wtf!"` is not implicitly interned as per the facts mentioned above). It's a compile-time optimization. This optimization doesn't apply to 3.7.x versions of CPython (check this issue for more discussion).

A compile unit in an interactive environment like IPython consists of a single statement, whereas it consists of the entire module in case of modules. `a, b = "wtf!", "wtf!"` is single statement, whereas `a = "wtf!"; b = "wtf!"` are two statements in a single line. This explains why the identities are different in `a = "wtf!"; b = "wtf!"`, and also explain why they are same when invoked in `some_file.py`.

```python
# IDs are the same - 140217205447024
a = "some_string"
id(a)
id("some" + "_" + "string")

# a is b weirdness
a = "wtf"
b = "wtf"
a is b # True

a = "wtf!"
b = "wtf!"
a is b # False

a,b = "wtf!", "wtf!"
a is b # True in all versions except 3.7.x

a = "wtf!"; b = "wtf!"
a is b # This will print True or False depending on where you're invoking it (python shell / ipython / as a script)
```

The abrupt change in the output of the following snippet is due to a peephole optimization technique known as Constant folding. This means the expression `'a' * 20` is replaced by 'aaaaaaaaaaaaaaaaaaaa' during compilation to save a few clock cycles during runtime. Constant folding only occurs for strings having a length of less than 20. (Why? Imagine the size of .pyc file generated as a result of the expression `'a'*10**10`). Here's the implementation source for the same.

Note: In Python 3.7, Constant folding was moved out from peephole optimizer to the new AST optimizer with some change in logic as well, so the snippet doesn't work for Python 3.7. You can read more about the change here.

```python
'a' * 20 is 'aaaaaaaaaaaaaaaaaaaa' # True
'a' * 21 is 'aaaaaaaaaaaaaaaaaaaaa' # False
```

## Complex Numbers

This is sidenote.

Complex numbers are also supported in Python; imaginary numbers are written with a suffix of "j" or "J". Complex numbers with a nonzero real component are written as "(real+imagj)", or can be created with the "complex(real, imag)" function.

```python
>>> 1j * 1J
(-1+0j)
>>> 1j * complex(0,1)
(-1+0j)
>>> 3+1j*3
(3+3j)
>>> (3+1j)*3
(9+3j)
>>> (1+2j)/(1+1j)
(1.5+0.5j)
```

## Hash Collisions

With prereq covered on Python complex numbers, we can see some weirdness when using numbers for hash keys:

```python
some_dict = {}
some_dict[5.5] = "JavaScript"
some_dict[5.0] = "Ruby"
some_dict[5] = "Python"

print(some_dict[5.5]) # JavaScript
print(some_dict[5.0]) # Python -> "Python" destroyed the existence of "Ruby"?
print(some_dict[5 + 0j]) # Python
```

Why? Python dictionaries check for equality and compare the hash value to determine if two keys are the same. Immutable objects with the same value always have the same hash in Python.

```python
5 == 5.0 == 5 + 0j # True
hash(5) == hash(5.0) == hash(5 + 0j) # True
```

Note: Objects with different values may also have same hash (known as hash collision). When the statement `some_dict[5] = "Python"` is executed, the existing value "Ruby" is overwritten with "Python" because Python recognizes 5 and 5.0 as the same keys of the dictionary `some_dict`.

More information can be found on [Stack Overflow](https://stackoverflow.com/questions/32209155/why-can-a-floating-point-dictionary-key-overwrite-an-integer-key-with-the-same-v/32211042#32211042).

```python
>>> hash(5)
5
>>> hash(5.0)
5
>>> hash(complex(5, 0j))
5
```

Return the hash value of the object (if it has one). Hash values are integers. They are used to quickly compare dictionary keys during a dictionary lookup. Numeric values that compare equal have the same hash value (even if they are of different types, as is the case for 1 and 1.0).

This is not unique to python. Java has the same caveat: if you implement hashCode then, in order for things to work correctly, you must implement it in such a way that: x.equals(y) implies x.hashCode() == y.hashCode().

So, python decided that 1.0 == 1 holds, hence it's forced to provide an implementation for hash such that hash(1.0) == hash(1). The side effect is that 1.0 and 1 act exactly in the same way as dict keys, hence the behaviour.

## Instances being the same

When `id` was called, Python created a WTF class object and passed it to the id function. The id function takes its id (its memory location), and throws away the object. The object is destroyed.

When we do this twice in succession, Python allocates the same memory location to this second object as well. Since (in CPython) `id` uses the memory location as the object `id`, the `id` of the two objects is the same.

So, the object's `id` is unique only for the lifetime of the object. After the object is destroyed, or before it is created, something else can have the same `id`.

```python
class WTF:
  pass
WTF() == WTF() # False - two different instances can't be equal
WTF() is WTF() # False - identities are also different
hash(WTF()) == hash(WTF()) # True - hashes *should* be different as well
id(WTF()) == id(WTF()) # True
```

But why did the is operator evaluated to False? As you may observe, the order in which the objects are destroyed is what made all the difference here.

```python
class WTF(object):
    def __init__(self): print("I")
    def __del__(self): print("D")

"""
Prints:
I
I
D
D
False
"""
WTF() is WTF() # same res for WTF() == WTF()

"""
Prints:
I
D
I
D
True
"""
id(WTF()) == id(WTF())
```

## Disorder within Dicts

```python
from collections import OrderedDict

dictionary = dict()
dictionary[1] = 'a'; dictionary[2] = 'b';

ordered_dict = OrderedDict()
ordered_dict[1] = 'a'; ordered_dict[2] = 'b';

another_ordered_dict = OrderedDict()
another_ordered_dict[2] = 'b'; another_ordered_dict[1] = 'a';

class DictWithHash(dict):
    """
    A dict that also implements __hash__ magic.
    """
    __hash__ = lambda self: 0

class OrderedDictWithHash(OrderedDict):
    """
    An OrderedDict that also implements __hash__ magic.
    """
    __hash__ = lambda self: 0

dictionary == ordered_dict # True => If a == b
dictionary == another_ordered_dict # True => and a == c
ordered_dict == another_ordered_dict # False => the why isn't b == c ??
```

Looking deeping with `len`:

```python
dictionary = DictWithHash()
dictionary[1] = 'a'; dictionary[2] = 'b';
ordered_dict = OrderedDictWithHash()
ordered_dict[1] = 'a'; ordered_dict[2] = 'b';
another_ordered_dict = OrderedDictWithHash()
another_ordered_dict[2] = 'b'; another_ordered_dict[1] = 'a';

len({dictionary, ordered_dict, another_ordered_dict}) # 1
len({ordered_dict, another_ordered_dict, dictionary}) # 2 => changing the order
```

What is going on here?

The reason why intransitive equality didn't hold among dictionary, ordered_dict and another_ordered_dict is because of the way `__eq__` method is implemented in OrderedDict class.

Equality tests between `OrderedDict` objects are order-sensitive and are implemented as `list(od1.items()) == list(od2.items())`. Equality tests between OrderedDict objects and other Mapping objects are order-insensitive like regular dictionaries.

The reason for this equality is behavior is that it allows `OrderedDict` objects to be directly substituted anywhere a regular dictionary is used.

So why did changing the order affect the length of the generated set object? The answer is the lack of intransitive equality only. Since sets are "unordered" collections of unique elements, the order in which elements are inserted shouldn't matter. But in this case, it does matter. Let's break it down a bit:

```python
some_set = set()
some_set.add(dictionary) # these are the mapping objects from the snippets above
ordered_dict in some_set # True

some_set.add(ordered_dict)
len(some_set) # 1

another_ordered_dict in some_set # True

some_set.add(another_ordered_dict)
len(some_set) # 1

# let's see for another set
another_set = set()
another_set.add(ordered_dict)
another_ordered_dict in another_set # False

another_set.add(another_ordered_dict)
len(another_set) # 2

dictionary in another_set # True

another_set.add(another_ordered_dict)
len(another_set) # 2
```

So the inconsistency is due to `another_ordered_dict in another_set` being `False` because `ordered_dict` was already present in `another_set` and as observed before, `ordered_dict == another_ordered_dict` is `False`.

## Try Weirdness

[Go from here](https://colab.research.google.com/github/satwikkansal/wtfpython/blob/master/irrelevant/wtf.ipynb#scrollTo=2dOWN8NEJiVd)
