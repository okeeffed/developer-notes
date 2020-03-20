---
menu: Haskell
name: Haskell From First Principles
---

# Haskell From First Principles

import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

## Resources

1. [A Tutorial Intro to Lambda Calculus](https://www.inf.fu-berlin.de/lehre/WS03/alpi/lambda.pdf)

## What is a function

> A set of possible inputs and a set of possible outputs

<BlockMath math="f(1) = A" />
<BlockMath math="f(2) = B" />
<BlockMath math="f(3) = C" />

The input set (domain) is `{1,2,3}` and the output set (codomain) is `{A,B,C}`.

In our function, an input of `1` will ALWAYS return `A`, no exceptions.

## Lambda termd

Lambda calculus has three basic components:

1. Expressions
2. Variables
3. Abstractions

The word `expression` refers to a superset of those things. It can be a variable name, an abstraction or a combination of those things.

An `abstraction` is a function. It is a lambda term that has a head (a lambda) and a body and is applied to an argument. An `argument` is an input value.

Abstractions consist of the `head` and the `body`. The head of the function is a lambda followed by a variable name. The body of the function is another expression.

A simple function might look like this:

<BlockMath math="\lambda x.x" />

The variable named in the head is the `parameter` and `binds` all instances of that same variable in the body of the function. In laymen terms, when we apply this function to an argument, each `x` in the body of the function will have the value of that argument.

In the above, we were reference functions called `f`, but in the previous section the lambda astraction has no name and is an `anonymous function`.

A named function can be called by name by another function, a lambda cannot.

### Breakdown of the lambda

The extent of the lambda:

<BlockMath math="\lambda x." />

The first `x` is the single parameter of the function. This binds an variables:

The second `x` is part of the body, the expression the lambda returns when applied. This is a bound variable.

The `.` separates the parameters of the lambda from the function body.

## Alpha Equivalence

<BlockMath math="\lambda x.x" />

In the above expression, the variable `x` is not semantically meaningful except in its role in that single expression. Because of this, there's a form of equivalence between lambda terms called `alpha equivalence`. This is a way of saying:

<BlockMath math="\lambda x.x = \lambda d.d = \lambda z.z" />

## Beta reduction

When we apply a function to an argument, we substitute the input expression for all instances of the bound variables within the body of the abstraction. You also eliminate the head of the abstraction, since its only purpose was to bind the variable. This is called `beta reduction`.

We can do one using a number. We apply the function above to `2`, substitude `2` for each bound variable in the body of the function and eliminate the head:

<BlockMath math="( \lambda x.x ) 2 = 2" />

The only bound variable is a single `x`, so applying this function to 2 returns 2. This function is the `identity` function.

## Free variables

<BlockMath math="\lambda x.xy" />

In this example, `x` is a bound variable, `y` is a free variable.

## Multiple arguments

> Each lambda can only bind one parameter and can only accept one argument. Functions that require multiple arguments have multiple, nested heads. When you apply it once and eliminate the first (leftmost) head, the next is applied and so on. It is know as `currying`.

## Evaluation is simplication

There are multiple normal forms in lambda calculus, but here when we refer to normal form we mean `beta normal form`. This corresponds to a fully evaluated expression (or a fully executed program). For example, do you say `2000/1000` or do you say 2? You say 2. The normal form of the evaluated expression is therefore 2.

Note: if we had function `(x,y) => x/y` and apply `x = 2000` and `y = 1000`, we call the the body with all arguments applied `saturated`.

## Combinators

A `combinator` is a lambda term with no free variables. Combinators, as the name suggests, serve only to `combine` the arguments that they are given.

## Divergence

Not all reducible lambda terms reduce neatly to a beta normal form. Reducing the following repeats itself:

<BlockMath math="(\lambda x.xx)(\lambda x.xx)" />
<BlockMath math="(x := \lambda x.xx|xx)" />
<BlockMath math="(\lambda x.xx)(\lambda x.xx)" />

## Hello, Haskell!

```haskell
-- Say Hello
sayHello :: String -> IO ()
sayHello x =
  putStrLn ("Hello, " ++ x ++ "!")
```

If in the `stack ghci` REPL, you can unload the file using `:m` and reload updated files using `:r`.

### Normal Form Reminder

Haskell reduces until we reach the normal form. Remember, `1 + 1` can be evaluated to `2`, thus Haskell returns the normal form.

## Redexes

Reducibles expressions such as `1 + 1` are also known as `redexes`. While we generally refer to this process as evaluation or reduction, you may also hear of it as `normalizing` or `executing` an expression (though somewhat imprecise).

## Functions

Functions are a specific type of expression. Functions in Haskell relate to functions in mathematics - they map an input or set of inputs to an output.

Because they are built purely of expressions, they will always evaluate to the same result when given the same values.

> As with Lambda Calculus, all functions in Haskell take one argument and return one result. Even when it seems we are passing multiple arguments, we are actually applying a series of nested functions (each to one argument). This is called `currying`.

```haskell
-- in GHCi REPL
let triple x = x * 3
-- in source file
triple :: Number -> Number
triple x = x * 3
```

## Evaluation

When we talk about evaluating an expression, we're talking about reducing the terms until it is in the simplest form. We say it is `irreducible` or finished evaluating.

Haskell uses `nonstrict evaluation` (sometimes called `lazy evaluation`) stategy which defers evaluations of terms until they're forced by other terms referring so them.

Here is the reduction of our `triple` function:

```haskell
triple 2
-- [triple x = x * 3; x:= 2]
2 * 3
6
```

The above is reduced to its normal form, however Haskell only evalutes is weak head normal form (WHNF) but default. This means things are not always reduced to its irreducible form straight away.

`(\f -> (1, 2 + f)) 2` reduces to the following in WHNF `(1, 2 + 2)` before it is evaluated further.

## Infix Operators

Functions in Haskell default to prefix syntax (like the `triple` func above).

Operators for example are functions that can be used in the infix style.

You can sometimes use functions infix style with a small change in syntax:

```haskell
10 `div` 4
div 10 4
(/) 10 4
2.5
```

If the function is alphanumeric, it is prefix by default. If it is a symbol, it is infix by default.

## Associativity and precedence

This BODMAS (from Mathematics) for precedence.

We can use `:info` to get more info about an operator.

```haskell
Prelude> :i (/) (+) (-)
class Num a => Fractional a where
  (/) :: a -> a -> a
  ...
        -- Defined in ‘GHC.Real’
infixl 7 /
class Num a where
  (+) :: a -> a -> a
  ...
        -- Defined in ‘GHC.Num’
infixl 6 +
class Num a where
  ...
  (-) :: a -> a -> a
  ...
        -- Defined in ‘GHC.Num’
infixl 6 -
```

- `infixl` means infix operator and left associative
- `7|6` is the precendence - higher is applied first
- The last part is the function name (in this case the `/`, `+` and `-`)

An example of a right-associative infix operator is the power operator `^`.

## Declaring values

```haskell
-- in the REPL
Prelude> let y = 10
Prelude> let x = 10 * 5 + y
Prelude> let myResult = x * 5
-- in a file
-- learn.hs
module Learn where
x = 10 * 5 + y
myResult = x * 5
y = 10
```

## \$ Operator

The (\$) operator is a convenience for when you want to express something with fewer pairs of parentheses:

```haskell
 -- Remember ($)'s definition
f $ a = f a
-- in use
Prelude> (2^) (2 + 2)
16
-- can replace those parentheses
 Prelude> (2^) $ 2 + 2
16
-- without either parentheses or $
 Prelude> (2^) 2 + 2
 6
```

The (\$) will allow everything to the right of it to be evaluated first and can be used to delay function application.

## Let and where

The contrast here is that let introduces an expression, so it can be used wherever you can have an expression, but where is a declaration and is bound to a surrounding syntactic construct.

```haskell
-- FunctionWithWhere.hs
module FunctionWithWhere where

printInc n = print plusTwo
  where plusTwo = n + 2


printInc2 n = let plusTwo = n + 2
  in print plusTwo
```

## Strings

```haskell
Prelude> :type 'a'
'a' :: Char
Prelude> :type "Hello!"
"Hello!" :: [Char]
```

To print strings we can use `print` in the REPL or `putStrLn` and `putStr` for our Haskell modules.

Mutliline "do" can be done like so:

```haskell
-- print2.hs
module Print2 where
main :: IO () main = do
  putStrLn "Count to four for me:"
  putStr   "one, two"
  putStr   ", three, and"
  putStrLn " four!"
```

String concatenation:

```haskell
-- print3.hs
module Print3 where

myGreeting :: String
myGreeting = "hello" ++ " world!" hello :: String

hello = "hello" world :: String
world = "world!"

main :: IO () main = do
  putStrLn myGreeting
  putStrLn secondGreeting
  where secondGreeting =
    concat [hello, " ", world]
```

## Top-level versus local definitions

```haskell
module TopOrLocal where

topLevelFunction :: Integer -> Integer topLevelFunction x =
  x + woot + topLevelValue
  where woot :: Integer
        woot = 10

topLevelValue :: Integer
topLevelValue = 5
```

## Basic Datatypes

The type constructor is the name of the type and is capitalized. When you are reading or writing type signatures (the type level of your code), the type names or type constructors are what you use.
