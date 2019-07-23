---
menu: AWS
name: AWS VPN
---

# AWS VPN

## Definitions

- IPSec: Also known as Internet Protocol Security, is a security architecture for IP network traffic. IPSec defines the framework for security at the IP layer, and the protocols that provide that security via authentication and encryption of packets. IPSec also defines the algorithms used to encrypt and decrypt packets.
- Security Associations: The SA is the relationship between entities that defines how they will use security services to communicate.
- IKE: Internet Key Exchange is a protocol used to manage keys used by IPsec hosts. IKE is defined in RFC 7296 and provides the mechanism for sharing the keys used and defines which algorithms will be used.

## VPN Overview

A VPN creates a secure, encrypted tunnel between two devices or sites which allows a host to communicate privately over an untrusted intermediary network (ie the Internet).

With AWS, a VPN is often used to alow an on-premises environment to communicate with a VPC over the internet securely. AWS VPCs can connect to a remote network using the following types of VPN connectivity:

- **AWS Site-to-Site VPN**: IPsec VPN communication between a VPC and remote network. The AWS side of the connection uses a virtual private gateway (VGW). The VGW provides two VPN endpoints (tunnels) for automatic failover. The two tunnels are created for redundancy purposes.
- **AWS Client VPN**: OpenVPN based clients to connect to your AWS or on-premises network. Companies generally need access to their resources although they are remote etc.
- **AWS VPN CloudHub**: Multiple remote networks, the VGW can function as a hub for site-to-site communication between the networks.
- Third party software VPN appliance: An Amazon EC2 instance in the VPN running a 3rd party software VPN appliance. VPN appliances may be found in the AWS Marketplace. Marketplace products are not supported by AWS.
- VPN can be used to connect a VPC and an on-premise data center, two different VPCs in the same or different Regions.
- VPN termination endpoints are required at both sites. The endpoint is responsible for the VPN protocols being used, processing packets, including encapsulation and encryption.
- VPC termination points can be an EC2 instance, or a VGW.

![Redundant VPC Setup](https://res.cloudinary.com/gitgoodclub/image/upload/v1563869718/developer-notes/Screen_Shot_2019-07-23_at_6.14.38_pm.png)

## AWS Client VPN

This solution is based off OpenVPN standards.

The client connects to a Client VPN Endpoint, which in turn associates with a target network with is essentially a subnet within a VPC.

AWS recommends two subnets within the AZ.

![Client VPN](https://res.cloudinary.com/gitgoodclub/image/upload/v1563870252/developer-notes/Screen_Shot_2019-07-23_at_6.23.56_pm.png)

## Site-to-Site VPN Routing

- Type of device you use for your on-premises VPN determines if you will use static or dynamic routing.
- You cannot create static routes when using Border Gateway Protocol (BGP)
- Dynamic is preferred mechanism, featuring BGP, if on-prem supports it. BGP advertises the routes to the VPC.
- Routes must be added to route table in order to direct any traffic destined for the customer gateway to use the VGW as he target.
  - Can also enable route propagation to automatically propagate the routes to use the route table for you (so you don't have to create the route manually).
- VGW only recognises IP prefixes that have been added statically (or via BGP).
- There is a hard limit of 100 BGP route advertisements per route table. Use route summarization if you have more than 100 prefixes. Static routes are limited to 50 per route table.

The VGW advertises the IP ranges of the VPC which is attached via BGP advertisement to your VPN termination endpoint. VGW uses BGP over TCP port 179 (the standard BGP port) and supports BGP configuration options, like Autonomous System (AS) prepends and Multi-Exit Discriminator (MED).

## Path Selection after route propagation

- The longest prefix match (the most direct route/route with the longest subnet mask) is used as priority route.
- If propagated routes from Site-to-Site VPN or AWS Direct Connect overlap with local VPC route, the local route is preferred. This is true even if the propagated route is more specific.
- Propagated routes from Site-to-Site VPN or AWS Direct connecting with the same destination CIDR as other existing routes are, then the static routes who target is an IGW, VGW, network interface, instance ID, VPC peer connection, NAT gateway or a VPC endpoint is selected.

If routes overlap within a Site-to-Site VPN and longest prefix match cannot be applied, then routes are prioritized as follows:

1. BGP propagated from AWS Direct Connect connection
2. Manually added static routes
3. BGP propagated routes from a Site-to-Site VPN

## AWS Site-to-Site Features

- Internet Key Exchange v2 (IKEv2)
- NAT traversal
- 2 and 4-byte ASN
- CloudWatch metrics for monitoring
- Reusable IP addressess for customer gateways
- Encryption options, including AES 256-bit encryption, SHA-2 hashing and Diffie-Helman groups
- Configurable tunnel options
- Customer private ASN for Amazon side of Border Gateway Protocol (BGP) sessions

## AWS Client-to-Site VPN

![Client-to-Site VPN](https://res.cloudinary.com/gitgoodclub/image/upload/v1563918132/developer-notes/Screen_Shot_2019-07-24_at_7.40.44_am.webp)

## Software VPN

- Within a Subnet within an AZ within a VPC
- Connected to Internet Gateway that connects to customer VPN through the VPN.

## Monitoring the VPN

- One key factor often overlooked is establishing a baseline. Should monitor the state of the VPN and data in or out of the tunnel. AWS provide tools that can be used to monitor the Site-to-Site AWS managed VPN connection.
- Consider monitoring `TunnelState`, `TunnelDataOut`, `TunnelDataIn`.
  To view metrics at CLI use `aws cloudwatch list-metrics --namespace "AWS/DX"`

## Customer Gateway

The Customer Gateway is the customer side of an AWS Site-to-Site VPN connection. The Customer Gateway may be configured with static routing, or routing can be configured to support dynamic routing using BGP.

Config for CW is provided by AWS and a list of pretested devices are available in the AWS documentation. Tunnel config cannot be modified once it's set.

Config requires four primary components:

1. Internet Key Exchange (IKE) Security Association: Used to exchange keys used to establish the IPsec security association. A 32-bit (8-64 characters) pre-shared key (PSK) to establish the initial IKE association.
2. IPSec: IPSec Security Association. Handles tunnel's encryption and authentication.
3. Tunnel interface: Receives traffic going to and from the tunnel:
   - A /30 CIDR block from the 169.254.0.0/16 range for use inside the VPN tunnel (there are some excluded ranges that cannot be used)
4. BGP: BGP peering is optional but preferred, and is used to exchange routes between the Customer Gateway and Virtual Private Gateway.

Note: The VPN connection is not active until traffic is generated from the customer side of the VPN connection. To keep the tunnel active, initiate regular traffic, i.e. ICMP ping. The tunnel will close if idle for 10 seconds.

### Firewall Rule Considerations

| Service | Protocol | Port |
| ------- | -------- | ---- |
| IPSec   | IP       | 50   |
| IKE     | UDP      | 500  |
| NAT-T   | UDP      | 4500 |

## VGW and VPN High Availability

- The Virtual Private Gateway is the AWS side of the Site-to-Site VPN connection. VGW will have an assigned BGP ASN, but you can optionally specify an alternative private ASN Number.
  - Private ASNs range from 64512-65534.
  - Use `AS_Path Prepending` to influence route selection and avoid asymmetric routing.
- The VGW is a redundant device with endpoints in two different Availability Zones.
- The CW is not redundant. HA and redundancy may be achieved by adding a second CW.
- Using BGP dynamic routing is recommended instead of manually created static routes, as BGP as inherent failover capability and functionality that allows for streamlined selected of preferred path and failover.

## AWS VPN CloudHub

CloudHub allows multiple VPN connections to be attached to a single VGW. This can be used to provide redundant connections from a single datacenter for redundancy, so if one CW fails the redundant CW can be used.

When using it for redundant connections, prefix should be the same (ie 0.0.0.0/0).

Multiple distinct datacenters can also be connected to AWS VPN CloudHub. With this, prefixes should be different for each site to the VGW (ie 172.16.0.0/24).

Connected VPNs may access the VPC via the VGW, and other connected VPNs as well. AWS VPN CloudHub operates on a hub-and-spoke model that can be used with and without a VPC. Different BGP Autonomous System Numbers (ASNs) are required for each VPN. Routes will need to be updated within the VPC in order to route traffic to each VPN.

![VPN CloudHub setup example](https://res.cloudinary.com/gitgoodclub/image/upload/v1563921057/developer-notes/Screen_Shot_2019-07-24_at_8.30.15_am.webp)

## Transit VPC

Transit VPCs build upon software VPNs, and make it possible to connect multiple geographically dispersed VPCs and remote networks. This strategy allows for transitive routing between the member VPCs, the Transit VPC, and the on-premises environment.

![Transit VPC](https://res.cloudinary.com/gitgoodclub/image/upload/v1563921304/developer-notes/Screen_Shot_2019-07-24_at_8.34.40_am.webp)

## Key VPN Facts

### For AWS VPN Services

- AWS Client VPN uses OpenVPN client software
- AWS Client VPN provides secure access to any AWS and on-premises resources from anywhere using OpenVPN client software
- AWS Client VPN integrates with existing infrastructure services, like AWS Directory Services
- Software based VPN solutions run on an Amazon EC2 instance and can be used to create a transit VPC solution
- Transit VPCs can be created using software VPNs between VPCs and on-premises networks
- Transit VPCs allow transitive routing between on-premises and AWS VPCs

### For Site-to-Site VPN

- Routes can be managed statically or dynamically using BGP
- The VGW utilizes and AWS provided BGP ASN, but private ASNs are available
- Two tunnels are created supporting IPSec and IKE, for secure comms
- CW is a single point of failure, unless redundantly implemented
- Review route priorities
- CloudHub creates a spoke-hub architecture that allows multiple S2S VPNs to connect to a single VGW. VPNs can communication with the VPC and other connected VPNs if proper routes exist
- There is a hard limit of 100 BGP route advertisements per route table. Use route summarization if you have more than 100 prefixes. Static routes are limited to 50 per route table
- Ensure you advertising no more than 100 routes for a private VIF, and no more than 1000 for a public VIF
- Routes may be influenced using BGP features like `AS_Path` prepending and Multi-Exit Discriminator (MED)
- VPN connection is not active until traffic is generated from the customer side of the VPN connection. To keep the tunnel active initiaite regular traffic, i.e. ICMP pinging. The tunnel will close if idle for more than 10 seconds
- A /30 CIDR block from the 169.254.0.0/16 range for use inside the VPN tunnel
- For HA, implement redundant CWs and use BGP for routing.
