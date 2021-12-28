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
-- create records
origin = { x = 0, y = 0 }
point = { x = 3, y = 4 }

-- access fields
origin.x == 0
point.x == 3

-- field access function
List.map .x [ origin, point ] == [ 0, 3 ]

-- update a field
{ point | x = 6 } == { x = 6, y = 4 }

-- update many fields
{ point | x = point.x + 1, y = point.y + 1 }
```

## Pipes

Note: "Pipes" is not the technical term in Elm.

```elm
viewNames1 names =
  String.join ", " (List.sort names)

viewNames2 names =
  names
    |> List.sort
    |> String.join ", "

-- (arg |> func) is the same as (func arg)
-- Just keep repeating that transformation!
```

## Let Expressions

This is useful once expressions get too big.

```elm
let
  twentyFour =
    3 * 8

  sixteen =
    4 ^ 2
in
twentyFour + sixteen

-- application with a hypotenuse function
let
  ( three, four ) =
    ( 3, 4 )

  hypotenuse a b =
    sqrt (a^2 + b^2)
in
hypotenuse three four

-- type annotations in "let" expressions
let
  name : String
  name =
    "Hermann"

  increment : Int -> Int
  increment n =
    n + 1
in
increment 10
```

## Applying Functions

```elm
-- alias for appending lists and two lists
append xs ys = xs ++ ys
xs = [1,2,3]
ys = [4,5,6]

-- All of the following expressions are equivalent:
a1 = append xs ys
a2 = xs ++ ys

b2 = (++) xs ys

c1 = (append xs) ys
c2 = ((++) xs) ys
```

## Elm Modules

> Qualified imports are preferred. Module names must match their file name, so module Parser.Utils needs to be in file Parser/Utils.elm.

```elm
module MyModule exposing (..)

-- qualified imports
import List                            -- List.map, List.foldl
import List as L                       -- L.map, L.foldl

-- open imports
import List exposing (..)              -- map, foldl, concat, ...
import List exposing ( map, foldl )    -- map, foldl

import Maybe exposing ( Maybe )        -- Maybe
import Maybe exposing ( Maybe(..) )    -- Maybe, Just, Nothing
```

## Type Annotations + Aliases

```elm
-- annotations
answer : Int
answer =
  42

factorial : Int -> Int
factorial n =
  List.product (List.range 1 n)

distance : { x : Float, y : Float } -> Float
distance {x,y} =
  sqrt (x^2 + y^2)

-- aliases
type alias Name = String
type alias Age = Int

info : (Name,Age)
info =
  ("Steve", 28)

type alias Point = { x:Float, y:Float }

origin : Point
origin =
  { x = 0, y = 0 }
```

## Custom Types

```elm
type User
  = Regular String Int
  | Visitor String
```

## Interoperability with JS and Porting

```elm
-- incoming values
port prices : (Float -> msg) -> Sub msg

-- outgoing values
port time : Float -> Cmd msg
```

To use this port from JS, you use this:

```javascript
var app = Elm.Example.init();

app.ports.prices.send(42);
app.ports.prices.send(13);

app.ports.time.subscribe(callback);
app.ports.time.unsubscribe(callback);
```
