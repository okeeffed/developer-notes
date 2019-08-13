---
menu: Networking
name: Network Address Translation
---

# Network Address Translation (NAT)

Process of mapping or translating one IP address to a different IP address (or addresses) by modifying the network address information in the IP header of the network packets.

This method is used to map a single public (routable) IP address to one or more private (unroutable) IP addresses. This helps prevent the exhaustion of public IPv4 addresses.

## Static NAT

- NAT device is assigned a pool of public IP addresses
- Private IP addresses are mapped to the public IP addresses
- Used in situations that require servers to always be mapped to the same public IP address

## Dynamic NAT

- NAT device is assigned a pool of public IP addresses
- Public IP addresses are used when they are needed by a host and then returned to the pool once they are no longer in use
- Used in situations in which the public IP address does not need to be consistently mapped to the same private IP address

## Port Address Translation

- A single public IP is assigned to a network
- All the devices on the network share a single IP address
- The NAT device records the private IP address as well as the port - also called the source port address - used by the internal host to ensure that communication is sent back correctly
- This is the most common type of NAT
- Helps conserve the number of available IP addresses

## Source NAT (SNAT)

- Preserves the destination address and modifies the source address
- Allows hosts on a private network to initiate a connection to hosts outside of the private network

## Destination NAT (DNAT)

- Preserves the source address and modifies the destination address
- Allows a host (or multiple hosts) outside of the private network to connect to a host inside a private network
