# 5: Designing Layers Components And Services

## Choosing the right patterns

- Layered pattern is a good starting point with 3 layers (presentation, business/application, data)
- Add service layer if you plan to expose an API

### The Presentation Layer

Use components for:

- Containers
- Reuse
- Third parties
- Declarative rendering

Choose MVC for large UIs (or MVVM is tech supports data binding).

### The Business Layer

Use components for:

- Modular functionality
- Plugin support
- Business Entity abstraction
- Declarative configuration (visual workflows, business rules)

If you don't need the above, use an object-orientated architecture.

### The Data Layer

Use components for:

- Handling diverse data sources
- Increased abstractions
- Declarative configuration (data access, data access patterns)

### The Service Layer

Use components for:

- Contract management
- Containers
- Declarative configuration

Choose microservices if your system is composed mostly of interlocking APIs.

Choose message bus if all services alter state on a common message.

## Designing Layered Architectures

All the considerations to keep in mind.

A standard logical layered design displayed has the following:

- Presentation
- Business
- Data
- Systemwide
- Service

The example gave examples of the presentation being able to talk to both the service and business layer. The Service layer talks to the business layer. It is an "L" shape for both the presentation and service layer.

### Choosing Layering Strategy

- Logical separation: on the same node
- Physical separation: tiered on different nodes

### Remove & Merge Layers

- Application without API: no service layer
- API with no UI: service layer and business & data hybrid layers

### Determine Layer Interactions

- Loose interactions: layers can call down further than one layer of separation
- Strict interactions: layers can only call down to one layer of separation (recommended)

### Identifying system-wide concerns

- Incorrect design: caching component for each layer.
- Correct design: systemwide layer for the caching.

### Define layer interfaces

How are layers talking to each other? There are many ways of doing this.

Two ways:

1. Public interfaces
2. Facade component (which is the gateway to other components at the start of the layer)

Some alternatives: singleton, command pattern, dependency injection, message-based.

## Designing Component Architectures

General guidelines:

- Components are SOLID.
- Highly cohesive.
- No knowledge of internals of other components.

### Components in the presentation layer

- UI components
- Presentation logic: views, controllers, view models
- Optional: presentation entities

### Service layer components

- Services
- Service interfaces
- Message types
- Optional: service broker

### Business layer components

- Business facade
- Business logic: components, workflows, business rules
- Business entities: populate through ORM or data objects from data layer
- Business events

### Data layer components

- Data facade
- Data source adapters
- Service adapters
- Optional: data objects, command & query objects

### Modular architectures

If you have a plugin framework, will your plugins have a public interface?

- Plugin with UI crosses and breaks layering principle
- Plugin without UI: keep in business layer

## Designing Service-Orientated Architectures

- There is a section comparing REST vs SOAP services. I will just continue with REST.

### The Service Design Process

1. Define data & messages
2. Define service contracts
3. Plan exception handling
4. Define how business entities are transformed to messages
5. Define how business functions are abstracted to services

### Define Service Messages

- Request/Response, Fire & Forget, Bi-Directional
- Command, Query, Document, Entity, Event, Message - what type are you sending?
- Avoid large messages
- Add expiration & diagnostic info

Define in class diagram.

> Be careful when sending the "document"

### Define Service Contracts

- CRUD or RPC
- Stateful/stateless
- Transaction management
- Handle invalid calls: timeouts, duplicate calls, calls out of order.

Define in component diagram.

### Plan Exception Handling

- Only catch what you can handle
- Use meaningful messages: business explanation, technical information, retry instructions
- Return fault metadata
- Log everything
- Notify exception subscribers

### Define Business Entity Transforms

Transform entities to messages:

- Reference Business layer directly
- Use an object mapper
- Use an ORM
- Use a transform language
- Custom-built

Considerations:

- Narrowing/widening transforms (changing number of fields)
- Flattening/elevating transforms (squashing data together/splitting it up)

## Define Business Abstraction

Abstractions:

- Call the facade directly
- Call business components
- (Re)start a workflow
- Log a Business Event

Consideration:

- Long-running workflows
- State management
