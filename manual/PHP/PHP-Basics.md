---
name: PHP Basics
menu: PHP
---

# PHP Basics

## Strings Functions

## Regex Replacement on Strings

```php
<?php
$string = "T34okyo!";
$replacement = "";
$pattern = "/[^a-z]/i";

echo preg_replace($pattern, $replacement, $string);
```
