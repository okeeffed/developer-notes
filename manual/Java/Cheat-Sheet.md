---
name: Java Cheat Sheet
menu: Java
---

# Java Cheat Sheet

## Basic file

```java
// HellWorld.java
public class HelloWorld {
    private final int a, b;

    public HelloWorld(int a0, int b0) {
        a = a0;
        b = b0;
    }

    public static void Main(String[], args) {
        System.out.print("Hello, World");
    }
}
```

## Compilation

```shell
javac HelloWorld.java
```

## Types

| Type    |
| ------- |
| int     |
| double  |
| boolean |
| char    |
| String  |

## Declaring

```java
// declare statement
int a, b;
// assigning literal
a = 1234;
// inline initialization
int c = 1234;
```

## Printing

```java
void System.out.print(String s); // Print s
void System.out.println(String s); // print s, followed by new line
void System.out.println(); // print a new line
```

## Parsing

```java
// Example like so for parseDouble and parseLong too
int s = Integer.parseInt(String s);
```

## Arrays

```java
String[] wordArr = ["One", "Two", "Three"];
```
