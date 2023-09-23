## Hello, world

```java
class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
        System.out.println("Testing, this");
    }
}
```

See https://docs.oracle.com/javase/8/docs/api/java/lang/System.html#out

## Scanning for input

https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Scanner.html

For reading input, we use the `Scanner` tool that comes with Java. The tool can be imported for use in a program by adding the command `import java.util.Scanner;` before the beginning of the main program's frame (`public class` ...). The tool itself is created with `Scanner scanner = new Scanner(System.in);`.

```java
import java.util.Scanner;

public class Program {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // We can now use the scanner tool.
        // This tool is used to read input.
    }
}
```

As an example:

```java
// Introduce the scanner tool used for reading user input
import java.util.Scanner;

public class Program {

    public static void main(String[] args) {
        // Create a tool for reading user input and name it scanner
        Scanner scanner = new Scanner(System.in);

        // Print "Write a message: "
        System.out.println("Write a message: ");

        // Read the string written by the user, and assign it
        // to program memory "String message = (string that was given as input)"
        String message = scanner.nextLine();

        // Print the message written by the user
        System.out.println(message);
    }
}
```

## Concatenation

```java
public class Program {

    public static void main(String[] args) {
        System.out.println("Hello " + "world!");
    }
}
```

## Variables

```java
String text = "contains text";
int wholeNumber = 123;
double floatingPoint = 3.141592653;
boolean trueOrFalse = true;

System.out.println("Text variable: " + text);
System.out.println("Integer variable: " + wholeNumber);
System.out.println("Floating-point variable: " + floatingPoint);
System.out.println("Boolean: " + trueOrFalse);
```

- You can change a variable's value using a statement that comprises the variable name, an equals sign, and the new value to be assigned. Remember to keep in mind that the variable type is only stated during the initial variable declaration.
- Once a variable's type has been declared, it can no longer be changed.

## Reading other value types

```java
import java.util.Scanner;

public class Program {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Write a value ");
        int value = Integer.valueOf(scanner.nextLine());
        System.out.println("You wrote " + value);
    }
}
```

```java
import java.util.Scanner;

public class Program {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Write a value ");
        double value = Double.valueOf(scanner.nextLine());
        System.out.println("You wrote " + value);
    }
}
```

```java
import java.util.Scanner;

public class program {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Write a boolean ");
        boolean value = Boolean.valueOf(scanner.nextLine());
        System.out.println("You wrote " + value);
    }
}
```
