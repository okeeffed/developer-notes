# 18: Advanced VPC Networking

## VPC Flow Logs

An essential diagnostic tool for AWS VPCs.

- Only capture packet metadata data, NOT packet contents.
- Applied to a VPC - all interfaces in that VPC.
- Applied to Subnet - interfaces in that subnet.
- Applied to interface directly.
- VPC Flow Logs are NOT realtime.
- Can be configured to use S3 or CloudWatch Logs.

## Egress-Only Internet Gateway

Egress-Only internet gateways allow outbound (and response) only access to the public AWS services and Public Internet for IPv6 enabled instances or other VPC based services.

- Useful because all IPv6 addresses are public.
- Egress-Only Gateway is HA by default across all AZs in the region - scales as required.
- Default IPv6 Route `::/0` added to Route Tabe with `eigw-id` as `target`.

> Egress-only is what you want when you want to mimic the OUTBOUND-only functionality you would get with a NAT Gateway for IPv4 traffic.

## VPC Endpoints (Gateway)

- Provide private access to S3 and DynamoDB.
- Prefix List added to route table that uses the Gateway Endpoint as a target. A Prefix List is a set of logical resources.
- Highly Available (HA) across all AZs in a region by default.
- Endpoint policy is used to control what it can access (like a subset of S3 buckets).
- Regional - can't access cross-region services.
- Prevent Leaky Buckets - S3 Buckets can be set to private only by allowing access ONLY from a gateway endpoint.
- VPC Gateway Endpoints not accessible outside the VPC.

## VPC Endpoints (Interface)

Use roughly for the same thing as Gateway endpoints but how they are implemented can be radically different.

- Provide private access to AWS Public Services EXCEPT S3 and DynamoDB.
- Not highly available by default. They're interfaces within a specific subnet within a specific VPC.
- Network access controlled by Security Groups (something you can't do with the gateway).
- You can also add Endpoint Policies to restrict what can be done with the endpoint.
- TCP and IPv4 ONLY.
- Behind the scenes, it uses `PrivateLink`.

### Interface Endpoints

- Endpoint provides a NEW service endpoint DNS e.g. `vpce-123-xyz.sns.us-east-1.amazonaws.com`.
- If you update apps to use that specific DNS name, then you can use it privately.
- Applications can use Endpoint Regional DNS or Zonal DNS or PrivateDNS overrides the default DNS for services.
- PrivateDNS overrides the default service name and so the Interface Endpoint would be resolved that way instead of going through the IG and to the service over the public internet.

## VPC Peering

- Direct encrypted network link between two VPCs.
- Works same/cross-region and same/cross-account.
- There can be some limits on cross-region.
- Optional: Public hostnames resolve to private IPs. You can use the same DNS names whether they're in the same VPCs or not.
- Same region only: SGs can reference peer SGs.
- VPC Peering does NOT support transitive peering. VPC A <=> VPC B and VPC B <=> VPC does NOT mean A can connect to C through B.
- When adding VPC peering, you are creating two logical objects between those two VPCs. Routing Configuration is needed, SGs and NACLs can filter.
  - Route tables at both sides of the peering connection are needed, directing traffic flow for the remote CIDR at the peer gateway object.
- VPC Peering connections cannot be created where there is overlap in the VPC CIDRs - ideally NEVER use the same address ranges in multiple VPCs.
