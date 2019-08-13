---
menu: Protocols
name: Address Resolution Protocol
---

# Address Resolution Protocol (ARP)

Used to find the hardware address of a device from its IP address. This is a necessary step in network communication which requires the physical MAC address to initiate communication.

- Media Access Control (MAC) Address: 48-bit address assigned during manufacturing but can manually adjusted.
- ARP Request: Message sent by host in order to obtain the physical address of the host it wishes to communicate with.
- ARP Response: Message sent in reply to an ARP request which contains the physical address of a device.
- Proxy ARP: Proxy ARP is when one device responds to ARP requests on behalf of another device that is not on that network.
- ARP Cache: Table of entries that exists on a device which contains physical MAC addresses and their corresponding IP addresses. This table is consulted in order to direct network communication to the correct physical address. If no entry exists for the recipient, an ARP request is sent to obtain the physical address.
  - Example entry: (192.168.100.20) at 02:2f:d5:26:f6:3a [ether] on eth0
