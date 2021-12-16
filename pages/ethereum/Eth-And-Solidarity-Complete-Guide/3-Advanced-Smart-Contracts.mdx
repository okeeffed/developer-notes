# 3: Advanced Smart Contracts

In this example, we are going to create a `Lottery` contract where player 1 and 2 can both place 1 ETH as a prize pool and then a 3rd manager can tell the contract to determine the winner.

## Lottery Design

An initial take on the contract.

For variables:

1. `manager`: A person who created the contract.
2. `players`: A list of players who have placed bets.

As for functions:

1. `enter`: Enters a player into the lottery.
2. `pickWinner`: Randomly picks a winner and sends them the prize to the winner's address.

## Basic Solidity types

| Name         | Notes                                                          | Examples                                     |
| ------------ | -------------------------------------------------------------- | -------------------------------------------- |
| string       | Sequence of chars                                              | "Hello"                                      |
| bool         | Boolean value                                                  | `true`, `false`                              |
| int          | Integer value                                                  | `1`, `-1`, `0`                               |
| uint         | Unsigned integer value                                         | `1`, `2`, `3` (positive only)                |
| address      | Ethereum address that has methods tied to it for sending money | `0x1234567890123456789012345678901234567890` |
| fixed/ufixed | Fixed point number                                             | `1.0`, `1.1`, `1.2`                          |

## Starting the Lottery Contract

The initial code we wrote for the contract is below.

```sol
pragma solidity ^0.4.17;

contract Lottery {
    address public manager;

    function Lottery() public {
        manager = msg.sender;
    }
}
```

For setting the `manager` part of our contract, we can use the `msg` object to get the sender of the transaction.

Some of the properties that are relevant:

| Arg        | Description                                                           |
| ---------- | --------------------------------------------------------------------- |
| msg.data   | Field from the call or transaction that invoked the current function. |
| msg.gas    | Amount of gas that current function invocation has available.         |
| msg.sender | Address of the account that started the current function invocation.  |
| msg.value  | Amount of ether (in wei) sent with the current function invocation.   |

In Remix, you can deploy the contract and check the `manager` value after deployment (generally to the local VM).

## Overview of arrays

`players` is meant to be an array of addresses.

Since the array is a reference type, we need to be careful about the storage cost.

A table about reference types:

| Name          | Notes                                                                         | Examples                                 |
| ------------- | ----------------------------------------------------------------------------- | ---------------------------------------- |
| fixed array   | Array that contains a single type of unchanging length                        | `int[3] exampleArr = [1, 2, 3]`          |
| dynamic array | Single type in an array that can grow and shrink                              | `int[] exampleArr = [1, 2, 3]`           |
| mapping       | Collection of key-value pairs where you declare type of key and type of value | `mapping(string => string)`              |
| struct        | Collection of key-value pairs that can have different types                   | `struct Person {string name; uint age;}` |

To understand some more on arrays, I deviated from the course and wrote a small contract:

```sol
pragma solidity ^0.4.17;

contract IntArrayExample {
    uint[] public arr;

    function ArrayExample() {
        arr.push(10);
    }

    function getFirstElement() public view returns (uint) {
        return arr[0];
    }

		// You cannot use this for array of arrays or array of structs
		function getArray() public view returns (uint[]) {
			return arr;
		}

    function getLastElement() public view returns (uint) {
        return arr[arr.length - 1];
    }

    function getArrayLength() public view returns (uint) {
        return arr.length;
    }

    function addElement(string memory val) public {
        arr.push(val);
    }

		function removeLastElement() public {
        require(arr.length > 0);
        delete arr[arr.length - 1];
        arr.length--;
    }
}
```

If you deploy the above contract on Remix, you can start playing around with adding the first and getting the last elements.

## Overview of mappings and structs

This won't be used on the Lottery contract, it is just a simple sneak peek.

Note: You cannot get a nested dynamic array in the bridge from the web3 library (as of this project anyway). Strings within Solidity is treated as a nested dynamic array. Therefore, you cannot move an array of strings over to the JavaScript world.

Therefore, you couldn't emulate the `IntArrayExample` contract like you would for strings to get back the entire array. This you could do (no longer getting back the array):

```sol
// With strings you CANNOT get back an array of strings.
contract ArrayExample {
    string[] public arr;

    function ArrayExample() {
        arr.push("Hello");
    }

    function getFirstElement() public view returns (string) {
        return arr[0];
    }

    function getLastElement() public view returns (string) {
        return arr[arr.length - 1];
    }

    function getArrayLength() public view returns (uint) {
        return arr.length;
    }

    function addElement(string memory val) public {
        arr.push(val);
    }

		function removeLastElement() public {
        require(arr.length > 0);
        delete arr[arr.length - 1];
        arr.length--;
    }
}
```

We are now at a sport with understanding that we can implement the `players` property and the start of the `enter` function for our Lottery contract:

```sol
pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    function Lottery() public {
        manager = msg.sender;
    }

    function enter() public payable {
        players.push(msg.sender);
    }
}
```

## Validation with require statements

We can ensure that a user is sending along `.01 ETH` to the contract in order to enter the lottery.

```sol
pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    function Lottery() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether);

        players.push(msg.sender);
    }
}
```

Note: When you get a `VM error: revert`, the require statement failed. There is a gotcha as the failure does not get passed back as a clear message.

In order to understand the execution of the contract better, you will need to use the Remix debugger to get a better idea of how things are running.

## Pseudo Random Number Generator + Sending Ether from Contracts

We created a `private` method `random` to help generate a pseudorandom number, and we will use it to pick a winner.

After picking a window and sending them the winnings, we then want to reset our contract.

```sol
pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    function Lottery() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether);

        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public {
        uint index = random() % players.length;
        // `this` is a reference to this contract
        players[index].transfer(this.balance);
				players = new address[](0); // this creates a brand new dynamic array with an initial size of 0
    }
}
```

## Requiring managers

At the moment, anyone can call the `pickWinner` function. We need to ensure that the `manager` is the only one who can call this function.

This can be done with a `require` statement:

```sol
function pickWinner() public {
		require(msg.sender == manager);
		uint index = random() % players.length;
		// `this` is a reference to this contract
		players[index].transfer(this.balance);
}
```

## Function modifiers

We can abstract that previous `require` statement so that it is called when the function requirement is that it is called by the manager.

```sol
pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

		modifier isManager {
			require(msg.sender == manager);
			_;
		}

    function Lottery() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether);

        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public isManager {
        uint index = random() % players.length;
        // `this` is a reference to this contract
        players[index].transfer(this.balance);
    }
}
```

This new modifier makes a new keyword to ensure that wherever it is used, we check the sender is the manager.

## Returning Players Array

We want to return the players array to the caller.

```sol
function getPlayers() public view returns (address[]) {
	return players;
}
```

## Writing tests for our contract

Initially, we want to check that player can enter the lottery:

```js
const assert = require("assert")
const ganache = require("ganache-cli")
const Web3 = require("web3")
const { interface, bytecode } = require("../compile")

// Create the instance of web3 and tells us to connect to our test network
const web3 = new Web3(ganache.provider())

let accounts
let lottery

describe("Lottery contract", () => {
  beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts()

    // Use one of those accounts to deploy contract
    lottery = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({
        data: bytecode,
      })
      .send({
        // Use the first account
        from: accounts[0],
        gas: "1000000",
      })
  })

  it("deploys a contract", () => {
    // assert the deployment was successful and there is an address
    assert.ok(lottery.options.address)
  })

  it("player can enter the lottery", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.02", "ether"),
    })

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0],
    })

    assert.equal(accounts[0], players[0])
    assert.equal(1, players.length)
  })
})
```

Once that is done, we want to know check that multiple accounts can enter.

```js
it("multiple players can enter the lottery", async () => {
  await Promise.all([
    lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.02", "ether"),
    }),
    lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei("0.02", "ether"),
    }),
    lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei("0.02", "ether"),
    }),
  ])

  const players = await lottery.methods.getPlayers().call({
    from: accounts[0],
  })

  assert.equal(accounts[0], players[0])
  assert.equal(accounts[1], players[1])
  assert.equal(accounts[2], players[2])
  assert.equal(3, players.length)
})
```

Next, we need to run a test to check the `try-catch` example:

```js
it("requires a minimum amount to enter", async () => {
  try {
    await lottery.methods.enter().send({
      from: accounts[1],
      // This is not enough to enter
      value: web3.utils.toWei("0.009", "ether"),
    })
    assert(false)
  } catch (err) {
    assert(err)
  }
})
```

Finally, we should test the function modifier to ensure that the manager can only call the `pickWinner` function:

```js
it("sends money to the winner", async () => {
  await lottery.methods.enter().send({
    from: accounts[1],
    value: web3.utils.toWei("2", "ether"),
  })
  const initialBalance = await web3.eth.getBalance(accounts[1])

  await lottery.methods.pickWinner().send({
    from: accounts[0],
  })

  const finalBalance = await web3.eth.getBalance(accounts[1])

  const difference = finalBalance - initialBalance

  assert(difference > web3.utils.toWei("1.8", "ether"))
})
```

That is it for the section, but it is worth noting that you should also ensure that the balance for the contract goes back to zero and that the players are also cleared out after picking a winner.
