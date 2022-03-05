---
menu: Ruby
name: Ruby Currying
---

# Ruby Currying

```ruby
power_function = -> (x, z) {
    (x) ** z
}

base = gets.to_i
raise_to_power = power_function.curry.(2)

power = gets.to_i
puts raise_to_power.(power)
```
