---
name: Devops Kubernetes Course
menu: Kubernetes 
---
# DevOps Kubernetes Course

<!-- TOC -->autoauto- [DevOps Kubernetes Course](#devops-kubernetes-course)auto    - [Course layout](#course-layout)auto        - [Objectives](#objectives)auto        - [Support](#support)auto        - [Getting Started](#getting-started)auto        - [Procedure Document](#procedure-document)auto    - [What is Kubernetes?](#what-is-kubernetes)auto    - [Containers intro](#containers-intro)auto    - [Kubernetes Setup](#kubernetes-setup)auto        - [Running locally](#running-locally)auto            - [Minikube](#minikube)auto        - [Running on AWS](#running-on-aws)auto        - [Cluster setup on Kops](#cluster-setup-on-kops)auto    - [KOPS QuickList](#kops-quicklist)auto        - [Building Docker Containers](#building-docker-containers)auto        - [Docker registery](#docker-registery)auto        - [Running the Docker app on Kubernetes](#running-the-docker-app-on-kubernetes)auto        - [How to port-forward](#how-to-port-forward)auto        - [Exposing the pod](#exposing-the-pod)auto        - [Setting up the external load balancer](#setting-up-the-external-load-balancer)auto    - [Kubernetes Basics](#kubernetes-basics)auto        - [Node Architecture](#node-architecture)auto        - [Replication Controller](#replication-controller)auto            - [Scaling](#scaling)auto    - [Deployments](#deployments)auto        - [Useful commands](#useful-commands)auto        - [Demo: Deployment notes](#demo-deployment-notes)auto    - [Services](#services)auto    - [Tags](#tags)auto        - [Demo: Using tags](#demo-using-tags)auto    - [Healthchecks](#healthchecks)auto    - [Secrets](#secrets)auto        - [How to use them](#how-to-use-them)auto        - [Demo: Wordpress Secrets](#demo-wordpress-secrets)auto    - [Web UI](#web-ui)auto        - [Demo: Web UI](#demo-web-ui)auto- [Advanced Topics](#advanced-topics)auto    - [Service Discovery](#service-discovery)auto        - [Demo: Service Discovery](#demo-service-discovery)auto    - [ConfigMap](#configmap)auto        - [Demo: Config Map](#demo-config-map)auto    - [Ingress Controller](#ingress-controller)auto        - [Demo: Ingress Controller](#demo-ingress-controller)auto    - [External DNS](#external-dns)auto    - [Volumes](#volumes)auto        - [Using EBS Storage](#using-ebs-storage)auto        - [Demo: Volumes](#demo-volumes)auto    - [Volume Provisioning](#volume-provisioning)auto    - [Demo: Using Wordpress with Volumes](#demo-using-wordpress-with-volumes)auto    - [Pod Presets](#pod-presets)auto    - [Stateful Sets - (formerly Pet Sets)](#stateful-sets---formerly-pet-sets)auto    - [Daemon Sets](#daemon-sets)auto    - [Resource Usage Monitoring](#resource-usage-monitoring)auto    - [Horiztonal Pod Autoscaling](#horiztonal-pod-autoscaling)auto    - [Affinity/Anti-Affinity](#affinityanti-affinity)auto    - [3.13 Interpod Affinity/Anti-Affinity](#313-interpod-affinityanti-affinity)auto        - [Anti-affinity](#anti-affinity)auto        - [Topology operators](#topology-operators)auto    - [3.14 Taints and Tolerations](#314-taints-and-tolerations)auto        - [Tolerations usage](#tolerations-usage)auto        - [Keys](#keys)auto        - [Use Cases](#use-cases)auto        - [Useful Taints and Tolerations](#useful-taints-and-tolerations)auto    - [3.15 Customer Resource Definitions (CRDs)](#315-customer-resource-definitions-crds)auto    - [3.16 Operators](#316-operators)auto        - [PostgreSQL Operator Demo](#postgresql-operator-demo)auto    - [4. Kubernetes Administration](#4-kubernetes-administration)auto    - [4.1 Resource Quotas](#41-resource-quotas)auto        - [Resource Quota Examples](#resource-quota-examples)auto        - [Resource Quote options](#resource-quote-options)auto    - [4.2 Namespaces](#42-namespaces)auto        - [Namespace commands](#namespace-commands)auto        - [Demo ResourceQuotas](#demo-resourcequotas)auto    - [4.3 User Management](#43-user-management)auto        - [Normal Users](#normal-users)auto        - [Service Users](#service-users)auto        - [Other notes on User Management](#other-notes-on-user-management)auto    - [4.4 RBAC (Role Based Access Control)](#44-rbac-role-based-access-control)auto    - [4.5 Networking](#45-networking)auto        - [Pods](#pods)auto        - [Kubenet Networking](#kubenet-networking)auto        - [VPC Alternatives](#vpc-alternatives)auto    - [4.6 Node Maintenance](#46-node-maintenance)auto        - [Adding a new node](#adding-a-new-node)auto    - [4.7 High Availability](#47-high-availability)auto        - [Setup](#setup)auto        - [Kops with multiple masters for HA](#kops-with-multiple-masters-for-ha)auto    - [4.8 TLS on ELB using Annotations](#48-tls-on-elb-using-annotations)auto    - [5. Packaging and Deploying on Kubernetes](#5-packaging-and-deploying-on-kubernetes)auto    - [5.1 Intro to Helm](#51-intro-to-helm)auto        - [Helm commands](#helm-commands)auto        - [Installing Helm](#installing-helm)auto            - [Linux Distro Install](#linux-distro-install)auto        - [Adding to cluster](#adding-to-cluster)auto    - [5.2 Creating your own helm charts](#52-creating-your-own-helm-charts)auto    - [5.3 Setting up Helm Repo with S3](#53-setting-up-helm-repo-with-s3)auto    - [6. Serverless on Kubernetes](#6-serverless-on-kubernetes)auto    - [6.1 Intro to Kubeless](#61-intro-to-kubeless)auto    - [6.2 Creating functions on Kubeless](#62-creating-functions-on-kubeless)auto        - [Installing the CLI](#installing-the-cli)auto        - [Deploy kubeless](#deploy-kubeless)auto        - [Deploy function on Kubernetes](#deploy-function-on-kubernetes)auto            - [Useful functions](#useful-functions)auto        - [Usage with Kafka](#usage-with-kafka)auto    - [7. Microservices](#7-microservices)auto    - [7.1 Istio Installation](#71-istio-installation)auto        - [Kops configuration](#kops-configuration)auto        - [Download (1.0.2):](#download-102)auto        - [Download (latest):](#download-latest)auto        - [Istio install](#istio-install)auto    - [7.2 Example app](#72-example-app)auto        - [Example app (from istio)](#example-app-from-istio)auto        - [Hello world app](#hello-world-app)auto        - [Mutual TLS example](#mutual-tls-example)auto        - [End-user authentication](#end-user-authentication)auto    - [7.3 Advanced Istio Routing](#73-advanced-istio-routing)auto    - [7.4 Canary deployments](#74-canary-deployments)auto    - [7.5 Running retries](#75-running-retries)auto    - [7.6 Mutual TLS](#76-mutual-tls)auto    - [7.7 RBAC with Istio and MTLS](#77-rbac-with-istio-and-mtls)auto    - [7.8 End-user Authentication](#78-end-user-authentication)auto    - [7.9 Istio Ingress Traffic](#79-istio-ingress-traffic)auto    - [7.10 Distributed Tracing with Jaegar](#710-distributed-tracing-with-jaegar)auto    - [7.11 Istio Metrics with Grafana](#711-istio-metrics-with-grafana)auto    - [8. Intro to kubeadm](#8-intro-to-kubeadm)autoauto<!-- /TOC -->

## Course layout

1.  Introduction
2.  Kubernetes Basics
3.  Advanced Topics
4.  Administration

### Objectives

1.  To understand, deploy and use Kubernetes
2.  To get straight with `containerization` and run those containers on Kubernetes
3.  To use Kubernetes as a single node and on AWS
4.  To be able to run `stateless` and `stateful` applications on Kubernetes
5.  To be able to `administer` Kubernetes

### Support

All resources are in a github repository.

### Getting Started

kubectl: Install via brew
minikube: https://github.com/kubernetes/minikube/releases
kops: Install via brew

Minikube test commands:

```bash
minikube status # check status
minikube start # start cluster
```

For OSX install:

`curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.25.0/minikube-darwin-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/`

Install Docker Edge to use the latest features with Kubernetes.

Otherwise follow the base instructions to get everything up and going.

`https://gist.github.com/kevin-smets/b91a34cea662d0c523968472a81788f7`

This resolves DL issue: `mv minikube-v0.25.1.iso ~/.minikube/cache/iso/minikube-v0.25.1.iso`.

### Procedure Document

```
Kubernetes Procedure Document
Github repository [Read this first]
Download all the course material from: https://github.com/wardviaene/kubernetes-course

Questions?
Send me a message

Use Q&A

Join our facebook group: https://www.facebook.com/groups/840062592768074/

Download Kubectl
Linux: https://storage.googleapis.com/kubernetes-release/release/v1.6.1/bin/linux/amd64/kubectl

MacOS: https://storage.googleapis.com/kubernetes-release/release/v1.6.1/bin/darwin/amd64/kubectl

Windows:
https://github.com/eirslett/kubectl-windows/releases/download/v1.6.3/kubectl.exe

Minikube
Project URL: https://github.com/kubernetes/minikube

Latest Release and download instructions: https://github.com/kubernetes/minikube/releases

VirtualBox: http://www.virtualbox.org

Minikube on windows:
Download the latest minikube-version.exe

Rename the file to minikube.exe and put it in C:\minikube

Open a cmd (search for the app cmd or powershell)

Run: cd C:\minikube and enter minikube start

Test your cluster commands
Make sure your cluster is running, you can check with minikube status.

If your cluster is not running, enter minikube start first.

kubectl run hello-minikube --image=gcr.io/google_containers/echoserver:1.4 --port=8080
kubectl expose deployment hello-minikube --type=NodePort

minikube service hello-minikube --url

<open a browser and go to that url>

Kops
Project URL
https://github.com/kubernetes/kops

Free DNS Service
Sign up at http://freedns.afraid.org/

Choose for subdomain hosting

Enter the AWS nameservers given to you in route53 as nameservers for the subdomain

http://www.dot.tk/ provides a free .tk domain name you can use and you can point it to the amazon AWS nameservers

###h2

Namecheap.com often has promotions for tld’s like .co for just a couple of bucks



Cluster Commands
kops create cluster --name=kubernetes.newtech.academy --state=s3://kops-state-b429b --zones=eu-west-1a --node-count=2 --node-size=t2.micro --master-size=t2.micro --dns-zone=kubernetes.newtech.academy

kops update cluster kubernetes.newtech.academy --yes --state=s3://kops-state-b429b

kops delete cluster --name kubernetes.newtech.academy --state=s3://kops-state-b429b

kops delete cluster --name kubernetes.newtech.academy --state=s3://kops-state-b429b --yes

Kubernetes from scratch






You can setup your cluster manually from scratch

If you’re planning to deploy on AWS / Google / Azure, use the tools that are fit for these platforms

If you have an unsupported cloud platform, and you still want Kubernetes, you can install it manually

CoreOS + Kubernetes: ###a href="https://coreos.com/kubernetes/docs/latest/getting-started.html">https://coreos.com/kubernetes/docs/latest/getting-started.html

Docker
You can download Docker Engine for:

Windows: https://docs.docker.com/engine/installation/windows/

MacOS: https://docs.docker.com/engine/installation/mac/

Linux: https://docs.docker.com/engine/installation/linux/

DevOps box
Virtualbox: http://www.virtualbox.org

Vagrant: http://www.vagrantup.com

DevOps box: https://github.com/wardviaene/devops-box

Launch commands (in terminal / cmd / powershell):

cd devops-box/

vagrant up

Launch commands for a plain ubuntu box:

mkdir ubuntu

vagrant init ubuntu/xenial64

vagrant up

Docker commands
Description

Command

Build image

docker build .

Build & Tag

docker build -t wardviaene/k8s-demo:latest .

Tag image

docker tag imageid wardviaene/k8s-demo

Push image

docker push wardviaene/k8s-demo

List images

docker images

List all containers

docker ps -a

Kubernetes commands
Command

Description

kubectl get pod

Get information about all running pods

kubectl describe pod `<pod>`

Describe one pod

kubectl expose pod `<pod>` --port=444

--name=frontend

Expose the port of a pod (creates a new service)

kubectl port-forward `<pod>` 8080

Port forward the exposed pod port to your local machine

kubectl attach `<podname>` -i

Attach to the pod

kubectl exec `<pod>` -- command

Execute a command on the pod

kubectl label pods `<pod>` mylabel=awesome

Add a new label to a pod

kubectl run -i --tty busybox --image=busybox

--restart=Never -- sh

Run a shell in a pod - very useful for debugging

kubectl get deployments

Get information on current deployments

kubectl get rs

Get information about the replica sets

kubectl get pods --show-labels

get pods, and also show labels attached to those pods

kubectl rollout status deployment/helloworld-deployment

Get deployment status

kubectl set image deployment/helloworld-deployment

k8s-demo=k8s-demo:2

Run k8s-demo with the image label version 2

kubectl edit deployment/helloworld-deployment

Edit the deployment object

kubectl rollout status deployment/helloworld-deployment

Get the status of the rollout

kubectl rollout history deployment/helloworld-deployment

Get the rollout history

kubectl rollout undo deployment/helloworld-deployment

Rollback to previous version

kubectl rollout undo deployment/helloworld-deployment --to-revision=n

Rollback to any version version

AWS Commands
aws ec2 create-volume --size 10 --region us-east-1 --availability-zone us-east-1a --volume-type gp2

Certificates
Creating a new key for a new user: openssl genrsa -out myuser.pem 2048

Creating a certificate request: openssl req -new -key myuser.pem -out myuser-csr.pem -subj "/CN=myuser/O=myteam/"

Creating a certificate: openssl x509 -req -in myuser-csr.pem -CA /path/to/kubernetes/ca.crt -CAkey /path/to/kubernetes/ca.key -CAcreateserial -out myuser.crt -days 10000
```

## What is Kubernetes?

Open source orchestration system for Docker.

*   Let's you schedule containers on a cluster of machines
*   You can run multiple containers on one machine
*   You can run long running services (like web apps)
*   K8s will manage the state of these containers
    *   Can start the container on specific nodes
    *   Will restart a container when it gets killed
    *   Can move containers from one node to another node
*   Instead of just running a few docker containers on one host manually, K8s can manage that for you
*   K8 clusters can go to thousands of nodes
*   Other orcherstrators:
    *   Docker Swarm
    *   Mesos

You can run K8s anywhere:

*   One premise (private)
*   Public
*   Hybrid

It is highly modular and open source. It is also backed by Google.

## Containers intro

Container VS VM: No Hypervisor and Guest OS layer.

Containers on Cloud Providers do still use the hypervisor to seperate users.

Docker is the most popular container software. An alternative is `rkt`.

Benefits? It works in isolation. You ship the binary with all the dependencies and create a closer parity.

Docker makes development teams able to ship faster.

You can run the same image on prem and in the cloud with what should be the same results.

## Kubernetes Setup

Something to note is that there are more integrations for certain Cloud Providers like AWS & GCE. Thingsl ike "Volumes" and "External Load Balancers" work only with support Cloud Providers.

### Running locally

We can use `minikube` to spin up a local single machine with a Kubernetes cluster.

#### Minikube

Minikube is a tool that makes running k8s locally easy.

It runs a single-node Kubernetes cluster inside a Linux VM.

It's aimed on users who just want to just test it out or use if for development.

It cannot spin up a roduction cluster, it's a one node machine with no high availability.

You need VM to run all this.

To run a cluster, just run `minikube start`.

To check your config after spinning up Kubernetes, use `cat ~/.kube/config`.

### Running on AWS

Until EKS comes out, we can spin up a Kubernetes cluster using KOPS.

You need to ensure that you download Vagrant and a VM.

For running the Vagrant box, you can run `vagrant up --provider virtualbox`.

You can then use `vagrant ssh` to ssh in.

After you are in, download Kops:

```
curl -LO https://github.com/kubernetes/kops/releases/download/$(curl -s https://api.github.com/repos/kubernetes/kops/releases/latest | grep tag_name | cut -d '"' -f 4)/kops-linux-amd64
chmod +x kops-linux-amd64
sudo mv kops-linux-amd64 /usr/local/bin/kops
```

Ensure that you also download `python-pip`:

```
sudo apt-get install software-properties-common
sudo apt-add-repository universe
sudo apt-get update
sudo apt-get install python-pip
```

Then install awscli:

```
export LC_ALL=C # if run into an error about locale settings
sudo pip install awscli
```

You will then need to create an AWS account.

After setting up the AWSCLI, installing Kops and creating a S3 Bucket + setting up the Route53 Name Servers (on somewhere like NameCheap), you can move on.

### Cluster setup on Kops

First, download Kops for Linux on the Vagrant box and move it.

Before creating the cluster, you will need to create new keys. `ssh-keygen -f .ssh/id_rsa`.

To create the cluster (example), run `kops create cluster --name=kubernetes.test --state=s3://kops-state-oeiajrie93 --zones=ap-southeast-2a --node-count=2 --node-size=t2.micro --master-size=t2.micro --dns-zone=givemeyeezy.online`

This DNS zone is basically just the one that we set up.

You'll get something back like

```
I0311 21:48:46.821364    7553 create_cluster.go:439] Inferred --cloud=aws from zone "ap-southeast-2a"
I0311 21:48:46.821506    7553 create_cluster.go:971] Using SSH public key: /home/vagrant/.ssh/id_rsa.pub
I0311 21:48:48.232635    7553 subnets.go:184] Assigned CIDR 172.20.32.0/19 to subnet ap-southeast-2a
Previewing changes that will be made:

I0311 21:48:52.305360    7553 executor.go:91] Tasks: 0 done / 73 total; 31 can run
I0311 21:48:53.503124    7553 executor.go:91] Tasks: 31 done / 73 total; 24 can run
I0311 21:48:53.958875    7553 executor.go:91] Tasks: 55 done / 73 total; 16 can run
I0311 21:48:54.237870    7553 executor.go:91] Tasks: 71 done / 73 total; 2 can run
I0311 21:48:54.262347    7553 executor.go:91] Tasks: 73 done / 73 total; 0 can run
Will create resources:
  AutoscalingGroup/master-ap-southeast-2a.masters.kubernetes.test
  MinSize             	1
  MaxSize             	1
  Subnets             	[name:ap-southeast-2a.kubernetes.test]
  Tags                	{k8s.io/role/master: 1, Name: master-ap-southeast-2a.masters.kubernetes.test, KubernetesCluster: kubernetes.test, k8s.io/cluster-autoscaler/node-template/label/kops.k8s.io/instancegroup: master-ap-southeast-2a}
  LaunchConfiguration 	name:master-ap-southeast-2a.masters.kubernetes.test

  AutoscalingGroup/nodes.kubernetes.test
  MinSize             	2
  MaxSize             	2
  Subnets             	[name:ap-southeast-2a.kubernetes.test]
  Tags                	{k8s.io/cluster-autoscaler/node-template/label/kops.k8s.io/instancegroup: nodes, k8s.io/role/node: 1, Name: nodes.kubernetes.test, KubernetesCluster: kubernetes.test}
  LaunchConfiguration 	name:nodes.kubernetes.test

  DHCPOptions/kubernetes.test
  DomainName          	ap-southeast-2.compute.internal
  DomainNameServers   	AmazonProvidedDNS

  EBSVolume/a.etcd-events.kubernetes.test
  AvailabilityZone    	ap-southeast-2a
  VolumeType          	gp2
  SizeGB              	20
  Encrypted           	false
  Tags                	{KubernetesCluster: kubernetes.test, k8s.io/etcd/events: a/a, k8s.io/role/master: 1, Name: a.etcd-events.kubernetes.test}

  EBSVolume/a.etcd-main.kubernetes.test
  AvailabilityZone    	ap-southeast-2a
  VolumeType          	gp2
  SizeGB              	20
  Encrypted           	false
  Tags                	{k8s.io/etcd/main: a/a, k8s.io/role/master: 1, Name: a.etcd-main.kubernetes.test, KubernetesCluster: kubernetes.test}

  IAMInstanceProfile/masters.kubernetes.test

  IAMInstanceProfile/nodes.kubernetes.test

  IAMInstanceProfileRole/masters.kubernetes.test
  InstanceProfile     	name:masters.kubernetes.test id:masters.kubernetes.test
  Role                	name:masters.kubernetes.test

  IAMInstanceProfileRole/nodes.kubernetes.test
  InstanceProfile     	name:nodes.kubernetes.test id:nodes.kubernetes.test
  Role                	name:nodes.kubernetes.test

  IAMRole/masters.kubernetes.test
  ExportWithID        	masters

  IAMRole/nodes.kubernetes.test
  ExportWithID        	nodes

  IAMRolePolicy/masters.kubernetes.test
  Role                	name:masters.kubernetes.test

  IAMRolePolicy/nodes.kubernetes.test
  Role                	name:nodes.kubernetes.test

  InternetGateway/kubernetes.test
  VPC                 	name:kubernetes.test
  Shared              	false

  Keypair/apiserver-aggregator
  Subject             	cn=aggregator
  Type                	client
  Signer              	name:apiserver-aggregator-ca id:cn=apiserver-aggregator-ca

  Keypair/apiserver-aggregator-ca
  Subject             	cn=apiserver-aggregator-ca
  Type                	ca

  Keypair/apiserver-proxy-client
  Subject             	cn=apiserver-proxy-client
  Type                	client
  Signer              	name:ca id:cn=kubernetes

  Keypair/ca
  Subject             	cn=kubernetes
  Type                	ca

  Keypair/kops
  Subject             	o=system:masters,cn=kops
  Type                	client
  Signer              	name:ca id:cn=kubernetes

  Keypair/kube-controller-manager
  Subject             	cn=system:kube-controller-manager
  Type                	client
  Signer              	name:ca id:cn=kubernetes

  Keypair/kube-proxy
  Subject             	cn=system:kube-proxy
  Type                	client
  Signer              	name:ca id:cn=kubernetes

  Keypair/kube-scheduler
  Subject             	cn=system:kube-scheduler
  Type                	client
  Signer              	name:ca id:cn=kubernetes

  Keypair/kubecfg
  Subject             	o=system:masters,cn=kubecfg
  Type                	client
  Signer              	name:ca id:cn=kubernetes

  Keypair/kubelet
  Subject             	o=system:nodes,cn=kubelet
  Type                	client
  Signer              	name:ca id:cn=kubernetes

  Keypair/kubelet-api
  Subject             	cn=kubelet-api
  Type                	client
  Signer              	name:ca id:cn=kubernetes

  Keypair/master
  Subject             	cn=kubernetes-master
  Type                	server
  AlternateNames      	[100.64.0.1, 127.0.0.1, api.internal.kubernetes.test, api.kubernetes.test, kubernetes, kubernetes.default, kubernetes.default.svc, kubernetes.default.svc.cluster.local]
  Signer              	name:ca id:cn=kubernetes

  LaunchConfiguration/master-ap-southeast-2a.masters.kubernetes.test
  ImageID             	kope.io/k8s-1.8-debian-jessie-amd64-hvm-ebs-2018-01-14
  InstanceType        	t2.micro
  SSHKey              	name:kubernetes.kubernetes.test-e8:be:8d:cf:90:3b:52:6e:f7:23:29:0a:32:d1:cd:de id:kubernetes.kubernetes.test-e8:be:8d:cf:90:3b:52:6e:f7:23:29:0a:32:d1:cd:de
  SecurityGroups      	[name:masters.kubernetes.test]
  AssociatePublicIP   	true
  IAMInstanceProfile  	name:masters.kubernetes.test id:masters.kubernetes.test
  RootVolumeSize      	64
  RootVolumeType      	gp2
  SpotPrice

  LaunchConfiguration/nodes.kubernetes.test
  ImageID             	kope.io/k8s-1.8-debian-jessie-amd64-hvm-ebs-2018-01-14
  InstanceType        	t2.micro
  SSHKey              	name:kubernetes.kubernetes.test-e8:be:8d:cf:90:3b:52:6e:f7:23:29:0a:32:d1:cd:de id:kubernetes.kubernetes.test-e8:be:8d:cf:90:3b:52:6e:f7:23:29:0a:32:d1:cd:de
  SecurityGroups      	[name:nodes.kubernetes.test]
  AssociatePublicIP   	true
  IAMInstanceProfile  	name:nodes.kubernetes.test id:nodes.kubernetes.test
  RootVolumeSize      	128
  RootVolumeType      	gp2
  SpotPrice

  ManagedFile/kubernetes.test-addons-bootstrap
  Location            	addons/bootstrap-channel.yaml

  ManagedFile/kubernetes.test-addons-core.addons.k8s.io
  Location            	addons/core.addons.k8s.io/v1.4.0.yaml

  ManagedFile/kubernetes.test-addons-dns-controller.addons.k8s.io-k8s-1.6
  Location            	addons/dns-controller.addons.k8s.io/k8s-1.6.yaml

  ManagedFile/kubernetes.test-addons-dns-controller.addons.k8s.io-pre-k8s-1.6
  Location            	addons/dns-controller.addons.k8s.io/pre-k8s-1.6.yaml

  ManagedFile/kubernetes.test-addons-kube-dns.addons.k8s.io-k8s-1.6
  Location            	addons/kube-dns.addons.k8s.io/k8s-1.6.yaml

  ManagedFile/kubernetes.test-addons-kube-dns.addons.k8s.io-pre-k8s-1.6
  Location            	addons/kube-dns.addons.k8s.io/pre-k8s-1.6.yaml

  ManagedFile/kubernetes.test-addons-limit-range.addons.k8s.io
  Location            	addons/limit-range.addons.k8s.io/v1.5.0.yaml

  ManagedFile/kubernetes.test-addons-rbac.addons.k8s.io-k8s-1.8
  Location            	addons/rbac.addons.k8s.io/k8s-1.8.yaml

  ManagedFile/kubernetes.test-addons-storage-aws.addons.k8s.io-v1.6.0
  Location            	addons/storage-aws.addons.k8s.io/v1.6.0.yaml

  ManagedFile/kubernetes.test-addons-storage-aws.addons.k8s.io-v1.7.0
  Location            	addons/storage-aws.addons.k8s.io/v1.7.0.yaml

  Route/0.0.0.0/0
  RouteTable          	name:kubernetes.test
  CIDR                	0.0.0.0/0
  InternetGateway     	name:kubernetes.test

  RouteTable/kubernetes.test
  VPC                 	name:kubernetes.test

  RouteTableAssociation/ap-southeast-2a.kubernetes.test
  RouteTable          	name:kubernetes.test
  Subnet              	name:ap-southeast-2a.kubernetes.test

  SSHKey/kubernetes.kubernetes.test-e8:be:8d:cf:90:3b:52:6e:f7:23:29:0a:32:d1:cd:de
  KeyFingerprint      	c4:89:af:59:a1:1d:6e:ef:7a:9d:12:65:bc:e2:82:4f

  Secret/admin

  Secret/kube

  Secret/kube-proxy

  Secret/kubelet

  Secret/system:controller_manager

  Secret/system:dns

  Secret/system:logging

  Secret/system:monitoring

  Secret/system:scheduler

  SecurityGroup/masters.kubernetes.test
  Description         	Security group for masters
  VPC                 	name:kubernetes.test
  RemoveExtraRules    	[port=22, port=443, port=2380, port=2381, port=4001, port=4002, port=4789, port=179]

  SecurityGroup/nodes.kubernetes.test
  Description         	Security group for nodes
  VPC                 	name:kubernetes.test
  RemoveExtraRules    	[port=22]

  SecurityGroupRule/all-master-to-master
  SecurityGroup       	name:masters.kubernetes.test
  SourceGroup         	name:masters.kubernetes.test

  SecurityGroupRule/all-master-to-node
  SecurityGroup       	name:nodes.kubernetes.test
  SourceGroup         	name:masters.kubernetes.test

  SecurityGroupRule/all-node-to-node
  SecurityGroup       	name:nodes.kubernetes.test
  SourceGroup         	name:nodes.kubernetes.test

  SecurityGroupRule/https-external-to-master-0.0.0.0/0
  SecurityGroup       	name:masters.kubernetes.test
  CIDR                	0.0.0.0/0
  Protocol            	tcp
  FromPort            	443
  ToPort              	443

  SecurityGroupRule/master-egress
  SecurityGroup       	name:masters.kubernetes.test
  CIDR                	0.0.0.0/0
  Egress              	true

  SecurityGroupRule/node-egress
  SecurityGroup       	name:nodes.kubernetes.test
  CIDR                	0.0.0.0/0
  Egress              	true

  SecurityGroupRule/node-to-master-tcp-1-2379
  SecurityGroup       	name:masters.kubernetes.test
  Protocol            	tcp
  FromPort            	1
  ToPort              	2379
  SourceGroup         	name:nodes.kubernetes.test

  SecurityGroupRule/node-to-master-tcp-2382-4000
  SecurityGroup       	name:masters.kubernetes.test
  Protocol            	tcp
  FromPort            	2382
  ToPort              	4000
  SourceGroup         	name:nodes.kubernetes.test

  SecurityGroupRule/node-to-master-tcp-4003-65535
  SecurityGroup       	name:masters.kubernetes.test
  Protocol            	tcp
  FromPort            	4003
  ToPort              	65535
  SourceGroup         	name:nodes.kubernetes.test

  SecurityGroupRule/node-to-master-udp-1-65535
  SecurityGroup       	name:masters.kubernetes.test
  Protocol            	udp
  FromPort            	1
  ToPort              	65535
  SourceGroup         	name:nodes.kubernetes.test

  SecurityGroupRule/ssh-external-to-master-0.0.0.0/0
  SecurityGroup       	name:masters.kubernetes.test
  CIDR                	0.0.0.0/0
  Protocol            	tcp
  FromPort            	22
  ToPort              	22

  SecurityGroupRule/ssh-external-to-node-0.0.0.0/0
  SecurityGroup       	name:nodes.kubernetes.test
  CIDR                	0.0.0.0/0
  Protocol            	tcp
  FromPort            	22
  ToPort              	22

  Subnet/ap-southeast-2a.kubernetes.test
  VPC                 	name:kubernetes.test
  AvailabilityZone    	ap-southeast-2a
  CIDR                	172.20.32.0/19
  Shared              	false
  Tags                	{Name: ap-southeast-2a.kubernetes.test, KubernetesCluster: kubernetes.test, kubernetes.io/cluster/kubernetes.test: owned, kubernetes.io/role/elb: 1}

  VPC/kubernetes.test
  CIDR                	172.20.0.0/16
  EnableDNSHostnames  	true
  EnableDNSSupport    	true
  Shared              	false
  Tags                	{Name: kubernetes.test, KubernetesCluster: kubernetes.test, kubernetes.io/cluster/kubernetes.test: owned}

  VPCDHCPOptionsAssociation/kubernetes.test
  VPC                 	name:kubernetes.test
  DHCPOptions         	name:kubernetes.test

Must specify --yes to apply changes

Cluster configuration has been created.

Suggestions:
 * list clusters with: kops get cluster
 * edit this cluster with: kops edit cluster kubernetes.test
 * edit your node instance group: kops edit ig --name=kubernetes.test nodes
 * edit your master instance group: kops edit ig --name=kubernetes.test master-ap-southeast-2a

Finally configure your cluster with: kops update cluster kubernetes.test --yes
```

To edit the cluster, run `kops edit cluster kubernetes.test --state=s3://kops-state-oeiajrie93` and then to update run `kops update cluster kubernetes.test --yes --state=s3://kops-state-oeiajrie93`

If we now run `cat ~/.kube/config` we can see the password and username information needed.

To check if the nodes are up, run `kubectl get node`.

Then, we can again run `kubectl run hello-minikube ...`

If you have issues hit up `https://www.digitalocean.com/community/tutorials/how-to-set-up-time-synchronization-on-ubuntu-16-04` for date syncing.

## KOPS QuickList

```bash
# create
kops create cluster --name=doksandbox.com --state=s3://kops-state-doksandbox --zones=ap-southeast-2a --node-count=1 --node-size=t2.micro --master-size=t2.micro --dns-zone=doksandbox.com

# edit
kops edit cluster doksandbox.com --state=s3://kops-state-doksandbox

# update
kops update cluster doksandbox.com --yes --state=s3://kops-state-doksandbox

# delete
kops delete cluster doksandbox.com --yes --state=s3://kops-state-doksandbox

# suggestions
kops validate cluster --state=s3://kops-state-doksandbox  # validate cluster
kubectl get nodes --show-labels # list nodes
ssh -i ~/.ssh/id_rsa admin@api.kubernetes.doksandbox.com # ssh to the master
The admin user is specific to Debian. If not using Debian please use the appropriate user based on your OS.

# check DNS
dig afxr doksandbox.com
```

To get a basic service up and running, hit `kubectl run hello-minikube --image=gcr.io/google_containers/echoserver:1.4 --port=8080` and head to the VPC security network to update and expose that port to all IPs to prove that is all works correctly. The port will be dynamic.

### Building Docker Containers

If installing onto Linux, check `https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce-1`

To do a demo, `sudo apt-get install git` and `git clone https://github.com/wardviaene/docker-demo` to get a demo folder.

Change in, `sudo docker build .` and then to run the container use `docker run -p 3000:3000 -t <id>`

### Docker registery

To upload to the registry:

```
docker login # fill in login details
docker tag imageid okeeffed/docker-demo
docker push okeeffed/docker-demo
```

There are a few limitations for each Docker/Kubernetes relationship:

1.  Don't try to create one giant docker image fo you app, but split it up if necessary.
2.  All data in the container is not preserved. You need volumes for this.
3.  Check 12factor.net for methodologies

### Running the Docker app on Kubernetes

We need to create a `pod definition`.

This describes an application running on Kubernetes.

A pod can container _one or more tightly coupled containers_ that make up the app.

Those apps can easily communicate with each other using their local **port numbers**.

The app for us at the moment has only one container.

To build this, we create a podfile with all the pod definition:

```yaml
# pod-helloworld.yml
apiVersion: v1
kind: Pod
metadata:
  name: nodehelloworld.example.com
  labels:
  app: helloworld
spec:
  containers:
  - name: k8s-demo
    image: okeeffed/docker-demo
    ports:
    - containerPort: 3000
```

To create this pod, we run `kubectl create -f ./pod-helloworld.yml`

**Some useful commands**

| Command                                                           | Description                                      |
| ----------------------------------------------------------------- | ------------------------------------------------ |
| kubectl get pod                                                   | Get info about all running pods                  |
| kubectl describe pod `<pod>`                                      | Describe one pod                                 |
| kubectl expose pod `<pod>` --port=444 --name=frontend             | Expose the port of a pod (creates a new service) |
| kubectl port-forward `<pod>` 8080                                 | Port forward the local machine                   |
| kubectl attach `<podname>` -i                                     | Attach to pod                                    |
| kubectl exec `<pod>` -- command                                   | Execute a command on the pod                     |
| kubectl label pods `<pod>` mylabel=awesome                        | Add new label to pod                             |
| kubectl run -i -tty busybox --image=busybox --restart=Never -- sh | Run a shell in a pod - very useful for debugging |

### How to port-forward

Running `kubectl describe pod nodehelloworld.example.com` will then give us info on what is going on here.

To listen locally, we can port-forward: `kubectl port-forward nodehelloworld.example.com 8081:3000`

### Exposing the pod

`kubectl expose pod nodehelloworld.example.com --type=NodePort --name nodehelloworld-service`

Check this with `kubectl get service`

When you see what port is being forwarded, you can again open that up on the security settings and direct to that port.

### Setting up the external load balancer

This will allow the outside world to have traffic routed to the correct pod.

To create the service for this:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: helloworld-service
spec:
  ports:
  - port: 80
  targetPort: nodejs-port
  protocol: TCP
  selector:
  app: helloworld
  type: LoadBalancer
```

Using `kubectl create -f <file>` will create the pods and kops will autoconfigure what is required.

## Kubernetes Basics

### Node Architecture

Within each node can be a collection of pods routed by iptables and within each pod are the Docker containers.

These containers can talk easily to each other using localhost and ports.

Each node also has a `kubelet` and `kube-proxy`. The `kubelet` talks to the master node and `kube-proxy` talks to the iptables.

A service itself can be like the load balancer. The service will be publicly available.

When we look deeper at a pod yaml file, we have the containers called as the specs.

```yaml
# pod-helloworld.yml
apiVersion: v1
kind: Pod
metadata:
  name: nodehelloworld.example.com
  labels:
  app: helloworld
spec:
  # The containers are listed here
  containers:
  - name: k8s-demo
    image: okeeffed/docker-demo
    ports:
    - containerPort: 3000
```

### Replication Controller

#### Scaling

If your application is `stateless` you can horizontally scale it.

*   Stateless = your appllication doesn't have a `state`, it doesn't write any local files / keeps local sessions. This prevents pods from falling out of sync.
*   All traditional databases are `stateful`
*   Most `web applications` can be made stateless
    *   Session management needs to be done outside the container
    *   Any file to be saved cannot be saved locally

If needed, you can use `volumes` to still run stateful apps.

Those stateful apps can't horizontally scale, but you can run them in a single container and vertically scale (allocate more CPU/Mem/Disk).

Scaling in Kubernetes can be done using the `Replication Controller`.

The replication controller will ensure a specified number of pod replicas will run at all times.

A pod created with the replica controller will automatically be replaced if they fail, get deleted or are terminated.

Using the replication controller is also recommended if you just want to make sure 1 pod is always running, even after reboots.

You can then run a replication controller with just 1 replica to ensure that it is always running.

To create a replication controller:

```yaml
# rc-helloworld.yml
apiVersion: v1
kind: ReplicationController # Changed from Pod
metadata:
  name: helloworld-container
spec: # Replation controller also has a spec
  replicas: 2 # set two pod replicas
  selector:  # select the app
  app: helloworld
  template:
  # stand Pod metadata and spec
  metadata:
    name: nodehelloworld.example.com
    labels:
    app: helloworld
  spec:
    # The containers are listed here
    containers:
    - name: k8s-demo
      image: okeeffed/docker-demo
      ports:
      - containerPort: 3000
```

When this controller is created with `kubectl`, you will see that the two pods are created with a differing suffix.

Now we have horizontally scaled this pod.

If one of these pods is now deleted, the master node will automatically schedule a new one.

We can also scale this by using `kubectl scale --replicas=4 -f <replication-controller-name.yml>`.

We can also use it with the following:

```
kubectl get rc # get replication controllers
# assume helloworld-controller shows up
kubectl scale --replicas=1 rc/helloworld-container
kubectl get pods # will show only one pod remaining
```

## Deployments

Replication Set is the next gen Replication Controller:

*   It supports new selector that can do selection based on filtering according a set of values eg environment either "dev" or "qa"
*   It's not only based on equality. You can do more complex things.
*   This RS is used by the Deployment.

A deployment is a declaration that allows you to do app `deployments` and `updates`.

When using the deployment object, you definte the `state` of your application. Kubernetes will then make sure the clusters matches your desired state.

Just using the replication controller or replication set might be cumbersome to deploy apps.

With a deployment object you can:

1.  Create a deployment (e.g. deploying an app)
2.  Update a deployment (e.g. new version)
3.  Do rolling updates (zero downtime deployments)
4.  Roll back
5.  Pause/resume a deployment (ie rollout to only certain percentage of pods)

An example of a deployment:

```yaml
# deployment-helloworld.yml
apiVersion: extensions/v1beta1
kind: Deployment # Changed from Pod
metadata:
  name: helloworld-deployment
spec: # Replation controller also has a spec
  replicas: 3 # set two pod replicas
  template:
  # stand Pod metadata and spec
  metadata:
    labels:
    app: helloworld
  spec:
    # The containers are listed here
    containers:
    - name: k8s-demo
      image: okeeffed/docker-demo
      ports:
      - containerPort: 3000
```

### Useful commands

| Command                                                                | Description                                 |
| ---------------------------------------------------------------------- | ------------------------------------------- |
| kubectl get deployments                                                | Get info on current deployments             |
| kubectl get rs                                                         | Get info about the replica set              |
| kubectl get pods --show-labels                                         | Get pods + labels attached to pods          |
| kubectl rollout status deployment/helloworld-deployment                | Get deployment status                       |
| kubectl set image deployment/helloworld-deployment k8s-demo=k8s-demo:2 | Run k8s-demo with the image label version 2 |
| kubectl edit deployment/helloworld-deployment                          | Edit the deployment object                  |
| kubectl rollout status deployment/helloworld-deployment                | Get the status of the rollout               |
| kubectl rollout history [deployment]                                   | Get the rollout history                     |
| kubectl rollout undo [deployment]                                      | Rollback to previous version                |
| kubectl rollout undo [deployment] --to-revision=n                      | Rollback to previous version                |

### Demo: Deployment notes

Again, get pods will sho the pods with appended suffixes auto-determined by Kubernetes.

You can verify rollout status using the commands above.

## Services

Pods themselves are very dynamic, they come and go on the Kubernetes cluster.

*   When using a `Replication Controller`, pods are termined and created during scaling operations.
*   Wehn using `Deployments`, when updating the image version, pods are terminated and new pods take the place of older pods.

That's why Pods should never be accessed directly, but always through a Service.

A service is the `logical bridge` between the "mortal" pods and other services or end-users.

When using the `kubectl expose` command, you create a service for you pod to be accessed externally.

Creating a service will create an endpoint for your pod(s):

1.  A ClusterIP: a virtual IP address only reachable from within the cluster (this is default)
2.  A NodePort: a port that is the same on each node that is also reachable externally.
3.  A LoadBalancer: created by the Cloud provider that will route external traffic on every node on the NodePort

The options shown only allow virtual IPs and ports.

There is also a possibility to use `DNS Names`

The `ExternalName` can provide a DNS name for the service e.g. for service discovery using DNS.

This **only** works when the DNS add-on is enabled.

```yaml
# helloworld-service.yml
apiVersion: v1
kind: Service
metadata:
  name: helloworld-service
spec:
  ports: # specify the ports the service uses
  - port: 31001
    nodePort: 31001
    # name below defined from pod
    targetPort: nodejs-port
    protocol: TCP
  selector:
  # service for this app
  app: helloworld
  type: NodePort
```

## Tags

Similar to Labels for AWS

For example, you can label your objects.

For instance: Key could be `environment`, and the value could be `dev`/`staging`/`qa`/`prod`.

Maybe you could also tag the department that is comes from etc.

Labels are not unique. You can then use `label selectors` to match labels.

Eg. a particular pod can only run on a node label with "evironment" equals "development".

More complex matching: "environment" in "development" or "qa".

You can also use labels to tag nodes. Once tagged, you can use labels selectors to let pods only run on specific nodes.

There are two steps required to run a pod on a specific set of nodes:

1.  First you tag the node
2.  Then you add a `nodeSelector` to your pod configuration

```
kubectl label nodes node1 hardware=high-spec
kubectl label nodes node1 hardware=low-spec
```

Secondly, add a pod that uses those labels:

```yaml
# pod-helloworld.yml
apiVersion: v1
kind: Pod
metadata:
  name: nodehelloworld.example.com
  labels:
  app: helloworld
spec:
  # The containers are listed here
  containers:
  - name: k8s-demo
    image: okeeffed/docker-demo
    ports:
    - containerPort: 3000
  nodeSelector:
  hardware: high-spec
```

### Demo: Using tags

It only really makes sense if you have multiple nodes (doesn't really make sense on minikube).

## Healthchecks

If the application malfunctions, the pod and container may still be running but the application may no longer be running. This is where health checks come in.

Two types:

1.  Running a command in the container periodically
2.  Periodic checks on a URL

The typical prod application behind a load balancer should always have health checks implemented in some way to ensure availability and resiliency.

Below you can see where the healthcheck is. You can check the port or container port name.

```yaml
# pod-helloworld.yml
apiVersion: v1
kind: Pod
metadata:
  name: nodehelloworld.example.com
  labels:
  app: helloworld
spec:
  # The containers are listed here
  containers:
  - name: k8s-demo
    image: okeeffed/docker-demo
    ports:
    - containerPort: 3000
    # @@@ This is the health check
    livenessProbe:
    httpGet:
      path: /
      port: 3000
    initialDelaySeconds: 15
    timeoutSeconds: 30
```

## Secrets

A way to distribute credentials, keys, passwords or secret data to the pods.

Kubernetes itself uses this Secrets mechanism to provide the credentials to access the internal API.

You can use the same mechanism to provide secrets to your application.

`secrets` is just one way to provide secrets that is native to Kubernetes. There are still other ways to do this.

### How to use them

*   Use as env vars
*   Use as a file in a pod
    *   This requires volumes to be mounted
    *   In this volume you have files
    *   This can be use for things like dotenv files
*   You can use an external image to pull secrets (private image registry)

Generating:

```bash
echo -n "root" > ./username.txt
echo -n "password" > ./password.txt
kubectl create secret generic db-user-pass --from-file=./username.txt --from-file=./password.txt
# > secret "db-user-pass" created
```

A secret can also be a SSH key or SSL cert.

```bash
kubectl create secret generic ssl-cert --from-file=ssh-privatekey=~/.ssh/id_rsa --ssl-cert-=ssl-cert=mysslcert.crt
```

To generate secrets using yaml defs:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  password: pwd
  username: usr
```

Then, you can generate it as base64 like so:

```bash
echo -n "password" | base64
# > pwd

kubectl create -f secrets-db-secret.yml
# > secret "db-secret" created
```

To create a pod that uses secrets:

```yaml
# pod-helloworld.yml w/ secrets
apiVersion: v1
kind: Pod
metadata:
  name: nodehelloworld.example.com
  labels:
  app: helloworld
spec:
  # The containers are listed here
  containers:
  - name: k8s-demo
    image: okeeffed/docker-demo
    ports:
    - containerPort: 3000
    # @@@ This are the envs
    env:
    - name: SECRET_USERNAME
      valueFrom:
      secretKeyRef:
        name: db-secret
        key: username
    - name: SECRET_PASSWORD
      [...]
```

Alternatively when providing in a file:

```yaml
# pod-helloworld.yml w/ secrets
apiVersion: v1
kind: Pod
metadata:
  name: nodehelloworld.example.com
  labels:
  app: helloworld
spec:
  # The containers are listed here
  containers:
  - name: k8s-demo
  image: okeeffed/docker-demo
  ports:
  - containerPort: 3000
  # @@@ This are the envs in a volume mount
  volumeMounts:
  - name: credvolume
    mountPath: /etc/creds
    readOnly: true
  volumes:
  - name: credvolume
  secret:
    secretName: db-secrets
```

### Demo: Wordpress Secrets

This demo ends up creating a secrets file, a pod definition and a service to expose the wordpress pod.

However, note that deleting the current setup will result in a container restarting to maintain state, but when that happens the WordPress site has to be re-installed because the data was not saved. The solution for this will be in the volumes lab.

## Web UI

Kubernetes comes with a `Web UI` you can use instead of kubectl commands.

You can use it to:

1.  Get an overview of running applications on your cluster
2.  Creating and modifying individual Kubernetes resources and workloads (like kubectl create and delete)
3.  Retrieve info on state or resources.

You can reach this UI at `https://<kubernetes-master>/ui`

If you cannot access it, you can install it manually:

```bash
kubectl create -f https://rawgit.com/kubernetes/dashboard/master/src/deploy/kubernetes-dashboard.yaml
# If the password is asked
kubectl config view

# If you're on minikube
minikube dashboard # or --url for the url
```

### Demo: Web UI

Using the web ui you can see some really interesting info and graphs on usage.

# Advanced Topics

## Service Discovery

As of Kubernetes 1.3, DNS is a `built-in` service launched automatically using the addon manager.

The addons are in the `/etc/kubernetes/addons` directory on the master node.

The service can be used within pods to find other services running on the same cluster.

Multiple containers within 1 pod don't need this service, as they can contact each other directly. A container in the same pod can just use `localhost:port`.

To make DNS work, a pod will need a `service definition`.

How can app 1 reach app 2 using DNS? The container itself can talk to the service of App 2.

If you ran the host for `app1-service` and got back 10.0.0.1, `host app2-service` could get back 10.0.0.2.

Examples from the CL

```bash
host app1-service
# has addr 10.0.0.1
host app2-service
# has addr 10.0.0.2
host app2-service.default
# app2-service.default has address 10.0.0.2
host app2-service.default.svc.cluster.local
# app2-service.default.svc.cluster.local has addr 10.0.0.2
```

The `default` stands for default namespace. Pods and services can be launched in different namespaces (to logically seperate your cluster).

So how does this resolution work?

Say we have a pod and we run `kubectl run -i -tty busybox --image=busybox --restart=Never -- sh` and the from the shell run `cat /etc/resolv.conf`, can can see that there will be a `nameserver`. If you do a lookup of the service name in this folder, you'll see why the above works with `.default` and `.default.svc.whatever`.

### Demo: Service Discovery

After creating a secrets type, pod type for a database (SQL using the secrets), and a service for exposing certain ports for the database and then deploying three replicas for a `helloworld-deployment` that also has a `index-db.js` file which we run `node index-db.js` which will have code that works on the service. The value of the `MYSQL_HOST` being set to `database-service` will resolve with the database-service.yml file where the metadata `name` is `database-service`.

Running `kubectl get pod` we should see the database plus 3 pods running for the deployment.

Running `kubectl logs [deployment-name]` will also show us the logs for that pod.

Again, remember that running `kubectl get svc` will get all the services available.

## ConfigMap

Config params that are not secret can be put in the ConfigMap.

The input is again key-value pairs.

The `ConfigMap` key-value pairs can then be read by the app using:

1.  Env variables
2.  Container commandline args in the Pod config
3.  Using volumes

It can also contain full config files eg. a webserver config file. Then that file can then be mounted using volumes where the application expects its config file.

This was you can `inject` config settings into containers without changing the container itself.

To generate a configmap using files:

```bash
$ cat << EOF > app.properties
driver=jdbc
database=postgres
lookandfeel=1
otherparams=xyz
param.with.hierarchy=xyz
EOF
$ kubectl create configmap app-config --from-file=app.properties
```

How to use it? You can create a pod that exposes the ConfigMap using a volume.

```yaml
# pod-helloworld.yml w/ secrets
apiVersion: v1
kind: Pod
metadata:
  name: nodehelloworld.example.com
  labels:
  app: helloworld
spec:
  # The containers are listed here
  containers:
  - name: k8s-demo
  image: okeeffed/docker-demo
  ports:
  - containerPort: 3000
  # @@@ This are the envs in a volume mount
  volumeMounts:
  - name: credvolume
    mountPath: /etc/creds
    readOnly: true
  # @@@ For the ConfigMap
  - name: config-volume
    mountPath: /etc/config
  volumes:
  - name: credvolume
  secret:
    secretName: db-secrets
  # @@@ For the ConfigMap
  - name: config-volume
  configMap:
    name: app-config
```

From `/etc/config` , the config values will be stored in files at `/etc/config/driver` and `/etc/config/param/with/hierarchy`.

This is an example of a pod that exposes the ConfigMap as env variables:

```yaml
# pod-helloworld.yml w/ secrets
apiVersion: v1
kind: Pod
metadata:
  name: nodehelloworld.example.com
  labels:
  app: helloworld
spec:
  # The containers are listed here
  containers:
  - name: k8s-demo
  image: okeeffed/docker-demo
  ports:
  - containerPort: 3000
  # @@@ This are the envs in a volume mount
  env:
  - name: DRIVER
    valueFrom: # where you get the value from
    configMapKeyRef: # ensuring the ref comes from the configMap
    name: app-config
    key: driver
  - name: DATABASE
  [ ... ]
```

### Demo: Config Map

Using an example for a reverse proxy config for NGINX:

```
server {
  listen  80;
  server_name localhost;

  location / {
  proxy_bind 127.0.0.1;
  proxy_pass http://127.0.0.1:3000;
  }

  error_page  500 502 503 504 /50x.html;
  location = /50x.html {
  root    /usr/share/nginx/html;
  }
}
```

We could then create this config map with `kubectl create configmap nginx-config --from-file=reverseproxy.conf`.

```yaml
# pod-helloworld.yml w/ secrets
apiVersion: v1
kind: Pod
metadata:
  name: hellonginx.example.com
  labels:
  app: hellonginx
spec:
  # The containers are listed here
  containers:
	- name: nginx
	image: nginx:1.11
	ports:
	- containerPort: 80
	# @@@ The import conf stuff
	volumeMounts:
	- name: config-volume
		mountPath: /etc/nginx/conf.d
  - name: k8s-demo
  image: okeeffed/docker-demo
  ports:
    - containerPort: 3000
  # @@@ The important mounting
  volumes:
	- name: config-volume # @@@ this is referred to above in volumeMounts
	configMap:
		name: nginx-config
		items:
		- key: reverseproxy.conf
		path: reverseproxy.conf
```

After then also creating the service, we can grab the minikube service url and use curl to get info on that request. From here, would could see that it is `nginx` answer the request and transferring it to the Node port.

If we then want to jump into the nginx container to see what is going on, we can run `kubectl exec -i -t helloworld-nginx -c nginx -- bash` (-c flag to specify container) and run `ps x` to see the processes and we can `cat /etc/nginx/conf.d/reverseproxy.conf`.

At this stage, we can enable SSL for NGINX.

## Ingress Controller

Ingress a solution since Kub 1.1 that allows inbound connections to the cluster.

It's an alternative to the external `LoadBalancer` and `nodePorts`. It allows you to easily expose services that need to be accessible from outside to the cluster.

With ingress you can run your own ingress controller (basically a loudbalancer) within the Kub Cluster.

There are default ingress controller available, or you can write your own ingress controller.

How does it work? If you connect over 80/443 you will first hit the `Ingress Controller`. You can use the NGINX controller that comes with Kubernetes. That controller will the dirrect all the traffic.

The `ingress rules` could define that if you go to `host-x.example.com` you go to `Pod 1` etc. You can even redirect slash URLs specifically.

To create an Ingress Controller:

```yaml
# ingress-controller.yml w/ secrets
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: helloworld-rules
spec:
  # @@@ Setting the important rules
  rules:
	- host: helloworld-v1.example.com
	  http:
		paths:
		  - path: /
		  backend:
			serviceName: helloworld-v1
			servicePort: 80
    - host: helloworld-v2.example.com
	  http:
		paths:
		  - path: /
		  backend:
			serviceName: helloworld-v2
			servicePort: 80
```

### Demo: Ingress Controller

In the example, the ingress controller is a `Replication Controller` to ensure that there is always one up and running.

After deploying, if we curl with the -H host flag with `helloworld-v1.whatever.com` and v2 respectively, it would have the ingress controller route to each server.

## External DNS

On public cloud providers, you can use the ingress controller to **reduce the cost of your LoadBalancers**.

- You could use 1 LoadBalancer that captures all the external traffic and send it to the ingress controller.
- IngCont can be configured to route the different traffic to all your apps based on HTTP rules.
- Only works for HTTP(s)-based apps

The External DNS tool will automatically create the necessary DNS records in your external DNS server (like route53).

- For every hostname used in ingress, it'll create a new record to send traffic to load balancer.
- The major DNS providers are supported: Route53, Google CloudDNS, CloudFlare etc.

![Diagram](https://res.cloudinary.com/gitgoodclub/image/upload/v1539998347/Screen_Shot_2018-10-20_at_12.18.14_pm.png)

## Volumes

How can we run stateful apps?

Volumes in kubernetes allow you to store data outside of the container. So far, all the applications have been stateless for this reason. This can be done with external services like a database, caching server (eg MySQL, AWS S3).

Persistent Volumes in Kubernetes allow you to attach a volume to a container that exists even when the container stops. Volumes can be attached using different volume plugins. Eg local volume, EBS Storage etc.

### Using EBS Storage

With this, we can keep state. You could run a `MySQL` database using persistent volumes, although this may not be ready for production yet.

The use case is that if your node stops working, the pod can be rescheduled on another node, and the volume can be attached to the new node.

To use volumes, you first need to create the volume:

```bash
aws ec2 create-volume --sze 1- --region us-east-1 --availability-zone us-east-1 --volume-type gp2
```

Next, we need to create a pod with a volume def:

```yaml
# pod-helloworld.yml w/ secrets
apiVersion: v1
kind: Pod
metadata:
  name: hellonginx.example.com
  labels:
  app: hellonginx
spec:
  # The containers are listed here
  containers:
	- name: k8s-demo
	image: okeeffed/k8s-demo
	volumeMounts:
	- name: myvolume
	  mountPath: myvolume
  # @@@ The important mounting
  volumes:
	- name: myvolume # @@@ this is referred to above in volumeMounts
	  awsElasticBlockStore:
	    volumeID: vol-9835id
```

### Demo: Volumes

Using Vagrant for kops, we can first create a volume using the above mentioned command.

After receiving a response, you can replace the .yml pod definition config file to attach that volumeID. Once the deployment is created and deployed. 

- After create and confirmation, we can get the pod name `kubectl get pod` and attach `kubectl exec helloworld-deployment-923id -i -t -- bash` and then run `ls -ahl /myvol/` to check for volume.
- If we run `echo 'test' > /myvol/myvol.txt` and `echo 'test 2' > /test.txt`, we know that the latter file will not persist if the pod is restarted/rescheduled.
- If we run `kubectl drain ip --force` we can drain the pod. Assuming this is a `Replication Controller` or `Deployment`, another container should spin up.
-  Once that pod is attached to another node, we can also attach back to the pod on the new node with the `exec` command and we can confirm that the `/myvol/myvol.txt` is still there, although the other `/test.txt` is no longer there since it was not saved to the volume.

If you need to remove the ebs volume, you can run `aws ec2 delete-volume --volume-id vol-[id]`.

## Volume Provisioning

The kubs plugins have the capability to `provision storage` for you. The AWS Plugin can for instance `provision storage` for you by creating the volumes in AWS before attaching them to a node.

This is done using the `StorageClass` object -- this is beta for the course but should be stable soon.

To use autoprovisioing, create the following:

```yaml
# storage.yml
kind: StorageClass
apiVersion: storage.k8s.io/v1
metadata:
  name: standard
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp2
  zone: ap-southeast-1
```

Next, you can create a volume claim and specify the size:

```yaml
# my-volume-claim.yml
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: myclaim
  annotations:
    volume.beta.kubernetes.io/storage-class: "standard"
spec:
  accessModes:
	- ReadWriteOnce
  resources:
	requests:
	  storage: 8Gi
```

Finally, if launching a pod:

```yaml
# pod-helloworld.yml w/ secrets
apiVersion: v1
kind: Pod
metadata:
  name: mypod
spec:
  # The containers are listed here
  containers:
	- name: myfrontend
	image: nginx
	volumeMounts:
	- name: mypd
	  mountPath: '/var/www/html'
  # @@@ The important mounting
  volumes:
	- name: mypd # @@@ this is referred to above in volumeMounts
	  persistentVolumeClaim:
	    claimName: myclaim # @@@ refers to my claim from the previous type definition
```

## Demo: Using Wordpress with Volumes

After declaring a `StorageClass` class from a yaml file and a `PersistentVolumeClaim` class.

```yaml
# storage.yml
kind: StorageClass
apiVersion: storage.k8s.io/v1beta1
metadata:
  name: standard
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp2
  zone: eu-west-1a
```

```yaml
# PV Claim
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: db-storage
  annotations:
    volume.beta.kubernetes.io/storage-class: "standard"
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 8Gi
```

There is also a simple ReplicationController for the Wordpress DB. In the spe for the container for mysql, we declare where the `mountPath` will be.

```yaml
apiVersion: v1
kind: ReplicationController
metadata:
  name: wordpress-db
spec:
  replicas: 1
  selector:
    app: wordpress-db
  template:
    metadata:
      name: wordpress-db
      labels:
        app: wordpress-db
    spec:
      containers:
      - name: mysql
        image: mysql:5.7
        args:
          - "--ignore-db-dir=lost+found"
        ports:
        - name: mysql-port
          containerPort: 3306
        env:
          - name: MYSQL_ROOT_PASSWORD
            valueFrom:
              secretKeyRef:
                name: wordpress-secrets
                key: db-password
        volumeMounts:
        - mountPath: "/var/lib/mysql"
          name: mysql-storage
      volumes:
        - name: mysql-storage
          persistentVolumeClaim:
            claimName: db-storage
```

Having a makeshift secrets file for secrets:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: wordpress-secrets
type: Opaque
data:
  db-password: cGFzc3dvcmQ=
  # random sha1 strings - change all these lines
  authkey: MTQ3ZDVhMTIzYmU1ZTRiMWQ1NzUyOWFlNWE2YzRjY2FhMDkyZGQ4OA==
  loggedinkey: MTQ3ZDVhMTIzYmU1ZTRiMWQ1NzUyOWFlNWE2YzRjY2FhMDkyZGQ4OQ==
  secureauthkey: MTQ3ZDVhMTIzYmU1ZTRiMWQ1NzUyOWFlNWE2YzRjY2FhMDkyZGQ5MQ==
  noncekey: MTQ3ZDVhMTIzYmU1ZTRiMWQ1NzUyOWFlNWE2YzRjY2FhMDkyZGQ5MA==
  authsalt: MTQ3ZDVhMTIzYmU1ZTRiMWQ1NzUyOWFlNWE2YzRjY2FhMDkyZGQ5Mg==
  secureauthsalt: MTQ3ZDVhMTIzYmU1ZTRiMWQ1NzUyOWFlNWE2YzRjY2FhMDkyZGQ5Mw==
  loggedinsalt: MTQ3ZDVhMTIzYmU1ZTRiMWQ1NzUyOWFlNWE2YzRjY2FhMDkyZGQ5NA==
  noncesalt: MTQ3ZDVhMTIzYmU1ZTRiMWQ1NzUyOWFlNWE2YzRjY2FhMDkyZGQ5NQ==
```

To open up the service for the port:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: wordpress-db
spec:
  ports:
  - port: 3306
    protocol: TCP
  selector:
    app: wordpress-db
  type: NodePort
```

Opening up the web and web service:

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: wordpress-deployment
spec:
  replicas: 2
  template:
    metadata:
      labels:
        app: wordpress
    spec:
      containers:
      - name: wordpress
        image: wordpress:4-php7.0
        # uncomment to fix perm issue, see also https://github.com/kubernetes/kubernetes/issues/2630
        # command: ['bash', '-c', 'chown www-data:www-data /var/www/html/wp-content/uploads && apache2-foreground']
        ports:
        - name: http-port
          containerPort: 80
        env:
          - name: WORDPRESS_DB_PASSWORD
            valueFrom:
              secretKeyRef:
                name: wordpress-secrets
                key: db-password
          - name: WORDPRESS_AUTH_KEY
            valueFrom:
              secretKeyRef:
                name: wordpress-secrets
                key: authkey
          - name: WORDPRESS_LOGGED_IN_KEY
            valueFrom:
              secretKeyRef:
                name: wordpress-secrets
                key: loggedinkey
          - name: WORDPRESS_SECURE_AUTH_KEY
            valueFrom:
              secretKeyRef:
                name: wordpress-secrets
                key: secureauthkey
          - name: WORDPRESS_NONCE_KEY
            valueFrom:
              secretKeyRef:
                name: wordpress-secrets
                key: noncekey
          - name: WORDPRESS_AUTH_SALT
            valueFrom:
              secretKeyRef:
                name: wordpress-secrets
                key: authsalt
          - name: WORDPRESS_SECURE_AUTH_SALT
            valueFrom:
              secretKeyRef:
                name: wordpress-secrets
                key: secureauthsalt
          - name: WORDPRESS_LOGGED_IN_SALT
            valueFrom:
              secretKeyRef:
                name: wordpress-secrets
                key: loggedinsalt
          - name: WORDPRESS_NONCE_SALT
            valueFrom:
              secretKeyRef:
                name: wordpress-secrets
                key: noncesalt
          - name: WORDPRESS_DB_HOST
            value: wordpress-db
        volumeMounts:
        # shared storage for things like media
        - mountPath: /var/www/html/wp-content/uploads
          name: uploads
      volumes:
      - name: uploads
        nfs:
          server: eu-west-1a.fs-5714e89e.efs.eu-west-1.amazonaws.com
          path: /
```

```yaml
apiVersion: v1
kind: Service
metadata:
  name: wordpress
spec:
  ports:
  - port: 80
    targetPort: http-port
    protocol: TCP
  selector:
    app: wordpress
  type: LoadBalancer
```

With the AWS Commandline, you can create a file system and mount target. For the fs, run `aws efs create-file-system --creation-token` and then after grabbing the file-system-id and subnet-id, you can run `aws efs create-mount-target --file-system-id <id> --security-groups <sg>`. Ensure in the above `nfs` volume you update the fs id.

## Pod Presets

Pod presets can inject information into pods at runtime.

- Used to inject Kubernetes Resources like Secrets, ConfigMaps, Volumes and Environment variables. 

Imagine you have 20 apps to deploy, all with a specific credential. You can edit the 20 specs and add the creds, or you can use presets to create 1 **Preset Object**, which will **inject an environment variable or config file to all matching pods.**

When injecting env vars and volume mounts, the Pod Preset will apply the changes to ll containers within the pod.

```yaml
# PodPreset File
apiVersion: settings.k8s.io/v1alpha1
kind: PodPreset
metadata:
  name: allow-database
spec:
  selector:
    matchLabels:
      role: frontend
  env:
    - name: DB_PORT
      value: '6379'
  volumeMounts:
    - mountPath: /cache
      name: cache-volume
  volumes:
    - name: cache-volume
      emptyDir: {}
```

```yml
# Pod file using PodPreset
apiVersion: v1
kind: Pod
metadata:
  name: website
  labels:
    app: website
    role: frontend
spec:
  containers:
    - name: website
      image: nginx
      ports:
        - containerPort: 80

```

```bash
$ kubectl create -f pod-preset.yml
$ kubectl create -f pod.yml
```



## Stateful Sets - (formerly Pet Sets)

Stateful dist apps - new feature from Kub 1.3.

It is introduced to be able to run `stateful applications` that need:

1.  A stable pod hostname (instead of podname-randomstr) - will have an index ie podname-0, podname-1 etc.
2.  Stateful app requires multi pods with vols based on their ordinal number. Currently deleting and/or scaling a PetSet down will not deleted volumes associated.

A pet set will allow your stateful app to use DNS to find out peers. One running node of the Pet Set is called a `Pet`. Using Pet Sets you can run for instance 5 cassandra nodes on Kubs named cass-1 until cass-5.

The big difference is that you don't want to connect just any specific service, you want to make sure pod whatever definitely connects to another pod.

This pet set also allows order to startup and teardown of pets.

Still a lot of work for future work.

## Daemon Sets

*   Ensure that every single node in the Kubernetes cluster runs the same pod resource. This is useful to ensure a certain pod is running on every single kubernetes node.
*   When a node is added to the cluster, a new pod will be started automatically
*   Same when a node is removed, the pod will not be rescheduled on another node

Use cases:

1.  Logging aggregators
2.  Monitoring
3.  Load Balancers/Reverse Proxies/API Gateways

## Resource Usage Monitoring

- Heapster enables **Container Cluster Monitoring** and **Performance Analysis**.
- It's providing a monitoring platform for Kubernetes.
- It's a prerequisite if you want to do **pod auto-scaling** in Kubernetes.
- Heapster exports cluster metrix **via REST endpoints**.
- You can use different backends with Heapster.
  - Demo uses **InfluxDB**, but Kafka is also possible.
- Visualisations can be shown with Grafana. 
  - Kubernetes dashboard will also show graphs once monitoring is enabled.
- All these technologies can be started in pods
- The **yaml files** can be found on the github repo of Heapster.

Since Heapster is now deprecated, you would have to use `metrics-server` or an alternative like **Prometheus**.

## Horiztonal Pod Autoscaling

[Link to main Kubernetes site](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/)

- Kubernetes has the possibility to autoscale pods based on metrics.
- Kubernetes can autoscale Deployment, Replication Controller or ReplicaSet.
- In Kubernetes 1.3 **scaling based on CPU** usage is possible out of the box.
  - Application based metrics are also available (like queries per second or average request latency).
    - To enable, the cluster has to be started with env var ENABLE_CUSTOM_METRICS to be true.

- It will periodically query the utilization for the targeted pods.
  - By default 30 sec, can be changed using the `--horizontal-pod-autoscaler-sync-period`flag when launching the controller manager.
- Requires the metrics system to work.

```yaml
apiVersion: autoscaling/v1
kind: HorizontalPodAutoscaler
metadata:
  name: hpa-example-autoscaler
spec:
  scaleTargetRef:
    apiVersion: extensions/v1beta1
    kind: Deployment
    name: hpa-example
  minReplicas: 1
  maxReplicas: 10
  targetCPUUtilizationPercentage: 50
```

## Affinity/Anti-Affinity

- The affinity/anti-affinity feature allows you to do **more complex scheduling** than the nodeSelector and also **works on Pods**.
  - The language is **more expressive**.
  - You can create **rules that are not hard requirements**, but rather a **preferred rule**, meaning that the scheduler will stil be able to schedule your pod, even if the rules cannot be met.
  - You can create rules to take other pod labels into account
    - Example, you can make sure two different pods are never on the same node.
- Kubernetes can do **node affinity** and **pod affinity/anti-affinity**.
  - Node affinity is similar to the nodeSelector.
  - Pod affinity/anti-affinity allows you to create rules **how pods should be scheduled taking into account other running pods**.
  - Affinity/anti-affinity mechanism is only relevant during scheduling, once a pod is running, it'll need to be recreated to apply the rules again.
- There are currently 2 types you can use for node affinity:
  - 1) requiredDuringSchedulingIgnoredDuringExecution
  - 2) preferredDuringSchedulingIgnoredDuringExecution
- The **first one** sets a **hard requirement** (like the nodeSelector).
  - The rules must be met before the pod can be scheduled.
- The **second type** will try to enforce the rule, but it will not guarantee it.
  - Even if the rule is not met, the pod can still be scheduled, it's a soft requirement, a preference.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: <% helloworld-deployment %>
spec:
  replicas: 2
  template:
    metadata:
      labels:
        app: <% app_name %>
    spec:
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
              - matchExpressions:
                  - key: env
                    operator: In
                    values:
                      - dev
          preferredDuringSchedulingIgnoredDuringExecution:
            - weight: 1 # higher the weighting, the more emphasis on rule
              preference:
                matchExpressions:
                  - key: team
                    operator: In
                    values:
                      - engineering-project1
      containers:
        - name: k8s-demo
          image: <% image_name %>
          port:
            - containerPort: 3000
```

When scheduling, Kubernetes will score every node by summarizing the weightings per node.

 - Eg two different rules with weights 1and 5.
    - If both rules match, score 6.
    - If only rule with weight 1 matches, score 1.
 - The node that has the highest total score, that's where the pod will be scheduled on.

## 3.13 Interpod Affinity/Anti-Affinity

- This allows you to influence scheduling based on the labels of other pods that are **already running** on the cluster.
- Pods belong to a namespace, so rules apply to namespace (default to pod name).

Two types:

1. requiredDuringSchedulingIgnoredDuringExecution
2. preferredDuringSchedulingIgnoredDuringExecution

The required type create rules that must be met for the pod to be scheduled, the preferred type is a "soft" type and the rules may be met.

A good use case for **pod affinity is co-located pods**.

- Example, you have an app that uses redis as cache and you want to have the Redis pod on the same node as the app itself.
- Another use-case is to co-locate pods within the **same availability zone**.
- When writing your pod affinity and anti-affinity rules, you need to specify a **topology domain**, called **topologyKey** in the rules.
  - Key refers to a node label.
  - If affinity rule matches, **new pod** will only be scheduled on **nodes** that have the **same topologyKey** value as the **current running pod**.

![Interpod Affinity and anti-affinity](https://res.cloudinary.com/gitgoodclub/image/upload/v1540165720/Screen_Shot_2018-10-22_at_10.48.04_am.png)

![Zone topology](https://res.cloudinary.com/gitgoodclub/image/upload/v1540165853/Screen_Shot_2018-10-22_at_10.50.27_am.png)

### Anti-affinity

You can use anti-affinity to make sure a **pod is only scehduled once on a node**.

- Example 3 nodes and you want to schedule 2 pods but they shouldn't be on the same node.
- Pod anti-affinity allows you to create a rule that say to **not schedule on the same host if a pod label matches**.

![Anti-affinity](https://res.cloudinary.com/gitgoodclub/image/upload/v1540165853/Screen_Shot_2018-10-22_at_10.50.27_am.png)

### Topology operators

- In
- NotIn
- Exists
- DoesNotExist

Affinity requires a substantial amount of processor. Take this into account if you have a lot of rules.

```yaml
# pod-affinity.yml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: pod-affinity-1
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: pod-affinity-1
    spec:
      containers:
      - name: k8s-demo
        image: wardviaene/k8s-demo
        ports:
        - name: nodejs-port
          containerPort: 3000
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: pod-affinity-2
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: pod-affinity-2
    spec:
      affinity:
        podAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            - labelSelector:
                matchExpressions:
                  - key: "app"
                    operator: In
                    values:
                    - pod-affinity-1
              topologyKey: "kubernetes.io/hostname" # this could be change for zoning
      containers:
      - name: redis
        image: redis
        ports:
        - name: redis-port
          containerPort: 6379
```

We can then check this is fine by running `kubectl get pod -o wide` to see the Node the pods are running on.

As for anti-affinity:

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: pod-affinity-1
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: pod-affinity-1
    spec:
      containers:
      - name: k8s-demo
        image: wardviaene/k8s-demo
        ports:
        - name: nodejs-port
          containerPort: 3000
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: pod-affinity-2
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: pod-affinity-2
    spec:
      affinity:
        podAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            - labelSelector:
                matchExpressions:
                  - key: "app"
                    operator: In
                    values:
                    - pod-affinity-1
              topologyKey: "kubernetes.io/hostname"
      containers:
      - name: redis
        image: redis
        ports:
        - name: redis-port
          containerPort: 6379
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: pod-affinity-3
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: pod-affinity-3
    spec:
      affinity:
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            - labelSelector:
                matchExpressions:
                  - key: "app"
                    operator: In
                    values:
                    - pod-affinity-1
              topologyKey: "kubernetes.io/hostname"
      containers:
      - name: k8s-demo
        image: wardviaene/k8s-demo
        ports:
        - name: nodejs-port
          containerPort: 3000
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: pod-affinity-4
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: pod-affinity-4
    spec:
      affinity:
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            - labelSelector:
                matchExpressions:
                  - key: "app"
                    operator: In
                    values:
                    - pod-affinity-1
                    - pod-affinity-3
              topologyKey: "kubernetes.io/hostname"
      containers:
      - name: k8s-demo
        image: wardviaene/k8s-demo
        ports:
        - name: nodejs-port
          containerPort: 3000
---
```

![Resulting run with the affinity/anti-affinity](https://res.cloudinary.com/gitgoodclub/image/upload/v1540170357/Screen_Shot_2018-10-22_at_12.05.28_pm.png)

Note that there are differences between **preferred** and **required**. With preferred, you may still have the pod scheduled in events we don't necessarily want as a best case scenario.

## 3.14 Taints and Tolerations

Tolerations is the opposite of node affinity.

- Allows a node to **repels a set of pods**.
- **Taints mark** a node, tolerations are applied to pods to influence the scheduling of a pod.
- One use case for taints is to make sure that when you create a new pod, they're not scheduled on the master (**node-role.kubernetes.io/master:NoSchedule**). This is the default.

```bash
# To add a taint
$ kubectl taint nodes node1 key=value:NoSchedule # This will make sure that no pods will be scheduled on node1 as long as they don't have a matching toleration
```

```yaml
# tolerations.yml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: tolerations-1
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: tolerations-1
    spec:
      containers:
      - name: k8s-demo
        image: wardviaene/k8s-demo
        ports:
        - name: nodejs-port
          containerPort: 3000
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: tolerations-2
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: tolerations-2
    spec:
      tolerations:
      - key: "type"
        operator: "Equal"
        value: "specialnode"
        effect: "NoSchedule"
      containers:
      - name: k8s-demo
        image: wardviaene/k8s-demo
        ports:
        - name: nodejs-port
          containerPort: 3000
```

### Tolerations usage

```bash
# Taint a node
$ kubectl taint nodes NODE-NAME type=specialnode:NoSchedule

# Taint with NoExecute
$ kubectl taint nodes NODE-NAME testkey=testvalue:NoExecute
```

### Keys

- Operators
  - **Equal** (providing key + value)
  - **Exists** (only providing a key, checking only whether a key exists)
- Effects
  - **NoSchedule** (hard requirement that apod will not be scheduled unless there is a matching toleration)
  - **PreferNoSchedule** (avoid placing a pod that doesn't have a matching tolerationg, but it's not a hard requirement)
  - **NoExecute** (evict pods with non-matching tolerations)
    - **tolerationSeconds** key can be applied with a time in seconds for how long a node can run before it is evicted.

### Use Cases

- Existing node taints for **master nodes**.
- Taint nodes that are **dedicated** for a team or user.
- Node for **specific hardware** (ie GPUs) you can taint them to void running non-specific applications on those nodes.
- Alpha but soon-to-be beta feature is to **taint nodes by condition**.

### Useful Taints and Tolerations

- **node.kubernetes.io/not-ready**
- **node.kubernetes.io/unreachable**
- **node.kubernetes.io/out-of-disk**
- **node.kubernetes.io/memory-pressure**
- **node.kubernetes.io/disk-pressure**
- **node.kubernetes.io/network-unavailable**
- **node.kubernetes.io/unschedulable**

## 3.15 Customer Resource Definitions (CRDs)

- Let's you extend Kubernetes API.
- Resources are the endpoints in the Kubernetes API that store collections of API Objects (ie Deployment, LoadBalancer).
- Operators use CRDs to extend the Kubernetes API with their own functionality.

## 3.16 Operators

An **Operator** is a method of **packaging, deploying and managing** a Kubernetes Application.

It puts **operational knowledge** in an application.

- Brings the user **closer to the experience of managed cloud services**, rather than having to know all the specifics of an application deployed to Kubernetes.
- Once an Operator is deployed, it can be **managed using Custom Resource Definitions** (arbitraty types that extend the Kubernetes API).
- It also provides a great way to deploy Stateful applications to Kubernetes.
- There are operators for Prometheus, Valut, Rook (storage), MySQL, PostgresSQL and so on.

### PostgreSQL Operator Demo

If you just deploy a PostgreSQL container, it'd only start the database. But if you're going to use this **operator**, it'll allow you to also **create replicas, initiate a failover, create backups, scale**.

- An operator contains a lot of the **management logic** that you as an administrator or user might want, rather than having to implement it yourself.

## 4. Kubernetes Administration

![Kubernetes Master Overview](https://res.cloudinary.com/gitgoodclub/image/upload/v1540175278/Screen_Shot_2018-10-22_at_1.26.57_pm.png)

- When you deploy a new Pod, the information is stored in `etcd`.
- Schedular talks to REST api.
- REST api is used to handle tasks.
  - Interfaces with Kubelets on the nodes.

## 4.1 Resource Quotas

- Resource management is useful when giving access to a person or a team.
- You don't want one person or team **taking up all the resources** (e.g. CPU/Memory) of the cluster.
- You can divide the cluster into **namespaces** and enable resource quotas on it.
  - You can do this using the **ResourceQuota** and **ObjectQuota** objects.
- Each container can specify **request capacity** and **capacity limits**.
  - **Request capacity** is an **explicit request** for resources.
    - The scheduler can use the **request capacity** to make decisions on where to put the pod on.
    - You can see it as a **minimum amount of resources the pod needs**.
  - **Resource limit** is a limit imposed to the container.
    - Container will not be able to utilize more resources than specified.

### Resource Quota Examples

- You run a **deployment** with a **pod** with a **CPU resource** request of **200m**. (200 millicpu/milliocores).
- 200m = 0.2 = 20% of CPU core of running node.
  - If node has 2 cores, still 20% of a single core.
- You can also put a limit eg 400m.
- Memory quotes defined in MB or GB.
- Each pod needs the capacity quota defined during creation.
  - Admin can specify default request values for pods that don't specify any values for capacity.
  - The same is valid for limit quotas.
- If resource is requested more than the allowed capacity, the server API will give an error 403 FORBIDDEN and `kubectl` will show an error.

### Resource Quote options

| Resource         | Description                                                                  |
| ---------------- | ---------------------------------------------------------------------------- |
| requests.cpu     | Sum of CPU reqs of all pos cannot exceed this value                          |
| requests.mem     | Sum of MEM reqs of all pods cannot exceed this value                         |
| requests.storage | Sum of storage reqs of all persistent volume claims cannot exceed this value |
| limits.cpu       | Sum of CPU limits of all pods cannot exceed this value                       |
| limits.memory    | Sum of MEM limits of all pods cannot exceed this value                       |

You can also set limits on:

- configmaps
- persistentvolumeclaims
- pods
- replicationcontrollers
- resourcequotas
- services
- services.loadbalancer
- services.nodeports
- secrets

## 4.2 Namespaces

Namespaces allow you to create **virtual clusters** within the same physical cluster.

- Namespaces **logically separates** your cluster.
- The standard namespace is called **"default"** and that's where all the resources are launched by default.
  - There is also **kube-system** - a namespace for kubernetes specific resources.
- Namespaces are intended when you have **multiple teams/projects** using the Kubernetes cluster.
- Resource names within namespace must be unique.
- You can divide resources of a Kubernetes cluster using namespaces.
  - You can limit resources on a per namespace basis.
  - E.g. Marketing team can only use a maximum of 10GiB of memory, 2 loadbalancers, 2 CPU cores.

### Namespace commands

```bash
$ kubectl create namespace myspace # create namespace myspace
$ kubectl get namespaces # list all namespaces
# Set default namespace to launch resources in
$ export CONTEXT=$(kubectl config view | awk '/current-context/{print $2}')
$ kubectl config set-context $CONTEXT --namespace=myspace
```

```yaml
apiVersion: 1
kind: ResourceQuota
metadata:
	name: objects-counts
	namespace: myspace
spec:
	hard:
		configmaps: "10"
		persistentvolumesclaim: "4"
		replicationcontrollers: "20"
		secrets: "10"
		services: "10"
		services.loadbalancers: "2"
```

### Demo ResourceQuotas

```yaml
# resourcequota.yml
apiVersion: v1
kind: Namespace
metadata:
  name: myspace
---
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-quota
  namespace: myspace
spec:
  hard:
    requests.cpu: "1"
    requests.memory: 1Gi
    limits.cpu: "2"
    limits.memory: 2Gi
---
apiVersion: v1
kind: ResourceQuota
metadata:
  name: object-quota
  namespace: myspace
spec:
  hard:
    configmaps: "10"
    persistentvolumeclaims: "4"
    replicationcontrollers: "20"
    secrets: "10"
    services: "10"
    services.loadbalancers: "2"
```

```yaml
# helloworld-with-quotas.yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: helloworld-deployment
  namespace: myspace
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: helloworld
    spec:
      containers:
      - name: k8s-demo
        image: wardviaene/k8s-demo
        ports:
        - name: nodejs-port
          containerPort: 3000
        resources:
          requests:
            cpu: 200m
            memory: 0.5Gi
          limits:
            cpu: 400m
            memory: 1Gi
```

```yaml
# helloworld-no-quotas.yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: helloworld-deployment
  namespace: myspace
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: helloworld
    spec:
      containers:
      - name: k8s-demo
        image: wardviaene/k8s-demo
        ports:
        - name: nodejs-port
          containerPort: 3000
```

```yaml
# default.yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: limits
  namespace: myspace
spec:
  limits:
  - default:
      cpu: 200m
      memory: 512Mi
    defaultRequest:
      cpu: 100m
      memory: 256Mi
    type: Container
```

The following commands can be used to get check resources:

```bash
$ kubectl get <% pod_name %> --namespace=myspace
$ kubectl describe <% pod_name %> --namespace=myspace
```

## 4.3 User Management

There are two user types:

1. Normal user (used to access the cluster externally) ie through kubctl.
2. Service user (which is managed by an object in Kubernetes).
   - Used to authenticate within the cluster ie from inside pod of kubelet.
   - These creds are managed like **secrets**.

### Normal Users

Auth strategies include:

- Client certificates
- Bearer Tokens 
- Authentication Proxy
- HTTP Basic Authentication
- OpenID
- Webhooks

They have the following attributes:

- Username (e.g. user123 or email@email.com)
- A UID
- Groups
- Extra fields to store extra info

After a normal user authenticates, it was hav access to everything.

- To limit, you need to configure auth.
- There are multiple offerings:
  - AlwaysAllow / AlwaysDeny
  - ABAC (Attribute-Based Access Control)
  - RBAC (Role Based Access Control)
  - Webhook (auth by remote service)

### Service Users

- Service Users are using **Service Account Tokens**.
- They are stored as **credentials using Secrets**.
  - Those Secrets are also mounted in pods to allow communication between the services.
- Service Users are **specific to a namespace**.
- They are created automatically by the API or manually using **objects**.
- Any API call **not authenticated** is considered as an **anonymous** user.

### Other notes on User Management

Auth is still a work in progress. The demo itself shows the creation of a asymmetric key and updating Minikube to allow that as the user.

## 4.4 RBAC (Role Based Access Control)

- Regulates access using **roles**.
- Allows admins to dynamically configure permission policies.
- This is what I'll use in the demo.

You add RBAC resources with `kubectl` from a yaml format file.

First, define a role, then assign users/groups to that role.

You can create roles limited to a namespace or that applies across all namespaces.

- **Role** (single namespace) and **ClusterRole** (cluster-wide).
- **RoleBinding** (single namespace) and **ClusterRoleBinding** (cluster-wide).

## 4.5 Networking

Communication topics already covered:

- Container to container: communication within a pod.
  - Through **localhost** and the **port number**.
- Pod-To-Service comms
  - Using **NodePort** and **DNS**.
- External-To-Service
  - Using **LoadBalancer**, **NodePort**.

### Pods

- The pod should always be routable.
- Kubernetes assumes that pods should be able to communicate to other pods, regardless of which node they are running.
- Kubernetes assumes that pods should be able to communicate to other pods, regardless of which node they are running.
  - Every pod has its **own IP address**.
  - Pods on different nodes need to be able to communicate to each other using those IP addresses.
    - This is implemented differently depending on your networking setup.
    - On AWS: kubenet networking (kops default).

### Kubenet Networking

- Every pod can get an IP that is **routable** using the AWS Virtual Private Network (VPC).
- The kubernetes master allocates a /24 subnet to each node (254 IP addresses).
- The subnet is added to the VPCs route table.
- There is a limit of **50 entries**, which means you can't have more than 50 nodes in a single AWS cluster.

### VPC Alternatives

Not every cloud provider has VPC-tech (GCE and Azure do).

The alternatives for things like on-prem etc are:

1. Container Network Interface (CNI)

   - Software that provides libraries/plugins for network interfaces within containers.

   - Popular solutions are **Calico, Weave** (standalone or with CNI).

2. An Overlay Network

   - **Flannel** is an easy and popular way.

## 4.6 Node Maintenance

It is the **Node Controller** that is responsible for managing the Node object.

- It assigns **IP Space** to the node when a new node is launched.
- It keeps the **node list** up to date with the available machines.
- The node controller is also monitoring the **health of the node**.
  - If a node is **unhealthy it gets deleted**.
  - Pods running on the unhealthy node will then get **rescheduled**.

### Adding a new node

When adding a new node, the **kubelet** will attempt to register itself. This is called **self-registration** and is the default behaviour.

- It allows you to **easily add more nodes** to the cluster without making API changes yourself.
- A new node object is **automatically** created with:
  - The metadata (with a name: IP or hostname).
  - Labels (e.g. cloud region / availability zone / instance size).
- Has **node condition** (e.g. Ready, OutOfDisk).
- When you want to **decomission** a node, you want to do it gracefully.
  - Drain a node before you shut it down or take it out of the cluster.

```bash
# drain a node
$ kubectl drain nodename --grace-period=600

# if node runs pods not managed by a controller but just a single pod
$ kubectl drain nodename --force
```

![Terminal draining](https://res.cloudinary.com/gitgoodclub/image/upload/v1540183374/Screen_Shot_2018-10-22_at_3.42.29_pm.png)

## 4.7 High Availability

If you are running in prod, you willwant all master services in **high availability**.

### Setup

1. **Clustering etcd:** at least run 3 etcd nodes.
2. **Replicated API servers:** with a a LoadBalancer
3. Running multiple instances of the **scheduler** and the **controllers**.
   - only one of them will be the leader, the others are on stand-by.

![HA Overview](https://res.cloudinary.com/gitgoodclub/image/upload/v1540183580/Screen_Shot_2018-10-22_at_3.46.05_pm.png)

![HA diagram](https://res.cloudinary.com/gitgoodclub/image/upload/v1540183671/Screen_Shot_2018-10-22_at_3.46.52_pm.png)

### Kops with multiple masters for HA

```bash
kops create cluster --name=... --zones=eu-west-1a,eu-west-1b,eu-west-1c --master-zones=eu-west-1a,eu-west-1b,eu-west-1c
```

This becomes more complex for volumes since EBS volumes are based within zones.

## 4.8 TLS on ELB using Annotations

You can setup **cloud specific features** (like TLS termination) on AWS LoadBalancers that you create in Kubernetes using services of type LoadBalancer.

You can do this using **annotations** to pass some flags for cloud configuration eg aws-load-balancer-ssl-cert, aws-load-balancer-backend-protocol etc.

```yaml
# helloworld-elb-tls-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: helloworld-service
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-ssl-cert: "arn:aws:acm:region:accountid:certificate/..." #replace this value
    service.beta.kubernetes.io/aws-load-balancer-backend-protocol: "http"
    service.beta.kubernetes.io/aws-load-balancer-ssl-ports: "443"
    service.beta.kubernetes.io/aws-load-balancer-connection-draining-enabled: "true"
    service.beta.kubernetes.io/aws-load-balancer-connection-draining-timeout: "60"
    service.beta.kubernetes.io/aws-load-balancer-additional-resource-tags: "environment=dev,app=helloworld"
spec:
  ports:
  - name: http
    port: 80
    targetPort: nodejs-port
    protocol: TCP
  - name: https
    port: 443
    targetPort: nodejs-port
    protocol: TCP
  selector:
    app: helloworld
  type: LoadBalancer
```



## 5. Packaging and Deploying on Kubernetes

## 5.1 Intro to Helm

Helm is the best way to find, share and use software built for Kubernetes.

- Package manager for Kubernetes.
- Helps you manage Kubernetes apps.
- Maintained by CNCF.

To use, download the Helm client.

To run, use `helm init`.

- This will installer Tiller
- If you have RBAC installed (recent clusters have it enabled by default), you'll also need to add a ServiceAccount and RBAC rules.

Helm uses a packaging format call **charts**.

- A chart is a collection of files that describe a set of Kubernetes resources.
- A single chart can deploy an app, a piece of software or a database.
- It can have depencies ie Wordpress chart requires mysql chart.
- You can also write your own chart.

### Helm commands

```bash
$ helm init # install tiller on the cluster
$ helm reset # remove tiller
$ helm install # install chart
$ helm search redis #looks for redis chart
$ helm install --name myredis stable/redis # install chart from redis search found under myredis
$ helm delete myredis # delete redis install named myredis
$ helm create <% chart_name %> # create your own chart
```

### Installing Helm

```bash
$ curl https://raw.githubusercontent.com/helm/helm/master/scripts/get > get_helm.sh
$ chmod 700 get_helm.sh
$ ./get_helm.sh
```

#### Linux Distro Install

```bash
$ wget https://kubernetes-helm.storage.googleapis.com/helm-v2.11.0-linux-amd64.tar.gz
$ tar -xzvf helm-v2.11.0-linux-amd64.tar.gz
$ sudo mv linux-amd64/helm /usr/local/bin/helm
```

### Adding to cluster

```bash
$ kubectl create -f helm-rbac.yaml
$ helm init --service-account tiller
```

## 5.2 Creating your own helm charts

This is the recommended way to deploy applications.

- Packaging the app allows you to deploy the app in 1 command.

- Helm allows for upgrades and rollbacks.

- Helm chart is also version controlled.


## 5.3 Setting up Helm Repo with S3

If you have charts stored on S3:

```bash
# Install plugin
$ helm plugin install https://github.com/hypnoglow/helm-s3.git

# Initialise s3 bucket
$ helm s3 init s3://helm-bucket/charts

# Add report to helm
$ helm repo add my-charts s3://helm-bucket/charts
```

## 6. Serverless on Kubernetes

With the serverless products, you don't need to manage the underlying functions. It can also greatly reduce costs.

Great for not worrying about many operational aspects.

You can also use functions to start applications on Kubernetes instead of containers. You can install and use any of the projects to let developers launch functions on your Kubernetes cluster.

## 6.1 Intro to Kubeless

This is a Kubernetes-native framework. It leverages Kubernetes resource to provide auto-scaling, API routing, monitoring and more.

It uses **Customer Resource Definitions** to be able to create functions.

You deploy a function with your preferred language. Once you deploy, you need to determine how it will be triggered.

## 6.2 Creating functions on Kubeless

### Installing the CLI

```bash
$ wget https://github.com/kubeless/kubeless/releases/download/v1.0.0-alpha.8/kubeless_linux-amd64.zip
$ sudo apt-get install unzip # if you need to unzip
$ unzip kubeless_linux-amd64.zip
$ sudo mv bundles/kubeless_linux-amd64/kubeless /usr/local/bin
$ rm -r bundles/
```

### Deploy kubeless

```bash
$ kubectl create ns kubeless
$ kubectl create -f https://github.com/kubeless/kubeless/releases/download/v1.0.0-alpha.8/kubeless-v1.0.0-alpha.8.yaml
```

### Deploy function on Kubernetes

```bash
kubeless function deploy myfunc --runtime nodejs6 --dependencies node-example/package.json --handler test.myfunction --from-file node-example/example.js
```

#### Useful functions

```bash
# List function
$ kubeless function ls
# Call function
$ kubeless function call myfunction --data 'this is some data'
# Expose function
$ kubectl create -f nginx-ingress-controller-with-elb.yml
# Linking the function to the ingress controller
$ kubeless trigger http create myfunction --function-name myfunction --hostname myfunction.domain.name
```

### Usage with Kafka 

```bash
# Kafka installation
export RELEASE=$(curl -s https://api.github.com/repos/kubeless/kafka-trigger/releases/latest | grep tag_name | cut -d '"' -f 4)
kubectl create -f https://github.com/kubeless/kafka-trigger/releases/download/$RELEASE/kafka-zookeeper-$RELEASE.yaml

# Trigger and publish
kubeless trigger kafka create test --function-selector created-by=kubeless,function=uppercase --trigger-topic uppercase
kubeless topic publish --topic uppercase --data "this message will be converted to uppercase"
```

## 7. Microservices

If we have multiple apps that require information from between each other, we need to start talking about the  **service mesh**. Normally between applications,  we run into the following problems:

- There is no encryption
- No retries.
- No fallover.
- No intelligent load balancer.
- No routing decisions.
- No metrics/logs/traces.
- No access control.

One solution is to implement **sidecars** which is a proxy to every single microservice. This can resolve issues such as encryption, retries when a connection fails, intelligent load balancing.

You could also add a **management interface** which resolves routing decisions, metrics/logs/traces and access control (ie valid certificate etc).

This brings us to **Istio**.

![Istio diagram](https://res.cloudinary.com/gitgoodclub/image/upload/v1540090167/istio-diagram.png)

## 7.1 Istio Installation

If you want to use Istio, it's worth now using a node with enough memory ie t2.medium.

### Kops configuration

```bash
$ kops edit cluster kubernetes.newtech.academy
```
Add:
```
spec:
  kubeAPIServer:
    admissionControl:
    - NamespaceLifecycle
    - LimitRanger
    - ServiceAccount
    - PersistentVolumeLabel
    - DefaultStorageClass
    - DefaultTolerationSeconds
    - MutatingAdmissionWebhook
    - ValidatingAdmissionWebhook
    - ResourceQuota
    - NodeRestriction
    - Priority
```

### Download (1.0.2):

```bash
$ cd ~
$ wget https://github.com/istio/istio/releases/download/1.0.2/istio-1.0.2-linux.tar.gz
tar -xzvf istio-1.0.2-linux.tar.gz
$ cd istio-1.0.2
# Alternatively just export the PATH so you don't have to logout
$ echo 'export PATH="$PATH:/home/ubuntu/istio-1.0.2/bin"' >> ~/.profile
$ istioctl # check everything is running correctly
```

### Download (latest):

```bash
$ cd ~
$ curl -L https://git.io/getLatestIstio | sh -
$ echo 'export PATH="$PATH:/home/ubuntu/istio-1.0.2/bin"' >> ~/.profile # change 1.0.2 in your version -- alternative just export the PATH so you don't have to logout
$ cd istio-1.0.2 # change 1.0.2 in your version
```

### Istio install

Apply CRDs:

```bash
$ kubectl apply -f ~/istio-1.0.2/install/kubernetes/helm/istio/templates/crds.yaml
```

Wait a few seconds.


Option 1: with no mutual TLS authentication
```bash
$ kubectl apply -f ~/istio-1.0.2/install/kubernetes/istio-demo.yaml
```

Option 2: or with mutual TLS authentication
```bash
$ kubectl apply -f ~/istio-1.0.2/install/kubernetes/istio-demo-auth.yaml
```

## 7.2 Example app

![Example app diagram](https://res.cloudinary.com/gitgoodclub/image/upload/v1540091246/Screen_Shot_2018-10-21_at_2.07.07_pm.png)

### Example app (from istio)

```bash
export PATH="$PATH:/home/ubuntu/istio-1.0.2/bin"
kubectl apply -f <(istioctl kube-inject -f samples/bookinfo/platform/kube/bookinfo.yaml)
```

### Hello world app

```bash
export PATH="$PATH:/home/ubuntu/istio-1.0.2/bin"
kubectl apply -f <(istioctl kube-inject -f helloworld.yaml)
kubectl apply -f helloworld-gw.yaml
```

### Mutual TLS example

Create pods, services, destinationrules, virtualservices
```bash
kubectl create -f <(istioctl kube-inject -f helloworld-tls.yaml)
kubectl create -f helloworld-legacy.yaml
```

### End-user authentication

```bash
kubectl create -f <(istioctl kube-inject -f helloworld-jwt.yaml)
kubectl create -f helloworld-jwt-enable.yaml
```

If we want to access a Pod, we need to use a gateway. 

```yaml
# helloworld-gw.yaml
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: helloworld-gateway
spec:
  selector:
    istio: ingressgateway # use istio default controller
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "*"
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: helloworld
spec:
  hosts:
  - "*"
  gateways:
  - helloworld-gateway
  http:
  - match:
    - uri:
        prefix: /hello
    route:
    - destination:
        host: hello.default.svc.cluster.local
        port:
          number: 8080
```

If you want a service within Istio, you will always need to define the `VirtualService`. We don't need the `VirtualService` for services that are accessed by the client.

## 7.3 Advanced Istio Routing

![Advanced Routing Setup](https://res.cloudinary.com/gitgoodclub/image/upload/v1540109060/Screen_Shot_2018-10-21_at_7.04.07_pm.png)

Thanks to Istio, we can do advanced routing based around the above diagram thanks to the Deployments having different metadata:

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: hello
spec:
  host: hello.default.svc.cluster.local
  # ! Subsets is where the magic happens!
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: helloworld
spec:
  hosts:
  - "hello.example.com"
  gateways:
  - helloworld-gateway
  http:
  - match:
    - headers:
        end-user:
          exact: john
    route:
    - destination:
        host: hello.default.svc.cluster.local
        subset: v2 # ! match v2 only
        port:
          number: 8080
  - route: # default route for hello.example.com
    - destination:
        host: ! hello.default.svc.cluster.local
        subset: v1 # match v1 only
        port:
          number: 8080
```

Now, if we apply this virtual service to the service mesh, then based on whether we pass the "end-user" header or not, we will hit either v1 or v2!

## 7.4 Canary deployments

Canary deployments basically want routing mainly to the first version, but we also want some A/B testing to have version 2 having a 10% weight.

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: hello
spec:
  host: hello.default.svc.cluster.local
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: helloworld
spec:
  hosts:
  - "hello.example.com"
  gateways:
  - helloworld-gateway
  http:
  - route:
    - destination:
        host: hello.default.svc.cluster.local
        subset: v1
        port:
          number: 8080
      weight: 90
    - destination:
        host: hello.default.svc.cluster.local
        subset: v2
        port:
          number: 8080
      weight: 10
```

## 7.5 Running retries 

If one of the pods stop working, we can retry to another pod without the client seeing any of the issues. The example app has one of three pods running with a 5s latency but a 2s timeout to demonstrate this. It looks like the following:

![Retry diagram](https://res.cloudinary.com/gitgoodclub/image/upload/v1540110459/Screen_Shot_2018-10-21_at_7.26.50_pm.png)

## 7.6 Mutual TLS

The goals of Istio security are:

- **Security by default:** no changes needed for application code and infrastructure.
- **Defense in depth:** integrate with existing security systems to provide multiple layers of defense.
- **Zero-trust network:** build security solutions on untrusted networks.

Two types of auth:

1. Transport authentication (service to service authentication) using Mutual TLS.
2. Origin authentication (end-user authentication). Verifying the end user using JWTs.

Mutual TLS can be turned on **without having to change the code of applications** (because of the sidecar deployment).

It provides each service with a **strong identity**.

- Attacks like impersonation be rerouting DNS records will fail, because a fake application can't prove its identity using the certificate mechanism.
- **Secures (encrypts)** service-to-service and end-user-to-service communication.
- Provides key and certificate management to **manage generation, distribution and rotation**.

![TLS Example App](https://res.cloudinary.com/gitgoodclub/image/upload/v1540153502/Screen_Shot_2018-10-22_at_7.24.10_am.png)

- Legacy applications with not have a sidecar. 
- One service will go LTR, and the other RTL.

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: ns1
---
apiVersion: v1
kind: Namespace
metadata:
  name: ns2
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: hello-tls
  namespace: ns1
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: hello
        version: v1-tls
    spec:
      containers:
      - name: hello
        image: wardviaene/http-echo
        env:
        - name: TEXT
          value: hello
        - name: NEXT
          value: "world.ns2:8080"
        ports:
        - name: http
          containerPort: 8080
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: world-tls
  namespace: ns2
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: world
        version: v1-tls
    spec:
      containers:
      - name: hello
        image: wardviaene/http-echo
        env:
        - name: TEXT
          value: world
        - name: NEXT
          value: "end.legacy:8080"
        ports:
        - name: http
          containerPort: 8080
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: world-reverse-tls
  namespace: ns2
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: world-reverse
        version: v1-tls
    spec:
      containers:
      - name: hello
        image: wardviaene/http-echo
        env:
        - name: TEXT
          value: world
        - name: NEXT
          value: "end-reverse.ns1:8080"
        ports:
        - name: http
          containerPort: 8080
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: end-reverse-tls
  namespace: ns1
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: end-reverse
        version: v1-tls
    spec:
      containers:
      - name: hello
        image: wardviaene/http-echo
        env:
        - name: TEXT
          value: "!!!"
        ports:
        - name: http
          containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: hello
  namespace: ns1
  labels:
    app: hello
spec:
  selector:
    app: hello
  ports:
  - name: http
    port: 8080
    targetPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: world
  namespace: ns2
  labels:
    app: world
spec:
  selector:
    app: world
  ports:
  - name: http
    port: 8080
    targetPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: world-reverse
  namespace: ns2
  labels:
    app: world-reverse
spec:
  selector:
    app: world-reverse
  ports:
  - name: http
    port: 8080
    targetPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: end-reverse
  namespace: ns1
  labels:
    app: end-reverse
spec:
  selector:
    app: end-reverse
  ports:
  - name: http
    port: 8080
    targetPort: 8080
---
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: helloworld-gateway
spec:
  selector:
    istio: ingressgateway # use istio default controller
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "*"
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: hello
spec:
  host: hello.ns1.svc.cluster.local
  # uncomment to enable mutual TLS
  #trafficPolicy:
  #  tls:
  #    mode: ISTIO_MUTUAL
  subsets:
  - name: v1-tls
    labels:
      version: v1-tls
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: hello-reverse
spec:
  host: hello-reverse.legacy.svc.cluster.local
  # uncomment to enable mutual TLS
  #trafficPolicy:
  #  tls:
  #    mode: ISTIO_MUTUAL
  subsets:
  - name: v1-tls
    labels:
      version: v1-tls
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: helloworld-tls
spec:
  hosts:
  - "hello-tls.example.com"
  gateways:
  - helloworld-gateway
  http:
  - route:
    - destination:
        host: hello.ns1.svc.cluster.local
        subset: v1-tls # match v3 only
        port:
          number: 8080
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: helloworld-tls-reverse
spec:
  hosts:
  - "hello-tls-reverse.example.com"
  gateways:
  - helloworld-gateway
  http:
  - route:
    - destination:
        host: hello-reverse.legacy.svc.cluster.local
        subset: v1-tls
        port:
          number: 8080
```

As for the missing legacy services, they can be found in the `helloworld-legacy` file:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: legacy
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: end-tls
  namespace: legacy
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: end
        version: v1-tls
    spec:
      containers:
      - name: hello
        image: wardviaene/http-echo
        env:
        - name: TEXT
          value: "!!!"
        ports:
        - name: http
          containerPort: 8080
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: hello-reverse-tls
  namespace: legacy
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: hello-reverse
        version: v1-tls
    spec:
      containers:
      - name: hello
        image: wardviaene/http-echo
        env:
        - name: TEXT
          value: hello
        - name: NEXT
          value: "world-reverse.ns2:8080"
        ports:
        - name: http
          containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: end
  namespace: legacy
  labels:
    app: end
spec:
  selector:
    app: end
  ports:
  - name: http
    port: 8080
    targetPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: hello-reverse
  namespace: legacy
  labels:
    app: hello-reverse
spec:
  selector:
    app: hello-reverse
  ports:
  - name: http
    port: 8080
    targetPort: 8080
```

Both these files can applied by running the following:

```bash
$ kubectl apply -f <(istioctl kube-inject -f helloworld-tls.yaml)
$ kubectl apply -f helloworld-legacy.yaml
$ kubetl get svc -o wide -n istio-system # get services from istio-system services
# After getting the load balancer, you can then curl the ELB passing the Host header
```

Now we need to **enable TLS authetication.**

```yaml
# helloworld-rbac-enable.yaml
apiVersion: authentication.istio.io/v1alpha1
kind: "MeshPolicy"
metadata:
  name: "default"
spec:
  peers:
  - mtls: {}
---
# ensures mtls is push to side cars
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: "enable-mtls"
  namespace: "default" # even though we specify a namespace, this rule applies to all namespaces
spec:
  host: "*.local"
  trafficPolicy:
    tls:
      mode: ISTIO_MUTUAL
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
 name: "api-server"
spec:
 host: "kubernetes.default.svc.cluster.local"
 trafficPolicy:
   tls:
     mode: DISABLE
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: "legacy"
spec:
  host: "end.legacy.svc.cluster.local"
  trafficPolicy:
    tls:
      mode: DISABLE
```

Apply this file to enable mutual TLS that works one way but not the other (as like in the diagram). However, in the above yaml files we did now enable the traffic policy, so you need to update that and apply the updated files for all of this to work.

## 7.7 RBAC with Istio and MTLS

Now that we have MTLS, we have strong identites.

Based on those identities, we can start doing **Role Based Access Control (RBAC)**.

RBAC allows us to limit access **between our services** and from **end-user to services**.

Istio is able to verify the identity of a service by **checking the identity of the x.509 certificate (which comes with enabled mutual TLS)**. Example: with RBAC, service A might be able to be contacted by B, but not by C.

Istio is using SPIFFE standard (another CNFC project).

RBAC in istio:

- Can provide **service-to-service** and **end-user-to-service** auth.
- Supports **conditions** and **role-binding**.
  - You can bind to **ServiceAccounts** (which can be linked to pods).
  - End-user-to-service can for example let you create **condition on being authenticated using JWT**.
  - It has high performance.
  - Not enabled by default.
  - We can enable it globally or on a namespace.

Example for including it on the "default" namespace:

```yaml
apiVersion: "rbac.istio.io/v1alpha1"
kind: RbacConfig
metadata:
  name: default
spec:
  mode: 'ON_WITH_INCLUSION'
  inclusion:
    namespaces: ["default"]
---
apiVersion: authentication.istio.io/v1alpha1
kind: "MeshPolicy"
metadata:
  name: "default"
spec:
  peers:
  - mtls: {}
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: "enable-mtls"
  namespace: "default" # even though we specify a namespace, this rule applies to all namespaces
spec:
  host: "*.local"
  trafficPolicy:
    tls:
      mode: ISTIO_MUTUAL
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
 name: "api-server"
spec:
 host: "kubernetes.default.svc.cluster.local"
 trafficPolicy:
   tls:
     mode: DISABLE
```

We can then create a **ServiceRole** specifying the rules and a **ServiceRoleBinding** to link a **ServiceRole** to a subject (example Kubernetes **ServiceAccount**).

Example of how we want the demo to look when it comes to what it can contact:

![Contact rules](https://res.cloudinary.com/gitgoodclub/image/upload/v1540155683/Screen_Shot_2018-10-22_at_8.00.47_am.png)

The order for the following is:

1. Create **ServiceRoles** that only enable certain methods and services with specific access.
2. Enable **ServiceRoleBindings** to bind that the **ServiceRoles** to a **subject** (or **ingress controller name** in the first case).
3. Create the **ServiceAccounts** that have the correct metadata required for the **ServiceRoleBindings**.
4. Create the **Deployments** that have the affiliated **ServiceAccount** required.
5. Create a **Service** for that **Deployment**.
6. Create the **Gateway** that uses the default **Istio Gateway** to access the **Services**.
7. Create the **VirtualService** that gives us access to the hello world app through the **Gateway** connected to the **Service** which sits within the **ServiceMesh** from the **IngressController**.
8. Create the **DestinationRule** that allows allows access to the **VirtualService** using **MTLS** from the **IngressController** which is a **Reverse Proxy internal load balancer** accessed from the external **AWS LoadBalancer** tied to the accessible **DNS Records**.
9. You can now access the microservice from the **AWS LoadBalancer Route53 alias** passing the **internal namespace domain** as the **host header**.

```yaml
# ! helloworld-rbac.yaml file
apiVersion: "rbac.istio.io/v1alpha1"
kind: ServiceRole
metadata:
  name: hello-viewer
  namespace: default
spec:
  rules:
  - services: ["hello.default.svc.cluster.local"]
    methods: ["GET", "HEAD"]
---
apiVersion: "rbac.istio.io/v1alpha1"
kind: ServiceRole
metadata:
  name: world-viewer
  namespace: default
spec:
  rules:
  - services: ["world.default.svc.cluster.local"]
    methods: ["GET", "HEAD"]
---
apiVersion: "rbac.istio.io/v1alpha1"
kind: ServiceRole
metadata:
  name: world-2-viewer
  namespace: default
spec:
  rules:
  - services: ["world-2.default.svc.cluster.local"]
    methods: ["GET", "HEAD"]
---
apiVersion: "rbac.istio.io/v1alpha1"
kind: ServiceRoleBinding
metadata:
  name: istio-ingress-binding
  namespace: default
spec:
  subjects:
  - properties:
      source.namespace: "istio-system"
  roleRef:
    kind: ServiceRole
    name: "hello-viewer"
---
apiVersion: "rbac.istio.io/v1alpha1"
kind: ServiceRoleBinding
metadata:
  name: hello-user-binding
  namespace: default
spec:
  subjects:
  - user: "cluster.local/ns/default/sa/hello"
  roleRef:
    kind: ServiceRole
    name: "world-viewer"
---
apiVersion: "rbac.istio.io/v1alpha1"
kind: ServiceRoleBinding
metadata:
  name: world-user-binding
  namespace: default
spec:
  subjects:
  - user: "cluster.local/ns/default/sa/world"
  roleRef:
    kind: ServiceRole
    name: "world-2-viewer"
---
###
### Kubernetes Service accounts
###
apiVersion: v1
kind: ServiceAccount
metadata:
  name: hello
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: world
---
###
### helloworld.yaml deployments, including a serviceaccount
### for the hello deployment and the world deployment
###
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: hello
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: hello
        version: v1
    spec:
      serviceAccountName: hello  # service account
      containers:
      - name: hello
        image: wardviaene/http-echo
        env:
        - name: TEXT
          value: hello
        - name: NEXT
          value: "world:8080"
        ports:
        - name: http
          containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: hello
  labels:
    app: hello
spec:
  selector:
    app: hello
  ports:
  - name: http
    port: 8080
    targetPort: 8080
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: world
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: world
        version: v1
    spec:
      serviceAccountName: world  # service account
      containers:
      - name: world
        image: wardviaene/http-echo
        env:
        - name: TEXT
          value: world
        - name: NEXT
          value: "world-2:8080"
        ports:
        - name: http
          containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: world
  labels:
    app: world
spec:
  selector:
    app: world
  ports:
  - name: http
    port: 8080
    targetPort: 8080
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: world-2
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: world-2
        version: v1
    spec:
      containers:
      - name: world-2
        image: wardviaene/http-echo
        env:
        - name: TEXT
          value: "!!!"
        ports:
        - name: http
          containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: world-2
  labels:
    app: world-2
spec:
  selector:
    app: world-2
  ports:
  - name: http
    port: 8080
    targetPort: 8080
---
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: helloworld-gateway
spec:
  selector:
    istio: ingressgateway # use istio default controller
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "*"
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: helloworld
spec:
  hosts:
  - "hello-rbac.example.com"
  gateways:
  - helloworld-gateway
  http:
  - route:
    - destination:
        host: hello.default.svc.cluster.local
        subset: v1
        port:
          number: 8080
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: hello
spec:
  host: hello.default.svc.cluster.local
  # uncomment to enable mutual TLS
  trafficPolicy:
    tls:
      mode: ISTIO_MUTUAL
  subsets:
  - name: v1
    labels:
      version: v1
```

This again requires the rbac prequisite:

```yaml
# helloworld-rbac-enable.yaml
apiVersion: authentication.istio.io/v1alpha1
kind: "MeshPolicy"
metadata:
  name: "default"
spec:
  peers:
  - mtls: {}
---
# ensures mtls is push to side cars
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: "enable-mtls"
  namespace: "default" # even though we specify a namespace, this rule applies to all namespaces
spec:
  host: "*.local"
  trafficPolicy:
    tls:
      mode: ISTIO_MUTUAL
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
 name: "api-server"
spec:
 host: "kubernetes.default.svc.cluster.local"
 trafficPolicy:
   tls:
     mode: DISABLE
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: "legacy"
spec:
  host: "end.legacy.svc.cluster.local"
  trafficPolicy:
    tls:
      mode: DISABLE
```

![After applying the files to Istio](https://res.cloudinary.com/gitgoodclub/image/upload/v1540159695/Screen_Shot_2018-10-22_at_9.07.45_am.png)

Evidently enough, it is incredibly important to ensure the routing is set up correctly so there is no large scale failure.

## 7.8 End-user Authentication

Istio currently supports JWT tokens to authenticate users.

In the implementation, the user will receive a JWT token from an authenticated server after logging in.

- This app will provide us with a token that is **signed with a key**.
- The data is not encrypted, but the **token contains a signature**, which can be **verified** to see **whether it was really created by the server**.
- Only the server has the **private key**, so we can't recreate or tamper with the token.
- Using microservices, every app would need to be **seperately configured**.
- Every service would need to **validate the token**.
  - Once validated the service would need to check whether the user has access to this service.
- With Istio, **this can be taken away from the app code and managed centrally.**
- You can configure the **jwt token signature/properties** you expect in into and have **policies to allow/disallow access to a service.**
  - Example "hello" app might only be accessible if user is authenticated.
  - The **sidecar** will verify the **validity** of the signature, to make sure the token is valid.

![JWT Token setup](https://res.cloudinary.com/gitgoodclub/image/upload/v1540160832/Screen_Shot_2018-10-22_at_9.26.42_am.png)

```yaml
# Istio with JWT Auth
# helloworld-jwt.yaml
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: helloworld-gateway
spec:
  selector:
    istio: ingressgateway # use istio default controller
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "*"
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: helloworld-auth
spec:
  # this is a change to previous
  hosts:
  - "auth.kubernetes.newtech.academy"
  gateways:
  - helloworld-gateway
  http:
  - route:
    - destination:
        host: auth.default.svc.cluster.local
        port:
          number: 8080
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: helloworld-hello
spec:
  hosts:
  - "hello.kubernetes.newtech.academy"
  gateways:
  - helloworld-gateway
  http:
  - route:
    - destination:
        host: hello.default.svc.cluster.local
        port:
          number: 8080
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: auth
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: auth
        version: v1
    spec:
      containers:
      - name: auth
        image: wardviaene/http-echo
        env:
        - name: TEXT
          value: this is the authentication service
        ports:
        - name: http
          containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: auth
  labels:
    app: auth
spec:
  selector:
    app: auth
  ports:
  - name: http
    port: 8080
    targetPort: 8080
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: hello
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: hello
        version: v1
    spec:
      containers:
      - name: hello
        image: wardviaene/http-echo
        env:
        - name: TEXT
          value: Hello, you can only reach this service when authenticated
        ports:
        - name: http
          containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: hello
  labels:
    app: hello
spec:
  selector:
    app: hello
  ports:
  - name: http
    port: 8080
    targetPort: 8080
###
### Enable TLS
###
---
apiVersion: authentication.istio.io/v1alpha1
kind: "MeshPolicy"
metadata:
  name: "default"
spec:
  peers:
  - mtls: {}
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: "enable-mtls"
  namespace: "default" # even though we specify a namespace, this rule applies to all namespaces
spec:
  host: "*.local"
  trafficPolicy:
    tls:
      mode: ISTIO_MUTUAL
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
 name: "api-server"
spec:
 host: "kubernetes.default.svc.cluster.local"
 trafficPolicy:
   tls:
     mode: DISABLE
```

To get to auth, we need to create an alias for `auth.domain.name` in Route 53 to expose the load balancer.

To enable the policy for the JWT token auth to take effect, we need to apply the following to the cluster:

```yaml
# helloworld-jwt-enable.yaml
apiVersion: "authentication.istio.io/v1alpha1"
kind: "Policy"
metadata:
  name: "jwt-example"
spec:
  targets:
  - name: hello
  peers:
  - mtls: {}
  origins:
  - jwt:
  	  # jwksUri is from auth uri we setup in Route53
      issuer: "http-echo@http-echo.kubernetes.newtech.academy"
      jwksUri: "http://auth.kubernetes.newtech.academy/.well-known/jwks.json"
  principalBinding: USE_ORIGIN
---
```

After fetching the token, we can now access authenticated routes by passing the header `"Authorization": "Bearer $TOKEN"`.

The example uses [this Github repo](https://github.com/wardviaene/http-echo/blob/master/main.go) with the /login route to do auth and another route to check the auth from other services.

Something useful is that you can also check the logs of the Istio proxy. This can be done with `kubectl logs <% pod_name %> -c istio-proxy`.

## 7.9 Istio Ingress Traffic

To enable ingress traffic to allow to access outside services, we can apply an external service file. The following example will allow the `ifconfig.co` hostname to be accessible from the pods.

```yaml
# external-service.yaml
#
# http
#
apiVersion: networking.istio.io/v1alpha3
kind: ServiceEntry
metadata:
  name: ifconfig-co-http
spec:
  hosts:
  - ifconfig.co
  ports:
  - number: 80
    name: http
    protocol: HTTP
  resolution: DNS
  location: MESH_EXTERNAL
---
#
# https
#
apiVersion: networking.istio.io/v1alpha3
kind: ServiceEntry
metadata:
  name: ifconfig-co-https
spec:
  hosts:
  - ifconfig.co
  ports:
  - number: 443
    name: https
    protocol: HTTPS
  resolution: DNS
  location: MESH_EXTERNAL
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: ifconfig-co
spec:
  hosts:
  - ifconfig.co
  tls:
  - match:
    - port: 443
      sni_hosts:
      - ifconfig.co
    route:
    - destination:
        host: ifconfig.co
        port:
          number: 443
      weight: 100
```

You should now be able to log into the pod to try out contacting other services.

## 7.10 Distributed Tracing with Jaegar

Jaegar is automatically store in the `isto-system`. You can confirm this with the following:

```bash
$ kubectl get pod -n istio-system # istio-tracing pod
$ kubectl get svc -n istio-system # jaegar-[agent/collector/query]
# You could export the port for jaegar-query by updating the service
$ kubectl edit svc jaegar-query -n istio-system # changing ClusterIP to LoadBalancer
```

To find the traces, you need to find the svc **LoadBalancer** port for Jaegar Query and then you can access the web url using the port.

## 7.11 Istio Metrics with Grafana

Similar to Jaegar, you can find the Grafana service by getting the services for the Istio System.

```bash
$ kubectl get svc -n istio-system # grafana
# You could export the port for grafana by updating the service
$ kubectl edit svc grafana -n istio-system # changing ClusterIP to LoadBalancer
```

## 8. Intro to kubeadm

This is an alternative to running Kubernetes that is not using `kops`