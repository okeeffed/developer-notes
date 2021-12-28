---
name: PHP Unit Testing
menu: PHP
---

# PHP Unit Testing

This is simply a basic example of the layout.

Ensure `phpunit` is downloaded and add it to your `$PATH`.

From, here run `phpunit.phar path/to/test.php`.

## Basic example

### Anagram function to test

```php
<?php
// anagrams.php

function anagrams($a, $b)
{
    $regA = preg_replace("/[^a-z]/i", "", $a);
    $regB = preg_replace("/[^a-z]/i", "", $b);

    $regA = strtolower($regA);
    $splitA = str_split($regA);
    sort($splitA);

    $regB = strtolower($regB);
    $splitB = str_split($regB);
    sort($splitB);

    $resA = implode("", $splitA);
    $resB = implode("", $splitB);

    return $resA == $resB;
}
```

### Running the test

`phpunit.phar anagrams_test.php`

```php
<?php
// anagrams_test.php
require "anagrams.php";

class AnagramsTest extends PHPUnit\Framework\TestCase
{
    public function testAnagramsBasic()
    {
        $a = "tokyo";
        $b = "kyoto";
        $this->assertEquals(true, anagrams($a,$b));
    }


    public function testAnagramsWithCapitals()
    {
        // $this->markTestSkipped('Skipped.');
        $a = "Tokyo";
        $b = "kyoto";
        $this->assertEquals(true, anagrams($a,$b));
    }

    public function testAnagramsWithPunctuation()
    {
        // $this->markTestSkipped('Skipped.');
        $a = "To  35k 2@4yo";
        $b = "kYoTo223!!";
        $this->assertEquals(true, anagrams($a,$b));
    }
}
```
