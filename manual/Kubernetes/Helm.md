---
name: Intro to Helm
menu: Helm
---

# 5. Packaging and Deploying on Kubernetes

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
