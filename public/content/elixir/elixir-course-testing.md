---
menu: Elixir
name: Elixir Course Testing/Documentation
---

# Elixir Course Testing And Documentation

## Documentation

Two types:

1. Module documentation: purpose of module
2. Function documentation: purpose of individual functions

Using `ex_doc` as the required module, add `{:ex_doc, "~> 0.21.1"},` to you deps (or the latest version) and after fetching deps, run `mix docs` to generate the documentation.

Documentation can then be found at `doc/index.html`.

Examples:

```elixir
defmodule ModuleName.Queries do
  @moduledoc """
  Provides Ecto queries for querying important Action Framework requirement.
  """

  import Ecto.Query

  @doc """
  Does a thing

  ## Examples

      iex> query = "Hello, World!"
      iex> query
      "Hello, World!"
  """
  def hello_world() do
    "Hello, World!"
  end
end
```

## Elixir Testing

There are two distinct types of tests we can write:

1. Assertion tests
2. Doc testing

## Example Test

```elixir
defmodule Cards do
  def create_deck do
    values = ["Ace", "Two"]
    suits = ["Spades", "Clubs"]
  end

  # ... more
end
```

Testing can be considered a first-class citizen. It comes built into Elixir.

When you generate the project with `mix`, you get a test folder put in automatically.

The `cards_test.exs` file is specifically built for testing the functions used in `cards_test.exs`.

Note that running `elixir test` will end up with two tests run with 0 failures.

The "mystery" test cmes frm the `@doc` tag `## Examples` - it will run that chunk of code as if it is a test!

Example, the following code will run as a test:

```elixir
@doc """
  Divides a deck ito a hand and the remainder of the deck.

## Examples

    iex> deck = Card.create_deck
    iex> {hand, deck} = Cards.deal(deck, 1)
    iex> hand
    ["Ace of Spaces"]
"""
def deal(deck, hand_size) do
  Enum.split(deck, hand_size)
end
```

## Important Tidbits

Worth noting for a basic Elixir test example:

```elixir
defmodule CardsTest do
  use ExUnit.Case
  doctest Cards
end
```

`doctest` is used for testing the documentation examples.

## Case Tests

For the terms `use ExUnit.Case`:

```elixir
defmodule CardsTest do
  use ExUnit.Case
  doctest Cards

  test "create_deck makes 20 cards" do
    deck_length = length(Cards.create_deck)
    assert deck_length == 20
  end
end
```

## Assert vs Refute

The `refute` keyword is just the opposite of `assert`.
