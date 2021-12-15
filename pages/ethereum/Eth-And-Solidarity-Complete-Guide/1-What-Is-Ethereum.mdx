---
name: Intro
menu: Ethereum
---

# Udemy ETH Course

## Short History

- Oct 31, 2008: BTC White paper describing system that could pay each other directly without need of central authority.
- Dec, 2013: - ETH White paper for need for more programmatic control over transactions - Wanted to enabled creation of decentralized austonomous corporations (DAC) - Introduces the idea of "Smart Contracts" as an entity that can send and recieve currency, beyond just humans - The "Smart Contract" lives within the Ethereum blockchain

### So what is ETH?

**Primitive description:**

- ETH networks are networks of computers that are used to transfer money and store data
- Different ETH networks. There is one main ETH network, however there are many other networks like testing (or creating a private ETH network).
- Networks are formed by one or more nodes.
- Each node is a machine running an ETH client.
- Anyone can run a node.
- Each node can contain a full copy of the blockchain.
- The 'blockchain' is a database that stores record of every transaction that has taken place.

You can also create your own private ETH network for testing etc. There is not just one network; there are many.

## Interfacing with ETH networks

Some of the common ways:

**Dev Tech:**

- [web3.js](https://github.com/ChainSafe/web3.js) (our "portal" to the ETH network)
- [Ethereum.js](https://docs.ethers.io/v5/)

**Consumers:**

- Metamask (Chrome extension to interact)
- Mist Browser (Full feature web browser)

### Metamask Extension

- Test contracts will be done on Rinkeby Test Network

## ETH Accounts

Metamask creates an account address, public key and private key.

- Address: a unique ID to identify an account. You can think of it as a username.
- Public key: shareable key on the network.
- Private key: private key to sign transactions.

The public key and private key are used to authorize transactions.

All values are provided as a hexidecimal string.

Some of the big accounts out there (including the test accounts) to remember:

1. Main.
2. Ropsten.
3. Kovan.
4. Rinkeby.

With Metamask, the same account can be used on multiple networks.

## Recieving ETH

There is a note about the "receiving" of ETH from the [faucet](https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/learn/lecture/25992414#overview) if you receive an **Insufficient funds** error.

If you run into an issue, you can send funds from this [faucet](https://faucets.chain.link/rinkeby).

We can use the `faucet` from this [website](https://rinkeby-faucet.com/).

When you make a transaction, you can find the transaction details on Etherscan like [this test transaction](https://rinkeby.etherscan.io/tx/0x93e99f4150b5cb273f6e693af8d42067d2e331bf6afce5f708ac949649b6e14b).

## What is a transaction?

`web3.js` can be used for any network, so when you send money (at least from the demo site) we send a transaction.

Think of a transaction as a record that describes one account attempting to send money to another account.

A `transaction` is created whenever someone is trying to send money to another account.

Some of the properties of a transaction:

- `nonce`: the number of transactions sent from the sender account.
- `gasPrice`: the price of gas in Ether that sender is willing to pay for the transaction to process.
- `gasLimit`: the maximum amount of gas that can be used to complete the transaction.
- `to`: the address of the recipient.
- `value`: the amount of ether to send to the target address.
- `v`, `r`, `s`: cryptographic pieces of data that ca be used to generate the senders account address (generated from sender's private key). Extremely complex pieces of data.

## Why do you wait for a transaction to complete?

When we send a transaction, we send it to one specific node that will in turn communicate with the rest of the network.

Once there, there node has an entire copy of the blockchain.

At the same time we submit, there are also other transactions being submitted.

The node will take all those transactions and assembles them into one list of transactions (known as a `block`).

The node then runs some **validation logic** on the block which is what takes so long for us to get the response.

What is the validation logic? That is the **mining**. The process of mining is complicated, but when will dive into that next.

## Basic blockchains

The following is visually aided by the website [Blockchain Demo](https://andersbrownworth.com/blockchain/).

### Hash

We start with a web demonstrated of a SHA256 hash. A `hash` is a "digital fingerprint" of some particular data.

### Block

When we get to the `block`, we essentially combine the data, the block number and the nonce to generate the hash.

To get a valid or `signed` block, we need a `nonce` which is a number that can be set to ensure that our hash started with four zeroes (four zeroes comes from the example).

The process of trying to iterate until we find a valid hash is called **mining** where we try to find a hash that satisfies our signed hash requirement.

### Blockchain

The demonstration of a [blockchain](https://andersbrownworth.com/blockchain/blockchain) is a **chain** of blocks that have a reference to the previous block.

In the demonstration, as you edit one of the blocks, you will see that is invalidates all the following blocks. You would need to re-mine all the blocks on the chain to fix an entire chain.

The more blocks in the past you are, the more difficult it is to change and that is what makes the blockchain resistance to chain.

> Note: the first block is called the `genesis block`.

### Distributed blockchain

In this [demo](https://andersbrownworth.com/blockchain/distributed), we have a number of peers that all have the same copy of the blockchain.

If one peer is changed and we re-mine all the broken blocks, the other peers will argue and invalidate the peer with the incorrect chain by comparing hashes on the distributed network.

At the moment, our blockchain doesn't really mean anything. That's where tokens come in.

### Tokens

The [tokens demo](https://andersbrownworth.com/blockchain/tokens) has a `tx` transactions section.

Since the blockchain is resistant to change, we can see modified transactions will invalidate the following blocks on that peer.

### Coinbase

The final demo is for [coinbase](https://andersbrownworth.com/blockchain/coinbase) which gives an overview of transactions validating that there is money to give.

## Block Time

The video that we just covered is for a generic blockchain, so there is some differences for Ethereum.

Earlier we spoke about the address, public and private key. The hash themselves for a block is also a hexidecimal number.

The example spoke about mining for find a hash that started with four zeroes which is not entirely correct. What we are looking for is a **hash that is below a particular value** based on our target algorithm.

We are not necessarily looking for a specific number of zeroes but an entirely value that is below the target value.

The "proof of work" algorithm is kind of like rolling a dice until you end up with a number that totals less than the target value.

The `target value` that we are looking for is adjusted over time. The target number will change based on how long the previous block took to mine and there is generally a requirement for our `target block time` or how long it takes to calculate a block.

> The number of nodes calculating these hashes is always in flux, so the difficulty always needs to be changed.

You can see the average time to calculate the blocks found [here](https://etherscan.io/chart/blocktime).

## Smart Contracts

This will dominate the rest of the course. They are how we can build interesting applications on the blockchain.

You can think of a smart contract as "an account controlled by code". This is code that a developer authors and instructs the contract on how to behave.

Some properties of a `Contract Account`:

| Field   | Description                                                                                    |
| ------- | ---------------------------------------------------------------------------------------------- |
| balance | Amount of ETH this account owns.                                                               |
| storage | Data storage for this contract. Any data relevant for the contract that we are trying to make. |
| code    | Raw machine code for this contract.                                                            |

An "external account" is any account that is decoupled from an individual network.

On the other-hand, these "contract accounts" are ONLY created on e one specific network.

Over the course, we will author the contract source and then deploy that contract code to a Network like Rinkeby.

We can think of the relationship very similar to a class relationship to an instance. The source code we write operates as a "Class" of sorts, then we create copies or "instances" of those contracts by deploying them to a network.

## Solidity Programming Language

Solidity was invented specifically for authoring smart contracts.

Solidity is referenced as similar to JavaScript (which is questionable).

There are a couple of huge, gigantic "gotchas".

The contracts that you write end up being quite small in the end.

### Solidity compiler

After writing our Contract Definition (Solidity), we can compile it with the Solidity compiler and we get our two things:

1. Byte code ready for deployment.
2. Application Binary Interface (ABI) which is a JSON file that describes the contract. We need the ABI to do some translation for us.

## The first Solidity contract

We will use an online IDE [Remix](https://remix.ethereum.org/) to write our contract in this example.

```sol
pragma solidity ^0.4.17;

contract Inbox {
    string public message;

    function Inbox(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }

    function getMessage() public view returns (string) {
        return message;
    }
}
```

Here we did the following:

- We added a pragma to the top of the file to define what version of Solidity we are using.
- We declared the contract `Inbox`.
- We set the properties with accessors.
- We added some functions to help with setting and getting messages.
- The function with the same name as the contract is the constructor which is invoked automatically when we deploy the contract.

## Function declarations

Some common function types:

| Type     | Description                                                        |
| -------- | ------------------------------------------------------------------ |
| public   | Anyone can call this function                                      |
| private  | Only this contract can call this function                          |
| view     | This function returns data and does not modify the contract's data |
| constant | Same as view - view is the more likely term you will see           |
| pure     | Function will not modify or even read the contract's data          |
| payable  | When someone calls this function they might send ether along       |

> Note: you cannot return data from a function that modifies the contract's data.

## Deploying Contracts in Remix + Testing with Remix

There are some notes on the new Remix UI for [deploying contracts](https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/learn/lecture/26139654#overview).

With Remix, when the contract source is compiled and deployed, it is deployed to an "In-Browser Fake Network". Behind the scenes, Remix also contains a tiny fake Ethereum network.

As you deploy a contract, you can also see some contract settings.

There will be a dropdown for selecting an Inbox that you want to deploy, and also some inputs for the constructor function.

When you click the "Deploy" button, you will see the deploy contracts an ability to start interacting with the contract with the functions we wrote in our first contract (`setMessage` and `getMessage`).

The first "gotcha" to point out is that whenever you define a storage variable with the `public` modifier, then it will automatically create a "getter" function for you.

## Behind the scenes of deployment

What happens on the ETH network when we deploy an instance of the contract?

When you create a new contract, it is similar to the transfer of money between two parties with a couple differences:

1. An external account will create a contract transaction.
2. There is no `to` field in the transaction. When we leave it blank, the network assumes that we are trying to create a contract transaction.
3. There is a `data` property that contains the compiled bytecode of the contract.
4. If you add a `value` property, we can send that contract a initial set of money that it can play around with.

## More on running functions that you want to know

A deployed contract needs to be store in the blockchain. Anytime you want to update data on the blockchain, you need to submit a transaction.

That means that we also need to work through that "proof of work" process.

There are two ways that we invoke functions that belong to our contracts:

| "Calling" a function          | Sending a transaction to a function |
| ----------------------------- | ----------------------------------- |
| Cannot modify contract's data | Can modify contract's data          |
| Can return data               | Takes time to execute               |
| Runs instantly                | Returns the transaction hash        |
| Free to do                    | Costs money                         |

The above table relates to the `call` and `send` functionality that we get with using the `web3` library (or similar).

> Note: on the test network like the JavaScript VM, the block time is essentially instantaneous (and not 15 - 30 seconds). We can use test networks like Rinkby so we can emulate the real delay-time for writing a block.

## Wei vs Ether

It costs some amount of ether to send a transaction to a function.

When we look at value for gas and we see `wei`, `gwei`, `finney` and `ether`, they are ALL measurements of the same thing. They are just a different unit of measurement.

It is best to think of `1 Dollar = 100 Cents` to think of the comparison of the ETH units. **1 Ether == 1,000,000,000,000,000,000 Wei == 1,000,000,000 Gwei == 1,000 Finney**.

There are several tools online to help with the conversion like [this one](https://eth-converter.com/).

## Gas and Transactions

The "gas" system is meant to measure how much work we are doing with our code. This parallel's the idea of the paying AWS to use their resources. We pay **gas** to the network to execute our code.

In the code example, there is a function in a contract to exemplify the cost:

```sol
function doMath(uint a, uint b) public {
	a + b;
	a - b;
	a * b;
	a == b;
}
```

So how much gas does it take to execute this function? There is a [public spreadsheet](https://docs.google.com/spreadsheets/d/1n6mRqkBz3iWcOlRem_mO09GtSKEKrAsfO7Frgx18pNU/edit#gid=0) that will have a few basic operations and tell you how much gas it takes to execute them.

We have to specify two properties for the transaction:

- `gasPrice`: Amount of wei the sender is willing to pay per unit to get this transaction processed.
- `gasLimit`: Units of gas that this transaction can consume.

> Note: it is important to know the difference between the wei per unit of gas and the gas limit of how much gas we are willing to spend.

You would think that we always know how much gas it is going to cost us thanks to that spreadsheet, but there is actually a lot of code that we do not know at runtime to calculate how much gas is consume (think a `for-loop`).

If you attempt to send a transaction which requires more gas than you provide, then the execution of our function immediately halts and no other code is run.

If we provide enough, then we get a return of the gas that is not spent.

## Mnemonic Phrases

This section starts with talking about multiple accounts. The example speaks to the idea that we may have 3 Metamask accounts to handle `Spending money`, `Savings` and `Business`.

For each of those accounts, you need to ensure you have stored all of the information for the account, public key and private key.

To solve this issue, ETH have created the idea of a 12-word mnemonic phrase. Although these are random words, they are controlling our accounts.

Rather than remembering all of the keys. you can remember the mnemonic.

To understand how the mnemonic phrase works, there is a [website](https://iancoleman.io/bip39) to help demonstrate. You can either generate a new one or paste yours in.

Once you add in the mnemonic phrase, you can use it to generate a series of accounts. This can actually map directly what Metamask uses.
