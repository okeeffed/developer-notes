---
name: Kubernetes Admin
menu: Kubernetes
---

# 4. Kubernetes Administration

## Resources

1. [Why etcd is etcd?](https://github.com/etcd-io/etcd/issues/2512)

## Administration

![Kubernetes Master Overview](https://res.cloudinary.com/gitgoodclub/image/upload/v1540175278/Screen_Shot_2018-10-22_at_1.26.57_pm.png)

- When you deploy a new Pod, the information is stored in `etcd`. (etcd = `/etc` config folder and `d` = distributed)
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
    configmaps: '10'
persistentvolumesclaim: '4'
replicationcontrollers: '20'
secrets: '10'
services: '10'
services.loadbalancers: '2'
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
    requests.cpu: '1'
    requests.memory: 1Gi
    limits.cpu: '2'
    limits.memory: 2Gi
---
apiVersion: v1
kind: ResourceQuota
metadata:
  name: object-quota
  namespace: myspace
spec:
  hard:
    configmaps: '10'
    persistentvolumeclaims: '4'
    replicationcontrollers: '20'
    secrets: '10'
    services: '10'
    services.loadbalancers: '2'
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
    service.beta.kubernetes.io/aws-load-balancer-ssl-cert: 'arn:aws:acm:region:accountid:certificate/...' #replace this value
    service.beta.kubernetes.io/aws-load-balancer-backend-protocol: 'http'
    service.beta.kubernetes.io/aws-load-balancer-ssl-ports: '443'
    service.beta.kubernetes.io/aws-load-balancer-connection-draining-enabled: 'true'
    service.beta.kubernetes.io/aws-load-balancer-connection-draining-timeout: '60'
    service.beta.kubernetes.io/aws-load-balancer-additional-resource-tags: 'environment=dev,app=helloworld'
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
