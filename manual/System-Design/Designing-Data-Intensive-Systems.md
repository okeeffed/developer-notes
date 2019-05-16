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

## Data Models

- Relational
- Document
- Graph (this is essentially a subtype of relational)

### Pros of the Document Model

- Schema flexibility
- Better performance due to locality
- Apps are generally closer to the data structure

## Storage + Retrieval

- Big difference in storage engines that are optimized for transactional vs analytical (think OLTP/OLAP)
- Indexes help find keys but generally slow down writes
- In-memory tress: examples red-black trees, AVL trees. We can make the storage engines to use these styles of trees.
- LSM Trees can be slow when looking up keys that don't exist
  - Can be countered by "Bloom Filters" -> can tell if the key exists.

### B-Trees

- Most common index used by databases.
- While log-structured indexes work in variable-size segments and written sequentially, B-Trees have fixed sized "blocks" or "pages" - this design corresponds to reflecting the underlying hardware.
- B-Tree variant "fractal trees" borrow log-structured ideas to reduce disk seeks.

### B-Trees vs LSM-Trees

- B-Tree more mature
- LSM faster for writes
- B faster for reads
- B-Tree must write everything twice (write-ahead log and potential multi-writes to tree pages)
- Log structured indexes also rewrite data multiple times. This is known as "write amplification" and is a concern for SSDs.
- LSM trees compress files better

### The downsides of LSM-Trees

- Compaction process can sometimes interfere with ongoing reads/writes.
