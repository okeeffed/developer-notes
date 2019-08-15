---
menu: Networking
name: Network Protocol Fundamentals
---

# Network Protocol Fundamentals

Protocol = a set of rules. When we talk about network protocols, this means the formal standards and policies that define the way two or more devices communicate on a network.

Early examples include telegrams, radio, etc.

- Network communication happens at different levels or layers (OSI model and TCP/IP model)
- Each layer of network communication is responsible for passing the information on to the next layer in the stack
- Data transferred between layers in known as a Protocol Data Unit (PDU)
- These network layers of communication allows for better troubleshooting
- The rise of the internet and new technology has changed the way devices communicate with each other, new technologies sometimes require the development of new protocols
- As protocols are created or improved, older protocols become outdated and unsecure

## Transmission Control Protocol (TCP)

Used to ensure reliable end-to-end communication between network applications. Because of how reliably it handles network communication, TCP has become the default protocol for the majority of internet traffic.

TCP breaks down application data into smaller pieces known as "segments", allowing information to be sent over networks more efficiently. Individual data segments contain sequence information that allows them to be sent out of order and reliably reassembled at the destination.

TCP also implements error handling and flow control to ensure that segments of data that fail to arrive at the destination are retransmitted and that the device receiving the transmission is not overloaded.

All of these measures help to ensure the successful transmission is not overloaded. All of these measures help to ensure the successful transmission of data but increase the total overhead cost, which can slow the speed of transmission.

Currently this is the price we pay for reliable communication.

## TCP Three-Way Handshake

Also known as SYN-SYN-ACK (synchronize-synchronize-acknowledgement).

### TCP Event Process

```text
Host A sends a TCP SYNchronize packet to Host B

Host B receives A's SYN

Host B sends a SYNchronize-ACKnowledgement

Host A receives B's SYN-ACK

Host A sends ACKnowledge

Host B receives ACK.
TCP socket connection is ESTABLISHED.
```

## Protocols Encapsulated in TCP

Note that FTP, Telnet, HTTP, HTTPS, SMTP, POP3, IMAP, SSH and any other protocol that rides over TCP also has a three way handshake performed as connection is opened. HTTP web requests, SMTP emails, FTP file transfers all manage the messages they each send. TCP handles the transmission of those messages.

TCP 'rides' on top of Internet Protocol (IP) in the protocol stack, which is why the combined pair of Internet protocols is called TCP/IP (TCP over IP). TCP segments are passed inside the payload section of the IP packets. IP handles IP addressing and routing and gets the packets from one place to another, but TCP manages the actual communication sockets between endpoints (computers at either end of the network or internet connection).

## TCP Functions and Services

- Reliable end-to-end communication
- Segmentation
- Sequencing
- Reassembly
- Error handling
- Retransmission
- Flow control

## TCP Header Format

- Source Port Address: A 16-bit field that contains the port address of the sender
- Destination Port Address: A 16-bit field that contains the port address of the recipient
- Sequence Number: 32-bit field that holds the sequence number (the byte number of the first byte of data being sent in the TCP packet) - when connection is first established via a SYN message, the initial sequence number (ISN) i s set. The ISN can be any number from 0 to 4,294,967,295. The actual data begins at ISN + 1.
- Acknowledgement Number: 32-bit field that indicates the next sequence number (or byte number) that the sender of the ACK should expect.
- Header Length (HLEN) or Data Offset: A 4-bit field that indicates the size or length of the TCP header in 4-byte (or 32-bit) words in the header. Minimum length the header can be is 20 bytes, and the maximum length is 60 bytes.
- Reserved: This 3-bit section has been included for future use but should be set to zero
- Control Flags: A set of 6 standard and 3 extended control bits (1 bit each) that manage the flow of data.
  - Standard Control Flags:
    - TO DO
  - Explicit Congestion Notification (ECN): Extension to TCP that allows for notification of network congestion without packet loss:
    - TO DO
- Window Size: 16-bit field that indicates the size (number of bytes) the sender of the segment is willing to accept
- Checksum: 16-bit checmsum field that is used to check for errors in the entire TCP segment (header, payload, etc)
- Urgent Pointer: A 16-bit field that flags data that needs to reach the destination as early as possible. This field is only valid if the URG control flag is set.
- Options and Padding: A 32-bit field that allows you to configure additional options for the TCP segment (eg maximum segment size). Padding (made up of zeroes) may be required to ensure that the header ends and the data begins on a 32-bit boundary

## User Datagram Protocol (UDP)

Simple, high-speed communication protocol that does not conduct error checks or retransmit data segments that fail to arrive at their destination.

UDP is a message-orientated protocol, meaning it breaks data up into distinct chunks or groups (unlike stream-orientated protocols, which transmit data in a continuous flow, byte by byte). UDP preserves the boundaries of the messages that it receives from applications; it does not break down data before sending it (unlike TCP).

Messages are simply given a UDP header and then passed on. Another difference between UDP and TCP is that UDP is a connectionless protocol. UDP does not create a connection with the receiving device; it simply transmits the data to the end point.

This lack of connection, combined with thelack of error checking/control, makes UDP an unreliable means of transmission. Although it is less reliable than TCP, UDP is much faster at transmitting data, due to the lack of overhead. This faster transmission speed is preferred in applications that can tolerate some data loss (eg VoIP, online gaming, etc).

## UDP Functions and Services

- Connectionless protocol
- Message-oriented protocol
- Preserves message boundaries
- Does not require acknowledgement that data is received (fire and forget)
- Applications can provide reliability
- Low bandwidth overhead and latency
- Used for simple transactions (eg DNS and NTP)

## UDP Header Format

- Source port number: specifies sender port (optional in IPv4 and IPv6)
- Destination port number: receiver port
- Length: Specifies length of header and data
- Checksum: Used to perform error checking on the header and data (optional with IPv4, required in IPv6)

## The Internet Protocol (IP)

Provides addressing and routing that allows data to be sent across one or more networks.

Data broken up into smaller units called "packets". Each packet is supplied with header information that contains the addresses of both source and destination.

Several network devices help facilitate the flow of traffic (NICs, switches, routers, etc) but would be useful without the agreed-upon standards set by the IP. This protocol provides a common foundation that lets computers and other network devices communicate over local networks and the open internet.

Routing: Besides addressing, routing is one of the main functions of the IP. Routing is used to forward IP packets across multiple networks between a source and a destination. When an IP packet needs to be sent, a router uses a routing algorithm and the information in its routing table to determine where to send the packet next. Each router that the packet travels through is called a "hop".

- Routing table
- Routing protocols (eg OSPF, BGP, etc)
- Routing algorithms (IP forwarding algorithm)
- Next hop

## Simple Network Management Protocol (SNMP)

Used for monitoring and managing a wide array of devices on a network.

An SNMP-managed network consists of the Network Management System (NMS) which runs on the manager, agents, which run on network devices, and the network devices themselves (known as "managed devices").

Most network devices support SNMP, but the protocol and the agent that runs on a managed device must be enabled. Agents collect information about the device and then pass it to the manager.

Some Network Management Systems let you change device configurations, which is helpful when managing a large-scale network that includes many devices. In short, SNMP provides a common language and set of standards that enables network devices - regardless of type and manufacturer - to relay management information.

## Components of an SNMP-Managed Network

- Managed devices or resources
- SNMP agent
- SNMP manager (Network Management System)
- Management Information Base (MIB)
  - Object Identifier (OID): Unique ID for objects stored in the MIB.
  - Structure of Management Information (SMI): Establishes naming conventions, definitions, and ecnoding methods for objects in the MIB.
  - Scalar Object: Defines a single object instance
  - Tabular Object: Defines multiple related obkects that are grouped into an MIB table
  - MIB Browser: Helps with locating non-standard, specific objects in the MIB

## SNMP PDU Types

- GetRequest
- SetRequest
- GetNextRequest
- GetBulkRequest (added in v2)
- Response
- Trap
- InformRequest (added in v2)

## Domain Name System (DNS)

DNS maps domain names to their corresponding IP addresses. The system consists of a server or group of servers that stores information witin a database (typically "zone file" - structured text file).

Clients query these servers with requests to access specific domains or addresses, and their requests are directed to the intended destination.

The DNS hierarchy starts with root name servers, which contain information about top-level domains (TLDs) like ".com", and continues down to the authoritative name servers for a particular domain.

Information is distributed across these hierarchy levels in order to reduce the load on the root name servers and adapt to the ever-changing internet landscape.

## Resource Record (RR)

Resource record is an entry in a DNS database that provides information about a particular resource. Groups of resource records of the same type are called an "RRset".

Resource records follow a common format that provides information about each record:

- NAME: The name of the associated node for the record.
- TYPE: The type of record (indicated by a number).
- CLASS: Defines the protocol family that is used for the record.
- TTL (time to live): Specifies how long a resource record will be cached.
- RDLENGTH: Specifies the length of the RDATA field.
- RDATA: Contains any type-specific data defined in the TYPE and CLASS fields.

## DNS Record Types

- SOA (Statement of Authority): Gives info about DNS zone and other DNS records.
- A/AAAA (Address): Maps a domain or subdomain name to an IP address (or IPv6 address, in the case of the AAAA record).
- MX (Mail Exchanger): Directs email to a particular mail server.
- NS (Name Server): Usually set with a registrar, delegates a domain or subdomain to a set of DNS servers.
- PTR (Pointer): Performs a reverse lookup, which maps an IP address to a hostname or domain name.
- CNAME (Canonical Name): Redirects one domain to another and allows multiple names to map to a single A record.
- CERT (Certificate): Stores certificates in DNS, which provides authenticity for domain names.
- TXT (Text): Contains information about a domain or subdomain.
- SRV (Service): Provides ability to define a port and hostname for a service.

## Dynamic Host Configuration Protocol (DHCP)

The Dynamic Host Configuration Protocol (DHCP) automatically and dynamically assigns IP addresses and other network configurations to devices on an IP network.

DHCP operates on a client-server model, which allows network devices (clients) to reach out to a DHCP server to obtain their IP config.

These requests are made in conjuction with the connectionless User Datagram Protocol (UDP), which provides fast and efficient communication.

With a growing number of devices connected to the internet (each one requiring a unique IP address), it's becoming increasingly difficult to manage the assignment of IP addresses. It's one of the reasons that DHCP is so important.

It automates the process of assigning IP addresses, eliminating the need to manually assign individual IP addresses to each device.

### DHCP Allocation

- Dynamic: IP addresses are assigned to DHCP clients for a specific time period and can be repurposed after the time period runs out.
- Automatic: IP addresses are permanently assigned to DHCP clients and cannot be repurposed.
- Manual (or Static): IP addresses are issued based on a client ID (such as a MAC address) that has been predefined by the administrator.

### DHCP Operation

1. DHCPDISCOVER (client to server)
2. DHCPOFFER (server to client)
3. DHCPREQUEST (client to server)
4. DHCPACK (server to client)

## File Transfer Protocol (FTP)

Used to transport files between a client and server over a network via TCP. In addition to file transfers, FTP also enables clients to run command on the files and directories hosted by a server.

```shell
    random port 1 == control connection ==> port 21
FTP CLIENT                                      FTP SERVER
    random port 2 <== data connection == (active) Port 20
```

### Communication Channels

- Control Connection: handles control information
- Data Connection: Handles the tranfer of the actual file

### Transfer Modes

- Active: The client opens a command/control connection to the server from a random port to port 21 on the server. The server opens a data connection from port 20 to a random port on the client.
- Passive: The client opens a command/control connection to the server from a random port to port 21 on the server. Client opens a data connection from a random port on the client to a random port on the server (port chosen by server).

### FTP Command Examples

- RETR: Retrieves a copy of a file
- PASS: Sends the user's password to the server
- MKD: Creates a directory
- LIST: Lists the files of a directory
- QUIT: Closes the connection

### FTP Reply Examples

- 200: Command okay
- 530: Not logged in
- 503: Bad sequence of commands
- 430: Invalid username or password
- 213: File status

### Anonymous FTP

- Files are available for public access
- Access is limited
- Username and password are not required

### File Transfer Protocol Secure (FTPS)

Adds a layer of security to the FTP connection by applying the Transport Layer Security (TLS) protocol. This security can be applied to both the command and data connections, or jsut to the data connection. TLS can be applied by requiring a user ID and password, a valid certificate, or both.

### SSH File Transfer Protocol (SFTP)

Unlike FTPS, SFTP is a completely different protocol that is based on the SSH protocol. SFTP uses a single connection instead of the two connections - command and data - that are implemented by FTP/FTPS. SFTP improves security by using encrypted credentials (username and password) and can be further secured by requiring SSH keys.

### Secure Copy Protocol (SCP)

SCP is another network protocol used for transferring files and, like SFTP, is based on the SSH protocol. SCP is also a program that can be used to securely copy files with the Secure Copy Protocol. The SCP process functions in one of the two modes:

1. Source Mode: Client copies file from a remote host.
2. Sink Mode: Client sends a copy of a file to a remote host.

## Network File System (NFS)

Implements a client-server model that allows multiple hosts (clients) to attach to shared file systems and storage provided by the NFS server.

## Internet Small Computer Systems Interface (iSCSI)

Network storage protocol that provides access to bloc-level storage devices between a client and a server by enabling SCSI command to be sent over a network.

### iSCSI Naming and Addressing

IQN (iSCSI Qualified Name): The IQN is a unique name that identifies an iSCSI node.

The IQN takes the following format: iqn.yyyy-mm.naming_authority:unique_name.

- "iqn"
- yyyy-mm: The month and year that the naming authority was established
- naming_authority: The domain name of the naming authority (typically in reverse syntax)
- unique_name: A unique name chosen by the admin

## Server Message Block (SMB)

Used primarily by Windows-based computers and allows files, printers and serial ports to be shared over a network. SMB is a request-response protocol, meaning a client sends an SMB request to a server and then the server sends an SMB response to the client.

### SMB Message Structure

- Header (fixed length)
- Parameter block (variable length)
- Data block (variable length)

### Common Internet File System (CIFS)

- File-sharing protocol
- Implementation of SMB
- Has been made obsolete by newer versions of SMB

### Samba

- Collection of software based on the SMB protocol
- Follows a client-server model
- Provides several network-related services:
  - File and print sharing
  - Authentication and authorization
  - Name resolution
  - Service announcement (browsing)
- Allows Linux/Unix servers to integrate into a Windows environment

## Secure Shell Protocol

SSH is a cryptographic protocol that establishes a secure connection between a client and a server that enables users to perform various network-related tasks (eg remote login, remote command execution).

### Session Steps

Port 22 on both SSH clients.

1. Establish secure connection
2. Authenticate server
3. Authenticate client
4. Encrypted session

### Service and Functions

- Remote login
- Remote command execution
- Forwards TCP ports
- Tunneling
- Provides graphical interfaces through X11
- Transfer files through SFTP or SCP

### SSH Architecture Layers

- Transport layer
  - Key exchange
  - Encryption
  - Message Authentication Code (MAC)
  - Compression
- User authentication layer
  - Username/password
  - Public keys
- Connection layer

### SSH Encryption

- Symmetrical
- Asymmetrical
- Hashing

### SSH Message Format

- Length: The length of the message in bytes
- Padding length: The number of random bytes added to the end of the message
- Payload: The actual data sent by the user
- Random padding: The random bytes added to ensure that the message is a multiple of the block size used by the encryption algorithm (will be at least four)
- Message Authentication Code (MAC): This field is present if the Mesage Authentication Code has been negotiated for a the session (strongly recommended but not required)
