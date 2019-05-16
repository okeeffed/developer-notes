---
menu: System Design
name: Glossary
---

# Glossary

## Basics

Whenever we are designing a large system, we need to consider a few things:

1. What are the different architectural pieces that can be used?
2. How do these pieces work with each other?
3. How can we best utilize these pieces: what are the right tradeoffs?

Investing in scaling before it is needed is generally not a smart business proposition; however, some forethought into the design can save valuable time and resources in the future.

## Key Characteristics

ScREAM:

1. Scalability
2. Reliability
3. Availability
4. Efficiency
5. Manageability

## Scalability

Scalability is the capability of a system, process, or a network to grow and manage increased demand. Any distributed system that can continuously evolve in order to support the growing amount of work is considered to be scalable.

A system may have to scale because of many reasons like increased data volume or increased amount of work, e.g., number of transactions. A scalable system would like to achieve this scaling without performance loss.

Good examples of horizontal scaling are Cassandra and MongoDB as they both provide an easy way to scale horizontally by adding more machines to meet growing needs. Similarly, a good example of vertical scaling is MySQL as it allows for an easy way to scale vertically by switching from smaller to bigger machines. However, this process often involves downtime.

## Reliability

By definition, reliability is the probability a system will fail in a given period. In simple terms, a distributed system is considered reliable if it keeps delivering its services even when one or several of its software or hardware components fail.

Take the example of a large electronic commerce store (like Amazon), where one of the primary requirement is that any user transaction should never be canceled due to a failure of the machine that is running that transaction. For instance, if a user has added an item to their shopping cart, the system is expected not to lose it. A reliable distributed system achieves this through redundancy of both the software components and data. If the server carrying the user’s shopping cart fails, another server that has the exact replica of the shopping cart should replace it.

Obviously, redundancy has a cost and a reliable system has to pay that to achieve such resilience for services by eliminating every single point of failure.

## Availability

By definition, availability is the time a system remains operational to perform its required function in a specific period. It is a simple measure of the percentage of time that a system, service, or a machine remains operational under normal conditions.

### Reliability vs Availability

If a system is reliable, it is available. However, if it is available, it is not necessarily reliable. In other words, high reliability contributes to high availability, but it is possible to achieve a high availability even with an unreliable product by minimizing repair time and ensuring that spares are always available when they are needed.

## Efficiency

To understand how to measure the efficiency of a distributed system, let’s assume we have an operation that runs in a distributed manner and delivers a set of items as result. Two standard measures of its efficiency are the response time (or latency) that denotes the delay to obtain the first item and the throughput (or bandwidth) which denotes the number of items delivered in a given time unit (e.g., a second). The two measures correspond to the following unit costs:

1. Number of messages globally sent by the nodes of the system regardless of the message size.
2. Size of messages representing the volume of data exchanges.

The complexity of operations supported by distributed data structures (e.g., searching for a specific key in a distributed index) can be characterized as a function of one of these cost units. Generally speaking, the analysis of a distributed structure in terms of ‘number of messages’ is over-simplistic. It ignores the impact of many aspects, including the network topology, the network load, and its variation, the possible heterogeneity of the software and hardware components involved in data processing and routing, etc. However, it is quite difficult to develop a precise cost model that would accurately take into account all these performance factors; therefore, we have to live with rough but robust estimates of the system behavior.

## Manageability

Ease of operation and maintenance. Things to consider for manageability are:

1. The ease of diagnosing and understanding problems when they occur
2. Ease of making updates or modifications
3. How simple the system is to operate (i.e., does it routinely operate without failure or exceptions?)

Early detection of faults can decrease or avoid system downtime. For example, some enterprise systems can automatically call a service center (without human intervention) when the system experiences a system fault.

## Load Balancer

Another critical component of any distributed system. It helps to spread the traffic across a cluster of servers to improve responsiveness and availability of applications, websites or databases. LB also keeps track of the status of all the resources while distributing requests. If a server is not available to take new requests or is not responding or has elevated error rate, LB will stop sending traffic to such a server.

Load balancer typically sits between the client and the server accepting incoming network and application traffic and distributing the traffic across multiple backend servers using various algorithms.

By balancing app requests, the LB reduces individual server load and prevents one single application from becoming a single point of failure - improving overall application availability and responsiveness.

### Utilizing full scalability and redundancy

To utilize full scalability and redundancy, we can try to balance the load at each layer of the system.

This could mean before a web server layer, an application server layer and database server layer.

### LB Pros

- UX is faster, uninterrupted. Requests are immediately passed on to a more readily available resource.
- Less downtime and higher throughput.
- Easier for sys admins to handle incoming requests while decreasing wait time for users.
- Smart LBs provide predictive analytics to determine traffic bottlenecks and give actionable insights.
- SysAdmins experience fewer failed or stressed components.

### LB Algorithms

Health checks are used for load balancers to check for healthy backend servers. If a health check fails, the server is automatically removed from the pool.

There are a variety of LB methods with different algorithms for different needs:

1. **Least Connection Method** - directs traffic to server with least active connections.
2. **Least Response Time Method** - directs to server with the fewest active connections and the lowest average response time
3. **Least Bandwidth Method** - This method selects the server that is currently serving the least amount of traffic measured in megabits per second (Mbps).
4. **Round Robin Method** — This method cycles through a list of servers and sends each new request to the next server. When it reaches the end of the list, it starts over at the beginning. It is most useful when the servers are of equal specification and there are not many persistent connections.
5. **Weighted Round Robin Method** — The weighted round-robin scheduling is designed to better handle servers with different processing capacities. Each server is assigned a weight (an integer value that indicates the processing capacity). Servers with higher weights receive new connections before those with less weights and servers with higher weights get more connections than those with less weights.
6. **IP Hash** — Under this method, a hash of the IP address of the client is calculated to redirect the request to a server.

### Redundant Load Balancers

LB can be a single point of failure, therefore a second load balancer can be connected to the first to form a cluster. In the case that the first LB fails, the second moves from passive to active.

## Caching

Caching enables you to make vastly better use of the resources you already have as well as making otherwise unattainable product requirements feasible.

Caches take advantage of the locality of reference principle: recently requested data is likely to be requested again.

They are used in almost every layer of computing: hardware, operating systems, web browsers, web applications, and more.

### Application Server Cache

Placing a cache directly on a request layer node enables the local storage of response data. Each time a request is made to the service, the node will quickly return local cached data if it exists. If it is not in the cache, the requesting node will query the data from disk. The cache on one request layer node could also be located both in memory (which is very fast) and on the node’s local disk (faster than going to network storage).

What happens when you expand this to many nodes? If the request layer is expanded to multiple nodes, it’s still quite possible to have each node host its own cache. However, if your load balancer randomly distributes requests across the nodes, the same request will go to different nodes, thus increasing cache misses. Two choices for overcoming this hurdle are global caches and distributed caches.
