---
menu: Haskell
name: HackerRank Notes
---

# HackerRank Notes

## Hello, World!

```haskell
-- Enter your code here. Read input from STDIN. Print output to STDOUT
hello_world :: IO()
hello_world = putStrLn "Hello World"


-- This part relates to Input/Output and can be used as it is. Do not modify this section
main = do
	hello_world
```

## Looped Hello, World!

Haskell uses recursion, not loops:

```haskell
{-# LANGUAGE FlexibleInstances, UndecidableInstances, DuplicateRecordFields #-}

module Main where

import Control.Monad
import Data.Array
import Data.Bits
import Data.List
import Data.List.Split
import Data.Set
import Debug.Trace
import System.Environment
import System.IO
import System.IO.Unsafe

printNTimes n
    | n == 1        = putStrLn "Hello World"
    | otherwise     =
        do
            putStrLn "Hello World"
            printNTimes (n-1)

main :: IO()
main = do
    n <- readLn :: IO Int
    printNTimes n
```

## Print a number n times

Based on input:

```shell
3
1
2
3
```

Expect to get:

```shell
1
1
1
2
2
2
3
3
3
```

Answer:

```haskell
f :: Int -> [Int] -> [Int]
f n arr = -- Complete this function
    do
        [num | num <- arr, _ <- [1..n]]

-- This part handles the Input and Output and can be used as it is. Do not modify this part.
main :: IO ()
main = getContents >>=
       mapM_ print. (\(n:arr) -> f n arr). map read. words
```

## Write your own filter

Write a filter function where given delimiter `n` you return all numbers smaller.

```haskell
f :: Int -> [Int] -> [Int]
f n arr =
    do
        [num | num <- arr, num < n]

-- The Input/Output section. You do not need to change or modify this part
main = do
    n <- readLn :: IO Int
    inputdata <- getContents
    let
        numbers = map read (lines inputdata) :: [Int]
    putStrLn . unlines $ (map show . f n) numbers
```
