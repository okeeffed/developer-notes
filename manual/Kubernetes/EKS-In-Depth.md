---
name: EKS in Depth
menu: Kubernetes
---

# EKS in Depth

This is more of a basic theory section to understand how EKS works.

## Pricing

USD$0.20 per hours for each EKS cluster you make. That's ~USD$144/month.

You pay normally for all the other resources related to running your apps:

- Worker nodes (EC2)
- EBS volumes
- Network traffic
- Load balancers

Check online for if pricing ever changes.

## EKS Control Place

The control plane sets up the cluster to be highly available (in 3 availability zones).

Each AZ will have a master node and etcd that is AWS managed. The workers nodes are what we supply.

Our local `kubectl` will talk directly to EKS.

### Under the hood

![Under the hood](https://res.cloudinary.com/gitgoodclub/image/upload/v1548213794/eks-course/Screen_Shot_2019-01-23_at_2.22.40_pm.png)

- Single tenant (you do not share it with other customers)
- Made of native AWS component (EC2, ELB, ASG, NLB, VPC)

## EKS Networking

![Network](https://res.cloudinary.com/gitgoodclub/image/upload/v1548213958/eks-course/Screen_Shot_2019-01-23_at_2.25.49_pm.png)

Recommended to have:

1. Private subnets: containers all the worker nodes to have application deployed. Must be large CIDR.
2. Public subnets: Will contain any internet-facing load balancer to expose the applications.
3. The VPC must have DNS hostname and DNS resolution support, otherwise nodes can't register.

### Security groups

![Security groups explored](https://res.cloudinary.com/gitgoodclub/image/upload/v1548214249/eks-course/Screen_Shot_2019-01-23_at_2.30.35_pm.png)

You have 2 security groups: `Control Plane` and `Worker Nodes`.

Read up on https://github.com/freach/kubernetes-security-best-practice.

### EKS Pod Networking

- Amazon VPC CNI plugin: each pod receivers 1 IP address (=ENI => Elastic Network Interface) in VPC.
- Pods have the same IP address inside the EKS cluster and outside of it.
- Subnet limitations: CIRD /24 is 254 IP, not enough to run a lot of pods. You'll need a way bigger CIDR. Recommended is a CIDR /18.
- EC2 limitations: limited to amount of ENI/IP addresses it can have. Based on the network types, AWS has documentation on EC2 limits for ENIs, IPv4s and IPv6s.

See https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html for more information on ENI limits.

### Network security with Calico

- Security groups allow all worker nodes to communicate to each other on any ports.
- This may be a problem if you want to segement applications, tenants or environments.
- You can use the Calico project instead of AWS Security Groups in this case.
- Network policies are directly assigned to pods (instead of worker nodes).
- More granular.

### IAM and RBAC Integration

![IAM and RBAC in action](https://res.cloudinary.com/gitgoodclub/image/upload/v1548215421/eks-course/Screen_Shot_2019-01-23_at_2.50.02_pm.png)

Note: RBAC means "Role-Based-Access-Control".

- When you talk to Kubernetes, authentication is held by IAM.
- Authorization is done by Kubernetes RBAC (native auth for K8s).
- Done through collaboration between AWS and Heptio.
- You can assign RBAC directly through IAM entities.
- By default, the role you assign to your K8s cluster has system:master permissions.

### K8s Worker Nodes

![K8s Worker Nodes](https://res.cloudinary.com/gitgoodclub/image/upload/v1548216415/eks-course/Screen_Shot_2019-01-23_at_3.06.44_pm.png)

- When the join the cluster, they are assigned an IAM role and authorized in RBAC to join `system:bootstrappers` and `system: nodes` in your ConfigMap.

You can write your own rules in the ConfigMap.

### EKS Load Balancers

- EKS support `Classic Load Balancer`, `Application Load Balancer` and `Network Load Balancer`.
- Classic and Network Load Balancer is for Service of type `LoadBalancer`.
- Application Load Balancer is for Ingress Controller.

### LoadBalancer

Through the service of type `LoadBalancer`, EKS will create a:

- Classic Load Balancer by default.
- Netword Load Balancer if this is specified: `service.beta.kubernetes.io/aws-load-balancer-type:nlb`.
- There is also support for internal load balancers: `service.beta.kubernetes.io//aws-load-balancer-internal:0.0.0.0/0`.
- You can control the configuration of LBs using annotations in your manifest.
- All documentation for `LoadBalancer` on AWS is diretly on the Kubernetes project.
- ALB Ingress is open source and found on GitHub.
- Supports target group of instance mode (hooked into NodePort).
- Supports target group of IP mode (directly communicating with the pod).
- Supports Application Load Balancer listener rules.
