# 2: Smart Contracts with Solidity

## Contract deployment

At this stage, we take the contract out of Remix and we can deploy it to a network.

There is a minor section talking about Truffle. Truffle is like a one-stop shop for deploying contracts.

> Note: Truffle is undergoing rapid development and is constantly changing. Some things don't work well, others don't work well at all.

We are going to do a lot of manual work to create a custom node project that does the following:

1. Contract creation.
2. Local testing.
3. Deployment to the Rinkeby network.

All of this is so we can understand the processes of these other libraries and tools out there that do this sort of thing.

Things that we need to be able to do:

1. Need to be able to write Solidity code in a JavaScript project. Solution: set up Solidity compiler.
2. Need some way to rapidly test contracts without doing the manual testing we were doing in Remix. Solution: set up a custom Mocha test runner that can somehow test Solidity code.
3. Need some way to deploy our contract to public networks? Set up a deploy script to compile + deploy our contract.

## Creating a custom node project

The project itself has the following layout:

```s
.
├── compile.js
├── contracts
│   └── Inbox.sol
├── deploy.js
├── package-lock.json
├── package.json
└── test
    └── Inbox.test.js
```

This example relies on a few packages:

```s
solc
web3
mocha
ganache-cli
@truffle/hdwallet-provider
```

We then edit the `compile.js` to read the Inbox contract and compile it for us.

```js
// compile code will go here
const path = require("path")
const fs = require("fs")
const solc = require("solc")

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol")
const source = fs.readFileSync(inboxPath, "utf8")

module.exports = solc.compile(source, 1).contracts[":Inbox"]
```

The `solc.compile` is built to handle multiple contracts. The `compile` function returns an object with the compiled code within the key `contracts`. Log it out to learn more.

## Testing

After compiling the bytecode, we want to deploy a test version of our contract instance to a test network. We will be using Ganache (formerly TestRPC) to do this.

The test code (not including a test for deploying the contract) looks like so:

```js
// contract test code will go here
const assert = require("assert")
const ganache = require("ganache-cli")
const Web3 = require("web3")
const { interface, bytecode } = require("../compile")

// Create the instance of web3 and tells us to connect to our test network
const web3 = new Web3(ganache.provider())

let accounts
let inbox

describe("Inbox contract", () => {
  beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts()

    // Use one of those accounts to deploy contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({
        data: bytecode,
        // The arguments expected for the initial constructor
        arguments: ["Hi there!"],
      })
      .send({
        // Use the first account
        from: accounts[0],
        gas: "1000000",
      })
  })

  it("deploys a contract", () => {
    // assert the deployment was successful and there is an address
    assert.ok(inbox.options.address)
  })

  it("has a default message", async () => {
    // Get the current value of the message
    const message = await inbox.methods.message().call()
    assert.equal(message, "Hi there!")
  })

  it("can modify the message", async () => {
    await inbox.methods.setMessage("Bye!").send({
      from: accounts[0],
    })

    // Get the new value of the message
    const message = await inbox.methods.message().call()
    assert.equal(message, "Bye!")
  })
})
```

## Deployment with Infura

We wrote a script to deploy to Infura (after creating an account):

```js
// deploy code will go here
require("dotenv").config()
const HDWalletProvider = require("@truffle/hdwallet-provider")
const Web3 = require("web3")
const { interface, bytecode } = require("./compile")

const provider = new HDWalletProvider(
  // Add in the mnemonic
  process.env.METAMASK_PHRASE,
  // Add in the Infura endpoint
  process.env.INFURA_URL
)

const web3 = new Web3(provider)

async function main() {
  const [deploymentAccount] = await web3.eth.getAccounts()

  console.log("Deploying from account", deploymentAccount)

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hi there!"],
    })
    .send({
      gas: "1000000",
      from: deploymentAccount,
    })

  console.log("Contract deployed to:", result.options.address)
  process.exit()
}

main()
```

After the deployment, we can actually use Etherscan.io to check the [Rinkeby network](https://rinkeby.etherscan.io/) for a deployment made by our address.

The example we are using, you can see the results on [this page](https://rinkeby.etherscan.io/address/0x19D8200c7E68326131971127998Dd3D41Ed53cC1).

## Interacting with your contract straight away with Remix

Remix can also be used to interact and deploy with contracts on the network.

We can update our environment to be `Injected Web3` which in turn can use our Metamask account.

## End of section notes

Note that the `solc` used in this example is an old version. There are instructions on how to create a new project entirely [here](https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/learn/lecture/28943812#overview).
