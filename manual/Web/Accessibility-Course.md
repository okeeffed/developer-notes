---
menu: Web
name: Accessibility Course
---

# Accessibility Course

## Introduction

- A lot of times, static sites are more accesible
- Microsoft Inclusive Toolkit (a set of personas to work with)

## Course Coverage

- Focus management
- Accouncements
- Semantic HTML
- Unobtrusive motion
- Progressive enhancements
- Testing

## Course Materials

Found on [Marcy's Github repo for the course](https://www.github.com/marcysutton/js-a11y-workshop)

```shell
git clone https://www.github.com/marcysutton/js-a11y-workshop
cd js-a11y-workshop
npm install
npx gatsby develop
```

## Debugging

- Render in web browsers
- Test with keyboard
- Use a11y web extensions (good for smoke testing)
- Check color contrast (#1 problem on the web)
- Test with screen readers (recommended to pair with someone who uses them daily)
- Use magnification & zoom

## App Testing In The Wild

- If you have trouble figuring out where you are on the screen, click to set focus point
- Number of items on Slack JSON viewer that couldn't be reached
- Visual outlines are very important for a number of people
- `<a>` without `href` attribute is NOT focusable - if you need something interactive, the button may have been the better choice.
- Github uses the `Skip to content`
- Elements should not have a tabindex > 0 (best practise more than outright violation)
- Fn + Cmd + F5 to start Mac voiceover (NOTE: key navigation changes with voiceover)
- Tests NVDA on Mac using VM
- Local build is done for testing a11y

## Hidden vs Visible CSS

- Can affect where focus can go
- Presenter uses `.visually-hidden` class to take an HTML and render it so it is part of the a11y info but visually hidden visually. Common utility, but sometimes not the right tool.
- Contents is still there for a11y APIs
- `opacity` is used for `reserving space`, still being rendered and contents still available for a11y APIs
- `display: none` hides from assistive technology (a11y info being ignored)
- `visibility: hidden` still reserves space, but hides a11y info

The visually hidden class used:

```scss
.visually-hidden {
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
```

## A11y Tree

- Created with a11y APIs so that screenreaders have streamlined experience
- `chrome://accessibility` needs to turn on tree for each tab - very raw version of the a11y tree
- Great to see how HTML and CSS can impact the a11y tree
- Hack > use `addEventListener` for `focusin` to get `document.activeElement`
- Safari has a weird setting to ensure tab highlights elements

The `activeElement` JavaScript:

```javascript
document.body.addEventListener('focusin', (event) => {
  console.log(document.activeElement);
});
```

## Exercises

1. Team `No Mouse Mondays`
2. Run browser extensions (axe, A11y Insights, Lighthouse, WAVE, NoCoffee)
3. DevTools A11y (chrome color picker & a11y pane, Firefox a11y tools)

## Screen Readers

- [Voiceover](https://webaim.org/articles/voiceover)
- [NVDA](https://webaim.org/articles/nvda)
- [JAWS](https://webaim.org/articles/jaws) (most important for those who use screen readers)

### Useful combos

- OSX Voiceover and Safari
- NVDA and Firefox Windows
- JAWS and IE11 or Edge
- iOS Voiceover and Safari
- Android a11y and Chrome
- Orca on Linux

## Magnification

- Browser zoom (500%, 200% for guidelines)
- OS-level zoom
- ZoomText & other assistive tech

Watch out for:

- Page scrolling
- Font sizes & scaling
- UX of interactions when zoomed
