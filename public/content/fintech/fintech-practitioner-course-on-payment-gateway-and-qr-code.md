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
