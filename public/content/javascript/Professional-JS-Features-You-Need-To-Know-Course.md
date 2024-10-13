
Please note that these docs only cover a small subset of things that I was interesting in covering.

## Links and resources

- https://frontendmasters.com/courses/pro-js-features/
- https://firtman.github.io/projs/slides.pdf course notes

## 3 ES6 review

### 3.1 ES Modules

Standardised way to organise and reuse JavaScript code across different files using import and export statements for better modularity and maintainability.

Before ES6:

- Same global content
- One script's can't include or load other scripts (worker exception)
- Can't modularise behaviour or data
- Node.js had to introduce CJS

ES6 introduced:

- Work as a container isolated from the global object (window, global, self)
- For Node: living together with CJS
- The global scope creates a module import tree as soon as it's parsing modules

## 4 After ES6

### 4.6  Static Fields and Initialization Blocks

For static fields:

```js
class Example {
	static maxAge = 150;
}

Example.maxAge // 150
```

Initialization block:

```js
class Example {
	#maxAge = 150

	static {
		console.log("I'm in the static init block")
	}

	getMaxAge() {
		return this.#maxAge
	}
}

Example.maxAge // 150
```

It's "like a constructor for static values".

When the class code loads, the static initialisation block is invoked.

## 5 Advanced techniques

### 5.1 Proper Tail Calls

This is not actually a syntax change, it's an improvement for improving recursion. It changes how recursive performance works when recusing using a call to itself.

```js
function factorial(n, acc = 1) {
	if (n === 0) {
		return acc;
	} else {
		return factorial(n - 1, n * acc)
	}
}
```

See more here https://webkit.org/blog/6240/ecmascript-6-proper-tail-calls-in-webkit/

### 5.2 Proxies & Reflect API

Enables us to do something by being a proxy prior to a change using traps.

The example code given:

```js
const target = { name: "Joseph" }
const handler = {
	get: (obj, prop) => {
		console.log(`Trying to get ${prop} from ${JSON.stringify(obj)}`)
		return Reflect.get(obj, prop) || 'default'
	}
}

const proxy = new Proxy(target, handler)
console.log(proxy.name)
```

Read more on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect#description

### 5.3 Symbol

```js
const sym = new Symbol('description')
const obj = {
	[sym]: 'value'
}
console.log(obj[sym])

const globalSymbol = new Symbol('description')
```

Two different symbols are not identical to each other.

Read more https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/for

### 5.4 Error Cause & Hashbang Grammar

`cause` is a new value that can be added to an error in ES2022.

```js
throw new Error('Something went wrong', {
	// This was introduced in ES2022 for more metadata
	cause: new Error('Original error')
})
```

Hash bang syntax is just `#!/usr/bin/env node`.

### 5.5 WeakRefs & FinalizationRegistry

We can create a weak reference with the `WeakRef` constructor.

The idea is that weak references do not care if they lose the reference if nothing else is used.

Some useful situations may be have cyclic references, or passing values down into other libraries etc.

To access an object through a week reference, you need to use `<var-name>.deref().<property>`.

You probably won't use this too often unless using things like WebGL or WASM.

The `FinalizationRegistry` is like a hook that runs when an object is being released in memory by a garbage collector.

### 5.7 Regex Enhancements

Just some notes that there were some improvements made to things like supporting unicode flags to name positions, etc.

Worth knowing for future reference.