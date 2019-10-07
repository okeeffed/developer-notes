---
menu: Kotlin
name: Kotlin Examples
---

# Kotlin Examples

## Plus Minus

Input:

```shell
6
-4 3 -9 0 4 1
```

Output:

```shell
0.500000
0.333333
0.166667
```

Prints positive, negative and zeroes.

```kotlin
fun plusMinus(arr: Array<Int>): Unit {
    var positive = 0
    var negative = 0
    var zeroes = 0

    for (i in arr) {
        when {
            i > 0 -> positive++
            i < 0 -> negative++
            else -> zeroes++
        }
    }

    println(1.0 / arr.size * positive)
    println(1.0 / arr.size * negative)
    println(1.0 / arr.size * zeroes)
}
```

## Nullable Types

```kotlin
var errorCode: Int?

errorCode = 100
// or for null
errorCode = null
```

Note that treating nullable types from non-nullable types will have unusual repercussions:

```kotlin
var result: Int? = 30
println(result) // 30

println(result + 1) // throws error "Operator call corresponds to a dot-qualified call 'result.plus(1)' which is not allowed on a nullable receiver 'result'."
```

### Unwrapping nullable values

There are two different methods you can use to remove these nullables from the box. The first is using the not-null assertion operator !! (use these sparingly):

```kotlin
val ageAfterBirthday = authorAge!! + 1
println("After their next birthday, author will bne $ageAfterBirthday") // prints as expected
```

### Smart Casts

This is the second way to go about it.

```kotlin
var nonNullableAuthor: String
var nullableAuthor: String?
if (authorName != null) {
  nonNullableAuthor = authorName
} else {
  nullableAuthor = authorName
}
```

### Safe Calls

Using the `?.` operator:

```kotlin
val nameLength = authorName?.length
println("Author's name has length $nameLength.")
// > Author's name has length 10.
```

### let() function

```kotlin
authorName?.let {
  nonNullableAuthor = authorName
}
```

### Elvis Operator

```kotlin
var nullableInt: Int? = 10
var mustHaveResult = nullableInt ?: 0
```

The following is equivalent:

```kotlin
// this...
var nullableInt: Int? = 10
var mustHaveResult = if (nullableInt != null) nullableInt else 0

// ...is the same as this
nullableInt = null
mustHaveResult = nullableInt ?: 0
```
