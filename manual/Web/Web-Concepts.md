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

## RPC vs REST

The tl;dr is that `REST enforces a client/server model, where the client is interested in gaining information and acting on a set of resources that are managed by the server. It doesn’t make sense to talk about RPC vs REST. In fact you can implement a RESTful service on top of any RPC implementation by creating methods that conform to the constraints of REST. You can even create an HTTP style REST implementation on top of an RPC implementation by creating methods for GET, POST, PUT, DELETE that take in some metadata that mirrors HTTP headers and return a string that mirrors the body of an HTTP request.`

Best source: https://etherealbits.com/2012/12/debunking-the-myths-of-rpc-rest/
