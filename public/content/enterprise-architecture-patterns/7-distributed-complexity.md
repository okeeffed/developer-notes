---
menu: Enterprise Architecture Patterns
name: 7. Distributed Complexity
---

# Distributed Complexity

The issue with jQuery was that the logic and interactions were tightly coupled. When the original Angular came on the scene, it gave the ability to separate these two.

Afterwards, we had a service that were shared by controllers which was shared by the DOM.

Redux then shows us and allows us to separate the state management portion.

There is a quote about classical physics being deterministic and that determinism allowing you to predict the future but also understand the past.

The quote talks about everything in a well-architectured system.

## Simulating user actions

You can know everything about the system because it is in the **store**. We know how the state changes thanks to **reducers**. Such a system is called "reversible".

We are able to create "time" and "space" between the user interaction and how we respond to it via **actions**.

Finally, thanks to the "prediction" and understanding of how things may work, there is a demonstration of pre-emptively setting up the actions to iterate through and cycling through them.

## Dynamic Ations & Real World Benefits

What if we could get a set of actions that did not exist that were pre-hard coded, then load them and dispatch.

We can get an action loaded from the server and then dispatch it.

What if we can take more than one action? So instead, we have a number of actions that come in and dynamically run them. This enables us to create distance between the actions and the application logic that handles them.

What can we do with this particular paradigm? If you have the ability to recreate state or user interaction, then imagine you had an application that - when it broke - it could capture the last known good state, the action that broke it and the current state. That will allow you to do is load that state and recreate the faulty action locally.

Another example: what if you have a lot of repetitive actions? Well, you could replay and automate that particular task.

The third idea is that of a "thin" component. We can use Redux to manage all of the state, but the state displayed in the workshop is actually using web sockets. It takes that application state, rip it out of the application itself and uses the web sockets to communicate to the applications themselves.

This effectively makes the application "stateless" since all of it occurs through the remote web socket.

The apply the mindset of observables of "output-to-input" with the websocket example. The answer comes from the fact that when we click on the different table items on the right, it is updating the left. In the right-hand side, when we click, we push the information to the server and the server pushes the updates.
