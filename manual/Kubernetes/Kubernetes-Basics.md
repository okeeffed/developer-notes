---
name: Kubernetes Basics
menu: Kubernetes
---

# Kubernetes Basics

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

```shell
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