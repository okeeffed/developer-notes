# Elastic Block Store (EBS) and Elastic File System (EFS)

## EBS Overview

Different use cases for different EBS volume type.

- Storage volumes you can attach to your EC2 instances.
- Create a file system, run a database, run an OS, store data, install apps.

EBS is for mission critical applications.

- Production workloads: Designed for mission critical workloads
- Highly available: automatically replicated within a single Availability Zone to protect against hardware failures.
- Scalable: Dynamically increase capacity and chage the volume type with no downtime or performance impact to your live system.

### SSDs

General Purpose SSD (GP2)

- 3 IOPS for GiB, up to to max of 16,000 IOPS per volume.
- gp2 volumes smaller than 1TB can burst up to 3,000 IOPS.
- Good for boot volumes or development and test applications that are not latency sensitive.

General Purpose SSD (GP3)

- Won't be asked to choose between 2 and 3.
- Predictable 3,000 IOPS baseline performance and 125 MiB/s regardless of volume size.
- Ideal for applications that require high performance at a low cost such as MySQL, Cassandra, virtual desktops, Hadoop analytics.
- Can scale up to 16k IOPS and 1000 MiB/s for an additional fee.
- You won't be asked to remember the specific specs in the test.
- Top performance of gp3 is 4 times faster than max throughput of gp2 volumes.

Provisiond IOPS SSD (io1)

- High-perf option, most expensive.
- Up to 64k IOPS per volume, 50 IOPS per GiB.
- Designing for I/O intesive workloads such as databases, latency-sensitive workloads, etc.

Provisiond IOPS SSD (io2)

- Latest generation.
- Higher duratibility and more IOPS. Same price as io1.
- 500 IOPS for GiB. Up to 64k IOPS.
- 5 9's durability.
- Same use case but for apps that need high levels of durability.

### HDDs

Throughput Optimized HDD (st1):

- Low-cost HDD volume.
- Baseline throughput of 40MB/s per TB.
- Ability to burst up to 250MB/s per TB.
- Max throughput of 500MB/s per volume.
- Frequently access, throughput-intensive workloads.
- Cost-effective way to store mountains of data.
- Cannot be a boot volume.

> When hearing throughput, think big data, data warehouses, ETL and log processing.

Cold HDD (SC1)

- Lowest cost volume.
- Baseline of 12MB/s per TB.
- Ability to burst up to 80MB/s per TB.
- Max throughput of 250MB/s per volume.
- Good choice for colder data requiring fewer scans per day.
- Good for applications that need the lowest cost and perf is not a factor. Apps with low close and perf is not a factor, maybe if you wanted static files not served on S3 for whatever reason.
- Cannot be a boot volume.

### IOPS vs Throughput

For IOPS:

- Measures the number or read and write operations per second.
- Important metric for quick transactions, low-latency apps, transactional workloads.
- The ability to action reads and writes very quickly.
- Choose Provisioned IOPS SSD (io1, io2) if using databases. Think transactions, etc.

For Throughput:

- Measures the number of bits read or written per second (MB/s).
- Important metric for large datasets, large I/O sizes, complex queries.
- The ability to deal with large datasets.
- Choose Throughput Optimized HDD (st1) for data warehouses, ETLs, etc.

Tips:

1. Learn the types by heart. It is generally 4 or 5 questions.
2. GP2 SSD: suitable for boot disks and general apps. Up to 16k IOPS per volume. 3 9s durability.
3. GP3 SSD: suitable for high perf apps. Predicatable 3k IOPS baseline and 125 MiB/s regardless of volume size. 3 9s durability.
4. Provisioned IOPS SSD io1: Suitable for OLTP and latency sensitive apps. 50 IOPS per GiB, 64k IOPS per volume. High perf and most expensive. 3 9s durability.
5. Provisioned IOPS SSD io2: Suitable for OLTP and latency sensitive apps. 500 IOPS/GiB, 64k IOPS per volume. Latest gen. 5 9s durability.
6. st1: Throughput optimized. Suitable for big data, data warehouses, ETL. Max throughput 500MB/s per volume. Cannot be a boot vollume. 3 9s durability.
7. Cold HDD: Max 250 MB/s per volume. Less frequentl accessed data. Cannot be a boot volume. Lowest cost.

## Volumes and Snapshots

Volumes exist on EBS. Think of them as a virual hard disk.

**You need a minimum of one volume per EC2 instance** - this is called the **root device volume**.

What are snapshots?

- A snapshot is a copy of a volume. Think of a photograph at a particular time.
- Snapshots exist on S3.
- Snapshots are incremental. Only changes since the last snapshot are moved to S3. This saves on space and time required to make a snapshot.
- The first snapshot may take some time (no previous point-in-time copy).
- You can create images out of a snapshot in another region after it has been copied across.

The three tips:

1. Consistent snapshot: snapshots only capture data written to the EBS volume. Might exclude cached data. For consistency, recommended to stop instance and take a snap.
2. Encrypted snapshots: snapshots on encrypted EBS are encrypted automatically.
3. Sharing snapshots: you can share snapshots but only in the region that they were created. For other regions, you'll need to copy them to the destination region first.

What to know:

1. Location: EBS always be available in the same AZ as EC2.
2. Resizing: can change size of EBS on the fly. You will need to extend the FS in the OS so the OS can see the resized volume.
3. You can change volume types on the fly without stopping and starting the instance.

The tips:

1. Volumes exist on EBS, snapshots exist on S3.
2. Snapshots = point-in-time photographs of volumes and incremental in nature.
3. First snashot takes time. For consistency, stop the instance and detach volume.
4. You can share snaps between AWS accounts as well as regions. First you need to copy snapshot to the target region.
5. You can resize EBS volumes on the fly as wekl as changing the volume types.

## EBS Encyption

Encrypts volume with a data key using the industry-standard AES-256 algorithm.

Encryption uses AWS KMS customer master keys (CMK) when creating encrypted volumes and snapshots.

What happens when you encrypt a volume?

- Data at rest is encrypted inside the volume.
- All data in flight moving between the instance and volume is encrypted.
- All snapshots are encrypted.
- All volumes created from snapshots are encrypted.

Things to know about the encryption:

1. Encrypted and decryption are handled transparently without user intervention.
2. Encryption has minimal latency.
3. Copying an unencrypted snapshot allows encryption.
4. Snaphots of encrypted volumes are automatically encrypted.
5. Root device volumes can be encrypted on encryption.

The 4 steps to encrypt and unencrypt a volume.

- Create snapshot of the unencrypted root device volume.
- Create a copy of the snapshots and select the encrypt option.
- Create an AMI from the encrypted snapshot.
- Use that AMI to create new encrypted instances.

## EC2 Hibernation

If we stop an EC2 instance, the data is kept on disk (with EBS) and will remain until the instance is started.

If the instance is terminated, then by default the root device volume will also be terminated.

What happens with hiberation?

- The OS is told to perform hibernation (suspend-to-disk).
- Hibernation saves the contents from the instance memory (RAM) to EBS root volume.
- We persist the instance's Amazon EBS root volume and any attached amazon EBS data volumes.

When you start your instance out of hibernation:

- The Amazon EBS root volume is restored to its previous state.
- The RAM contents are reloaded.
- The processes that were previously running on the instance are resumed.
- Previously attached data volumes are reattached and the instance retains its instance ID.

> Think of dehydration/hydration occuring with preserving the in-memory RAM for an instance.

Things to know about it:

1. EBS hiberation preserves in-memory RAM to EBS.
2. Much faster to boot up since you do not need to reload the OS.
3. Instance RAM must be less than 150GB.
4. Instace families include C3, C4, C5, M3, M4, M5 and R3, R4, R5.
5. Available for Windows, Amazon Linux 2 AMI and Ubuntu.
6. Instances can't be hibernated for more than 60 days.
7. Available for on-demand instances and reserved instances.

## EFS Overview

- A managed network file system (NFS) that can be mounted on many EC2 instances. Great for web server farms, content management systems, shared database management systems.
- Works with EC2 instances in multiple AZs.
- Highly available, scalable BUT expensive.
- It uses the `NFSv4` protocol.
- Compatible with Linux-based AMI.
- Encryption at rest using KMS.
- FS scales automatically, no capacity planning required.
- Pay per use.

## EFS Performance

- 1000s of concurrent connections.
- 10 Gbps throughput.
- Scales to Petabytes.

You can set performance characteristics that you want when creating:

1. General purpose: web servers, CMS, etc.
2. Max I/O: big data, media processing, etc.

### Storage tiers

- You can use lifecycle management.
- Standard storage tier and infrequently accessed storage tier.

## FSx

### FSx for Windows

A fully managed Windows file system so that you can easily move your Windows-based apps that require file storage to AWS.

FSx for Windows:

- Managed Windows Serer that runs Windows Server Message Block (SMB)-based files services.
- Design for Windows and Windows apps.
- Support AD users, access control lists, groups, security policies, along with Distributed File System (DFS) namespaces and replication.

EFS:

- A managed NAS filer for EC2 instances based on Network File System (NFS) version 4.
- One of the first network file sharing protocols native to Unix and Linux.

> Scenario-based question about migrating share point or active directory onto shared storage, think FSx.

### Amazon FSx for Lustre

Fully managed FS optimized for compute-intensive workloads.

- High-performance computing (HPC) workloads.
- Machine Learning.
- Media Data Processing Workflows.
- Electronic Design Automation.

> Basically anything to do with AI or Machine Learning.

Any scenario-based question about processing massive datasets or 100s of Gigabypes per second of throughput or millions of IOPS or sub-millisecond latencies, think FSx for Lustre.

### EFS vs FSx

- EFS: When you need distributed, highly resilient storage for Linux instances and Linux-based apps.
- FSx for Windows: Centralized storage for Windows-based apps, such as SharePoint, Microsoft SQL Server, Workspaces, IIS Web Server, or any other native Microsoft application.
- FSx for Lustre: When you need high-speed high-capacity distributed storage. This will be for appls that do high perf computing (HPS), financial modelling etc. Remember that FSx for Lustre can store data directly onto S3.

## Amazon Machine Instances

What is an AMI? An AMI provides the information required to launch an instance.

**It must be specified when launching an instance.**

AMI can be based on:

1. Region
2. Operating System
3. Architecture (32 bit vs 64 bit)
4. Launch permissions
5. Storage for the root device (root device volume)

All AMIs are either backed by Amazon EBS or instance store (from a template stored in S3).

### Instance store volumes

Instance store volumes are sometimes called ephemeral storage. Instance store volumes cannot be stopped. If the underlying host fails, you will lose your data. Although, you can reboot an instance without losing data.

If you terminate the instance, you will lose the instance store volume. You CANNOT stop an instance store, only terminate.

### EBS volumes

EBS-backed instances can be stopped. You will not lose the data on this instance if it is stopped. You will not lose the data on this instance if it is stopped. You can also reboot an EBS volume and not lose your data.

By default, the root device volume will be delete on termination. However, you can tell AWS to keep the root device volume with EBS volumes.

> If you need ephemeral storage, think instance store volumes. If you need persistent storage, think EBS volumes.

The exam tips:

1. Instance store volumes are sometimes call ephemeral storage.
2. Instance store volumes cannot be stopped. If the host fails, you will lose your data.
3. EBS-back instances can be stopped. You will not lose the data on the instance if it is stopped.
4. You can reboot both EBS and instance store volumes and you will not lose your data.
5. By default, both root volumes will be deleted on termination. However, with EBS volumes, you can tell AWS to keep the root device volume.

## AWS Backup

A way to backup different AWS services. It consolidates backups across multiple AWS services.

You can also use this with organizations.

- Backup can be used with AWS Organizations to back up multuple AWS accounts in your organization.

Benefits of AWS Backup:

1. Central management: use a single, central backup console, allowing you to centralize backups across AWS services and multiple AWS accounts.
2. Automation: creating automated schedules and retention policies. You can also create lifecycle policies, allowing you to expire unnecessary backups after a period of time.
3. Improved Compliance: backup policies can be enforced while backups can be encrypted both at rest and in transit, allowing alignment to regulatory compliance. Auditing is made easy due to a consolidated view of backups across many AWS services.
