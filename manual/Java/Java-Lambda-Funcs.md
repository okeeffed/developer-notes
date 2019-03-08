---
name: Java Lambda Funcs
menu: Java
---

# Java Lambda Funcs

The basic gist is to generate a `interface` with the lambda signature, then explicitly create a function preface by the interface type.

This will allow you to call the lambda function as a instance method.

## Example

```java
// src/main/java/Lambda.java
interface Anon {
    String helloWorld();
}

interface AnonInt {
    int sum(int a, int b);
}

class Lambda {
    String hello() {
        Anon anon = () -> "Hello, World!";
        return anon.helloWorld();
    }

    int sumOnePlusTwo() {
        AnonInt anon = (int a, int b) -> a + b;
        return anon.sum(1, 2);
    }
}
```

As for the test file:

```java
// src/tests/java/LambdaTest.java
import org.junit.Ignore;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class LambdaTest {
    @Test
    public void testLambda() {
        assertEquals("Hello, World!", new Lambda().hello());
    }

    @Test
    public void testLambdaSum() {
        assertEquals(3, new Lambda().sumOnePlusTwo());
    }
}
```
