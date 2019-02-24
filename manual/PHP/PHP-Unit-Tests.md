---
name: PHP Unit Testing
menu: PHP
---

# PHP Unit Testing

This is simply a basic example of the layout.

Ensure `phpunit` is downloaded and add it to your `$PATH`.

From, here run `phpunit.phar path/to/test.php`.

```php
<?php

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
