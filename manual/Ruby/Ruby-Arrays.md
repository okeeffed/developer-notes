---
name: Ruby Arrays
menu: Ruby
---

# Ruby Arrays

## Map

```ruby
class Arrays
    def self.updatesVar(arr)
        arr.map! {|x| x + "!"}
        return arr
    end

    def self.doesNotUpdateVar(arr)
        b = arr.map {|x| x + "!"}
        return arr
    end

    def self.returnsNewArr(arr)
        b = arr.map {|x| x + "!"}
        return b
    end
end
```
