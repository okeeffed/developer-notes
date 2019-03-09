---
name: PHP Anonymous Functions
menu: PHP
---

# PHP Anonymous Functions

The basic gist is to use the keyword `function()` with a block scope.

If you want to use variables declared by the direct parent scope, ensure you use the `use()` keyword. A simple example of this can be found below.

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
