# 9: EC2 Basics

## Virtualization 101

EC2 is "Virtualization as a service".

Virtualization enables the ability to run multiple operating systems on the same physical machine.

### Emulated Virtualization

Virtualization OSs run on top of host OS/hypervisor. The combination of the OS and apps are known as Virtual Machines.

The hypervisor runs binary translation to ensure virtual machines didn't clash, but this came with a performance penalty.

The software running on the hypervisor run in priviledged mode.

Virtual machines also had virtual resources allocated to them and physical devices mapped to them.

The guest OS would still think they're running in priviledged mode, so they needed a special arrangement to ensure it didn't crash. The hypervisor fixed this by running a process know as binary translation. It is really, really slow.

### Para-virtualization

The guest OSs are still running with allocated resources, but instead of the slow binary translation used by the hypervisor, another approach is used.

This only works on a small subset of OSs - OSs which can be modified. There are areas of the guest OSs that attempt to make priviledged calls where the calls are modified. Instead of calling directly to the hardware, they make calls to the hypervisor called "hyper calls".

The source code of the guest OS is modified for the particular called and for the particular vendor (hypervisor) performing the virtualization.

This massively improved performance, but still required software.

### Hardware Assisted Virtualization

This is where the hardware is virtualization aware. For example, the CPU contains specific instructions and capabilities so that the hypervisor can directly control and configure support. The CPU knows that virtualization exists.

The instructions from the OS are redirected to the hypervisor by the hardware and the hypervisor directs how these operations run. This improves performance again.

Because there is still shared devices like a network card, there can still be performance degradation from the software.

### SR-IOV

Single Root IO Virtualization. This is a very complex and feature-rich set of standards.

It allows any connected device to be presented to the guest OS as if each have their own card. In EC2, this is "enhanced networking".

AWS have their own network stack known as "Nitro" which will be presented later.

## EC2 Architecture and Resilience

- EC2 Instances are virtual machines (OS + resources).
- EC2 Instances run on EC2 Hosts.
- Shared Hosts or Dedicated Hosts.
- Hosts = 1 AZ - AZ Fails, Host Fails, Instances Fail.

A primary ENI is provised within a subnet which maps to the data network on the host.

EC2 host can connect to EBS. This service also runs within a specific AZ.

Instances stays on host unless:

1. Stopped and then started (not restarting).
2. AWS is doing some maintenance.

What is EC2 good for?

- Traditional OS + Application Compute need.
- Long-Running Compute.
- Server style applications... Either burst or steady-state load.
- Monolithic application stacks.
- Migrated application workloads or Disaster Recovery.

## EC2 Instance Types

Choosing an EC2 instance type is done to influence a few things:

1. Raw CPU, Memory, Local Storage Capacity & Type.
2. Resource ratios.
3. Storage and Data Network Bandwidth.
4. System Architecture / Vendor.
5. Additional Features and Capabilities.

### The five main categories

1. General Purpose - Default: diverse workloads, equal resource ratios.
2. Compute Optimized - Media Processing, HPC, Scientific Modelling, gaming, Machine Learning.
3. Memory Optimized - Processing large in-memory datasets, some database workloads.
4. Accelerated Computing - Hardware GPU, field programmable gate arrays (FPGAs). Very niche, but you'll know when you need them.
5. Storage Optimized - large amounts of super-fast local storage. Sequential and Random IO - scale-out transactional databases, data warehousing, Elasticsearch, analytics workloads.

### Decoding EC2 types

For example, `R5dn.8xlarge`. The full name is named the instance type.

- The first letter is the **Instance Family**.
- The second number is the **Instance Generation**.
- On the other side, we have the **Instance Size** ie `8xlarge`. The is a logical and often linear relationship for the sizes.
- Additional letters refer to **Additional Capabilities** ie `dn`.

Some resources:

1. https://aws.amazon.com/ec2/instance-types/
2. https://ec2instances.info/

## Storage Refresher

## EBS Service Architecture

## EBS Volume Types - General Purpose

## EBS Volume Types - Provisioned IOPS

## EBS Volume Types - HDD Based

## Instance Stores Volumes

## Choosing between Instance Store and EBS

## Snapshots, Restore and Fast Snapshot Restore

## EBS, Snapshots and Instance Store Volumes

## Network Interfaces, Instance IPs and DNS

## Amazon Machine Images (AMI)

## Instance Billing Models

## Instance Status Checks & Auto Recovery
