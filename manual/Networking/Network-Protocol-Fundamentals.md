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
