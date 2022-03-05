---
name: AWS IoT
menu: AWS
---

# AWS IoT Overview

AWS IoT Allows for secure, two-way comms between AWS and IoT sensors, actuators, embedded micro-contollers or smart appliances.

Allows you to colelct and analyze data from multiple devices and create applications that enable users to control these devices.

We can connect the IoT devices using the SDKs provided by AWS. The device connection over MQTT or HTTP happens thanks to the IoT Device Gateway.

## Registering a Thing

The Thing registry is used to keep track of all your Internet-connected things so you can interact with them efficiently from applications and other devices. Examples of what you can do:

- Create things by registering them inside your thing registry
- List things to keep track of the things within your AWS account or region
- Search for things to help find things by name or by type of thing
- Update a thing to update the information stored about your thing
- Describe things to see the relevant information about a thing
- Delete a thing to remove the thing from the device registry

## Thing Types

IoT also allows you to use "thing types" to store config info that is the same for all things associated with that thing type.

Each thing type can have:

- Different values specific to the thing in question
- Up to 50 attributes
- only one thing associated
- no limit to the total number associated with an AWS account

## Thing Groups

