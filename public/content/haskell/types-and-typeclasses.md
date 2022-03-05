---
menu: Haskell
name: Types and Typeclasses
---

# Types and Typeclasses

## Resources

1. [Learn You A Haskell](http://learnyouahaskell.com/types-and-typeclasses#believe-the-type)

## Checking types on ghci

Use the `:t` command followed by a valid expression.

```s
ghci> :t 'a'
'a' :: Char
ghci> :t True
True :: Bool
ghci> :t "HELLO!"
"HELLO!" :: [Char]
ghci> :t (True, 'a')
(True, 'a') :: (Bool, Char)
ghci> :t 4 == 5
4 == 5 :: Bool
```

## Function Types

We can choose to give functions an explicit type definition. This is considered good practice except for short functions.

```haskell
removeNonUppercase :: [Char] -> [Char]
removeNonUppercase st = [ c | c <- st, c `elem` ['A'..'Z']]
```

Here is an example for a function that takes three `Int` args and adds them together.

```haskell
addThree :: Int -> Int -> Int -> Int
addThree x y z = x + y + z
```

## Typeclasses

A typeclass is a sort of interface that defines some behavior. If a type is a part of a typeclass, that means that is supports and implements the behaviour the typeclass describes.

```s
ghci> :t (==)
(==) :: Eq a => a -> a -> Bool
ghci> 5 /= 5
False
ghci> :t 5 /= 5
5 /= 5 :: Bool
ghci> :t (>)
(>) :: Ord a => a -> a -> Bool
```

Typeclass `Ord` covers all comparing functions.

```s
ghci> "Abrakadabra" < "Zebra"
True
ghci> "Abrakadabra" `compare` "Zebra"
LT
ghci> 5 >= 2
True
ghci> 5 `compare` 3
GT
```

Members of `Show` can be presented as strings. All types covered so far except for functions are a part of Show. The most used function that deals with the Show typeclass is show. It takes a value whose type is a member of Show and presents it to us as a string.

```s
ghci> show 3
"3"
ghci> show 5.334
"5.334"
ghci> show True
"True"
```

`Read` is sort of the opposite typeclass of Show. The read function takes a string and returns a type which is a member of Read.

```s
ghci> read "True" || False
True
ghci> read "8.2" + 3.8
12.0
ghci> read "5" - 2
3
ghci> read "[1,2,3,4]" ++ [3]
[1,2,3,4,3]
```

## Type Annotations

Type annotations are a way of explicitly saying what the type of an expression should be. We do that by adding :: at the end of the expression and then specifying a type. Observe:

```s
ghci> read "5" :: Int
5
ghci> read "5" :: Float
5.0
ghci> (read "5" :: Float) * 4
20.0
ghci> read "[1,2,3,4]" :: [Int][1,2,3,4]
ghci> read "(3, 'a')" :: (Int, Char)
(3, 'a')
```

## Enum Members

`Enum` members are sequentially ordered types — they can be enumerated. The main advantage of the `Enum` typeclass is that we can use its types in list ranges. They also have defined successors and predecesors, which you can get with the succ and pred functions. Types in this class: (), Bool, Char, Ordering, Int, Integer, Float and Double.

```s
ghci> ['a'..'e']
"abcde"
ghci> [LT .. GT]
[LT,EQ,GT]
ghci> [3 .. 5]
[3,4,5]
ghci> succ 'B'
'C'
```

## Bounded

`Bounded` members have an upper and a lower bound.

```s
ghci> minBound :: Int
-2147483648
ghci> maxBound :: Char
'\1114111'
ghci> maxBound :: Bool
True
ghci> minBound :: Bool
False
```

minBound and maxBound are interesting because they have a type of (Bounded a) => a. In a sense they are polymorphic constants.

All tuples are also part of Bounded if the components are also in it.

```s
ghci> maxBound :: (Bool, Int, Char)
(True,2147483647,'\1114111')
```

## Num

`Num` is a numeric typeclass. Its members have the property of being able to act like numbers. Let's examine the type of a number.

```s
ghci> :t 20
20 :: (Num t) => t
```

It appears that whole numbers are also polymorphic constants. They can act like any type that's a member of the Num typeclass.

```s
ghci> 20 :: Int
20
ghci> 20 :: Integer
20
ghci> 20 :: Float
20.0
ghci> 20 :: Double
20.0
```

Those are types that are in the Num typeclass. If we examine the type of \*, we'll see that it accepts all numbers.

```s
ghci> :t (*)
(*) :: (Num a) => a -> a -> a
```

It takes two numbers of the same type and returns a number of that type. That's why `(5 :: Int) * (6 :: Integer)` will result in a type error whereas `5 * (6 :: Integer)` will work just fine and produce an Integer because 5 can act like an Integer or an Int.

To join Num, a type must already be friends with Show and Eq.

`Integral` includes only integral (whole) numbers. In this typeclass are `Int` and `Integer`.

`Floating` includes only floating point numbers, so `Float` and `Double`.
