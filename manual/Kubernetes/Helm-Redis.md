---
name: Installing Redis with Helm
menu: Helm
---

# Installing Redis with Helm

Ensure that you have configured Helm first and applied the appropriate RBAC (see Helm Intro for more).

## Installing

```shell
helm install --name redisha stable/redis-ha
```

What you should get back should be similar to the following:

```shell
NAME:   redisha
LAST DEPLOYED: Thu Jan 24 18:17:31 2019
NAMESPACE: default
STATUS: DEPLOYED

RESOURCES:
==> v1/Pod(related)
NAME                       READY  STATUS   RESTARTS  AGE
redisha-redis-ha-server-0  0/2    Pending  0         0s

==> v1/ConfigMap
NAME                        DATA  AGE
redisha-redis-ha-configmap  3     0s
redisha-redis-ha-probes     2     0s

==> v1/Service
NAME                         TYPE       CLUSTER-IP      EXTERNAL-IP  PORT(S)             AGE
redisha-redis-ha-announce-0  ClusterIP  10.100.24.94    <none>       6379/TCP,26379/TCP  0s
redisha-redis-ha-announce-1  ClusterIP  10.100.142.150  <none>       6379/TCP,26379/TCP  0s
redisha-redis-ha-announce-2  ClusterIP  10.100.27.202   <none>       6379/TCP,26379/TCP  0s
redisha-redis-ha             ClusterIP  None            <none>       6379/TCP,26379/TCP  0s

==> v1/StatefulSet
NAME                     DESIRED  CURRENT  AGE
redisha-redis-ha-server  3        1        0s


NOTES:
Redis can be accessed via port 6379 and Sentinel can be accessed via port 26379 on the following DNS name from within your cluster:
redisha-redis-ha.default.svc.cluster.local

To connect to your Redis server:
1. Run a Redis pod that you can use as a client:

   kubectl exec -it redisha-redis-ha-server-0 sh -n default

2. Connect using the Redis CLI:

  redis-cli -h redisha-redis-ha.default.svc.cluster.local
```

Ensure to delete by using `helm delete <NAME>`.
