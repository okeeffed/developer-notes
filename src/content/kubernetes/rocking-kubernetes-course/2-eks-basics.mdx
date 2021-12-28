# EKS Basics

## Resources

1. [For EC2 comparison](https://instances.vantage.sh/)
2. [More comparisons](https://www.parkmycloud.com/blog/ec2-instance-types/)
3. [Comparing T instances](https://www.learnaws.org/2020/12/19/t3-t3a-t4g/)

## Cost of EKS

| Resource      | Cost             |
| ------------- | ---------------- |
| Control plane | USD$73/month     |
| Per node      | Changes per node |

Note: flat rate is even if there are no nodes.

The best way to calculate is to go to the [AWS calculator](https://calculator.aws/).

Example pricing:

| Resources                         | Calc                                             | Numbers             | Total   |
| --------------------------------- | ------------------------------------------------ | ------------------- | ------- |
| EKS with 3 m5.large in us-east-1  | EKS Control Plane + Worker Nodes (m5.large X 3)  | $73 + (3 \* $81.76) | $318.28 |
| EKS with 3 t4g.large in us-east-1 | EKS Control Plane + Worker Nodes (t4g.large X 3) | $73 + (3 \* $58.4)  | $248.2  |

## Ways to spin up a cluster

1. AWS Console
2. CloudFormation
3. AWS CLI
4. AWS CDK
5. eksctl CLI

## eksctl

The best way to learn by getting hands-on quickly.

1. CLI tool for creating clusters with EKS
2. Abstracts lots of stuff - VPC, subnet, sec group etc using CloudFormation

| Command                                                                             | Brief Description                                                  |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `eksctl create cluster`                                                             | Create EKS cluster with one nodeground containing 2 m5.large nodes |
| `eksctl create cluster --name <name> --version 1.15 --node-type t3.micro --nodes 2` | Creates 2 tw.micro nodes with Kubernetes 1.15                      |
| `eksctl create cluster ... --managed`                                               | Created cluster with managed node group                            |
| `eksctl create cluster --fargate`                                                   | Create Cluster with Fargate Profile                                |

### Install + configure

```s
# For Mac
$ brew install eksctl
# ... installs
```

## kubectl

1. CLI for running commands against a cluster on k8s Resources
2. Communicate via cluster API server
3. Works for any k8s cluster - EKS, k8s on EC2, GKE etc.

## Spinning up the first cluster

In the example, the following is run:

```s
$ eksctl create cluster --name eksctl-test --nodegroup-name ng-default --node-type t3.micro --nodes 2
# ... response based on creating the cluster
```

> It will take about 5-10 minutes and creates two CloudFormation templates.

There was an example yaml that `eksctl` can also use:

```yaml
# cluster.yaml
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig

metadata:
  name: basic-cluster
  region: eu-north-1

nodeGroups:
  - name: ng-1
    instanceType: m5.large
    desiredCapacity: 10
    volumeSize: 80
    ssh:
      allow: true # will use ~/.ssh/id_rsa.pub as the default ssh key
  - name: ng-2
    instanceType: m5.xlarge
    desiredCapacity: 2
    volumeSize: 100
    ssh:
      publicKeyPath: ~/.ssh/ec2_id_rsa.pub
```

This can be created using `eksctl create cluster -f cluster.yaml`.

To delete we can run `eksctl delete cluster --name <NAME>`.

## Pod limit in a node

- Max number of allow pods depends on EC2 instance type.
- Bigger the instance, more pods.

You can see a list [here](https://github.com/awslabs/amazon-eks-ami/blob/master/files/eni-max-pods.txt)

By default, you will see that the defaults already have some pods running.

Running `kubectl get pods -n kube-system` would show you the system pods required to run.

In an experiment, there were 10 pods made and noticeably there were no pods running.

## Managed Nodegroups

This is an EKS-exclusive feature.

Say the follow happens:

1. k8 version needs to be updated
2. New security patch
3. EC2 AMI needs to be updated
   - You need to create AMIs (nodes would drain pods and app will be down and you need to orchestrate HA)

Managed nodegroups automate the deployment of updates AMIs with security patches, CVEs.

1. No app downtime
2. No overhead of user management orchestratration
3. Autoscaling group done behind the scenes

### How does it do it?

- Worker Node k8s updated with one click/one API call
- AWS provides AMI with security updates. No patching/rehydrate effort for you.

### Demo

In the example, the following is run:

```s
# 1.14 for used to update
$ eksctl create cluster --name eksctl-test --version 1.14 --nodegroup-name ng-default --node-type t3.micro --nodes 2 --managed
# ... response based on creating the cluster
```

After creating, the cluster control plane version was updated from the EKS dashboard.

After updated, there is a message on the dashboard letting you know that there is a new version for AMI groups.

You can head down and update that from there.

## Helm

Helm solves the problem of multiple manifest files and packaging re-useable sets of charts.

```s
$ helm install x stable/wordpress
# ... installs
```

- Helm is a package manager for k8s
- Packages are called Charts
- Helm Charts help define, install and upgrade complex K8s apps
- Charts can be versioned, shared and published
- Helm charts can accept input params
  - `kubectl` needs template engine to do this
- Popular packages already available

The structure:

```
├── Chart.yaml
├── values.yaml
└── templates/
	├── service.yaml
	└── deployment.yaml
```

| Command                                | Description                            |
| -------------------------------------- | -------------------------------------- |
| `helm search repo <SEARCH>`            | Search local metadata for chart        |
| `helm search hub <SEARCH>`             | Search greater hub for chart           |
| `helm repo add <NAME> <URL>`           | Add a chart to your metadata           |
| `helm pull bitnami/nginx --untar=true` | Pull down nginx server code            |
| `helm install <NAME> bitnami/nginx`    | Install nginx chart under desired name |
