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

## Resources + Reading

http://www.thecave.info/php-array-push-pop-shift-and-unshift/
