# 7: Virtual Private Cloud

One of the more difficult sections.

What is a VPC? Think of it as a virtual data center in the cloud.

- Logically isolated part of AWS Cloud where you can define your own network.
- Complete control of virtual network, including your own IP address range, subnets, route tables and network gateways.

A fully customizable network.

- You can leverage multiple layers of security, including security groups and network ACLs to help control access to EC2 instances within each subnet.

Example: If you have a three-tier application:

- Web client tier: public facing subnet.
- Business application tier : private subnet. Can only speak to web tier and DB tier.
- Database (data tier): private subnet. Can only speak to app tier.

Additionally, you can create a `hardware VPN` connection between your corporate data center and your VPC and leverage the AWS Cloud as an extension of your corporate data center.

A cool website to help with visualizing Cross Inter-Domain Routing blocks can be found [here](https://cidr.xyz/).

In this section we are working with `10.0.0.0/16` which gives 2^16 = 65536 IP addresses.

- Smallest you can have with AWS is `/28` = 16 addresses. Amazon do reserve some addresses for themselves.
- Largest you can have is `/16` = 65,536 addresses.

### Typical Network diagram.

- Top-block: Region (us-east-1)
- Middle-block: VPC (10.0.0.0/16)
- Within, we will have a public subnet (10.0.1.0/24) that will have an instance and a security group.
- That public subnet will have a internet gateway that talks to a router that connects to a route table that connects to the network access control list and then to the public subnet for the website.
- We will also have a backend on a similar setup but with a private subnet (10.0.2.0/24).
- To connect to our instance on the private subnet, we could connect to the router through the `Virtual Private Gateway`.

> The VPC provisions the route table, network ACL and security group.

What can we do with out VPCs?

- Launch instances into a subnet of our choosing.
- Assign custom IP address ranges in each subnet.
- Configure route tables between subnets.
- Create internet gateway and attach it to our VPC.
- VPC gives us much better security control over AWS resources.
- Subnet network access control lists.
- Bonus tip: you can use Network Access Control Lists (NACLs) to block specific IP addresses.

### Default VPC vs Custom VPC

Default:

- Default VPC is user friendly
- All subnets in default VPC have a route out to the Internet.
- Each EC2 instance has both a public and private IP address.

Custom:

- Fully customizable.
- Takes time to setup.

VPC exam tips:

- Think of VPC = logical data center in AWS.
- Consists of IGs or VPGs (virtual private gateways), route tables, NACLs and SGs.
- 1 subnet is always in 1 AZ.

> You should be able create a VPC from memory before going into an exam.

Things to note from the demo:

- One subnet can only be associated with one AZ.
- When creating a network, note that AWS reserves the first 4 IP addresses and the final address. First is for the network address, the following three are for AWS and the 255 which is the broadcast address (cannot be used in VPC).

From the second part of the demo:

- For the public subnet, we updated the public IPv4 settings to auto-assign.
- An internet gateway was created and then attached to the VPC. You can only have one IG per VPC.
- To route out to the Internet, you need to create a new route table and attach it to your VPC.
- In the new route table, you need to edit and add a new route `0.0.0.0/0` and target the Internet Gateway.
- Then you need to `edit subnet associations` and attach the subnet we have made for our public subnet.
- Finally, we create two different EC2 instances (one for the public subnet and one for the private).

After the EC2 instance was created, another security group was created for the private Node that allowed access for ping, SSH (not normally what you want), HTTP and the Aurora port from the public subnet addresses `10.0.1.0/24`.

The SSH jump was done by copying across the key into a file on the web server and then using `ssh` to jump across to the private IP.

Finally, the `yum update` on the private fails as there is no connection out to the Internet. The next section will address that.

## Using NAT Gateways for Internet Access

You can use NAT gateways to connect to the Internet while preventing the internet from initiating a connection with those instances.

The NAT gateway is provisioned within the public subnet. It operates as a mentions for the private subnet instance to connect out to the internet through the Network ACL, route table and finally the IG.

Five facts to know about NAT gateways:

1. Redundant inside the AZ.
2. Starts at 5 Gbps and scales currently to 45 Gbps.
3. No need to patch.
4. Not associated with security groups.
5. Automatically assigned a public IP address.

In the demo, you create a NAT gateway (under VPC) and then attach it to the public subnet.

After you provision the NAT gateway, you need to edit the main route table to have a target of the NAT gateway on port `0.0.0.0/0`.

## Protecting Your Resources With Security Groups

- Computers communicate over specific protocols.
- Security groups are essentially the last line of defence.
- In general, the things that will cause issues are the route table, network acl and then security group.
- Security groups are essentially virtual firewalls. By default, everything is blocked.
- Security groups are stateful. If you send a request from your instance, the response traffic for that request is allowed to flow in regardless of inbound security group rules.

## Controlling Subnet Traffic With Network ACLs

- The first line of defence.
- An optional layer of security for your VPC that acts as a firewall for controlling traffic in and out of one or more subnets.
- You might set up network ACLs with rules similar to your security groups in order to add another layer of security to your VPC.

Overview of ACLs:

- Default network ACLs: VPC automatically comes with a default NACL, and by default it allows all outbound and inbound traffic.
- Custom NACLs: By default, each custom NACL denies all inbound and outbound traffic until you add rules.
- Subnet Associations: Each subnet in your VPC must be associated with a network ACL. If you don't explicitly associate a subnet with a network ACL, the subnet is automatically associated with the default network ACL.
- Block IP aaddress: Can be done with NACLs, not SGs.
- You can associate a NACL with multiple subnets, however a subnet can only be associated with 1 NACL (many-to-one relationship). Previous associations are removed when you associate a new NACL.
- NACLs contain a numbered list of rules that are evaluated in order, starting with the lowest numbered rule.
- NACLs have separate inbound and outbound rules. Each rule can allow or deny traffic.
- NACLs are stateless. Responses to allowed inbound traffic are subject to rules for outbound traffic (and vice versa).

In the demo:

- NACLs are located in the sidebar under `Security`.
- New NACL is created. The new one denies everything by default.
- A new subnet association was made with the public subnet. At this stage, the web server would be denied.
- Rule number should be incremenets of 100.
- A new inbound rule was made for port 80 and 22.
- The same was done for outbound (80 and 22) as well as our ephemeral port range (1024-65535). To see more about ephemeral ports, check the AWS docs.
- Since rules are chronological, if ALLOW is enabled before DENY, then it will still be allowed.

## Private Communication Using VPC Endpoints

Allows you to privately connect to VPC to supports services and VPC endpoint services powered by `PrivateLink` without requiring an internet gateway, NAT device, VPN connection or AWS Dirct Connect connection.

Instances within your VPC do not require public IP addresses to communicate with resources in the service. Traffic does not leave the Amazon network.

> Link NAT gateways but to communicate to other AWS services.

**Study tip: Endpoints are virtual devices.**

They are horizontally scaled, redundant, and highly available VPC components that allow comms between instances in your VPC and services wtihout imposing availability risks or bandwidth constraints on your network traffic.

There are two different types:

1. Interface endpoints: elastic network interface with a private IP address that serves as an entry point for traffic headed to a support service. Supports large number of services.
2. Gateway endpoints: similar to NAT gateways. A Gateway endpoint is a virtual device you provision. Supports connection S3 and DynamoDB.

So in the example, if we want our database to connect to S3 without leaving AWS, we provision a VPC endpoint.

- A new role is added to the EC2 instance on the data layer that assigns a role that allows for S3 access.
- Under the VPC, we provision a new VPC endpoint. The is an option for both a gateway and an interface. We selected a gateway here as S3 is supported.
- We then associate the VPC endpoint with the VPC.
- We then select the private route table.
- After completion, we can now access the S3 actions on the aws command line after SSH'ing into the private EC2 instance.

> Note: provisioning the VPC endpoint was much faster than the NAT Gateway.

## Network Privacy With AWS PrivateLink

You can open up your services in a VPC to another VPC.

This can be done either through the internet or VPC peering. There are different security considerations with this.

VPC Peering:

- You will have to create an manage manay different peering relationships.
- The whole network will be accessible. This won't be great if there are multiple applications within the VPC.

Using PrivateLink:

- The best way to expose a service VPC to 10s, 100s, 1000s of customer VPCs.
- Doesn't require VPC peering: no route tables, NAT gateways, IGs, etc.
- Requires a Network Load Balancer on the service VPC and a ENI on the customer VPC.

## Building Solutions across VPCs with Peering

Why multiple VPCs?

- May be needed for different environments: production web VPC, content VPC, Intranet VPC.
- Peering allows you to connect two VPCs together via a direct network using private IP addresses.
- Instances behave as if they were on the same private network.
- You can peers VPCs with other AWS accounts (as well as the same account).
- Peering is a start configuration (e.g. 1 central VPC peers with 4 others). No transitive peering.
- You can peer between regions.

In the demo, this can be done on the console under VPC and Peer Connections.

After creation, if is pending acceptance. Once done, you can connect between the two.

## Securing Your Network with VPN CloudHub

If you have multiple sites, each with its own VPC connection, you can use AWS VPN CloudHub to connect those sites together.

- Hub-and-spike model (similar to VPC peering).
- Low cost and easy to manage.
- Operates over the public Internet, but all traffic between the custom gateway and the AWS VPN CloudHub is encrypted.

## Connecting On-Premise With AWS Direct Connect

Makes it easier to establish a dedicated network connection from your premises to AWS.

You can establish private connectivity between AWS and your data center or office.

In many cases, you can reduce your network costs, increase bandwidth throughput and provide a more consistent network experience than internet-based connections.

Two different types:

1. Dedicated connection: A physical Ethernet connection associated with a single customer. You can request this through the conosle, CLI or API.
2. Hosted connection: Still a physical connection, but provisioned by an AWS Direct Connect Partner.

### VPNs vs Direct Connect

VPNs allow private connection, but it still traverses the public internet to get the data delivered. While secure, it can be painfully slow.

Direct connect is fast, secure, reliable and able to take massive throughput.

You can also run a VPN over a direct connect connection.

Exam tips:

- Direct Connect directly connects your data center to AWS.
- Useful for high-throughput workloads (e.g. lots of network traffic).
- Helpfuil when you need a stable and reliable secure connection.

## Simplifying Networks with AWS Transit Gateway

Transit Gateway connects VPCs and on-premises networks through a central hub.

This simplifies the network and puts an end to complex peering relationships.

It acts as a cloud router - each new connection is only made once.

- Allows you to have transitive peering between 1000s of VPCs and on-premises data centers.
- Works on a hub-and-spoke model.
- Works on a regional basis, but you can have it across multiple regions.
- Can use across multiple AWS accounts using RAM (Resource Access Manager).

The tips:

- You can use route tables to limit how VPCs talk to each other.
- Works with Direct Connect as well as VPN connections.
- Supports IP multicast (not supported by any other AWS service).

Simplifying network topology = AWS Transit Gateway.
