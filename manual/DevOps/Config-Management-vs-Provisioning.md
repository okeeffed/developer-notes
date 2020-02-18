---
menu: DevOps
name: Configuration Management vs Infrastructure Provisioning
---

# Configuration Management vs Infrastructure Provisioning

## Resources

1. [ThoughtWorks blog](https://www.thoughtworks.com/insights/blog/why-configuration-management-and-provisioning-are-different)
2. [TechiDnyan blog](http://www.neeleshgurjar.co.in/think-before-using-configuration-management-tools-for-infrastructure-provisioning/)
3. [Configuration management](https://www.digitalocean.com/community/tutorials/an-introduction-to-configuration-management)

## What to know

> Configuration management (CM) is a systems engineering process for establishing and maintaining consistency of a product's performance, functional, and physical attributes with its requirements, design, and operational information throughout its life. - Wikipedia

Configuration management helps for the configuration of the software that will be running in an operating system ie Nginx installation + its config.

Infrastructure provisioning is the process of automating and provisioning hardware instances to run your software on. Example being the ability to automate the provisioning of EC2 instances on AWS.

Configuration management SHOULD NOT be used for infrastructure provisioning.

Benefints that infrastructure provisioning has over config management:

1. Maintaining state: if traffic increases, IP can accommodate the scaling to suite. Config management cannot.
2. Rollbacks are hard: CM can sometimes accommodate a tear down, but not a rollback. Rollbacks with infrastructure provisioning come for free as part of the state management.
