import { SimpleQuiz } from "../../../components/SimpleQuiz"

# 3: Designing A Software Architecture

A structured solution that meets all requirements, while optimizing common quality attributes such as performance, security and manageability.

## Software requirements

- User requirements
- Business requirements
- IT system requirements

## What composes an architecture

- The structural elements and interfaces composing the system
- How these elements behave in collaboration
- The composition of elements into larger subsystems
- The architectural style that guides this composition

Also covers functionality, usability, resilience, performance, reuse, comprehensibility, economic and technology constraints, tradeoffs and aesthetic concerns.

## What are the goals?

- Document high-level structure
- Do not go into implementation details
- Minimize complexity
- Address all requirements
- Be compatible with all use cases and scenarios

## Software Architecture Design Tips

- Build to change instead of buildin to last
- Use models, but only to analyze and reduce risk
- Use visualization to communicate and collaborate
- Identify and research critical points of failure

## Key Principles Of Software Architectures

The goal of creating software architecture is to minimize complexity.

This can be accomplished by separating the design into different areas of concern.

> The example given here was all the different areas of concern. The examples are given an architectural design pattern where each area has different responsibilities. They have data layers, view layers, database etc. Fifth layer was everything unrelate to the laters (ie. cache layers, etc).

## Key Principles

1. Separation of Concerns
2. Single responsibility principle
3. Principle of least knowledge (components do not know the internals of other components ie using private methods, properties)
4. Don't repeat yourself
5. Minimize upfront design (basically converts to MVP for the architecture specification)

## Guidelines for software architectures

- Use consistent patterns in each layer
- Do not duplicate functionality
- Prefer composition over inheritance
- Establish a code convention

The layer guidelines:

- Separate areas of concern
- Define communcation between layers
- Use abstraction to loosely couple layers
- Don't mix different types of components in a layer
- Use a consistent data format with a layer

Component guidelines:

- No component should rely on internals of another (public interfaces only - black box)
- Do not mix roles in single components
- Define clear contracts for components
- Abstract system wide components away from other layers

## Intro to UML

UML = Unified Modelling Language

It's a general-purpose, developmental, modelling language intended to provide a standard way to visualise the design of a system.

The attributes are:

- Visual
- Abstract
- Descriptive
- Standard
- Supports Code Generation
- Supports Reverse Engineering

What are the UML design elements:

- Models
- Views
- Diagrams

UML Views:

- Business system
- IT System

UML Diagrams:

- Component diagram
- Class diagram
- Sequence diagram
- State diagram
- Activity diagram
- Layer diagram
- Use Case diagram

## 7 Popular UML Diagrams

### The Component Diagram

- Shows components
- Shows implemented and required interface
- Components can be nested

### The Class Diagram

- Shows classes
- Shows methods and fields
- Shows associations, generalizations and cardinality

### The Sequence Diagram

- Shows call sequence
- Shows calling calss, calle method and return data type
- Can depict loops

### The State Diagram

- Shows states or activities
- Shows allowed transitions
- Can be nested
- Can depict internal activities

### The Activity Diagram

The modern successor of flow charts.

- Shows process or workflow
- Can be nested
- Can show concurrent actions
- Can have swim lanes

### The Layer Diagram

- Non-Standard, invented by MS
- Shows areas of concern
- Shows reference between areas
- Can be validated

### The Use Case Diagram

- Shows actors
- Shows use cases
- Binds actors to use cases
- Can depict generalizations

## Designing Architectures with UML

| Solution Architecture Element      | UML Diagram               |
| ---------------------------------- | ------------------------- |
| Functional requirement (optional)  | Use case diagram          |
| Structural elements, composition   | Class, Component          |
| Structural elements, collaboration | Sequence, Activity, State |
| Areas of concern                   | Layer                     |

## UML Design Structures

- UML as sketch
- UML as blueprint:
  - Forward engineering: use diagram to generate code
  - Reverse engineering: use code to generate diagram
- UML as validation:
  - Validate implementation against diagram

## UML in Visual Studio Ultimate 2017

- Supports Component, Class, Sequence, Activity, Layer and Use Case diagrams
- Version control, machine-readable, uses T4 for code gen
- Forward engineering for class diagrams
- Reverse engineering for class, sequence diagrams
- Validation for layer diagrams

## The process for designing architectures

An iterative process for your architecture.

1. Create/adjust objectives
2. Identify key scenarios
3. Create overview
4. Identify key issues
5. Create candidate solution

### Create/adjust objectives

- Identify scope of architecture
- Estimate time to spend
- Identify audience
- Identify technical-, usage- and deployment constraints

### Identify key scenarios

Key scenarios:

- Significant unknown/risk
- Significant use case
- Intersection of quality/function
- Tradeoff between attributes

Significant use cases:

- Business-critical
- High impact

Create Use Case Diagrams

### Create Application Overview

- Determine application type
- Identify deployment constraints
- Identify architecture pattern
- Determine technologies

Create Layer Diagram

### Identify Key Issues

Quality attributes ie. system, runtime, design, user

System wide concerns:

- Authentication & authorization
- Caching
- Communication
- Configuration management
- Logging & exception management
- Validation

### Create candidate solution

- Create Baseline architecture (first iteration)
- Create Candidate architecture (further iterations)
- Develop Architectural Spikes (little research projects)

Create Activity, Sequence, State and Component Diagrams.

> Create class diagram if needed. This should be something empowered to the lead developer.

During each cycle...

- Do not introduce new risk
- Mitigate more risk than baseline
- Meet additional requirements
- Enable more key scenarios
- Address more key issues

Start communicating architecture when you exceed 50% coverage.

<SimpleQuiz
  questions={[
    {
      type: "input",
      question: {
        text: "What are the key principles for software architects?",
      },
      options: [
        {
          text:
            "Principle of Least Knowledge, Separation of Concerns, Single responsibility principle, Don't repeat yourself, Minimize upfront design",
          isAnswer: true,
        },
      ],
    },
    {
      type: "input",
      question: {
        text: "What are some of the popular UML diagrams?",
      },
      options: [
        {
          text: "Component, Class, Sequence, State, Activity, Layer, Use Case",
          isAnswer: true,
        },
      ],
    },
    {
      type: "input",
      question: {
        text:
          "What is the iterative process for designing software architectures",
      },
      options: [
        {
          text:
            "Create/adjust objectives, Identify key scenarios, Create overview, Identify key issues, Create candidate solution",
          isAnswer: true,
        },
      ],
    },
  ]}
/>
