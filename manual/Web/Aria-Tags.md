---
menu: Web
name: Aria Tags
---

# Aria Tags

## Aria Live + Aria Atomic

The tl;dr for `aria-live` and `aria-atomic`:

```html
<!-- aria-live -->
<p aria-live="off">The region is only read when you navigate to it.</p>
<p aria-live="polite">The region is read if it changes.</p>
<p aria-live="assertive">
  The region is read if it changes. This should interrupt user activities a bit
  more than polite does.
</p>

<!-- aria-atomic -->
<p aria-live="polite" aria-atomic="false">
  Only the item that changes is read.
</p>
<p aria-live="polite" aria-atomic="true">
  The entire region should be read anytime anything in it changes.
</p>
```

References:

- http://wps.pearsoned.com/wps/media/objects/8905/9119211/timertest_aria_live_atomic.html
