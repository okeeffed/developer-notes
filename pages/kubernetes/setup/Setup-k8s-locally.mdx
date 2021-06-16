# Setting up Kubernetes on Mac

## Resources

1. [Matthew Palmer blog](https://matthewpalmer.net/kubernetes-app-developer/articles/guide-install-kubernetes-mac.html)
2. [Setup k8s on Mac](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/#install-with-homebrew-on-macos)
3. [Minikube - getting started](https://minikube.sigs.k8s.io/docs/start/)
4. [Hello minikube](https://kubernetes.io/docs/tutorials/hello-minikube/)

## Prerequisites

1. Docker is install locally

## Setup on Mac

This will detail the local setup of Kubernetes on Mac.

```s
# Cask needs to be installed
$ brew tap homebrew/cask
# Virtualbox is used to distribute the k8s cluster
$ brew cask install virtualbox
# Install local Kubernetes - minikube
$ brew install minikube
# CLI to interact with K8s
$ brew install kubectl
```

## Starting up Minikube

```s
$ minikube start
😄  minikube v1.21.0 on Darwin 11.2.3
    ▪ KUBECONFIG=/Users/dennisokeeffe/.kube/kube-config-eks
✨  Automatically selected the docker driver. Other choices: hyperkit, virtualbox, ssh
👍  Starting control plane node minikube in cluster minikube
🚜  Pulling base image ...
💾  Downloading Kubernetes v1.20.7 preload ...
    > preloaded-images-k8s-v11-v1...: 492.20 MiB / 492.20 MiB  100.00% 1.95 MiB
    > gcr.io/k8s-minikube/kicbase...: 359.09 MiB / 359.09 MiB  100.00% 1.31 MiB
🔥  Creating docker container (CPUs=2, Memory=4000MB) ...
🐳  Preparing Kubernetes v1.20.7 on Docker 20.10.7 ...
    ▪ Generating certificates and keys ...
    ▪ Booting up control plane ...
    ▪ Configuring RBAC rules ...
🔎  Verifying Kubernetes components...
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
🌟  Enabled addons: storage-provisioner, default-storageclass
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default

# In terminal 2
$ minikube dashboard
🔌  Enabling dashboard ...
    ▪ Using image kubernetesui/dashboard:v2.1.0
    ▪ Using image kubernetesui/metrics-scraper:v1.0.4
🤔  Verifying dashboard health ...
🚀  Launching proxy ...
🤔  Verifying proxy health ...
🎉  Opening http://127.0.0.1:50340/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/ in your default browser...

# Back to terminal 1
# Create a deployment
$ kubectl create deployment hello-node --image=k8s.gcr.io/echoserver:1.4
deployment.apps/hello-node created

$ kubectl get deployments
NAME         READY   UP-TO-DATE   AVAILABLE   AGE
hello-node   1/1     1            1           1m

$ kubectl get pods
NAME                          READY     STATUS    RESTARTS   AGE
hello-node-5f76cf6ccf-br9b5   1/1       Running   0          1m

# View cluster events
$ kubectl get events
LAST SEEN   TYPE     REASON                    OBJECT                             MESSAGE
2m47s       Normal   Scheduled                 pod/hello-node-7567d9fdc9-66ncm    Successfully assigned default/hello-node-7567d9fdc9-66ncm to minikube
2m47s       Normal   Pulling                   pod/hello-node-7567d9fdc9-66ncm    Pulling image "k8s.gcr.io/echoserver:1.4"
2m25s       Normal   Pulled                    pod/hello-node-7567d9fdc9-66ncm    Successfully pulled image "k8s.gcr.io/echoserver:1.4" in 21.4662151s
2m25s       Normal   Created                   pod/hello-node-7567d9fdc9-66ncm    Created container echoserver
2m25s       Normal   Started                   pod/hello-node-7567d9fdc9-66ncm    Started container echoserver
2m47s       Normal   SuccessfulCreate          replicaset/hello-node-7567d9fdc9   Created pod: hello-node-7567d9fdc9-66ncm
2m47s       Normal   ScalingReplicaSet         deployment/hello-node              Scaled up replica set hello-node-7567d9fdc9 to 1

# View config
$ kubectl config view
# ... config output

# Create a service. By default, the pod is only accessible by its internal IP address.
$ kubectl expose deployment hello-node --type=LoadBalancer --port=8080
service/hello-node exposed

# Check the serice
$ kubectl get services
NAME         TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
hello-node   LoadBalancer   10.108.144.78   <pending>     8080:30369/TCP   21s
kubernetes   ClusterIP      10.96.0.1       <none>        443/TCP          23m

# Open up a browser to your service
$ minikube service hello-node
```

## Enabling/Disabling add-ons

See enabled addons with the following:

```s
$ minikube addons list
# ... addons listed
$ minikube addons enable metrics-server
# add metrics
$ kubectl get pod,svc -n kube-system
NAME                                        READY     STATUS    RESTARTS   AGE
pod/coredns-5644d7b6d9-mh9ll                1/1       Running   0          34m
pod/coredns-5644d7b6d9-pqd2t                1/1       Running   0          34m
pod/metrics-server-67fb648c5                1/1       Running   0          26s
pod/etcd-minikube                           1/1       Running   0          34m
pod/influxdb-grafana-b29w8                  2/2       Running   0          26s
pod/kube-addon-manager-minikube             1/1       Running   0          34m
pod/kube-apiserver-minikube                 1/1       Running   0          34m
pod/kube-controller-manager-minikube        1/1       Running   0          34m
pod/kube-proxy-rnlps                        1/1       Running   0          34m
pod/kube-scheduler-minikube                 1/1       Running   0          34m
pod/storage-provisioner                     1/1       Running   0          34m

NAME                           TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)             AGE
service/metrics-server         ClusterIP   10.96.241.45    <none>        80/TCP              26s
service/kube-dns               ClusterIP   10.96.0.10      <none>        53/UDP,53/TCP       34m
service/monitoring-grafana     NodePort    10.99.24.54     <none>        80:30002/TCP        26s
service/monitoring-influxdb    ClusterIP   10.111.169.94   <none>        8083/TCP,8086/TCP   26s

$ minikube addons disable metrics-server
# disables addon

$ kubectl delete service hello-node
$ kubectl delete deployment hello-node
$ minikube stop

# optionally, delete the VM
$ minikube delete
```

## Tunnel a LoadBalancer service

Instead of running `minikube service hello-node`, we could also tunnel directly to the exposed port:

```s
$ kubectl create deployment balanced --image=k8s.gcr.io/echoserver:1.4
$ kubectl expose deployment balanced --type=LoadBalancer --port=8080
# in another window
$ minikube tunnel
$ kubectl get services balanced
# deployment is seen to be available at <EXTERNAL-IP>:8080
```

## NodePort

Instead of using a LoadBalancer, we could expose a service through a NodePort.

```s
$ kubectl expose deployment hello-node --type=NodePort --port=8080
# Response

$ kubectl port-forward service/hello-node 7080:8080
```
