# Advanced EKS concepts

## Resources

1. [AWS Load Balancer controller](https://www.eksworkshop.com/beginner/130_exposing-service/ingress_controller_alb/)

## Kubernetes Scaling

Overview:

1. Quick ook into EC2 scaling
2. Container scaling
3. Understand Pod Limits and Requests
4. Horizontal Pod Autoscaler
5. Understand manifest file
6. HPA Demo

In EC2, an autoscaling group might operate and scale if CPU > 50% (the specified policy).

In k8s, the Horizontal Pod Autoscaling will run based on the pod CPU (as opposed to the node).

It keeps CPU utilization of the pod within limits. What happens if the node or max pod is reached? Another autoscaler comes into play: the cluster autoscaler. It will horizontally scale the nodes.

The `resources` part of a manifest file for a deployment that helps with the autoscaling.

```yaml
resources:
  requests:
    cpu: 500m # also 0.5
    memory: 256Mi # 1 mebibyte = 1.04848 megabyte
  limits:
    cpu: 1000m # also 1
    memory: 512Mi
```

1 vCPU = 1000m (milicore)

One pod requesting CPU of 500m (half of 1 vCPU)

One pod CPU limit 1000m (1 vCPU)

So far, there is no HPA declaration. We need it in the manifest file as well.

1. [HPA manifest examples](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)
2. [HPA walkthrough](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/)
3. [EKS workshop manifest example](https://github.com/aws-samples/aws-workshop-for-kubernetes/blob/master/03-path-application-development/305-app-scaling-custom-metrics/templates/hpa-example/hpa-manifest.yaml)
4. [K8s metrics server](https://github.com/kubernetes-sigs/metrics-server#deployment)

```yaml
# V1 used in demo
apiVersion: autoscaling/v2beta1
kind: HorizontalPodAutoscaler
metadata:
  name: nginxext
  namespace: default
spec:
  minReplicas: 1
  maxReplicas: 10
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  # 50% of 500m (denoted above) = 250m before scaling
  targetCPUUtilizationPercentage: 50
---
# V2
apiVersion: autoscaling/v2beta1
kind: HorizontalPodAutoscaler
metadata:
  name: nginxext
  namespace: default
spec:
  minReplicas: 1
  maxReplicas: 5
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  metrics:
    - type: External
      external:
        metricName: nginx.net.request_per_s
        metricSelector:
          matchLabels:
            kube_container_name: nginx
        targetAverageValue: 50
```

## HPA Demo

There is a Kubernetes Metrics server to help see the data. You also need node larger than t3.micro.

The demo itself runs a loop to scale up the pods.

Run `kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml` to add the metrics server.

Once installed, you can see the utilisation on the targets.

## Cluster AutoScaler in EKS

[Resource](https://docs.aws.amazon.com/eks/latest/userguide/cluster-autoscaler.html)
[Video](https://www.udemy.com/course/rocking-kubernetes-with-amazon-eks-fargate-and-devops/learn/lecture/18445054#content)

This handles the Node scaling. If you request many replicas that has desired mebibytes for resources that is larger than the single node, then even with no CPU usage the node with scale.

## Vertical Pod Autoscaler

DO NOT USE IN PRODUCTION. It restarted the pod.

- The pod will go up or down in size
- Used in dev to determine optimal CPU + memory
  - VPA recommends pod request, limit
  - Use the number for request, limits, HPA
  - VPA should not be used with HPA
- Accept VPA recommendation with grain of salt

[Goldilocks](https://www.fairwinds.com/blog/introducing-goldilocks-a-tool-for-recommending-resource-requests) is a tool used with VPA to help with defining what resources should be used.

We can use a [GitHub example](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler) to setup VPA.

## Namespace - What and Why

If two different teams accidentally deployed two apps of the same name in the same namespace, one will override the other and if someone deploys a badly optimised app, it will affect the other pods.

You can think of them as isolated, virtual clusters.

You can also assign process power per namespace (other apps cannot accidentally exhaust the other namespace).

## Ingress - What and Why

The example given is what happens when you deploy multiple services under different subdomains.

- If you spin up multiple loadbalancers, it is incredibly expensive.
- There is also no URL based routing.
- Maintenance overhead of manageling all separate services.

This can be solved with ingress. It is an API service to help manage internal and external http(s) access to Kubernetes services running in a cluster.

Supports:

1. Host or path based routing.
2. TLS
3. Websockets
4. Http/2
5. AWS WAF

Find more on ALB [here](https://aws.amazon.com/blogs/opensource/kubernetes-ingress-aws-alb-ingress-controller/).

In the example, we have the following setup:

1. We create a deployment
2. We create a service (NodePort)

Then we create an ingress controller in two parts:

1. The ingress controller (a type of deployment)
   - Monitors Ingress Resources
   - Creates necessary AWS resources for Ingress
     - Such as ALB for ALB Ingress Controller
   - One Cluster can have more than one Ingress Controller!
     - Ingress Resource defines which Ingress Controller to use
2. The ingress resource\*
   - Selects which Ingress Controller to use
   - Defines the URL Path and corresponding backend Service

> Note: as of the time of writing, it looks like we only now need to deploy the `Ingress` resource without another deployment.

An example from the [AWS Load Balancer controller](https://www.eksworkshop.com/beginner/130_exposing-service/ingress_controller_alb/) workshop lesson:

```yaml
---
apiVersion: v1
kind: Namespace
metadata:
  name: game-2048
---
apiVersion: apps/v1
kind: Deployment
metadata:
  namespace: game-2048
  name: deployment-2048
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: app-2048
  replicas: 5
  template:
    metadata:
      labels:
        app.kubernetes.io/name: app-2048
    spec:
      containers:
        - image: alexwhen/docker-2048
          imagePullPolicy: Always
          name: app-2048
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  namespace: game-2048
  name: service-2048
spec:
  ports:
    - port: 80
      targetPort: 80
      protocol: TCP
  type: NodePort
  selector:
    app.kubernetes.io/name: app-2048
---
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  namespace: game-2048
  name: ingress-2048
  annotations:
    kubernetes.io/ingress.class: alb
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip
spec:
  rules:
    - http:
        paths:
          - path: /*
            backend:
              serviceName: service-2048
              servicePort: 80
```

If we changed the `path`, it would add a rule to the existing `LoadBalancer`.

The Ingress Controller requires the correct IAM Policy. Require Service Account and IAM Role for the `alb-ingress-controller` pod.

## EKS Cost Optimization

How to deal with expensive bills. The 4 commandments:

1. Right Sizing
   - Utilize pod requests, limits, resource quotas
   - Use open source, third-party tools to tune pod requests, limits
2. Auto Scaling
   - Once pods are optimized, enable autoscaling
   - Utilize Horizontal Pod Autoscaler, Cluster Autoscaling, Proportional Autoscaling
3. Down Scaling
   - Terminate pods unnecessary during nights, weekends
   - Utilize DevOps
4. EC2 Purchase Options
   - Use reserved instances, spot instances, savings plan

### Open Source Tools to help with pricing

1. RSG (right size guide)
2. Kubecost
3. Kubernetes Resource Report
4. Goldilocks

### Third Party

1. Kubecost
2. New Relic
3. CloudHealth by VMWare
4. Datadog

## EKS Tools Ecosystem

Stricly popular opensource and 3rd party tools.

### Devops

1. Jenkins
2. GitLab
3. Spinnaker

### Security

1. Twistlock
2. Aqua
3. NeuVector

### Ingress

1. Traefik
2. Nginx
3. ALB Ingress controller

### Logging

1. Fluentd
2. Fluentbit
3. Splunk

### Monitoring

1. New Relic
2. Datadog
3. Sysdig

### Cost optimisation

1. CloudHealth
2. Kubecost
3. Kubernetes resource report

## EKS Public Roadmap

If you go to `aws/containers-roadmap` on GitHubb, you can see the public roadmap.
