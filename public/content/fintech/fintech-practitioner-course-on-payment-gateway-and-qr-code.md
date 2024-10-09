---
menu: FinTech
name: "FinTech: Practitioner Course on Payment Gateway and QR Code"
---
## Links and resources

- https://udemy.com/course/payment-gateway-business-for-e-commerce-anything-finance-org/learn/lecture/20325207#content 
## 1 Overview of Payment Gateway business

A **Payment Gateway** is a third-party between merchants and customers that securely takes the money from customers and sends it to the merchant's bank account.

### 1.1 Payment Gateway business concepts to cover and key terms

- Works for mobile, tablet, desktop etc.
- It's a bank, third-party or directly scheme driven. This normally changes depending on which part of the world you are. 
- Payment Gateway Business is predicted to increase.
- The risks are increasing. Examples to prevent this:
	- PCI DSS
	- EMV Co
	- VeriSign
- Be aware of risks and liquidity position.
- Merchant selection, chargeback.
- Choose an integration model that suits.
- Smart algorithms, keep updating.
- Smart negotiation and strategies

## 2 Payment Gateway Ecosystem, Parties, Types and Flow

### 2.3 Parties involved in a Payment Gateway Transaction 

The parties involved:

1. Customer
2. Online business/Merchant
3. Payment service provided/Payment Gateway
4. Acquiring bank/Entity
5. Scheme and Switch
	1. Scheme: Visas, Mastercard etc
	2. Switch: Helps to switch payments between acquirer/issuer
6. PCI DSS, EMV Co, Verisign and other security certifications
7. Issuer Bank/Entity

The payment gateway can also be a bank instead of a third party, meaning it's possible that the acquirer and/or issuer also operates as the payment gateway in the transaction.

#### Security Certifications: PCI DSS, EMV Co, and Others

In payment processing, multiple security certifications are often used to ensure the safety and integrity of transactions. Here's how they apply:

1. **PCI DSS (Payment Card Industry Data Security Standard)**:
    
    - **Purpose**: Ensures that all companies that process, store, or transmit credit card information maintain a secure environment.
    - **Application**: PCI DSS compliance is mandatory for any entity handling payment card data. This includes merchants, payment gateways, acquiring banks, and service providers. The standard encompasses a range of requirements, including network security, encryption, access control, and monitoring.

1. **EMV Co (Europay, Mastercard, and Visa)**:
    
    - **Purpose**: EMV is a global standard for cards equipped with computer chips and the technology used to authenticate chip-card transactions.
    - **Application**: EMV certification ensures that the hardware and software used by merchants and banks can securely process chip-based card transactions. It helps prevent card fraud by using dynamic data with each transaction, making it difficult for counterfeit cards to be used.

1. **Other Security Certifications**:
    
    - **VeriSign/Symantec SSL Certificates**: Used to secure the communication between the user's browser and the merchant’s server through HTTPS. This prevents data interception during the transmission process.
    - **3-D Secure (3DS)**: This protocol adds an additional layer of security for online credit and debit card transactions. It involves the cardholder entering a password or another form of authentication, provided by the issuing bank, during the transaction.
    - **Tokenization**: While not a certification, tokenization replaces sensitive card information with a unique identifier or token, which can be used to process payments without exposing the actual card details. This reduces the risk of data breaches.

### How They Apply to the Transaction

- **PCI DSS**: Protects the entire lifecycle of card data processing, ensuring that all entities in the transaction chain adhere to stringent security practices.
- **EMV Co**: Ensures that physical card transactions (especially in-person) are secure, reducing the risk of fraud through counterfeit cards.
- **SSL/TLS Certificates**: Protects data in transit between the customer and merchant during the online transaction.
- **3-D Secure**: Adds an additional layer of customer authentication during the transaction, making it harder for unauthorized users to complete transactions.
- **Tokenization**: Reduces the risk of sensitive data exposure by replacing card details with tokens during the transaction process.

These certifications and security measures work together to ensure the integrity and security of payment transactions, protecting all parties involved from fraud and data breaches.

### 2.4 Types of PG transactions

#### Party and card presentment basic transations

1. **Issuing Bank**: The bank that issues the payment card to the customer (e.g., ABC Bank).
2. **Acquiring Bank**: The bank that holds the merchant's account where transaction settlements are made (e.g., XYZ Bank).
3. **On-Us Transaction**: A transaction where both the issuing bank and acquiring bank are the same. It involves less processing as the transaction is handled within the same bank.
4. **Off-Us Transaction**: A transaction where the issuing bank and acquiring bank are different. This type of transaction requires routing through card schemes like Visa or MasterCard.
5. **Card-Not-Present Transaction**: A transaction where the physical card is not presented to the merchant, commonly occurring in online or remote purchases. These transactions have a higher risk of chargebacks and disputes due to potential fraud.
6. **Card-Present Transaction**: A transaction where the physical card is presented to the merchant, typically in-person at a point-of-sale (POS) terminal. These transactions are generally considered more secure than card-not-present transactions.
7. **Chargeback**: A demand by the issuing bank for the acquiring bank to refund the transaction amount to the customer, often due to disputes or fraud, particularly prevalent in card-not-present transactions.
8. **Card Scheme**: A network like Visa or MasterCard that facilitates the processing of off-us transactions between different banks.

### 2.6 Three Tiers and Transaction Flow

1. **Three-Tier Computing Model**:
   - **Presentation Layer**: The user interface that customers interact with on a website, such as Amazon's web page.
   - **Application Layer**: The backend code and logic that processes user interactions, such as clicking a button on the website.
   - **Database Layer**: The storage layer where customer information, transaction details, and payment gateway keys are stored.
2. **Transaction Flow in Payment Gateway**:
   - The sequence of steps a payment goes through from initiation to completion, involving multiple parties.
   - An example flow: Customer -> Merchant's store client -> Payment gateway -> acquirer -> scheme/switch -> issuer
1. **Payment Gateway**:
   - A service that processes transactions between the customer's bank (issuing bank) and the merchant's bank (acquiring bank). It performs security checks and routes the transaction details.
2. **Acquiring Bank**:
   - The bank that processes transactions on behalf of the merchant, receiving payment details from the payment gateway.
3. **Issuing Bank**:
   - The bank that issues the payment card to the customer, authorizing the transaction.
4. **Card Scheme**:
   - Networks like Visa, MasterCard, Amex, etc., that facilitate transactions between different banks, particularly in off-us transactions.
5. **Switch**:
   - A system that routes transactions between banks and card schemes.
6. **POS (Point of Sale) Machine**:
    - A physical device used in stores to process card transactions, analogous to a payment gateway for online transactions.
7. **Card-Present Transaction**:
    - A transaction where the customer physically presents their card at a POS machine.
8. **Card-Not-Present Transaction**:
    - An online transaction where the card is not physically presented, posing a higher risk of fraud.
9. **Chargeback**:
    - A reversal of funds initiated by the issuing bank, typically due to disputes or fraud in a transaction.

## 3 PCI DSS (Payment Card Industry Data Security Standard) Integration Models

### 3.6 Five integration models

1. **Integration Models for Payment Gateways**:
   - **Proprietary or Custom Developed Shopping Cart or Payment Application**:
     - The organization develops its own payment gateway application within its website, rather than outsourcing to a third party.
   
   - **Merchant Managed Commercial Shopping Cart or Payment Application**:
     - The merchant manages the shopping cart and payment process independently on their website.

   - **Third Party with Direct Post**:
     - A third party manages the payment process on behalf of the merchant, directly posting the payment details to the server without altering the main website.

   - **Third Party with Inline Frames (iFrame)**:
     - An inline frame is embedded within the merchant's website, displaying a third-party payment system that processes transactions without disrupting the main website.

   - **Third Party Hosted Payment Page**:
     - The payment process is hosted on a third-party website. The customer is redirected to this external payment page to complete the transaction and is then returned to the merchant’s website.

#### Summary

These integration models highlight the various ways in which payment gateways can be incorporated into e-commerce platforms, ranging from fully customized, in-house solutions to outsourced, third-party services. Understanding these models is crucial for selecting the right approach based on business needs, technical capabilities, and customer experience considerations.

### 3.9 Third party with direct post

In this scenario, the cardholder data goes to a third-party service provider that is not a Payment Gateway or the merchant.

### 3.10 Third-party with inline frames

How does this iFrame work? It's related to taking payments through a web page. In this model, the cardholder details entered in the iFrame section of the website is passed through to the service provider (third-party) which forwards it to a payment gateway.

### 3.11 Third-Party Hosted Payment Page

In this scenario, there is a link clicked where the user can enter the details. You could think of something like Stripe Checkout in this scenario where the user redirects to the checkout page.

## 5 Chargebacks and refunds

### 5.12 Chargebacks and refunds

