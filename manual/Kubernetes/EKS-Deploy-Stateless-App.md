---
name: EKS - Deploy Stateless App
menu: Kubernetes
---

# EKS - Deploy Stateless App

- [EKS - Deploy Stateless App](#eks---deploy-stateless-app)
  - [In this app](#in-this-app)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Deploying the backend](#deploying-the-backend)
    - [The Redis Master](#the-redis-master)
    - [The Redis Slaves](#the-redis-slaves)
  - [Deploying the Frontend](#deploying-the-frontend)
  - [Scaling Pods up and down](#scaling-pods-up-and-down)

In this example, we will be build a basic guestbook example from Kubernetes.

## In this app

We will deploy the guestbook app at https://github.com/kubernetes/examples/tree/master/guestbook.

We will need to deploy backend resources, frontend resources, scale Pods up/down and some chaos testing.

Our application will be accessible from an AWS Load Balancer.

![App layout](https://res.cloudinary.com/gitgoodclub/image/upload/v1548246181/eks-course/Screen_Shot_2019-01-23_at_11.22.49_pm.png)

### Backend

Redis:

- Single Master (WRITES)
- Multi Slaves (READ)
- Slaves sync continuously from Master

### Frontend

PHP App:

- Load balanced to public with ELB
- Read balanced over multiple salve DBs
- Write req to single Master DB

## Deploying the backend

We need to create:

- Redis Master pod
- Redis Master service
- Redis Slave pods
- Redis Slave services

Then we will do some AWS networking (ENI) inspection.

### The Redis Master

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis-master
  labels:
    app: redis
spec:
  selector:
    matchLabels:
      app: redis
      role: master
      tier: backend
  replicas: 1
  template:
    metadata:
      labels:
        app: redis
        role: master
        tier: backend
    spec:
      containers:
        - name: master
          image: k8s.gcr.io/redis:e2e # or just image: redis
          resources:
            requests:
              cpu: 100m
              memory: 100Mi
          ports:
            - containerPort: 6379
---
apiVersion: v1
kind: Service
metadata:
  name: redis-master
  labels:
    app: redis
    role: master
    tier: backend
spec:
  ports:
    - port: 6379
      targetPort: 6379
  selector:
    app: redis
    role: master
    tier: backend
```

Apply this file using kubectl and then you can check what has been deployed. Notice there is a Cluster IP but not an external IP as it is not exposed to the public.

```shell
kubectl get svc

NAME           TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
kubernetes     ClusterIP   [REDACTED]       <none>        443/TCP    1h
redis-master   ClusterIP   [REDACTED]       <none>        6379/TCP   16s
```

### The Redis Slaves

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis-slave
  labels:
    app: redis
spec:
  selector:
    matchLabels:
      app: redis
      role: slave
      tier: backend
  replicas: 2
  template:
    metadata:
      labels:
        app: redis
        role: slave
        tier: backend
    spec:
      containers:
        - name: slave
          image: gcr.io/google_samples/gb-redisslave:v1
          resources:
            requests:
              cpu: 100m
              memory: 100Mi
          env:
            - name: GET_HOSTS_FROM
              value: dns
          ports:
            - containerPort: 6379
---
apiVersion: v1
kind: Service
metadata:
  name: redis-slave
  labels:
    app: redis
    role: slave
    tier: backend
spec:
  ports:
    - port: 6379
  selector:
    app: redis
    role: slave
    tier: backend
```

After applying the file, we can run `kubectl get pods` and see something similar to the following:

```shell
NAME                            READY   STATUS    RESTARTS   AGE
redis-master-6b464554c8-kqkpr   1/1     Running   0          7m
redis-slave-b58dc4644-dk9cg     1/1     Running   0          12s
redis-slave-b58dc4644-jx6mz     1/1     Running   0          12s
```

## Deploying the Frontend

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  labels:
    app: guestbook
spec:
  selector:
    # matches Service
    matchLabels:
      app: guestbook
      tier: frontend
  replicas: 3
  template:
    metadata:
      labels:
        app: guestbook
        tier: frontend
    spec:
      containers:
        - name: php-redis
          image: gcr.io/google-samples/gb-frontend:v4
          resources:
            requests:
              cpu: 100m
              memory: 100Mi
          env:
            - name: GET_HOSTS_FROM
              value: dns
              # Using `GET_HOSTS_FROM=dns` requires your cluster to
              # provide a dns service. As of Kubernetes 1.3, DNS is a built-in
              # service launched automatically. However, if the cluster you are using
              # does not have a built-in DNS service, you can instead
              # access an environment variable to find the master
              # service's host. To do so, comment out the 'value: dns' line above, and
              # uncomment the line below:
              # value: env
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: frontend
  labels:
    app: guestbook
    tier: frontend
spec:
  # comment or delete the following line if you want to use a LoadBalancer
  #type: NodePort
  # if your cluster supports it, uncomment the following to automatically create
  # an external load-balanced IP for the frontend service.
  type: LoadBalancer
  ports:
    - port: 80
  selector:
    app: guestbook
    tier: frontend
```

After deploying, we should see all the pods and services deploying.

If we then run `kubectl describe service frontend`, we should be able to see information on the ELB that we have just deployed.

From this information, we should be able to fetch the `LoadBalancer Ingress` address to open up the guest book.

## Scaling Pods up and down

```yml
# Scale to 5 replicas of deployment frontend
kubectl scale --replicas 5 deployment frontend
# kubectl get pods will show us 5
kubectl scale --replicas 4 deployment frontend
# kubectl get pods will show us 4
```
