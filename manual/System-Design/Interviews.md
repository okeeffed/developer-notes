---
menu: System Design
name: Interviews
---

# Interviews

## Steps

Acronym: CASM HDR

1. Clarify requirements
2. API Definition
3. Scale Estimatation
4. Model Data
5. High-Level Design
6. Detailed Design
7. Resolve Bottlenecks

## 1. Clarify Requirements

It is always a good idea to ask questions about the exact scope of the problem we are solving.

- Design questions are mostly open-ended, and they don’t have ONE correct answer, that’s why clarifying ambiguities early in the interview becomes critical.
- Candidates who spend enough time to define the end goals of the system always have a better chance to be successful in the interview.
- Also, since we only have 35-40 minutes to design a (supposedly) large system, we should clarify what parts of the system we will be focusing on.

### Twitter Design System Example

- Will users of our service be able to post tweets and follow other people?
- Should we also design to create and display the user’s timeline?
- Will tweets contain photos and videos?
- Are we focusing on the backend only or are we developing the front-end too?
- Will users be able to search tweets?
- Do we need to display hot trending topics?
- Will there be any push notification for new (or important) tweets?

## 2. API Definition

Define the API for the system. This should help establish the exact contract expected.
