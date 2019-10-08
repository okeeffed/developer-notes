---
menu: Kotlin
name: Kotlin Lambdas
---

# Kotlin Lambdas

Also known as anonymous functions - name deriving from lambda calculus of Alonzo Church where all functions are anonymous.

Also synonymous with closures.

```kotlin
// declaration of a var that can hold a lambda
var multiplyLambda: (Int, Int) -> Int

multiplyLambda = { a: Int, b: Int -> Int
  a*b
}

val lambdaResult = multiplyLambda(4, 2) // 8
```

## Shorthand Syntax

```kotlin
multiplyLambda = { a, b ->
  a*b
}

// using it keyword for argument
var doubleLambda = { a: Int ->
  2*a
}
doubleLambda = { 2 * it }

// in declaration
val square: (Int) -> Int = { it * it }
```

## Lambdas As Arguments

```kotlin
fun operateOnNumbers(a: Int, b: Int, operation: (Int, Int) -> Int): Int {
  val result = operation(a, b)
  println(result)
  return result
}

// in use
val addLambda = { a: Int, b: Int ->
a+b }
operateOnNumbers(4, 2, operation = addLambda) // 6

// more usual
fun addFunction(a: Int, b:Int) = a + b
operateOnNumbers(4, 2, operation = ::addFunction) // 6

// or even
operateOnNumbers(4, 2, operation = { a: Int, b: Int ->
  a+b
})
```

## Lambdas with no meaningful return

```kotlin
var unitLambda: () -> Unit = {
  println("Kotlin Apprentice is awesome!")
}
unitLambda()
```

If you literally want no value returnedm you need to use the `Nothing` type:

```kotlin
var nothingLambda: () -> Nothing = { throw NullPointerException() }
```

## Iterating over collections with lambdas

```kotlin
val values = listOf(1, 2, 3, 4, 5, 6)
values.forEach {
  println("$it: ${it * it}")
}
// > 1: 1
// > 2: 4
// > 3: 9
// > 4: 16
// > 5: 25
// > 6: 36
```

To filter some of these out:

```kotlin
var prices = listOf(1.5, 10.0, 4.99, 2.30, 8.19)
val largePrices = prices.filter {
  it > 5.0
}

// the above function looks like so
public inline fun <T> Iterable<T>.filter(predicate: (T) -> Boolean):
List<T>

val userInput = listOf("0", "11", "haha", "42")
val numbers = userInput.map {
  it.toIntOrNull()
}
println(numbers) // > [0, 11, null, 42]

// array [1,2,3,4]
sum = prices.reduce { a, b ->
  a + b
}
println(sum) // 10

// similar but takes initial value
var sum = prices.fold(0.0) { a, b -> a + b }
```
