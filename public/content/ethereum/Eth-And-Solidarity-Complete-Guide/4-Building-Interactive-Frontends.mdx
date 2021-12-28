# 4: Ethereum App Architecture

This work continues on from Section 3 where we have implemented a simple contract for a Lottery and wrote tests.

The app itself comes from a boiler plate which runs off `npx create-react-app`.

## Multiple Web3 Instances

One of the big gotchas that came up: when Metamask is working in the background, it automatically injects `web3` into any web page.

Metamask ALWAYS inject `web3` into the page, so we need to ensure that we are always using our version of `web3`. What we want to do, is take the "provider" that comes from the Metamask injected version and use it with ours.

We only need to write one line of code to make sure this works.

> We are also always going to assume that Metamask is always installed.

## Web3 Setup

First, we wrote a helper file for setting up the web3 provider.

```js
import Web3 from "web3"

window.ethereum.request({ method: "eth_requestAccounts" })

const web3 = new Web3(window.ethereum)

export default web3
```

To use this helper, we need to import it into our application code. The Metamask popup will just show up once we load the page.

## Deploying the Contract

First, we need to deploy the contract, then we need to tell our web3 instance where the contract is.

Once deployed, we need to create a Contract ABI instance which we do in a `lottery.js` file:

```js
import web3 from "./web3"

const address = "0x2E1cfF7623C318D383B99462df19319789989fBf"
const abi = [
  {
    constant: true,
    inputs: [],
    name: "manager",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "pickWinner",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getPlayers",
    outputs: [{ name: "", type: "address[]" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "enter",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "", type: "uint256" }],
    name: "players",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
]

export default new web3.eth.Contract(abi, address)
```

## Rendering Contract Data

In order to render the data, we essentially need to load the manager address and we will display it to the screen as a first example:

```js
import "./App.css"
import React from "react"
import lottery from "./lottery"

const App = () => {
  const [manager, setManager] = React.useState("")

  React.useEffect(() => {
    async function run() {
      const manager = await lottery.methods.manager().call()
      setManager(manager)
    }

    run()
  }, [setManager])

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This contract is managed by {manager}</p>
    </div>
  )
}
export default App
```

## Accessing more properties

At this stage, we now want to show how many people have entered and the balance of the lottery.

We end up with the following code:

```js
import "./App.css"
import React from "react"
import web3 from "./web3"
import lottery from "./lottery"

const App = () => {
  const [manager, setManager] = React.useState("")
  const [players, setPlayers] = React.useState([])
  const [balance, setBalance] = React.useState("")

  React.useEffect(() => {
    async function run() {
      const [manager, players, balance] = Promise.allSettled([
        lottery.methods.manager().call(),
        lottery.methods.getPlayers().call(),
        web3.eth.getBalance(lottery.options.address),
      ])

      setManager(manager)
      setPlayers(players)
      setBalance(balance)
    }

    run()
  }, [setManager, setBalance, setPlayers])

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This contract is managed by {manager}</p>
      <p>
        There are currently {players.length} people entered, competing to win{" "}
        {web3.utils.fromWei(balance, "ether")} ETH
      </p>
    </div>
  )
}
export default App
```

## Enabling the capability to enter

We basically then add our form and make use of our lottery methods.

```js
import "./App.css"
import React from "react"
import web3 from "./web3"
import lottery from "./lottery"

const App = () => {
  const [manager, setManager] = React.useState("")
  const [players, setPlayers] = React.useState([])
  const [balance, setBalance] = React.useState("")
  const [value, setValue] = React.useState("")
  const [message, setMessage] = React.useState("")

  React.useEffect(() => {
    async function run() {
      const [manager, players, balance] = await Promise.all([
        lottery.methods.manager().call(),
        lottery.methods.getPlayers().call(),
        web3.eth.getBalance(lottery.options.address),
      ])

      setManager(manager)
      setPlayers(players)
      setBalance(balance)
    }

    run()
  }, [setManager, setBalance, setPlayers])

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault()
      setMessage("Waiting on entry")

      const accounts = await web3.eth.getAccounts()

      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether"),
      })

      setValue("")
      setMessage("You have been entered!")
      setPlayers([...players, accounts[0]])
      setBalance(balance + value)
    },
    [value, setValue, setMessage, setPlayers, players, balance, setBalance]
  )

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This contract is managed by {manager}</p>
      <p>
        There are currently {players.length} people entered, competing to win{" "}
        {web3.utils.fromWei(balance, "ether")} ETH
      </p>
      <hr />
      <form onSubmit={handleSubmit}>
        <h3>Want to try your luck?</h3>
        <div>
          <label>Amount of ether to enter</label>
          <input type="text" onChange={(e) => setValue(e.target.value)} />
        </div>
        <button type="submit">Enter</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default App
```

At this stage, we are just optimistically updating the value of the balance and the players array.

You could some extra work at this stage in order to make sure that the user has enough ether to enter.

## Picking a winner

We are going to create a very contrived version of this contract to enter where everyone can see our "pick winner" button.

```js
import "./App.css"
import React from "react"
import web3 from "./web3"
import lottery from "./lottery"

const App = () => {
  const [manager, setManager] = React.useState("")
  const [players, setPlayers] = React.useState([])
  const [balance, setBalance] = React.useState("")
  const [value, setValue] = React.useState("")
  const [message, setMessage] = React.useState("")

  React.useEffect(() => {
    async function run() {
      const [manager, players, balance] = await Promise.all([
        lottery.methods.manager().call(),
        lottery.methods.getPlayers().call(),
        web3.eth.getBalance(lottery.options.address),
      ])

      setManager(manager)
      setPlayers(players)
      setBalance(balance)
    }

    run()
  }, [setManager, setBalance, setPlayers])

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault()
      setMessage("Waiting on entry")

      const accounts = await web3.eth.getAccounts()

      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether"),
      })

      setValue("")
      setMessage("You have been entered!")
      setPlayers([...players, accounts[0]])
      setBalance(balance + value)
    },
    [value, setValue, setMessage, setPlayers, players, balance, setBalance]
  )

  const handleWinner = React.useCallback(
    async (event) => {
      event.preventDefault()
      setMessage("Waiting on picking a winner")

      const accounts = await web3.eth.getAccounts()

      await lottery.methods.pickWinner().send({
        from: accounts[0],
      })

      setMessage("Winner has been picked!")
      setPlayers([])
      setBalance(0)
    },
    [setBalance, setMessage, setPlayers]
  )

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This contract is managed by {manager}</p>
      <p>
        There are currently {players.length} people entered, competing to win{" "}
        {web3.utils.fromWei(balance, "ether")} ETH
      </p>
      <hr />
      <form onSubmit={handleSubmit}>
        <h3>Want to try your luck?</h3>
        <div>
          <label>Amount of ether to enter</label>
          <input type="text" onChange={(e) => setValue(e.target.value)} />
        </div>
        <button type="submit">Enter</button>
      </form>
      <h3>Ready to pick a winner?</h3>
      <button onClick={handleWinner}>Pick a winner!</button>
      {message && <p>{message}</p>}
    </div>
  )
}
export default App
```
