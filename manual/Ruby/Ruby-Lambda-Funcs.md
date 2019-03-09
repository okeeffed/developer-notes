---
name: Ruby Lambda Functions
menu: Ruby
---

# Ruby Lambda Functions

```ruby
class Lambda
    def self.hello
        helloWorld = lambda { return "Hello, World!" }
        res = helloWorld.call
    end

    def self.sum(a, b)
        sumLambda = lambda {|a,b| a + b }
        res = sumLambda.call(a, b)
    end
end
```
