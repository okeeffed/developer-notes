---
menu: Rspec
name: Working with dates
---

# Working with dates

## Resources

1. [RSpec working with dates and times](https://blog.coingecko.com/working-with-dates-and-times-in-rails-rspec-testing/)

```ruby
let!(:item) { Item.create(:item, name: "Bean", expiration_date: Time.current) }

described "#expired?" do
  it "return false when item is yet to be expired" do
    travel_to(Time.current - 5.day) do
      expect(item.expired?).to eq(false)
    end
  end
  it "return true when item is expired" do
    travel_to(Time.current + 5.day) do
      expect(item.expired?).to eq(true)
    end
  end
end
```

You can also use a specific date:

```ruby
Time.current     # => Sat, 10 Nov 2010 00:00:00 EST -05:00
travel_to Time.zone.local(2020, 10, 1, 00, 00, 00)
Time.current     # => Wed, 1 Oct 2020 00:00:00 EST -05:00
```
