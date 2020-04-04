---
menu: Accessibility
name: A11y in JavaScript
---

# A11y in JavaScript

## Resources

1. [FE masters course](https://frontendmasters.com/courses/javascript-accessibility/steps-for-debugging-accessibility/)
2. [A11y Course Slides](https://marcysutton.github.io/js-a11y-workshop/slides/)
3. [A11y Helper site](https://accessibilityinsights.io/)
4. [Aria best practices](http://w3c.github.io/aria-practices)
5. [Course Git Repo](https://github.com/marcysutton/js-a11y-workshop)
6. [GitHub Dropdown solution](https://github.com/marcysutton/js-a11y-workshop/blob/master/examples/dropdown/dropdown.js)
7. [React FocusScope](https://github.com/facebook/react/pull/15487)
8. [Route change sandbox](https://codepen.io/marcysutton/pen/MNpmMd)

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

### Focus management build blocks

- Reachable and operable elements
- TAB, escape, and arrow keys
- Visible focus styles
- Hidden/inert content

## tabindex in HTML

> Make non-interactive elements focusable

```javascript
tabIndex = '0'; // in the tab order, see following slides
tabIndex = '-1'; // focusable by script, or removes from tab order
tabIndex = '99641'; // all up in your tab order - hard to manage
```

- Possible integers come before anything in the natural tab order

> Screen readers go beyond the TAB key

> aXe will warn you when you use a possible tab index because of the management

## Focus events

Make custom controls fully interactive. A lot of the important information here was the HTML semantics.

```html
<div
  tabindex="0"
  role="button"
  aria-label="Close"
  onClick="{clickHandler}"
  onKeyDown="{keyboardHandler}"
></div>

<!-- or just use a button! -->
<button aria-label="Close" onClick="clickHandler"></button>
```

### Focus Management Patterns

- `aria-hidden="true"` strips a11y information
- `tabindex="-1"` stop things from tabbing
- `inert` - HTML attribute to stop aria regions
- CSS `display:none;` just hide it completely
- A good starting point for best practices on [w3c GitHub site](http://w3c.github.io/aria-practices)
- Know the differences between Links vs Buttons

### Visible Fouus styles

```css
/* avoid */
*:focus {
  outline: none;
}

/* do */
:hover,
:focus {
  outline: 5px auto blue;
}
```

There is a polyfill as well for CSS based on the mouse.

```css
:focus:not(.focus-visible) {
  outline: none;
}

:focus-visible {
  outline: 5px auto blue;
}
```

There is also a `what-input` module.

```javascript
// in a layout or component
import 'what-input'

// in css
[data-whatintent="mouse"] *:focus {
  outline: none
}
```

What would be ideal is an OS-level preference.

### CSS in JS

> It would be ideal to give users a class friendly name they can hook into so they can use their own user-friendly style sheets.

## Focus Event handling in React

Here Marcy is making us of `useRef` to set a ref for a component and help define the toggling and focus elements!

Here is using `useEffect` based on a state change to toggle focus for an element.

She goes the hacky was way of using `componentRef.current.querySelector('a').focus()`.

> A quick mention that `document.addEventLister` and `document.removeEventLister` need to be used with care to ensure there is no memory leak.

Marcy also uses a nice little tidbit of `componentRef.current.contains(event.target)` from an event handler during an if statement.

The final code [can be seen here](https://github.com/marcysutton/js-a11y-workshop/blob/master/examples/dropdown/dropdown.js).

> The `ul` needed to have the `role="list"` again for Safari due it is removing the role based on how people are using their CSS to remove `ul` bullet styles etc.

## Routing & Skip Links

- Use a small UI control in each view target, link a skip link
- Label with nearby content and its action e.g. "Portfolio, skip to navigation"
- When a user clicks a nav link, move focus to this control

### Underlying Management Patterns

- Access DOM nodes with React refs
- New: React FocusScopes, see [link](https://github.com/facebook/react/pull/15487)
- Vue.js `$refs`
- Custom focus manager APIs

## Creating a Skip Link

> A cool tidbit here is that Marcy uses the router meta data on a change to help dictate if the skip link should be focused.

There is a nice little sandbox you can use to test an `onRouteChange` type handler for a [Gatsby example](https://codepen.io/marcysutton/pen/MNpmMd).
