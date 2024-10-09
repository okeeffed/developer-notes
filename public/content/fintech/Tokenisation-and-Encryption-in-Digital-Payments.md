## 2.2 Tokenisation Definition and Overview

**Tokenization** is the process of protecting sensitive data by replacing it with an algorithmically generated number called a token.

For example, a customer's primary account number (PAN) is replaced with a series of randomly-generated characters, called the "token".

The same card can have many tokens as the end-user has enabled devices, such as smartphones and wearables or digital wallets etc.

These tokens can be used for in-store, in-app or online payments.

The are secured and stored "inside a vault", outside the device.

For every transaction, then token **must** be coupled with a cryptogram.

### 2.2.1 What is a Cryptogram?

Cryptogram: In fintech, a cryptogram is a unique, one-time code generated during a secure payment transaction, typically for card payments. It's used to authenticate the transaction and ensure that the payment information is genuine and hasn't been tampered with.

Key points about cryptograms:

- They're usually created using encryption algorithms
- They're specific to a single transaction
- They help prevent replay attacks, where a malicious actor might try to reuse captured transaction data

2. Tokenization and "Vault": Tokenization is the process of replacing sensitive data (like credit card numbers) with non-sensitive substitutes called tokens. These tokens can be used in payment systems without exposing the actual sensitive data.

### 2.2.2 "Inside a vault"

The term "vault" in this context is a metaphor used to describe a secure, encrypted database where the original sensitive data is stored. Here's what it means:

- The "vault" is a highly secure storage system
- It's separate from the main payment processing systems
- It has strict access controls and encryption
- Only authorised systems can access the vault to retrieve the original data when necessary

Using the vault metaphor helps non-technical people understand that their sensitive information is kept in a separate, highly secure location, much like valuable items would be stored in a physical vault.

## 3.3 How Tokenisation works in Digital Payment

The cardholder must use a device that supports the digital wallet application and registers a card.

1. The application sends the data to a **Token Requestor (TR)**.
2. **Token requestor** sends the data to the **Token Service Provider (TSP)** with which it is registered and makes a registration request for a new token.
3. The TSP verifies the data with the **card issuer**.
4. TSP registers the **primary account number (PAN)** and links it to a new token in a secure database (Token vault).
5. Along with the TR identifier, the token expiration date, restrictions on the use of the new token on certain channels, use by a particular merchant, limitation on the number of permitted uses and verification of the cryptogram.
6. The TSP notifies the application of the newly generated token.

The application stores the generated token as:
- **Device Account Number (DAN)** for Apple Pay.
- **Digitized PAN (DPAN)** for Samsung Pay in a secure location **Secure Element (SE)** or **Host Card Emulation (HCE)**

The could be two formats of tokens:

1. **Format preserving tokens** maintain the appearance of the 16-digit credit card number.
2. **Non-format preserving tokens** do not resemble the original credit card number and can include alphanumeric characters.

### 3.3.1 Elaborating on the Token Requestor and Token Service Provider

- TR (Token Requestor): This is typically the digital wallet application or a merchant's payment system that initiates the tokenisation process.
- TSP (Token Service Provider): This is the entity that manages the tokenisation process, creates and stores tokens, and ensures the security of the sensitive data.

### 3.3.2 An example walkthrough

Example: Sarah wants to add her credit card to her smartphone's digital wallet.

1. Sarah opens her digital wallet app (e.g., Apple Pay) and enters her credit card information.

2. The digital wallet app (acting as the Token Requestor) securely sends Sarah's card data to the Token Service Provider (TSP). In this case, the TSP might be a service run by the card network (e.g., Visa or Mastercard).

3. The TSP contacts Sarah's card issuer (her bank) to verify the card information and ensure it's valid and in good standing.

4. Once verified, the TSP generates a unique token to represent Sarah's card. Let's say Sarah's actual card number is 4111 2222 3333 4444, and the generated token is 4111 8765 9876 5432.

5. The TSP stores the relationship between the real card number and the token in its secure database (the "token vault"). It also sets parameters for the token's use, such as:
   - Expiration date: 12/2025
   - Use restrictions: Only valid for in-store and in-app purchases
   - Device restriction: Only valid on Sarah's specific smartphone

6. The TSP sends the newly generated token back to the digital wallet app.

7. The digital wallet app stores this token securely on Sarah's device. In Apple Pay, this would be called the Device Account Number (DAN) and would be stored in the Secure Element of the device.

Now, when Sarah uses her phone to make a purchase:

1. The digital wallet app sends the token (4111 8765 9876 5432) to the merchant's payment terminal, along with a cryptogram (a one-time code) for this specific transaction.

2. The merchant's system sends this token and cryptogram to their payment processor.

3. The payment processor contacts the TSP to validate the token and cryptogram.

4. If valid, the TSP retrieves the real card number from its vault and uses it to process the transaction with the card issuer.

5. The card issuer approves or declines the transaction and sends the response back through the same channel.

Throughout this process, Sarah's actual credit card number is never exposed to the merchant or transmitted over any network. Only the token is used, providing an extra layer of security.

This example demonstrates how tokenisation protects sensitive payment information while still allowing for seamless transactions. The TR (the digital wallet app) and the TSP (the token service) work together to create a secure system for digital payments.

In the scenario of using **non-format preserving tokens**, the token Sarah gets back could be a randomised value and not a 16-digit value.

### 3.3.3 Secure Element (SE) and Host Card Emulation (HCE)

These are two different methods for storing sensitive payment information (like tokens) on a mobile device. Let's look at each:

Secure Element (SE):

- A SE is a tamper-resistant hardware component built into some mobile devices.
- It's designed to securely store sensitive data and perform cryptographic operations.
- The SE is isolated from the device's main processor and operating system, providing an extra layer of security.
- Apple Pay, for example, uses the Secure Element to store tokenized card information.

Key benefits:

- Very high security as it's hardware-based
- Difficult for malware to access

Host Card Emulation (HCE):

- HCE is a software-based alternative to the Secure Element.
- It allows the phone to emulate a payment card without relying on a built-in secure element.
- Instead of storing sensitive data on a hardware chip, HCE stores it in a secure area of the device's software.
- Many Android-based payment systems use HCE.

Key benefits:

- More flexible as it doesn't require specific hardware
- Easier for developers to implement
- Can be updated more easily than hardware-based solutions

In practice:

- When Sarah uses Apple Pay, her Device Account Number (token) is stored in the Secure Element of her iPhone.
- If Sarah uses Google Pay on an Android phone without a Secure Element, the Digitized PAN (token) might be stored using HCE.

Both methods aim to protect the tokenized payment information, but they do so in different ways. The choice between SE and HCE often depends on the device manufacturer, the payment system, and the desired balance between security and flexibility.

## 3.4 How to add a card for Tokenisation

1. Manual entry: The cardholder enters the card directly into the digital wallet.
2. Card-on-file: The cardholder adds a card to an additional device. This means the cardholders has already added it previously and is the information is already "stored on file".
3. In-app provisioning: Your mobile app dynamically creates a new virtual card and then adds it to the digital wallet for instant availability of the funds.

Each network token is exclusive to both a digital wallet and a device. E.g. a network token requested by Apple Pay on an iPhone cannot be used by a Google Pay digital wallet or an Apple Watch. It can only be used by Apple Pay on the particular iPhone on which it was requested.

### 3.4.1 Examples

- Manual entry: Example: Sarah gets a new credit card and wants to add it to her Apple Pay. She opens her Wallet app, taps "Add Card," and manually types in her card number, expiration date, and CVV.
- Card-on-file: Example: John has already added his debit card to his iPhone. He gets a new iPad and wants to use Apple Pay on it too. When he sets up Apple Pay on the iPad, he sees his debit card as an option to add because it's already on file with his Apple ID.
- In-app provisioning: Example: Emily uses a fintech app that offers a virtual debit card. When she requests the card in the app, it's instantly created and she's given the option to add it directly to her Google Pay wallet without leaving the app.

For an analogy, think of your digital wallet like packing for trip:

- Manual entry is like packing your suitcase item by item. It's thorough but takes more time.
- Card-on-file is like having a pre-packed suitcase ready to go. You've done the work before, so now it's quick and easy.
- In-app provisioning is like a hotel providing you with everything you need upon arrival. You don't even need to pack - it's all taken care of instantly.


## 3.5 Registration and Tokenisation 

This video walks through the process of tokenising a card.

It walks through the important relationship between the Token Requestor, the Token Service Provider and the Issuer.

## 3.6 Tokenised Transaction Flow

For the tokenised transaction flow, it will start with a payment happening (for example from a device) at the merchant (could be a POS system).

The merchant will talk to the acquirer who talks to the payment network.

That payment network will talk to the TSP, then talk to the issuer bank.

### 3.6.1 Elaborating on the above

Here's a more comprehensive view of the process:

1. Payment Initiation:
   - The cardholder initiates a payment using their tokenized card (e.g., tapping their phone at a point-of-sale terminal or making an in-app purchase).
   - The device sends the token, along with a cryptogram (a one-time code for this specific transaction), to the merchant's system.

2. Merchant Processing:
   - The merchant's system (POS or payment gateway) receives the token and cryptogram.
   - It packages this information with other transaction details (amount, merchant ID, etc.).

3. Acquirer Processing:
   - The merchant sends the transaction information to their acquirer (the bank or financial institution that processes payments on behalf of the merchant).
   - The acquirer formats the transaction data according to the payment network's specifications.

4. Payment Network:
   - The acquirer sends the transaction to the relevant payment network (e.g., Visa, Mastercard).
   - The payment network recognizes that this is a tokenized transaction.

5. Token Service Provider (TSP) Interaction:
   - The payment network routes the token to the appropriate TSP.
   - The TSP validates the token and cryptogram.
   - If valid, the TSP retrieves the real card number (PAN) associated with the token from its secure vault.
   - The TSP sends the real card number back to the payment network, replacing the token in the transaction.

6. Issuer Processing:
   - The payment network forwards the transaction (now with the real card number) to the issuing bank.
   - The issuer performs its usual checks (sufficient funds, card not reported stolen, etc.).
   - The issuer approves or declines the transaction.

7. Response Flow:
   - The issuer sends its response (approval or decline) back through the payment network.
   - The payment network passes this to the acquirer.
   - The acquirer relays the response to the merchant.
   - The merchant's system informs the cardholder of the transaction result.

Key points to note:
- The real card number is only exposed at the TSP and issuer level. All other parts of the transaction use the token.
- The cryptogram ensures that the token can't be reused for fraudulent transactions.
- The TSP plays a crucial role in de-tokenising the transaction, allowing it to be processed normally by the issuer.
- This process happens very quickly, usually in a matter of seconds.

This flow demonstrates how tokenisation adds a layer of security to the transaction without significantly changing the overall payment process. The token serves as a stand-in for the card number throughout most of the transaction, reducing the risk of card data being intercepted or stolen.

### 3.6.2 Elaborating on the cryptogram

In most cases, it is indeed the device (such as a smartphone or a payment-enabled smartwatch) that generates the cryptogram. However, the process is a bit more nuanced:

1. Cryptogram Generation:
   - The cryptogram is typically generated by the secure payment applet within the device.
   - For devices with a Secure Element (SE), the cryptogram is generated within the SE.
   - For devices using Host Card Emulation (HCE), it's generated by the secure payment software.

2. Inputs for Cryptogram:
   - The cryptogram is created using several inputs, which may include:
     - The token (Device Account Number or Digitised PAN)
     - A device-specific key
     - Transaction-specific data (like the amount)
     - A counter or timestamp to ensure uniqueness

3. Purpose:
   - The cryptogram serves as a dynamic security code, proving that the device initiating the transaction is the one associated with the token.
   - It's unique to each transaction, preventing replay attacks.

4. Validation:
   - The Token Service Provider (TSP) or the card issuer validates the cryptogram during the transaction process.
   - This validation confirms that the transaction is coming from the authorised device and hasn't been tampered with.

5. Standards:
   - The exact method of cryptogram generation can vary based on the payment scheme (e.g., EMV, Apple Pay, Google Pay).
   - However, they all follow similar principles of combining device-specific and transaction-specific data.

It's worth noting that while the device generates the cryptogram, it does so using protocols and keys that were set up when the card was first tokenised and added to the digital wallet. This setup ensures that only the legitimate TSP or issuer can validate the cryptogram, maintaining the security of the system.

This process allows for a high level of security in mobile payments, as each transaction is authenticated with a unique, device-generated code that can only be validated by the appropriate parties in the payment chain.

The Cryptogram is generated based off information provided by the TSP during the tokenisation process:

- Elements stored during tokenization: When a card is tokenized and added to a digital wallet, several elements are securely stored on the device, either in the Secure Element (SE) or via Host Card Emulation (HCE):
    - The token itself (e.g., Device Account Number or Digitized PAN)
    - A unique key or set of keys
    - Other security parameters provided by the TSP
- Cryptogram creation: When a transaction occurs, the device uses these stored elements to create the cryptogram. The process typically involves:
    - The stored token
    - The unique key(s)
    - Transaction-specific data (e.g., amount, currency, merchant ID)
    - A counter or timestamp to ensure uniqueness
- SE vs HCE:
    - In SE: The cryptogram generation occurs within the secure hardware, using the securely stored elements.
    - In HCE: The process is similar, but relies on software-based security measures to protect the stored elements and generate the cryptogram.
- TSP's role:
    - The TSP doesn't directly create the cryptogram for each transaction.
    - Instead, it provides the necessary security elements during tokenisation that allow the device to generate valid cryptograms for future transactions.
    - The TSP (or issuer) will later validate these cryptograms during transaction processing.
- Purpose: This setup allows for dynamic security. Each transaction has a unique cryptogram that can prove:
    - The transaction is coming from the authorised device
    - The token is being used in its intended context
    - The transaction details haven't been tampered with

## 4 Network Based Tokenisation

### 4.7 Network based tokenisation continued

The participants:

1. Card network (e.g. Visa/Mastercard): provides services for creating, storing and managing tokens.
2. Issuer-processor: Issues the payment card from which the token is derived, and must approve each request to provision tokens for these cards. This approval process requires integration and certification with tokenisation services at the card network.
3. Digital wallet: Requests and stores tokens. Digital wallets undergo certification in order to utilise network tokenisation services, allowing them to request and make purchases with tokens.
4. Cardholder: Owns the card to be tokenised.

### 4.8 VISA Tokenisation 

This is a diagram to explain how Visa tokenisation happens.

The important parts of the diagram were that Visa shares the token request with the account issuer and then with their approval, replaces the consumer's PAN with a unique digital identifier (the token).

## 6 Apple Pay Tokenisation

This did an overview from the Apple Pay perspective.

## 7 Encryption vs Tokenisation

### 7.1 Encryption and Tokenisation Definition and Difference

A few differences:

- Encryption mathematically transforms plain text into cipher text using an encryption algorithm and key. Tokenisation generates a token for plain text and stores the mapping in the database.
- Format-preserving encryption schemes come with a tradeoff of lower strength. This isn't a problem for tokenisation.
- With encryption, the original data leaves the organisation in encrypted form. With tokenisation, the original data never leaves the organisation.

### 7.2 Risk and Security - Use Both

- Cyber attacks could shift to focusing on token databases.
- "Encrypt, then tokenise".
- At the point of capture, the PAN should be immediate encrypted for protection so that the information is unreadable during transit activity.
- If authorisation is issued by the bank, a randomly generated token value should be given back to the merchant's system for use.
- Encryption combined with tokenisation can protect cardholder data in transit and eliminate possibilities of exploitation.
- The layered effects of tokenisation and encryption enhance security and integrity of sensitive information. 

#### 7.2.1 Explaining encrypt, then tokenise

Explanation:

1. Encryption: Transforms the data into an unreadable format using a secret key.
2. Tokenization: Replaces the encrypted data with a non-sensitive placeholder (token).

This two-step process ensures that even if the token database is compromised, the actual data remains protected by encryption.

Real-world example:

Let's say a customer, Alice, is making a purchase at an online store.

1. Alice enters her credit card number: 4111 2222 3333 4444
2. The merchant's system immediately encrypts this number
3. The encrypted number is sent to the tokenisation service
4. The tokenisation service generates a token and stores the encrypted number
5. The token is sent back to the merchant and used for future references

Here's a simplified pseudo-code example to illustrate this process:

```python
# At the merchant's point of sale
def process_payment(card_number):
    # Step 1: Encrypt the card number
    encrypted_card = encrypt(card_number, encryption_key)
    
    # Step 2: Send encrypted data for tokenization
    token = tokenization_service.get_token(encrypted_card)
    
    # Step 3: Use token for transaction and store for future use
    process_transaction(token)
    store_token_for_customer(token)

# At the tokenization service
def get_token(encrypted_data):
    # Generate a random token
    token = generate_random_token()
    
    # Store the encrypted data with the token
    token_vault[token] = encrypted_data
    
    return token

# When needing to use the token (e.g., for a refund)
def use_token(token):
    # Retrieve the encrypted data
    encrypted_data = token_vault[token]
    
    # Decrypt the data (only done when absolutely necessary)
    original_card_number = decrypt(encrypted_data, decryption_key)
    
    # Use the original data as needed
    process_refund(original_card_number)
```

Key points:
1. The card number is encrypted immediately upon capture.
2. Only the encrypted version is sent for tokenization.
3. The token vault stores encrypted data, not plain text.
4. Decryption only happens when absolutely necessary and in a secure environment.

This approach provides several benefits:
- If the merchant's system is breached, only tokens are exposed, not real card numbers.
- If the token vault is somehow compromised, the attacker still only gets encrypted data.
- The original data is protected by two separate systems (encryption and tokenization).

In a real-world scenario, the encryption and tokenization processes would be much more complex and would follow strict security standards like those set by PCI DSS (Payment Card Industry Data Security Standard).

#### 7.2.2 The cloak room and the treasure chest

1. The credit card data is the valuable item you want to protect.
2. Encrypting the data is like putting it in a locked treasure chest. Only someone with the key (encryption key) can open it and see the contents.
3. The locked treasure chest (encrypted data) is then taken to a secure cloak room (the token vault).
4. The cloak room attendant (tokenisation service) doesn't have the key to the chest and can't see what's inside.
5. The attendant gives you a claim ticket (the token) with a unique number.
6. You can use this claim ticket for your transactions, without carrying around or exposing the actual valuable item.
7. If you need to access the original item (like for a refund), you present the claim ticket, and only then does an authorised person retrieve the chest and unlock it.

This analogy works well because it illustrates several important points:

- The valuable data (card number) is protected twice: once by the lock (encryption) and again by being stored in a secure location (tokenisation).
- The token (claim ticket) itself doesn't contain or reveal any sensitive information.
- Even if someone steals the claim ticket, they can't use it to directly access the contents of the chest.
- The actual sensitive data is kept in a secure, centralised location (the cloak room/token vault).
- Only authorised entities can retrieve and decrypt the original data when absolutely necessary.

To extend the analogy a bit further:

- Different merchants would be like different customers using the same cloak room service.
- Each customer gets their own unique claim tickets, but the actual valuable items are all stored securely in the same back room.

### 7.2.3 Hardware Security Modules (HSM) for Encryption of Decryption

A physical/cloud computing device that safeguards and manages digital keys, performs encryption and decryption functions for digital signatures, strong authentication and other cryptographic functions.

Can be used for:

- Onboard secure cryptographic key generation and storage.
- Key management.
- Use of cryptographic and sensitive data material, performing encryption/digital signature.
- Provides both logical and physical protection.
- Verifying a user-entered PIN matches the reference PIN known to the issuer.
- Verifying credit/debit card transactions by checking card security codes.
- Re-encrypt a PIN block to send it to another auth host.
- Generate and print a "PIN mailer"
- Generate data for a magnetic stripe card (CVV, etc)

## 8 PCI DSS on Tokenisation

### 8.1 PCI DSS on Tokenisation Explored

- Tokens generally defined as single-use or multi-use (latter like Apply Pay etc).
- A single-use typically used for one transaction.
- A multi-use represents a specific PAN, and can be used to track it across multiple transactions.
- A multi-use token always maps a PAN value to the same token within the tokenisation system.
- Determining whether single-use or multi-use tokens, or a combination of both, are appropriate for a merchant environment will depend on the merchant's specific business need for retaining tokens.

### 8.2 Components of Tokenisation in PCI DSS

#### 1. Tokenization System Components

##### A. Token Characteristics

- Mathematically reversible cryptographic function
- Based on strong cryptographic algorithm and key
- Can be one-way non-reversible (e.g., PAN to token)

##### B. Token Generation

- Assigned through index function, sequence number, or random generation
- Original PAN recovery must not be computationally feasible
- Applicable to single-use and multi-use tokens

#### 2. Token Mapping

##### A. Process

- Assigns token to original PAN value
- Stores token and PAN in card data vault

##### B. Functionality

- Retrieves PAN or token when needed
- Access restricted to authorized individuals/systems

#### 3. Card Data Vault

##### A. Purpose

- Central repository for PAN and token storage
- Used by token mapping process

##### B. Security Considerations

- Must comply with PCI DSS requirements
- Prime target for attackers due to sensitive data

#### 4. Cryptographic Key Management

##### A. Functions

- Create, use, and manage keys/tokens
- Protect cryptographic keys for PAN data

##### B. Security Measures

- Keys for token generation not available outside secure system
- Compromise of keys affects all current and future tokens

#### 5. Deployment Considerations

- Participants use public key infrastructure
- Each entity has its own key for secure communication

#### Key Takeaways

1. Tokenisation enhances security by replacing sensitive data (PAN) with non-sensitive equivalents (tokens).
2. The token vault is crucial and must be heavily protected.
3. Cryptographic key management is essential for maintaining the integrity of the tokenization system.
4. PCI DSS compliance is mandatory for handling payment card data.
5. Understanding these components is vital for implementing secure digital payment systems.

### 8.3 Tokenisation Deployment Models

Examples of common deployments:

- On-prem or in-house solution that a merchant manages within its own IT infrastructure.
- Outsourced solution for which a merchant delegates management to a tokenisation service provider outside of the merchant's infrastructure and control.
- A hybrid solution that combines some on-prem components with some outsourced components.

For outsourced or hybrid, responsibility for ensuring some components comply with PCI DSS may be partially transferred from the merchant to the TSP.

Components of the tokenisation system that are managed by the service provider and are outside the control of the merchant should be certified by the PCI DSS.

### 8.4 Merchant Responsibilities in PCI DSS Tokenisation process 

The merchant should:

- Ensure that division of responsibility for protection of cardholder data is properly scoped and enforced.
- Verify the adequacy of any segmentation controls if these controls are not part of the supplied solution.
- Perform a risk assessment as part of the due diligence when selecting a tokenisation service provider.
- Ensure that proper contractual agreements are in place, with the TSP acknowledging that the TSP is responsible for the security of cardholder data processed, stored and/or transmitted by the service provider.
- Maintain and implement policies and procedures to manage the TSP, including monitoring their PCI DSS compliance status at least annually.
- Verify the solution supports and enforces PCI DSS and security policy requirements:
	- Data retention and disposal
	- Access control and auth
	- Usage policies
	- Vulnerability management
	- Logging, monitoring and alerting
- Review logs of the merchants interaction with the tokenisation systems and processes on a regular basis to ensure that only users and system components authorised by the merchant have access to the tokenisation/de-tokenisation processes.
- Ensure that adequate incident response and disaster recovery plans are in place for the possibility of loss or compromise of the tokenisation system.
	- Some strategies for remediation includes:
		- Rejecting de-tokenisation requests from potentially compromised systems.
		- Reissuing tokens.
		- Re-encrypting PANs in the data vault with new cryptographic keys.

## 9 A brief overview of Open Authorisation OAuth and Tokens

Access tokens and refresh tokens.

- **Access token**: used by applications to make API requests on behalf of a user. It represents authorisation of a specific app.
- **Refresh tokens**: are credentials used to acquire new access tokens. It has a longer shelf life.

OAuth is for machines "logging into" machines on behalf of humans. It's authorisation, not authentication.

## 10 Benefits of Tokenisation and Conclusion

- Allows merchants to securely keep credit cards on file to simplify future transactions.
- Enables new payment solutions such as online single-click checkout and wallets to use NFC.
- Reduces the scope of PCI DSS compliance by minimising the number of systems accessing credit card information.
- When centrally managed, it offers more cost-effective means of securing payment information.