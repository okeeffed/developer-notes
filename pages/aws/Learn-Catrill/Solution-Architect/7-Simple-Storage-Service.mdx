# 7: Simple Storage Service

## Encryption 101

### Encryption Approaches

- Encryption at rest: protects against physical theft and physical tampering. An example is laptop encryption.
- Encryption in transmit: protecting data as it is transferred between two places. Think of encrypting a message as it is being sent over the internet to the bank and the bank encrypting a message to send back to you. Usually used when multiple systems are involved.

### Encrpytion Concepts

- Plaintext: Unencrypted data. Could be a document but could also be an image or app.
- Algorithm: Blowfish, AES, RC4, DES, RC6, RC6.
- Key: A secret phrase or password.
- Ciphertext: Encrypted data that is the output of plaintext and a key.

Encryption uses an algorithm to take plaintext and a key to output ciphertext.

Decrytion takes ciphertext and a key to output plaintext.

### Symmetric Encryption

Symmetric encryption uses the same key to encrypt and decrypt.

It is great for local file encryption or disk encryption, but not great for transferring between two parties.

### Asymmetric Encryption

Asymmetric encryption uses a public key to encrypt and a private key to decrypt. They are two separate keys.

The public key is fine to share with others, but the private key is not. If a third-party obtains the shared public key, then they cannot decrypt the data.

Used for pgp, ssh, ssl/tls and other secure protocols.

It is computationally expensive to do, so normally asymmetric encryption is used to help share symmetric keys.

### Signing

Another process that uses asymmetric keys is **signing**.

How does the party without the private key know that the sender is who they claim to be?

What you can do is use **signing**. The party with the private key can use that key to sign a message that it sends back.

Once the other party receives the signed message, they can verify that the message was sent by using the public key to prove the message was signed by the private key.

Signing is used to verify identity.

### Steganography

Sometimes encryption isn't enough. The problem is that when you encrypt data, people can tell that you've encrypted the data. Steganography addresses this.

If you've ever used that invisible ink that only displays under a certain light, then that is an example of using steganography.

With steganography, a party with the public key could encrypt some plaintext and hide it within an image and send the image to the other party. The party with the private (knowing about the data within the image) can extract the data and then decrypt the message with a private key.

Steganography increases the file size but it would look almost identical. It is another level of protection.

## Key Management Service

KMS as a product isn't too complicated to understand, but it is used heavily by other AWS services.

- It is a Regional & Public Service.
- Create, Store and Manage Cryptographic Keys.
- Capable of using both Symmetric and Asymmetric Keys.
- Can perform cryptographic operations (encryption, decryption and more) on data.
- With KMS, keys never lease KMS
- Provides FIPS 140-2 Level 2 Security compliant service.

KMS mainly manages CMKs (Customer Master Keys).

- CMKs are used within cryptographic operations.
- CMKs are logical: contain for the actual, physical master keys. Contains ID, date, policy, description and state.
- All CMKs are back by physical key material.
- Generated or imported.
- CMKs can be used for direct encryption/description up to 4KB of data.

### KMS and CMKs

- A user runs `CreateKey` on KMS to create a CMK. CMKs are never stored in a persistent form when not encrypted.
- The user may request some data for be encrypted with the CMK using the `Encrypt` call.
- CMK will decrypt the persistent key, then use that to encrypt the data and send back to the user.
- At some time later, the user will use the `Decrypt` call and pass the ciphertext into KMS.
- KMS will decrypt the CMK and use the CMK to decrypt the ciphertext and return that decrypted data back to the user.

> At no point does the CMK leave KMS and at no point is the CMK persisted to disk unencrypted. At every step, the user need the permissions to use the key (i.e. can `CreateKey`, `Encrypt` and `Decrypt`). This is known as role separation.

### Data Encryption Keys (DEKs)

- KMS can also generate these keys (DEKs) using a CMK with `GenerateDataKey`.
- DEK can encrypt files > 4KB.
- KMS does not store DEKs. It provides it to you and then discards it. You are the one that needs to use the key to encrypt/decrypt data.

When KMS generates the key, it provides you with two versions of it:

1. Plaintext Version: Unencrypted version.
2. Ciphertext Version: Encryted version (by the CMK).

The idea is that you want to encrypt the data using the plaintext key provided, then discard the plaintext version of that key.

This leaves you with the ciphertext version of the key and the encrypted data. You want to store the encrypted key with data.

To decrypt the data, you do the following:

1. Pass the ciphertext version of the key to KMS and request it to decrypt the key.
2. Use the returned plaintext version of the DEK to decrypt the data.
3. You discard the plaintext version of the DEK.

### Key concepts

- CMKs are isolated to a region and never leave.
- Two types of CMKs: AWS Managed or Customer Managed.
- Both types of keys support key rotation. This is always set for AWS Managed, but Customer managed is possible (for once a year).
- CMK itself contains the current backing key as well as previous backing keys.
- You can also have aliases for CMKs. That way, an app can use an alias (which is also per region).

### Key Policies

- Key policy is a type of resource policy.
- Every CMK has a policy. Can be edited for Customer Managed Keys.
- For IAM to work, IAM must be trusted by the account and the account must be trusted by the key.

### Demo Encryption

After creating a CMK and adding the correct policies to enable a specific user to encrypt/decrypt data, you can use the following to demo the process:

```s
# Shared
echo "find all the doggos, distract them with the yumz" > battleplans.txt


Windows Commands

aws kms encrypt --key-id alias/catrobot --plaintext fileb://battleplans.txt --output text --profile iamadmin-general --query CiphertextBlob > battleplans.base64

certutil -decode battleplans.base64 not_battleplans.enc

aws kms decrypt --ciphertext-blob fileb://not_battleplans.enc --output text --profile iamadmin-general --query Plaintext > decreyptedplans.base64

certutil -decode decreyptedplans.base64 decryptedplans.txt



# Linux/macOS commands

aws kms encrypt \
    --key-id alias/catrobot \
    --plaintext fileb://battleplans.txt \
    --output text \
    --query CiphertextBlob \
    --profile iamadmin-general | base64 \
    --decode > not_battleplans.enc

aws kms decrypt \
    --ciphertext-blob fileb://not_battleplans.enc \
    --output text \
    --profile iamadmin-general \
    --query Plaintext | base64 --decode > decryptedplans.txt
```

## Object Encryption

This is around encryption within S3.

A common misconception: buckets aren't encrypted. Objects are.

Every object can be using different encryption methods.

- Client-Side encryption: the user encrypts the data and ciphertext is uploaded.
- Server-Side encryption: the server encrypts the plaintext data at the S3 endpoint.

Both are encryption-at-rest.

With client-side encryption, you need to deal with the keys, process and tooling yourself.

With server-side, you have three types of encryption available:

1. SSE-C: Server-Side Encryption with Customer-Provided Keys.
2. SSE-S3: Server-Side Encryption with Amazon S3-Managed Keys.
3. SSE-KMS: Server-Side Encryption with AWS Key Management Service using Customer Master Keys.

There are two components to server-side encryption that all three of these handle differently:

1. The encryption/decryption process itself.
2. The generation and management of the cryptographic keys.

- SSE-C: Customer manages keys, S3 manages encryption. The and key must be provided. When retrieving the object, you need to provide the S3 Endpoint with the key again.
- SSE-S3 (ASE256): S3 manages keys, S3 manages encryption. S3 uses a Master Key, then generates a key specifically for each object that encrypts the object and then the master key encrypts the generated key while the plaintext key is discarded.
- SSE-KMS: S3 + KMS manages keys, S3 manages encryption. Similar to SSE-S3 except that instead of the master key, a AWS managed Customer Master Key is used. KMS generates a DEK for each object to be encrypted.

### Problems that arise with SSE-S3

SSE-S3 is not the right choice if you need any of the following:

1. If you're in a regulatory environment and need to control the keys that are used and control access to those keys.
2. If you need to control key rotation.
3. If you need role separation.

### Things you get with SSE-KMS

- There is role based separation: If you don't have access to KMS, then you cannot access the object.
- You don't need to use the default CMK that KMS creates. You can create and use a Customer CMK.
- CloudTrail can also see any calls made again the Customer CMK.

### Overview

| Method      | Key Management | Encryption Processing | Extras                            |
| ----------- | -------------- | --------------------- | --------------------------------- |
| Client-Side | You            | You                   | -                                 |
| SSE-C       | You            | S3                    | -                                 |
| SSE-S3      | S3             | S3                    | -                                 |
| SSE-KMS     | S3 & KMS       | S3                    | Rotation Control, Role Separation |

### Bucket Default Encryption

When making a PUT request to upload the object, you can use the `x-amz-server-side-encryption` header to specify the encryption method.

You need to specify the header.

The value for SSE-S3 is `AES256` and for SSE-KMS `aws:kms`.

There is also a feature that can be set on a bucket for a default encryption. The bucket default is just that - a default. The header takes priority.

> You can use a bucket policy to restrict the type of encryption required on a bucket.
