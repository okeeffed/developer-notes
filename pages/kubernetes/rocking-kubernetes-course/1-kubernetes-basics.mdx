# Kubernetes basics

## In the beginning - Docker Container

The idea of the container is that it is an atomic, self contained package of software that includes everything it needs to run (coded, runtime, libraries, packages, etc).

The process goes from building an image and then you execute the image to run in a container.

The `image` is stored in the `repository`. You deploy the image from the repo to the container.

The container can be run in any application that runs Docker. Kubernetes being one of them (which itself can run on Amazon EKS, GCE, etc.).

### Virtual machine vs container

VMs turn one software into many softwares. The hypervisor enables this and a guest OS is required.

The container themselves do not need a hypervisor or to run. They run on Docker and no longer required a gust OS within the container. We do not need to package it up.

### Advantages

1. Platform independent.
2. Smaller than VMs.
3. App isolation.
4. Speed.
5. Container orchestration is solved.

## What is a Container Orchestrator?

You have images within a registry.

Now, you need somewhere to run a container. The example given are with images running within EC2 instances in different availability zones. The example also uses load balancing for service discovery and health checking.

Container orchestrators help solve this problem.

Examples:

1. Docker Swarm
2. Apache Mesos
3. AWS Escape
4. Kubernetes
5. Fargate

### What is Kubernetes?

After you have have an image that you can run in a container, you can run it within a Kubernetes node.

Generally, you will will have one or more worker nodes (the data plane).

These worker nodes are managed by the control plane. The control plane manages, monitors, plans and schedules nodes.

What the control plan is comprised of:

| App             | Does                                                         |
| --------------- | ------------------------------------------------------------ |
| etcd            | Key-value store for critical cluster info                    |
| kube scheduler  | Puts containers to proper nodes                              |
| kubectl manager | Ensures proper state of cluster components                   |
| kube api server | An exposed server that lets you communicate with the cluster |

The control manager helps bring the cluster to the desired state.

The state is specified by us (via a manifest file).

How do we interact with the master node? The kube api server exposes the Kubernetes API that you can interact with through `kubectl`.

> "You can think of if as the frontend of the Kubernetes control plane."

Anytime you want to change state, you need to interact with this.

### What's within the node?

The node needs the `Container Runtime Engine` (Docker, Containerd, CRI-O, frankti). It is the software required to run the iamges.

Something needs to run in the node to communicate with the control plane - that is the `kubelet` that runs in each node of the cluster.

What about for node-to-node communication? That is done using `kube proxy`. The kube proxy is a network proxy that runs on each node in the cluster. It maintains network rules on nodes. These rules allow communication to your nodes from inside or outside your cluster.

## Pods

We cannot deploy our containers directly into our Kubernetes cluster. Containers are encapsulated within a Kubernetes object called a Pod.

Pods are the smallest deploy units of computing that can be created and manged in k8s. You can deploy your container within a pod which runs within a node.

To remember how the encapsulation works, you can use **NPC**:

- N: Node
- P: Pod
- C: Container

Each pod will have a unique IP address. Other pods within the Kubernetes cluster can talk to this pod through this IP address.

Generally within one pod, you only run **one application container**. You can run more than one container within a pod, but know the difference between the app container and others. Generally, you wil also have things like a sidecar container that also runs within a pod.

Each container will need to expose a unique port within the pod.

If someone wants to access the application container, they will need to reach the pod IP address at the port the container exposes.

### How do you scale the app?

To scale the app container, you will spin up another pod with another app container within it.

## Replicaset & Deployment

In an example where we have a webserver pods that each contain an app container running nginx. To make it highly available, you have all these pods within a replicaset so that if a pod goes down, the replicaset can restore it.

What if you want to deploy new pods with an update from (for example) Nginx 1.16 to 1.17.

A deployment comes into play here to help with that.

> You can think of `deployment` as something that wraps around a `replicaset` which in itself wraps around pod deployments.

The deployment takes care of upgrades, scaling, undo etc. It gives declarative updates for pods and replicasets at a controlled rate.

## An actual example

An example deployment:

```yaml
# The deployment object
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
	# This takes care of rolling updates
	minReadySeconds: 10
	strategy:
		rollingUpdate:
			maxSurge: 1
			# Update must be done in a way that at least 3 pods are running
			maxUnavailable: 0
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
          ports:
            - containerPort: 80
```

Using the `matchLabels`, we can see above a deployment that manages the pods and the replicaset.

The replicaset also knows the manage the pods with the matching labels.

You can see more [here](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/).

> If you only deploy configuration for a pod, there will be no replicaset or deployment that manages it.

Note: in the same way that replicaset will restore pods when the desired state is not met, the deployment will also restore the replicaset (and the rolling updates involved).

## Replicaset + Deployment Demo

| Command used                      | Shows                                          |
| --------------------------------- | ---------------------------------------------- |
| `kubectl get all`                 | Nothing except clust running                   |
| `kubectl get nodes`               | Shows two nodes that are running               |
| `kubectl apply -f file-name.yaml` | Apply the file to the cluster                  |
| `kubectl delete pod <ID>`         | Used to delete a pod                           |
| `kubectl delete rs <ID>`          | Delete a replicaset by ID                      |
| `kubectl describe pods`           | Describes the pods (and what image is running) |
| `kubectl get rs --watch`          | Watch mode to see replicaset changes           |

The instructor runs the Nginx rolling update.

Running the get all comand again, we can see tha there is now a service with a deployment running and a replicaset up with the desired count.

After deleting a pod, we can the replicaset moves it all up.

We the replicaset is deleted, the deployment ensures that it is spun back up.

After these proofs, we update a container version to see the rolling update in action. This is done by updating the file and running the `apply` command.

As the demo goes on, we can see the two replicate sets.

Finally, we can delete the replicaset and because the deployment no longer looks after it, it is not spun back up.

## Services

In an example where a pod goes down within a node and a ReplicaSet brings it back up, we know that the new pod will have a new IP address. How does our cluster know what is happening?

All of these problems are addressed by a `service`. Into of connecting the pods using IP, pods can connect using a service which will distribute traffic.

Each service has a name. In the example given, there might be a service that helps the webserver pods connect to database pods. At the same time, there might be a frontend service that connects users to the webservers.

The service helps to discover new pods and helps with the distribution when there are changes in state.

How does it work? We tell it to manage any pods using a selector (for example `app: frontend`).

Service can be a few different types:

1. LoadBalancer (if you declare this in EKS, it basically sets up a LoadBalancer)
2. ClusterIP
3. Nodeport

An example of a service file:

```yml
apiVersion: v1
kind: Service
metadata:
	name: lb-service
	labels:
   	app: lb-service
spec:
	# Nominate that we want a load balancer
	type: LoadBalancer
	ports:
	- port: 80
	selector:
		app: frontend
```

Here we are saying that we want a LoadBalancer service that will discover and distribute traffic to has the label `app: frontend`.

> You will barely expose a pod using its IP address. There will (nearly) always be a service infront of it.

## Service Types

The types:

1. ClusterIP
2. Nodeport
3. LoadBalancer

The motto of all service types: "discover and distribute traffic among underlying pods using a label selector".

### ClusterIP

Default kind of service and only accessible from within a cluster. This means if you are outside of the cluster and want to access a service, you cannot do it.

The example given of the `backend-service` would be well suited as it is within the cluster.

In the exampel yaml file:

```yaml
apiVersion: v1
kind: Service
metadata:
	name: app-service
spec:
  ports:
	 	- port: 80
		  # default
			protocol: TCP
	selector:
		app: app-server
```

### NodePort

This is a little complex.

Accessible from outside of the cluster and creates a cluster-wide port.

The example has a `frontend-service` that allows us to pick a port number and the combination of the node ID and node port can access the pods from outside of the cluster.

So, if the node IP was `10.16.10.01` and you had access to port `32000` then from outside we could visit `https://10/16/10/01:32000` to reach through to the pod.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  type: NodePort
  selector:
    app: MyApp
  ports:
    # By default and for convenience, the `targetPort` is set to the same value as the `port` field.
    - port: 80
      targetPort: 80
      # Optional field
      # By default and for convenience, the Kubernetes control plane will allocate a port from a range (default: 30000-32767)
      nodePort: 30007
```

The three different ports:

| Port       | Does                                                      |
| ---------- | --------------------------------------------------------- |
| port       | Redirect port that forwards to 32000                      |
| targetPort | Forward from this container port to the `port` of the pod |
| nodePort   | Exposed to the external world                             |

For all selectors, the `nodePort` is exposed to all nodes in the cluster (even if the IP relates to one node only).

### LoadBalancer

1. Cloud-specific implementation (AWS vs Google Cloud vs Azure)
2. Accesible from outside cluster
3. Has DNS name
4. SSL termination, Web Application Firewall (WAF) integration, access logs, health check etc.

> NodePort is barely used in practice to expose applications.

## Demos for EKS

These demoes occur before setting up our own EKS cluster.

```s
$ eksctl get all
# showed an empty cluster up and running
$ kubectl apply -f path/to/file.yml
# apply file to eks cluster (config must have been setup)
$ kubectl get service
# see value of service exposed URL
$ kubectl describe service <name>
# displays more info on the service
```

## Declarative vs Imperative

Two terms that come up with K8s.

Writing the manifest files and applying the files is the **declarative** approach to K8s.

The imperative way would be using individual `kubectl` commands.

> You can change configuration outside of the manifest files.

Imperative is okay for learning, but terrible for re-producing deployments.
