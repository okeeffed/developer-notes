---
name: EKSCtl
menu: Kubernetes
---

# EKSCtl

https://eksctl.io/

## tl;dr

### Clusters

| Action           | Command                                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------------------- |
| Get cluster      | `eksctl get cluster [--name=<name>] [--region=<region>]`                                              |
| Create cluster   | `eksctl create cluster --name=cluster-1 --nodes=4`                                                    |
| Write kubeconfig | `eksctl utils write-kubeconfig --name=<name> [--kubeconfig=<path>] [--set-kubeconfig-context=<bool>]` |
| Delete cluster   | `eksctl delete cluster --name=<name> [--region=<region>]`                                             |

### Node Groups

| Action             | Command                                                                                         |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| Get nodegroup      | `eksctl get nodegroup --cluster=<clusterName> [--name=<nodegroupName>]`                         |
| Create nodegroup   | `eksctl create nodegroup --cluster=<clusterName> [--name=<nodegroupName>]`                      |
| Scale nodegroup    | `eksctl scale nodegroup --cluster=cluster-1 --nodes=5 ng-a345f4e1`                              |
| Delete nodegroup   | `eksctl delete nodegroup --cluster=<clusterName> --nodes=<desiredCount> --name=<nodegroupName>` |
| SSH Access Flag    | `--ssh-access`                                                                                  |
| Full ECR Access    | `--full-ecr-access`                                                                             |
| Enable autoscaling | `--asg-access`                                                                                  |

Once clsuter is running, you'll need to add the autoscaler yourself. See https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/cloudprovider/aws/README.md.

### Creating a cluster using a config file instead of flags

You can create a cluster using a config file instead of flags.

First, create cluster.yaml file:

```yaml
apiVersion: eksctl.io/v1alpha3
kind: ClusterConfig

metadata:
  name: basic-cluster
  region: eu-north-1

nodeGroups:
  - name: ng-1
    instanceType: m5.large
    desiredCapacity: 10
```

Next, run this command:

```shell
eksctl create cluster -f cluster.yaml
```

This will create a cluster as described.

If you needed to use an existing VPC, you can use a config file like this:

```yaml
apiVersion: eksctl.io/v1alpha3
kind: ClusterConfig

metadata:
  name: cluster-in-existing-vpc
  region: eu-north-1

vpc:
  subnets:
    private:
      eu-north-1a: {id: subnet-0ff156e0c4a6d300c}
      eu-north-1b: {id: subnet-0549cdab573695c03}
      eu-north-1c: {id: subnet-0426fb4a607393184}

nodeGroups:
  - name: ng-1-workers
    labels: {role: workers}
    instanceType: m5.xlarge
    desiredCapacity: 10
    privateNetworking: true
  - name: ng-2-builders
    labels: {role: builders}
    instanceType: m5.2xlarge
    desiredCapacity: 2
    privateNetworking: true
    iam:
      withAddonPolicies:
        imageBuilder: true
```

See ![examples/](https://github.com/weaveworks/eksctl/tree/master/examples) directory for more sample config files.

## Usage

To download the latest release, run:

```shell
curl --silent --location "https://github.com/weaveworks/eksctl/releases/download/latest_release/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin
```

Alternatively, macOS users can use Homebrew:

```shell
brew install weaveworks/tap/eksctl
```

You will need to have AWS API credentials configured. What works for AWS CLI or any other tools (kops, Terraform etc), should be sufficient. You can use `~/.aws/credentials` file or environment variables. For more information read AWS documentation.

To create a basic cluster, run:

```shell
eksctl create cluster
```

A cluster will be created with default parameters:

- Exciting auto-generated name, e.g. "fabulous-mushroom-1527688624"
- 2x m5.large nodes (this instance type suits most common use-cases, and is good value for money)
- Use official AWS EKS AMI
- `us-west-2` region
- Dedicated VPC (check your quotas)
- Using static AMI resolver

### Example output

```shell
$ eksctl create cluster
[ℹ]  using region us-west-2
[ℹ]  setting availability zones to [us-west-2c us-west-2a us-west-2b]
[ℹ]  subnets for us-west-2c - public:192.168.0.0/19 private:192.168.96.0/19
[ℹ]  subnets for us-west-2a - public:192.168.32.0/19 private:192.168.128.0/19
[ℹ]  subnets for us-west-2b - public:192.168.64.0/19 private:192.168.160.0/19
[ℹ]  using "ami-0ce0ec06e682ee10e" for nodes
[ℹ]  creating EKS cluster "floral-unicorn-1540567338" in "us-west-2" region
[ℹ]  will create 2 separate CloudFormation stacks for cluster itself and the initial nodegroup
[ℹ]  if you encounter any issues, check CloudFormation console or try 'eksctl utils describe-stacks --region=us-west-2 --name=floral-unicorn-1540567338'
[ℹ]  creating cluster stack "eksctl-floral-unicorn-1540567338-cluster"
[ℹ]  creating nodegroup stack "eksctl-floral-unicorn-1540567338-nodegroup-ng-39d54824"
[✔]  all EKS cluster resource for "floral-unicorn-1540567338" had been created
[✔]  saved kubeconfig as "~/.kube/config"
[ℹ]  nodegroup "ng-39d54824" has 0 nodes
[ℹ]  waiting for at least 2 nodes to become ready
[ℹ]  nodegroup "ng-39d54824" has 2 nodes
[ℹ]  node "ip-192-168-71-20.us-west-2.compute.internal" is ready
[ℹ]  node "ip-192-168-25-215.us-west-2.compute.internal" is ready
[ℹ]  kubectl command should work with "~/.kube/config", try 'kubectl get nodes'
[✔]  EKS cluster "floral-unicorn-1540567338" in "us-west-2" region is ready
$
```
