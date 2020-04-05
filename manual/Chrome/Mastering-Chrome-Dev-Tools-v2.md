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
5. [Chrome Tools Network Reference](https://developers.google.com/web/tools/chrome-devtools/network/reference)
6. [PWA Checklist](https://web.dev/pwa-checklist/)
7. [Webpage test](https://www.webpagetest.org/)
8. [Webhint.io](https://webhint.io/)

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

> Cool tibit - Cmd + Shift + P opens a command input, while in sources cmd + P opens a search to go through your files.

## Debugging

### Step Through Debugging

In the example, the `debugger` keyword is inserted into a file under the `Sources` tab that can be used to force a breakpoint.

When a break point is triggered, it shows you the current Call Stack, Scope and more.

There are navigation options for stepping over things.

| Debugging Section          | Does                                               |
| -------------------------- | -------------------------------------------------- |
| Watch                      | Shows the variables you are watching in real time. |
| Call Stack                 | Shows the JS call stack for how you got there.     |
| Scope                      | Shows all vars in scope (including global).        |
| Breakpoints                | Lists all breakpoints you have.                    |
| XHR/fetch Breakpoints      | This can stop when a URL set is called to.         |
| DOM Breakpoints            | Adding breakpoints based on the DOM.               |
| Global Listeners           | TODO                                               |
| Event Listener Breakpoints | Adding breakpoints based on events.                |

How the Debugger stepping works:

| Option      | Does                                          |
| ----------- | --------------------------------------------- |
| Continue    | Resume script execution.                      |
| Step over   | Stepping through code.                        |
| Step into   | Move into the function the BP is on.          |
| Step out of | Move BP back to parent that called step into. |
| Step        | A single step. Over or into if it is a func.  |

> You can also blackbox a script to ensure things do not show in the Call Stack debugger.

In the example run, we are adding variables to the `watch` value in source and watching them change.

## Networking

This is a general overview of the status, type, initiator, size etc.

There are also filters to check file type, XHR request etc.

> Hold the shift key will show you which file called it. Initiators are green, while dependencies are red. See the [network reference](https://developers.google.com/web/tools/chrome-devtools/network/reference).

## Network Timing

| Information               | Does                                                                       |
| ------------------------- | -------------------------------------------------------------------------- |
| Queueing                  | The browser queued the request.                                            |
| Stalled                   | The request could be stalled for any of the reasons described in Queueing. |
| DNS Lookup                | The browser is resolving the request's IP address.                         |
| Proxy negotiation         | The browser is negotiating the request with a proxy server.                |
| Request sent              | The request is being sent.                                                 |
| ServiceWorker Preparation | The browser is starting up the service worker.                             |
| Request to ServiceWorker  | The request is being sent to the service worker.                           |
| Waiting (TTFB)            | The browser is waiting for the first byte of a response.                   |
| Content Download          | The browser is receiving the response.                                     |
| Receiving Push            | The browser is receiving data for this response via HTTP/2 Server Push.    |
| Reading Push              | The browser is reading the local data previously received.                 |

> TTFB stands for Time To First Byte. This timing includes 1 round trip of latency and the time the server took to prepare the response.

### Queueing

A request being queued indicates:

1. The req was postponed by the rendering engine beacuse it's considered lower priority than critical resources (ie scripts, styles). Often happens with images.
2. The req was put on hold to wait for an unavailable TCP sockets that's about to free up.
3. Req put on hold because the browser only allows six TCP connections per origin on HTTP 1.
4. Time spent making disk cache entries (typically very quick).

### Screenshots

You can enable capture screenshots (using the "camera" icon on the `Network` tab) which will show all the repaints as they happen.

> You can also use filters in the search input ie `larger-than: 100kb` to filter out certain network requests.

## Auditing

Begins with importance on speed decrease and adverse affect to large companies.

Auditing resources:

1. [Webpage test](https://www.webpagetest.org/)

The auditing tab itself uses lighthouse to check SEO, a11y etc.

Check Lighthouse for more information, but there has been a lot of work on the metrics and opportunities.

Another great website shown was [Webhinto.io (Sonarwhal)](https://webhint.io/) which gives some great depth on things as well.

## Node.js Profiling

> There are some more in-depth notes under the JavaScript Performance note set.
