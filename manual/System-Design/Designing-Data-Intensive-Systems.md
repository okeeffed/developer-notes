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
