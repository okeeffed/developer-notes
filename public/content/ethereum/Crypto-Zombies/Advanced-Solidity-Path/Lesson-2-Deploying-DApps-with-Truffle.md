# Lesson Two: Deploying DApps with Truffle

## Truffle init

When you run `truffle init` (if you have installed it globally) it will generate a few folders and files for us:

- `contracts` - where Truffle expects to find contracts.
- `migrations` - a migration is a JS file that tells Truffle how to deploy a smart contract.
- `truffle.js` and `truffle-config.js` - config files used to store the network settings for deployment.

Since we need Truffle to sign transactions, we need a tool called `truffle-hdwallet-provider`.

It can be installed with the following:

```s
$ npm install truffle truffle-hdwallet-provider
# ... install output
```

## Compiling source code

The **Ethereum Virtual Machine** can't directly understand Solidity source code as we write it. Thus, we need to run a compiler that will "translate" our smart contract into machine-readable bytecode.

The virtual machine then executes the bytecode, and completes the actions required by our smart contract.

Say we modified the `add` function to the following:

```sol
function add(uint16 a, uint16 b) internal returns (uint16) {
    uint16 c = a + b;
    assert(c >= a);
    return c;
}
```

This will throw a warning saying that the function should be marked `pure`.

Making a function `pure` or `view` saves us gas. Since these functions are not going to modify the state of the blockchain, there is no need for miners to execute them. To put it in a few words, `pure` and `view` functions can be called for free.

## Compiling with Truffle

When you are ready to compile, you can compile with `truffle compile`.

## Migrations

To deploy to Ethereum we need to create a `migration`.

Migrations are JS files that help Truffle deploy the code to Ethereum.

Note that `truffle init` created a special contract called `Migrations.sol` that keeps track of the changes you're making to your code.

The way it works is that the history of changes is saved onchain. Thus, there's no way you will ever deploy the same code twice.

## Creating a New Migration

Inside the initial migration we see the following:

```js
var Migrations = artifacts.require("./Migrations.sol")
module.exports = function (deployer) {
  deployer.deploy(Migrations)
}
```

In the task, we need to create a new file `./contracts/2_crypto_zombies.js` and added the following content:

```js
var CryptoZombies = artifacts.require("./CryptoZombies.sol")
module.exports = function (deployer) {
  deployer.deploy(CryptoZombies)
}
```

## Configuration files

Check the docs for this one.

The example task definition is like so:

```js
const HDWalletProvider = require("truffle-hdwallet-provider")

// Set your own mnemonic here
const mnemonic = "YOUR_MNEMONIC"

// Module exports to make this configuration available to Truffle itself
module.exports = {
  // Object with configuration for each network
  networks: {
    // Configuration for mainnet
    mainnet: {
      provider: function () {
        // Setting the provider with the Infura Mainnet address and Token
        return new HDWalletProvider(
          mnemonic,
          "https://mainnet.infura.io/v3/YOUR_TOKEN"
        )
      },
      network_id: "1",
    },
    // Configuration for rinkeby network
    rinkeby: {
      // Special function to setup the provider
      provider: function () {
        // Setting the provider with the Infura Rinkeby address and Token
        return new HDWalletProvider(
          mnemonic,
          "https://rinkeby.infura.io/v3/YOUR_TOKEN"
        )
      },
      network_id: 4,
    },
  },
}
```

## Deploying the smart contract

```s
$ truffle migrate --network rinkeby
# Deals with deployment
$ truffle migrate --network mainnet
# Deploys to the main network
```
