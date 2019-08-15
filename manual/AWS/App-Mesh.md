---
menu: AWS
name: App Mesh
---

# App Mesh Workshop

Aim: Blueprint deploy with App Mesh.

The session is all about `observability` over a distributed application.

> When the impact of the change is small, velocity can increase.

Of course, microservices come with their own downsides.

Image a pacman game runs inside a monolith, if something wild like a cosmic ray burns the CPU, all fails. In the microservices, you have multiple points of failure.

## How do we monitor and control all of the microservices?

- Create culture of innovation by organising into small DevOps teams
- Build trust by automating security and compliance
- Control Over Service to Service Communication
- Visibility into Service to Service Communication ie Observability

## Application-level communication

Communicating between components:

- Fixed endpoints at specific address
- Firewall to allow or block connection attempts
- How do we define these security policies?

Service Discovery:

- Real-time map of service availability
- Applications accept or reject calls
- How do we dynamically change this at scale?

## What is needed?

New ways to connect, monitor, control and debug distributed applications:

- Consistent communications management: Know what talks to what Traffic patterns and flow
- Complete visability: App-level metrics not just infrastructure metrics
- Failure isolations and protection: Traffic Shaping, Circuit Breaking, Timeouts and Retries
- Fine-grained deployment controls: Service independence

## Service Mesh defintion

> A service mesh is a boundary for communcation for microservices, implemented as an infrastructure layer, that simplifies the management of service-to-service communcation and provides control, visibility and security.

Examples with Istio helps with TLS/SSL, tracing etc.

## AWS App Mesh Offerings

Observability and traffic control:

- Easily export logs metrics and traces
- Client-side load balancing
- Routing

AWS container services compatibility:

- Amazon Container Service (Amazon ECS)
- Amazon Elastic Container Service for Kubernetes (Amazon EKS)
- AWS Fargate

EC2 compatibility:

- Integrate with services running directly on EC2 instances

## Under The Hood

App Mesh uses Envoy proxy:

- OSS project
- Wide community support numerous integrations
- Stable and production-proven
- "Graduated Project" in Cloud Native Computing Foundation
- Started at Lyft in 2016
- Operates as a network proxy

### Implementation options

1. In-process (SDK)
2. Out-of-process (sidecar proxy)

Sidecar proxy runs as a container. Setup to handle all egress and ingress calls heading towards to container.

## The Side-car proxy

- Decouples install/upgrade
- Configurable - separates business logic from operations
- Minimises inconsistencies

## How do we tell every proxy what to do?

Compute cycles are charged as part of the setup, but not for App Mesh itself.

Configuring lots of proxies is hard, which is where App Mesh comes in.

The control plane is App Mesh, whereas the Envoy proxy is the data plane. Once you tell the control plane what you want, it is no longer involved in communication between microservices. It goes through the proxy.

You can think of it as a distributed configuration manager.

## Application Observability

- Logging:
  - HTTP access logging
  - Amazon CloudWatch Logs
  - Available as container logs on Amazon ECS, EKS, Fargate
- Metrics:
  - CloudWatch metrics
  - StatsD (with tags)
  - Prometheus
- Tracing:
  - AWS X-Ray
  - Other Envoy tracing drivers

Also the benefits of IAM.

## Client-side Traffic Management

- Traffic shaping:
  - Load balancing
  - Weight targets
  - Service discovery (DNS + AWS Cloud Map)
  - Health checks
  - Retries (coming)
  - Timeouts (coming)
  - Circuit breakers (coming)
- Routing controls:
  - Path-based
  - Header-based (coming)
  - Cookie-based (coming)
  - Host-based (coming)
  - Protocols support (HTTP, TCP, gRPC (coming))
