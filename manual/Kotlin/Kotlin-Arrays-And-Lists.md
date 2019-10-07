---
menu: Kotlin
name: Kotlin Arrays And Lists
---

# Kotlin Arrays And Lists

## Creating Arrays

Easiest way is to use the `arrayOf` func. Kotlin will infer the type.

```kotlin
val evenNumbers = arrayOf(2,4,6,8)

// easy way to create an array with default values
val fiveFives = arrayOf(5, {5}) // 5,5,5,5,5
```

## Array Of Primitives

```kotlin
val oddNumbers = intArrayOf(1,3,5,7)
val zeros = DoubleArray(4) // 0.0, 0.0, 0.0, 0.0
val otherOddNumbers = arrayOf(1,3,5,7).toIntArray()
```

## Lists

List type in Kotlin is an interface that has concrete realizations in types such as ArrayList, LinkedList and others.

Lists have the additional features of being `dynamically-sized`.

```kotlin
val innerPlanets = listOf("Mercury", "Venus", "Earth", "Mars")
```

### Empty Lists

```kotlin
val subscribers: List<String> = listOf()
// same as
val subscribers = listOf<String>()
```

### Mutable Lists

```kotlin
val outerPlanets = mutableListOf("Jupiter", "Saturn", "Uranus",
"Neptune")
val exoPlanets = mutableListOf<String>()
```

### List Properties and Methods

```kotlin
val players = mutableListOf("Alice", "Bob", "Cindy", "Dan")

print(players.isEmpty()) // > false

if (players.size < 2) {
  println("We need at least two players!")
} else {
  println("Let's start!")
}
// > Let's start!

var currentPlayer = players.first()
println(currentPlayer) // > Alice
println(players.last()) // > Dan

val minPlayer = players.min()
minPlayer.let {
  println("$minPlayer will start") // > Alice will start
}

println(arrayOf(2, 3, 1).first())
// > 2
println(arrayOf(2, 3, 1).min())
// > 1

val maxPlayer = players.max()
if (maxPlayer != null) {
  println("$maxPlayer is the MAX") // > Dan is the MAX
}

val firstPlayer = players[0]
println("First player is $firstPlayer")
// > First player is Alice
val secondPlayer = players.get(1)

val upcomingPlayersSlice = players.slice(1..2)
println(upcomingPlayersSlice.joinToString()) // > Bob, Cindy

players.slice(1..3).contains("Alice") // false
```

## Adding List Elements

```kotlin
players.add("Eli")
// or
players += "Gina"

println(players.joinToString())
// > "Alice", "Bob", "Cindy", "Dan", "Eli", "Gina"

// inserting elements
players.add(5, "Frank")
```

## Removing List Elements

```kotlin
val wasPlayerRemoved = players.remove("Gina")
println("It is $wasPlayerRemoved that Gina was removed")
// > It is true that Gina was removed

val removedPlayer = players.removeAt(2)
println("$removedPlayer was removed") // > Cindy was removed
```

## Iterating Through A List

```kotlin
for (player in players) {
  println(player)
}
// > Alice
// > Anna
// > Bob
// > Dan
// > Franklin

// with index
for ((index, player) in players.withIndex()) {
  println("${index + 1}. $player")
}
// > 1. Alice
// > 2. Anna
// > 3. Bob
// > 4. Dan
// > 5. Franklin

// if summing numbers
fun sumOfElements(list: List<Int>): Int {
  var sum = 0
  for (number in list) {
    sum += number
  }
return sum }
```
