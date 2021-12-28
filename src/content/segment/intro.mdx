---
name: Intro
menu: Segment 
---
# SegmentIO

Segment IO abstracts the layers of integration from code base to external GUI UI.

## Links

Reference can be [found here on the main site](https://segment.com/).

## Prerequisites

1. Install the Segment `js` module using Kratos.
2. Add REACT_APP_SEGMENT_KEY to the .env file with the correct key.

## Intergration

The `init()` function runs a basic command instantiate Segment.

```javascript
export default class Segment {
 static init() {
  var analytics = (window.analytics = window.analytics || []);
  if (!analytics.initialize) {
   if (analytics.invoked) {
    window.console &&
     console.error &&
     console.error('Segment snippet included twice.');
   } else {
    analytics.invoked = !0;
    analytics.methods = [
     'trackSubmit',
     'trackClick',
     'trackLink',
     'trackForm',
     'pageview',
     'identify',
     'reset',
     'group',
     'track',
     'ready',
     'alias',
     'debug',
     'page',
     'once',
     'off',
     'on'
    ];
    analytics.factory = function(t) {
     return function() {
      var e = Array.prototype.slice.call(arguments);
      e.unshift(t);
      analytics.push(e);
      return analytics;
     };
    };
    for (var t = 0; t < analytics.methods.length; t++) {
     var e = analytics.methods[t];
     analytics[e] = analytics.factory(e);
    }
    analytics.load = function(t, e) {
     var n = document.createElement('script');
     n.type = 'text/javascript';
     n.async = !0;
     n.src =
      'https://cdn.segment.com/analytics.js/v1/' + t + '/analytics.min.js';
     var a = document.getElementsByTagName('script')[0];
     a.parentNode.insertBefore(n, a);
     analytics._loadOptions = e;
    };
    analytics.SNIPPET_VERSION = '4.1.0';
    analytics.load(process.env.REACT_APP_SEGMENT_KEY);
    analytics.page();
   }
  }
 }
}
```

## Usage

The recommendation would be to use the `js` module `Emitter` to abstract all the logic.

Using throughout the app can happen through the `window` object.

Example:

```javascript
window.analytics.track('Email Opened', data);
```
