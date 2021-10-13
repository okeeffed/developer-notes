# 7: KMS and Encryption On AWS

## KMS 101

- Managed service that makes it easy for you to create and control encryption keys used to encrypt your data.
- Seamlessly integrated with many AWS services to make encrypting data in those services as easy as checking a box.
- Simple to encrypt data with encryption keys that you manage.

Use KMS whenever you are dealing with sensitive information.

Familiar services it integrates with:

- S3
- RDS
- DynamoDB
- Lambda
- EBS
- EFS
- CloudTrail
- Developer Tools

### What is a Customer Master Key (CMK)?

- Encrypt/decrypt data up to 4KB.
- Generate/encrypt/decrypt the data key.
- Data Key: use to encrypt/decrypt data.
- Using the DK to encrypt data is known as Envelope Encryption.

### CMK Demo

1. First of all, users are created to use with CMK (`myKeyManager` and `myKeyUser`).
2. Once creating a CMK in KMS, you have a choice for symmetric and asymmetric keys.
3. When creating it, we have to define you can administer the key. Here you selected user like `myKeyManager`.
4. When setting who can use the key, the demo added it to user `myKeyUser`.
5. A key resource policy is create (KSP) which is similar to an IAM policy.

> Note: KMS is a regional service.

## CMK Summary

- Alias: to refer to the CMK
- There is a creation data with the CMK.
- Key State for the state of the key i.e. `Enabled`, `Disabled`, etc.
- Key Material: Custmer-provided or AWS-provided.
- Stays inside KMS: Can never be exported.
- You can add your own description to describe the CMK.
- Key Admin Permissions: who can administer (but not use) the key through the KMS API.
- Key Usage Persmissions: IAM users and roles that can user the key to encrypt/decrypt data.

## Understanding KMS API Calls

This is a demo that does the following:

1. Using the previously made CMK.
2. Launched an EC2 instance (same region as CMK).
3. SSH into the instance.
4. Echo a value into `secret.txt`.
5. `aws configure` to configure the EC2 AWS CLI with `myKeyUser`.

Some examples of the commands demo'd:

```sh
aws kms encrypt --key-id YOURKEYIDHERE --plaintext fileb://secret.txt --output text --query CiphertextBlob | base64 --decode > encryptedsecret.txt
aws kms decrypt --ciphertext-blob fileb://encryptedsecret.txt --output text --query Plaintext | base64 --decode > decryptedsecret.txt
aws kms re-encrypt --destination-key-id YOURKEYIDHERE --ciphertext-blob fileb://encryptedsecret.txt | base64 > newencryption.txt
aws kms enable-key-rotation --key-id YOURKEYIDHERE
aws kms get-key-rotation-status --key-id YOURKEYIDHERE
aws kms generate-data-key --key-id YOURKEYIDHERE --key-spec AES_256
```

> `YOURKEYIDHERE` comes from the CMK key ID.

Note: a data key is required to encrypt anything over 4KB.

## Exploring Envelope Encryption

Envelope encryption is the practice of encrypting plaintext data with a data key, and then encrypting the data key under another key.

It's a process for encrypting data, normally over 4KB.

The process:

1. Create a data key (aka envelope key).
2. Data key encrypts your data.
3. Data key is stored locally with data and not stored by KMS.

Using envelope encryption avoids sending all your data into KMS over the network.
