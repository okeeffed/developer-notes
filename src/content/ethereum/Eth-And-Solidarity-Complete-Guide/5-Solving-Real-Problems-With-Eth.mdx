# 5: Solving Real Problems With Ethereum

The first problem that it speaks to is the issues with Kickstarter.

To "fix" this issue in our current project, we have the idea of contributors donating money to an idea person and then that idea person will have the money controlled about which vendor is goes to.

In our contract, the manager needs to create a "spending request" and that request will be approved by all of the contributors.

For this project, we are going to outline a few required variables and functions.

For the variables:

| Name                | Type      | Does                                                                         |
| ------------------- | --------- | ---------------------------------------------------------------------------- |
| manager             | address   | address of person managing campaign                                          |
| minimumContribution | uint      | minimum amount of ether required to donate to be a contributor or "approver" |
| approvers           | address[] | list of people who can approve spending requests (!!!)                       |
| requests            | Request[] | Requests that the manager has made                                           |

As for our functions:

| Name            | Does                                                                             |
| --------------- | -------------------------------------------------------------------------------- |
| Campaign        | Constructor to set owner and minimumContribution                                 |
| contribute      | Called when someone wants to donate money to the campaign and become an approver |
| createRequest   | Called by the manager to create a request for money to be spent on a vendor      |
| approveRequest  | Called by contributors to approve a request (!!!)                                |
| finalizeRequest | Called by the manager to finalize a request and have money sent to vendor        |

> Note: approvers and approvateRequest will be refactored after in order to experience the problem and fix it naturally.

## The Request Struct

This is the first example of creating a struct in this particular course.

I won't outline the table here, but you can see the struct in the contract.

```sol
pragma solidity ^0.4.17;

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
    }

    address public manager;
    uint public minimumContribution;
    address[] public approvers;
    Request[] public requests;

    function Campaign(uint minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers.push(msg.sender);
    }
}
```

## Storage vs Memory

I'll breeze over this, since we have already seen it but essentially `memory` is temporary while `storage` stores against our contracts data and is costly.

There was an interest example of `int[] memory myArray = numbers` vs `int[] storage myArray = numbers` and how the `numbers` value is updated when `myArray` is updated if you use the latter.

The resulting value was the following:

```sol
pragma solidity ^0.4.17;

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
    }

    address public manager;
    uint public minimumContribution;
    address[] public approvers;
    Request[] public requests;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers.push(msg.sender);
    }

    function createRequest(string memory description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false
        });

        requests.push(newRequest);
    }
}
```

## Voting system requirements

1. Individual contributor cannot vote more than once.
2. Resilient to many different contributors/approvers.

This will change how we deal with our contract logic.

The following is a **very poor way of writing our contract**:

```sol
contract Campaign {
	function approveRequest(Request request) public {
		bool isApprover = false;
		for (uint i = 0; i < approvers.length; i++) {
			if (approvers[i] == msg.sender) {
				isApprover = true;
			}
		}
		require(isApprover);

		// Make sure they have not yet voted
		for (uint i = 0; i < request.request.length; i++) {
			require(request.approvers[i] != msg.sender);
		}
	}
}
```

This is because there are some issues with arrays.

## Issues with arrays

Assuming our first loop cost 10000 gas per person and the second was 5000 gas per person.

As the array grows, it becomes **unacceptably** expensive to loop through it.

If we assume the array grows unboundedly, then we need to address this issue.

## Mappings vs Arrays

So in our approach, we want to update our approach to make use of mappings.

The search time for a `mapping` is constant.

```sol
contract Campaign {
	function approveRequest(Request request) public {
		bool isApprover = false;
		for (uint i = 0; i < approvers.length; i++) {
			if (approvers[i] == msg.sender) {
				isApprover = true;
			}
		}
		require(isApprover);

		// Make sure they have not yet voted
		for (uint i = 0; i < request.request.length; i++) {
			require(request.approvers[i] != msg.sender);
		}
	}
}
```

## Basics of Mappings

- `keys` are not stored with mappings. Big gotcha to understand. Solidity works with a hash table and a lookup process where the hash function outputs the address to fetch.
- Values are not iterable (like `Object.values` in JS).
- We do not get back `undefined` if it does not exist - we get back a default value.

So, we will update our `approvers` to go from an `address[]` to an `approvers` array.

Once we refactor our code, we now have the following contract:

```sol
pragma solidity ^0.4.17;

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping (address => bool) approvals;
    }

    address public manager;
    uint public minimumContribution;
    Request[] public requests;

    mapping (address => bool) public approvers;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
    }

    function createRequest(string memory description, uint value, address recipient) public restricted {
        require(approvers[msg.sender]);
        // Note: we do not have to initialize a mapping
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }
}
```

## Approving a request

```sol
function approveRequest(uint index) public {
		Request storage request = requests[index];

		// check they are an approver that has donated
		require(approvers[msg.sender]);
		// check they haven't voted
		require(!request.approvals[msg.sender]);

		request.approvals[msg.sender] = true;
		request.approvalCount++;
}
```

## Finalizing a request

The last thing we need to do is add the capability to finalise the request.

Note that we needed to add a `uint approversCount` variable to check we have more than 50% approval rate.

```sol
pragma solidity ^0.4.17;

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping (address => bool) approvals;
    }

    address public manager;
    uint public minimumContribution;
    Request[] public requests;
    uint public approversCount;

    mapping (address => bool) public approvers;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory description, uint value, address recipient) public restricted {
        require(approvers[msg.sender]);
        // Note: we do not have to initialize a mapping
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        // check they are an approver that has donated
        require(approvers[msg.sender]);
        // check they haven't voted
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }
}
```

## Thinking about contract deployment

Something to keep in mind is that for each contract that is deployed, we need to keep track of all of the addresses.

We are going to have a "factory" contract as an intermediate step to deploying our Campaign contract.

We are going to have one factory deployment that is going to be in charge of all of our campaigns.

## Adding a Campaign Factory

An outline of the contract `CampaignFactory`.

| Variable          | Type      | Does                                |
| ----------------- | --------- | ----------------------------------- |
| deployedCampaigns | address[] | Addresses of all deployed contracts |

| Function             | Does                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------ |
| createCampaign       | Creates a new campaign contract instance and stores the address of the new contract. |
| getDeployedCampaigns | Returns a list of all deployed campaigns                                             |

Ultimately, the two contracts have their code updated to look like the following:

```sol
pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployesCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping (address => bool) approvals;
    }

    address public manager;
    uint public minimumContribution;
    Request[] public requests;
    uint public approversCount;

    mapping (address => bool) public approvers;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory description, uint value, address recipient) public restricted {
        require(approvers[msg.sender]);
        // Note: we do not have to initialize a mapping
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        // check they are an approver that has donated
        require(approvers[msg.sender]);
        // check they haven't voted
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }
}
```

An important gotcha that came up: when using a factory contract, we need to ensure that we pass the address of the sender through from the factory into the constructor function of the new contract.

## Writing the tests

We wrote a compile script which we could then use for our tests:

```js
const assert = require("assert")
const ganache = require("ganache-cli")
const Web3 = require("web3")
const web3 = new Web3(ganache.provider())

const compiledFactory = require("../ethereum/build/CampaignFactory.json")
const compiledCampaign = require("../ethereum/build/Campaign.json")

let accounts
let factory
let campaignAddress
let campaign

describe("Campaign + CampaignFactory Contract", () => {
  beforeEach(async () => {
    accounts = await web3.eth.getAccounts()
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
      .deploy({
        data: compiledFactory.bytecode,
      })
      .send({
        from: accounts[0],
        gas: "1000000",
      })

    // accounts[0] is the owner of the factory contract
    await factory.methods.createCampaign("100").send({
      from: accounts[0],
      gas: "1000000",
    })
    ;[campaignAddress] = await factory.methods.getDeployedCampaigns().call()
    campaign = await new web3.eth.Contract(
      JSON.parse(compiledCampaign.interface),
      campaignAddress
    )
  })
  describe("Campaigns", () => {
    it("deploys a factory and a campaign", () => {
      assert.ok(factory.options.address)
      assert.ok(campaign.options.address)
    })

    it("marks caller as the campaign manager", async () => {
      const manager = await campaign.methods.manager().call()
      assert.equal(accounts[0], manager)
    })

    it("allows others to contribute money and marks them as approvers", async () => {
      await campaign.methods.contribute().send({
        value: "200",
        from: accounts[1],
      })

      const isContributor = await campaign.methods.approvers(accounts[1]).call()
      assert(isContributor)
    })

    it("requires a minimum contribution amount", async () => {
      try {
        await campaign.methods.contribute().send({
          value: "1",
          from: accounts[1],
        })
        assert(false)
      } catch (err) {
        assert(err)
      }
    })

    it("allows a manager to make a payment request", async () => {
      await campaign.methods
        .createRequest("Buy batteries", "100", accounts[1])
        .send({
          from: accounts[0],
          gas: "1000000",
        })

      const request = await campaign.methods.requests(0).call()
      assert.equal("Buy batteries", request.description)
    })

    it("processes requests", async () => {
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei("10", "ether"),
      })

      await campaign.methods
        .createRequest("A", web3.utils.toWei("5", "ether"), accounts[1])
        .send({
          from: accounts[0],
          gas: "1000000",
        })

      await campaign.methods.approveRequest(0).send({
        from: accounts[0],
        gas: "1000000",
      })

      await campaign.methods.finalizeRequest(0).send({
        from: accounts[0],
        gas: "1000000",
      })

      let balance = await web3.eth.getBalance(accounts[1])
      balance = web3.utils.fromWei(balance, "ether")
      balance = parseFloat(balance)

      // 100 base amount from Ganache + 5 wei we requested
      assert(balance > 104)
    })
  })
})
```
