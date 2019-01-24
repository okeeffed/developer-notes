---
name: Kubectl Overview
menu: Kubernetes
---

# Kubectl Overview

## tl;dr

### Resources

| Reference  | Resource      |
| ---------- | ------------- |
| pod        | Pods          |
| svc        | Services      |
| ns         | Namespaces    |
| rs         | Replica Sets  |
| deployment | Deployments   |
| node       | Cluster nodes |

### Actions 

| Command  | Action            | Example                         |
| -------- | ----------------- | ------------------------------- |
| get      | Get resource      | kubectl get pods                |
| describe | Describe resource | kubectl describe node `<NODE>`  |
| delete   | Delete resource   | kubectl delete pod `<POD>`      |
| create   | Create resource   | kubectl create ns `<NAMESPACE>` |

## Setting config

Example exporting to set the correct `KUBECONFIG`.

```shell
export KUBECONFIG=~/.kube/eksctl/clusters/cluster
```

## Base fetching

| Action       | Command                                                                   |
| ------------ | ------------------------------------------------------------------------- |
| Rolebindings | kubectl get rolebinds --namespace `<namespace>` --selector=`<selector>`   |
| Pods         | kubectl get pods --namespace `<namespace>` --selector=`<selector>`        |
| Deployments  | kubectl get deployments --namespace `<namespace>` --selector=`<selector>` |
| Services     | kubectl get svc --namespace `<namespace>` --selector=`<selector>`         |
| Replica Sets | kubectl get replicasets --namespace `<namespace>` --selector=`<selector>` |


## All

| Action           | Command                                                                           |
| ---------------- | --------------------------------------------------------------------------------- |
| Get rolebindings | kubectl get all --namespace `<namespace>` --selector=k8s-app=kubernetes-dashboard |

## Rolebindings

| Action                            | Command                                                                     |
| --------------------------------- | --------------------------------------------------------------------------- |
| Get rolebindings                  | kubectl get rolebindings --namespace `<namespace>`                          |
| Describe rolebindings             | kubectl describe rolebindings --namespace `<namespace>`                     |
| Describe rolebindings for service | kubectl describe rolebindings `<service account>` --namespace `<namespace>` |

## Namespaces

| Action           | Command                                |
| ---------------- | -------------------------------------- |
| Create namespace | kubectl create namespace `<NAMESPACE>` |
| Get namespace    | kubectl get namespace                  |

## Services

To do

## Pods

To do

## Deployments

## Replica Sets