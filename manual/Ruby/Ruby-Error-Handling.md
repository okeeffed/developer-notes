---
name: Ruby Error Handling
menu: Ruby
---

# Ruby Error Handling

This is a basic example of raising and exception and rescueing the thrown exception.

```ruby
def raise_and_rescue
  begin
    puts 'I am before the raise.'
    raise 'An error has occured.'
    puts 'I am after the raise.'
  rescue
    puts 'I am rescued.'
  end
  puts 'I am after the begin block.'
end
```
