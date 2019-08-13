---
name: Secure Sockets Layer
menu: Networking
---

# Secure Sockets Layer

## Cryptography

Cryptography is the computerized `enciphering` and `deciphering` of information.

### Greek Roots

Greek roots translate to "hidden writing".

- Kyptos (Hidden): Some words we derive from `kryptos`: `crypt` or `cryptic`
- Graphein (Writing): Some words we derive from `graphein`-graphy (photography, calligraphy), `graphite`

## Why do we use cryptography?

- Confidentiality
- Integrity
- Authenticity
- Non-Repudiation (used in transactional exchanges to assure both the sender and receiver of the other's status in the exchange)

## Symmetric Encryption

Algorithms:

1. DES
2. 3DES
3. AES (Rinjdael)
4. Blowfish

- Uses same key for both encryption and decryption
- The main issue with symmetric encryption is that keys have to be shared between parties, usually across a public medium

## Asymmetric Encryption

Algorithms:

1. Diffie-Hellman
2. RSA
3. ECC

Employs two keys - one is used for encryption, and the other is used for decryption.

It was developed to counteract the major issue with symmetric encryption: key distribution.

## Diffie-Hellman

Attempt at solving symmetric key issues by Dr. Diffie and Dr. Hellman.

First asymmetric key exchange.

Both users in an exchange agree on a shared private key. There's a complex algorithm associated with it, but the basis is that if you know your key, you can then decrypt the message.

For instance, if my key is 367 and yours is 235, we end up wwith `367 x 235 = 86245`.

## RSA

Created by Ron Rivest, Adi Shamir, Leonard Adleman (hence the RSA from last names).

Widely used today for **secure data transmissions**.

In RSA, each user has a widely available public key as well as a secret private key.

When sending a message, the sender uses the receiver's public key to encrypt that message.

The only key that can be used to decrypt that message is the receiver's private key.

## Public Key Infrastructure (PKI)

1. Assymetric Encryption: Used for transactional exchanges. Not any specific technology but rather a framework based on asymmetric technologies.
2. Certificates: Issued by a certificate authority (CA)
3. Provides: Confidentiality, authenticity, integrity and nonreudiation.

## Certificate Authority (CA)

Job is to:

1. Issue keys
2. Distribute keys
3. Manage keys
4. Revoke keys

## Sending Encrypted Mail

Order of operations:

1. Exchange public keys
2. Sender encrypts with receiver's public key
3. Receiver decrypts with their private key
4. If the encrypted message is intercepted, it cannot be opened without receiver's private key
