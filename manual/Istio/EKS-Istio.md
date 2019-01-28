---
name: Istio on EKS
menu: Istio
---

# Getting start with Istio on EKS

Reference link https://aws.amazon.com/blogs/opensource/getting-started-istio-eks/

## Architecture

![Small network proxy "sidecar" alongside each microservice](https://i-h1.pinimg.com/564x/15/d7/9a/15d79a5f70bb45900166d1e3a6a3ea09.jpg)

Istio works by having a small network proxy sit alongside each microservice. This so-called “sidecar” intercepts all of the service’s traffic, and handles it more intelligently than a simple layer 3 network can. Istio uses the Envoy proxy as its sidecar. Envoy was originally written at Lyft and is now a CNCF project. The whole set of sidecars, one per microservice, is called the data plane. The work of the sidecars is coordinated by a small number of central components called the control plane. Control and data plane architectures are very common in distributed systems, from network switches to compute farms.

## Setting up Istio

tl;dr is to use `eksctl` to create an EKS cluster.

```shell
eksctl create cluster \
    --region us-west-2 \
    --name istio-on-eks \
    --nodes 2 \
    --ssh-public-key "~/.ssh/id_rsa.pub"
```

Ensure you download and abstract the latest Istio release.

```shell
curl -L https://git.io/getLatestIstio | sh -
cd istio-1.*
```

After changing in, ensure that you are using `helm` to set up.

```shell
kubectl create -f install/kubernetes/helm/helm-service-account.yaml
# Export isto to bin to enable istioctl
helm init --service-account tiller
helm install \
--wait \
--name istio \
--namespace istio-system \
install/kubernetes/helm/istio
# Check `kubectl -n kube-system get po` to see if tiller pod running
kubectl label namespace default istio-injection=enabled
```

Note: This is not the best example of security practice. Check Helm docs for RBAC to show you how to set up securely.

## Running a test application

```shell
# From the istio folder
kubectl apply -f \<(istioctl kube-inject -f samples/bookinfo/platform/kube/bookinfo.yaml)
```
