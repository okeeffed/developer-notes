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
9. [Memory leak practice site](https://masteringdevtools.com/exercises/memory-leaks)
10. [Paint flashing test site](https://www.koalastothemax.com/)
11. [MDN Perf measure](https://developer.mozilla.org/en-US/docs/Web/API/Performance/measure)
12. [MDN Perf mark](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark)
13. [MDN Perf getEntriesByType](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType)
14. [Chrome Dev Tools - Evaluate Performance](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance)

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

Using `node --inspect path/to/file` we can use a `Node.js` icon on the Chrome dev tools that gives you some capabilities as well!

> To scroll in the Node.js profiler, you need to shift + scroll.

Do the profiling as quick as possible in order to be able to drill down without too many hassles.

## Performance Monitoring

Using the Performance API to measure metrics.

We can use `mark` and `measure`.

1. [measure](https://developer.mozilla.org/en-US/docs/Web/API/Performance/measure)
2. [mark](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark)
3. [getEntriesByType](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType)

```javascript
function usePerformanceEntryMethods() {
  log('PerformanceEntry tests ...');

  if (performance.mark === undefined) {
    log('... performance.mark Not supported');
    return;
  }

  // Create some performance entries via the mark() method
  performance.mark('Begin');
  doWork(50000);
  performance.mark('End');
  performance.mark('Begin');
  doWork(100000);
  performance.mark('End');
  doWork(200000);
  performance.mark('End');

  // Use getEntries() to iterate through the each entry
  var p = performance.getEntries();
  for (var i = 0; i < p.length; i++) {
    log('Entry[' + i + ']');
    checkPerformanceEntry(p[i]);
  }

  // Use getEntries(name, entryType) to get specific entries
  p = performance.getEntries({ name: 'Begin', entryType: 'mark' });
  for (var i = 0; i < p.length; i++) {
    log('Begin[' + i + ']');
    checkPerformanceEntry(p[i]);
  }

  // Use getEntriesByType() to get all "mark" entries
  p = performance.getEntriesByType('mark');
  for (var i = 0; i < p.length; i++) {
    log(
      'Mark only entry[' +
        i +
        ']: name = ' +
        p[i].name +
        '; startTime = ' +
        p[i].startTime +
        '; duration  = ' +
        p[i].duration,
    );
  }

  // Use getEntriesByName() to get all "mark" entries named "Begin"
  p = performance.getEntriesByName('Begin', 'mark');
  for (var i = 0; i < p.length; i++) {
    log(
      'Mark and Begin entry[' +
        i +
        ']: name = ' +
        p[i].name +
        '; startTime = ' +
        p[i].startTime +
        '; duration  = ' +
        p[i].duration,
    );
  }
}
```

## Image Performance

We can use `<img srcset="large.jpg 800w, small.jpg 300w" src="large.jpg" />` to use source sets for images.

The example used is using `via.placholder.com` to show how the different `srcset` works.

> For a `srcset`, it will continue to fetch the bigger images as the media queries will hit as a screen gets bigger but not the other way. The thought is that network reqs are expensive but repainting is not so bad.

## Page Jank

An [article](https://medium.com/reloading/javascript-start-up-performance-69200f43b201) on JS startup Performance.

"Jumping" or "gittering" is consider page jank. Things that contribute this include layout thrashing.

> The 60fps aim is because most monitors are 60 hertz. That's an update ~16.66ms. We basically want all of our work to happen at 10ms to give the update to the screen.

A geat website to test `paint flashing` from the Chrome Dev Tools is [Koalas to the max](https://www.koalastothemax.com/).

## The Performance Panel

A useful link here is [Chrome Dev Tools - Evaluate Performance](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance).

- We can turn off screenshots and memory to show less tabs.
- What we have left over is the FPS, CPU and Network graphs on one panel and a breakdown of them all in the bottom panel.
- For FPS, the higher the green line the better. As it uses a lot, it will start with a red bar across the top.
- CPU will show a mix between rendering, painting, JS work.
- The second panel full of call graphs is a breakdown of what is happening. The main thread is where we can see what is happening. Tall is not so bad (just means a large call stack), wide is where we get concerned. Again, there are red boxes that can help us.
- When you select a box, it will show it below in the summary.
- Once you profile and go to sources, it will give you timing out of the box on the side panel!

## Memory

Common causes of memory leaks:

### Accidental Global

```javascript
function foo() {
  bar = 'This is probably not what you mean';
}
```

### The Forgotten Timer

```javascript
const data = getData();
setInterval(() => {
  document.body.innerHTML = JSON.stringify(data);
}, 1000);
```

### The DOM and not the DOM

```javascript
// this reference needs to be removed
const button = document.getElementById('button');

function removeButton() {
  document.body.removeChild(document.getElementById('button'));
}
```

### Chrome Task Manager & Snapshots

- You can use the task maanger and `option + click` and add JavaScript Memory.
- `Performance` tab good for spotting a leak, `memory` for debugging.
- The `saw wave` indicates a leak. It will also break that line down into different memory issues.
- We can use the `heap snapshot` as an entry to start checking where things are happening through samples.
- After recording, you can then use the filters to order things like shallow size, retained size etc. If this doesn't give you a good idea, you can take another snapshot and compared.

There is a website [here](https://masteringdevtools.com/exercises/memory-leaks) that you can use to practice snapshots for memory leaks!

> Memory snapshots do not map directly to the source code, but you can dig into where the issues are coming from in the panel to identify the source.

## Experiments

To check experimental code, if you go to `chrome://flags` and turn on the experimental flag, you can then go to settings and turn on experiments.

> Hitting shift seven times will reveal hidden experiments.

## Chrome Canary

The bleeding edge version of Chrome.
