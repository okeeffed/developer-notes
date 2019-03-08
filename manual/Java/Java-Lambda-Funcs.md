---
name: Java Lambda Funcs
menu: Java
---

# Java Lambda Funcs

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
