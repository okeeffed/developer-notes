---
menu: System Design
name: Designing Data Intensive Systems
---

# Designing Data Intensive Systems

## Data Systems

- The aim is to keep them: Reliable, Scalable and Maintainable
- Data Systems knowledge includes understanding caches, search indexes, stream/batch processing

### Reliability

- Keeping data correctness, completeness across systems, performant and resilient.
- Fault vs Failure: Fault is a system failing to adhere to a design spec whereas failure means a system failure and requires failover backup procedures.
- It's better to measure the latency in percentiles.

### Scalability

- For many backends, the response time is dependent on the slowest server response.
- Elastic vs manual scaling: one is automated.

The architecture for each large scale project is highly specific. It depends on factors such as:

1. Volume of reads
2. Volume of writes
3. Type of data to stor
4. Data complexity
5. Response time
6. Access patterns

Example: You could expect 100,000 req/s @ 1kB in size vs 3 req/s @ 2GB in size which equates to the same data throughput but very different requirements.

- Load parameters identify which requests are common vs which ones are rare.

### Maintainability

Remember these three principles:

1. Operability
2. Simplicity (- think abstractions like SQL)
3. Evolvability
