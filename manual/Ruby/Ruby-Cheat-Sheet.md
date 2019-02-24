---
menu: Ruby
name: Ruby Cheat Sheet
---

# Ruby Cheat Sheet

## Loops

```ruby
i = 0
while i < 5 do
   puts i
   i += 1
end
```

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

### Accessing Elements

```ruby
arr = [1, 2, 3, 4, 5, 6]
arr[2]    #=> 3
arr[100]  #=> nil
arr[-3]   #=> 4
arr[2, 3] #=> [3, 4, 5]
arr[1..4] #=> [2, 3, 4, 5]
arr[1..-3] #=> [2, 3, 4]
arr.at(0) #=> 1
```

### Accessing with an error thrown for out of bounds

```ruby
arr = ['a', 'b', 'c', 'd', 'e', 'f']
arr.fetch(100) #=> IndexError: index 100 outside of array bounds: -6...6
arr.fetch(100, "oops") #=> "oops"
```
