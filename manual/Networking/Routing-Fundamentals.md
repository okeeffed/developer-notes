---
menu: Networking
name: Routing Fundamentals
---

# Routing Fundamentals

## Reserved IP Address

Below are all the IP address reserved to be private, loopback, link-local or unspecified.

## Private IP addresses

- IPv4 address ranges:
  - 10.0.0.0 - 10.255.255.255
  - 172.16.0.0 - 172.31.255.255
  - 192.168.0.0 - 192.168.255.255
- IPv6 addresses range - fd00::/8

For these addresses:

- Cannot be used or routed to the Internet
- Helps delay IPv4 address exhaustion
- Used in local area networks (LAN)
- Provides flexible IP ranges for larger or smaller private networks
- Allows for additional subnets within the ranges

## Loopback IP address

The IP address range/address:

- (IPv4) 127.0.0.0 - 127.255.255.255
- (IPv6) ::1/128

For these addresses:

- Reserved for a Host's self address (or localhost address)
- Managed by Operating System
- Does not utilize the network interface card (NIC)
- Uses a virtual network interface within the OS
- Can be used for testing on local machine

## Link-local Address

The IP address range/address:

- (IPv4) 169.254.0.0 - 169.254.255.255
- (IPv6) fe80::/10

For these addresses:

- Used in the absence of DHCP or static addresses
- Can only communicate within its own network segment
- Routers will not forward packets from a loopback address
- Uses Address Resolution Protocol (ARP) to ensure that the desired IP address is not in use
- IPv6 requires a link-local address even if a routable address has been assigned

## Unspecified Address

- (IPv4) 0.0.0.0
- (IPv6) ::
