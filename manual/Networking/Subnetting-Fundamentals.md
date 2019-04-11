---
name: Subnetting Fundamentals
menu: Networking
---

# Subnetting Fundamentals

## Basic Scenarios

### A Computer Using Hotspot

1. Computer is initiating communication over whatever netowrk medium is connected.
2. The computer is tethered to a cell phone for connectivity.
3. The cellphone is connected to a tower nearby for upstream connectivity.
4. Cell phone service provider functions as an `Internet Service Provider (ISP)` permitting the computer to access the internet.

### A Computer Using A Router

1. Computer is initiating communication over whatever netowrk medium is connected.
2. The computer has a `Network Interface Card (NIC)`.
3. NIC is connected to router for upstream connectivity.
4. Router is connected to ISP permitting internet access.

### Client Computers on a Local Network

1. Client computers are connected via ethernet from their NICs to the local switch.
2. Switch is connected to all devices on te local network. It will forward packets within the local network.
3. A router is connected to the local network and the internet. It will forward packets within the local network.
4. The router forwards packets upon request to upstream network eg ISP.

## Component Definitions

- Network Interface Card: Hardware available to the computer for the purpose of networking. It connects via some medium (ethernet, fiber, radio/wireless).
- Switch: Can be a stand-alone device or provided by the router if it has switching functionality. The switch is a member of the LAN and permits LAN communication.
- Router: Connected to the upstream network. Router device is a member of two (or more) networks and facilitates communication between networks. The router may connect to an ISP granting access to the internet. The internet itself comprises of many different, discreet networks.

## Network Traffic

There are three important methods of network traffic:

1. Unicast (one-to-one): Traffic is sent for a single source to a single destination. This is the most common form. Examples include a connection from a client web browser to a remote web server.
2. Multicast (one-to-many): Traffic is sent from a single source to multiple destinations. Example client sending updates to multiple devices at the same time as a single data stream. Traditionally handled by a discreet multicast network.
3. Broadcast (one-to-all): Traffic is sent from a single source to all destinations. Example being the `Address Resolution Protocol` that uses broadcast to map MAC addresses to IP addresses.

## OSI Layers in Network Traffic

Open Systems Interconnection Model.

### Layer 1: Physical

Represents the bit-level transmission between network nodes over the connection medium.

Data: Bits across the wire (1s and 0s) as pulse of electricity or light.

### Layer 2: Data Link

Data Link Layer handles communications between adjacents network nodes via physical addressing (MAC).

Data: Frames.

### Layer 3: Network

Handles routing messages (packets) via the best route to reach its destination based on IP address.

Data: Packets.

### Layer 4: Transport

Defines how data will be sent providing validation and security.

Data: Segments.

### Layer 5-7: Application, Presentation, Session

Layers 5-7 are typically managed by the application itself, providing the interface for the user to communicate.

Data: Data.

## Data in a TCP/IP Example

- Data Link Layer (2): Frame = Frame Header + Frame Data
- Network Layer (3): Packet = IP Header + IP Data
- Transport Layer (4): Segment = TCP Header + Application Data
- Application Layer (5-7): Data = App Header + User Data

## Network Segmention

There can be multiple switches within a small corporate network that isolate different department computers and servers.

### Isolation

- Bad Actor: Could compromise netowrk resources it has access to.
- Limiting: In a single-scroped network, bandwidth competition could lead to quality of servie issues for important services and hosts.

### Scaling

The benefits of segregation in a larger network:

- Improve network performance and speed
- Reduce network congestion
- Enhance security
- Controlled expansion
- Maintenance and Administraion

## Addressing

### IPv4

IPv4 address are 32bit with an octet each consisting of 8 bits (hence the 255.255.255.255 limit).

### IPv6

- Leading 0s can be compressed
- Groups of zeroes can be removed (once) and represented by `::`

### MAC

- 48 bit
- First three sections represent the Organizationally Unique Identifier (OUI) - number deontes the manufacturer and whether this is a `universal` or `local` MAC address
- The MAC addresses are mapped to IP addresses through the `Address Resolution Protocol (ARP)`

### Address Resolution Protocol (ARP)

1. Broadcast => who has IP 192.168.1.212? No `Target` MAC address as it is a broadcast
2. Unicast back => I have the IP 192.168.1.212. Has all `Sender` and `Target` addresses

## Network Masks

Designates which sections of the IP address apply to the network, and which apply to the host.

Example, for `192.168.001.101` we could have Network Portion `255.255.255` and Host Portion `.101`. Only the `101` part of this address is the host portion. The network mask determines the network size and `range`.

In this example the `range` is `192.168.001.0 - 192.168.001.255`.

Note that in a classful network, the `.0` is not a valid IP as it represents a network.

The highest IP in the range isn't used for host assignment as it is consider the `broadcast IP` for broadcasting a packet to an entire IPv4 subnet.

### Calculating Subnet Hosts

Formula is `2^n - 2` where n is the number of host bits.

We subtract 2 addresses for the host ID and the broadcast.

### Calculating Subnet Range

```shell
192.168.100.200 => 11000000 10101000 01100100 11001000
255.255.255.224 => 11111111 11111111 11111111 11100000 (2^5 = 32)
==============================================================
11000000 10101000 01100100 11000000

192.168.100.192 32 addressess = 224

Network Address: 192.168.100.192
Broadcast Address: 192.168.100.223
```

### Calculating Subnets

Formula is `2^b / n+2` where:

- b: number of bits in the host portion
- n: number of hosts per subnet

## CIDR -> Classless Inter-Domain Routing

- does no use classes for network assignment or sizing
- entire unicast range (0-233 in first octet) can be segmented into any sized network
- subnet masks not limited to `255.255.255.0`, `255.255.0.0` or `255.0.0.0`

## FLSM and VLSM

Classful networking and CIDR apply to IP assignments, FLSM and VLSM apply to how subnets are assigned within an infrastructure and if the routing protocol send the subnet mask. FLSM is uncommon and has been replaced by VLSM.

- FLSM = Fixed Length Subnet Mask
- VLSM = Variable Length Subnet Mask
