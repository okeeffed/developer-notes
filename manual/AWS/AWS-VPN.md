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

To move data from customer location to AWS environment, you need to ensure that the correct networking is setup.
