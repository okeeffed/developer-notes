---
menu: Ruby
name: Metaprogramming Ruby 2
---

# Metaprogramming Ruby 2

## Resources

1. [Access Modifiers in Ruby](https://www.rubyguides.com/2018/10/method-visibility/)
2. [Ruby vs Java Access Modifiers](https://en.wikibooks.org/wiki/Ruby_Programming/Syntax/Classes)

## The Object Model

- Everytime you write the same class in the same namespace, it is more of an extension to an existing class (or new class if called for first time).

### Modules & Look ups

```ruby
module M1
  def my_method
    # M1#my_method()
  end
end

class C
  include M1
end

class D < C; end

D.ancestors # => [D, C, M1, Object, Kernel, BasicObject]
```

In Ruby 2, you can insert a module BELOW the including class rather than above:

```ruby
class C2
  prepend M2
end

class D2 < C2; end

D2.ancestors # => [D, M2, C, Object, Kernel, BasicObject]
```

So for multiple inclusions...

```ruby
module M1; end

module M2
  include M1
end

module M3
  prepend M1
  include M2
end

M3.ancestors # => [M1, M3, M2]
```

### The Kernel

Soe methods such as `print` can be called from anywhere. Every object has the `print` method. These are private instance methods of the module `Kernel`:

```ruby
Kernel.private_instance_methods.grep(/^pr/) # => [:printf, :print, :proc]
```

> Here is an interesting aside about access modifiers in Ruby:
>
> Now, "protected" deserves more discussion. Those of you coming from Java or C++ have learned that in those languages, if a method is “private”, its visibility is restricted to the declaring class, and if the method is “protected”, it will be accessible to children of the class (classes that inherit from parent) or other classes in that package.
>
> In Ruby, "private" visibility is similar to what "protected" is in Java. Private methods in Ruby are accessible from children. You can’t have truly private methods in Ruby; you can’t completely hide a method.
>
> The difference between protected and private is subtle. If a method is protected, it may be called by any instance of the defining class or its subclasses. If a method is private, it may be called only within the context of the calling object---it is never possible to access another object instance's private methods directly, even if the object is of the same class as the caller. For protected methods, they are accessible from objects of the same class (or children).

### Self

You can return `self` for the class instance. I believe this means that you can make classes chainable.

```ruby
class A
  def my_method
    self
  end
end
```
