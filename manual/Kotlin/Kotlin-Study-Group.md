---
menu: Kotlin
name: Kotlin Study Group
---

# Kotlin Study Group

## Shortcuts

| Shortcut                                                   | Action                                   |
| ---------------------------------------------------------- | ---------------------------------------- |
| shift \* 3                                                 | Search for shortcuts                     |
| ctrl + mousewheel                                          | Zoom. Option must be enabled.            |
| ctrl + option + h                                          | Tree of calls                            |
| ctrl + h                                                   | Creation hierarchy                       |
| option + up                                                | Extend selection                         |
| cmd + backspace                                            | Destroy line                             |
| cmd + shift + p                                            | Shows you what highlighted text is       |
| shift \*3 > "Add inferred type arguments                   | Types inferred                           |
| cmd + f12                                                  | All methods defined                      |
| ctrl + space (maybe + shift)                               | Code completion                          |
| cmd + p                                                    | Arguments required                       |
| ctrl + space + up                                          | Suggestions through codebase             |
| cmd + shift + enter                                        | Finish line, put me on next one          |
| option + enter (on classes with interface implementations) | Interface member inference               |
| cmd + click                                                | Navigate to definition                   |
| option + f6                                                | Rename                                   |
| cmd + d                                                    | Diff window                              |
| cmd + f6                                                   | Refactor functions                       |
| TODO: extract to parameter                                 | Extract to function param                |
| cmd + shift + t                                            | Go to spec (may need Kotlin test plugin) |
| ctrl + shift + j                                           | Refactor lines                           |

## Toy Robot notes

Robot on infinite plane.

```kotlin
import kotlin.math.absoluteValue
fun main() {
    val instructions = "R3L2R7L4"
    val distance = robotDistance(instructions)
    println("hello world $distance")
}
enum class Direction {
    NORTH {
        override fun right() = EAST
        override fun left() = WEST
    },
    SOUTH {
        override fun right() = WEST
        override fun left() = EAST
    },
    EAST {
        override fun right() = SOUTH
        override fun left() = NORTH
    },
    WEST {
        override fun right() = NORTH
        override fun left() = SOUTH
    };
    abstract fun right(): Direction
    abstract fun left(): Direction
}
data class RobotState(val x: Int = 0, val y: Int = 0, val direction: Direction = Direction.NORTH) {
    fun right(): RobotState = this.copy(direction = direction.right())
    fun left(): RobotState = this.copy(direction = direction.left())
    fun move(distance: Int) = when(direction) {
        Direction.NORTH -> copy(y = y + distance)
        Direction.EAST -> copy(x = x + distance)
        Direction.SOUTH -> copy(y = y - distance)
        Direction.WEST -> copy(x = x - distance)
    }
}
fun robotDistance(instructions: String): Int {
    val regex = Regex("(R|L|\\d+)")
    val tokens = regex.findAll(instructions).map { it.groupValues[1] }
    val finalState = tokens.fold(RobotState()) { acc: RobotState, token: String ->
        when (token) {
            "R" -> acc.right()
            "L" -> acc.left()
            else -> acc.move(token.toInt())
        }
    }
    return finalState.x.absoluteValue + finalState.y.absoluteValue
}
```

## Preferences

- Can update to show definition on hover
