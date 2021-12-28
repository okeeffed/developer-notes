---
name: EKS Docker Setup
menu: Kubernetes
---

# EKS Docker Setup

Pull ubuntu latest image from Docker Hub.

## Starting the image

```shell
# Start the container
docker run -dit -p 8001:8001 -e "AWS_ACCESS_KEY=${AWS_ACCESS_KEY}" -e "AWS_SECRET_KEY=${AWS_SECRET_ACCESS_KEY}" -e "AWS_REGION=ap-southeast-2" --name eks ubuntu /bin/sh
# Confirm it is running
sudo docker ps
# Attach to container
sudo docker attach eks
# If you need to copy files to /root
docker cp folder/ mycontainer:/root
```

## Commit changes

```shell
sudo docker commit CONTAINER_ID ubuntu:TAG
```

## Installation

If you haven't saved an updated container, follow this to install AWS CLI, Python3, `aws-iam-authenticator`, eksctl and kubectl. Note you might need to use `sudo`.

```shell
apt-get update
# Get AWS CLI
apt-get install awscli
apt-get install --reinstall groff-base # may be required is aws mentions it
apt-get install curl
# Install kubectl
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
chmod +x ./kubectl
mv ./kubectl /usr/local/bin/kubectl
# Install eksctl
curl --silent --location "https://github.com/weaveworks/eksctl/releases/download/latest_release/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
mv /tmp/eksctl /usr/local/bin
# Instal iam-aws-authenticator
curl -o aws-iam-authenticator https://amazon-eks.s3-us-west-2.amazonaws.com/1.11.5/2018-12-06/bin/linux/amd64/aws-iam-authenticator
chmod +x ./aws-iam-authenticator
cp ./aws-iam-authenticator /usr/bin/aws-iam-authenticator && export PATH=$HOME/bin:$PATH
# Enable color prompt
nano ~/.bashrc # uncomment section about bash
```
