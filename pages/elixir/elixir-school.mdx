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

## Pattern Matching

### Match Operator

```shell
# Assignment
iex> x = 1
1
# Pattern matching
iex> 1 = x
1
iex> 2 = x
** (MatchError) no match of right hand side value: 1

# Lists
iex> list = [1, 2, 3]
iex> [1, 2, 3] = list
[1, 2, 3]
iex> [] = list
** (MatchError) no match of right hand side value: [1, 2, 3]

iex> [1 | tail] = list
[1, 2, 3]
iex> tail
[2, 3]
iex> [2 | _] = list
** (MatchError) no match of right hand side value: [1, 2, 3]

# Tuples
iex> {:ok, value} = {:ok, "Successful!"}
{:ok, "Successful!"}
iex> value
"Successful!"
iex> {:ok, value} = {:error}
** (MatchError) no match of right hand side value: {:error}
```

### Pin Operator

```shell
iex> x = 1
1
iex> ^x = 2
** (MatchError) no match of right hand side value: 2
iex> {x, ^x} = {2, 1}
{2, 1}
iex> x
2
```

An example of pinning in a function clause:

```shell
iex> greeting = "Hello"
"Hello"
iex> greet = fn
...>   (^greeting, name) -> "Hi #{name}"
...>   (greeting, name) -> "#{greeting}, #{name}"
...> end
#Function<12.54118792/2 in :erl_eval.expr/5>
iex> greet.("Hello", "Sean")
"Hi Sean"
iex> greet.("Mornin'", "Sean")
"Mornin', Sean"
iex> greeting
"Hello"
```
