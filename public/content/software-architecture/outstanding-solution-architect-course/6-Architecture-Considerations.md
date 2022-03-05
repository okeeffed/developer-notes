# 6: Architecture Considerations

## Design Quality Attributes

The attributes of the architecture design. Relates to security, performance, scalability etc.

### Conceptual Integrity

- Isolated layers and components
- Application Lifecycle Management
- Healthy team collaboration
- Design and coding standards
- Break away from legacy designs: facade pattern, wrap as the service, rebuild from scratch

### Maintainability

- Isolated layers and components
- Structured communication
- Consider a plugin system
- Rely on platform features
- Use systemwide layer
- Add unit tests
- Documentation

### Reusability

- Component-based architecture
- Adhere to stands
- General-purpose code
- Allow third parties
- Use a plugin system
- Use a systemwide layer

### Testability

- Design for testing
- Allow mocking
- Cover all layers
- Automate case studies

Test:

- Individual components
- Entire layers
- Collaboration between layers
- Load, Security, ...

### Usability

- Elegant & simple UI
- Implementals all case studies in minimal number of interactions
- Clear multi-step workflows
- Intuitive feedback
- Non-technical

## Runtime quality attributes

Once "0.1" version has been built, we look at these.

### Availability

Is it up and running?

- Tier failover
- Use rate limiter
- Short-lived resource locks
- Recover from exceptions
- Update-friendly architecture
- Handle network faults: offline support and buffered proxy.

### Interoperability

- Data transfer
- Keep systems separate
- Adhere to standard: SOAP, REST, XML/JSON

### Manageability

- Health monitoring, logging, diagnostic tracing
- Consider a plugin system
- Declarative configuration
- Add diagnostic tools: live tracing, diagnostic notifications, runtime log inspection, in-situ debugging

### Performance

- Buffered proxy
- Async responses
- Load-balanced tiers
- Caching
- Load tests
- Minimize throughput: rate limiting, design coarse interfaces, minimize cache misses

### Reliability

- Self-healing architecture
- Use store and forward
- Use alternative system if: primary system is offline, very slow or primary output is invalid
- Replay messages when external resources come back online

### Scalability

Tier scaling:

- Scale up
- Scale out

Handle load spikes:

- Async responses
- Store and forward
- Allow stale data

### Security

- Authenticate and authorize clients (two different layers)
- Validate input and output
- Encrypto sensitive data
- Protect again: spoofing, malicious input & output, malicious use, data theft, DDoS attacks.

## Planning for caching

What to cache?

- UI pages
- UI components
- Service output
- Business entities
- Business state
- Data query results
- Configuration data

List each data to be cached in each layer. In the example, the above info is distributed into the different layers we want to cache.

### Where to cache?

- Local memory
- State server
- File system
- Database

### Managing the cache

- Expiration strategy: time-based, event-based
- Flush strategy: manual or automatic (least recently used, least frequently used, priority)

### How to fill the cache?

- Proactive loading: static data, known update frequency, known size
- Reactive loading: volatile data, unknown lifetime, large data volume, fast caching medium

## Planning for Exceptions

### Exception strategies

- Allow to propagate
- Catch and Re-throw: logging, retains stack trace
- Catch, Wrap and Throw: add metadata, expose consistent exception types
- Catch and Discard

### Presentation layer

- Catch, Display and Discard
- Attempt to re-try
- Switch to secondary system
- Alert by email, SMS, Slack, ...
- Use meaningful exceptions: business explanations, technical information, steps to resolve

### Service layer

- Catch and re-throw
- Attempt to retry
- Switch to secondary system
- Log exception and input message

### Business layer

- Catch, wrap and throw
- Use custom exception types
- Provide business context
- Rollback transactions
- Log exception and input args
- Broadcast to subscribers

### Data layer

- Catch and re-throw
- Log exception and input query

## Planning for Development

Deployment models

- Monolithic: all layers on one server
- Distributed: some layers on different servers

### Distributed Deployment Guidelines

- Minimize blocking calls: async calls, one-way calls, buffering
- Use distributed transactions
- Use coarse-grain interfaces
- Manage state: stateless design - highly scalable, stateful design - supports workflows but doesn't scale, shared state server

## Deploy for Performance

- Business/Data layers scale out
- Can detect failed tiers
- Stateless design preferred
- Stateful design requirements: shared state server, session affinity

## Deploy for Reliability

- Secondary tier takes over the primary tier fails
- Requires 2x hardware
- Sychronization considerations: sync when secondary tier activates, or: allow stale data

### Deploy for Scalability

- Data replicated on multiple tiers
- Replication breaks consistency and atomicity
- Consistency considerations: delayed sync in background, allow stale data, partition data
