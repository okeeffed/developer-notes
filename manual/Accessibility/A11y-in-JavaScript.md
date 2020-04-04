---
menu: Accessibility
name: A11y in JavaScript
---

# A11y in JavaScript

## Resources

1. [FE masters course](https://frontendmasters.com/courses/javascript-accessibility/steps-for-debugging-accessibility/)
2. [A11y Course Slides](https://marcysutton.github.io/js-a11y-workshop/slides/)

## Debugging a11y

- User testing
- Use tools
- Use a screen reader

## Hidden vs Visible CSS

- Affects where focus goes
- What does the screen reader read
- `chrome://accessibility`

### Properties

- Using a `visually-hidden` class to ensure it is out of the flow
- `opacity: 0;` will reserve the space in the document flow
- `display: none;` won't render the tool
- `visibility: hidden;` is a use CSS tool to ensure tabbing can get there that reserves the space but takes the a11y information

## A11y Tree

The `chrome://accessibility` gives you the option to turn on the accessibility tree. The Chrome Dev tools these days lets you move away from it but it is good to know it exists.

It shows you how the CSS and JS can impact the accessibility tree.

## Currently Focused element

A "hack" to help you check focus in a tab:

```javascript
document.body.addEventListener('focusin', event => {
  console.log(document.activeElement);
});
```

Just pop it inside the Chrome console and is great to show what is in focus.

## Focus Management & tabindex

These topics consisit of:

1. Focus management
2. Live Region accouncements
3. Semantic HTML
4. Unobstrusive motion
5. Progressive enhancement
