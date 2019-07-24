---
menu: Ruby
name: Ruby Symbols
---

# Ruby Symbols (Colon Variables)

## tl;dr

A ruby symbol is like an Enum constant in Java or C++.

Symbols are immutable. Their value remains constant during the entirety of the program. They never appear on the left side of an assignment. You'll never see this:

```ruby
:myname = "steve"

# Symbols ARE used like this:
mystring = :steveT
mystring = :steveT.to_s
myint = :steveT.to_i
class Example
  attr_reader :steveT
end
```

## More info

Colon variable refers to :abc type variables you might have seen in Ruby.

They are called Ruby symbols.

- A Ruby symbol is not a variable because it cannot be assigned a value.
- It is not a reference to another variable nor is it a pointer to a memory location.
- Has a value and whenever the name of the symbol is same, its value is the same.

```ruby
# It is trivial to assign a value to a variable.
abc = "1"
=> "1"

# But a symbol cannot be assigned any value.
:a = "1"
# SyntaxError: A symbol cannot be assigned a value

# Can use a variable as a map-key (You know already)
m = {abc => "1"}
=> {"1"=>"1"}

# Can use a string as a map-key (You know already)
m = {"def" => "1"}
=> {"def"=>"1"}

# Can also use a symbol as a map-key (Most common use case)
m = {:a => "1"}
=> {:a=>"1"}

# Can use same symbol as key in another map
m2 = {:a => "2"}
=> {:a=>"2"}

# And it won't affect the previous map.
m
=> {:a=>"1"}

m2
=> {:a=>"2"}
```
