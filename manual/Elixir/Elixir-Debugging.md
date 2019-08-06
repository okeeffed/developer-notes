---
menu: Elixir
name: Debugging In Elixir
---

# Debugging In Elixir

## IO.Inspect/2

What makes `IO.inspect(item, opts \\ [])` really useful in debugging is that it returns the item argument passed to it without affecting the behavior of the original code.

```elixir
(1..10)
|> IO.inspect
|> Enum.map(fn x -> x * 2 end)
|> IO.inspect
|> Enum.sum
|> IO.inspect

[1, 2, 3]
|> IO.inspect(label: "before")
|> Enum.map(&(&1 * 2))
|> IO.inspect(label: "after")
|> Enum.sum

# 3
def some_fun(a, b, c) do
  IO.inspect binding()
  ...
end
```

Outputs:

```shell
# 1
1..10
[2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
110

# 2
before: [1, 2, 3]
after: [2, 4, 6]

# 3
[a: :foo, b: "bar", c: :baz]
```
