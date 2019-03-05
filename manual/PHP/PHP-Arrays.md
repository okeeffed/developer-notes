---
name: PHP Arrays
menu: PHP
---

# PHP Arrays

## Push

Using `array_push`:

```php
// create our array with 1 element
$arr = array("one");
// $count will be 3 and $arr will now be array("one","two","three");
$count = array_push($arr,"two","three");
```

Alternative:

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

## Pop

## Resources + Reading

http://www.thecave.info/php-array-push-pop-shift-and-unshift/
