---
name: Events
menu: Principles 
---
- [Events](#events)
    - [Using an emitter](#using-an-emitter)
    - [Emitter principles](#emitter-principles)

# Events

## Using an emitter

In order to keep components as flexible and reusable as possible for differing projects, abstracting all events that require processing into a data stream and then adding subscribers to those streams is the angle to take projects.

## Emitter principles

Define a schematic for what sort of streams can happen and allow them to be flexible enough so that within the subscriptions then listeners can be specific about their task. I.e. if you need to add a user, ensure the stream can cater to listeners that handle posting data to analytics on the user, posting data to different databases etc.
