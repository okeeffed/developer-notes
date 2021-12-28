# 19: Hybrid Environments and Migration

## Border Gateway Protocol

It is a routing protocol. Used for how data flows between "point A, B, C to D".

- Made up of a number Autonomous Systems (AS) - Routers controlled by one entity. A network in BGP - seen as a black box abstracted away from the detail.
- `ASN` are unique and allocated by IANA: 0 - 2^16 where 64512 - 65534 are private.
- BGP operates over tcp/179 - it is reliable.
- Not automatic - peering is manually configured.
- BGP is a path-vector protocol. It exchanges the best path to a destination between peers called the AS PATH.
- Focuses on paths, not speed. Makes decision based on network topography.

You may see these terms as well:

- iBGP: Internal BGP - routing WITHIN an AS.
- eBGP: External BGP - routing BETWEEN ASs.

The demo explanations showed Australia routers with a route table that includes the `ASPATH` value for each destination.

Each destination will exchange values with other routers to find the best path for each ASN.

> By default, BGP will always use the shortest `ASPATH`. You can use `ASPATH` prepending to make the slow connections appear longer, and thus use another route.

## AWS Site-to-Site VPN

The quickest way to create a link between an AWS environment and something that is not AWS.

> Know when and where to use a VPN.

- A logical connection between a VPC and on-prem network encrypted using IPSecm running over the public internet (with the exception of running a VPN over direct connect).
- Full HA - if you design and implement it correctly. Partial HA if there is only one CGW meaning HA in AWS only.
- Quick to provision - less than an hour. A lot shorter than physical implementations like DirectConnect.
- Virtual Private Gateway (VGW): logical gateway object that can be the target of route tables. You create and associate it with a single VPC and the target of one or more route tables. Sites in the AWS Public Zone.
- Customer Gateway (CGW): logical configuration or physical device that the logical configuration represents. Sits within the customer premises. This is also possibly the single point of failure for availability.
- VPN Connection: stores configuration links a single VGW and a single CGW.
- Two VPN tunnels are created between the VPN endpoints and endpoint to CGW. A tunnel is an encrypted channel between which data can flow between VPC and on-prem network. As long as one tunnel is active, then the two networks are connected.

There are two types of VPN connects:

1. Static.
2. Dynamic.

### Static vs Dynamic VPN (BGP)

- Dynamic VPC uses BGP. If the customer router does not support BGP, you cannot use dynamic VPN.
- A static VPN uses static routes on the route table. Networks for remote side statically configured on the VPN connection. You are restricted on load-balancing and multi-connection failover.
- If you need advanced HA, multiple connection or DirectConnect, then you need to use dynamic VPNs.
- If you use dynamic VPN, you are creating a relationship between the VGW and customer route as BGP is configured on both using (ASN). Networks are exchanged via BGP. They communicate state of the links between each other.
  - Routes with dynamic VPN can still be added to RT statically or use route propagation to be dynamic and have routes added to RT automatically.

### VPN Consideration

- Speed limitations ~1.25Gbps (on the AWS side). If you need more, then don't use VPNs.
- Latency Considerations: inconsistent, public internet. If latency is a priority, then consider DirectConnect.
- Cost: AWS hourly cost, GB out cost, data cap (for on-prem).
- Speed of setup is quick - hours.
- Can be used as a backup for a physical connection such as DirectConnect.
- Can be used with DirectConnect.

## Direct Connect

Direct Connect is AWS's physical private link connecting your business premises to its public and private services.

- It is a 1Gbps or 10Gbps network port into AWS.
- A port assigned to the user at a DX Location (1000-Base-LX or 10GBASE-LR respectively).
- Both port uses single-mode fibre cables. When you apply, you have a cross-connect that has a cable connected from the AWS DX port connected to your customer router (also located in the same location) and must support VLANS and BGP.
- You can also contact your telco and get a physical cable to your on-prem.
- If you are a small company, you can also have the cable fromthe DX connected to a partner route (if extending to your location).

> Conceptually, you need to think of DirectConnect as a fibre connection from AWS to your on-prem.

You can run VIFs (Virtual Interfaces) over one DX. Each VIF is a VLAN and a BGP connection between your router and the AWS DX router. They come in two types:

1. Public VIF (Public Zone Services).
2. Private VIF (VPC). Each VIF connects to one VPC.

Note: there is one physical cable (no HA) and NO encryption by default.

It can take weeks or months to get the cable installed.

### DX Considerations

- Takes much longer to provision vs VPN.
- DX Port provisioning is quick, the cross-connect takes longer. Extension of cable to prem can take weeks/months.
- Use VPC first, then replace with DX (or leave as backup).
- Faster: 40 Gbps with aggregation (4 10 gigabit ports).
- Low consistent latency, doesn't use business bandwidth.
- DX has no encryption by default. A common workaround is to create the VPN and use the public VIF running on DX. You get the benefits of DX and the encryption of IPSEC.

## Direct Connect Resilience

Understand the weak points of Direct Connect for resilience.

- AWS have multiple Direct Connect (DX) Locations- normally major metro data centers.
- DX locations are connected to AWS region via redundant, high speed connections.
- DX Location has a AWS DX router and Customer (or provider) DX router.
- The cable between the two routers is known as cross-connect.
- A DX is extended from the DX location to a Customer Premises.

What can go wrong? 7 single points to be concerned about:

1. Entire DX connection could fail.
2. AWS DX router could fail.
3. Customer DX router could fail.
4. Cable between AWS DX router and Customer DX router could fail.
5. Cable between DX Location and on-prem could fail.
6. Customer Premises Router could fail.
7. Customer Premises could fail.

DX does not have any resilience by default, but can be made into one.

- Can provision multiple ports. Have multiple AWS DX routers connect to multiple customer DX routers.
- Those Customer DX routers could have multiple connections to on-prem routers.

The architecture above can tolerate a fail of a router on either path or one path.

To improve the two major location points-of-failure left and possibly if the cable path takes the same route.

To prevent this, we need to also use two independent DX Locations, 2 independent customer premises.

For EXTREME levels of resilience, we can have another architecture that basically combines the two.

- Each location has two AWS DX routers connected to two customer routers.

## Transit Gateway

The AWS Transit gateway is a network gateway which can be used to significantly simplify networking between VPC's, VPN and Direct Connect.

It can be used to peer VPCs in the same account, different account, same or different region and supports transitive routing between networks.

- It significantly reduces network complexity.
- Single network object - HA and Scalable.
- Attachments to other network types.

Transit Gateway solves the issue of scaling.

- A Transit Gateway can connect CGWs via a VPN to the Transit Gateway and reduce the number of VPN tunnels.
- VPC attachments are configured with a subnet in each AZ where service is required.
- One single TGW can connect to multiple VPCs and allow them to communicate transitively.
- You can also peer TGWs with other TGWs that are cross-region and even cross-acount.
- You can also connect DX Gateway to Transit Gateway.

### TGW Considerations

- Supports transitive routing.
- Can be used to create global networks.
- Shared between accounts using AWS RAM.
- Can peer TGWs with different regions/accounts.
- Less complexity compared to networking without a TGW.

## Storage Gateway

Storage Gateway is a super flexible hybrid storage appliance (cloud/on-prem).

Its capable of running in 3 modes:

1. FILE Mode: SMB or NFS - behind the scenes backed by S3 Objects.
2. TAPE Gateway (VTL) Mode: Virtual tapes stored on S3 and Glacier.
3. VOLUME Mode (Gateway Stored or Cached) - iSCSI: Imagine EBS but running on-prem.

Storage Gateway can enable the following:

- Extension of File & Volume Storage into AWS.
- Volume storage locally but backups into AWS.
- Tape Backups into AWS.
- Migration of existing infrastructure to AWS.

### File Gateway Mode

On-prem connected via NFS/SMB to other clients on-prem connected to S3 via HTTPS public endpoint.

- Lifecycle Policies an automatically control Storage Classes.
- Think of it as a super-large file storage.
- Great to extend data center or perform migration.

### Tape Gateway Mode

Moving a physical tape infrastructure from the on-prem to a virtual tape backup system on AWS.

- Pretends to be a iSCSI tape library, changer and drive.
- Active tapes are stored in S3, archived/exported tapes are stored in VTS in Glacier.
- Uses public HTTPS endpoint.
- Virtual tape 100GiB -> 5 TiB. 1PB total storage across 1500 virtual tapes.

### Volume Gateway (Stored)

Starts with Storage Gateway on-prem.

- Primary data is stored on-prem.
- Backup data is asynchronously replicated to AWS.
- Volumes are pieces of block storage. Made available via iSCSI for network based servers to access (single connection per volume unless servers are clustered).
- In AWS: 16TB per volume, 32 volumes (MAX), 512TB total capacity. Provides EBS snapshots from backup data. Can be used for creating standard EBS volumes. Ideal for migrations to AWS.

### Volume Gateway (Cached)

Designed for extensions into AWS.

- You still have a local storage gateway connected to local servers.
- The difference is that data added to storage gateway is not stored locally.
- Primary data is stored on a s3-Backed volume (AWS Managed Bucket).
- Snapshots are stored as standard EBS Snapshots.
- Cached storage on-prem for frequently accessed data.

## Snowball / Edge / Snowmobile

- Move large amounts of data IN and OUT of AWS.
- Physical storage is suitcase or truck size.
- Ordered from AWS: empty, load up, return.
- Ordered from AWS with data: empty and return.

### Snowball

- Ordered from AWS: Log a job and device is delivered.
- Anything stored is encrypted with KMS.
- 50TB device or 80TB device.
- 1Gbps (Rj45 1GBase-TX) or 10Gbps (LR/SR) Network.

If amount of data to transfer is 10TB to 10PB, it is economical to use use Snowball (multiple devices).

Multiple devices get the benefit of being delivered to multiple different premises.

Snowball is ONLY storage.

### Snowball Edge

- Both storage AND compute.
- Larger capacity vs Snowball.
- 10Gbps (RJ45), 10/25 (SFP), 45/50/100 Gbps (QSFP+).

Three versions:

1. Storage optimized (with EC2): 80TB, 24 vCPU, 32 Gib RAM, 1TB SSD.
2. Compute optimized (with EC2): 100TB + 7.68NVME, 52 vCPU, 208 Gib RAM.
3. Compute with GPU: Same as (2) + GPU.

Ideal for remote sites or where data processing on ingestion is needed.

### Snowmobile

- Portable data center within a shipping container on a truck.
- This needs to be specially ordered from AWS.
- Ideal for single location when 10PB+ is required.
- Store up to 100PB per snowmobile.
- Not economical for multi-site (unless huge) or sub 10PB. Remember: it is a single truck.

## Directory Service

A directory stores objects (e.g. Users, Groups, Computers, Servers, File Shares) with a structure (domain/tree).

- Multiple trees can be grouped into a forest.
- Commonly used in Windows Environments.
- Sign-in to multiple devices with the same username/password provides centralised managements for assets.
- Microsoft Active Directory Domain Services (AD DS) is a popular implementation.
- Another popular open-source alternative is SAMBA.

The Directory Service is an AWS Managed implementation.

- Runs within a VPC.
- Provides HA deployed into multiple subnets in multipls AZs.
- Some features like Windows EC2 instances can optionally use a Directory.
- Some AWS services NEED a directory e.g. Amazon Workspaces.
- Can be isolated OR integrated with existing on-prem system OR act as a proxy back to on-prem.

### Simple AD Mode

- Open-source directory based on Sambda 4.
- Update to 500 users (small) or 5000 users (large).
- Not designed to integrate with existing on-prem directory systems such as Microsoft AD.

### AWS Managed Microsoft AD

- Designed for on-prem and cloud.
- Primary running location is in AWS. TRUST relationship can be created between AWS and on-prem directory systems.
- Resilient if the VPN fails. Services in AWS will still be able to access the local directory running in Directory Service.
- Needs to run between using private connection.

### AD Connector

- If you need one specific AWS service that requires AD.
- AD Connector points back to on-prem directory services over a private connection.
- AD Connector works as a proxy.
- If the connection fails, AD proxy won't function.

### Picking between modes

- Simple AD is the default. Simple requirements. A directory in AWS.
- Microsoft AD - Apps that needs an actual implementation with MS AD DS or you need to trust AD DS on-prem.
- AD Connector - AWS Services which need a directory without storing directory info in the cloud, this can proxy to on-prem Directory.

## DataSync

Data transfer service TO and FROM AWS.

- Migrations, data processing transfers, archival/cost effective storage or distaster recovery/business continuity planning.
- Design to work at huge scales. Can handle 10Gbps.
- Each job can handle 50mil files.
- Keeps metadata (e.g. permissions/timestamps).
- Built in data validation.

### Key features of DataSync

- Scalable: 10Gbps per agent (~100TB per day).
- Bandwidth limiters (avoid link saturation).
- Incremental and scheduled transfer options.
- Compression and encryption.
- Automatic recovery from transit errors.
- AWS Service Integration - S3, EFS, FSx.
- Pay as you use, per GB cost for data moved.
- DataSync Agent configured locally which communicates with DataSync endpoint over TLS.
- Schedules can be set to ensure the transfer of data occurs during or avoiding specific time periods.
- Customer impact can be minimized by setting a bandwidth limit (in MiB/s).
- Locally transfers using NFS or SMB.

### DataSync Components

- Task: 'job' with DataSync. Defines what is being synced, how quickly, FROM where and TO where.
- Agent: Software used to read or write to on-prem data stores using NFS or SMB.
- Location: Every task has two locations FROM and TO eg. Network File System (NFS), Server Message Block (SMB), Amazon EFS, Amazon FSx and Amazon S3.

Use DataSync when you need to use a network solution, bi-directional and huge scope transfers.

## FSx for Windows Servers

A shared file system product. Supports Windows environments in AWS.

- Fully managed native windows file servers/shares.
- Designed for integration with windows environments.
- Integrates with DS or self-managed AD.
- Single or Multi-AZ within a VPC.
- On-demand and scheduled backups.
- Accessible using VPC, Peering, VPN, Direct Connect.

It is a native windows file system, supports de-duplication (sub file), Distributed File System (DFS), and KMS-at-rest encryption and enforced encryption in-transit.

Shares are accessed via SMB by clients. Also supports volume shadow copies (file level versioning).

Performance can be 8MB/s to 2GB/s, 100k's IOPS, < 1ms latency.

Key words to be on the lookout for:

- VSS: User-Driven Restores.
- Native file system accessible over SMB.
- Windows permission model.
- Supports DFS - scale-out file share structure.
- Managed, no file server admin.
- Integrates with DS and your own directory.

## FSx for Lustre

Design for various High Performance Computing workloads.

- Managed implementation of the Lustre File System for Linux based systems and POSIX-style permissions.
- Machine Learning, Big Data, Financial Modelling.
- 100GB/s throughput & sub millisecond latency.
- Accessible over VPN or Direct Connect from on-prem. You would need pretty substantial bandwidth.
- Can backup to S3 with both types of deployments (manual or automatic 0-35 day retention).

There are two deployment types:

1. Persistent: Longer term storage, HA (in one AZ), self-healing.
2. Scratch: Highly optimised for short term (no replication and fast). Use for pure performance. Fast, no HA. The larger the FS, the more chance of failure.

If you're linking an S3 Bucket to load into the FS, the data is "lazy loaded" into the FS as needed.

You can sync any changes in the FS to S3 using `hsm_archive`.

More notes:

- Metadata stored on Metadata Targets (MDTs)
- Objects are stored on called object storage targets (OSTs)(1.17TiB).
- Size - min 1.2TiB then increments of 2.4TiB.
- For Scratch - Base 200 MB/s per TiB of storage.
- Persistent offers 50 MB/s, 100 MB/s and 200 MB/s per TiB of storage.
- Burst up to 1,300MB/s per TiB (Credit System).

### Performance key points for Lustre

- Writes: Disk throughput and IOPS.
- Reads: Disk throughput and IOPS.
- Reads from cache: Network throughput and IOPS.

All operations happen through an ENI to Lustre File Servers (which themselves are backed by Storage Volumes).
