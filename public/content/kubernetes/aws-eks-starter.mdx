---
name: AWS EKS Starter
menu: Kubernetes
---

# AWS EKS Starter

- [AWS EKS Starter](#aws-eks-starter)
  - [EKS Setup Process](#eks-setup-process)
    - [EKS Use cases](#eks-use-cases)
    - [The Course](#the-course)
    - [EKS Architecture](#eks-architecture)
    - [Basic EKS Setup](#basic-eks-setup)
  - [Setup for the EKS cluster](#setup-for-the-eks-cluster)
  - [IAM User roles](#iam-user-roles)
      - [IAM user and permissions](#iam-user-and-permissions)
    - [Create IAM role](#create-iam-role)
    - [Create keypair](#create-keypair)
    - [Create API Access key/-secret](#create-api-access-key-secret)
  - [Create base AWS infrastructure](#create-base-aws-infrastructure)
    - [Create VPC, subnets and security group for your K8s cluster](#create-vpc-subnets-and-security-group-for-your-k8s-cluster)
      - [Working on the console](#working-on-the-console)
      - [Setting stack name](#setting-stack-name)
      - [Continuing on](#continuing-on)
  - [Creating the EKS control plane](#creating-the-eks-control-plane)
    - [Via CLI](#via-cli)
    - [Via GUI](#via-gui)
  - [Setting up local kubectl for EKS](#setting-up-local-kubectl-for-eks)
    - [Recap on the kubectl setup](#recap-on-the-kubectl-setup)
    - [Install kubectl & aws-iam_authenticator](#install-kubectl--aws-iamauthenticator)
    - [Configure _kubectl_](#configure-kubectl)

## EKS Setup Process

EKS will setup and manage our Kubernetes clusters:

- This will create K8s master in high availability
- Etcd in high availability
- IAM plugin setup
- CA setup (for TLS)
- Auto scaling done
- Load Balancers done (NLB and ELB)

In short, you will get an EKS control plane and you'll just need to setup the worker nodes in the availability zones.

The from the laptop, you can use kubectl to talk to AWS.

There is also deep integration with AWS:

- API calls can be audited in CloudTrail
- Authetication through IAM while authorization through RBAC.
- CloudFormation to manage clusteres
- Customize AMI
- Load Balancers, EBS Volumes, EFS, etc...
- Container registies on ECR
- Networking is handled with a per-pod IP address with attached ENI

### EKS Use cases

- Can create a cluster easily
- Microservices in containers
- Paas/Website
- Migrate from on-prem to cloud
- ML cluster (support for GPU instances)

### The Course

- Deploy EKS cluster using CF
- Scale Kubernetes cluster
- Setup `kubectl` properly
- Learn how EKS works under the hood
- Setup admin using Kubernetes dashboard
- Deploy stateless app on EKS and expose it with public ELB
- Deploy stateful app on EKS and bind it with EBS volumes
- Deploy stateful app (like WordPress) with EFS
- Manage Kubernetes cluster using AWS CLI and `eksctl` CLI

### EKS Architecture

- 3 AZs
- Master node in each
- Etcd in each
- K8s worker nodes

![EKS Architecture](https://res.cloudinary.com/gitgoodclub/image/upload/v1548135634/eks-course/Screen_Shot_2019-01-22_at_4.39.24_pm.png)

EKS itself will manage all the load and master nodes and etcd as needed.

### Basic EKS Setup

![Basic setup](https://res.cloudinary.com/gitgoodclub/image/upload/v1548135634/eks-course/Screen_Shot_2019-01-22_at_4.39.24_pm.png)

## Setup for the EKS cluster

## IAM User roles

#### IAM user and permissions

To be able to run through this course your IAM user needs to have certain privileges to e.g. create all the required resources and objects. According AWS Best Practices you should _never_ use your root account for working with AWS services. E.g. to demonstrate the Hands-On lectures, the user _eks-course_ has been used.

There are 2 attempts to follow:

1. Provide admin access
   login with an admin of your AWS account
   go to "IAM" => "users" => click on your user => "Permissions" => "Add permission" => then search for _AdministratorAccess_ and attach this policy
   Basically your user just requires _one_ policy being attached

- AdministratorAccess

2. Provide a dedicated list of privileges/policies
   to cover all the required privileges, first you have to create additional policies
   EKS-Admin-policy:

```javascript
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["eks:*"],
      "Resource": "*"
    }
  ]
}
```

CloudFormation-Admin-policy:

```javascript
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["cloudformation:*"],
      "Resource": "*"
    }
  ]
}
```

Finally, assign the following policies to your IAM user you are going to use throughout the course:

- AmazonEC2FullAccess
- IAMFullAccess
- AmazonVPCFullAccess
- CloudFormation-Admin-policy
- EKS-Admin-policy
  where the last 2 policies are the ones you created above

### Create IAM role

- open `https://console.aws.amazon.com/iam/` and choose _Roles_ => _create role_
- choose _EKS_ service followed by _Allows Amazon EKS to manage your clusters on your behalf_
- choose _Next: Permissions_
- click _Next: Review_
- enter a _unique_ Role name, _EKS-course-role_ and click _*Create Role*_

### Create keypair

- open EC2 dashboard `https://console.aws.amazon.com/ec2`
- click _KeyPairs_ in left navigation bar under section "Network&Security"
- click _Create Key Pair_
- provide name for keypair, _eks-course_ and click _*Create*_
- !! the keypair will be downloaded immediately => file _eks-course.pem_ !!

### Create API Access key/-secret

- create key+secret via AWS console

```bash
AWS-console => IAM => Users => <your user> => tab _Security credentials_ => button _Create access key_
```

## Create base AWS infrastructure

### Create VPC, subnets and security group for your K8s cluster

![AWS EKS Cluster setup](https://res.cloudinary.com/gitgoodclub/image/upload/v1548137228/eks-course/Screen_Shot_2019-01-22_at_5.06.52_pm.png)

To create a VPC there is a prepared CloudFormation template to use. It creates a VPC including 3 Subnets
At the moment EKS is only available in the following 2 regions:

- US West (Oregon), _us-west-2_
- US East (N.Virginia), _us-east-1_

#### Working on the console

- open `https://console.aws.amazon.com/cloudformation/` and select one of the above mentioned regions
- click _Create Stack_
- select _Upload a template to Amazon S3_ , click _*Upload file*_ and select `eks-course-vpc.yaml`
- click _Next_
- provide data in the _Specify Details_ overview:

```yaml
# eks-course-vpc.yaml
---
AWSTemplateFormatVersion: '2010-09-09'
Description: 'AWS EKS course'

Parameters:
  VpcBlock:
    Type: String
    Default: 192.168.0.0/16
    Description: CIDR range for VPC

  Subnet01Block:
    Type: String
    Default: 192.168.64.0/18
    Description: CIDR for first subnet within VPC

  Subnet02Block:
    Type: String
    Default: 192.168.128.0/18
    Description: CIDR for second subnet within VPC

  Subnet03Block:
    Type: String
    Default: 192.168.192.0/18
    Description: CIDR for third subnet within VPC

Resources:
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: !Ref VpcBlock
      EnableDnsSupport: true
      EnableDnsHostnames: true
      Tags:
        - Key: Name
          Value: !Sub '${AWS::StackName}-VPC'

  InternetGateway:
    Type: 'AWS::EC2::InternetGateway'

  VPCGatewayAttachment:
    Type: 'AWS::EC2::VPCGatewayAttachment'
    Properties:
      InternetGatewayId: !Ref InternetGateway
      VpcId: !Ref VPC

  RouteTable:
    Type: AWS::EC2::RouteTable
    Properties:
      VpcId: !Ref VPC
      Tags:
        - Key: Name
          Value: Public Subnets
        - Key: Network
          Value: Public

  Route:
    DependsOn: VPCGatewayAttachment
    Type: AWS::EC2::Route
    Properties:
      RouteTableId: !Ref RouteTable
      DestinationCidrBlock: 0.0.0.0/0
      GatewayId: !Ref InternetGateway

  Subnet01:
    Type: AWS::EC2::Subnet
    Properties:
      AvailabilityZone:
        Fn::Select:
          - '0'
          - Fn::GetAZs:
              Ref: AWS::Region
      CidrBlock:
        Ref: Subnet01Block
      VpcId:
        Ref: VPC
      Tags:
        - Key: Name
          Value: !Sub '${AWS::StackName}-Subnet1'

  Subnet02:
    Type: AWS::EC2::Subnet
    Properties:
      AvailabilityZone:
        Fn::Select:
          - '1'
          - Fn::GetAZs:
              Ref: AWS::Region
      CidrBlock:
        Ref: Subnet02Block
      VpcId:
        Ref: VPC
      Tags:
        - Key: Name
          Value: !Sub '${AWS::StackName}-Subnet2'

  Subnet03:
    Type: AWS::EC2::Subnet

    Properties:
      AvailabilityZone:
        Fn::Select:
          - '2'
          - Fn::GetAZs:
              Ref: AWS::Region
      CidrBlock:
        Ref: Subnet03Block
      VpcId:
        Ref: VPC
      Tags:
        - Key: Name
          Value: !Sub '${AWS::StackName}-Subnet3'

  Subnet01RouteTableAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref Subnet01
      RouteTableId: !Ref RouteTable

  Subnet02RouteTableAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref Subnet02
      RouteTableId: !Ref RouteTable

  Subnet03RouteTableAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref Subnet03
      RouteTableId: !Ref RouteTable

  ControlPlaneSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Cluster communication with worker nodes
      VpcId: !Ref VPC

Outputs:
  SubnetIds:
    Description: Your subnets
    Value: !Join [',', [!Ref Subnet01, !Ref Subnet02, !Ref Subnet03]]

  SecurityGroups:
    Description: SecGroup for communication betw controlplane and workernodes
    Value: !Join [',', [!Ref ControlPlaneSecurityGroup]]

  VpcId:
    Description: The VPC Id
    Value: !Ref VPC
```

#### Setting stack name

- Stack name : set stack name _EKS-course-stack_
- VPC Block : set CIDR range for your VPC, or leave the default from the CloudFormation template
- Subnet01Block : set CIDR range for this subnet, or leave the default from the CloudFormation template
- Subnet02Block : set CIDR range for this subnet, or leave the default from the CloudFormation template
- Subnet03Block : set CIDR range for this subnet, or leave the default from the CloudFormation template

#### Continuing on

- Click _Next_
- Click _Create_
- Observe the progress of the stack creation. After the stack is created, open tab _Outputs_ and record the _VPC-ID_, _SecurityGroup_ and the _Subnet_IDs_ for all 3 subnets. You'll need those at worker launch time.

## Creating the EKS control plane

### Via CLI

```
aws eks create-cluster --name prod --role-arn arn:aws:iam::012345678910:role/eks-service-role-AWSServiceRoleForAmazonEKS-J7ONKE3BQ4PI --resources-vpc-config subnetIds=subnet-6782e71e,subnet-e7e761ac,securityGroupIds=sg-6979fe18
```

### Via GUI

![EKS Control Plane](https://res.cloudinary.com/gitgoodclub/image/upload/v1548137849/eks-course/Screen_Shot_2019-01-22_at_5.17.00_pm.png)

Kubernetes API server is a AWS service, hence it doesn't need dedicated EC2 instances to run.

- Open the EKS overview page in AWS Management console, `https://console.aws.amazon.com/eks/home#/clusters` and click _Create Cluster_.

Populate the following fields:

- Cluster name : enter a unique name, _EKS-course-cluster_
- Kubernetes version : by default the latest available version is preselected
- Role ARN : select the IAM Role you created in the first Hands-On lesson _Part I: cover prerequisites_
- VPC : select the VPC-ID from the dropdown box which was created in the first Hands-On lesson _Part II: create base AWS infrastructure_
- Subnets : provide the comma separated Subnet-IDs you recorded in the previous step
- SecurityGroup : select the security group (it has name _ControlPlaneSecurityGroup_ ) which has been created in Hands-On _Part II: create base AWS infrastructure_

Then for creation:

- click _Create_
- on the _Clusters_ overview page, observe field _*Status*_ until cluster creation is finished.

Click on your clustername, and record the _API server endpoint_ and _Certificate authority_ values to configure `kubectl` in the next Hands-On _Part IV: install & configure kubectl_.

## Setting up local kubectl for EKS

### Recap on the kubectl setup

- `kubectl` relies on the `kubectl config file`
- That relies on the EKS endpoint and User authentication
- Use auth depends on `aws-iam-authenticator` executable
- This generates an auth token based on the `aws credentials file`

### Install kubectl & aws-iam_authenticator

- kubectl

  - on RH based Linux: `sudo dnf install kubernetes-client`
    - check: `kubectl version --short --client`
  - on Windows, open a terminal emulator, preferrably MobaXterm:

  ```
  curl -k -# -o kubectl.exe https://amazon-eks.s3-us-west-2.amazonaws.com/1.10.3/2018-07-26/bin/windows/amd64/kubectl.exe
  chmod +x kubectl.exe
  mkdir $HOME/bin
  mv kubectl.exe $HOME/bin
  echo 'export PATH=$HOME/bin:$PATH' >> ~/.bashrc
  source .bashrc
  ```

  - check: `kubectl.exe version --short --client`

- aws-iam-authenticator

  - on Linux:

  ```
  curl -o aws-iam-authenticator https://amazon-eks.s3-us-west-2.amazonaws.com/1.10.3/2018-07-26/bin/linux/amd64/aws-iam-authenticator
  chmod +x ./aws-iam-authenticator
  cp ./aws-iam-authenticator /usr/local/bin/
  ```

  - Test: `aws-iam-authenticator help`

  - on Windows, open a terminal emulator, preferrably MobaXterm:

  ```
  curl -k -# -o aws-iam-authenticator.exe  https://amazon-eks.s3-us-west-2.amazonaws.com/1.10.3/2018-07-26/bin/windows/amd64/aws-iam-authenticator.exe
  chmod +x aws-iam-authenticator.exe
  mv aws-iam-authenticator.exe $HOME/bin
  ```

  - Test: `aws-iam-authenticator.exe help`

- aws credentials (ACCESS KEY+SECRET)
  now we have to provide the Access key+secret from the first lesson _Part I : covering prerequisites_ and put them into the credentials template.

      * populate aws credentials file
        copy the provided file named _credentials_ to
        * WINDOWS cygwin: ```mkdir $HOMEPATH/.aws && vi $HOMEPATH/.aws/credentials```
        * Linux: ```~/.aws/credentials```
        and set the properties _aws_access_key_id_ and _aws_secret_access_key_

### Configure _kubectl_

in this step we are creating a configuration file for the binary `kubectl`, which is the main tool to interact with Kubernetes later on.

Use template file _kube-config-eks_ and copy it to:

- Linux: `~/.kube/kube-config-eks`
- Windows (cygwin): `mkdir $HOMEPATH/.kube && vi $HOMEPATH/.kube/kube-config-eks`

```yaml
apiVersion: v1
clusters:
  - cluster:
      server: <endpoint-url>
      certificate-authority-data: <base64-encoded-ca-cert>
    name: kubernetes
contexts:
  - context:
      cluster: kubernetes
      user: aws
    name: aws
current-context: aws
kind: Config
preferences: {}
users:
  - name: aws
    user:
      exec:
        apiVersion: client.authentication.k8s.io/v1alpha1
        command: aws-iam-authenticator
        args:
          - 'token'
          - '-i'
          - 'EKS-course-cluster'
```

- edit file `kube-config-eks` and replace _endpoint-url_, _base64-encoded-ca-cert_ by the values you recorded in the Hands-On lesson 3 _Part III: create the K8s control plane_.

- Linux : `export KUBECONFIG=~/.kube/kube-config-eks`
  Windows : `export KUBECONFIG=$HOMEPATH/.kube/kube-config-eks`

- Test connectivity and access:
  ```
  #>kubectl get svc
  NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
  kubernetes   ClusterIP   xxxxxxxxx    <none>        443/TCP   4m
  ```
  command to check the config for kubectl: `kubectl config view`

Now you successfully talked to the K8s control plane on AWS
