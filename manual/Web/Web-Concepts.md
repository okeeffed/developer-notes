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
