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

| Command                                  | Description                              |
| ---------------------------------------- | ---------------------------------------- |
| helm init                                | Install tiller on the cluser             |
| helm reset                               | Remove tiller                            |
| helm install `<CHART>`                   | Install chart                            |
| helm search `<CHART>`                    | Searches for chart                       |
| helm search redis                        | Looks for Redis chart                    |
| helm install --name myredis stable/redis | Installs Redis chart found under myredis |
| helm delete myredis                      | Delete Redis install named myredis       |
| helm create `<CHART_NAME>`               | Create your own chart                    |

### Installing Helm

```shell
curl https://raw.githubusercontent.com/helm/helm/master/scripts/get > get_helm.sh
chmod 700 get_helm.sh
./get_helm.sh
```

Alternatively:

```shell
curl https://raw.githubusercontent.com/helm/helm/master/scripts/get | bash
```

#### Linux Distro Install

```shell
wget https://kubernetes-helm.storage.googleapis.com/helm-v2.11.0-linux-amd64.tar.gz
tar -xzvf helm-v2.11.0-linux-amd64.tar.gz
sudo mv linux-amd64/helm /usr/local/bin/helm
```

### Adding to cluster

```yaml
# helm-rbac.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: tiller
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: tiller
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
  - kind: ServiceAccount
    name: tiller
    namespace: kube-system
```

```shell
kubectl apply -f helm-rbac.yaml
helm init --service-account tiller
```

## 5.2 Creating your own helm charts

This is the recommended way to deploy applications.

- Packaging the app allows you to deploy the app in 1 command.
- Helm allows for upgrades and rollbacks.
- Helm chart is also version controlled.

```shell
# creates director mychart/
helm create mychart
```

## 5.3 Setting up Helm Repo with S3

If you have charts stored on S3:

```shell
# Install plugin
helm plugin install https://github.com/hypnoglow/helm-s3.git

# Initialise s3 bucket
helm s3 init s3://helm-bucket/charts

# Add report to helm
helm repo add my-charts s3://helm-bucket/charts
``` 