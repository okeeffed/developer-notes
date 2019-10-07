---
menu: Kotlin
name: Kotlin Apprentice
---

# Kotlin Apprentice

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
