---
menu: Elixir
name: Elixir School
---

# Elixir School

References and notes come from the [Elixir School page](https://elixirschool.com/en/).

## Basic Types

These just include unusual ones that are important to know:

### Atoms

A constant whose name is value - synonymous with Ruby Symbols:

```elixir
:foo == :bar # returns false
```

Booleans `true` and `false` are also the atoms `:true` and `:false`.

```elixir
true |> is_atom # true
:true |> is_boolean # true
:true === true # true
```

The names of modules are also atoms:

```elixir
is_atom(MyApp.MyModule) # true
```

Atoms are also used to reference modules from Erlang libraries, including built in ones.

```elixir
:crypto.strong_rand_bytes 3 # <<23, 104, 108>>
```

## Conditionals

Elixir provides the ||, &&, and ! boolean operators. There are three additional operators whose first argument must be a boolean (true or false):

```shell
iex> true and 42
42
iex> false or true
true
iex> not false
true
iex> 42 and true
** (ArgumentError) argument error: 42
iex> not 42
** (ArgumentError) argument error
```

Note: Elixir’s and and or actually map to `andalso` and `orelse` in Erlang.

## Comparisons

Elixir comes with all the comparison operators we’re used to: ==, !=, ===, !==, <=, >=, <, and >.

For strict comparison of integers and floats, use ===:

```shell
iex> 2 == 2.0
true
iex> 2 === 2.0
false
```

## Interpolation

```shell
iex> name = "Sean"
iex> "Hello #{name}"
"Hello Sean"
```

## Concatenation

```shell
iex> name = "Sean"
iex> "Hello " <> name
"Hello Sean"
```
