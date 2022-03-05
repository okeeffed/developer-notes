# Getting Started with Hardhat

## Resources and further reading

- [Getting Started with Hardhat](https://hardhat.org/getting-started)

## First project

```s
$ mkdir my-first-project
$ cd my-first-project
$ npm init -y
$ npm install --save-dev hardhat
$ npx hardhat

# Select to run advanced example with TypeScript
```

The first time you run `npx hardhat`, it will initialize a project for you.

Afterwards, you can run `npx hardhat` again to display the help and available tasks.

## Running a task

Tasks come from the `hardhat.config.ts` file.

You can run an example `accounts` task that was created like so:

```s
$ npx hardhat accounts
# ... lists accounts
```

## Running tests

The sample project comes with tests that use `Waffle` and `Ethers.js`.

You can run the tests with `npx hardhat test`.

I made some updates to enable importing of the contracts.

## Deploying the contract

To deploy the contract, you can run `npx hardhat run scripts/sample-script.js --network <network>`.

In my case, I was deploying the contract to Rinkeby:

```s
$ npx hardhat run scripts/deploy.ts --network rinkeby
```

It will give the address that your contract has been deployed to like `0x80f891669AF2039371216f260DBEa2BB81f62628`.

You can use the Remix IDE online to test out the contract deployed.
