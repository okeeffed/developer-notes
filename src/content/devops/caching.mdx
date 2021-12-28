---
menu: DevOps
name: HTTP Caching
---

# Caching

## Resources

1. [HTTP Caching](https://roadmap.sh/guides/http-caching)

## Terms

- Client: could be your browser or any application requesting the server for some resource.
- Origin Server: the source of truth, houses all the content required by the client and is responsible for fulfilling the client requests.
- Stale Content: is the cached but expired content.
- Fresh Content: is the content available in cache that hasn't expired yet.
- Cache Validation: is the process of contacting the server to check the validity of the cached content and get it updated for when it is going to expire.
- Cache Invalidation: is the process of removing any stale content available in the cache.

## Caching locations

- Browser cache: the local browser storage
- Proxy cache: unlike browser cache which serves a single user, proxy caches may serve hundreds of different users accessing the same content. They are usually implemented on a broader level by ISPs or any other independent entities for example.
- Reverse proxy cache: Reverse proxy cache or surrogate cache is implemented close to the origin servers in order to reduce the load on server. Unlike proxy caches which are implemented by ISPs etc to reduce the bandwidth usage in a network, surrogates or reverse proxy caches are implemented near to the origin servers by the server administrators to reduce the load on server.

Although you can control the reverse proxy caches (since it is implemented by you on your server) you can not avoid or control browser and proxy caches. If your website is not configured to use these caches properly, it will still be cached using whatever the defaults are set on these caches.

## Caching Headers

- Expires: Prior to `Cache-Control`, Expires was the timestamp for how long something should be considered fresh.
- Pragma: Another pre-HTTP/1.1. Everything you could do is now done by `Cache-Control`.
- Cache-Control
  - `private`: only cached in the browser or no proxies
  - `public`: cached by all
  - `no-store`: not cached at all
  - `no-cache`: can be maintained but the cached content is to be re-validated (using `ETag` for example) from the server before being served. That is, there is still a request to server but for validation and not to download the cached content.
  - `max-age`: seconds the content will be cached
  - `s-maxage`: max age for shared caches - overrides `max-age`
  - `must-revalidate`: enforces revalidation of browser cache before serving
  - `proxy-revaliate`: means all caches must revalidate
- Validators
  - ETag: Entity tag introduced in HTTP/1.1. A unique identifier that the server attaches with some resource.
  - Last-Modified: Indicates the date and time at which content was last modified.

## Content Delivery Networks vs Caches

CDNs are geographically distributed networks of proxy servers and their objective is to serve content to users more quickly. Caching is the process of storing information for a set period of time on a computer. The main difference between CDNs and caching is while CDNs perform caching, not everything that performs caching is a CDN.

## Caching Recommendations

- Agressive caching for static content with "fingerprinted" names (eg. `[name].[hash].[ext]`)
- Look and decide if you need caching for dynamic content ie RSS blog could have a few hours but stock inventory you want the latest information
- Always add the validators (preferably ETags) in your response
- Do not cache user specific information or sensitive content in public proxies - when in doubt, don't cache at all
- Separate content that changes often from those that do
- Test and monitor caching headers sent from your site ie `curl -I http:/your.site`
