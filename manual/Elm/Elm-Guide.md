---
menu: Elm
name: Elm Guide
---

# Elm Guide

This is a basic Elm guide that follows on from the [core language tour](https://guide.elm-lang.org/core_language.html).

## Values

```elm
-- Boolean
True  : Bool
False : Bool

42    : number  -- Int or Float depending on usage
3.14  : Float

'a'   : Char
"abc" : String

-- multi-line String
"""
This is useful for holding JSON or other
content that has "quotation marks".
"""
```

## Comments

```elm
-- a single line comment

{- a multiline comment
   {- can be nested -}
-}

-- remove the } below to toggle on/off
{--}
add x y = x + y
--}
```

## Lists

The following are equivocal:

```elm
[1,2,3,4]
1 :: [2,3,4]
1 :: 2 :: 3 :: 4 :: []
```

## Conditionals

```elm
if powerLevel > 9000 then "Over 9000!" else "dbz joke not applicable"

-- multiple conditions
if key == 40 then
  n + 1
else if key == 38 then
  n - 1
else
  n

-- conditionals based on structure of algebraic data types and literals
case maybeList of
  Just xs -> xs
  Nothing -> []

case xs of
  [] ->
    Nothing
  first :: rest ->
    Just (first, rest)

case n of
  0 -> 1
  1 -> 1
  _ -> fib (n-1) + fib (n-2)
```

## Functions

```elm
square n =
  n^2
```

## Records

```elm

```
