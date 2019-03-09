---
name: PHP Anonymous Functions
menu: PHP
---

# PHP Anonymous Functions

## Simple Example

```php
// anon.php

<?php

function helloWorld()
{
    $anon = function() {
        return 'Hello, World!';
    };

    return $anon();
}

function sumTwoArgsPlusOne($a, $b)
{
    $c = 1;
    $anon = function($a, $b) use ($c) {
        return $a + $b + $c;
    };

    return $anon($a, $b);
}
```

```php
// anon_test.php

<?php

require "anonymous.php";

class AnonymousTest extends PHPUnit\Framework\TestCase
{
    public function testHelloWorld()
    {
        $this->assertEquals('Hello, World!', helloWorld());
    }

    public function testSum()
    {
        $this->assertEquals(4, sumTwoArgsPlusOne(1, 2));
    }
}
```
