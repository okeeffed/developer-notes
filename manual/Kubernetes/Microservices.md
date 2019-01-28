---
name: Microservices
menu: Kubernetes
---

# 7. Microservices

If we have multiple apps that require information from between each other, we need to start talking about the  **service mesh**. Normally between applications,  we run into the following problems:

- There is no encryption
- No retries.
- No fallover.
- No intelligent load balancer.
- No routing decisions.
- No metrics/logs/traces.
- No access control.

One solution is to implement **sidecars** which is a proxy to every single microservice. This can resolve issues such as encryption, retries when a connection fails, intelligent load balancing.

You could also add a **management interface** which resolves routing decisions, metrics/logs/traces and access control (ie valid certificate etc).

This brings us to **Istio**.

![Istio diagram](https://res.cloudinary.com/gitgoodclub/image/upload/v1540090167/istio-diagram.png)

## 7.1 Istio Installation

If you want to use Istio, it's worth now using a node with enough memory ie t2.medium.

### Kops configuration

```bash
$ kops edit cluster kubernetes.newtech.academy
```
Add:
```
spec:
  kubeAPIServer:
    admissionControl:
    - NamespaceLifecycle
    - LimitRanger
    - ServiceAccount
    - PersistentVolumeLabel
    - DefaultStorageClass
    - DefaultTolerationSeconds
    - MutatingAdmissionWebhook
    - ValidatingAdmissionWebhook
    - ResourceQuota
    - NodeRestriction
    - Priority
```

### Download (1.0.2):

```bash
$ cd ~
$ wget https://github.com/istio/istio/releases/download/1.0.2/istio-1.0.2-linux.tar.gz
tar -xzvf istio-1.0.2-linux.tar.gz
$ cd istio-1.0.2
# Alternatively just export the PATH so you don't have to logout
$ echo 'export PATH="$PATH:/home/ubuntu/istio-1.0.2/bin"' >> ~/.profile
$ istioctl # check everything is running correctly
```

### Download (latest):

```bash
$ cd ~
$ curl -L https://git.io/getLatestIstio | sh -
$ echo 'export PATH="$PATH:/home/ubuntu/istio-1.0.2/bin"' >> ~/.profile # change 1.0.2 in your version -- alternative just export the PATH so you don't have to logout
$ cd istio-1.0.2 # change 1.0.2 in your version
```

### Istio install

Apply CRDs:

```bash
$ kubectl apply -f ~/istio-1.0.2/install/kubernetes/helm/istio/templates/crds.yaml
```

Wait a few seconds.


Option 1: with no mutual TLS authentication
```bash
$ kubectl apply -f ~/istio-1.0.2/install/kubernetes/istio-demo.yaml
```

Option 2: or with mutual TLS authentication
```bash
$ kubectl apply -f ~/istio-1.0.2/install/kubernetes/istio-demo-auth.yaml
```

## 7.2 Example app

![Example app diagram](https://res.cloudinary.com/gitgoodclub/image/upload/v1540091246/Screen_Shot_2018-10-21_at_2.07.07_pm.png)

### Example app (from istio)

```bash
export PATH="$PATH:/home/ubuntu/istio-1.0.2/bin"
kubectl apply -f <(istioctl kube-inject -f samples/bookinfo/platform/kube/bookinfo.yaml)
```

### Hello world app

```bash
export PATH="$PATH:/home/ubuntu/istio-1.0.2/bin"
kubectl apply -f <(istioctl kube-inject -f helloworld.yaml)
kubectl apply -f helloworld-gw.yaml
```

```yaml
# helloworld.yaml
# Spinning up the container for a simple hello world app
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: hello
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: hello
        version: v1
    spec:
      containers:
      - name: hello
        image: wardviaene/http-echo
        env:
        - name: TEXT
          value: hello
        - name: NEXT
          value: "world:8080"
        ports:
        - name: http
          containerPort: 8080
---
# Exposing a service for "hello"
apiVersion: v1
kind: Service
metadata:
  name: hello
  labels:
    app: hello
spec:
  selector:
    app: hello
  ports:
  - name: http
    port: 8080
    targetPort: 8080
---
# Spinning up container for world
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: world
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: world
        version: v1
    spec:
      containers:
      - name: world
        image: wardviaene/http-echo
        env:
        - name: TEXT
          value: world
        - name: NEXT
          value: "world-2:8080"
        ports:
        - name: http
          containerPort: 8080
---
# Exposing world container
apiVersion: v1
kind: Service
metadata:
  name: world
  labels:
    app: world
spec:
  selector:
    app: world
  ports:
  - name: http
    port: 8080
    targetPort: 8080
---
# World 2 deployment
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: world-2
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: world-2
        version: v1
    spec:
      containers:
      - name: world-2
        image: wardviaene/http-echo
        env:
        - name: TEXT
          value: "!!!" 
        ports:
        - name: http
          containerPort: 8080
---
# Exposing service for world 2 deployment
apiVersion: v1
kind: Service
metadata:
  name: world-2
  labels:
    app: world-2
spec:
  selector:
    app: world-2
  ports:
  - name: http
    port: 8080
    targetPort: 8080
---
```

After deploying and applying the Istio injection from following the above istio commands, we will see that each deploying will have an app running with it along with the sidebar.

For the Istio gateway, we launch the following:

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: helloworld-gateway
spec:
  selector:
    istio: ingressgateway # use istio default controller
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "*"
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: helloworld
spec:
  hosts:
  - "*"
  gateways:
  - helloworld-gateway
  # if we match uri /hello, then follow routing
  http:
  - match:
    - uri:
        prefix: /hello
    route:
    - destination:
        host: hello.default.svc.cluster.local
        port:
          number: 8080
```

### Mutual TLS example

Create pods, services, destinationrules, virtualservices
```bash
kubectl create -f <(istioctl kube-inject -f helloworld-tls.yaml)
kubectl create -f helloworld-legacy.yaml
```

### End-user authentication

```bash
kubectl create -f <(istioctl kube-inject -f helloworld-jwt.yaml)
kubectl create -f helloworld-jwt-enable.yaml
```

If we want to access a Pod, we need to use a gateway. 

```yaml
# helloworld-gw.yaml
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: helloworld-gateway
spec:
  selector:
    istio: ingressgateway # use istio default controller
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "*"
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: helloworld
spec:
  hosts:
  - "*"
  gateways:
  - helloworld-gateway
  http:
  - match:
    - uri:
        prefix: /hello
    route:
    - destination:
        host: hello.default.svc.cluster.local
        port:
          number: 8080
```

If you want a service within Istio, you will always need to define the `VirtualService`. We don't need the `VirtualService` for services that are accessed by the client.

## 7.3 Advanced Istio Routing

![Advanced Routing Setup](https://res.cloudinary.com/gitgoodclub/image/upload/v1540109060/Screen_Shot_2018-10-21_at_7.04.07_pm.png)

Thanks to Istio, we can do advanced routing based around the above diagram thanks to the Deployments having different metadata:

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: hello
spec:
  host: hello.default.svc.cluster.local
  # ! Subsets is where the magic happens!
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: helloworld
spec:
  hosts:
  - "hello.example.com"
  gateways:
  - helloworld-gateway
  http:
  - match:
    - headers:
        end-user:
          exact: john
    route:
    - destination:
        host: hello.default.svc.cluster.local
        subset: v2 # ! match v2 only
        port:
          number: 8080
  - route: # default route for hello.example.com
    - destination:
        host: ! hello.default.svc.cluster.local
        subset: v1 # match v1 only
        port:
          number: 8080
```

Now, if we apply this virtual service to the service mesh, then based on whether we pass the "end-user" header or not, we will hit either v1 or v2!

## 7.4 Canary deployments

Canary deployments basically want routing mainly to the first version, but we also want some A/B testing to have version 2 having a 10% weight.

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: hello
spec:
  host: hello.default.svc.cluster.local
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: helloworld
spec:
  hosts:
  - "hello.example.com"
  gateways:
  - helloworld-gateway
  http:
  - route:
    - destination:
        host: hello.default.svc.cluster.local
        subset: v1
        port:
          number: 8080
      weight: 90
    - destination:
        host: hello.default.svc.cluster.local
        subset: v2
        port:
          number: 8080
      weight: 10
```

## 7.5 Running retries 

If one of the pods stop working, we can retry to another pod without the client seeing any of the issues. The example app has one of three pods running with a 5s latency but a 2s timeout to demonstrate this. It looks like the following:

![Retry diagram](https://res.cloudinary.com/gitgoodclub/image/upload/v1540110459/Screen_Shot_2018-10-21_at_7.26.50_pm.png)

## 7.6 Mutual TLS

The goals of Istio security are:

- **Security by default:** no changes needed for application code and infrastructure.
- **Defense in depth:** integrate with existing security systems to provide multiple layers of defense.
- **Zero-trust network:** build security solutions on untrusted networks.

Two types of auth:

1. Transport authentication (service to service authentication) using Mutual TLS.
2. Origin authentication (end-user authentication). Verifying the end user using JWTs.

Mutual TLS can be turned on **without having to change the code of applications** (because of the sidecar deployment).

It provides each service with a **strong identity**.

- Attacks like impersonation be rerouting DNS records will fail, because a fake application can't prove its identity using the certificate mechanism.
- **Secures (encrypts)** service-to-service and end-user-to-service communication.
- Provides key and certificate management to **manage generation, distribution and rotation**.

![TLS Example App](https://res.cloudinary.com/gitgoodclub/image/upload/v1540153502/Screen_Shot_2018-10-22_at_7.24.10_am.png)

- Legacy applications with not have a sidecar. 
- One service will go LTR, and the other RTL.

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: ns1
---
apiVersion: v1
kind: Namespace
metadata:
  name: ns2
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: hello-tls
  namespace: ns1
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: hello
        version: v1-tls
    spec:
      containers:
      - name: hello
        image: wardviaene/http-echo
        env:
        - name: TEXT
          value: hello
        - name: NEXT
          value: "world.ns2:8080"
        ports:
        - name: http
          containerPort: 8080
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: world-tls
  namespace: ns2
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: world
        version: v1-tls
    spec:
      containers:
      - name: hello
        image: wardviaene/http-echo
        env:
        - name: TEXT
          value: world
        - name: NEXT
          value: "end.legacy:8080"
        ports:
        - name: http
          containerPort: 8080
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: world-reverse-tls
  namespace: ns2
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: world-reverse
        version: v1-tls
    spec:
      containers:
      - name: hello
        image: wardviaene/http-echo
        env:
        - name: TEXT
          value: world
        - name: NEXT
          value: "end-reverse.ns1:8080"
        ports:
        - name: http
          containerPort: 8080
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: end-reverse-tls
  namespace: ns1
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: end-reverse
        version: v1-tls
    spec:
      containers:
      - name: hello
        image: wardviaene/http-echo
        env:
        - name: TEXT
          value: "!!!"
        ports:
        - name: http
          containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: hello
  namespace: ns1
  labels:
    app: hello
spec:
  selector:
    app: hello
  ports:
  - name: http
    port: 8080
    targetPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: world
  namespace: ns2
  labels:
    app: world
spec:
  selector:
    app: world
  ports:
  - name: http
    port: 8080
    targetPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: world-reverse
  namespace: ns2
  labels:
    app: world-reverse
spec:
  selector:
    app: world-reverse
  ports:
  - name: http
    port: 8080
    targetPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: end-reverse
  namespace: ns1
  labels:
    app: end-reverse
spec:
  selector:
    app: end-reverse
  ports:
  - name: http
    port: 8080
    targetPort: 8080
---
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: helloworld-gateway
spec:
  selector:
    istio: ingressgateway # use istio default controller
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "*"
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: hello
spec:
  host: hello.ns1.svc.cluster.local
  # uncomment to enable mutual TLS
  #trafficPolicy:
  #  tls:
  #    mode: ISTIO_MUTUAL
  subsets:
  - name: v1-tls
    labels:
      version: v1-tls
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: hello-reverse
spec:
  host: hello-reverse.legacy.svc.cluster.local
  # uncomment to enable mutual TLS
  #trafficPolicy:
  #  tls:
  #    mode: ISTIO_MUTUAL
  subsets:
  - name: v1-tls
    labels:
      version: v1-tls
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: helloworld-tls
spec:
  hosts:
  - "hello-tls.example.com"
  gateways:
  - helloworld-gateway
  http:
  - route:
    - destination:
        host: hello.ns1.svc.cluster.local
        subset: v1-tls # match v3 only
        port:
          number: 8080
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: helloworld-tls-reverse
spec:
  hosts:
  - "hello-tls-reverse.example.com"
  gateways:
  - helloworld-gateway
  http:
  - route:
    - destination:
        host: hello-reverse.legacy.svc.cluster.local
        subset: v1-tls
        port:
          number: 8080
```

As for the missing legacy services, they can be found in the `helloworld-legacy` file:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: legacy
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: end-tls
  namespace: legacy
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: end
        version: v1-tls
    spec:
      containers:
      - name: hello
        image: wardviaene/http-echo
        env:
        - name: TEXT
          value: "!!!"
        ports:
        - name: http
          containerPort: 8080
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: hello-reverse-tls
  namespace: legacy
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: hello-reverse
        version: v1-tls
    spec:
      containers:
      - name: hello
        image: wardviaene/http-echo
        env:
        - name: TEXT
          value: hello
        - name: NEXT
          value: "world-reverse.ns2:8080"
        ports:
        - name: http
          containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: end
  namespace: legacy
  labels:
    app: end
spec:
  selector:
    app: end
  ports:
  - name: http
    port: 8080
    targetPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: hello-reverse
  namespace: legacy
  labels:
    app: hello-reverse
spec:
  selector:
    app: hello-reverse
  ports:
  - name: http
    port: 8080
    targetPort: 8080
```

Both these files can applied by running the following:

```bash
$ kubectl apply -f <(istioctl kube-inject -f helloworld-tls.yaml)
$ kubectl apply -f helloworld-legacy.yaml
$ kubetl get svc -o wide -n istio-system # get services from istio-system services
# After getting the load balancer, you can then curl the ELB passing the Host header
```

Now we need to **enable TLS authetication.**

```yaml
# helloworld-rbac-enable.yaml
apiVersion: authentication.istio.io/v1alpha1
kind: "MeshPolicy"
metadata:
  name: "default"
spec:
  peers:
  - mtls: {}
---
# ensures mtls is push to side cars
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: "enable-mtls"
  namespace: "default" # even though we specify a namespace, this rule applies to all namespaces
spec:
  host: "*.local"
  trafficPolicy:
    tls:
      mode: ISTIO_MUTUAL
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
 name: "api-server"
spec:
 host: "kubernetes.default.svc.cluster.local"
 trafficPolicy:
   tls:
     mode: DISABLE
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: "legacy"
spec:
  host: "end.legacy.svc.cluster.local"
  trafficPolicy:
    tls:
      mode: DISABLE
```

Apply this file to enable mutual TLS that works one way but not the other (as like in the diagram). However, in the above yaml files we did now enable the traffic policy, so you need to update that and apply the updated files for all of this to work.

## 7.7 RBAC with Istio and MTLS

Now that we have MTLS, we have strong identites.

Based on those identities, we can start doing **Role Based Access Control (RBAC)**.

RBAC allows us to limit access **between our services** and from **end-user to services**.

Istio is able to verify the identity of a service by **checking the identity of the x.509 certificate (which comes with enabled mutual TLS)**. Example: with RBAC, service A might be able to be contacted by B, but not by C.

Istio is using SPIFFE standard (another CNFC project).

RBAC in istio:

- Can provide **service-to-service** and **end-user-to-service** auth.
- Supports **conditions** and **role-binding**.
  - You can bind to **ServiceAccounts** (which can be linked to pods).
  - End-user-to-service can for example let you create **condition on being authenticated using JWT**.
  - It has high performance.
  - Not enabled by default.
  - We can enable it globally or on a namespace.

Example for including it on the "default" namespace:

```yaml
apiVersion: "rbac.istio.io/v1alpha1"
kind: RbacConfig
metadata:
  name: default
spec:
  mode: 'ON_WITH_INCLUSION'
  inclusion:
    namespaces: ["default"]
---
apiVersion: authentication.istio.io/v1alpha1
kind: "MeshPolicy"
metadata:
  name: "default"
spec:
  peers:
  - mtls: {}
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: "enable-mtls"
  namespace: "default" # even though we specify a namespace, this rule applies to all namespaces
spec:
  host: "*.local"
  trafficPolicy:
    tls:
      mode: ISTIO_MUTUAL
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
 name: "api-server"
spec:
 host: "kubernetes.default.svc.cluster.local"
 trafficPolicy:
   tls:
     mode: DISABLE
```

We can then create a **ServiceRole** specifying the rules and a **ServiceRoleBinding** to link a **ServiceRole** to a subject (example Kubernetes **ServiceAccount**).

Example of how we want the demo to look when it comes to what it can contact:

![Contact rules](https://res.cloudinary.com/gitgoodclub/image/upload/v1540155683/Screen_Shot_2018-10-22_at_8.00.47_am.png)

The order for the following is:

1. Create **ServiceRoles** that only enable certain methods and services with specific access.
2. Enable **ServiceRoleBindings** to bind that the **ServiceRoles** to a **subject** (or **ingress controller name** in the first case).
3. Create the **ServiceAccounts** that have the correct metadata required for the **ServiceRoleBindings**.
4. Create the **Deployments** that have the affiliated **ServiceAccount** required.
5. Create a **Service** for that **Deployment**.
6. Create the **Gateway** that uses the default **Istio Gateway** to access the **Services**.
7. Create the **VirtualService** that gives us access to the hello world app through the **Gateway** connected to the **Service** which sits within the **ServiceMesh** from the **IngressController**.
8. Create the **DestinationRule** that allows allows access to the **VirtualService** using **MTLS** from the **IngressController** which is a **Reverse Proxy internal load balancer** accessed from the external **AWS LoadBalancer** tied to the accessible **DNS Records**.
9. You can now access the microservice from the **AWS LoadBalancer Route53 alias** passing the **internal namespace domain** as the **host header**.

```yaml
# ! helloworld-rbac.yaml file
apiVersion: "rbac.istio.io/v1alpha1"
kind: ServiceRole
metadata:
  name: hello-viewer
  namespace: default
spec:
  rules:
  - services: ["hello.default.svc.cluster.local"]
    methods: ["GET", "HEAD"]
---
apiVersion: "rbac.istio.io/v1alpha1"
kind: ServiceRole
metadata:
  name: world-viewer
  namespace: default
spec:
  rules:
  - services: ["world.default.svc.cluster.local"]
    methods: ["GET", "HEAD"]
---
apiVersion: "rbac.istio.io/v1alpha1"
kind: ServiceRole
metadata:
  name: world-2-viewer
  namespace: default
spec:
  rules:
  - services: ["world-2.default.svc.cluster.local"]
    methods: ["GET", "HEAD"]
---
apiVersion: "rbac.istio.io/v1alpha1"
kind: ServiceRoleBinding
metadata:
  name: istio-ingress-binding
  namespace: default
spec:
  subjects:
  - properties:
      source.namespace: "istio-system"
  roleRef:
    kind: ServiceRole
    name: "hello-viewer"
---
apiVersion: "rbac.istio.io/v1alpha1"
kind: ServiceRoleBinding
metadata:
  name: hello-user-binding
  namespace: default
spec:
  subjects:
  - user: "cluster.local/ns/default/sa/hello"
  roleRef:
    kind: ServiceRole
    name: "world-viewer"
---
apiVersion: "rbac.istio.io/v1alpha1"
kind: ServiceRoleBinding
metadata:
  name: world-user-binding
  namespace: default
spec:
  subjects:
  - user: "cluster.local/ns/default/sa/world"
  roleRef:
    kind: ServiceRole
    name: "world-2-viewer"
---
###
### Kubernetes Service accounts
###
apiVersion: v1
kind: ServiceAccount
metadata:
  name: hello
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: world
---
###
### helloworld.yaml deployments, including a serviceaccount
### for the hello deployment and the world deployment
###
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: hello
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: hello
        version: v1
    spec:
      serviceAccountName: hello  # service account
      containers:
      - name: hello
        image: wardviaene/http-echo
        env:
        - name: TEXT
          value: hello
        - name: NEXT
          value: "world:8080"
        ports:
        - name: http
          containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: hello
  labels:
    app: hello
spec:
  selector:
    app: hello
  ports:
  - name: http
    port: 8080
    targetPort: 8080
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: world
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: world
        version: v1
    spec:
      serviceAccountName: world  # service account
      containers:
      - name: world
        image: wardviaene/http-echo
        env:
        - name: TEXT
          value: world
        - name: NEXT
          value: "world-2:8080"
        ports:
        - name: http
          containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: world
  labels:
    app: world
spec:
  selector:
    app: world
  ports:
  - name: http
    port: 8080
    targetPort: 8080
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: world-2
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: world-2
        version: v1
    spec:
      containers:
      - name: world-2
        image: wardviaene/http-echo
        env:
        - name: TEXT
          value: "!!!"
        ports:
        - name: http
          containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: world-2
  labels:
    app: world-2
spec:
  selector:
    app: world-2
  ports:
  - name: http
    port: 8080
    targetPort: 8080
---
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: helloworld-gateway
spec:
  selector:
    istio: ingressgateway # use istio default controller
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "*"
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: helloworld
spec:
  hosts:
  - "hello-rbac.example.com"
  gateways:
  - helloworld-gateway
  http:
  - route:
    - destination:
        host: hello.default.svc.cluster.local
        subset: v1
        port:
          number: 8080
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: hello
spec:
  host: hello.default.svc.cluster.local
  # uncomment to enable mutual TLS
  trafficPolicy:
    tls:
      mode: ISTIO_MUTUAL
  subsets:
  - name: v1
    labels:
      version: v1
```

This again requires the rbac prequisite:

```yaml
# helloworld-rbac-enable.yaml
apiVersion: authentication.istio.io/v1alpha1
kind: "MeshPolicy"
metadata:
  name: "default"
spec:
  peers:
  - mtls: {}
---
# ensures mtls is push to side cars
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: "enable-mtls"
  namespace: "default" # even though we specify a namespace, this rule applies to all namespaces
spec:
  host: "*.local"
  trafficPolicy:
    tls:
      mode: ISTIO_MUTUAL
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
 name: "api-server"
spec:
 host: "kubernetes.default.svc.cluster.local"
 trafficPolicy:
   tls:
     mode: DISABLE
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: "legacy"
spec:
  host: "end.legacy.svc.cluster.local"
  trafficPolicy:
    tls:
      mode: DISABLE
```

![After applying the files to Istio](https://res.cloudinary.com/gitgoodclub/image/upload/v1540159695/Screen_Shot_2018-10-22_at_9.07.45_am.png)

Evidently enough, it is incredibly important to ensure the routing is set up correctly so there is no large scale failure.

## 7.8 End-user Authentication

Istio currently supports JWT tokens to authenticate users.

In the implementation, the user will receive a JWT token from an authenticated server after logging in.

- This app will provide us with a token that is **signed with a key**.
- The data is not encrypted, but the **token contains a signature**, which can be **verified** to see **whether it was really created by the server**.
- Only the server has the **private key**, so we can't recreate or tamper with the token.
- Using microservices, every app would need to be **seperately configured**.
- Every service would need to **validate the token**.
  - Once validated the service would need to check whether the user has access to this service.
- With Istio, **this can be taken away from the app code and managed centrally.**
- You can configure the **jwt token signature/properties** you expect in into and have **policies to allow/disallow access to a service.**
  - Example "hello" app might only be accessible if user is authenticated.
  - The **sidecar** will verify the **validity** of the signature, to make sure the token is valid.

![JWT Token setup](https://res.cloudinary.com/gitgoodclub/image/upload/v1540160832/Screen_Shot_2018-10-22_at_9.26.42_am.png)

```yaml
# Istio with JWT Auth
# helloworld-jwt.yaml
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: helloworld-gateway
spec:
  selector:
    istio: ingressgateway # use istio default controller
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "*"
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: helloworld-auth
spec:
  # this is a change to previous
  hosts:
  - "auth.kubernetes.newtech.academy"
  gateways:
  - helloworld-gateway
  http:
  - route:
    - destination:
        host: auth.default.svc.cluster.local
        port:
          number: 8080
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: helloworld-hello
spec:
  hosts:
  - "hello.kubernetes.newtech.academy"
  gateways:
  - helloworld-gateway
  http:
  - route:
    - destination:
        host: hello.default.svc.cluster.local
        port:
          number: 8080
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: auth
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: auth
        version: v1
    spec:
      containers:
      - name: auth
        image: wardviaene/http-echo
        env:
        - name: TEXT
          value: this is the authentication service
        ports:
        - name: http
          containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: auth
  labels:
    app: auth
spec:
  selector:
    app: auth
  ports:
  - name: http
    port: 8080
    targetPort: 8080
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: hello
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: hello
        version: v1
    spec:
      containers:
      - name: hello
        image: wardviaene/http-echo
        env:
        - name: TEXT
          value: Hello, you can only reach this service when authenticated
        ports:
        - name: http
          containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: hello
  labels:
    app: hello
spec:
  selector:
    app: hello
  ports:
  - name: http
    port: 8080
    targetPort: 8080
###
### Enable TLS
###
---
apiVersion: authentication.istio.io/v1alpha1
kind: "MeshPolicy"
metadata:
  name: "default"
spec:
  peers:
  - mtls: {}
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: "enable-mtls"
  namespace: "default" # even though we specify a namespace, this rule applies to all namespaces
spec:
  host: "*.local"
  trafficPolicy:
    tls:
      mode: ISTIO_MUTUAL
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
 name: "api-server"
spec:
 host: "kubernetes.default.svc.cluster.local"
 trafficPolicy:
   tls:
     mode: DISABLE
```

To get to auth, we need to create an alias for `auth.domain.name` in Route 53 to expose the load balancer.

To enable the policy for the JWT token auth to take effect, we need to apply the following to the cluster:

```yaml
# helloworld-jwt-enable.yaml
apiVersion: "authentication.istio.io/v1alpha1"
kind: "Policy"
metadata:
  name: "jwt-example"
spec:
  targets:
  - name: hello
  peers:
  - mtls: {}
  origins:
  - jwt:
  	  # jwksUri is from auth uri we setup in Route53
      issuer: "http-echo@http-echo.kubernetes.newtech.academy"
      jwksUri: "http://auth.kubernetes.newtech.academy/.well-known/jwks.json"
  principalBinding: USE_ORIGIN
---
```

After fetching the token, we can now access authenticated routes by passing the header `"Authorization": "Bearer $TOKEN"`.

The example uses [this Github repo](https://github.com/wardviaene/http-echo/blob/master/main.go) with the /login route to do auth and another route to check the auth from other services.

Something useful is that you can also check the logs of the Istio proxy. This can be done with `kubectl logs <% pod_name %> -c istio-proxy`.

## 7.9 Istio Ingress Traffic

To enable ingress traffic to allow to access outside services, we can apply an external service file. The following example will allow the `ifconfig.co` hostname to be accessible from the pods.

```yaml
# external-service.yaml
#
# http
#
apiVersion: networking.istio.io/v1alpha3
kind: ServiceEntry
metadata:
  name: ifconfig-co-http
spec:
  hosts:
  - ifconfig.co
  ports:
  - number: 80
    name: http
    protocol: HTTP
  resolution: DNS
  location: MESH_EXTERNAL
---
#
# https
#
apiVersion: networking.istio.io/v1alpha3
kind: ServiceEntry
metadata:
  name: ifconfig-co-https
spec:
  hosts:
  - ifconfig.co
  ports:
  - number: 443
    name: https
    protocol: HTTPS
  resolution: DNS
  location: MESH_EXTERNAL
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: ifconfig-co
spec:
  hosts:
  - ifconfig.co
  tls:
  - match:
    - port: 443
      sni_hosts:
      - ifconfig.co
    route:
    - destination:
        host: ifconfig.co
        port:
          number: 443
      weight: 100
```

You should now be able to log into the pod to try out contacting other services.

## 7.10 Distributed Tracing with Jaegar

Jaegar is automatically store in the `isto-system`. You can confirm this with the following:

```bash
$ kubectl get pod -n istio-system # istio-tracing pod
$ kubectl get svc -n istio-system # jaegar-[agent/collector/query]
# You could export the port for jaegar-query by updating the service
$ kubectl edit svc jaegar-query -n istio-system # changing ClusterIP to LoadBalancer
```

To find the traces, you need to find the svc **LoadBalancer** port for Jaegar Query and then you can access the web url using the port.

## 7.11 Istio Metrics with Grafana

Similar to Jaegar, you can find the Grafana service by getting the services for the Istio System.

```bash
$ kubectl get svc -n istio-system # grafana
# You could export the port for grafana by updating the service
$ kubectl edit svc grafana -n istio-system # changing ClusterIP to LoadBalancer
```