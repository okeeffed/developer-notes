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

First we need to create a secret. We can just pass a literal secret by running `kubectl create secret generic mysql-pass --from-literal=password=password --namespace=ns-eks-course`
