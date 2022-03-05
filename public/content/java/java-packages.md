---
menu: Java
name: Java Packages
---

# Java Packages

References:

1. https://www.programiz.com/java-programming/packages-import

## Intro

A package is simply a container that groups related types (Java classes, interfaces, enumerations and annotations). For example, in core Java, the ResultSet interface belongs to java.sql package. The package contains all the related types that are needed for SQL query and database connection.

## Built-in Packages

Built-in packages are existing java packages that come along with the JDK. For example, java.lang, java.util, java.io etc. For example:

```java
import java.util.ArrayList;
class ArrayListUtilization {
    public static void main(String[] args) {
        ArrayList<Integer> myList = new ArrayList<>(3);
        myList.add(3);
        myList.add(2);
        myList.add(1);
        System.out.println(myList);
    }
}

// output: myList = [3, 2, 1]
```

## User-defined Package

Use keyword `package`.

```java
package packagename;
```

Tree structure example:

```shell
└── com
  └── test
    └── Test.java
```

For the code:

```java
// Test.java
package com.test;

class Test {
    public static void main(String[] args){
        System.out.println("Hello World!");
    }
}
```

## Importing Packages

```java
import package.name.ClassName;   // To import a certain class only
import package.name.*;   // To import the whole package

// example
import java.util.Date; // imports only Date class
import java.io.*;      // imports everything inside java.io package
```

The following are equivocal:

```java
import java.util.Date;

class MyClass implements Date {
    // body
}

// same as...
class MyClass implements java.util.Date {
    //body
}
```

## Full Example

```java
// one file
package com.programiz;

public class Helper {
    public static String getFormattedDollar (double value){
        return String.format("$%.2f", value);
    }
}

// second file
import com.programiz.Helper;

class UseHelper {
    public static void main(String[] args) {

        double value = 99.5;
        String formattedValue = Helper.getFormattedDollar(value);
        System.out.println("formattedValue = " + formattedValue);
    }

}

// running gives formattedValue = $99.50
```
