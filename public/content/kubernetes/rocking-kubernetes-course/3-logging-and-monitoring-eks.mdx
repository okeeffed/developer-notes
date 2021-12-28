# Logging and Monitoring EKS

## Working Nodes Logging

1. System logs from `kubelet`, `kube-proxy` or `dockerd`
2. Application logs from application containers

The caveats:

1. If instance is terminated, the logs are lost.
2. Logs need to be aggregated in a meaningful way.

We set up a logging architecture to abstract logs from containers.

- Containerized app writes to `stdout` and `stderr`.
- System logs go to `systemd`.
- Container redirect logs to `/var/log/containers/*.log` file.

We can add in a logging agent running as a DaemonSet to read logs and write to backend.

Finally, it is worth knowing of the EFK stack in Kubernetes:

1. Amazon Elasticsearch Service
2. Fluentd
3. Kibana

## Fluentd vs Fluentbit

- fluentd has 100+ plugins, fluentbit has ~20 (2020).

As traffic goes up, fluentd can't keep up:

- fluentd based on Ruby and memory intensive
- slow propagation of logs
- loss of logs
- fluentd buffer can be increased to solve this but not dynamic

Fluentbit is lightweight and keeys up with higher traffic.

1. fluentd to Kinesis Data Firehose to Logging backend
2. fluentbit to logging backend
3. hard to replace fluentd because of plugin support if already existing in enterprise

## fluentd demo

## fluentbit demo
