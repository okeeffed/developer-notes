---
name: Pulling from Docker Hub
menu: Kubernetes
---

# Pulling from Docker Hub

Reference from here https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/.

## tl;dr

```shell
kubectl create secret docker-registry regcred --docker-server=<your-registry-server> --docker-username=<your-name> --docker-password=<your-pword> --docker-email=<your-email>
# Checking the credentials
kubectl get secret regcred --output=yaml
kubectl get secret regcred --output="jsonpath={.data.\.dockerconfigjson}" | base64 --decode
```

To create a pod using the creds, ensure the Pod has `imagePullSecrets`:

```yaml
# pods/private-reg-pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: private-reg
spec:
  containers:
    - name: private-reg-container
      image: <your-private-image>
  imagePullSecrets:
    - name: regcred
```
