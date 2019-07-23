---
menu: Protocols
name: Border Gateway Protocol
---

# Border Gateway Protocol

Standardized `exterior gateway protocol` design to exchange routing and reachability information among `autonomous systems` (AS) on the Internet.

Classified as a `path vector protocol`.

The BGP makes routing decisions based on path, network policies, or rule-sets configured by a `network administrator` and is involved in making core routing decisions.

BGP may be used for routing within an autonomous system. In this application it is referred to as Interior Border Gateway Protocol, Internal BGP, or iBGP. In contrast, the Internet application of the protocol may be referred to as Exterior Border Gateway Protocol, External BGP, or eBGP.

## Operation

`Peers` (BGP neighbours) are established by manual configuration among routes to creates a Transmission Control Protocol (TCP) session on port 179. A BGP speaker sends 19-byte keep-alive messages every 60 seconds to maintain the connection. Among routing protocols, BGP is unique in using TCP as its transport protocol.

How routes are propagated can be controlled in detail via the `route-maps` mechanism. This mechanism consists of a set of rules. Each rule describes, for routes matching some given criteria, what action should be taken. The action could be to drop the route, or it could be to modify some attributes of the route before inserting it in the `routing table`.
