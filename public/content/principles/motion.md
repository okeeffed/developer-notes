---
name: Motion
menu: Principles 
---
- [Motion](#motion)
    - [Base Animations](#base-animations)

# Motion

## Base Animations

These variables are used as the base for setting speed consistency throughout the applications.

```css
$a-desktop: 390ms;
$a-desktop-enter: 290ms;
$a-desktop-exit: 250ms;

$a-mobile: 300ms;
$a-mobile-enter: 225ms;
$a-mobile-exit: 195ms;

.animate {
  transition: all $a-desktop ease-out;
}
```
