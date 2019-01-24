---
name: Kubeless
menu: Kubernetes
---

# Serverless on Kubernetes

With the serverless products, you don't need to manage the underlying functions. It can also greatly reduce costs.

Great for not worrying about many operational aspects.

You can also use functions to start applications on Kubernetes instead of containers. You can install and use any of the projects to let developers launch functions on your Kubernetes cluster.

## 6.1 Intro to Kubeless

This is a Kubernetes-native framework. It leverages Kubernetes resource to provide auto-scaling, API routing, monitoring and more.

It uses **Customer Resource Definitions** to be able to create functions.

You deploy a function with your preferred language. Once you deploy, you need to determine how it will be triggered.

## 6.2 Creating functions on Kubeless

### Installing the CLI

```bash
$ wget https://github.com/kubeless/kubeless/releases/download/v1.0.0-alpha.8/kubeless_linux-amd64.zip
$ sudo apt-get install unzip # if you need to unzip
$ unzip kubeless_linux-amd64.zip
$ sudo mv bundles/kubeless_linux-amd64/kubeless /usr/local/bin
$ rm -r bundles/
```

### Deploy kubeless

```bash
$ kubectl create ns kubeless
$ kubectl create -f https://github.com/kubeless/kubeless/releases/download/v1.0.0-alpha.8/kubeless-v1.0.0-alpha.8.yaml
```

### Deploy function on Kubernetes

```bash
kubeless function deploy myfunc --runtime nodejs6 --dependencies node-example/package.json --handler test.myfunction --from-file node-example/example.js
```

#### Useful functions

```bash
# List function
$ kubeless function ls
# Call function
$ kubeless function call myfunction --data 'this is some data'
# Expose function
$ kubectl create -f nginx-ingress-controller-with-elb.yml
# Linking the function to the ingress controller
$ kubeless trigger http create myfunction --function-name myfunction --hostname myfunction.domain.name
```

### Usage with Kafka

```bash
# Kafka installation
export RELEASE=$(curl -s https://api.github.com/repos/kubeless/kafka-trigger/releases/latest | grep tag_name | cut -d '"' -f 4)
kubectl create -f https://github.com/kubeless/kafka-trigger/releases/download/$RELEASE/kafka-zookeeper-$RELEASE.yaml

# Trigger and publish
kubeless trigger kafka create test --function-selector created-by=kubeless,function=uppercase --trigger-topic uppercase
kubeless topic publish --topic uppercase --data "this message will be converted to uppercase"
```
