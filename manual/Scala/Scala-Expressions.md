---
name: Scala Expressions
menu: Scala
---

# Scala Expressions

As opposed to instructions, everything in Scala is considered an `expression`. Even if/else statements themselves in Scala are expressions.

## For Loops

For loops are not recommended in Scala. They return `Unit` which in itself is equivalent to`null`. This is the case for side effects - an intergral part of understanding Scala.

## Code Blocks

Note that if you write a code block, the last value in the code block is returned as the value.

```scala
val codeBlock = {
    val a = 1
    val b = 2

    if(a < b) "hi" else "bye"
}

println(codeBlock)
// evaluates to "hi"
```

## Examples of expressions in actions

```scala
"hello" // type String
println("hello") // type Unit

// type Boolean
val a = {
    2 < 3
}

// type Int value 10
val b = {
    if(a) 123 else 321
    10
}
```
