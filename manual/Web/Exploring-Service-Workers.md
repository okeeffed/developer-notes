---
menu: Web
name: Exploring Service Workers
---

# Exploring Service Workers

1. [Exploring Service Workers](https://frontendmasters.com/courses/service-workers/)
2. [Service worker GitHub Materials](https://github.com/FrontendMasters/service-workers-offline)
3. [Web worker GitHub Materials](https://github.com/FrontendMasters/web-workers)
4. [Going Offline - Book](https://abookapart.com/blogs/press/going-offline-is-now-available)
5. [Workbox - Github](https://github.com/GoogleChrome/workbox)
6. [servieworke.rs](https://serviceworke.rs/)
7. [Inspective the SW Lifecycle](https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim)

## Introduction

Service workers are not just for the web, but they should be used for every single website.

According to Getify, Service Workers are aimed towards beginning to fix some of the issues of the web.

> We forget that customers are mobile.

Getify uses the example of blog posts that he wanted to read, goes into airplane mode and then they're lost.

The other example he brings up is the issues with the timeline for the Twitter PWA.

## The Web Worker

These were the precursors to the service workers. What the example does is show the example of counting Fibonnaci numbers.

The use case for web workers is to process intensive functionality. It will run in a thread separate to the web page. The only guarantee for web workers is that you can at least spin up one other thread.

### home.js

```javascript
(function Home() {
  'use strict';

  var startStopBtn;
  var fibsList;
  var worker;

  document.addEventListener('DOMContentLoaded', ready, false);

  // **********************************

  function ready() {
    startStopBtn = document.getElementById('start-stop-btn');
    fibsList = document.getElementById('fibs');

    startStopBtn.addEventListener('click', startFibs, false);
  }

  function startFibs() {
    startStopBtn.removeEventListener('click', startFibs, false);
    startStopBtn.addEventListener('click', stopFibs, false);

    startStopBtn.innerText = 'Stop';
    fibsList.innerHTML = '';

    worker = new Worker('/js/worker.js');
    worker.addEventListener('message', onMessage);
    worker.postMessage({ start: true });
  }

  function stopFibs() {
    startStopBtn.removeEventListener('click', stopFibs, false);
    startStopBtn.addEventListener('click', startFibs, false);

    startStopBtn.innerText = 'Start';
    worker.terminate();
    worker = null;
  }

  function renderFib(num, fib) {
    var p = document.createElement('div');
    p.innerText = `Fib(${num}): ${fib}`;
    if (fibsList.childNodes.length > 0) {
      fibsList.insertBefore(p, fibsList.childNodes[0]);
    } else {
      fibsList.appendChild(p);
    }
  }

  function onMessage(evt) {
    renderFib(evt.data.num, evt.data.fib);
  }
})();
```

### worker.js

```javascript
'use strict';

var curNum = 0;

self.onmessage = onMessage;

// **********************************

function onMessage() {
  getNextFib();
}

function getNextFib() {
  var curFib = fib(curNum);
  self.postMessage({ num: curNum, fib: curFib });
  curNum++;
  getNextFib();
}

function fib(n) {
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}
```

### index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Web Workers</title>
    <link rel="stylesheet" href="/css/style.css" />
  </head>
  <body>
    <header>
      <h1>Web Workers</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <p>
        Let's explore Web Workers together.
      </p>
      <p>
        Fibonacci Numbers:
        <button type="button" id="start-stop-btn">Start</button>
      </p>
      <div id="fibs"></div>
    </main>

    <script src="/js/home.js"></script>
  </body>
</html>
```

For while this was okay, except there were inefficies with memory.

## Service Workers

Some notes brought up on use cases and tidbits:

- Service workers still obey the rules of CORS
- Primary service worker use cases are access for the cache
- You can intercepting requests
- Offline use casing for background sync
- The caching API isn't just exposed to the service worker, but there is limited functionality for the web access

Other bigger use cases include "push notifications". Push notifications is the use of two technologies at a time. There is "notifications" part and the "push" part. The push is how the service worker can be notified by something from the server.

> The tab could be closed, but the server can still make an outbound push to your service worker.

## serviceworke.rs

A [website](https://serviceworke.rs/) to give some awesome uses and resources to using resources.

We begin by make sure the example blog listes to the navigator to decide if we are online:

```javascript
// blog.js

(function Blog(global) {
  'use strict';

  var offlineIcon;
  var isOnline = 'onLine' in navigator && navigator.onLine;
  var isLoggedIn = /isLoggedIn=1/.test(document.cookie.toString() || '');
  var usingSW = 'serviceWorker' in navigator;
  var swRegistration;
  var svcworker;

  if (usingSW) {
    initServiceWorker().catch(console.error);
  }

  global.isBlogOnline = isBlogOnline;

  document.addEventListener('DOMContentLoaded', ready, false);

  // **********************************

  function ready() {
    offlineIcon = document.getElementById('connectivity-status');

    if (!isOnline) {
      offlineIcon.classList.remove('hidden');
    }

    window.addEventListener(
      'online',
      function online() {
        offlineIcon.classList.add('hidden');
        isOnline = true;
        sendStatusUpdate();
      },
      false,
    );
    window.addEventListener(
      'offline',
      function offline() {
        offlineIcon.classList.remove('hidden');
        isOnline = false;
        sendStatusUpdate();
      },
      false,
    );
  }

  function isBlogOnline() {
    return isOnline;
  }

  async function initServiceWorker() {
    swRegistration = await navigator.serviceWorker.register('/sw.js', {
      updateViaCache: 'none',
    });

    svcworker =
      swRegistration.installing ||
      swRegistration.waiting ||
      swRegistration.active;
    sendStatusUpdate(svcworker);

    // listen for new service worker to take over
    navigator.serviceWorker.addEventListener(
      'controllerchange',
      async function onController() {
        svcworker = navigator.serviceWorker.controller;
        sendStatusUpdate(svcworker);
      },
    );

    navigator.serviceWorker.addEventListener('message', onSWMessage, false);
  }

  function onSWMessage(evt) {
    var { data } = evt;
    if (data.statusUpdateRequest) {
      console.log('Status update requested from service worker, responding...');
      sendStatusUpdate(evt.ports && evt.ports[0]);
    } else if (data == 'force-logout') {
      document.cookie = 'isLoggedIn=';
      isLoggedIn = false;
      sendStatusUpdate();
    }
  }

  function sendStatusUpdate(target) {
    sendSWMessage({ statusUpdate: { isOnline, isLoggedIn } }, target);
  }

  function sendSWMessage(msg, target) {
    if (target) {
      target.postMessage(msg);
    } else if (svcworker) {
      svcworker.postMessage(msg);
    } else if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(msg);
    }
  }
})(window);
```

> Note there is an event `document.addEventListener('online', ...);` that can listen to when the web changes to and from online!

## The Service Worker Code

The project code the service worker. Note: This is going ahead in the course and posting the final look (in case it seems disjointed in the context of this document).

```javascript
'use strict';

importScripts('/js/external/idb-keyval-iife.min.js');

var version = 8;
var isOnline = true;
var isLoggedIn = false;
var cacheName = `ramblings-${version}`;
var allPostsCaching = false;

var urlsToCache = {
  loggedOut: [
    '/',
    '/about',
    '/contact',
    '/404',
    '/login',
    '/offline',
    '/css/style.css',
    '/js/blog.js',
    '/js/home.js',
    '/js/login.js',
    '/js/add-post.js',
    '/js/external/idb-keyval-iife.min.js',
    '/images/logo.gif',
    '/images/offline.png',
  ],
};

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);
self.addEventListener('message', onMessage);
self.addEventListener('fetch', onFetch);

main().catch(console.error);

// ****************************

async function main() {
  await sendMessage({ statusUpdateRequest: true });
  await cacheLoggedOutFiles();
  return cacheAllPosts();
}

function onInstall(evt) {
  console.log(`Service Worker (v${version}) installed`);
  self.skipWaiting();
}

function onActivate(evt) {
  evt.waitUntil(handleActivation());
}

async function handleActivation() {
  await clearCaches();
  await cacheLoggedOutFiles(/*forceReload=*/ true);
  await clients.claim();
  console.log(`Service Worker (v${version}) activated`);

  // spin off background caching of all past posts (over time)
  cacheAllPosts(/*forceReload=*/ true).catch(console.error);
}

async function clearCaches() {
  var cacheNames = await caches.keys();
  var oldCacheNames = cacheNames.filter(function matchOldCache(cacheName) {
    var [, cacheNameVersion] = cacheName.match(/^ramblings-(\d+)$/) || [];
    cacheNameVersion =
      cacheNameVersion != null ? Number(cacheNameVersion) : cacheNameVersion;
    return cacheNameVersion > 0 && version !== cacheNameVersion;
  });
  await Promise.all(
    oldCacheNames.map(function deleteCache(cacheName) {
      return caches.delete(cacheName);
    }),
  );
}

async function cacheLoggedOutFiles(forceReload = false) {
  var cache = await caches.open(cacheName);

  return Promise.all(
    urlsToCache.loggedOut.map(async function requestFile(url) {
      try {
        let res;

        if (!forceReload) {
          res = await cache.match(url);
          if (res) {
            return;
          }
        }

        let fetchOptions = {
          method: 'GET',
          cache: 'no-store',
          credentials: 'omit',
        };
        res = await fetch(url, fetchOptions);
        if (res.ok) {
          return cache.put(url, res);
        }
      } catch (err) {}
    }),
  );
}

async function cacheAllPosts(forceReload = false) {
  // already caching the posts?
  if (allPostsCaching) {
    return;
  }
  allPostsCaching = true;
  await delay(5000);

  var cache = await caches.open(cacheName);
  var postIDs;

  try {
    if (isOnline) {
      let fetchOptions = {
        method: 'GET',
        cache: 'no-store',
        credentials: 'omit',
      };
      let res = await fetch('/api/get-posts', fetchOptions);
      if (res && res.ok) {
        await cache.put('/api/get-posts', res.clone());
        postIDs = await res.json();
      }
    } else {
      let res = await cache.match('/api/get-posts');
      if (res) {
        let resCopy = res.clone();
        postIDs = await res.json();
      }
      // caching not started, try to start again (later)
      else {
        allPostsCaching = false;
        return cacheAllPosts(forceReload);
      }
    }
  } catch (err) {
    console.error(err);
  }

  if (postIDs && postIDs.length > 0) {
    return cachePost(postIDs.shift());
  } else {
    allPostsCaching = false;
  }

  // *************************

  async function cachePost(postID) {
    var postURL = `/post/${postID}`;
    var needCaching = true;

    if (!forceReload) {
      let res = await cache.match(postURL);
      if (res) {
        needCaching = false;
      }
    }

    if (needCaching) {
      await delay(10000);
      if (isOnline) {
        try {
          let fetchOptions = {
            method: 'GET',
            cache: 'no-store',
            credentials: 'omit',
          };
          let res = await fetch(postURL, fetchOptions);
          if (res && res.ok) {
            await cache.put(postURL, res.clone());
            needCaching = false;
          }
        } catch (err) {}
      }

      // failed, try caching this post again?
      if (needCaching) {
        return cachePost(postID);
      }
    }

    // any more posts to cache?
    if (postIDs.length > 0) {
      return cachePost(postIDs.shift());
    } else {
      allPostsCaching = false;
    }
  }
}

async function sendMessage(msg) {
  var allClients = await clients.matchAll({ includeUncontrolled: true });
  return Promise.all(
    allClients.map(function sendTo(client) {
      var chan = new MessageChannel();
      chan.port1.onmessage = onMessage;
      return client.postMessage(msg, [chan.port2]);
    }),
  );
}

function onMessage({ data }) {
  if ('statusUpdate' in data) {
    ({ isOnline, isLoggedIn } = data.statusUpdate);
    console.log(
      `Service Worker (v${version}) status update... isOnline:${isOnline}, isLoggedIn:${isLoggedIn}`,
    );
  }
}

function onFetch(evt) {
  evt.respondWith(router(evt.request));
}

async function router(req) {
  var url = new URL(req.url);
  var reqURL = url.pathname;
  var cache = await caches.open(cacheName);

  // request for site's own URL?
  if (url.origin == location.origin) {
    // are we making an API request?
    if (/^\/api\/.+$/.test(reqURL)) {
      let fetchOptions = {
        credentials: 'same-origin',
        cache: 'no-store',
      };
      let res = await safeRequest(
        reqURL,
        req,
        fetchOptions,
        /*cacheResponse=*/ false,
        /*checkCacheFirst=*/ false,
        /*checkCacheLast=*/ true,
        /*useRequestDirectly=*/ true,
      );
      if (res) {
        if (req.method == 'GET') {
          await cache.put(reqURL, res.clone());
        }
        // clear offline-backup of successful post?
        else if (reqURL == '/api/add-post') {
          await idbKeyval.del('add-post-backup');
        }
        return res;
      }

      return notFoundResponse();
    }
    // are we requesting a page?
    else if (req.headers.get('Accept').includes('text/html')) {
      // login-aware requests?
      if (/^\/(?:login|logout|add-post)$/.test(reqURL)) {
        let res;

        if (reqURL == '/login') {
          if (isOnline) {
            let fetchOptions = {
              method: req.method,
              headers: req.headers,
              credentials: 'same-origin',
              cache: 'no-store',
              redirect: 'manual',
            };
            res = await safeRequest(reqURL, req, fetchOptions);
            if (res) {
              if (res.type == 'opaqueredirect') {
                return Response.redirect('/add-post', 307);
              }
              return res;
            }
            if (isLoggedIn) {
              return Response.redirect('/add-post', 307);
            }
            res = await cache.match('/login');
            if (res) {
              return res;
            }
            return Response.redirect('/', 307);
          } else if (isLoggedIn) {
            return Response.redirect('/add-post', 307);
          } else {
            res = await cache.match('/login');
            if (res) {
              return res;
            }
            return cache.match('/offline');
          }
        } else if (reqURL == '/logout') {
          if (isOnline) {
            let fetchOptions = {
              method: req.method,
              headers: req.headers,
              credentials: 'same-origin',
              cache: 'no-store',
              redirect: 'manual',
            };
            res = await safeRequest(reqURL, req, fetchOptions);
            if (res) {
              if (res.type == 'opaqueredirect') {
                return Response.redirect('/', 307);
              }
              return res;
            }
            if (isLoggedIn) {
              isLoggedIn = false;
              await sendMessage('force-logout');
              await delay(100);
            }
            return Response.redirect('/', 307);
          } else if (isLoggedIn) {
            isLoggedIn = false;
            await sendMessage('force-logout');
            await delay(100);
            return Response.redirect('/', 307);
          } else {
            return Response.redirect('/', 307);
          }
        } else if (reqURL == '/add-post') {
          if (isOnline) {
            let fetchOptions = {
              method: req.method,
              headers: req.headers,
              credentials: 'same-origin',
              cache: 'no-store',
            };
            res = await safeRequest(
              reqURL,
              req,
              fetchOptions,
              /*cacheResponse=*/ true,
            );
            if (res) {
              return res;
            }
            res = await cache.match(isLoggedIn ? '/add-post' : '/login');
            if (res) {
              return res;
            }
            return Response.redirect('/', 307);
          } else if (isLoggedIn) {
            res = await cache.match('/add-post');
            if (res) {
              return res;
            }
            return cache.match('/offline');
          } else {
            res = await cache.match('/login');
            if (res) {
              return res;
            }
            return cache.match('/offline');
          }
        }
      }
      // otherwise, just use "network-and-cache"
      else {
        let fetchOptions = {
          method: req.method,
          headers: req.headers,
          cache: 'no-store',
        };
        let res = await safeRequest(
          reqURL,
          req,
          fetchOptions,
          /*cacheResponse=*/ false,
          /*checkCacheFirst=*/ false,
          /*checkCacheLast=*/ true,
        );
        if (res) {
          if (!res.headers.get('X-Not-Found')) {
            await cache.put(reqURL, res.clone());
          } else {
            await cache.delete(reqURL);
          }
          return res;
        }

        // otherwise, return an offline-friendly page
        return cache.match('/offline');
      }
    }
    // all other files use "cache-first"
    else {
      let fetchOptions = {
        method: req.method,
        headers: req.headers,
        cache: 'no-store',
      };
      let res = await safeRequest(
        reqURL,
        req,
        fetchOptions,
        /*cacheResponse=*/ true,
        /*checkCacheFirst=*/ true,
      );
      if (res) {
        return res;
      }

      // otherwise, force a network-level 404 response
      return notFoundResponse();
    }
  }
}

async function safeRequest(
  reqURL,
  req,
  options,
  cacheResponse = false,
  checkCacheFirst = false,
  checkCacheLast = false,
  useRequestDirectly = false,
) {
  var cache = await caches.open(cacheName);
  var res;

  if (checkCacheFirst) {
    res = await cache.match(reqURL);
    if (res) {
      return res;
    }
  }

  if (isOnline) {
    try {
      if (useRequestDirectly) {
        res = await fetch(req, options);
      } else {
        res = await fetch(req.url, options);
      }

      if (res && (res.ok || res.type == 'opaqueredirect')) {
        if (cacheResponse) {
          await cache.put(reqURL, res.clone());
        }
        return res;
      }
    } catch (err) {}
  }

  if (checkCacheLast) {
    res = await cache.match(reqURL);
    if (res) {
      return res;
    }
  }
}

function notFoundResponse() {
  return new Response('', {
    status: 404,
    statusText: 'Not Found',
  });
}

function delay(ms) {
  return new Promise(function c(res) {
    setTimeout(res, ms);
  });
}
```

## Creating a Service Worker

The Service Worker will stay alive while the user is on the page. The browser will control the service worker lifecycle.

It is important to note that when a service worker restarts, it doesn't rerun the installation and activation phase.

We will also see how to start and stop the service worker in Chrome Dev Tools.

### SW Lifecycle

Below is some code that will allow us to see the lifecycle playout.

```javascript
// sw.js
'use strict';

var version = 1;

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);

main().catch(console.error);

async function main() {
  console.log(`Service Worker (${version}) is starting...`);
}

// an event handler
async function onInstall(evt) {
  console.log(`Service Worker (${version}) has installed...`);
  // to skip waiting phase
  self.skipWaitng();
}

// also an event handler
async function onActivation(evt) {
  console.log(`Service Worker (${version}) has activated...`);
}
```

Note that there is a way to request to the browser to not shut down the service worker:

```javascript
// omitted for brevity
async function onActivation(evt) {
  // passing a promise returned from handleActivation
  event.waitUntil(handleActivation());
  console.log(`Service Worker (${version}) has activated...`);
}

async function handleActivation() {
  await clients.claim();
}
```

> The service worker being activated it doesn't mean that the page talking to the old service worker knows about the new service worker. We need to tell the page to that.

Documentation for [clients.claim](https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim) can be found here.
