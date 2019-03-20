---
name: PHP Arrays
menu: PHP
---

# PHP Array Method Applications

This covers the basic actions of applying a push, pop, shift and unshift function with PHP.

These functions are incredibly useful for data structure implementations.

## Push

Using `array_push`:

```php
// create our array with 1 element
$arr = array("one");
// $count will be 3 and $arr will now be array("one","two","three");
$count = array_push($arr,"two","three");
```

Alternative using `$arr[]`:

```php
// create our array with 1 element
$arr = array("one");
// $arr will now be array("one","two");
$arr[] = "two";
// $arr will now be array("one","two","three");
$arr[] = "three";
// $count will be 3
$count = count($arr)
```

Alternative using `$array_merge()`:

```php
// create our array with 1 element
$arr = array("one");
// alternate method using array_merge()
$arr = array_merge($arr,array("two","three")); // $arr will now be array("one","two","three");
$count = count($arr); // $count will be 3
```

## Pop

```php
// create our array with 3 elements
$arr = array("one","two","three");
// $value will be "three" and array's value will now be array("one","two");
$value = array_pop($arr);
```

## Shift

```php
// create our array with 3 elements
$arr = array("one","two","three");
// $value will be "one" and array's value will now be array("two","three");
$value = array_shift($arr);
```

## Unshift

```php
// create our array with 3 elements
$arr = array("three","four","five");
// $count will now be 5 and array will hold one - five
$count = array_unshift($arr,"one","two");
```

## Example: Basic Tree Implementation

```php
<?php

class Tree {
    function __construct($root = null) {
        $this->root = $root;
    }

    public function bfs() {
        // 1. shift val
        // 2. if children, append to arr
        // 3. append data to array to compare
        if ($this->root == null) {
            throw new Error("No tree root");
        }

        $arr = array($this->root);
        $res = [];

        while (count($arr) > 0) {
            $x = array_shift($arr);
            if ($x->children != null) {
                $arr = array_merge($arr, $x->children);
            }

            array_push($res, $x->data);
        }
        return $res;
    }

    public function dfs() {
        // shift from arr
        // if children exist, unshift array
        // add data to res array

        $res = [];
        $arr = array($this->root);

        while (count($arr) > 0) {
            $x = array_shift($arr);
            if ($x->children != null) {
                $arr = array_merge($x->children, $arr);
            }

            array_push($res, $x->data);
        }

        return $res;
    }
}

class Node {
    function __construct($data = null, $children = null) {
        $this->data = $data;
        $this->children = $children;
    }
}
```

## Resources + Extra Reading

http://www.thecave.info/php-array-push-pop-shift-and-unshift/
