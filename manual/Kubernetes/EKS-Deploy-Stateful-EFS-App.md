---
name: Deploy Stateful EFS App with EKS
menu: Kubernetes
---

# Deploy Stateful EFS App with EKS

## What is EFS?

- Managed NFS that can be mounted on many EC2.
- EFS works with EC2 instances in multi-AZ.
- Highly available, scalable, expensive (3xgp2), pay per use.

![Under the hood](https://res.cloudinary.com/gitgoodclub/image/upload/v1548299128/eks-course/Screen_Shot_2019-01-24_at_2.05.15_pm.png)

## EFS for Kubernetes

Using EFS, our Wordpress Pods can now be launched into any AZ, and therefore on any K8s worker nodes.

They will all access the same underlying HTML folder (therefore sharing state).

## Enabling EFS

Heading to the AWS console. Head to the EFS page and create EFS. By default, it will try attach it to whateever VPC is available.

**Ensure that you attach the correct node worker security groups that we are using for Kubernetes and not the default.**
