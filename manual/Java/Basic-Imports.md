---
name: Basic Java Importing
menu: Java
---

# Basic Java Importing

Given the following example to test a `Linked List` Java class, we have the following layout for the `.java` and test files:

```shell
└── src
    ├── main
    │   └── java
    │       ├── LinkedList.java
    │       └── Node.java
    └── test
        └── java
            └── LinkedListTest.java
```

## File 1: src/main/java/LinkedList.java

```java
import main.java.Node;

class LinkedList {
    Integer size;
    Node head;

    public LinkedList() {
        this.size = 0;
        this.head = null;
    }

    public LinkedList(Node head) {
        this.size = 1;
        this.head = head;
    }

    public Integer getSize() {
        return this.size;
    }

    public Node getFirst() {
        return this.head;
    }
}
```
