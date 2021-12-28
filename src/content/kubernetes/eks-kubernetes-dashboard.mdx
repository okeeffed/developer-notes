---
name: EKS Kubernetes Dashboard
menu: Kubernetes
---

# Kubernetes Dashboard

This belongs to the Kubernetes project and gives you a UI overview of what is going on.

It displays info about:

- Workload (Deployments, Pods, ReplicationSets)
- Namespaces
- Services
- Nodes & Storage
- Usage Metrics (Heapster monitoring required)

The dashboard can also execute commands based on propr RBAC permissions.

Security:

- HTTPS
- Login via Bearer token
- RBAC to define fine-grain access to UI components

More info can be found https://github.com/kubernetes/dashboard.

What the setup for us will look like when touching base with the dashboard:

![Dashboard access layout](https://res.cloudinary.com/gitgoodclub/image/upload/v1548218031/eks-course/Screen_Shot_2019-01-23_at_3.33.27_pm.png)

## Steps to take

1. Create service account and RBAC rules
2. Deploy dashboard
3. Deploy metrics Add-Ons
4. Create cluster admin account and explore dashboard

We need to create:

1. A service account for the dashboard
2. Several roles to grant privileges (RBAC) to the dashboard
3. A role binding to link the service account to the RBAC roles

## Creating the ServiceAccount and Roles

First, we handle the RBAC by creating the `ServiceAccount` and `Role` and then using a `RoleBinding` to attach that Role to the Service Account.

dashboard-account-rab.yaml:

```yaml
# ------------------- Dashboard Service Account ------------------- #

apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard
  namespace: kube-system

---
# ------------------- Dashboard Role & Role Binding ------------------- #

kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: kubernetes-dashboard-minimal
  namespace: kube-system
rules:
  # Allow Dashboard to create 'kubernetes-dashboard-key-holder' secret.
  - apiGroups: ['']
    resources: ['secrets']
    verbs: ['create']
    # Allow Dashboard to create 'kubernetes-dashboard-settings' config map.
  - apiGroups: ['']
    resources: ['configmaps']
    verbs: ['create']
    # Allow Dashboard to get, update and delete Dashboard exclusive secrets.
  - apiGroups: ['']
    resources: ['secrets']
    resourceNames:
      ['kubernetes-dashboard-key-holder', 'kubernetes-dashboard-certs']
    verbs: ['get', 'update', 'delete']
    # Allow Dashboard to get and update 'kubernetes-dashboard-settings' config map.
  - apiGroups: ['']
    resources: ['configmaps']
    resourceNames: ['kubernetes-dashboard-settings']
    verbs: ['get', 'update']
    # Allow Dashboard to get metrics from heapster.
  - apiGroups: ['']
    resources: ['services']
    resourceNames: ['heapster']
    verbs: ['proxy']
  - apiGroups: ['']
    resources: ['services/proxy']
    resourceNames: ['heapster', 'http:heapster:', 'https:heapster:']
    verbs: ['get']

---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: kubernetes-dashboard-minimal
  namespace: kube-system
roleRef:
  # Reference role we created above
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: kubernetes-dashboard-minimal
subjects:
  # Attach RoleBinding to Service Account we first created
  - kind: ServiceAccount
    name: kubernetes-dashboard
    namespace: kube-system

---

```

## Deploying the dashboard

![Layout](https://res.cloudinary.com/gitgoodclub/image/upload/v1548219837/eks-course/Screen_Shot_2019-01-23_at_4.03.45_pm.png)

There will be 3 resources created in the lecture:

1. Service: fixed port, fixed url, user facing
2. Deployment: Dashboard pod -- port 8443 (can live on any host)
3. Volume: This will contain our secret certificates

This is all stored in the `deploy-dashboard.yml` file:

```yaml
# Copyright 2017 The Kubernetes Authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# ------------------- Dashboard Secret ------------------- #

apiVersion: v1
kind: Secret
metadata:
  labels:
    # Using this to match easily
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard-certs
  namespace: kube-system
type: Opaque

---
# ------------------- Dashboard Deployment ------------------- #

kind: Deployment
apiVersion: apps/v1beta2
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  # Used for Service to target
  name: kubernetes-dashboard
  namespace: kube-system
spec:
  replicas: 1
  revisionHistoryLimit: 10
  selector:
    matchLabels:
      k8s-app: kubernetes-dashboard
  template:
    metadata:
      labels:
        k8s-app: kubernetes-dashboard
    spec:
      containers:
        - name: kubernetes-dashboard
          image: k8s.gcr.io/kubernetes-dashboard-amd64:v1.10.0
          # Used for Service to expose
          ports:
            - containerPort: 8443
              protocol: TCP
          args:
            - --auto-generate-certificates
            # Uncomment the following line to manually specify Kubernetes API server Host
            # If not specified, Dashboard will attempt to auto discover the API server and connect
            # to it. Uncomment only if the default does not work.
            # - --apiserver-host=http://my-address:port
          volumeMounts:
            - name: kubernetes-dashboard-certs
              mountPath: /certs
              # Create on-disk volume to store exec logs
            - mountPath: /tmp
              name: tmp-volume
          livenessProbe:
            httpGet:
              scheme: HTTPS
              path: /
              port: 8443
            initialDelaySeconds: 30
            timeoutSeconds: 30
      volumes:
        - name: kubernetes-dashboard-certs
          secret:
            secretName: kubernetes-dashboard-certs
        - name: tmp-volume
          emptyDir: {}
      serviceAccountName: kubernetes-dashboard
      # Comment the following tolerations if Dashboard must not be deployed on master
      tolerations:
        - key: node-role.kubernetes.io/master
          effect: NoSchedule

---
# ------------------- Dashboard Service ------------------- #

kind: Service
apiVersion: v1
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard
  namespace: kube-system
spec:
  ports:
    - port: 443
      targetPort: 8443
  selector:
    k8s-app: kubernetes-dashboard
```

After we applying the yaml file, we can see what we've created using `kubectl get all --namespace kube-system --selector=k8s-app=kubernetes-dashboard`.

We can get even more granular with:

```shell
kubectl get svc --namespace kube-system --selector=k8s-app=kubernetes-dashboard
kubectl get pods --namespace kube-system --selector=k8s-app=kubernetes-dashboard
kubectl get deployments --namespace kube-system --selector=k8s-app=kubernetes-dashboard
kubectl get replicasets --namespace kube-system --selector=k8s-app=kubernetes-dashboard
```

## Deploying the metrics add-on

![Heapster Kubernetes resources](https://res.cloudinary.com/gitgoodclub/image/upload/v1548221185/eks-course/Screen_Shot_2019-01-23_at_4.26.16_pm.png)

We will deploy Heapster and that is made up of three Kubernetes resources: a service, deployment and service account.

![InfluxDB resources](https://res.cloudinary.com/gitgoodclub/image/upload/v1548221289/eks-course/Screen_Shot_2019-01-23_at_4.28.00_pm.png)

We will also deploy InfluxDB to store its data. The Heapster deployment will interface with the InfluxDB service.

![Full connection](https://res.cloudinary.com/gitgoodclub/image/upload/v1548221371/eks-course/Screen_Shot_2019-01-23_at_4.29.21_pm.png)

### Deploying InfluxDB

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: monitoring-influxdb
  namespace: kube-system
spec:
  replicas: 1
  template:
    metadata:
      # label k8s-app used for Service spec
      labels:
        task: monitoring
        k8s-app: influxdb
    spec:
      containers:
        - name: influxdb
          image: k8s.gcr.io/heapster-influxdb-amd64:v1.5.2
          volumeMounts:
            - mountPath: /data
              name: influxdb-storage
      volumes:
        - name: influxdb-storage
          emptyDir: {}
---
apiVersion: v1
kind: Service
metadata:
  labels:
    task: monitoring
    # For use as a Cluster add-on (https://github.com/kubernetes/kubernetes/tree/master/cluster/addons)
    # If you are NOT using this as an addon, you should comment out this line.
    kubernetes.io/cluster-service: 'true'
    kubernetes.io/name: monitoring-influxdb
  name: monitoring-influxdb
  namespace: kube-system
spec:
  ports:
    - port: 8086
      targetPort: 8086
  # What Service should be linked to
  selector:
    k8s-app: influxdb
```

### Deploying Heapter

```yml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: heapster
  namespace: kube-system
spec:
  replicas: 1
  template:
    metadata:
      labels:
        task: monitoring
        k8s-app: heapster
    spec:
      serviceAccountName: heapster
      containers:
        - name: heapster
          image: k8s.gcr.io/heapster-amd64:v1.5.4
          imagePullPolicy: IfNotPresent
          command:
            - /heapster
            - --source=kubernetes:https://kubernetes.default
            - --sink=influxdb:http://monitoring-influxdb.kube-system.svc:8086
---
apiVersion: v1
kind: Service
metadata:
  labels:
    task: monitoring
    # For use as a Cluster add-on (https://github.com/kubernetes/kubernetes/tree/master/cluster/addons)
    # If you are NOT using this as an addon, you should comment out this line.
    kubernetes.io/cluster-service: 'true'
    kubernetes.io/name: Heapster
  name: heapster
  namespace: kube-system
spec:
  ports:
    - port: 80
      targetPort: 8082
  selector:
    k8s-app: heapster
```

### Deploying Heapster RBAC

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: heapster
  namespace: kube-system
---
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  name: heapster
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: system:heapster
subjects:
  - kind: ServiceAccount
    name: heapster
    namespace: kube-system
```

## Deploying Heapster and Influx.db

Applying these deployments to the cluster:

```shell
kubectl apply -f deploy-heapster.yml
kubectl apply -f deploy-influxdb.yml
kubectl apply -f deploy-heapster-rbac.yml
```

Using a selector see what we built:

```shell
kubectl get all --namespace kube-system --selector=task=monitoring
```

Applying the above should return something like:

```shell
NAME                                       READY   STATUS    RESTARTS   AGE
pod/heapster-84c9bc48c4-lph2v              1/1     Running   0          1m
pod/monitoring-influxdb-848b9b66f6-7tkcv   1/1     Running   0          2m

NAME                          TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
service/heapster              ClusterIP   [REDACTED]      <none>        80/TCP     3m
service/monitoring-influxdb   ClusterIP   [REDACTED]      <none>        8086/TCP   2m

NAME                                  DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/heapster              1         1         1            1           3m
deployment.apps/monitoring-influxdb   1         1         1            1           2m

NAME                                             DESIRED   CURRENT   READY   AGE
replicaset.apps/heapster-84c9bc48c4              1         1         1       3m
replicaset.apps/monitoring-influxdb-848b9b66f6   1         1         1       2m
```

Note that Kubernetes `Deployments` provides declarative updates for `Pods` and `ReplicaSets`.

See `https://kubernetes.io/docs/concepts/workloads/controllers/deployment/` for more info.

## Creating an Admin Account to use the dashboard

Using YAML, we'll create:

1. cluster admin account
2. Role binding

Then we can start the `kubectl proxy` to authenticate the K8s dashboard and explore the dashboard.

## Creating the admin Service Account

```yml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: eks-admin
  namespace: kube-system

---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: eks-admin
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
  - kind: ServiceAccount
    name: eks-admin
    namespace: kube-system
```

Run `kubectl apply -f admin-service-account.yml` to apply.

```shell
# Returned
serviceaccount/eks-admin created
clusterrolebinding.rbac.authorization.k8s.io/eks-admin created
```

## Kubectl proxy

Now we should be able to run the proxy to see the dashboard! Ensure if you are port forwarding further if you need to see it on a particular host from a VM or docker image.

```shell
# This is to forward from Docker container to host
kubectl proxy --address='0.0.0.0' --port=8001 --accept-hosts='.*'

# Starting to serve on 127.0.0.1:8001
```

Now head to a browser at `http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/#!/login` for login.

To login with the token, we need the following:

```shell
kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep eks-course-admin | awk '{print $1}')
```

There is some more info here at `https://docs.aws.amazon.com/eks/latest/userguide/dashboard-tutorial.html`.

## Chaos testing

- Simulating a failure of the frontend pods can be done using `kubectl delete pod <POD>`.
- Simulating a failure of the nodes is to just stop one of the three EC2 instances (can be done from AWS console easily). If a node goes down, the rest of the pods are distributed amongst the other nodes. If nodes are considered for autoscaling, then the EC2 instance will against restart another node.

Note, there is no automatic redeployment to the other nodes when a node becomes rescheduled. Killing some pods will of course help with rescheduling and distribution.
