---
name: Devops Kubernetes Course
menu: Kubernetes 
---
# DevOps Kubernetes Course
- [DevOps Kubernetes Course](#devops-kubernetes-course)
  - [Course layout](#course-layout)
    - [Objectives](#objectives)
    - [Support](#support)
  - [Order to follow](#order-to-follow)
- [Advanced Topics](#advanced-topics)
  - [Service Discovery](#service-discovery)
    - [Demo: Service Discovery](#demo-service-discovery)
  - [ConfigMap](#configmap)
    - [Demo: Config Map](#demo-config-map)
  - [Ingress Controller](#ingress-controller)
    - [Demo: Ingress Controller](#demo-ingress-controller)
  - [External DNS](#external-dns)
  - [Volumes](#volumes)
    - [Using EBS Storage](#using-ebs-storage)
    - [Demo: Volumes](#demo-volumes)
  - [Volume Provisioning](#volume-provisioning)
  - [Demo: Using Wordpress with Volumes](#demo-using-wordpress-with-volumes)
  - [Pod Presets](#pod-presets)
  - [Stateful Sets - (formerly Pet Sets)](#stateful-sets---formerly-pet-sets)
  - [Daemon Sets](#daemon-sets)
  - [Resource Usage Monitoring](#resource-usage-monitoring)
  - [Horiztonal Pod Autoscaling](#horiztonal-pod-autoscaling)
  - [Affinity/Anti-Affinity](#affinityanti-affinity)
  - [3.13 Interpod Affinity/Anti-Affinity](#313-interpod-affinityanti-affinity)
    - [Anti-affinity](#anti-affinity)
    - [Topology operators](#topology-operators)
  - [3.14 Taints and Tolerations](#314-taints-and-tolerations)
    - [Tolerations usage](#tolerations-usage)
    - [Keys](#keys)
    - [Use Cases](#use-cases)
    - [Useful Taints and Tolerations](#useful-taints-and-tolerations)
  - [3.15 Customer Resource Definitions (CRDs)](#315-customer-resource-definitions-crds)
  - [3.16 Operators](#316-operators)
    - [PostgreSQL Operator Demo](#postgresql-operator-demo)
  - [4. Kubernetes Administration](#4-kubernetes-administration)
  - [4.1 Resource Quotas](#41-resource-quotas)
    - [Resource Quota Examples](#resource-quota-examples)
    - [Resource Quote options](#resource-quote-options)
  - [4.2 Namespaces](#42-namespaces)
    - [Namespace commands](#namespace-commands)
    - [Demo ResourceQuotas](#demo-resourcequotas)
  - [4.3 User Management](#43-user-management)
    - [Normal Users](#normal-users)
    - [Service Users](#service-users)
    - [Other notes on User Management](#other-notes-on-user-management)
  - [4.4 RBAC (Role Based Access Control)](#44-rbac-role-based-access-control)
  - [4.5 Networking](#45-networking)
    - [Pods](#pods)
    - [Kubenet Networking](#kubenet-networking)
    - [VPC Alternatives](#vpc-alternatives)
  - [4.6 Node Maintenance](#46-node-maintenance)
    - [Adding a new node](#adding-a-new-node)
  - [4.7 High Availability](#47-high-availability)
    - [Setup](#setup)
    - [Kops with multiple masters for HA](#kops-with-multiple-masters-for-ha)
  - [4.8 TLS on ELB using Annotations](#48-tls-on-elb-using-annotations)
  - [Intro to kubeadm](#intro-to-kubeadm)

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

## Order to follow

1. KOPS - Getting started
2. Kubernetes Basics

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

## Intro to kubeadm

This is an alternative to running Kubernetes that is not using `kops`