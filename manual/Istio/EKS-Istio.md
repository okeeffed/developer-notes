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
# From the istio folder, apply the book info
kubectl apply -f \<(istioctl kube-inject -f samples/bookinfo/platform/kube/bookinfo.yaml)
# Expose the BookInfo with the Gateway resource
kubectl apply -f samples/bookinfo/networking/bookinfo-gateway.yaml
```

For bookinfo.yaml:

```yaml
# bookinfo.yaml
#
# Copyright 2017 Istio Authors
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.

##################################################################################################
# Details service
##################################################################################################
apiVersion: v1
kind: Service
metadata:
  name: details
  labels:
    app: details
spec:
  ports:
    - port: 9080
      name: http
  selector:
    app: details
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: details-v1
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: details
        version: v1
    spec:
      containers:
        - name: details
          image: istio/examples-bookinfo-details-v1:1.10.0
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 9080
---
##################################################################################################
# Ratings service
##################################################################################################
apiVersion: v1
kind: Service
metadata:
  name: ratings
  labels:
    app: ratings
spec:
  ports:
    - port: 9080
      name: http
  selector:
    app: ratings
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: ratings-v1
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: ratings
        version: v1
    spec:
      containers:
        - name: ratings
          image: istio/examples-bookinfo-ratings-v1:1.10.0
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 9080
---
##################################################################################################
# Reviews service
##################################################################################################
apiVersion: v1
kind: Service
metadata:
  name: reviews
  labels:
    app: reviews
spec:
  ports:
    - port: 9080
      name: http
  selector:
    app: reviews
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: reviews-v1
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: reviews
        version: v1
    spec:
      containers:
        - name: reviews
          image: istio/examples-bookinfo-reviews-v1:1.10.0
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 9080
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: reviews-v2
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: reviews
        version: v2
    spec:
      containers:
        - name: reviews
          image: istio/examples-bookinfo-reviews-v2:1.10.0
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 9080
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: reviews-v3
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: reviews
        version: v3
    spec:
      containers:
        - name: reviews
          image: istio/examples-bookinfo-reviews-v3:1.10.0
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 9080
---
##################################################################################################
# Productpage services
##################################################################################################
apiVersion: v1
kind: Service
metadata:
  name: productpage
  labels:
    app: productpage
spec:
  ports:
    - port: 9080
      name: http
  selector:
    app: productpage
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: productpage-v1
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: productpage
        version: v1
    spec:
      containers:
        - name: productpage
          image: istio/examples-bookinfo-productpage-v1:1.10.0
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 9080
---

```

The following commands will locate the host and port we ultimately need to hit to access our Bookinfo application from across the internet:

```shell
$ export INGRESS_HOST=$(kubectl -n istio-system \
get service istio-ingressgateway \
-o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
$ export INGRESS_PORT=$(kubectl -n istio-system \
get service istio-ingressgateway \
-o jsonpath='{.spec.ports[?(@.name=="http2")].port}')
$ export GATEWAY_URL=$INGRESS_HOST:$INGRESS_PORT
```

## Layer 7 Routing

So, let’s get things under control and pin all calls to reviews v1 for now.

The Bookinfo sample has a few pre-made Istio configs we can use, and this is one of them.

First we need to tell Istio about the different versions that exist and how to tell them apart (in this case, labels on the Kubernetes Deployment).

```shell
kubectl apply -f samples/bookinfo/networking/destination-rule-all.yaml
```

```yaml
# destination-rule-all.yaml
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: productpage
spec:
  host: productpage
  subsets:
    - name: v1
      labels:
        version: v1
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: reviews
spec:
  host: reviews
  subsets:
    - name: v1
      labels:
        version: v1
    - name: v2
      labels:
        version: v2
    - name: v3
      labels:
        version: v3
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: ratings
spec:
  host: ratings
  subsets:
    - name: v1
      labels:
        version: v1
    - name: v2
      labels:
        version: v2
    - name: v2-mysql
      labels:
        version: v2-mysql
    - name: v2-mysql-vm
      labels:
        version: v2-mysql-vm
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: details
spec:
  host: details
  subsets:
    - name: v1
      labels:
        version: v1
    - name: v2
      labels:
        version: v2
---

```

![Dest rules](https://i-h1.pinimg.com/564x/e9/a7/81/e9a7819b6ed349f27d4ea0915c0665f5.jpg)

With those subsets of the reviews Service defined, we can tell Istio that anyone looking to call reviews should always be directed to v1.

```shell
kubectl apply -f samples/bookinfo/networking/virtual-service-all-v1.yaml
```

```yaml
# virtual-service-ruleallv1.yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: productpage
spec:
  hosts:
    - productpage
  http:
    - route:
        - destination:
            host: productpage
            subset: v1
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: reviews
spec:
  hosts:
    - reviews
  http:
    - route:
        - destination:
            host: reviews
            subset: v1
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: ratings
spec:
  hosts:
    - ratings
  http:
    - route:
        - destination:
            host: ratings
            subset: v1
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: details
spec:
  hosts:
    - details
  http:
    - route:
        - destination:
            host: details
            subset: v1
---

```

![Route changes](https://d2908q01vomqb2.cloudfront.net/ca3512f4dfa95a03169c5a670a4c91a19b3077b4/2018/08/22/istio-host-reviews.jpg)

## Teardown

Deleting the resources:

```shell
kubectl delete -f samples/bookinfo/networking/bookinfo-gateway.yaml
kubectl delete -f \<(istioctl kube-inject -f samples/bookinfo/platform/kube/bookinfo.yaml)
helm delete \
--wait \
--name istio \
--namespace istio-system \
install/kubernetes/helm/istio
```
