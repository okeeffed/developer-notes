# 18: Caching

## Caching Overview

### What is Caching?

- External: data tahta's going to be returned to our users (images, videos, static content).
- Internal: important tool we use to speed up our databases. The less we talk to the DB, the better.

### Caching options

Four solutions covered:

1. CloudFront (external)
2. ElastiCache (internal)
3. DAX (internal)
4. Global Accelerator (external)

Favour answers that have caches in them.

The tips:

- Caches go in front of everything.
- Speed
- Internal vs external

## Global Caching With CloudFront

A CDN that takes static content and distribute them out to edge locations.

### Important settings

- Security: defaults to HTTPS. Also allows custom SSL certificate.
- Global Distribution: can't pick spcific countries - just a general areas of the globe.
- Endpoint Support: Can be used to front AWS endpoints along with non-AWS applications.
- Expiring content: You can force an expiration of content from the cache if you can't wait for the TTL.

The important settings to know for the associate exam:

- HTTPS settings.
- You can restrict viewer access (use Signed URLs or Signed Cookies).
- You can't pick specific countries.
- You can attach a Web Application Firewall if you need extra protection.
- SSL Certificate settings.

Some exam tips:

1. CloudFront is fast.
2. On-Site support: on prem as well.
3. Blocking connections: WAF is better for finer level access control.

## Caching Your Data with ElastiCache and DAX

### ElastiCache

A managed version of 2 open-source technologies `Memcached` and `Redis`.

Memcached:

- Simple database caching solution.
- Not a database by itself.
- No failover or multi-AZ support.
- No backups.

Redis:

- Supported as a caching solution.
- Functions as a standalone database.
- Has failover and Multi-AZ support.
- Supports backups.

Both generally sit infront of a SQL database.

### DAX

- In-Memory Cache: going from ms to microseconds.
- Lives inside a VPC.
- You're in control: node size + count for cluster, TTL for data, and maintenance windows for changes and updates.

### What type of cache should you use?

- DAX: Only for DynamoDB.
- ElastiCache: It can front anything. More flexible.

## Fixing IP Caching with Global Accelerator

### What is Global Accelerator?

A networking service that sits in front of applications.

It sends users' traffic through AWS's global network infra. It can increase performance and help with IP caching.

The problem to try and solve is that is helps with failures for things like ELBs when the user has the IP cached.

Global Accelerator sits in front of those assets and returns two IP address to help with failover.

### Top 3 features

1. Masks complex architecture. As apps grow and change and deployments happen, your users won't notice. They will use the same IPs no matter what.
2. Speeds things up. Traffic is routed through AWSs global network infra. Makes use of the edge locations that connect to AWS backbone.
3. Weighted Pools. Can be used to try out new features or handle failure in your environment.

The exam tips:

1. Accelerator solves IP caching.
2. Speed: uses edge locations to help speed things up.
3. Can set up weights.
4. 2 Static IPs that don't change.
