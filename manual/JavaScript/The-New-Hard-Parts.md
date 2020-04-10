---
menu: JavaScript
name: The New Hard Parts
---

# The New Hard Parts

## Resources

1. [FE Masters Course](https://frontendmasters.com/courses/javascript-new-hard-parts/)
2. [Course Slides](https://static.frontendmasters.com/resources/2018-05-23-javascript-new-hard-parts/new-hard-parts-slides.pdf)
3. [Iterator Exercises](http://csbin.io/iterators)
4. [MDN yield Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield)

## Iterators

We regularly have lists/collections/data where we want to go through the elements and do something ie

```javascript
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
```

We're going to discover there's a new beautiful way of thinking about using each element one-by-one.

> Programs store data and apply functonality to it. But there are two parts to applying functions to collections of data.

The parts are:

1. The process of accessing each element.
2. What we want to do to each element.

Iterators automate the accessing of each element - so we can focus on what to do to each element - and make it available to us in a smooth way.

If we can create a function that stored numbers and each time we ran the function return the next element, it would let us think of our array/list as a stream/flow of data with our function returning the next element from our "stream" - this makes our code more readable and more functional.

> Remember, functions can be returned from other functions in JavaScript.

### Return Next Element with a Function

```javascript
// Note: There will eventually be an error with this
// that isn't currently handled.
function createFunction(array) {
  let i = 0;
  const inner: {
    next: function() {
       const element = array[i];
       i++;
       return element;
    }
  }
  return inner;
}

const returnNextElement = createFunction([4, 5, 6]);
```

> Any function that returns the next element is known as an "iterator function".

## Generators

Once we start thinking of data as flows (picking elements one-by-one), we can rethink how we produce those flows. JS let's us do this with a function:

```javascript
function* createFlow() {
  yield 4;
  yield 5;
  yield 6;
}

const returnNextElement = createFlow();
const element1 = returnNextElement.next();
const element2 = returnNextElement.next();
```

Yielding allows us to dynamically set what data flows out to us. The implication of `yield` is that the work that comes of a function is what is stored:

```javascript
function* createFlow() {
  const num = 10;
  const newNum = yield num;
  yield 5 + newNum;
  yield 6;
}

const returnNextElement = createFlow();
const element1 = returnNextElement.next(); // 10
const element2 = returnNextElement.next(2); // 7 - be wary of that
```

> Generators are described to be more towards the declarative side and not the imperative.

> A great insight was the idea of being able to infinitely calculate the fibonacci sequence.

## Async Generators

We have the ability to pause and only restart when the data returns.

```javascript
function doWhenDataReceived(value) {
  returnNextElement.next(value)
}

function* createFlow() {
  const data = yield fetch('http://twitter.com/will/tweets/1`)
  console.log(data)
}

const returnNextElement = createFlow()
const futureData = returnNextElement.next()

futureData.then(doWhenDataReceived)
```

> Important to note how this generate continues to keep things asynchronous.

## Async Await

```javascript
function doWhenDataReceived(value) {
  returnNextElement.next(value)
}

function* createFlow() {
  console.log('Me first')
  const data = await fetch('http://twitter.com/will/tweets/1`)
  console.log(data)
}

createFlow()
console.log('Me second')
```
