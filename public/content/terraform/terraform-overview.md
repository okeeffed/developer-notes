---
name: Terraform
menu: Terraform 
---
# Terraform

## Course Content

```bash
# Use this to get the content
$ git clone https://github.com/wardviaene/terraform-course
```

## Useful Terraform Commands

```bash
$ terraform plan # plan
$ terraform apply # shortcut for plan and apply - avoid in production
$ terraform plan -out out.terraform # terraform and write the plan to out file
$ terraform apply out.terraform # apply terraform plan using out file
$ terraform show # show current state
$ cat terraform.tfstate
```

## What is Terraform?

- Infrastructure as **code**
- **Automation** of infrastructure
- Keep our infrastructure in a certain state (compliant)
  - e.g. 2 web instances with 2 volumes + 1 load balancer
- Make infrastructure **auditable**
  - You can keep your infrastructure change history in a **version control** system like GIT
- Terraform can automate provisioning of the **infrastructure itself**. 

## Installation of Terraform

Head onto the Terraform website, download the .zip file and then move the binary after unzipping into your path to access it from the CLI.

## Hello Terraform!

Example hello using Terraform to spin up an EC2 micro instance.

```kotlin
provider "aws" {
  access_key = "ACCESS_KEY_HERE"
  secret_key = "SECRET_KEY_HERE"
  region     = "ap-southeast-1"
}

resource "aws_instance" "example" {
  ami           = "ami-0d729a60"
  instance_type = "t2.micro"
}
```

To initialise and spin up the instance, run the following:

```bash
$ terraform init
$ terraform plan -out file.terraform
$ terraform apply file.terraform
$ terraform destory # tear down the instance
```

## Variables

To create variables, we create two files `provider.tf` and `vars.tf` that we can commit and one git ignored file `terraform.tfvars` to store these private variables in.

```kotlin
# provider.tf
provider "aws" {
    access_key="${var.AWS_ACCESS_KEY}"
    secret_key="${var.AWS_SECRET_KEY}"
    region="${var.AWS_REGION}"
}

# vars.tf
variable "AWS_ACCESS_KEY" {}
variable "AWS_SECRET_KEY" {}
variable "AWS_REGION" {
    default = "ap-southeast-2"
}

# terraform.tfvars
AWS_ACCESS_KEY=""
AWS_SECRET_KEY=""
AWS_REGION=""
```

For env vars: Terraform will read environment variables in the form of `TF_VAR_name` to find the value for a variable. For example, the `TF_VAR_access_key` variable can be set to set the `access_key` variable.

### Lookup examples

```kotlin
# instance.tf
resource "aws_instance" "example" {
  ami           = "${lookup(var.AMIS, var.AWS_REGION)}"
  instance_type = "t2.micro"
}

# provider.tf
provider "aws" {
    access_key = "${var.AWS_ACCESS_KEY}"
    secret_key = "${var.AWS_SECRET_KEY}"
    region = "${var.AWS_REGION}"
}

# vars.tf
variable "AWS_ACCESS_KEY" {}
variable "AWS_SECRET_KEY" {}
variable "AWS_REGION" {
  default = "eu-west-1"
}
variable "AMIS" {
  type = "map"
  default = {
    us-east-1 = "ami-13be557e"
    us-west-2 = "ami-06b94666"
    eu-west-1 = "ami-0d729a60"
  }
}

# terraform.tfvars
AWS_ACCESS_KEY=""
AWS_SECRET_KEY=""
AWS_REGION=""
```

For info on which ami results from where, checkout https://cloud-images.ubuntu.com/locator/ec2/.

## Software Provisioning

There are 2 ways to provision software:

1. Build your own custom AMI (ie Packer).

2. Another way is to be standardized AMIs and then install the software you need on it: 

   - Use file uploads

   - Use remote exec
   - Use automation tools like chef, puppet, ansible

### File Uploads

```kotlin
# instance.tf
resource "aws_instance" "example" {
  	ami           = "${lookup(var.AMIS, var.AWS_REGION)}"
  	instance_type = "t2.micro"
    
    provisioner "file" {
        source = "app.conf"
        destination = "/etc/myapp.conf"
    }
}
```

The provisioner will have to use SSH etc.

Another example with the connection:

```kotlin
# instance.tf
resource "aws_instance" "example" {
  	ami           = "${lookup(var.AMIS, var.AWS_REGION)}"
  	instance_type = "t2.micro"
    # IF SSH
    key_name = "${aws_key_pem.mykey.key_name}"
    # ENDIF
    
    provisioner "file" {
        source = "app.conf"
        destination = "/etc/myapp.conf"
        # ! FOR PASSWORD
        connection {
            user = "${var.instance_username}"
            password = "${var.instance_password}"
        }
        
        connection {
            user = "${var.instance_username}"
            private_key = "${file(${var.path_to_private_key})}"
        }
    }
    
    # IF YOU UPLOAD A .sh FILE AND WANT TO RUN IT
    provisioner "remote-exec" {
        inline = [
            "chmod +x /path/to/script.sh",
            "/path/to/script.sh arguments"
        ]
    }
}
```

## Attributes

## State

Terraform keeps state in `terraform.tfstate`.

To configure, you add a file `backend.tf`:

```kotlin
terraform {
    # IF Consul
    backend "consul" {
        address = "demo.consul.io" # host name of consul cluster
        path = "terraform/myproject"
    }
    
	# ELSEIF S3
    backend "s3" {
        bucket = "bucket"
        key = "terraform/myproject"
        region = "ap-southeast-2"
    }
    
    #ENDIF
}
```

`$ terraform init` will do what you require for it all to work.

## Data Sources

Provide you with dynamic information.

- A lot of data is available by AWS in a structured format using their API
- Terraform also exposes this info using data sources.

Examples include the list of AMIs, list of AZs etc.

```kotlin
# provider.tf
provider "aws" { 
    region = "${var.AWS_REGION}"
}

# securitygroup.tf
data "aws_ip_ranges" "european_ec2" {
  regions = [ "eu-west-1", "eu-central-1" ]
  services = [ "ec2" ]
}

resource "aws_security_group" "from_europe" {
 name = "from_europe"

  ingress {
    from_port = "443"
    to_port = "443"
    protocol = "tcp"
    cidr_blocks = [ "${data.aws_ip_ranges.european_ec2.cidr_blocks}" ]
  }
  tags {
    CreateDate = "${data.aws_ip_ranges.european_ec2.create_date}"
    SyncToken = "${data.aws_ip_ranges.european_ec2.sync_token}"
  }

}

# vars.tf
variable "AWS_REGION" {
  default = "eu-west-1"
}
variable "AMIS" {
  type = "map"
  default = {
    us-east-1 = "ami-13be557e"
    us-west-2 = "ami-06b94666"
    eu-west-1 = "ami-844e0bf7"
  }
}
```

## Templates

Can help create **customized configuration files**.

## Modules

Help to make your terraform more organised. 

You can also use third party modules (like modules from Github).

It also helps to **reuse** parts of your code (eg set up network in AWS - VPC).

```kotlin
# Install form git
module "module-example" {
    source = "github.com/wardviaene/terraform-module-example"
}

# Use module from local folder
module "module-example" {
    source = "./module-example"
}

# A module passing arguments 
module "module-example" {
    source = "./module-example"
    region = "us-west-1"
    ip-range = "10.0.0.0/8"
    cluster-size = "3"
}
```

Inside of the module folder, you can also have Terraform files:

```kotlin
# module-example/vars.tf
variable "region" {}
variable "ip-range" {}
variable "cluster-size" {}

# module-example/cluster.tf
resource "aws_instance" "instance-1" { ... }
resource "aws_instance" "instance-2" { ... }
resource "aws_instance" "instance-3" { ... }

# module-example/output.tf
output "aws-cluster" {
    value = "${aws_instance.instance-1.publicip}"
}
```

You use the output from the module in the main part of your code!

```kotlin
output "some-output" {
    value = "${module.module-example.aws-cluster}"
}
```

### Downloading a module

```kotlin
terraform get # this will fetch the modules and store it in .terraform/modules/
```

## Terraform Command Overview

| Command                           | Description                                                                                                           |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| terraform apply                   | Applies state.                                                                                                        |
| destroy                           | Destroys all Terraform managed state.                                                                                 |
| fmt                               | Rewrite terraform config files to canonical format and style.                                                         |
| get                               | Download and update modules.                                                                                          |
| graph                             | Create a visual representation of a configuration or execution plan.                                                  |
| `import <options> <ADDRESS> <ID>` | Find infrastructure resource identified with ID and import the state into terraform.tfstate with resource id ADDRESS. |
| `output <options> <NAME>`         | Output any of your resources.                                                                                         |
| plan                              | Show changes made to infrastructure.                                                                                  |
| refresh                           | Refresh the remote state. Can identify differences between state file and remote state.                               |
| remote                            | Configure remote state storage.                                                                                       |
| show                              | Show human readable output from a state or a plan.                                                                    |
| state                             | Used for advanced state management eg rename resource                                                                 |
| taint                             | Destroy and recreate resource.                                                                                        |
| validate                          | Validate terraform syntax.                                                                                            |
| untaint                           | Undo a taint.                                                                                                         |

## 

