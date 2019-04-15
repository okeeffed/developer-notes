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

Usual headers include `Transfer-Encoding: gzip` - HTTP 2.0 does not support `chunked`.
