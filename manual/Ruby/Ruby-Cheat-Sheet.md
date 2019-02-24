---
menu: Ruby
name: Ruby Cheat Sheet
---

# Ruby Cheat Sheet

## Classes

```ruby
#!/usr/bin/ruby

class Sample
   def hello
      helloWorld = "Hello, World!"
      helloWorld
   end
end

# Now using above class to create objects
object = Sample. new
object.hello
```

## Arrays

A great resource for seeing the [Ruby Array methods](https://ruby-doc.org/core-2.5.0/Array.html).

```ruby
ary = [1, "two", 3.0] #=> [1, "two", 3.0]
ary = Array.new    #=> []
Array.new(3)       #=> [nil, nil, nil]
Array.new(3, true) #=> [true, true, true]
Array.new(4) { Hash.new }  #=> [{}, {}, {}, {}]
Array.new(4) {|i| i.to_s } #=> ["0", "1", "2", "3"]
empty_table = Array.new(3) { Array.new(3) }
# => [[nil, nil, nil], [nil, nil, nil], [nil, nil, nil]]
```
