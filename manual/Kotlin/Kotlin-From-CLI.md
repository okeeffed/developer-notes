---
menu: Kotlin
name: Kotlin From CLI
---

# Kotlin From CLI

## Resources

1. [Kotlin compile and run from CLI](https://www.codexpedia.com/kotlin/install-compile-and-run-kotlin-from-command-line/)

## Hello World from the CLI

```kotlin
fun main(args: Array<String>) {
    println("Hello World!")
}
```

## Compiling

```shell
kotlinc greeting.kt hello.kt -include-runtime -d hello.jar
```

## Running

```shell
java -jar hello.jar
```

## Running a task

Find Kotlin path with `which kotlin`.

```shell
export PATH=$PATH:/path/from/which/kotlin
function kotlinr() {
  echo Compiling, please wait...
  kotlinc $1 -include-runtime -d out.jar
  java -jar out.jar
}
```

After sourcing, you could now run `kotlinr hello.kt`.
