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
