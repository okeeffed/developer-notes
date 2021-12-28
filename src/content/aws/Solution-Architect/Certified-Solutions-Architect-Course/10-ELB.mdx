# 10: Elastic Load Balancer

## Overview

Automatically distributes incoming app traffic across multiple targets, such as Amazon EC2 instances. This can be done multi-AZ.

There are three types:

1. Application Load Balancer: Best suited for load balancing off http/https traffic. Operate at Layer 7 and are app-aware. Intelligent Load Balancer.
2. Network Load Balancer: Operating at Layer 4. Capable of handling millions of requests per second, while maintaining ultra-low latencies. Performance Load Balancer.
3. Classic Load Balancer: Legacy load balancer. Can load http/https apps and use layer-7 specific features, such as X-Forwarded and sticky sessions. Classic/Test/Dev LB.

All ELBs can be configured with Health Checks.

The status of the instances that are healthy are `In Service` and unhealthy are `Out of service`.

ELBs route requests only to healthy instances.

## Using Application Load Balancers

The App Load Balancer functions at the seventh layer of the Open Systems Interconnection (OSI) model.

After the load balancer recieves the request, it evaluates the listener rules in priority order to determine which rule to apply, then selects a target from the target group for the rule action.

### Listeners

Checks for connection requests from clients, using the protocol and port you configured.

You define rules that determine how the load balancer routes requests to its registered targets.

Each rule consists of a priority, one or more actions and one or more conditions.

### Rules

When conditions for a rule are met, then its actions are performed. You must define a default rule for each listener, and you can optionally define additional rules.

### Target Groups

Each target group routes requests to one or more registered targets, such as EC2 instances, using the protocol and port number you specify.

In the example diagram, there may be a listener for port 80 and another listener has multiple rules.

Each listener will redirect to different targets. You can check all targets with a health check.

The demo shows `path patterns` for routing to web servers in the same region and media servers in another.

### App Load Balancer Limitations

- Only supports HTTP/HTTPS.

### HTTPS Load Balancing

To use HTTPS listener, you must deploy at least one SSL/TLS server cert on your load balancer.

The load balancer uses a server cert to terminate the FE connection and then decrypt requests from clients before sending them to the targets.

> In the ELB, you can edit your rules to then add new rules.

The exam tips:

- Listeners: A listener checks for connection requests from clients, using the protocol and port you configure.
- Rules: Determine how the load balancer routes requestts to its registered targets. Each rule consists of a priority, one or more actions and one or more conditions.
- Target Groups: Each target group routes requests to one or more registered targets, such as EC2 instances, using the protocol and port number you specify.
- Limitations: HTTP and HTTPS only.
- HTTPS: To use HTTPS listener, you must deploy at least one SSL/TLS server cert on your load balancer.

## Extreme Performance With Network Load Balancers

- A load balancer that operates at Layer 4 of the OSI model.

### Request Received

After LB recieves a connection request, it selects a target from the target group for the default rule.

It attemps to open a TCP connection to the selection target on the port specified in the listener configuration.

### Listeneres (NLB)

Check for connection requests from clients, using the protocol and port you configured.

The listener on a Network Load Balancer then forwards the request to the target group. There are no rules, unlike with App Load Balancers.

### Target Groups (NLB)

Each target group routes requests to one or more registered targets, such as EC2 instances, using the protocol and port number you specify.

### Ports and Protocols (NLB)

- Protocols supported: TCP, TLS, UDP, TCP_UDP.
- Ports: 1-65535.

### Encryption (NLB)

You can use a TLS listener to offload the work of encryption and decryption to your load balancer so your applications can focus on their business logic.

If the listener protocol is TLS, you must deploy exactly one SSL server certificate on the listener.

Use Cases for NLB: best suited for load balancing of TCP traffic where extreme performance is required. Operating at the connection level (layer 4), NLBs are capable or handling millions of reqs per second, while maintaining ultra-low latencies.

Other use cases:

1. Protocols not supported by ALB.
2. NLB can decrypt traffic, but you will need to install the cert on the load balancer.

## Classic Load Balancers

The legacy load balancers.

- You can load balance HTTP/HTTPS apps and use Layer 7-specific features, such as `X-Forwarded` and sticky sessions.
- You can use strict Layer 4 load balancing for appls that rely purely on the TCP protocol.

### X-Forwarded-For

When traffic is sent from a load balancer, the server access logs contain the IP address of the proxy or load balancer only.

To see the original IP of the client, the `X-Forwarded-For` req header is used.

### Gateway Timeouts

If the app stops responding, the Classic Load Balancer responds with a `504` error.

This means the app is having issues. This could be either at the web server layer or database layer.

## Getting "Stuck" With With Sticky Sessions

Classic Load Balancers route each request independently to the registered EC2 instance with the smallest load.

Sticky sessions allow you to bind a user's session to a specific EC2 instance.

This ensures that the same user always lands on the same EC2 instance.

Where could this cause problems? What happens if the EC2 instance is removed from that pool? You will get an error. You can stop that by disbling sticky group sessions.

Tip: You can enable sticky sessions for ALB as well, but the traffic will be sent at the target group level. If there are multiple EC2 instances in that group, they will all be used.

## Leaving the Load Balancer With Deregistration Delay

Note: with classic load balancers, this is called connection draining but it is all the same thing.

What is Deregistration Delay?

Allows Load balancers to keep existing connection open if the EC2 instances are de-registered or become unhealthy.

This enables the laod balancer to complete in-flight requests made to instances that are de-registering or unhealthy.

You can disable this if you want your LB to immediately close connections to the instance that are de-registering or have become unhealthy.

Other notes from [here](https://jayendrapatil.com/tag/elb-deregistration-delay/):

- Connection draining helps perform maintenance such as deploying software upgrades or replacing back-end instances without affecting customers’ experience
- Connection draining allows you to specify a maximum time (between 1 and 3,600 seconds and default 300 seconds) to keep the connections alive before reporting the instance as de-registered. The maximum timeout limit does not apply to connections to unhealthy instances.
- If the instances are part of an Auto Scaling group and connection draining is enabled for your load balancer, Auto Scaling waits for the in-flight requests to complete, or for the maximum timeout to expire, before terminating instances due to a scaling event or health check replacement.
