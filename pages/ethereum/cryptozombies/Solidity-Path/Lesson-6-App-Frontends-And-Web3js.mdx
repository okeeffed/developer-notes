# Lesson 6: App Front-ends & Web3.js

## Intro to web3.js

Remember, the Ethereum network is made up of nodes, with each containing a copy of the blockchain. When you want to call a function on a smart contract, you need to query one of these nodes and tell it:

1. The address of the smart contract
2. The function you want to call, and
3. The variables you want to pass to that function.

Ethereum nodes only speak a language called `JSON-RPC`, which isn't very human-readable. A query to tell the node you want to call a function on a contract looks something like this:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_sendTransaction",
  "params": [
    {
      "from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
      "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
      "gas": "0x76c0",
      "gasPrice": "0x9184e72a000",
      "value": "0x9184e72a",
      "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
    }
  ],
  "id": 1
}
```

Luckily, Web3.js hides these nasty queries below the surface, so you only need to interact with a convenient and easily readable JavaScript interface.

Calling a func in your JS code will end up looking something like this:

```js
CryptoZombies.methods
  .createRandomZombie("Vitalik Nakamoto 🤔")
  .send({ from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155", gas: "3000000" })
```

## Web3 Providers

Now that we have Web3.js in our project, let's get it initialized and talking to the blockchain.

The first thing we need is a `Web3 Provider`.

Remember, Ethereum is made up of nodes that all share a copy of the same data. Setting a Web3 Provider in Web3.js tells our code which node we should be talking to handle our reads and writes. It's kind of like setting the URL of the remote web server for your API calls in a traditional web app.

You could host your own Ethereum node as a provider. However, there's a third-party service that makes your life easier so you don't need to maintain your own Ethereum node in order to provide a DApp for your users — [Infura](https://infura.io/).

## Infura

Infura is a service that maintains a set of Ethereum nodes with a caching layer for fast reads, which you can access for free through their API. Using Infura as a provider, you can reliably send and receive messages to/from the Ethereum blockchain without needing to set up and maintain your own node.

You can set up Web3 to use Infura as your web3 provider as follows:

```js
var web3 = new Web3(
  new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws")
)
```

However, since our DApp is going to be used by many users — and these users are going to **WRITE** to the blockchain and not just read from it — we'll need a way for these users to sign transactions with their private key.

Cryptography is complicated, so unless you're a security expert and you really know what you're doing, it's probably not a good idea to try to manage users' private keys yourself in our app's front-end.

But luckily you don't need to — there are already services that handle this for you. The most popular of these is [Metamask](https://metamask.io/).

## Metamask

`Metamask` is a browser extension for Chrome and Firefox that lets users securely manage their Ethereum accounts and private keys, and use these accounts to interact with websites that are using Web3.js. (If you haven't used it before, you'll definitely want to go and install it — then your browser is Web3 enabled, and you can now interact with any website that communicates with the Ethereum blockchain!).

And as a developer, if you want users to interact with your DApp through a website in their web browser (like we're doing with our CryptoZombies game), you'll definitely want to make it Metamask-compatible.

> Note: Metamask uses Infura's servers under the hood as a web3 provider, just like we did above — but it also gives the user the option to choose their own web3 provider. So by using Metamask's web3 provider, you're giving the user a choice, and it's one less thing you have to worry about in your app.

## Using Metamask's web3 provider

Metamask injects their web3 provider into the browser in the global JavaScript object web3. So your app can check to see if web3 exists, and if it does use web3.currentProvider as its provider.

Here's some template code provided by Metamask for how we can detect to see if the user has Metamask installed, and if not tell them they'll need to install it to use our app:

```js
window.addEventListener("load", function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== "undefined") {
    // Use Mist/MetaMask's provider
    web3js = new Web3(web3.currentProvider)
  } else {
    // Handle the case where the user doesn't have web3. Probably
    // show them a message telling them to install Metamask in
    // order to use our app.
  }

  // Now you can start your app & access web3js freely:
  startApp()
})
```

## Talking to contracts

Web3.js will need 2 things to talk to your contract: its `address` and its `ABI`.

## Contract Address

After you finish writing your smart contract, you will compile it and deploy it to Ethereum. We're going to cover deployment in the next lesson, but since that's quite a different process from writing code, we've decided to go out of order and cover Web3.js first.

After you deploy your contract, it gets a fixed address on Ethereum where it will live forever. If you recall from Lesson 2, the address of the CryptoKitties contract on Ethereum mainnet is `0x06012c8cf97BEaD5deAe237070F9587f8E7A266d`.

You'll need to copy this address after deploying in order to talk to your smart contract.

## Contract ABI

The other thing Web3.js will need to talk to your contract is its ABI.

ABI stands for Application Binary Interface. Basically it's a representation of your contracts' methods in JSON format that tells Web3.js how to format function calls in a way your contract will understand.

When you compile your contract to deploy to Ethereum (which we'll cover in Lesson 7), the Solidity compiler will give you the ABI, so you'll need to copy and save this in addition to the contract address.

Since we haven't covered deployment yet, for this lesson we've compiled the ABI for you and put it in a file named `cryptozombies_abi.js`, stored in variable called cryptoZombiesABI.

If we include `cryptozombies_abi.js` in our project, we'll be able to access the CryptoZombies ABI using that variable.

## Instantiating a Web3.js Contract

Once you have both the contract address and ABI, you can instantiate a Web3.js contract.

```js
// Instantiate myContract
var myContract = new web3js.eth.Contract(myABI, myContractAddress)
```

The example code in HTML with inline JS:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>CryptoZombies front-end</title>
    <script
      language="javascript"
      type="text/javascript"
      src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"
    ></script>
    <script
      language="javascript"
      type="text/javascript"
      src="web3.min.js"
    ></script>
    <script
      language="javascript"
      type="text/javascript"
      src="cryptozombies_abi.js"
    ></script>
  </head>
  <body>
    <script>
      var cryptoZombies

      function startApp() {
        var cryptoZombiesAddress = "YOUR_CONTRACT_ADDRESS"
        cryptoZombies = new web3js.eth.Contract(
          cryptoZombiesABI,
          cryptoZombiesAddress
        )
      }

      window.addEventListener("load", function () {
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof web3 !== "undefined") {
          // Use Mist/MetaMask's provider
          web3js = new Web3(web3.currentProvider)
        } else {
          // Handle the case where the user doesn't have Metamask installed
          // Probably show them a message prompting them to install Metamask
        }

        // Now you can start your app & access web3 freely:
        startApp()
      })
    </script>
  </body>
</html>
```

## Calling contract functions

Web3.js has two methods we will use to call functions on our contract: `call` and `send`.

### Call

`call` is used for `view` and `pure` functions. It only runs on the local node, and won't create a transaction on the blockchain.

Review: `view` and `pure` functions are read-only and don't change state on the blockchain. They also don't cost any gas, and the user won't be prompted to sign a transaction with MetaMask.

Using Web3.js, you would call a function named `myMethod` with the parameter `123` as follows:

```js
myContract.methods.myMethod(123).call()
```

### Send

`send` will create a transaction and change data on the blockchain. You'll need to use `send` for any functions that aren't `view` or `pure`.

Note: sending a transaction will require the user to pay gas, and will pop up their Metamask to prompt them to sign a transaction. When we use Metamask as our web3 provider, this all happens automatically when we call `send()`, and we don't need to do anything special in our code. Pretty cool!

Using Web3.js, you would send a transaction calling a function named `myMethod` with the parameter `123` as follows:

```js
myContract.methods.myMethod(123).send()
```

The syntax is almost identical to call().

## Getting Zombie data

Recall we have...

```sol
Zombie[] public zombies;
```

In Solidity, when you declare a variable public, it automatically creates a public "getter" function with the same name. So if you wanted to look up the zombie with id 15, you would call it as if it were a function: zombies(15).

```js
function getZombieDetails(id) {
  return cryptoZombies.methods.zombies(id).call()
}

// Call the function and do something with the result:
getZombieDetails(15).then(function (result) {
  console.log("Zombie 15: " + JSON.stringify(result))
})
```

The `result` variable will be an object with the following properties (as an example):

```json
{
  "name": "H4XF13LD MORRIS'S COOLER OLDER BROTHER",
  "dna": "1337133713371337",
  "level": "9999",
  "readyTime": "1522498671",
  "winCount": "999999999",
  "lossCount": "0" // Obviously.
}
```

## Calling contract methods

In our example, we added some helper functions to get back some data from our contract:

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>CryptoZombies front-end</title>
    <script language="javascript" type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script language="javascript" type="text/javascript" src="web3.min.js"></script>
    <script language="javascript" type="text/javascript" src="cryptozombies_abi.js"></script>
  </head>
  <body>

    <script>
      var cryptoZombies;

      function startApp() {
        var cryptoZombiesAddress = "YOUR_CONTRACT_ADDRESS";
        cryptoZombies = new web3js.eth.Contract(cryptoZombiesABI, cryptoZombiesAddress);
      }

      function getZombieDetails(id) {
        return cryptoZombies.methods.zombies(id).call()
      }

      function zombieToOwner(id) {
        return cryptoZombies.methods.zombieToOwner(id).call()
      }

      function getZombiesByOwner(owner) {
        return cryptoZombies.methods.getZombiesByOwner(owner).call()
      }

      window.addEventListener('load', function() {

        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof web3 !== 'undefined') {
          // Use Mist/MetaMask's provider
          web3js = new Web3(web3.currentProvider);
        } else {
          // Handle the case where the user doesn't have Metamask installed
          // Probably show them a message prompting them to install Metamask
        }

        // Now you can start your app & access web3 freely:
        startApp()

      })
    </script>
  </body>
</html>
```

## Metamask and accounts

MetaMask allows the user to manage multiple accounts in their extension.

We can see which account is currently active on the injected web3 variable via:

```js
var userAccount = web3.eth.accounts[0]
```

Because the user can switch the active account at any time in MetaMask, our app needs to monitor this variable to see if it has changed and update the UI accordingly. For example, if the user's homepage displays their zombie army, when they change their account in MetaMask, we'll want to update the page to show the zombie army for the new account they've selected.

We can do that with a setInterval loop as follows:

```js
var accountInterval = setInterval(function () {
  // Check if account has changed
  if (web3.eth.accounts[0] !== userAccount) {
    userAccount = web3.eth.accounts[0]
    // Call some function to update the UI with the new account
    updateInterface()
  }
}, 100)
```

The code challenge was to implement this interval checker:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>CryptoZombies front-end</title>
    <script
      language="javascript"
      type="text/javascript"
      src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"
    ></script>
    <script
      language="javascript"
      type="text/javascript"
      src="web3.min.js"
    ></script>
    <script
      language="javascript"
      type="text/javascript"
      src="cryptozombies_abi.js"
    ></script>
  </head>
  <body>
    <script>
      var cryptoZombies
      var userAccount

      function startApp() {
        var cryptoZombiesAddress = "YOUR_CONTRACT_ADDRESS"
        cryptoZombies = new web3js.eth.Contract(
          cryptoZombiesABI,
          cryptoZombiesAddress
        )

        var accountInterval = setInterval(function () {
          // Check if account has changed
          if (web3.eth.accounts[0] !== userAccount) {
            userAccount = web3.eth.accounts[0]
            // Call some function to update the UI with the new account
            getZombiesByOwner(userAccount).then(displayZombies)
          }
        }, 100)
      }

      function getZombieDetails(id) {
        return cryptoZombies.methods.zombies(id).call()
      }

      function zombieToOwner(id) {
        return cryptoZombies.methods.zombieToOwner(id).call()
      }

      function getZombiesByOwner(owner) {
        return cryptoZombies.methods.getZombiesByOwner(owner).call()
      }

      window.addEventListener("load", function () {
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof web3 !== "undefined") {
          // Use Mist/MetaMask's provider
          web3js = new Web3(web3.currentProvider)
        } else {
          // Handle the case where the user doesn't have Metamask installed
          // Probably show them a message prompting them to install Metamask
        }

        // Now you can start your app & access web3 freely:
        startApp()
      })
    </script>
  </body>
</html>
```

## Sending transactions

For our `send` function, there are a few major differences from call functions:

1. Sending a transaction requires a from address of who's calling the function (which becomes `msg.sender` in your Solidity code). We'll want this to be the user of our DApp, so MetaMask will pop up to prompt them to sign the transaction.
2. Sending a transaction costs gas.
3. There will be a significant delay from when the user sends a transaction and when that transaction actually takes effect on the blockchain. This is because we have to wait for the transaction to be included in a block, and the block time for Ethereum is on average 15 seconds. If there are a lot of pending transactions on Ethereum or if the user sends too low of a gas price, our transaction may have to wait several blocks to get included, and this could take minutes.

Thus we'll need logic in our app to handle the asynchronous nature of this code.

As review, see our contract code for creating zombies:

```sol
function createRandomZombie(string _name) public {
  require(ownerZombieCount[msg.sender] == 0);
  uint randDna = _generateRandomDna(_name);
  randDna = randDna - randDna % 100;
  _createZombie(_name, randDna);
}
```

So then here is an example of code for calling that with Metamask:

```js
function createRandomZombie(name) {
  // This is going to take a while, so update the UI to let the user know
  // the transaction has been sent
  $("#txStatus").text(
    "Creating new zombie on the blockchain. This may take a while..."
  )
  // Send the tx to our contract:
  return cryptoZombies.methods
    .createRandomZombie(name)
    .send({ from: userAccount })
    .on("receipt", function (receipt) {
      $("#txStatus").text("Successfully created " + name + "!")
      // Transaction was accepted into the blockchain, let's redraw the UI
      getZombiesByOwner(userAccount).then(displayZombies)
    })
    .on("error", function (error) {
      // Do something to alert the user their transaction has failed
      $("#txStatus").text(error)
    })
}
```

Our function sends a transaction to our Web3 provider, and chains some event listeners:

1. `receipt` will fire when the transaction is included into a block on Ethereum, which means our zombie has been created and saved on our contract
2. `error` will fire if there's an issue that prevented the transaction from being included in a block, such as the user not sending enough gas. We'll want to inform the user in our UI that the transaction didn't go through so they can try again.

> Note: You can optionally specify `gas` and `gasPrice` when you call send, e.g. `.send({ from: userAccount, gas: 3000000 })`. If you don't specify this, MetaMask will let the user choose these values.

## Calling Payable Functions

Recall in our `ZombieHelper` contract, we had the following:

```sol
function levelUp(uint _zombieId) external payable {
  require(msg.value == levelUpFee);
  zombies[_zombieId].level++;
}
```

The way to send Ether along with a function is simple, with one caveat: we need to specify how much to send in `wei`, not Ether.

### What's a Wei?

A wei is the smallest sub-unit of Ether — there are `10^18` wei in one ether.

That's a lot of zeroes to count — but luckily Web3.js has a conversion utility that does this for us.

```js
// This will convert 1 ETH to Wei
web3js.utils.toWei("1")
```

In our case, we want to add the following:

```js
cryptoZombies.methods
  .levelUp(zombieId)
  .send({ from: userAccount, value: web3js.utils.toWei("0.001", "ether") })
```

Our code challenge implementation:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>CryptoZombies front-end</title>
    <script
      language="javascript"
      type="text/javascript"
      src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"
    ></script>
    <script
      language="javascript"
      type="text/javascript"
      src="web3.min.js"
    ></script>
    <script
      language="javascript"
      type="text/javascript"
      src="cryptozombies_abi.js"
    ></script>
  </head>
  <body>
    <div id="txStatus"></div>
    <div id="zombies"></div>

    <script>
      var cryptoZombies
      var userAccount

      function startApp() {
        var cryptoZombiesAddress = "YOUR_CONTRACT_ADDRESS"
        cryptoZombies = new web3js.eth.Contract(
          cryptoZombiesABI,
          cryptoZombiesAddress
        )

        var accountInterval = setInterval(function () {
          // Check if account has changed
          if (web3.eth.accounts[0] !== userAccount) {
            userAccount = web3.eth.accounts[0]
            // Call a function to update the UI with the new account
            getZombiesByOwner(userAccount).then(displayZombies)
          }
        }, 100)
      }

      function displayZombies(ids) {
        $("#zombies").empty()
        for (id of ids) {
          // Look up zombie details from our contract. Returns a `zombie` object
          getZombieDetails(id).then(function (zombie) {
            // Using ES6's "template literals" to inject variables into the HTML.
            // Append each one to our #zombies div
            $("#zombies").append(`<div class="zombie">
              <ul>
                <li>Name: ${zombie.name}</li>
                <li>DNA: ${zombie.dna}</li>
                <li>Level: ${zombie.level}</li>
                <li>Wins: ${zombie.winCount}</li>
                <li>Losses: ${zombie.lossCount}</li>
                <li>Ready Time: ${zombie.readyTime}</li>
              </ul>
            </div>`)
          })
        }
      }

      function createRandomZombie(name) {
        // This is going to take a while, so update the UI to let the user know
        // the transaction has been sent
        $("#txStatus").text(
          "Creating new zombie on the blockchain. This may take a while..."
        )
        // Send the tx to our contract:
        return cryptoZombies.methods
          .createRandomZombie(name)
          .send({ from: userAccount })
          .on("receipt", function (receipt) {
            $("#txStatus").text("Successfully created " + name + "!")
            // Transaction was accepted into the blockchain, let's redraw the UI
            getZombiesByOwner(userAccount).then(displayZombies)
          })
          .on("error", function (error) {
            // Do something to alert the user their transaction has failed
            $("#txStatus").text(error)
          })
      }

      function feedOnKitty(zombieId, kittyId) {
        $("#txStatus").text("Eating a kitty. This may take a while...")
        return cryptoZombies.methods
          .feedOnKitty(zombieId, kittyId)
          .send({ from: userAccount })
          .on("receipt", function (receipt) {
            $("#txStatus").text("Ate a kitty and spawned a new Zombie!")
            getZombiesByOwner(userAccount).then(displayZombies)
          })
          .on("error", function (error) {
            $("#txStatus").text(error)
          })
      }

      function levelUp(zombieId) {
        $("#txStatus").text("Leveling up your zombie...")
        return cryptoZombies.methods
          .levelUp(zombieId)
          .send({
            from: userAccount,
            value: web3js.utils.toWei("0.001", "ether"),
          })
          .on("receipt", function (receipt) {
            $("#txStatus").text(
              "Power overwhelming! Zombie successfully leveled up"
            )
          })
          .on("error", function (error) {
            $("#txStatus").text(error)
          })
      }

      function getZombieDetails(id) {
        return cryptoZombies.methods.zombies(id).call()
      }

      function zombieToOwner(id) {
        return cryptoZombies.methods.zombieToOwner(id).call()
      }

      function getZombiesByOwner(owner) {
        return cryptoZombies.methods.getZombiesByOwner(owner).call()
      }

      window.addEventListener("load", function () {
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof web3 !== "undefined") {
          // Use Mist/MetaMask's provider
          web3js = new Web3(web3.currentProvider)
        } else {
          // Handle the case where the user doesn't have Metamask installed
          // Probably show them a message prompting them to install Metamask
        }

        // Now you can start your app & access web3 freely:
        startApp()
      })
    </script>
  </body>
</html>
```

## Subscribing to events

If you recall from `zombiefactory.sol`, we had an event called `NewZombie` that we fired every time a new zombie was created:

```sol
event NewZombie(uint zombieId, string name, uint dna);
```

In Web3.js, you can `subscribe` to an event so your web3 provider triggers some logic in your code every time it fires:

```js
cryptoZombies.events
  .NewZombie()
  .on("data", function (event) {
    let zombie = event.returnValues
    // We can access this event's 3 return values on the `event.returnValues` object:
    console.log(
      "A new zombie was born!",
      zombie.zombieId,
      zombie.name,
      zombie.dna
    )
  })
  .on("error", console.error)
```

> Note: that this would trigger an alert every time ANY zombie was created in our DApp — not just for the current user. What if we only wanted alerts for the current user?

### Using indexed

In order to filter events and only listen for changes related to the current user, our Solidity contract would have to use the `indexed` keyword, like we did in the `Transfer` event of our ERC721 implementation:

```sol
event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);
```

In this case, because `_from` and `_to` are indexed, that means we can filter for them in our event listener in our front end:

```js
// Use `filter` to only fire this code when `_to` equals `userAccount`
cryptoZombies.events
  .Transfer({ filter: { _to: userAccount } })
  .on("data", function (event) {
    let data = event.returnValues
    // The current user just received a zombie!
    // Do something here to update the UI to show it
  })
  .on("error", console.error)
```

As you can see, using `event` and `indexed` fields can be quite a useful practice for listening to changes to your contract and reflecting them in your app's front-end.

### Querying past events

We can even query past events using `getPastEvents`, and use the filters `fromBlock` and `toBlock` to give Solidity a time range for the event logs ("block" in this case referring to the Ethereum block number):

```js
cryptoZombies
  .getPastEvents("NewZombie", { fromBlock: 0, toBlock: "latest" })
  .then(function (events) {
    // `events` is an array of `event` objects that we can iterate, like we did above
    // This code will get us a list of every zombie that was ever created
  })
```

Because you can use this method to query the event logs since the beginning of time, this presents an interesting use case: **Using events as a cheaper form of storage**.

If you recall, saving data to the blockchain is one of the most expensive operations in Solidity. But using events is much much cheaper in terms of gas.

The tradeoff here is that events are not readable from inside the smart contract itself. But it's an important use-case to keep in mind if you have some data you want to be historically recorded on the blockchain so you can read it from your app's front-end.

For example, we could use this as a historical record of zombie battles — we could create an event for every time one zombie attacks another and who won. The smart contract doesn't need this data to calculate any future outcomes, but it's useful data for users to be able to browse from the app's front-end.

### Subscribe challenge

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>CryptoZombies front-end</title>
    <script
      language="javascript"
      type="text/javascript"
      src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"
    ></script>
    <script
      language="javascript"
      type="text/javascript"
      src="web3.min.js"
    ></script>
    <script
      language="javascript"
      type="text/javascript"
      src="cryptozombies_abi.js"
    ></script>
  </head>
  <body>
    <div id="txStatus"></div>
    <div id="zombies"></div>

    <script>
      var cryptoZombies
      var userAccount

      function startApp() {
        var cryptoZombiesAddress = "YOUR_CONTRACT_ADDRESS"
        cryptoZombies = new web3js.eth.Contract(
          cryptoZombiesABI,
          cryptoZombiesAddress
        )

        var accountInterval = setInterval(function () {
          // Check if account has changed
          if (web3.eth.accounts[0] !== userAccount) {
            userAccount = web3.eth.accounts[0]
            // Call a function to update the UI with the new account
            getZombiesByOwner(userAccount).then(displayZombies)
          }
        }, 100)

        // Use `filter` to only fire this code when `_to` equals `userAccount`
        cryptoZombies.events
          .Transfer({ filter: { _to: userAccount } })
          .on("data", function (event) {
            let data = event.returnValues
            // The current user just received a zombie!
            // Do something here to update the UI to show it
            getZombiesByOwner(userAccount).then(displayZombies)
          })
          .on("error", console.error)
      }

      function displayZombies(ids) {
        $("#zombies").empty()
        for (id of ids) {
          // Look up zombie details from our contract. Returns a `zombie` object
          getZombieDetails(id).then(function (zombie) {
            // Using ES6's "template literals" to inject variables into the HTML.
            // Append each one to our #zombies div
            $("#zombies").append(`<div class="zombie">
              <ul>
                <li>Name: ${zombie.name}</li>
                <li>DNA: ${zombie.dna}</li>
                <li>Level: ${zombie.level}</li>
                <li>Wins: ${zombie.winCount}</li>
                <li>Losses: ${zombie.lossCount}</li>
                <li>Ready Time: ${zombie.readyTime}</li>
              </ul>
            </div>`)
          })
        }
      }

      function createRandomZombie(name) {
        // This is going to take a while, so update the UI to let the user know
        // the transaction has been sent
        $("#txStatus").text(
          "Creating new zombie on the blockchain. This may take a while..."
        )
        // Send the tx to our contract:
        return cryptoZombies.methods
          .createRandomZombie(name)
          .send({ from: userAccount })
          .on("receipt", function (receipt) {
            $("#txStatus").text("Successfully created " + name + "!")
            // Transaction was accepted into the blockchain, let's redraw the UI
            getZombiesByOwner(userAccount).then(displayZombies)
          })
          .on("error", function (error) {
            // Do something to alert the user their transaction has failed
            $("#txStatus").text(error)
          })
      }

      function feedOnKitty(zombieId, kittyId) {
        $("#txStatus").text("Eating a kitty. This may take a while...")
        return cryptoZombies.methods
          .feedOnKitty(zombieId, kittyId)
          .send({ from: userAccount })
          .on("receipt", function (receipt) {
            $("#txStatus").text("Ate a kitty and spawned a new Zombie!")
            getZombiesByOwner(userAccount).then(displayZombies)
          })
          .on("error", function (error) {
            $("#txStatus").text(error)
          })
      }

      function levelUp(zombieId) {
        $("#txStatus").text("Leveling up your zombie...")
        return cryptoZombies.methods
          .levelUp(zombieId)
          .send({
            from: userAccount,
            value: web3.utils.toWei("0.001", "ether"),
          })
          .on("receipt", function (receipt) {
            $("#txStatus").text(
              "Power overwhelming! Zombie successfully leveled up"
            )
          })
          .on("error", function (error) {
            $("#txStatus").text(error)
          })
      }

      function getZombieDetails(id) {
        return cryptoZombies.methods.zombies(id).call()
      }

      function zombieToOwner(id) {
        return cryptoZombies.methods.zombieToOwner(id).call()
      }

      function getZombiesByOwner(owner) {
        return cryptoZombies.methods.getZombiesByOwner(owner).call()
      }

      window.addEventListener("load", function () {
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof web3 !== "undefined") {
          // Use Mist/MetaMask's provider
          web3js = new Web3(web3.currentProvider)
        } else {
          // Handle the case where the user doesn't have Metamask installed
          // Probably show them a message prompting them to install Metamask
        }

        // Now you can start your app & access web3 freely:
        startApp()
      })
    </script>
  </body>
</html>
```

## Building on from here

The lesson was intentionally basic without scaffold all the functionality.

Refer to the [lesson chapter](https://cryptozombies.io/en/lesson/6/chapter/10) for next steps to do it yourself.
