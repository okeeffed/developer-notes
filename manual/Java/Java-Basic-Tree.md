---
name: Tree Data Structure
menu: Java
---

# Java - Basic Tree Data Structure

This is a basic implementation. The `bfs` and `dfs` methods each return a `List<Integer>` of the data stored in each `Node` to make a comparison.

## Answer

```java
// src/main/java/Tree.java
import main.java.Node;
import java.util.ArrayList;
import java.util.List;

class Tree {
    public Node root;

    public Tree() {
        this.root = null;
    }

    public Tree(Node root) {
        this.root = root;
    }

    public List<Integer> bfs() {
        if (this.root == null) {
            throw new NullPointerException("this.root is null");
        }

        List<Node> n = new ArrayList<>();
        n.add(this.root);

        List<Integer> res = new ArrayList<>();

        while (n.size() > 0) {
            Node child = n.remove(0);
            if (child.children != null) {
                n.addAll(child.children);
            }
            res.add(child.data);
        }

        return res;
    }

    public List<Integer> dfs() {
        if (this.root == null) {
            throw new NullPointerException("No root");
        }

        List<Node> n = new ArrayList<Node>();
        n.add(this.root);

        List<Integer> res = new ArrayList<Integer>();

        while (n.size() > 0) {
            Node child = n.remove(0);

            if (child.children != null) {
                n.addAll(0, child.children);
            }
            res.add(child.data);
        }

        return res;
    }
}
```

```java
// src/main/java/Node.java
package main.java;

import java.util.ArrayList;
import java.util.List;

public class Node {
    public Integer data;
    public List<Node> children;

    public Node() {
        this.data = null;
        this.children = new ArrayList<>();
    }

    public Node(Integer data) {
        this.data = data;
        this.children = new ArrayList<>();
    }

    public Node(Integer data, List<Node> children) {
        this.data = data;
        this.children = new ArrayList<>();
        this.children.addAll(children);
    }
}
```

```java
// test/java/TreeTest.java
import org.junit.Ignore;
import org.junit.Test;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import main.java.Node;

public class TreeTest {
    @Test
    public void testBFS() {
        Node n1 = new Node(1);
        Node n2 = new Node(2);
        Node n3 = new Node(3);
        Node n4 = new Node(4);
        Node n5 = new Node(5);

        List<Integer> expected = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            expected.add(i + 1);
        }

        Tree t = new Tree(n1);
        n1.children.add(n2);
        n1.children.add(n3);
        n2.children.add(n4);
        n3.children.add(n5);

        List<Integer> res = t.bfs();

        assertEquals(expected, res);
    }

    @Test
    public void testDFS() {
        Node n1 = new Node(1);
        Node n2 = new Node(2);
        Node n3 = new Node(3);
        Node n4 = new Node(4);
        Node n5 = new Node(5);

        List<Integer> expected = new ArrayList<>();
        expected.add(1);
        expected.add(2);
        expected.add(4);
        expected.add(3);
        expected.add(5);

        Tree t = new Tree(n1);
        n1.children.add(n2);
        n1.children.add(n3);
        n2.children.add(n4);
        n3.children.add(n5);

        List<Integer> res = t.dfs();

        assertEquals(expected, res);
    }
}
```
