---
name: Devops Kubernetes Course
menu: Kubernetes
---

# DevOps Kubernetes Course

- [DevOps Kubernetes Course](#devops-kubernetes-course)
  - [Course layout](#course-layout)
    - [Objectives](#objectives)
    - [Support](#support)
  - [Order to follow](#order-to-follow)
- [Advanced Topics](#advanced-topics)
  - [Service Discovery](#service-discovery)
    - [Demo: Service Discovery](#demo-service-discovery)
  - [ConfigMap](#configmap)
    - [Demo: Config Map](#demo-config-map)
  - [Ingress Controller](#ingress-controller)
    - [Demo: Ingress Controller](#demo-ingress-controller)
  - [External DNS](#external-dns)
  - [Volumes](#volumes)
    - [Using EBS Storage](#using-ebs-storage)
    - [Demo: Volumes](#demo-volumes)
  - [Volume Provisioning](#volume-provisioning)
  - [Demo: Using Wordpress with Volumes](#demo-using-wordpress-with-volumes)
  - [Pod Presets](#pod-presets)
  - [Stateful Sets - (formerly Pet Sets)](#stateful-sets---formerly-pet-sets)
  - [Daemon Sets](#daemon-sets)
  - [Resource Usage Monitoring](#resource-usage-monitoring)
  - [Horiztonal Pod Autoscaling](#horiztonal-pod-autoscaling)
  - [Affinity/Anti-Affinity](#affinityanti-affinity)
  - [3.13 Interpod Affinity/Anti-Affinity](#313-interpod-affinityanti-affinity)
    - [Anti-affinity](#anti-affinity)
    - [Topology operators](#topology-operators)
  - [3.14 Taints and Tolerations](#314-taints-and-tolerations)
    - [Tolerations usage](#tolerations-usage)
    - [Keys](#keys)
    - [Use Cases](#use-cases)
    - [Useful Taints and Tolerations](#useful-taints-and-tolerations)
  - [3.15 Customer Resource Definitions (CRDs)](#315-customer-resource-definitions-crds)
  - [3.16 Operators](#316-operators)
    - [PostgreSQL Operator Demo](#postgresql-operator-demo)
  - [4. Kubernetes Administration](#4-kubernetes-administration)
  - [4.1 Resource Quotas](#41-resource-quotas)
    - [Resource Quota Examples](#resource-quota-examples)
    - [Resource Quote options](#resource-quote-options)
  - [4.2 Namespaces](#42-namespaces)
    - [Namespace commands](#namespace-commands)
    - [Demo ResourceQuotas](#demo-resourcequotas)
  - [4.3 User Management](#43-user-management)
    - [Normal Users](#normal-users)
    - [Service Users](#service-users)
    - [Other notes on User Management](#other-notes-on-user-management)
  - [4.4 RBAC (Role Based Access Control)](#44-rbac-role-based-access-control)
  - [4.5 Networking](#45-networking)
    - [Pods](#pods)
    - [Kubenet Networking](#kubenet-networking)
    - [VPC Alternatives](#vpc-alternatives)
  - [4.6 Node Maintenance](#46-node-maintenance)
    - [Adding a new node](#adding-a-new-node)
  - [4.7 High Availability](#47-high-availability)
    - [Setup](#setup)
    - [Kops with multiple masters for HA](#kops-with-multiple-masters-for-ha)
  - [4.8 TLS on ELB using Annotations](#48-tls-on-elb-using-annotations)
  - [Intro to kubeadm](#intro-to-kubeadm)

## Course layout

1.  Introduction
2.  Kubernetes Basics
3.  Advanced Topics
4.  Administration

### Objectives

1.  To understand, deploy and use Kubernetes
2.  To get straight with `containerization` and run those containers on Kubernetes
3.  To use Kubernetes as a single node and on AWS
4.  To be able to run `stateless` and `stateful` applications on Kubernetes
5.  To be able to `administer` Kubernetes

### Support

All resources are in a github repository.

## Order to follow

1. KOPS - Getting started
2. Kubernetes Basics
