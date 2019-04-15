---
name: Web Concepts
menu: Web
---

# Web Concepts

## Headers

### Transfer Encoding

The Transfer-Encoding header specifies the form of encoding used to safely transfer the entity to the user.

Transfer-Encoding is a hop-by-hop header, that is applied to a message between two nodes, not to a resource itself. Each segment of a multi-node connection can use different Transfer-Encoding values. If you want to compress data over the whole connection, use the end-to-end Content-Encoding header instead.

When present on a response to a HEAD request that has no body, it indicates the value that would have applied to the corresponding GET message.

Source: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Transfer-Encoding

Usual headers include `Transfer-Encoding: gzip` - HTTP/2 does not support `chunked`.

### ETag

The ETag HTTP response header is an identifier for a specific version of a resource. It allows caches to be more efficient, and saves bandwidth, as a web server does not need to send a full response if the content has not changed. On the other side, if the content has changed, etags are useful to help prevent simultaneous updates of a resource from overwriting each other ("mid-air collisions").

If the resource at a given URL changes, a new Etag value must be generated. Etags are therefore similar to fingerprints and might also be used for tracking purposes by some servers. A comparison of them allows the determination of whether two representations of a resource are the same. They might also be set to persist indefinitely by a tracking server.

Source: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag

## RPC vs REST

The tl;dr is that `REST enforces a client/server model, where the client is interested in gaining information and acting on a set of resources that are managed by the server. It doesn’t make sense to talk about RPC vs REST. In fact you can implement a RESTful service on top of any RPC implementation by creating methods that conform to the constraints of REST. You can even create an HTTP style REST implementation on top of an RPC implementation by creating methods for GET, POST, PUT, DELETE that take in some metadata that mirrors HTTP headers and return a string that mirrors the body of an HTTP request.`

Best source: https://etherealbits.com/2012/12/debunking-the-myths-of-rpc-rest/

## Security

### Same-Origin Policy

The same-origin policy is a critical security mechanism that restricts how a document or script loaded from one origin can interact with a resource from another origin. It helps isolate potentially malicious documents, reducing possible attack vectors.

### iFrame

On one side it’s a tag, but from the other side it’s a window-in-window.

## Web Performance

### Critical Rendering Path

Optimizing for performance is all about understanding what happens in these intermediate steps between receiving the HTML, CSS, and JavaScript bytes and the required processing to turn them into rendered pixels - that's the critical rendering path.

### Service Workers

Source: https://developers.google.com/web/fundamentals/primers/service-workers/

A service worker is a script that your browser runs in the background, separate from a web page, opening the door to features that don't need a web page or user interaction. Today, they already include features like push notifications and background sync. In the future, service workers might support other things like periodic sync or geofencing. The core feature discussed in this tutorial is the ability to intercept and handle network requests, including programmatically managing a cache of responses.

The reason this is such an exciting API is that it allows you to support offline experiences, giving developers complete control over the experience.

Things to note about a service worker:

- It's a JavaScript Worker, so it can't access the DOM directly. Instead, a service worker can communicate with the pages it controls by responding to messages sent via the postMessage interface, and those pages can manipulate the DOM if needed.
- Service worker is a programmable network proxy, allowing you to control how network requests from your page are handled.
- It's terminated when not in use, and restarted when it's next needed, so you cannot rely on global state within a service worker's onfetch and onmessage handlers. If there is information that you need to persist and reuse across restarts, service workers do have access to the IndexedDB API.
- Service workers make extensive use of promises.
