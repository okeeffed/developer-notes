# Getting started with cdk8s

## Resources

1. [Getting started docs](https://cdk8s.io/docs/latest/getting-started)

## Terms

| Term         | Definition                                                                               |
| ------------ | ---------------------------------------------------------------------------------------- |
| App          | Structured tree of constructs                                                            |
| Construct    | Composable unit of abstraction                                                           |
| Chart        | The Chart is a container that synthesizes a single Kubernetes manifest.                  |
| ApiObject    | An ApiObject is a construct that represents an entry in a Kubernetes manifest (level 0). |
| Dependecy    | You can declare dependencies between two cdk8s constructs                                |
| Escape hatch | Intentional leak in the abstraction layer                                                |

## Hello, cdk8s

Setup with the following:

```s
$ npm install -g cdk8s-cli
$ mkdir hello
$ cd hello
$ cdk8s init typescript-app
Initializing a project from the typescript-app template
...
Your cdk8s typescript project is ready!

   cat help         Print this message

  Compile:
   npm run compile     Compile typescript code to javascript (or "yarn watch")
   npm run watch       Watch for changes and compile typescript in the background
   npm run build       Compile + synth

  Synthesize:
   npm run synth       Synthesize k8s manifests from charts to dist/ (ready for 'kubectl apply -f')

 Deploy:
   kubectl apply -f dist/*.k8s.yaml

 Upgrades:
   npm run import        Import/update k8s apis (you should check-in this directory)
   npm run upgrade       Upgrade cdk8s modules to latest version
   npm run upgrade:next  Upgrade cdk8s modules to latest "@next" version (last commit)
```

To create our first chart:

```s
$ cdk8s synth
# output dist/<app-name>.k8s.yaml
$ cat dist/<app-name>.k8s.yaml
# output
```

Update `main.ts` in order to generate the "Hello, world!" Kubernetes example:

```ts
import { Construct } from "constructs"
import { App, Chart, ChartProps } from "cdk8s"

// imported constructs
import { KubeDeployment, KubeService, IntOrString } from "./imports/k8s"

export class MyChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props)

    const label = { app: "hello-k8s" }

    new KubeService(this, "service", {
      spec: {
        type: "LoadBalancer",
        ports: [{ port: 80, targetPort: IntOrString.fromNumber(8080) }],
        selector: label,
      },
    })

    new KubeDeployment(this, "deployment", {
      spec: {
        replicas: 2,
        selector: {
          matchLabels: label,
        },
        template: {
          metadata: { labels: label },
          spec: {
            containers: [
              {
                name: "hello-kubernetes",
                image: "paulbouwer/hello-kubernetes:1.7",
                ports: [{ containerPort: 8080 }],
              },
            ],
          },
        },
      },
    })
  }
}

const app = new App()
new MyChart(app, "hello")
app.synth()
```

```s
$ npm run compile
# transpiles TS -> JS
$ cdk8s synth
dist/hello-cdk8s.k8s.yaml
$ cat dist/hello.k8s.yaml
apiVersion: v1
kind: Service
metadata:
  name: hello-service-c8c17160
spec:
  ports:
    - port: 80
      targetPort: 8080
  selector:
    app: hello-k8s
  type: LoadBalancer
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-deployment-c8c7fda7
spec:
  replicas: 2
  selector:
    matchLabels:
      app: hello-k8s
  template:
    metadata:
      labels:
        app: hello-k8s
    spec:
      containers:
        - image: paulbouwer/hello-kubernetes:1.7
          name: hello-kubernetes
          ports:
            - containerPort: 8080

$ kubectl apply -f dist/*.k8s.yaml
service/hello-service-c8c17160 created
deployment.apps/hello-deployment-c8c7fda7 created
# Check the dashboard for more in-depth results
# Once ready...
$ minikube service hello-service-<id>
```

If you refresh enough times, you will end up getting a different pod that the LoadBalancer has redirected to.

## Your first construct

```s
$ mkdir lib
$ touch lib/web-service.ts
```

Add the following to the file:

```ts
import { Construct } from "constructs"
import { Names } from "cdk8s"
import { KubeDeployment, KubeService, IntOrString } from "../imports/k8s"

export interface WebServiceProps {
  /**
   * The Docker image to use for this service.
   */
  readonly image: string

  /**
   * Number of replicas.
   *
   * @default 1
   */
  readonly replicas?: number

  /**
   * External port.
   *
   * @default 80
   */
  readonly port?: number

  /**
   * Internal port.
   *
   * @default 8080
   */
  readonly containerPort?: number
}

export class WebService extends Construct {
  constructor(scope: Construct, id: string, props: WebServiceProps) {
    super(scope, id)

    const port = props.port || 80
    const containerPort = props.containerPort || 8080
    const label = { app: Names.toDnsLabel(this) }
    const replicas = props.replicas ?? 1

    new KubeService(this, "service", {
      spec: {
        type: "LoadBalancer",
        ports: [{ port, targetPort: IntOrString.fromNumber(containerPort) }],
        selector: label,
      },
    })

    new KubeDeployment(this, "deployment", {
      spec: {
        replicas,
        selector: {
          matchLabels: label,
        },
        template: {
          metadata: { labels: label },
          spec: {
            containers: [
              {
                name: "app",
                image: props.image,
                ports: [{ containerPort }],
              },
            ],
          },
        },
      },
    })
  }
}
```

This will allow us to use that construct in `main.ts`. Update it to look like the following:

```ts
import { Construct } from "constructs"
import { App, Chart, ChartProps } from "cdk8s"
import { WebService } from "./lib/web-service"

export class MyChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props)

    new WebService(this, "hello", {
      image: "paulbouwer/hello-kubernetes:1.7",
      replicas: 2,
    })
    new WebService(this, "ghost", { image: "ghost", containerPort: 2368 })
  }
}

const app = new App()
new MyChart(app, "hello")
app.synth()
```

Run the usual process to see everything in action.

To tear down all the deployments and services, run `kubectl delete -f dist/*.k8s.yaml`.

## Example Chart

During synthesis, charts collect all the ApiObject nodes (recursively) and emit a single YAML manifest that includes all these objects.

When a chart is defined, you can specify chart-level namespace and labels. Those will be applied to all API objects defined within the chart (recursively):

```ts
class MyChart extends Chart {
  constructor(scope: Construct, ns: string) {
    super(scope, ns, {
      namespace: "my-namespace",
      labels: {
        app: "my-app",
      },
    })

    new ApiObject(this, "my-object", {
      apiVersion: "v1",
      kind: "Foo",
    })
  }
}
```

This will synthesize into:

```yaml
apiVersion: v1
kind: Foo
metadata:
  namespace: my-namespace
  labels:
    app: my-app
```

## Dependecy Example

```ts
// Dependency between API Objects
const namespace = new k8s.Namespace(chart, "backend")
const service = new k8s.Service(chart, "Service", {
  metadata: { namespace: namespace.name },
})

// declare the dependency. this is just a syntactic sugar for Node.of(service).addDependency(namespace)
service.addDependency(namespace)

// Dependency between charts
const namespaceChart = new NamespaceChart(app, "namespace")
const applicationChart = new ApplicationChart(app, "application")

// declare the dependency. this is just a syntactic sugar for Node.of(applicationChart).addDependency(namespaceChart)
applicationChart.addDependency(namespaceChart)
```

## Helm support

You can use the Helm construct in order to include Helm charts.

You must have `helm` installed on your system.
