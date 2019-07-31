---
menu: Ruby
name: Rails Useful Tidbits
---

# Rails Useful Tidbits

## tl;dr

### Decent Exposure

A popular Rails gem helper for creating declarative interfaces in controllers. [Link here](https://github.com/hashrocket/decent_exposure).

```ruby
class ThingsController < ApplicationController
  # all the follpowing do the same way
  expose :thing, fetch: ->{ get_thing_some_way_or_another }
  expose(:thing){ get_thing_some_way_or_another }
  expose :thing, ->{ get_thing_some_way_or_another }
  expose :thing, :get_thing_some_way_or_another
end
```
