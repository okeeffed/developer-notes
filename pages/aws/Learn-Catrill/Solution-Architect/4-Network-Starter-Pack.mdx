# 4: Network Starter Pack

A fundamental set of lessons on networking.

## Intro

The best way to understand networking is through the OSI (Open System Interconnection) Layer 7 Model.

1. Layer 1: Physical Layer.
2. Layer 2: Data Link Layer.
3. Layer 3: Network Layer.
4. Layer 4: Transport Layer.
5. Layer 5: Session Layer.
6. Layer 6: Presentation Layer.
7. Layer 7: Application Layer.

These are grouped into two layers:

1. Media layers: Layer 1 to 3. Getting from point A to B.
2. Host layers: How the data is chopped up and reassembled for transport and how it is formatted so it understandable by both sides of a network connection.

## Layer 1: Physical

Assuming a copper cable to be used to transmit electrical signals between two network interface cards.

Physical medium can be:

1. Copper (electrical).
2. Fibre (light).
3. WIFI (radio frequencies).

Layer 1 specifications define the transmission and reception of RAW BIT STREAMS between a device and a SHARED physical medium.

It defines things like voltage levels, timing, rates, distances, modulation and connectors.

A simple example to think about is two devices of a point-to-point link.

This being said, you can have a HUB that helps to connect multiple devices together.

The hub has one job: anything received from the hub is sent to all the devices connected to it. This includes errors and collisions.

You need to understand at layer 1:

- No device addressing. All data is processed by all devices. This is addressed by layer.
- You can have a collision if multiple devices try transmitting data at the same time. This becomes more likely with more devices.
- There is no media access control and no collision detection.
- Layer one is dumb.
- Layer one networks do not scale one.
- This layer is fundamental. For it to be useful, we require Layer 2.
- Layer one sets standards for transmitting onto the meium and receiving from the medium.

## Layer 2: Data Link

Support the transfer of the data. It supports a significant amount of functionality.

- Requires a functional Layer 1 model to work.
- There are different Layer 2 protocols for different situations.
- To conceptualise, think of a local network with ethernet.
- Layer 2 introduces **frames**.
- Devices on Layer 2 introduce a globally unique hardware address (MAC). It is 48 bits. 24 for the manufacturer (OUI).
- Frames can be addressed to a destination of broadcast (all frames).

Things that frames have:

1. Preamble (56 bits) and start frame delimiter (SFD - 8 bits). It denotes where the frame begins.
2. Destination MAC (Media Access Control) address.
3. Source MAC Address.
4. Ether type (ET - 16 bits). It lets you know which Layer 3 protocol was used to transmit the frame.
5. Payload (anywhere from 46 - 1500 bytes) in size. Generally provided by Layer 3 protocol. This process is known as encapsulationx.
6. Frame check sequence (FCS - 32 bits). It is used to detect errors. It helps to understand if corruption occured or not.

> You can put all F's as the MAC destination to make a broadcast. All F's is when a MAC address is set to `FF:FF:FF:FF:FF:FF`.

In an ethernet workflow:

1. With two laptops playing a game. The first laptop contains a frame that it wants to send to laptop two.
2. The job of Carrier Sense Multiple Access (CSMA) is to check the carrier to check if there is a carrier on layer one.
3. Layer 1 than transmits the data and passes it up to Layer 2.
4. Layer 2 on the other end of the cable then checks the address was for it.
5. Laptop two can then send back another frame back through the same mechanism outlined above.
6. If collection detection (CD) occurs (both devices transmitting at once) both backoff for a time + random. Increases if another close collision.

Let's revisit an example now with 4 devices on a HUB.

1. Laptop 1 sends data frame to the HUB.
2. The HUB sends the data frame to all the devices.
3. The laptops that are not addressed to discard the data, the intended destination receives the data.
4. HUBS have a single collision domain. Collisions are also repeated and impact all devices. This is where a Switch comes in.

The switch works similar to a hub, but only now it understands how Layer 2 works. With this replacing the hub:

1. Switch maintains a MAC Address Table.
2. Now when a frame is sent, the switch will forward the frame to the one port if it knows the destination or broadcast to all ports if it does not.

Switches **store** and **forward**. They don't repeat blindly like hubs. That means that only valid frames are forwarded - collions are isolated on the port they occured. Every `X` port switch has `X` collision domains. It allows switches to scale and be connected together.

The switch only forwards valid frames. Switches enable unicast (1:1) and broadcasts (1:ALL).

The Internet is the interconnection of networks and are made up of many Layer 2 connections.

## Decimal to Binary to Binary Conversion (IP Addressing)

This will be for the IPv4 addresses.

Dotted decimal notation for IPv4 addresses look like this `133.33.33.7`.

A computer sees the 32 bits = 4 x 8 bits = 4 bytes = 4 octets.

You need to be able to convert between the two.

### Decimal to binary

Decimal to binary is easier. Work left to right to convert the decimal into binary:

| Position              | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   |
| --------------------- | --- | --- | --- | --- | --- | --- | --- | --- |
| Binary Position value | 128 | 64  | 32  | 16  | 8   | 4   | 2   | 1   |

So for the example `133.33.33.7`, we can figure out the value:

```
133 = 10000101
33 = 00100001
7 = 00000111
```

### Binary to decimal

Convert `10000101.00100001.00100001.00000111` back to decimal.

Work left-to-right and combine the value of all the 1s as they correlate to the binary position value.

## Layer 3: Network

Layer 3 requires one or more operational Layer 2 networks to work.

Layer 3 handles the process of moving data from the source to the destination.

Why is Layer 3 needed? To understand, think of two LAN networks with four devices on each of them on other sides of the country.

So far, the LAN network can communicate with Layer 2. You can't simply put two Layer 2 networks together that use different protocols and have them work out of the box.

- Ethernet is a L2 protocol generally used for local networks. Long distance point-to-point links will use other more suitable protocols such as PPP (Point-to-Point), MPLS (Multi Protocol Label Switching), and ATM (Async Transfer Mode).
- To move data between to LAN networks, we need Layer 3. It can span multiple L2 networks.
- It adds the Internet Protocol which adds cross-network IP addressing and routing to move data between Local Area Networks without direct P2P links.
- IP Packets are moved step-by-step from source to destination via intermediate networks. Encapsulated in different frames along the way.
- Routers (L3 devices) remove frame encapsulation and add new frame encapsulation at every hop.

### The structure of packets

Packets are similar to frames. They contain data to move and have a source and destination. The difference in source and destination here could be on opposite sides of the country.

- Packets remain the same as they move across L2 networks.
- As the packets move through the network, they are encapsulated within frames that are specific to the network the frame is moving through.

There are two versions of the Internet Protocol.

1. v4 (IPv4)
2. v6 (IPv6)

The relevant parts of a packet for IPv4:

- Source IP Address.
- Destination IP Address.
- There is a protocol field: it generally provide data from L4. This references information on the protocol from L4 being used.
- The bulk of the packet is taken up by the data.
- Time to live field (TTL) is used to determine how long the packet can travel. It stops packets from hopping around forever.

For IPv6:

- Source IP Address.
- Destination IP Address.
- Data value.
- Hop limit. Functionally similar to TTL in IPv4.

### IP Addressing (v4) IPv4

`133.33.3.7` is an example of an IPv4 address. It is written in dotted-decimal notation.

- There is a network part (`133.33`) and a host part (`3.7`). The host part could be a device on the network like an laptop.
- If the network part is the same, then you know that the devices are on the same network. If not, they're on different networks.
- This example above with the 16 bits dedicates to the network means that this network has a `/16` prefix.
- IP address are statically assigned manually or by machine (DHCP - Dynamic Host Configuration Protocol).

### Subnet masks

A critical part of network. They're configured on L3.

- The subnet mask enables a host to determine if an IP address it needs to communicate with is local or remote which influences if it needs to use a gateway or can communicate locally.
- A subnet mask is configured on a host device in addition to an IP address e.g. `255.255.0.0` and this is the same as a `/16` prefix.
- Subnet mask helps determine if a host is on the same network or not.
- When the subnet mask is in binary, then anything with a `1` represents the network and anything with a `0` representss the host component.

To get the network start address, we overlay the `1` from the subnet mask over the IP and take all values and place `0` for the host part.

For the network end, we take the host component and place `1` for the host part.

For an example IP of `133.33.33.7` with a `/16` prefix, the start address is `133.33.0.0` and final address is `133.33.255.255`.

The subnet helps identify if a local network can be used to send information or an inter-network medium needs to send packets via IP routing.

### Route Tables and Routes

An Internet router will have data sent through the default route on its way to another network (like an ISP).

- The ISP router has multiple network interfaces and route tables are used for a selection of where to send data next. It compares the destination IP and route table for matching destinations.
- The more specific prefixes are preferred (0 lowest, 32 highest for prefixes). Packet is forward on to the Next Hop/Target.
- The default route is our fallback route.
- Routing is a process where packets are forward hop-by-hop to their destination.
- A protocol BGP (border gateway protocol) is how routers communicate to each other to know where they can send packets.

How do we determine the MAC address of the AWS router? We use the ARP (Address Resolution Protocol).

### Address Resolution Protocol (ARP)

ARP is used to find the MAC address for a particular IP address.

To visualise this, you can think of one laptop sending data to another.

Within a local network, data is moved via L2 frames over L1. ARP discovers which MAC relates to a given IP. ARP broadcasts to ALL F's - who has the IP address?

At this point, L3 has to destination MAC address obtained via ARP to build a frame, encapsulate the packet within the frame and then given to layer one to be sent.

The L2 on the destination checks it is the correct MAC address and if so, it forwards the packet to L3.

L3 reviews the packet, sees that it is destination and de-encapsulates the data (strips the packet) and hands the data the application.

If the devices on the same network, it will be one L2 frame per packet.

If they are not on the same network, then there can be many L2 frames used along the way.

### Layer 3 - IP Routing

Now, let's say we have three networks.

- Between each network, we have some routers.
- Each router has a network interface in both networks that it touches.
- The network interfaces all operate at L1, L2 and L3.
- Each network has devices within them.

When a device wants to send information from another device on another network:

1. Device 1 (D1) uses subnet mask to determine if it is on the same network as D2.
2. It creates a packet with D2 as the destination. This is wrapped within a frame.
3. As it knows that the IP is not on the same network, it uses ARP to find the MAC address of of the default gateway (router one - R1). The packet destination is set to R1, the frame destination is set to D2.
4. F2 is set to R1. It will see the MAC address is R1, so it will strip the packet and review its IP destination.
5. R1 will see that the IP destination is D2 and encapsulates it and sends it on with a new destination obtained using ARP. In our example, the next destination was R2.
6. R2 does the same de-encapsulation, reviews the packet and see that the destination device is on the local network, so it uses ARP to get the MAC address of D2 and encapsulates the packet again in a new frame with the D2 as destination address.
7. D2 receives the frame and strips the packet and reviews the IP destination. It is the intended destination. It strips the packet and passes the data to the application.

> Note: if you device checks the desination IP address is not it, it will drop the packet. Routers do not do that, they find how to hop to the next destination and encapsulate that packet back into a frame with a new destination to hop to.

### L3 in Review

- IP Addresses (IPv4/IPv6) - cross network addressing.
- ARP - find the MAC address for the IP.
- Route - where to forward this packet.
- Route Tables - multiple routes.
- Router - moves packages from SRC to DST, encapsulating in L2 along the way.
- This allows device to device communications over the Internet.

Some limitations of L3 that can be resolved with L4:

- No method for channels of communications. Src IP to Dst IP only.
- Packets could be delivered out of order.

Some things not covered but related to L3:

- Network Address Translation.
- How IP address space functions.
- IPv6.

## Layer 4: Transport (and touching on Layer 5)

Transport layer runs on top of the network layer.

The Session layer runs on top of the Transport layer.

The issues with Layer 3:

- Packets could be delivered out of order.
- Packets could be lost. This could be due to outages or network congestion.
- Every packet is routed independently. What happens to one packet, may not happen to another.
- IP cannot separate packets for different applications.
- No control flow. If source transmits faster than the destination can receive, it can saturate the destination causing packet loss.

Layer 4 helps to address a lot of theses concerns.

### TCP and UDP

Layer 4 adds Transmission Control Protocol (TCP) and User Datagram Protocol (UDP) to the Internet Protocol (IP).

If you see `TCP/IP` this means `TCP running on IP`.

- TCP is slower and more reliable. Deals with reliability, error correction and ordering. It is used for most important application protocols: HTTP/S, SSH. TCP is connection-oriented. You need to establish the connection between two devices. The communication is bi-directional.
- UDP. Faster/Less reliable.

Both run on top of IP and use IP as transit.

### TCP Segments

TCP introduces `Segments`. They are specific to TCP.

- If you have a stream of packets, then TCP Segments are encapsulated within IP Packets.
- Segments don't have SRC and DST IPs.

Some important attributes of segments:

- Source port.
- Destination port.
- Sequence number. Incremented with each segment that is sent. Unique. It helps with order correction.
- Acknowledgement. It helps the destination tell the source that it has received the segment.
- Flags (and extra things).
- TCP window: the bytes you are willing to receive before acknowledgement. This lets the receiver control the rate of data transmission. This handles flow control.
- Checksum. Used for error checking.
- Urgent pointer: setting this in a segment means both sides can have separate processing so that control traffic always takes prioritity within the communication. Any protocols that are latency sensitive (FTP, telnet) can use this field.

All the above fields together are known as the `TCP Header`. The rest of the data is used for the data.

### How this is used in TCP

TCP is connection based. Once the connection is established, it provides a reliable connection via the segments encapsulated in IP Packets.

Layer 4 takes data provided to it and chops it up and puts it into segments.

For the example of a laptop talking to a game server from port 23060 to 443.

- The laptop port `23060` is known as the ephemeral port and is temporary.
- The server port `443` is known as the well known port.

### TCP Connection 3-Way Handshake

In the "flags and things" part of the TCP header, it contains some important flags for the 3-way handshake to establish the connection:

1. SYN - indicates that the connection is being established.
2. ACK - indicates that the connection has been established.
3. FIN - indicates that the connection is being terminated.

The way handshake goes with "SYN" and the sequence number it intends to start with, replied by the server on "SYN-ACK" and the sequence number it intends to start with, and finally the client sending an "ACK" to the server.

At each stage of the three-way handshake, those sequence numbers for the connection are incremented for both the client and server sequence number.

### Layer 5: Sessions

What happens if you want to add security to the laptop? What sort of traffic will you allow from and to?

Two types of capabilities levels:

1. Stateless firewall (doesn't understand state of the the connection). You need a rule for the outbound and inbound segments. This is what a Network ACL is in AWS.
2. Stateful firewall. This sees the initial connection and automatically allows the response. This is how Security Groups works in AWS. Stateful understands Layer 4.

## Network Address Translation (NAT)

- NAT is a process that is designed to address the shortage of IPv4.
- To give network access to private addresses, we need to use IP.
- Translates Private IPv4 addresses to public.
- Static NAT: 1 private to 1 (fixed) public address. This is how the Internet Gateway in AWS works.
- Dynamic NAT: 1 private to 1st available public address. This method is generally used when you have many private IPs but have less public addresses.
- Port Address Translation (PAT) - many priate to 1 public. This is likely what the home Internet router does. Also known as overloading. In AWS, this is NATGW.

> NAT only makes sense for IPv4. IPv6 does not need NAT since there are so many addresses.

### Static NAT

If you have devices in a private IPv4 address space, we need to translate those addresses to public address to communicate with the outside world.

There is NAT table that maps private addresses to public addresses for static NAT.

Communication happens like so:

1. Private device creates a packet.
2. The NAT device translates the packet source address to the public address.

This is performed in AWS by the Internet Gateway (IGW).

### Dynamic NAT

Similar to static, except devices are allocated temporary addresses from a pool.

As the packet moves through the NAT device, it checks if there is an allocation. If not, it allocates a temporary public address. Similar to static NAT so far.

The difference it, multiple devices can use the same IP address as long as they do not use it at the same time.

You can possibly run out of public addresses if nothing is available as it moves through the pool.

### Port Address Translation (PAT)

This is likely the address translation you are familiar with.

This is how the AWS NAT GW works. Many private IPv4 address are mapped to one public IPv4 address.

The NAT device again translates the source packet and source port.

It uses the same translated source IP but a different source port.

The NAT device has a NAT table that maps private addresses and port to public addresses and port.

## IP Addressing & Subneeting

- IPv4 standard created in 1981.
- Originally, IP address manages by IANA: Internet Assigned Numbers Authority..
- Now parts are delegated to regional authorities.
- All public IPv4 addresses are allocated.
- Part of the address space is private - can be used/reused freely.

## Specific function address spaces

- `0.0.0.0` to `127.255.255.255` - 128 networks. Class A. First octet up to 127 reserved for networks.
- `128.0.0.0` to `191.255.255.255` - this space was typically used for larger business. Class B. First 2 octets are for the network.
- `192.0.0.0` to `223.255.255.255` - Class C. First 3 octets are for the network.
- Class D is for multicast and Class E is reserved but out of scope for the lesson. They could only be used for private networks.

There are three ranges of IP that can be used internally which is defined by standard RFC918.

- `10.0.0.0` to `10.255.255.255` - 16 million IPv4 addresses. 1 Class A Network.
- `172.16.0.0` to `172.31.255.255` - 16 Class B networks. 65k IPv4 address. One of these in AWS is reserved for the VPC.
- `192.168.0.0` to `192.168.255.255` - 256 Class C networks. 256 IPv4 networks. Generally used for home or small office networks.

### IPv6 Addressing

So we know IPv4 are normally broken into 3 common classes.

We also know that some of the address space is dedicated to private network.

In total, there are 2^32 addresses available, but that isn't enough - hence the introduction of IPv6.

- IPv6 is 2^128 addresses - A LOT.
- The idea of IP addresses being a valuable commodity goes away for IPv6.

### IP Subnetting

Subnetting is the process of breaking networks up into smaller and smaller networks.

Classless Interdomain Routing (CIDR) is a way for us to break networks down.

An example of this is the `/16` prefix.

With the address `10.16.0.0/16`, you might notice the following:

- This is within the Class A.
- It is also within the private class A range.
- But, we notice that this is not `/8` for the network, it is `/16`.
- The `/16` is a small network within the bigger `/8` network.

> The larger of the prefix number, the smaller the network.

Say we needed the `10.16.0.0/16` to be broken down into smaller networks, we can not that one `/16` network is the same as `2 * /17` networks.

Since we need small, then we could break `/17` into 2 `/18` networks.

With the four `/18` networks, we have our 4 smaller networks.

Generally you will break networks down into a power result of 2.

## Distributed Denial of Service (DDoS)

- Comes in many forms. The aim is to overload websites. It will compete again legitimate connections.
- Distributed - hard to block individual IPs/Ranges.

Attacks normally fall under the follow categories:

- Application Layer - HTTP Flood.
- Protocol Attack - SYN Flood. Happens at L4.
- Volumetric - DNS Amplification.

> Often involve large armies of compromised machines (botnets).

## Secure Sockets Layer (SSL) and Transport Layer Security (TLS)

- Privacy and Data Integrity between client and server.
- TLS ensures privacy by encrypting communications.
- With TLS, it starts with an asymmetric architecture.
- Part of what TLS performs is moving from asymmetric to symmetric architecture.
- Identity (server or client/server) verified.
- Reliable connection - protect again alteration.

TLS happens in three stages:

1. Cipher Suites: A set of protocols used by TLS. Client and server have to agree on what cipher suite to use. Client HELLO has list that it supports. Server (if supporting one of them) sends back the cipher suite chosen + server certificate.
2. Authentication: Client validates server certificate is valid and public key is valid. This can be validated against the Certificate Authority (CA). In the past, the server generated the pub/private key pair and the Certificate Signing Request (CSR), the public CA generates a signed certificate. The client can then verify the certificate with the CA.
3. Key Exchange: This moves from asymmetric to symmetric. The client generates the pre-master key, encrypts it with the server public key and sends to server. The server decrypts the pre-master key using the private key. Now both sides use the pre-master key to generate the master secret which is used to generate the ongoing session keys which encrypt and decrypt the data.

After both sides confirm the handshake, communicateion from then on are encrypted with the session keys.
