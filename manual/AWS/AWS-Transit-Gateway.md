---
menu: AWS
name: AWS Transit Gateway
---

# AWS Transit Gateway

As AWS infrastructure grows is can become distributed and complex. Common challenges include:

1. Inability to create transitive relationships
2. A lack of edge-to-edge routing meaning any VPN will have to be connected directly to each VPC that it needs connectivity with
3. A complex management structure with no centralized management point

## Transit Gateway Overview

TG takes complex and distributed infrastructures and simplifies them into a hub-spoke model.

## Transit Gateway Benefits

- Only a single connection is required from each VPC, VPN and Direct Connect connection. This simplifies scalability.
- Transit Gateway is used as a hub that controls how traffic is routed between all connected networks.
- Management connectivity is simplified.
- Routes from connected VPCs/networks can be automatically propagated to Transit Gateway. Transit Gateway maintains a routing table with routes for all connected networks. Static and Dynamic routing are supported.
- Equal Cost Multipath (ECMP) is supposed between on-premises gateway connections, enabling load balancing over multiple paths. ECMP can be used to aggregate bandwidth.
- Currently, 5 Transit Gateways per account are supported, and a single VPC can have a maximum of 5 Transit Gateway attachments. Other TG limits include 5000 attachments, 1.25 Gbps per VPN, 50 Gbps maximum bandwidth per VPC, and up to 10000 routes.
- Transit gateway routes do not propagate to VPC route tables. Entries must be made manually.
- Overlapping CIDRs are not support.

![Transit Gateway overview](https://res.cloudinary.com/gitgoodclub/image/upload/v1563922441/developer-notes/Screen_Shot_2019-07-24_at_8.53.23_am.webp)
