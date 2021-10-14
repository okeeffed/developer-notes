# Deployment, Provisioning, Automation

## Resources

1. [Course link](https://learn.acloud.guru/course/aws-certified-sysops-admin-associate/overview)

## Understanding EBS Volumes

Storage volumes to attach to EC2 instances.

How can you use them?

- Create a FS.
- Create a file system.
- Run a database.
- Run an Operating System.
- Store data.
- Install apps.

More tidbits:

- Designed for mission critical workloads.
- Highly available. Automatically replicated within a sign availability zone to protect against hardware failures.
- Scalable. Dynamically increase capacity and change the volume type with no downtime or performance impact to live systems.

Availabile types:

- gp2 (General Purpose SSD): 3 IOPS per GiB, max 16k IOPS per volume. Samller than 1TB can burst up to 3k IOPS. Good for boot volumes, dev and test apps that are not latency sensitive.
- io1 (Provisioned IOPS SSD): 65k IOPS per volume. 50 IOPS per GiB. Use if you need more than 16k IOPS. High perf.
- io2 (Provisioned IOPS SSD): Latest version. Higher durability and more IOPS. Same price. 500 IOPS per GiB. Up to 64k IOPS. 5 9s durability, others are 3 9s.
- st1 (Throughput Optimized HDD): Low-cost HDD volume. Baseline throughput of 40MB/s per TB. Burst to 250MB/s per TB. Max throughput of 500MB/s per volume. Cannot boot volume.
- sc1 (Cold HDD): Low-cost HDD volume. Baseline throughput of 12MB/s per TB. Burst to 80MB/s per TB. Max throughput of 250MB/s per volume. Cannot be a boot volume.

> Burst mode is a temporary high-speed data transmission mode used to facilitate sequential data transfer at maximum throughput. Burst mode data transfer rate (DTR) speeds can be approximately two to five times faster than normal transmission protocols. - [techopedia](https://www.techopedia.com/definition/298/burst-mode#:~:text=Burst%20mode%20is%20a%20temporary,faster%20than%20normal%20transmission%20protocols.)

## What is a Bastion Host?

A public facing server that can be used to access the private network of an EC2 instance through SSH or RDP from an untrusted network.

A Bastion has a public IP address. Generally it is security hardened.

It's also known as a jump box.

## When to use Canary Deployments

What is it? A deployment approach to deploy a new version of an application in a controlled way. The "canary" is a reference to the canary in a coal mine that would be the first to know if something is wrong.

It provides an early indication that something is wrong with the application.

Imagine you have 10 web servers behind a ELB. 2 instances contain a new version of an app, the other 8 the original. You can direct a small portion of your customer traffic (say 10%) to the new instances, and the rest to the original.

If any new issues arise, then only 10% will be affected and you can quickly redirect.

## Understanding OpsWorks

A configuration management service allowing you to centrally manage the OS and/or app configurations on EC2 and on-prem systems.

The three offerings:

1. Puppet.
2. Chef.
3. OpsWorks Stacks.

Configuration management helps automate the configuration of your systems using code. It handles:

1. Operating System configuration.
2. Application configuration.
3. Package / software installation.

Already familiar with Chef? Use AWS OpsWorks for Chef Automate.

Already using Puppet? Use AWS OpsWorks for Puppet Enterprise.

### OpsWorks Stacks

Model your app as a stack made up of different layes.

Each layer is configured using Chef recipes.
