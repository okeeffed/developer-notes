# 7: Nextjs Frontend Application

Proposed routes:

| Path                               | Show                                                       |
| ---------------------------------- | ---------------------------------------------------------- |
| `/`                                | Homepage                                                   |
| `/campaigns/new`                   | Form the make a new campaign                               |
| `/campaigns/:address`              | Show the details of a specific campaign                    |
| `/campaigns/:address/requests`     | Show all the requests of a specific campaign               |
| `/campaigns/:address/requests/new` | Form to create a request for campaign at address specified |

## The important stuff

I basically skipped through most of the work... the important parts are understanding how to inject `web3`:

```js
import Web3 from "web3"

let web3

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" })
  web3 = new Web3(window.ethereum)
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    process.env.NEXT_PUBLIC_INFURA_URL
  )
  web3 = new Web3(provider)
}

export default web3
```

We also have a `factory.js` file that is a helper to get our contract instance:

```js
import web3 from "./web3"
import CampaignFactory from "./build/CampaignFactory.json"

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
)

export default instance
```
