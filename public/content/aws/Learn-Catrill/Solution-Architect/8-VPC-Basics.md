# 8: VPC Basics

## Network Refresh

Two versions of IP: IPv4 and IPv6.

IPv4 Classful Address:

- `0.0.0.0` - `127.255.255.255` Class A. Uses first octet for networks.
- `128.0.0.0` - `191.255.255.255` Class B. Uses first two octets for networks.
- `192.0.0.0` - `223.255.255.255` Class C. Uses first three octets for networks.

### Private Networks

Defined by RFC1918 standard:

- `10.0.0.0` - `10.255.255.255` (Single Class A network).
- `172.16.0.0` - `172.31.255.255` (16 Class B networks). - AWS default VPC range is defined here.
- `192.168.0.0` - `192.168.255.255` (256 Class C networks).

For private IPs to talk to the internet, they need NAT.

### Classless inter-domain router (CIDR)

For `10.0.0.0/16`, the network is the first two octets in this example with a total of 65,636 addresses available.

- Two `/17` networks are one `/16` network.
- The process of breaking down prefix values into smaller networks is called subnetting.
- `0.0.0.0/0` means ALL IP address.
- `1.3.3.7/32` the `/32` means ONE IP address.

> Important: you cannot communicate with another subnet with the same subnet value. Don't randomly or blindly pick values.

### IP, TCP, UCP

- IP Packet / Datagram: SRC IP, DST IP + Data (and other things).
- TCP/UDP Segment: SRC port, DST port, data (encapsulated by pack data).

### IPv6

- Represented by 8 hextets.
- Prefix length is 128 bits.
- `::/0` - All IPv6 addresses.

## VPC Sizing and Structure

### VPC Considerations

- IP range to use in advance.
- What size should the VPC be.
- Are there any Networks we can't use. What other VPCs, Cloud, On-Prem, partners and vendors could we interact with. List all IP ranges to avoid.
- VPC Structure - Tiers & Resiliency (Availability) Zones.
- VPC minimum must be `/28`, and at most `/16`.
- Reserve 2+ networks per region being used per account.

In the example, it was considered that we would use these networks: 3 US + Europe + Aus (5) \* 2 \* 4 AWS accounts = 40 ranges (ideally).

Some VPC sizes in the size guide displayed:

| VPC Size    | Network | Subnet size | Hosts per subnet | Subnets per VPC | Total IPs |
| ----------- | ------- | ----------- | ---------------- | --------------- | --------- |
| Micro       | `/24`   | `/27`       | 27               | 8               | 216       |
| Small       | `/21`   | `/24`       | 251              | 8               | 2008      |
| Medium      | `/19`   | `/22`       | 1019             | 8               | 8152      |
| Large       | `/18`   | `/21`       | 2043             | 8               | 16344     |
| Extra large | `/16`   | `/20`       | 4091             | 16              | 65456     |

The questions to ask:

- How many subnets will we need?
- How many IPs total? How many per subnet?

### VPC Structure

- Good rule of thumb: aim for 3 AZs + one buffer for the future.
- As for tiers, generally you could think of 4 but it depends on the architecture layers.
- In this base that requires 16 subnets, if the network was `/16`, we know we need 16 `/20` subnets (4091 IPs each).
- `/16` per VPC - 3 AZ (+1), 3 Tiers (+ 1) - 16 subnets.

## Custom VPCs

- Regional Service - All AZs in the region.
- Isolated network.
- Nothing IN or OUT without explicit configuration.
- Flexibile configuration - simple or multi-tier.
- Hybrid Networking - other cloud & on-prem.
- Default or dedicated tenancy. For dedicated, everything inside needs to be dedicated instances.
- IPv4 Primary CIDR Blocks & Public IPs.
- VPC has a mandatory 1 private IPv4 CIDR block. Smallest this block can use is `/28` and largest is `/16`.
- Optionally can create secondary IPv4 Blocks.
- Optionally can assign a IPv6 `/56` CIDR Block. This feature set is being matured. There is no concept of private/public for IPv6. All publicly routable by default, but you need to explicitly route the to the public internet (no security concerns).

### DNS in a VPC

- Provided by Route53.
- VPC `Base IP + 2` Address.
- `enableDnsHostnames` - gives instances DNS Names.
- `enableDnsSupport` - enables DNS resolution in VPC.

## VPC Subnets

- AZ Resilient.
- A subnetwork of a VPC - within a particular AZ.
- 1 Subnet => 1 AZ, 1 AZ => 0+ Subnets.
- IPv4 CIDR is a subset of the VPC CIDR.
- Cannot overlap with other subnets.
- Optional IPv6 CIDR (`/64` subset of `/56` VPC - space for 256 `/64` ranges).
- Subnets can communnicate with other subnets in the VPC.
- VPCs have a configuration object applied to it called a `DHCP Options Set` (Dynamic Host Configuration Protocol).

You can also define two important IP allocation options:

1. Auto Assign Public IPv4.
2. Auto Assign Public IPv6.

Both options defined at the subnet level.

### Subnet IP Address.

Reserved IP addresses (5 in total).

- Network Address (first IP address)
- Network+1 Address (second address is for VPC Router)
- Network+2 Address (Reserved DNS\*)
- Network+3 Address (no use yet)
- Broadcast Address (last IP address)

> Be aware of that for smaller networks.

## VPC Routing, Internet Gateway & Bastion Hosts

### VPC Router

- Every VPC has a VPC Router which is HA.
- In every subnet `network+1` address.
- Routes traffic between subnets.
- Controlled by `route tables` each subnet has one.
- A VPC has a `Main` route table - subnet default.

### Route Tables

- When traffic leaves a subnet: Higher prefix = more specific = higher priority ie. `/16` > `/0`.
- The only exception is that `local` routes have higher priority.
- Target will either be `local` or a VPC gateway.

### Internet Gateway (IGW)

- Region resilient gateway attached to a VPC.
- 1 VPC can have one or zero IGWs.
- An IGW can only be attached to one VPC at a time.
- Runs in the AWS Public Zone.
- Gateways traffic between the VPC and the Internet or AWS Public Zone (S3, SQS, SNS, other AWS public services).
- AWS Managed.

### Using an IGW

1. Create an IGW.
2. Attach IGW to the VPC.
3. Create custom route table.
4. Associate route table.
5. Add default routes => IGW.
6. Subnet allocate IPv4. That subnet will now be considered a public subnet.

### IPv4 Addresses with a IGW

When you create a public IPv4 address, it is not actually applied to the instance itself.

It is mapped to the private IP address that the IGW maintains. This is why when you jump into a private instance, it only sees the private IP.

For networking:

- When it comes to a packet going out from the public instance, the source IP is updatd by the IGW.
- When a packet is going to the instance, the destination address is updated by the IGW and forward to the instance.

In the case of IPv6, the IGW doesn't do any translation (since there are no private IPs).

### Bastion Host/Jumpbox

- Bastion Host = Jumpbox.
- An instance in a public subnet.
- Incoming management connections arrive there, then access internal VPC resources.
- Often the only way IN to a VPC.

## Network Access Control Lists

- All NACLs are associated with subnets.
- All subnets are created with a default NACL.
- NACLs are used when traffic enters or leaves subnet.
- NACLs are stateless and have inbound and outbound rules.

Rules for NACLs:

- Processed in order.
- Low rule, first.
- Stops if matched.
- Rules can explicity ALLOW or explicitly DENY.
- Rule with an `*` is the default implicit deny that cannot be removed.
- By default, there is an ALLOW with value 100.

### NACL Communication

Initiation and response style of communication.

1. Initiation from a client talks to a well-known port (443).
2. Bob's PC tells the server that is can respond via an ephemeral port. That response is outbound traffic.

NACL requires a rule for both the inbound and outbound. This complexity as layers and subnets add up is why everything is allowed by default.

### NACL in review

- Stateless: INITIATION and RESPONSE seen as different.
- Only impacts data crossing subnet border.
- Can EXPLICITLY ALLOW and DENY.
- IPs/Networks, Ports & Protocols - no logical resources.
- NACLs cannot be assigned to AWS rsources, only subnets.
- Use with SGs to add explicit DENY rules.
- One subnet = one NACL. When you associate your custom NACL, the default is disassociated. The reverse is true if you remove the custom NACL.

## Security Groups

- Not covered yet, but every EC2 instance has one or more Network Interfaces which the IP address is assigned to (not the instance).
- Security groups are boundary for the network. It is explicity assigned to a Network Interface (and thus protects traffic to and from an EC2 instance).
- Security Groups are STATEFUL: TRAFFIC and RESPONSE are seen as the same thing. Response automatically allowed.
- SGs understand AWS logical resources so they're not limited to IP and network.
- SGs can reference other SGs and even themselves.
- Anything not allowed in a SG is implicitly DENY. Everything else is an explicit ALLOW. NACLs are used in conjunction for an explicity DENY.

### SGs vs NACLs

- NACLs are used for any products that don't work with SGs e.g. NAT Gateways.
- NACLs when adding explicity DENY (bad IPs, bad actors).
- SG as the default almost everything.

## Network Address Translation

NAT is the process of giving a private resource outgoing-only access to the Internet.

- A set of processes: remapping SRC and DST IPs.
- When people think of NAT, they generally think of a subset known as dynamic NAT (or IP masquerading).
- Dynamic NAT gives private CIDR range outgoing Internet access.

AWS has two ways to implement NAT.

1. NAT Instance (NAT running on an EC2 instance). To use this, you must disable source/destination checks.
2. NAT Gateway. This is NAT-as-a-Service.

We can provision a NAT Gateway to a public subnet that has a public IP.

The private subnet can have its own route translation table with a default route to the NAT Gateway.

That means, when instances in the private subnet send data to any address that isn't inside the VPC, the default route will be used which goes through the NAT Gateway (when configured).

- NAT Gateways run from a public subnet.
- NAT Gateways use an Elastic IPs (Static IPv4 Public).
- AZ resilient serve (HA in that AZ).
- For region resilience, you need a NAT GW per AZ and a Route Table for each AZ with that NATGW as target.
- Managed service. Scales to 45Gbps.
- Billed for duration & data volume.
- NAT Gateways can only used NACLs.

### What about IPv6?

- NAT isn't required for IPv6.
- All IPv6 addresses in AWS are public routable.
- The IG works with all IPv6 IPs directly.
- NAT Gateways don't work with IPv6.
- `::/0` route pointed to IGW will give that instance bi-directional connectivity.
- `::/0` + Egress-Only Internet Gateway - Outbound Only.
