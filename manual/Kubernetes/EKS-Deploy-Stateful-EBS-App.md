---
name: Deploy Stateful EBS App with EKS
menu: Kubernetes
---

# Deploying a stateful app

## The app

![App layout](https://res.cloudinary.com/gitgoodclub/image/upload/v1548289711/eks-course/Screen_Shot_2019-01-24_at_11.28.22_am.png)

### Frontend

Wordpress with:

- Persistent volume (EBS) to store HTML
- Public facing ELB

### Backend

- Persistent volume (EBS) to store MySQL data

## The EBS Volumes

The EBS volumes are tied to an Availability Zone. Re-created pods can only be started in the AZ of the previous volume.

To properly deploy WordPress, we need a shared volume between all the pods (specific to Wordpress).

We want to deploy our pods in multiple AZ.

Therefore the shared volume MUST BE Amazon EFS (Elastic File System).

For this app, EBS is used to demo how things work for stateful apps that do leverage EBS (like MySQL).

## Creating the Namespace

This is best practice to separate the workloads.

- Separation examples can be project, client, team, environment.
- Namespaces can also give resource quotas, access controls etc.

Let's create our own Wordpress stateful app.

```shell
kubectl create namespace ns-eks-course
```
