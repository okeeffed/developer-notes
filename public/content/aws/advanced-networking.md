---
name: Advanced Networking
menu: AWS
---

# Advanced Networking

- [Advanced Networking](#advanced-networking)
  - [Resources](#resources)
  - [IPv4 and Subnetting](#ipv4-and-subnetting)
    - [MPLS (Multi-Protocol Label Switching)](#mpls-multi-protocol-label-switching)
    - [Addresses in 10.0.0.0/16 VPC reserved for AWS](#addresses-in-1000016-vpc-reserved-for-aws)
    - [FEC (Forward Equivalency Class)](#fec-forward-equivalency-class)
    - [Border Gateway Protocol (BGP)](#border-gateway-protocol-bgp)
    - [Public-Key Cryptography](#public-key-cryptography)
  - [VPN Fundamentals](#vpn-fundamentals)
    - [Keys](#keys)
    - [Key Exchange Encryption Keys](#key-exchange-encryption-keys)
    - [Message intergrity](#message-intergrity)
    - [Confidentiality using Symmetric Key Block Ciphers](#confidentiality-using-symmetric-key-block-ciphers)
    - [VPN Protocols](#vpn-protocols)
    - [IPsec Process](#ipsec-process)
    - [Internet Key Exchange (IKE)](#internet-key-exchange-ike)
  - [Intro the Border Gateway Protocol (BGP)](#intro-the-border-gateway-protocol-bgp)
    - [Terms](#terms)
    - [About](#about)
    - [BGP Requirements](#bgp-requirements)
    - [BGP - Operation and Keep-Alive](#bgp---operation-and-keep-alive)
    - [BFD - Bidirectional Forwarding Detection](#bfd---bidirectional-forwarding-detection)
    - [BGP - Multi-Exit Discriminator](#bgp---multi-exit-discriminator)
    - [BGP - AS_Path Prepending](#bgp---aspath-prepending)
  - [Password Hashing](#password-hashing)
  - [Duplex vs Multiplex](#duplex-vs-multiplex)
  - [Pre-Shared Key](#pre-shared-key)

## Resources

1. [Block Ciphers](https://en.wikipedia.org/wiki/Block_cipher)
2. [Duplex vs Multiplex](https://networkengineering.stackexchange.com/questions/23212/multiaccess-with-duplex-and-multiplexing)
3. [Pre-Shared Key](https://en.wikipedia.org/wiki/Pre-shared_key)
4. [Public Key Encryption Explained](https://ssd.eff.org/en/module/deep-dive-end-end-encryption-how-do-public-key-encryption-systems-work)

## IPv4 and Subnetting

255.255.255.255

The `/8, /16, /24, /32` refers to how many bits are being masked. If it is `/17` for example, 17 bits are masked with `2^1` subnets and `2^15 - 2` available addresses with one address for the host and one for the network.

### MPLS (Multi-Protocol Label Switching)

Method by which a direct link between two or more sites is simulated by efficiently directing traffic over multiple points.

### Addresses in 10.0.0.0/16 VPC reserved for AWS

10.0.0.0, 10.0.0.1, 10.0.0.2, 10.0.0.3 and 10.0.0.255.

### FEC (Forward Equivalency Class)

A label applied to packets to allow routes to immediately know where to route them.

### Border Gateway Protocol (BGP)

AWS preferred Routing Protocol to route between multiple Autonomous Systems.

### Public-Key Cryptography

Public-key cryptography, or asymmetric cryptography, is a cryptographic system that uses pairs of keys: public keys which may be disseminated widely, and private keys which are known only to the owner.

The generation of such keys depends on cryptographic algorithms based on mathematical problems to produce one-way functions. Effective security only requires keeping the private key private; the public key can be openly distributed without compromising security.

## VPN Fundamentals

What is a VPN?

Virtual Private Network that exists to allow traffic to move securely and confidentially.

There are two primary types:

1.  Site-to-site: Two or more sites are connected without any software on the client machines. MPLS can be used to create this.
2.  Client-to-site: Client has software installed that allows it to communicate with the site. Typically used for remote workers.

### Keys

1.  Symmetric-key encryption: All parties share the same key to encrypt and decrypt a message.
2.  Public-key encrytion (asymmetric): Each party has a public-private key pair. One computer uses its private key to decrypt a message and the other uses its public key to encrypt.

### Key Exchange Encryption Keys

1. RSA (Rivest–Shamir–Adleman):
   - Asymmetric.
   - Used primarily in key exchange in other protocols, such as SSL. RSA is used to encrypt an AES key exchange.
   - 2048 bit encryption or higher is considered secure as 1024 has been theorized to be cracked by NSA.
2. Diffie-Hellman
   - Faster than RSA
   - Used by AWS
   - Provides PFS
3. PFS (Perfect Forward Secrecy)
   - Means that the compromise of session does not endanger others. New keys are created for every session.

### Message intergrity

If intercepted, the message could be modified.

To verify authenticity you have the following options:

1.  MD5 (Message Digest)
    - MD5 is broken, don't use for production environments.
2.  SHA (Secure Hash Algorithm)
    - SHA-1: 160-bit hash similar to MD5. Also considered insecure.
    - SHA-2: SHA-2 includes SHA-256 and SHA-512.
    - SHA-3: SHA-3 is the only member of the SHA family not created by the NSA.

### Confidentiality using Symmetric Key Block Ciphers

1.  Triple Data Encryption Standard (3DES)
    - Three symmetric keys with 56 bits each.
    - Slowly being phased out in favour of stronger encrytion keys.
2.  Blowfish
    - Fast algorithm.
    - Secure.
    - Blocks of 64 bits encrypted individually.
3.  Twofish
    - Successor to Blowfish
    - Up to 256 bit in length
    - One of the faster algorithms
4.  AES (Advanced Encryption Standard)
    - Standard for US Gov and many other organizations.
    - Symmetric key algorithm.
    - Uses 128, 192 or 256 bit encryption.
    - Widely regarded as the de-facto standard for message encryption.
    - Probably what is used in many instances.

### VPN Protocols

1.  PPP
    - Point-to-point protocol used to encrypt traffic within a tunnel.
    - PPP is Layer 2 protocol.
2.  PPTP
    - Point-to-point tunnel protocol.
    - Establishes GRE tunnel. Then uses PPP to encrypt and authenticate the traffic.
    - Uses simple password auth.
3.  L2TP
    - Layer 2 transfer protocol.
    - Created by Microsoft and Cisco to combine LTP and PPTP to create a more secure protocol using IPSec.
4.  IKEv2
    - Internet Key Exchange version 2
    - Used with IPSec and was created by Microsoft and Cisco to be faster than L2TP.
5.  SSL VPN
    - Can be initiated through a web browser.
    - An SSL VPN does not require VPN client software.
6.  OpenVPN
    - Uses OpenSSL library. Open source and frequenctly updated.
    - Commonly considered the most secure VPN protocol.
7.  IPsec
    - SA: Security association that describes the security features of an IPsec connection.
    - AH: Auth header. Guarantees connectionless integrity and data origin of IP packets Auths entire packet, with the exception of mutable fields such as DSCP/ToS. Does not encrypt the payload.
    - ESP: The Encapsulating Security Payload provides encryption and authentication. But only authenticates contents of the packet.
    - Transport Mode: Encapsultes the payload of a packet. Used for most client to server relationships.
    - Tunnel Mode: Encapsulates the entire IP packet. Used for most VPNs.

### IPsec Process

1.  Internet Key Exchange (IKE) Phase 1
    - Endpoints use ISAKMP (Internet Security Association and Key Management Protocol) to authenticate and negotiate the keys. This creates an encrypted tunnel used by Phase 2 for negotiating the Encapsulating Security Payload (ESP) security associations.
    - Uses an auth Diffie-Hellman exchange to match the pre-shared keys (PSKs).
    - Main Mode: Most secure. Provides complete security of the key exchange.
    - Aggressive Mode: Uses half the exchanges in the key exchange process, but transmits some information in cleartext.
2.  Internet Key Exchange (IKE) Phase 2
    - The endpoints use the tunnel created in Phase 1 to negotiate Encapsulating Security Payload Security Associations. The ESP SAs encrypt the actual user data.
    - After phase 2, the tunnel is created.

### Internet Key Exchange (IKE)

The nodes must agree on the following:

1.  The encryption algorithm. AES is an example.
2.  The bit-strength of the encryption key. This is commonly a Diffie-Hellman group.
3.  The authentication method. Typically an RSA digital signature.
4.  The hash algorithm. Usually SHA-1 or higher.
5.  The auth material. This is usually a pre-shared key (PSK).

## Intro the Border Gateway Protocol (BGP)

### Terms

- AS (Autonomous System): is a network or collection of network controlled by a single entity. Such as a corporation or university. An AS has its own routing table.
- AS Number: Provided by IANA to identify individual ASes.
- BGP (Border Gateway Protocol): A routing protocol used to route between multiple Autonomous Systems.
- EGP (Exterior Gateway Protocol): BGP is an example of an EGP. EGPs are used to route between organization/networks or Autonomous Systems.
- IGP (Interior Gateway Protocol): A routing protocol used within an Autonomous System. RIP, EIGRP, IS-IS and OSPF are examples.
- Multihoming: Having two separate ISPs for a network. Typically used for failover, redundacy or bandwidth.

### About

How the `entire` internet communicates. We'e all used it. BGP is the only protocol that operates outside of an autononous system.

- eBGP is for external communication between ASes.
- iBGP allows communication from within an AS.
- Most internal routing is done via IGPs such as OSPF, but iBGP can be used if very large routing tables must be transferred between border routers.

### BGP Requirements

- Autonomous Security Number (ASN): You will need an ASN. You can request an ASN from the American Registry for Internet Numbers (ARIN) or your country's regional provider.
- You must have a multi-homed network or prove intention to obtain one.
- BGP4 capable router with sufficient hardware specs.
- Fully function Interior Gateway Protocol (IGP).

### BGP - Operation and Keep-Alive

BGP uses "Keep-Alive" signals and a configuratble timer to detect if a peer is down. If a peer goes down, it will remove the dead peer's route from its advertisements. AS routers continually talk back to each other.

### BFD - Bidirectional Forwarding Detection

- "Bidirectional Forwarding Detection". The User Datagram Protocol (UDP) used with BGP to assist in detecting link failures at a much faster rate than the native BGP failure detection.
- BFD works with any routing protocol, not just BGP.
- BFD must be explicitly enabled to work properly.

### BGP - Multi-Exit Discriminator

- Allows the border router of an AS to tell neight ASes on which link it prefers to receive traffic.
- A low MED value is a higher preference and higher MED value is a lower preference.
- If there is a certain route that it wants to take eg. optic fibre, it wil take the preferred route. - There is a move preferred way to do this - `AS_Path Prepending`.

### BGP - AS_Path Prepending

- AS_Path Prepending: is how BGP routers can see full routes to other ASes. Each router prepends its ASN to the beginning of the list. This allows the router to see the most efficient route to its destination.
- It can also be used to artificially lengthen the path of your route in order to advertise to other routers that it is not a preferred route and influence these routers to send to another link.
- You can only do this with a public ASN.
- In a case where there are more hops between routers on a less preferred route, the router "creates" artificial hops to change the preference of the path.

## Password Hashing

1. bcrypt: a password hashing function based on the Blowfish cipher.
2. scrypt: a password-based key derivation function originally for the Tarsnap online backup service

## Duplex vs Multiplex

- Duplex: communication system is a point-to-point system composed of two or more connected parties or devices that can communicate with one another in both directions. Think of a telephone.
- Multiplexing (sometimes known as muxing): a method by which multiple analog or digital signals are combined into one signal over a shared medium.
- A reverse process, known as demultiplexing (demuxing), extracts the original channels on the receiver end.

## Pre-Shared Key

In cryptography, a pre-shared key (PSK) is a shared secret which was previously shared between the two parties using some secure channel before it needs to be used.
