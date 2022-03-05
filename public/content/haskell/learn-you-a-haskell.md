---
menu: Haskell
name: Learn You A Haskell
---

# Learn You A Haskell

import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

Everything here comes from the learning resources found at the [Learn You A Haskell](http://learnyouahaskell.com/) website.

## Interactive prompt

| Command        | Definition                                       |
| -------------- | ------------------------------------------------ |
| stack ghci     | Begin Haskell REPL                               |
| :l myfunctions | Import defined functions from `./myfunctions.hs` |
| :r             | Reloads current script                           |
| :quit          | Quick the REPL                                   |

## Bootstrap Learning Haskell

| Command         | Definition                      |
| --------------- | ------------------------------- |
| `+ - * /`       | Simple arithmetic               |
| `True && False` | Booleans - evaluates to `False` |
| `==` and `/=`   | Equals, not equals              |

## Functions

`*` is a function that takes two numbers and multiplies them. This is an `infix` function. Most functions that aren't used with numbers are `prefix` functions.

For example, take `min` or `max`:

```haskell
min 9 10
-- ^ 9
max 9 10
-- ^ 10
```

Note that `function application` (calling a function by putting a space after it and then typing out the parameters) has the highest precedence of them all. What that means for us is that these two statements are equivalent.

```s
ghci> succ 9 + max 5 4 + 1
16
ghci> (succ 9) + (max 5 4) + 1
16
```

## Writing Functions

Functions are defined in a similar manner to how they are called.

```haskell
doubleMe x = x + x
doubleMe 4
-- ^ returns 8
```

To write it as a module, touch `DoubleMe.hs` and add:

```haskell
module DoubleMe (
  doubleMe
) where

doubleMe :: Int -> Int
doubleMe x = x + x
```

Then, inside the REPL, run `:l DoubleMe.hs` and it will load the `doubleMe` function for you to run.

In the above example, we've done a simple typing as well for how `doubleMe` will run.

Declaring a function that incorporates more functions can look like the following:

```haskell
doubleUs x y = doubleMe x + doubleMe y
```

For a simple use case of if else in a function:

```haskell
doubleSmallNumber x = if x > 100
                        then x
                        else x*2
```

> The difference between Haskell's if statement and if statements in imperative languages is that the else part is mandatory in Haskell. In imperative languages you can just skip a couple of steps if the condition isn't satisfied but in Haskell every expression and function must return something.

## Expressions

Note that `5` is an expression in Haskell, as is `4 + 8` etc. If we wanted to add one to every result from an `if/else` block we could have put:

```haskell
doubleSmallNumber' x = (if x > 100 then x else x*2) + 1
```

Note the `'` at the end of the function name. That apostrophe doesn't have any special meaning in Haskell's syntax. It's a valid character to use in a function name. We usually use `'` to either denote a strict version of a function (one that isn't lazy) or a slightly modified version of a function or a variable. Because `'` is a valid character in functions, we could write:

```haskell
-- Completely valid syntax
conanO'Brien = "It's a-me, Conan O'Brien!"
```

## Lists

In Haskell, lists are a homogenous data structure. It stores several elements of the same type.

```haskell
let lostNumbers = [1,2,3,4,5]
```

Lists can be compared if the stuff they contain can be compared.

```haskell
[3,2,1] > [2,1,0]
-- ^ True
```

Some useful list operations:

| Function        | Definition                                 |
| --------------- | ------------------------------------------ |
| head            | Returns first element                      |
| tail            | Returns `[1:]` elements                    |
| last            | Returns last element                       |
| init            | Returns `[:-1]` elements                   |
| length          | Get list length                            |
| null            | Check if list is empty                     |
| reverse         | Self-explanatory                           |
| take n          | Take first n elements                      |
| drop n          | Drop first n elements and return rest      |
| minimum         | Self-explanatory                           |
| maximum         | Self-explanatory                           |
| sum             | Self-explanatory                           |
| product         | Self-explanatory                           |
| n \`elem\` list | Infix function to tell if n exists in list |

## Concatenation

```s
ghci> [1,2,3,4] ++ [9,10,11,12]
[1,2,3,4,9,10,11,12]
ghci> "hello" ++ " " ++ "world"
"hello world"
ghci> ['w','o'] ++ ['o','t']
"woot"
```

Putting something at the beginning of a list using the `:` operator (also called the cons operator) is instantaneous.

```s
ghci> 'A':" SMALL CAT"
"A SMALL CAT"
ghci> 5:[1,2,3,4,5]
[5,1,2,3,4,5]
```

`[1,2,3]` is actually just syntactic sugar for `1:2:3:[]`

## Get At Index

Use `!!`:

```s
ghci> "Steve Buscemi" !! 6
'B'
ghci> [9.4,33.2,96.2,11.2,23.25] !! 1
33.2
```

## Ranges

We can use `..` within lists as a shortcut for some ranges.

```s
ghci> [1..20]
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
ghci> ['a'..'z']
"abcdefghijklmnopqrstuvwxyz"
ghci> ['K'..'Z']
"KLMNOPQRSTUVWXYZ"
ghci> [2,4..8]
[2,4,6,8]
ghci> take 24 [13,26..]
[13,26,39,52,65,78,91,104,117,130,143,156,169,182,195,208,221,234,247,260,273,286,299,312]
ghci> take 10 (repeat 5)
[5,5,5,5,5,5,5,5,5,5]
ghci> replicate 3 10
[10,10,10]
```

## List Comprehension

In mathematics, take the following:

<BlockMath math="S = \{ 2 \cdot x \space | \space x \in \mathbb{N} , \space x \leq 10 \}" />

To represent this in Haskell, we can have the following:

```s
ghci> [x*2 | x <- [1..10]]
[2,4,6,8,10,12,14,16,18,20]
# Now let's add a condition (or a predicate) to that comprehension.
ghci> [x*2 | x <- [1..10], x*2 >= 12]
[12,14,16,18,20]
# All numbers between 50 and 100 whos remainer when divided with 7 is 3
ghci> [ x | x <- [50..100], x `mod` 7 == 3]
[52,59,66,73,80,87,94]
# We can include multiple predicates
ghci> [ x | x <- [10..20], x /= 13, x /= 15, x /= 19]
[10,11,12,14,16,17,18,20]
# You can also draw from several lists
ghci> [ x*y | x <- [2,5,10], y <- [8,10,11]]
[16,20,22,40,50,55,80,100,110]
```

We could take everything that we learned above and create a neat little function out of it!

```haskell
boomBangs xs = [ if x < 10 then "BOOM!" else "BANG!" | x <- xs, odd x]
```

Because strings are lists, we can use list comprehensions to process and produce strings. Here's a function that takes a string and removes everything except uppercase letters from it.

```haskell
removeNonUppercase st = [ c | c <- st, c `elem` ['A'..'Z']]
removeNonUppercase "Hahaha! Ahahaha!"
-- "HA"
removeNonUppercase "IdontLIKEFROGS"
-- "ILIKEFROGS"
```

List comprehensions also work on a list of lists:

```s
ghci> let xxs = [[1,3,5,2,3,1,2,4,5],[1,2,3,4,5,6,7,8,9],[1,2,4,2,1,6,3,1,3,2,3,6]]
ghci> [ [ x | x <- xs, even x ] | xs <- xxs]
[[2,2,4],[2,4,6,8],[2,4,2,6,2,6]]
```

> You can write list comprehensions across several lines. So if you're not in GHCI, it's better to split longer list comprehensions across multiple lines, especially if they're nested.

## Tuples

> A list of numbers is a list of numbers. That's its type and it doesn't matter if it has only one number in it or an infinite amount of numbers. Tuples, however, are used when you know exactly how many values you want to combine and its type depends on how many components it has and the types of the components.

```s
ghci> fst (8,11)
8
ghci> fst ("Wow", False)
"Wow"
ghci> snd (8,11)
11
ghci> snd ("Wow", False)
False
```

| Function | Definition                                 |
| -------- | ------------------------------------------ |
| fst      | First element of tuple                     |
| snd      | Second element of tuple                    |
| zip      | Take two lists and return a bunch of pairs |

```s
ghci> zip [1,2,3,4,5] [5,5,5,5,5]
[(1,5),(2,5),(3,5),(4,5),(5,5)]
ghci> zip [1 .. 5] ["one", "two", "three", "four", "five"]
[(1,"one"),(2,"two"),(3,"three"),(4,"four"),(5,"five")]
ghci> zip [5,3,2,6,2,7,2,5,4,6,6] ["im","a","turtle"]
[(5,"im"),(3,"a"),(2,"turtle")]
ghci> zip [1..] ["apple", "orange", "cherry", "mango"]
[(1,"apple"),(2,"orange"),(3,"cherry"),(4,"mango")]
```

Here's a problem that combines tuples and list comprehensions: which right triangle that has integers for all sides and all sides equal to or smaller than 10 has a perimeter of 24?

```haskell
let rightTriangles' = [ (a,b,c) | c <- [1..10], b <- [1..c], a <- [1..b], a^2 + b^2 == c^2, a+b+c == 24]
rightTriangles'
-- [(6,8,10)]
```
