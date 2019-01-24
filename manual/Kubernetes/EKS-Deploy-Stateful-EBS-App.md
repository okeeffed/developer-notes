---
name: Deploy Stateful EBS App with EKS
menu: Kubernetes
---

# Deploying a stateful app

## The app

![App layout](https://res.cloudinary.com/gitgoodclub/image/upload/v1548289711/eks-course/Screen_Shot_2019-01-24_at_11.28.22_am.png)

### Frontend

Wordpress with:

- Persistent volume (EBS) to store HTML
- Public facing ELB

### Backend

- Persistent volume (EBS) to store MySQL data

## The EBS Volumes

The EBS volumes are tied to an Availability Zone. Re-created pods can only be started in the AZ of the previous volume.

To properly deploy WordPress, we need a shared volume between all the pods (specific to Wordpress).

We want to deploy our pods in multiple AZ.

Therefore the shared volume MUST BE Amazon EFS (Elastic File System).

For this app, EBS is used to demo how things work for stateful apps that do leverage EBS (like MySQL).

## Creating the Namespace

This is best practice to separate the workloads.

- Separation examples can be project, client, team, environment.
- Namespaces can also give resource quotas, access controls etc.

Let's create our own Wordpress stateful app.

```shell
kubectl create namespace ns-eks-course
```

## Creating the storage class

We can see there are no storage classes by running the following:

```shell
kubectl get storageClass --all-namespaces
```

We can create the storage class by applying the following YAML file:

```yml
# gp2-storage-class.yaml
kind: StorageClass
apiVersion: storage.k8s.io/v1
metadata:
  name: gp2
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp2
reclaimPolicy: Retain
mountOptions:
  - debug
```

After applying with `kubectl`, we will have the EBS class created.

We need to set this to default, which we can do by running `kubectl patch sc gp2 -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}' --namespace=ns-eks-course`

## Creating the persistent volume claim (PVC)

Here we are creating two persistent volume claims for both MySQL and WordPress.

```yaml
# pvcs.yml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-pv-claim
  labels:
    app: wordpress
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: wp-pv-claim
  labels:
    app: wordpress
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
```

Afte applying, we can see the pvcs there running `kubectl get pvc --namespace=<NS>`.

## Deploying MySQL

First we need to create a secret. We can just pass a literal secret by running `kubectl create secret generic mysql-pass --from-literal=password=password --namespace=ns-eks-course`.

We can deploy SQL with the following:

```yml
# mysql.yaml
apiVersion: v1
kind: Service
metadata:
  name: wordpress-mysql
  labels:
    app: wordpress
spec:
  ports:
    - port: 3306
  selector:
    app: wordpress
    tier: mysql
  # Ensures no dedicated cluster IP and to remain private
  clusterIP: None
---
apiVersion: apps/v1 # for versions before 1.9.0 use apps/v1beta2
kind: Deployment
metadata:
  name: wordpress-mysql
  labels:
    app: wordpress
spec:
  selector:
    matchLabels:
      app: wordpress
      tier: mysql
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: wordpress
        tier: mysql
    spec:
      containers:
        - image: mysql:5.6
          name: mysql
          env:
            - name: MYSQL_ROOT_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: mysql-pass
                  key: password
          ports:
            - containerPort: 3306
              name: mysql
          volumeMounts:
            - name: mysql-persistent-storage
              mountPath: /var/lib/mysql
      volumes:
        - name: mysql-persistent-storage
          persistentVolumeClaim:
            claimName: mysql-pv-claim
```

Apply the file and we should get what we want:

```shell
root@root:~/eks-course/stateful-app# kubectl get pods
NAME                              READY   STATUS              RESTARTS   AGE
wordpress-mysql-565494758-9p4zm   0/1     ContainerCreating   0          13s
```

Using the dashboard or AWS console, we should now be able to confirm after the pod is ready that the volume has successfully attached to the pod.

## Deployment vs StatefulSet by using storageclass for EBS

One of the issues we face is that if we deploy with EBS, the EBS volume will at most attach only to one node. This is very important to understand!

As for a `StatefulSet` with an EBS volume, it is used to **attach to a pod** (used for things like ZooKeeper, Kafka etc).

### Wordpress as a deployment

We will launch the Wordpress app as a `Deployment`, and what that means is that each pod launched will refer to the same Persistent Volume!

````yml
# deploy-wordpress-as-deployment.yml
apiVersion: v1
kind: Service
metadata:
  name: wordpress
  labels:
    app: wordpress
spec:
  ports:
    - port: 80
  selector:
    app: wordpress
    tier: frontend
  type: LoadBalancer
---
apiVersion: apps/v1 # for versions before 1.9.0 use apps/v1beta2
kind: Deployment
metadata:
  name: wordpress
  labels:
    app: wordpress
spec:
  selector:
    matchLabels:
      app: wordpress
      tier: frontend
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: wordpress
        tier: frontend
    spec:
      containers:
      - image: wordpress:4.8-apache
        name: wordpress
        env:
        - name: WORDPRESS_DB_HOST
          value: wordpress-mysql
        - name: WORDPRESS_DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-pass
              key: password
        ports:
        - containerPort: 80
          name: wordpress
        volumeMounts:
        - name: wordpress-persistent-storage
          mountPath: /var/www/html
      volumes:
      - name: wordpress-persistent-storage
        persistentVolumeClaim:
          claimName: wp-pv-claim
          ```
````
