---
menu: Enterprise Architecture Patterns
name: 6. Time Management In Applications
---

# Time Management In Applications

How do we manage time when we are building applications? Particular asynchronous operations.

This is typically where control flow problems come from. We need to communicate that this thing has happened and do it in order.

> There is a reference to the asynchronous observables course.

This brings us to the fifth element of programming: observable streams.

**Observables give us a powerful way to encapsulate, transport and transform data from user interactions to create powerful and immersive experiences.**

1. Encapsulate: a stream creates a tunnel to move from its origin to its destination safely.
2. Transport: the stream reliables allows you to transit the data.
3. Transform: you can setup "pitstops" along the tunnel to transform data along the way to be in the exact form that you need it to be in.

## Streaming values over time

Observables are essentially the combination of the **Iterator pattern and the Observer pattern**.

This allows your to communicate state over time.

We are familiar with getting values over time - most notably with Promises. The limitation of the promise is that it is a single resolution.

The difference with observables is that it will emit multiple values over time.

> When you call functions, you "pull" values to you. Promises and observables "push" the value to you.

Observables are challenging, but if you focus on just the observable stream it becomes a lot easier to understand.

It just takes a smaller paradigm shift. Instead of it just being "input" to "output" and the "pulling" of data, we need to shift our paradigm to go to "output" to "input".

Basically it is `initial output -> magic -> final input`. This looks like `event -> operators -> subscribe`.

## Preserving State & Merging Streams

How do we preserve state in a stream?

What happens if there are multiple streams? An anology is put together about getting soda from a stream at a fastfood. The example shows a `merge` operator that brings together multiple streams.

The example given is that there is a partially applied function that can take an argument from the "event" that will fully apply the function and return the value to then enter the merged stream.

## Sequencing Streams with switchMap

This is done in the examples with the `switchMap` operator. The `switchMap` swaps to a stream and you can pipe until `takeUntil` another stream occurs, then come back to the rest of the upstream.

## Communication with Subjects

A subject is a mechanism that creates an observable stream but also produces the mechanisms to control that observable stream.

```ts
export class NotificationService {
  private subject = new Subject();
  // create Observable
  notifications$ = this.subject.asObservable();

  dispatch(notification) {
    this.subject.next(notification);
  }
}
```
