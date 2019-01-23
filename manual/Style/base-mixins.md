---
name: Base Mixins
menu: Style 
---
# Styles > Base > Mixins

The mixins file is the place to store all of the functional Sass mixins used throughout the project.

## inline-block-list

```css
// inline-block list
@mixin inline-block-list($padding: false) {
    margin: 0;
    padding: 0;
    border: 0;
    @include clearfix;

    li {
        list-style-type: none;
        @include inline-block();
        white-space: nowrap;
        @if $padding {
            padding: {
                left: $padding;
                right: $padding;
            }
        }
    }
}
```

## omega-reset

```css
@mixin omega-reset($nth) {
    &:nth-child(#{$nth}) {
        margin-right: flex-gutter();
    }
    &:nth-child(#{$nth} + 1) {
        clear: none;
    }
}
```

## font-size

```css
@mixin font-size($fontSize, $lineHeight: null) {
    font-size: $fontSize;
    font-size: rem($fontSize) / 0.625;

    @if ($lineHeight) {
        line-height: em($lineHeight, $fontSize);
    } @else {
        line-height: inherit;
    }
}
```

## inline-block

```css
// inline-block for old browsers
@mixin inline-block() {
    display: inline-block;
    *zoom: 1;
    *display: inline;
}
```

## reset-box-model

```css
@mixin reset-box-model {
    margin: 0;
    padding: 0;
    border: 0;
}
```

## absolute-fill

```css
@mixin absolute-fill {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
```

## headings

```css
@mixin headings($from: 1, $to: 6) {
    @for $i from $from through $to {
        h#{$i} {
            @content;
        }
    }
}
```

## background-image

```css
@mixin background-image($path) {
    background-image: url(../img/#{$path}.png);
    background-image: linear-gradient(transparent, transparent), url(../img/#{$path}.svg);
}
```

## reset-ul

```css
/* Reset unordered list style */
@mixin reset-ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: auto;
}
```

## hide-text

```css
@mixin hide-text {
    overflow: hidden;
    text-indent: 101%;
    white-space: nowrap;
}
```

## \_neat-parse-media

Swaps neat 2.0 to desktop first

```css
@function _neat-parse-media($media) {
    @if type-of($media) == number {
        @return "only screen and (max-width: #{$media})";
    } @else if type-of($media) == string {
        @return "#{$media}";
    }
}
```

## background-color

Set default background-color transition.

```css
@mixin background-color$color, $lighten: false) {
    background-color: $color;
    transition: background-color 600ms ease-in;

    &:hover,
    &:active {
        @if $lighten {
            background-color: lighten($color, 30%);
        } @else {
            background-color: darken($color, 30%);
        }
    }
}
```

## color

```css
@mixin color($color, $lighten: false) {
    color: $color;
    transition: color 600ms ease-in;

    &:hover,
    &:active {
        @if $lighten {
            color: lighten($color, 30%);
        } @else {
            color: darken($color, 30%);
        }
    }
}
```
