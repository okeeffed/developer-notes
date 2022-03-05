---
menu: Ruby
name: Ruby Debugging
---

# Ruby Debugging

## Useful Resources

- https://www.rubyguides.com/2015/07/ruby-debugging/
- https://riptutorial.com/ruby-on-rails/example/31513/debugging-ruby-on-rails-application-with-pry (for haml)

## tl;dr

Using `binding.pry` is incredibly useful for debugging Rails apps (spec tests as well).

- When debugging spec tests, debug within an `it` block scope.

Once within the debugger:

- You can access variables by typing in the variable name
- Grep larger variable output for faster identification
