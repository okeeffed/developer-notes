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

| Command                                         | Description                              |
| ----------------------------------------------- | ---------------------------------------- |
| helm init                                       | Install tiller on the cluser             |
| helm reset                                      | Remove tiller                            |
| helm install `<CHART>`                          | Install chart                            |
| helm search `<CHART>`                           | Searches for chart                       |
| helm search redis                               | Looks for Redis chart                    |
| helm install --name myredis stable/redis        | Installs Redis chart found under myredis |
| helm delete myredis                             | Delete Redis install named myredis       |
| helm create `<CHART_NAME>`                      | Create your own chart                    |
| helm update `<OPTIONS>` `<CHART>` path/to/chart | Update the chart                         |
| helm history `<CHART_NAME>`                     | See upgrade history of chart             |
| helm rollback `<CHART_NAME>` `<REVISION>`       | Rollback to version                      |
| helm list                                       | List running charts                      |
| helm list --all                                 | List all charts that have ran            |
| helm delete `<CHART_NAME>` --purge              | Release deleted chart                    |

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
ls mychart
# Displays Chart.yaml  charts  templates  values.yaml
```

`values.yaml` will control things such as replicas, image etc.

```yaml
# Default values for test.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: nginx
  tag: stable
  pullPolicy: IfNotPresent

nameOverride: ""
fullnameOverride: ""

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: false
  annotations: {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  paths: []
  hosts:
    - chart-example.local
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

resources: {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

nodeSelector: {}

tolerations: []

affinity: {}
```

Inside the `mychart/templates` folder we have...

```shell
ls mychart/templates
# shows NOTES.txt  _helpers.tpl  deployment.yaml  ingress.yaml  service.yaml  tests
```

Looking at the `deployment.yaml` we see the following:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "test.fullname" . }}
  labels:
    app.kubernetes.io/name: {{ include "test.name" . }}
    helm.sh/chart: {{ include "test.chart" . }}
    app.kubernetes.io/instance: {{ .Release.Name }}
    app.kubernetes.io/managed-by: {{ .Release.Service }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app.kubernetes.io/name: {{ include "test.name" . }}
      app.kubernetes.io/instance: {{ .Release.Name }}
  template:
    metadata:
      labels:
        app.kubernetes.io/name: {{ include "test.name" . }}
        app.kubernetes.io/instance: {{ .Release.Name }}
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
          livenessProbe:
            httpGet:
              path: /
              port: http
          readinessProbe:
            httpGet:
              path: /
              port: http
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
      {{- with .Values.nodeSelector }}
      nodeSelector:
        {{- toYaml . | nindent 8 }}
      {{- end }}
    {{- with .Values.affinity }}
      affinity:
        {{- toYaml . | nindent 8 }}
    {{- end }}
    {{- with .Values.tolerations }}
      tolerations:
        {{- toYaml . | nindent 8 }}
    {{- end }}
```

These values will be filled out when deployed.

The spec values are generally defined by the earlier `values.yaml`.

The `mychart/service.yaml` also templates how the service file will be created:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: {{ include "test.fullname" . }}
  labels:
    app.kubernetes.io/name: {{ include "test.name" . }}
    helm.sh/chart: {{ include "test.chart" . }}
    app.kubernetes.io/instance: {{ .Release.Name }}
    app.kubernetes.io/managed-by: {{ .Release.Service }}
spec:
  type: {{ .Values.service.type }}
  ports:
    - port: {{ .Values.service.port }}
      targetPort: http
      protocol: TCP
      name: http
  selector:
    app.kubernetes.io/name: {{ include "test.name" . }}
    app.kubernetes.io/instance: {{ .Release.Name }}
```

From here, you can directly install the helm chart using `helm install mychart/`.

Using the default chart, there is a `nginx` configuration you then port forward and curl.

```shell
kubectl port-forward 80:8080
# Press ^z here
bg # set to background
curl localhost:8080 
# result should be default nginx html
fg # bring port-forward back to foreground
```

# Demo with a Nodejs app

Create a chart and update the required value for your image etc.

```yaml
# Default values for test.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: okeeffed/repo
  tag: latest
  pullPolicy: IfNotPresent

# Could also be LoadBalancer
service:
  type: ClusterIP
  port: 80

ingress:
  enabled: false
  annotations: {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  paths: []
  hosts:
    - chart-example.local
    # this could also be whatever.domain.com
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

resources: {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

nodeSelector: {}

tolerations: []

affinity: {}

# Here you can add dependencies
```

If your helm has depencies, these can be defined in a `requirements.yaml` file. Example:

```yaml
dependencies:
  - name: mariadb
    version: 4.x.x
    repository: https://kubernetes-charts.storage.googleapis.com/
    condition: mariadb.enabled
    tags:
      - node-app-database
```

Ensure you update the chart if you need to change the `containerPort` or env variables etc.

Once the chart is up and running, you can update charts which will update the orchestration. Use `helm update <OPTIONS> <CHART> path/to/chart`

Rollbacks can easily be done as well. 

Use `helm history <CHART>` to get a history of deployments. Say we want to rollback to revision one, we can then just run `helm rollback <CHART> 1`. 



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

test test test test test