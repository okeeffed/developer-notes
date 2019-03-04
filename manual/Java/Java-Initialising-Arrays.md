---
name: Initalising Arrays in Java
menu: Java
---

# Initialising Arrays in Java

Basic example on how to declare, declare with allocated size and initialise with default values:

```java
int[] allocArr = new int[2]; // init with memory for 2 spaces
int[] declareArr; // declaration
int[] withValues = { n.data }; // shorthand init with values
```

## Push, pop, shift, unshift

This requires the use of `List` and `ArrayList`

```java
Array.push    -> ArrayList.add(Object o); // Append the list
Array.pop     -> ArrayList.remove(int index); // Remove list[index]
Array.shift   -> ArrayList.remove(0); // Remove first element
Array.unshift -> ArrayList.add(int index, Object o); // Prepend the list
```

Example:

```java
import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        List<String> animals = new ArrayList<>();

        animals.add("Lion");
        animals.add("Tiger");
        animals.add("Cat");
        animals.add("Dog");

        System.out.println(animals); // [Lion, Tiger, Cat, Dog]

        // add() -> push(): Add items to the end of an array
        animals.add("Elephant");
        System.out.println(animals);  // [Lion, Tiger, Cat, Dog, Elephant]

        // remove() -> pop(): Remove an item from the end of an array
        animals.remove(animals.size() - 1);
        System.out.println(animals); // [Lion, Tiger, Cat, Dog]

        // add(0,"xyz") -> unshift(): Add items to the beginning of an array
        animals.add(0, "Penguin");
        System.out.println(animals); // [Penguin, Lion, Tiger, Cat, Dog]

        // remove(0) -> shift(): Remove an item from the beginning of an array
        animals.remove(0);
        System.out.println(animals); // [Lion, Tiger, Cat, Dog]

    }
}
```
