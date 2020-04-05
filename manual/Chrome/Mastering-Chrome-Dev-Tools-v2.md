---
menu: Chrome
name: Mastering Chrome Dev Tools v2
---

# Mastering Chrome Dev Tools v2

## Resources

1. [FE Masters Course](https://frontendmasters.com/courses/chrome-dev-tools-v2/)
2. [Course Slides](https://slides.com/jkup/devtools#/)
3. [Chrome Dev Tools documentation](https://developers.google.com/web/tools/chrome-devtools/)
4. [CSS SpeciFISHity](https://specifishity.com/)

## History of Debugging

- In history, there was only really access source.
- No consoles.
- No `JSON.stringify` to help with alerts
- Live DOM viewer

## Developer Tool Panels

The tools panels are as follows:

| Panel       | Does                                                       |
| ----------- | ---------------------------------------------------------- |
| Elements    | Displays the DOM + computer styles, event listeners etc.   |
| Console     | Used for logs sent to the console + REPL.                  |
| Sources     | "Think of it like your text editor". Has debugger.         |
| Network     | Shows the waterfall of any HTTP request the browser makes. |
| Performance | Timed performance recording.                               |
| Memory      | Allows you to do snapshots of memory.                      |
| Application | Shows storage + cache.                                     |
| Security    | Overview on potential security issues.                     |
| Audits      | Uses Lighthouse through a suite of tests.                  |

> If you option click the DOM tree, it opens all the children.

## Elements

- Shows DOM and allows you to edit.
- Edit CSS in place.
- Offline, low-end etc mode.
- Device emulation.
- CSS colour enables you to save different color palettes and find the preset colour palette.
- Right-click an element in the DOM gives you the ability to scroll the elemment in the view.
- Synthetic states can be used to know pseudo selectors.
- You can shift click colours to cycle through different formats.
- Move elements around the DOM tree.
- You can add DOM breakpoints to help understand what is going on. This will move us into the sources tab.

There was a [specificity website](https://specifishity.com/) to see CSS specifity in action.

## Sources

- Can try un-minify the minified code.
- You can add DOM breakpoints to help understand what is going on.
- You can save changes to disk! You can add folders to the workspace and it will try map files being served to those from your folder. Styles can persist, DOM will not.
