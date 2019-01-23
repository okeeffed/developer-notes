---
name: Image Compression
menu: Images 
---
# Handling Images

## Useful links

- https://varvy.com/pagespeed/defer-images.html
- https://developers.google.com/web/fundamentals/web-app-manifest/
- https://caniuse.com/#feat=webp
- https://css-tricks.com/using-webp-images/
- https://github.com/verlok/lazyload
- https://afarkas.github.io/lazysizes/index.html

## Deferring Web loaded images

### Basics

```html
<img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="your-image-here">
```

```javascript
<script>
function init() {
var imgDefer = document.getElementsByTagName('img');
for (var i=0; i<imgDefer.length; i++) {
if(imgDefer[i].getAttribute('data-src')) {
imgDefer[i].setAttribute('src',imgDefer[i].getAttribute('data-src'));
} } }
window.onload = init;
</script>
```

### Using Lazyload.js

**HTML**

```html
<img class="lazy" alt="..." 
     data-src="../img/44721746JJ_15_a.jpg"
     width="220" height="280">
```

**Javascript**

```javascript
import LazyLoad from "vanilla-lazyload";
var myLazyLoad = new LazyLoad({
    elements_selector: ".lazy"
});
```



