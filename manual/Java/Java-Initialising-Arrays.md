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

```java
Array.push    -> ArrayList.add(Object o); // Append the list
Array.pop     -> ArrayList.remove(int index); // Remove list[index]
Array.shift   -> ArrayList.remove(0); // Remove first element
Array.unshift -> ArrayList.add(int index, Object o); // Prepend the list
```
