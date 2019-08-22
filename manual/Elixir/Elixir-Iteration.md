---
menu: Elixir
name: Elixir Iteration
---

# Elixir Iteration

```elixir
values = ["Ace", "Two", "Three", "Four", "Five"]
suits = ["Spades", "Clubs", "Hearts", "Diamonds"]

for suit <- suits, value <- values do
  "#{value} of #{suit}"
end
```
