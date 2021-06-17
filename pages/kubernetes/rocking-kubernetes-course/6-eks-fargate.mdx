# EKS Fargate

## What is it and why do we need it?

When running a cluster, each of our nodes can be EC2 instances. Because of that, we still have some overhead:

1. AMI Rehydration
2. Patching, Scalaing, Securing
3. Focus on cost optimization

> EC2 for most of the time is under-utilized.

### What is Fargate

As opposed to having nodes, you ONLY deploy pods! There are no overhead of managing EC2s.

1. No worker nodes to manage (still require control plane)
2. Define and deploy your pods on Fargate
3. Possible to mix Fargate and regular EC2 based EKS cluster
4. Horizontal Pod autoscaler possible
5. Pay Control Plane Cost + (pay per pod based on vCPU, memory, time)

```s
$ eksctl create cluster --name fargate-demo --fargate
```

Once deployed, you'll notice that there are no worker nodes deployed.

If you look at the compute tab for EKS, you'll see that there is a Fargate profile with namespace `default` and `kube-system`.

Anything deployed within these namespaces will be deployed as pods without worker nodes. Otherwise, they will run on EC2.

In the example, a standard Nginx app was deployed. Not quite the following, but basically this template:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  # Manages pods with label `app: nginx` and manages replicaset defined within
  labels:
    app: nginx
# Creates a replicaset of 3
spec:
  replicas: 3
  selector:
    # This replicaset will manage pods with label `app: nginx`
    matchLabels:
      app: nginx
  template:
    metadata:
      # Where the label is denoted for the app container
      labels:
        app: nginx
    # Creates a pod with app container nginx:1.14.2
    spec:
      containers:
        - name: nginx
          image: nginx:1.14.2
```

After releasing the deployment (which will apply to the `default` namespace), we can see `kubectl get all` and you see:

1. 3 pods running
2. The deployment
3. The replicaset

> Note: Fargate is part of the serverless system.

## Fargate vs regular EKS

| EKS Worker                                       | EKS Fargate                                               |
| ------------------------------------------------ | --------------------------------------------------------- |
| Control plane runs on EKS                        | Control plane runs on EKS                                 |
| Worker nodes on EC2, user managed                | No worker nodes, less management                          |
| Pods an be exposed using Services (LB) + ingress | Classing and NLBs not supports. Exposed using ingress\*\* |
| Daemonsets supported + heavily used              | Daemonsets not supported. Must run as sidebar.\*\*\*      |
| Able to run stateful apps (EFS)                  | Stateful apps not recommended                             |
| Wide rangs of workload based on EC2 selected     | Can't selected workload specific hardware, no GPU\*       |
| Can work in public + private subnet              | Only works in private subnet                              |
| HostPort or HostNetwork supported for Pods       | Neither supported for pods                                |
| CNI Custom Networking possible                   | CNI Customer Networking not possible                      |
| Cost = Control Plane + Worker EC2 Cost           | Cost = Control Plane + Cost to run Pods                   |

> \*: Max Pod size is 4 vCPU and 30Gb memory per pod.
> \*\*: Pods cannot be exposed with services - only ingress.
> \*\*\*: For every pod, you need to specify another container.

The example cost comparison used:

| EKS Worker                   | EKS Fargate                                                                  |
| ---------------------------- | ---------------------------------------------------------------------------- |
| EKS Cluster + 2 md.large EC2 | Control Plane + 20 pods @ 1vCPU, 2GB each for 10 min every day for the month |
| $211.34/month                | $77.92                                                                       |

For Fargate, costs are separated into vCPU per hour and GB memory per hour.

> Note: you need to terminate pod to remove cost on Fargate for that pod.

Another example: Control Plane + 2 pods @ 1vCPU, 2GB for the entire month = $73 + $58.2 = $131.2.

Note: Fargate is NOT always cheaper.

## Fargate demo

```s
$ eksctl create cluster --name fargate-demo --fargate
# stands up cluster
$ eksctl create fargateprofile --cluster fargate-demo --name frontend-profile --namespace frontend-app
# if you want FE app on Fargate
```

The apps were deployed within frontend namespace.

```s
$ kubectl create ns frontendapp
# Creates frontendapp namespace
$ kubectl appy -f file/to/deployment.yml -n frontendapp
# applies to namespace
$ kubectl get all
# display pods
```

> At the time of the course, you cannot create a LoadBalancer service as of yet for EKS Fargate. It might be worth keeping an eye on the [AWS docs](https://docs.aws.amazon.com/eks/latest/userguide/network-load-balancing.html).

## Lambda vs Fargate

| What is serverless              | What is EKS Fargate                        |
| ------------------------------- | ------------------------------------------ |
| No servers to provision/manage  | Define and deploy pods without worker pods |
| Automatically scales with usage | Works with EKS and ECS                     |
| Never pay for idle              | -                                          |
| Highly available                | -                                          |

| Lambda                                                       | EKS Fargate                                                                      |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| Inherent integration with other AWS Services as event source | No inherent event integration, need to come via ingress                          |
| Lambda can be exposed using multiple options - API, ALB      | Classic + NLBs not supported. Pods can be exposed using Ingress.                 |
| Mature integration for logging, tracing, monitoring          | Daemonset not supported. Must run as sidecar. Work needed for logs, tracing etc. |
| Able to run stateful apps (using EFS)                        | Stateful apps not recommended                                                    |
| Max mem 3GB. CPU, Network allocated proportionally           | Max Pod size 4 vCPU and 30 GB mem per pod                                        |
| Can work in public + private subnet                          | Private subnets only                                                             |
| Max runtime 15 min                                           | No max runtime                                                                   |

> For pricing, Lambda can be significantly cheaper still than EKS based on Fargate. You need to estimate correctly to get the best cost analysis.
