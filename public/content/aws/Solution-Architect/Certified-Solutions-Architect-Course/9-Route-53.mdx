# 9: Route 53

## Overview

- What is DNS? DNS converts human-friendly domain names into an Internet Protocol (IP address). Think of like looking up a telephone number in a phone book.
- IPv4 address are running out. The space is 32-bit friendly and has over 4+ billion addresses.
- IPv6 was creating to address the IPv4 issue. The address space has 128 bits. In theory, there are 340+ undecillion addresses.

### Top-Level Domain

The last work in the domain name represents the top-level domain name. The second-level comes after the top-level (i.e. `.co.uk`).

Examples: `.gov`, `.com.au`, `.edu`.

- They are controlled by the Internet Assigned Numbers Authority (IANA) in a root zone database - essentially a db of all available top-level domains.

### Domain Registrars

- Domain registrars ensure there are no duplicates.
- A registrar is an authority that can assign domain names directly under one or more top-level domains. These domains are registered with InterNIC, a service of ICANN, which enforces uniqueness of domain names across the internet.

### Common record types

- SOA: Start of Authority - the name of the server that supplied the data for the zone, the admin of the zone, the current version of the data file, the default number of seconds for the TTL file on resource records.
- NS: Name Server - used by top-level domain servers to direct traffic to the content DNS server that contains the authoritative DNS records.
- A: Address - used by computer to translate the name of the domain to an IP address. Example, `http://www.mywebsite.com` might point to `http://123.12.12.12`.
- CNAME: Canonical Name - used to resolve one domain name to another. For example, you might have a mobile website `http://m.yourwebsite.com` that is used when users browse to your domain from their mobile device. You might also want `mobile.yourwebsite.com` to map to the same address.
- ALIAS: Alias - used to map resource record sets in your hosted zone to load balancers, CF distros, S3 buckets configured as websites. Work like CNAME in that you can map one DNS name to another "target" DNS name.

Things to note:

- CNAME cannot be used for naked domain names (zone apex record). You can't have a CNAME for `http://yourwebsite.com`.
- A Record/ALIAS can be used for naked domain name/zone apex record.

### TTL (Time To Live)

What is a TTL? The length of time that a DNS record is cached on either the resolving server or the user's own local PC is equal to the value of the TTL in seconds. The lower to TTL, the faster changes to DNS records propagate throughout the internet.

### The 7 Routing Policies

1. Simple
2. Weighted
3. Latency-Based
4. Failover
5. Geolocation
6. Geoproximity (traffic flow only)
7. Multivalue Answer

The exam tips:

- Understand the difference between an alias record and a CNAME.
- Given the choice, always choose an alias record over a CNAME.
- Understand the common DNS record names: SOA, CNAME, NS, A records.

## Register a Domain Name

In the demo, a domain was registered through AWS and a few EC2 instances were stood up in different regions.

## Simple Routing Policy

Simply, if we create an A Record with a naked domain name.

Simple routing was chosen with a TTL of 1 minute.

As for the value, both addresses were added on separate lines.

Essentially the Route53 would randomly select an address to be routed to.

If you specify multiple values in a record, Route 53 returns all values to the user in a random order.

## Weighted Routing Policy

Allows to split traffic based on different weights assigned.

- You can set health checks on individual record sets.
- If a record set fails a health check, it will be removed from Route 53 until it passes.
- You can setup SNS notifications to let you know if a health check failed.

As for the demo, a new health check was made for each of the EC2 instances.

When creating the A Records, you can specify a weight with a weight record policy. Ensure that the health check is also added here.

You'll create a separate record for each of the EC2 instances.

## Failover Routing Policy

Used when you want to create an active/passive set up.

For example, you may want your primary site to be in EU-WEST-2 and secondary disaster recovery site in AP-SOUTHEAST-2.

When creating new records, select "failover".

It then asks you if it is `Primary` or `Secondary`. The rest of the setup is as expected (also using health checks).

> To demo the failover, the inbound security group was changed to disallow all inbound traffic so the primary would fail over to secondary.

## Geolocation Routing Policy

Lets you choose here your traffic will be sent based on geographic location.

For example, you may want localization setup.

When creating the records, you can do it by continent or country.

Exam tip: if you need to route someone because of geographic requirement and not latency.

## Geoproximity Routing Policy

You can use Route 53 traffic flow to build a routing system that uses a combo:

- Geographic location.
- Latency.
- Availability to route traffic.

From your users to your cloud or on-premises endpoints.

You can build it by scratch or using a template.

Geoproximity routing is only available with traffic flow.

- Lets Amazon Route 53 route traffic to your resources based on the geographic location of your users and your resources.
- You can also optionally choose to route more traffic or less to a given resource by specifying a value, known as bias.

Likely won't be on the exam. Just know that a bias expands or shrinks the size of the geographic region from which traffic is routed to a resource.

In the demo, this is done by creating a `traffic policy` to build out the policies based on the GUI.

To use it, traffic flow must be enabled.

## Latency Routing Policy

Allows you to route your traffic based on the lowest network latency for your end user (i.e. which region will give them the fastest response time).

To use it, you create a latency resouce record set for the EC2/ELB resource in each region that hosts your website. When Route 53 recieves a query or your site, it selects the latency resource record set for the region that gives the user the lowest latency.

The demo follows a similar routing policy flow as previous demoes but with the `Routing policy` being set to `Latency` with the region selecting.

The exam tips:

- Know what latency based routing is.

## Multivalue Answer Routing Policy

"Just Simple Routing with health checks".

As opposed to simple routing, this basically only returns the values for healthy resources. We also need to create a new record for each health check.
