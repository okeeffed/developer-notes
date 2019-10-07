---
menu: Kotlin
name: Kotlin Basics
---

# Kotlin Basics

This highlight just covers scenarios not entirely standardised to most programming languages eg it will not cover while loops etc.

## Kotlin REPL

Brew install `kotlin` and then you'll have access to the REPL.

Use `kotlinc` with no arguments to enter the REPL.

To compile and run code from the command line:

```shell
kotlinc hello.kt -include-runtime -d hello.jar
java -jar hello.jar
```

## Hello, Kotlin

```kotlin
fun main(args: Array<String>) {
  println("Hello, Kotlin!")
}
```

## Shift Operators

```kotlin
1 shl 3 // shift left
32 shr 2 // shift right
```

## Math Functions

```kotlin
import kotlin.math.*

fun main(args: Array<String>) {
  sin(45 * PI / 180) // 0.7071067811865475
}

sqrt(4.0) // 2.0

max(1,2) // 2
```

## Naming

```kotlin
val number: Int = 10 // constants

const val reallyConstant: Int = 42 // top level keyword to mark it as compile-time constant

var variableNumber: Int = 42
variableNumber = 12 // allowed
```

## Type Conversion

```kotlin
var integer: Int = 100
var decimal: Double = 12.5
integer = decimal // THROWS error
integer = decimal.toInt() // works nicer
```

To do implicit conversion:

```kotlin
val hourlyRate: Double = 19.5
val hoursWorked: Int = 10
val totalCost: Double = hourlyRate * hoursWorked
```

## Chars Vs Strings

```kotlin
val characterA: Char = 'a' // must be single quotes
val stringDog: String = "Dog" // must be double quotes
```

String interpolation happens with `$`:

```kotlin
var name = "Dick"
var message = "Hello my name is $name!" // "Hello my name is Dick!"
```

Multiline strings:

```kotlin
let bigString = """
  |You can have a string
  |that contains multiple
  |lines
  |by
  |doing this.
  """.trimMargin()
println(bigString)
```

The above will print:

```text
You can have a string
that contains multiple
lines
by
doing this.
```

## Pair + Triples

```kotlin
val coordinates: Pair<Int, Int> = Pair(2, 3)
val coordinates3D = Triple(2, 3, 1)
```

## Number types

```kotlin
val a: Short = 12
val b: Byte = 120
val c: Int = -100000

val answer = a + b + c // Answer will be an Int
```

## Any, Unit, and Nothing

```kotlin
val anyNum: Any = 1
val anyString: Any = "Yo"
```

`Unit` is a special type which only ever represents one value: the Unit object. It is similar to the void type in Java, except it makes working with generics easier:

```kotlin
fun add() {
  val result = 2 + 2
  println(result)
}

// same as
fun add(): Unit {
  val result = 2 + 2
  println(result)
}
```

`Nothing` is a type that is helpful for declaring that a function not only doesn't return anything, but also never completes.

This can occur if a function either causes the program to stop completely by throwing an `Exception` or if it simply goes on forever without ever finishing.

## Control Logic

Worth noting if/else can be single line ie `val min = if (a < b) a else b`.

### Range

```kotlin
val closedRange = 0..5 // (0,1,2,3,4,5)
val halfOpenRange = 0 until 5 // (0,1,2,3,4)
val decreasingRange = 5 downTo 0 // (5,4,3,2,1,0)
```

### Repeat

```kotlin
sum = 1
var lastSum = 0
repeat(10) {
  val temp = sum
  sum += lastSum
  lastSum = temp
}
```

### Stepping

```kotlin
sum = 0
for (i in 1..count step 2) {
  sum += i
}
```

You could even `downTo` step:

```kotlin
sum = 0
for (i in count downTo 1 step 2) {
  sum += i
}
```

### Labelled Statements

```kotlin
sum = 0
for (row in 0 until 8) {
  if (row % 2 == 0) {
    continue
  }
  for (column in 0 until 8) {
    sum += row * column
  }
}
```

## When Expressions

```kotlin
val number = 10
when (number) {
  0 -> println("Zero")
  else -> println("Non-zero")
}

// multi-valued whens
val string = "Dog"
when (string) {
  "Cat", "Dog" -> println("Animal is a house pet.")
  else -> println("Animal is not a house pet.")
}

// when in range
timeOfDay = when (hourOfDay) {
  in 0..5 -> "Early morning"
  in 6..11 -> "Morning"
  in 12..16 -> "Afternoon"
  in 17..19 -> "Evening"
  in 20..23 -> "Late evening"
  else -> "INVALID HOUR!"
}

// conditions in when statements
when {
  x == 0 && y == 0 && z == 0 -> println("Origin")
  y == 0 && z == 0 -> println("On the x-axis at x = $x")
  x == 0 && z == 0 -> println("On the y-axis at y = $y")
  x == 0 && y == 0 -> println("On the z-axis at z = $z")
  else -> println("Somewhere in space at x = $x, y = $y, z = $z")
}
```

## Functions

Note that parameters are constants by default.

```kotlin
fun printMyName() {
  println("My name is Dick Lucas.")
}

// with params
fun printMultipleOfFive(value: Int) {
  println("$value * 5 = ${value * 5}")
}
printMultipleOfFive(10)

// string interpolated
fun printMultipleOf(multiplier: Int, andValue: Int) {
  println("$multiplier * $andValue = ${multiplier * andValue}")
}
printMultipleOf(4, 2)
```

If a function consists solely of a single expression, you can assign the expression to the function using = while at the same time not using braces, a return type, or a return statement:

```kotlin
fun multiplyInferred(number: Int, multiplier: Int) = number * multiplier
```

### Overloading

```kotlin
fun getValue(value: Int): Int {
  return value + 1
}
fun getValue(value: String): String {
  return "The value is $value"
}
```

### Functions As Variables

```kotlin
fun add(a: Int, b: Int): Int {
  return a + b
}

var function = ::add
function(4,2) // works
```
