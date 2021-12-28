---
name: 3) Improving Web Performance
---

# Improving Web Performance

Part 2: Improving:

- Business Objectives
- Improving each web vital
- Code demos and exercises

## Resources

1. [Course website](https://github.com/toddhgardner/perf-training-website)

## Web Business Objectives

1. Awareness
2. Retention
3. Conversion
4. Competition

### Competition

> For short time durations, the difference should be at least 20% for most people to care.

Being faster is cool, but only really matters at 20%.

There is a website [lightest.app](https://www.lightest.app/) which allows you to run multiple Lighthouse tests and compare them.

An example is done to use this website to compare the competitors of the speaker.

## Course Example Website

The website can be cloned from [here](https://github.com/toddhgardner/perf-training-website).

## Performance API

We should be able to get some idea of what is going wrong and how we can adjust it.

There is example analytics provided to demo a graph over time to see what weirdness of changes over time.

To understand, we need to grab real data. What did the users who drove these metrics do on our website?

## window.performance

[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/performance) is the definitive guide for this one.

### Entry timings

```js
// Entry timings
performance.getEntries()
performance.getEntriesByType()
performance.getEntriesByName()
```

The above will return a list of entries with a bunch of information.

> Note: the image on this page about the events over a lifecycle of a page can be overwhelming and the best thing to do is check the graph on the course video.

To explore it better, you can use the Chrome DevTools REPL to begin checking these out. From here, you can get really low-level data. There are better ways to get more human-digestable versions of this data (ie network reqs in the network time).

We use the performance API to aggregate data for our own data warehouses.

### Performance Observer

We tell a PerformanceObserver to look for a specific thing.

```js
new PerformanceObserver((entryList) => {
  var entries = entryList.getEntries()
}).observe(opts)
```

> What is confusing is that someone named these things `entries` but they are not the same as the entries referred to above.

## Performance API Practice

The workshop works through collecting field data using the `performance` API.

The example craetes a data structure of all the performance data we want to capture.

There are a number of observers craeted to observe certain events:

```js
// Buffered means that since we are waiting for the load event,
// there are historical events that could already have happened
// and we want them too.

// For FCP
new PerformanceObserver((entryList) => {
  var entries = entryList.getEntries() || []
  entries.forEach(function (entry) {
    if (entry.name === "first-contentful-paint") {
      data.fcp = entry.startTime
      console.log("Recorded FCP Performance: " + data.fcp)
    }
  })
}).observe({ type: "paint", buffered: true })

// This will go off multiple times
new PerformanceObserver((entryList) => {
  var entries = entryList.getEntries() || []
  entries.forEach(function (entry) {
    if (entry.startTime > data.lcp) {
      data.lcp = entry.startTime
      console.log("Recorded LCP Performance: " + data.lcp)
    }
  })
}).observe({ type: "largest-contentful-paint", buffered: true })

new PerformanceObserver((entryList) => {
  var entries = entryList.getEntries() || []
  entries.forEach(function (entry) {
    if (!entry.hadRecentEvent) {
      data.cls += entry.value
      console.log("Incresed CLS Performance: " + data.cls)
    }
  })
}).observe({ type: "layout-shift", buffered: true })

new PerformanceObserver((entryList) => {
  var entries = entryList.getEntries() || []
  entries.forEach(function (entry) {
    data.fid = entry.processingTime - entry.startTime
    console.log("Recorded FID Performance: " + data.fid)
  })
}).observe({ type: "first-input", buffered: true })

// handle the sending of data
window.addEventListener("beforeunload", function () {
  var navEntry = performance.getEntriesByType("navigation")[0]
  data.dcl = navEntry.domContentLoadedEventStart
  data.load = navEntry.loadEventStart

  var payload = JSON.stringify(data)
  // sendBeacon is a request that doesn't care about waiting for a response
  navigator.sendBeacon("/api/perf", payload)
  console.log("Sending performance", payload)
})
```

## Performance Analytics

With everything setup, we ended up collecting a bunch of data and putting it into a provided spreadsheet to overlay it with out business metrics and make some conclusions:

1. CLS is inversely correlated to Session Time
2. LCP is inversely correlated to the Bounce Rate

> It is really important to compare this to your own data.

## How do we improve performance?

Do fewer things.

This is meant in every possible layer.
