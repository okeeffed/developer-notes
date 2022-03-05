---
menu: gRPC
name: gRPCs w/ Golang
---

# gRPC with Golang

## Resources

1. [gRPC course Udemy](https://www.udemy.com/course/grpc-golang/)
2. [gRPC.io](https://grpc.io/)
3. [HTTP2 vs HTTP1 image loading website](https://imagekit.io/demo/http2-vs-http1)
4. [gRPC-Go](https://github.com/grpc/grpc-go)
5. [Go Protobuf](https://github.com/golang/protobuf)
6. [gRPC with Lambda](https://blog.coinbase.com/grpc-to-aws-lambda-is-it-possible-4b29a9171d7f)
7. [Twirp](https://github.com/twitchtv/twirp)
8. [Twirpl 2018 post](https://rynop.com/2018/01/23/twirpl-twirp-go-framework-running-completely-serverless/)

## Intro

gRPC is there to attempt to solve the difficulties of API design.

gRPC is an open-source framework developed by Google which is now part of CNCF.

At a high level, it allows you to define REQUEST and RESPONSE for RPCs and handles the rest.

### Benefits

1. Fast + efficient
2. Built on HTTP/2
3. Low latenvy
4. Supports streaming
5. Language independent
6. Easy to plug in with integrated auth, load balancing, logging and monitoring

## Remote Procedural Call

In the CLIENT code, it looks like you're just callng a function on the SERVER.

With gRPC, it is implemented cleanly and solves a lot of problems.

## Getting started

At the core of gRPC, you need to define the messages and services using `Protocol Buffers`.

The rest of the gRPC code will be generated for you and you'll have to provide and implementation for it.

> One `.proto` file can be used for over 12 different languages.

### Example proto file

```proto
syntax = 'proto3';

message Greeting {
  string first_name = 1;
}

message GreetRequest {
  Greeting greeting = 1;
}

message Greeting {
  string result = 1;
}

service GreetService {
  rpc Greet(GreetRequest) returns (GreetResponse) {};
}
```

## Why Protocol Buffers?

- Language agnostic.
- Code can be generated for pretty much any language.
- Data is binary and efficiently serialized (small payloads).
- Very convenient for transporting a lot of data.
- Protocol Buffers allows for easy API evolution using rules.
- Easy to write messag definition.
- Definition of API independent from implementation.
- A hug amount of code can be generated, in any language, from a simple `.proto` file.
- Payload is binary, therefore very efficient to send/receive on a network and serialize/de-serialize on a CPU.

### Protocol Buffers & Interoperability

One benefit Protobuf is used the size of the messsage and savings through network benefit. A JSON comparison of an object for "person" vs a Protobuf shows a 55 byte vs 20 byte difference, event with small messages.

Parsing Protocol Buggers (binary format) means faster and more efficient communication. This has added benefit for mobile devices with slower CPUs.

### gRPC languages

Java, Go and C have native, pure bindings. The rest rely on GRPC-C.

## HTTP/2 vs HTTP/1

### HTTP/1

- Released in 1997.
- Opens a new TCP connection for each request.
- Does not compress headers (which are plaintext).
- Only works with Req/Res mechanism (no server push).
- Original composed of GET and POST.
- 80 assets for load will request headers sent for every request. 80 assets = 80 TCP connections. Inefficient for latency and increases network packet size.

### HTTP/2

- 2015 release but battle tested by Google.
- Supports multiplexing (parallel messages pushed).
- Supports server push (multiple messages for one client request).
- Supports header compression.
- HTTP/2 is binary. Any binary protocol is a great match.
- HTTP/2 is secure (SSL not required by recommended by default).
- "Less chatter". Less bandwidth, reduced latency, increased security.

> gRPC only uses HTTP/2.

## 4 Types of API in gRPC

1. Unary
2. Server streaming
3. Client streaming
4. Bi-directional streaming

The following shows how easy it is to define the streaming contracts:

```proto vs
service GreetService {
  // Unary
  rpc Greet(GreetRequest) returns (GreetResponse) {};

  // Streaming Server
  rpc GreetManyTimes(GreetManyTimesRequest) returns (stream GreetManyTimesResponse) {};

  // Streaming Client
  rpc LongGreet(stream LongGreetRequest) returns (LongGreetResponse) {};

  // Bidirectional Streaming
  rpc GreetEveryone(stream GreetEveryoneRequest) returns (stream GreetEveryoneResponse) {};
}
```

## gRPC Scalability

- Async by default (ie non-blocking).
- Can serve millions of reqs in parallel.
- gRPC clients can be async or sync. Client decides on modal best for performance needs.
- gRPC Clients can perform clientside load balancing.

> Google have 10 billion gRPC reqs per second internally.

## gRPC Security

- Strongly advocats for SSL in API.
- gRPC has security as a first class citizen.
- ach language will provide an API to load gRPC with required certificates and provide encyption out-of-the-box.
- Additionally using Intercepts, can provide auth.

## Getting Started with gRPC Go

```s
go get -u google.golang.org/grpc
go get -u google.golang.org/protobuf
```

After cloning `https://github.com/simplesteph/grpc-go-course` and changing into `Greet/greetpb`, we can run `protoc greet.proto --go_out=plugins=grpc:.` to test the code generation.

> Running `protoc greet/greetpb/greet.proto --go_out=plugins=grpc:.` will output the file to `greet/greetpb/greet.pb.go`.

### A Hello Service

Instead of installing the above, you can do it manually. Inside of `hello/hellopb/hello.proto`:

```proto
syntax = "proto3";

package hello;
option go_package = "hello/hellopb";

service HelloService {}
```

Run `protoc hello/hellopb/hello.proto --go_out=plugins=grpc:.` to generate `hello/hellopb/hello.pb.go`.

## Server Boilerplate

This will show how to properly start & stop the Server on the defined `port`.

> You may need to run `go mod init github.com/okeeffed/project-name` at the root of the directory prior.

```go
package main

import (
	"fmt"
	"log"
	"net"

	"github.com/okeeffed/grpc-go-course/hello/hellopb"

	"google.golang.org/grpc"
)

type server struct{}

func main() {
	fmt.Println("Hello world")
	// :50051 is default gRPC port
	lis, err := net.Listen("tcp", "0.0.0.0:50051")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	s := grpc.NewServer()
	hellopb.RegisterHelloServiceServer(s, &server{})

	if err := s.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
```

## Client Boilerplate

```go
package main

import (
	"fmt"
	"log"

	"github.com/okeeffed/grpc-go-course/hello/hellopb"
	"google.golang.org/grpc"
)

func main() {
	fmt.Println("Hello from the client")
	// WithInsecure for now as we don't have SSL certificates
	conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Could not connect: %v", err)
	}

	defer conn.Close()

	c := hellopb.NewHelloServiceClient(conn)
	fmt.Printf("Created client: %f", c)
}
```

Now if we start the server and client in two different tabs we can see that we connect!

```s
# Tab 1
> go run hello/hello_server/server.go
Hello world

# Tab 2
>  go run hello/hello_client/client.go
Hello from the client
Created client: &{%!f(*grpc.ClientConn=&{0xc0001beb00 0x10e0e70 localhost:50051 {passthrough  localhost:50051} localhost:50051 {<nil> <nil> [] [] <nil> <nil> {{1000000000 1.6 0.2 120000000000}} false false true 0 <nil>  {grpc-go/1.31.0 0x1470140 false [] <nil> <nil> {0 0 false} <nil> 0 0 32768 32768 0 <nil>} [] <nil> 0 false true false <nil> <nil> <nil> <nil> 0x1472400 [] true} 0xc0001aaf40 {<nil> <nil> 0x1470140 0 {passthrough  localhost:50051}} 0xc0002529f0 {{0 0} 0 0 0 0} 0xc0001b2900 0xc00018e6e0 map[0xc0001eb8c0:{}] {0 0 false} pick_first 0xc0001bec00 {<nil>} 0xc0001aaf20 0 0xc0001b6700 {0 0} <nil>})}%
```

## Creating a Unary API call

We need to create a `Request` and `Response`.

We start by writing the definition - here I will do one for "Hello".

We update our `Hello` Protobuffer to define `Greeting` and a Request + Response:

```proto
syntax = "proto3";

package hello;
option go_package = "hello/hellopb";

message Hello {
  string first_name = 1;
  string last_name = 2;
}

message HelloRequest { Hello hello = 1; }

message HelloResponse { string result = 1; }

service HelloService {
  // Unary
  rpc Hello(HelloRequest) returns (HelloResponse) {}
}
```

We can now update the `server.go` file to now handle our call from the Client:

```go
func (*server) Hello(ctx context.Context, req *hellopb.HelloRequest) (*hellopb.HelloResponse, error) {
	// from the auto generated info
	firstName := req.GetHello().GetFirstName()

	result := "Hello " + firstName
	res := &hellopb.HelloResponse{
		Result: result,
	}

	return res, nil
}
```

We can now update the client to get the simple response example.

## Updating the client to get a response

```go
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/okeeffed/grpc-go-course/hello/hellopb"
	"google.golang.org/grpc"
)

func main() {
	fmt.Println("Hello from the client")
	// WithInsecure for now as we don't have SSL certificates
	conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Could not connect: %v", err)
	}

	defer conn.Close()

	c := hellopb.NewHelloServiceClient(conn)
	doUnary(c)
}

func doUnary(c hellopb.HelloServiceClient) {
	fmt.Println("Starting doUnary RPC")

	// Create a request that takes the "Hello" struct
	req := &hellopb.HelloRequest{
		Hello: &hellopb.Hello{
			FirstName: "Dennis",
			LastName:  "O'Keeffe",
		},
	}
	res, err := c.Hello(context.Background(), req)

	if err != nil {
		log.Fatalf("Error calling greet %v", err)
	}
	log.Printf("Response from Greet: %v", res.Result)
}
```

If we now start the server and client, you will see the response.

```s
# Tab 1
> go run hello/hello_server/server.go
Hello world
# Tab 2
> go run hello/hello_client/client.go
Hello from the client
Starting doUnary RPC
2020/08/10 13:47:24 Response from Greet: Hello Dennis
```

## Server Streaming

Take "one" request and return many responses.

For the API, we need to add a receiver function for the server that takes a request and a stream:

```go
func (*server) HelloManyTimes(req *hellopb.HelloManyTimesRequest, stream hellopb.HelloService_HelloManyTimesServer) error {
	fmt.Printf("Greet many times function was invoked with %v", req)

	// from the auto generated info
	firstName := req.GetHello().GetFirstName()

	for i := 0; i < 10; i++ {
		result := "Hello " + firstName + " number " + strconv.Itoa(i)
		res := &hellopb.HelloManyTimesResponse{
			Result: result,
		}
		stream.Send(res)
		time.Sleep(1000 * time.Millisecond)
	}

	return nil
}
```

For the client, it is fairly simple:

```go
package main

import (
	"context"
	"fmt"
	"io"
	"log"

	"github.com/okeeffed/grpc-go-course/hello/hellopb"
	"google.golang.org/grpc"
)

func main() {
	fmt.Println("Hello from the client")
	// WithInsecure for now as we don't have SSL certificates
	conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Could not connect: %v", err)
	}

	defer conn.Close()

	c := hellopb.NewHelloServiceClient(conn)
	doServerStreaming(c)
}

func doServerStreaming(c hellopb.HelloServiceClient) {
	fmt.Println("Starting a Server Streaming RPC")

	// Create a request that takes the "Hello" struct
	req := &hellopb.HelloManyTimesRequest{
		Hello: &hellopb.Hello{
			FirstName: "Dennis",
			LastName:  "O'Keeffe",
		},
	}

	// returns client and err
	resStream, err := c.HelloManyTimes(context.Background(), req)

	if err != nil {
		log.Fatalf("Error calling greet %v", err)
	}
	for {
		msg, err := resStream.Recv()
		if err == io.EOF {
			// reached the end
			break
		}

		if err != nil {
			log.Fatalf("Error calling greet %v", err)
		}

		log.Printf("Response from GreetManyTimes: %v", msg.GetResult())
	}
}
```

## Client Streaming

The updated Protobuffer:

```proto
// ... rest omitted

// Streaming Client
message LongGreetRequest { Hello hello = 1; }

message LongGreetResponse { string result = 1; }

service HelloService {
  // ... rest omitted

  // Streaming Client
  rpc LongGreet(stream LongGreetRequest) returns (LongGreetResponse) {}
}
```

Updating the API:

```go
// only take a stream this time
func (*server) LongHello(stream hellopb.HelloService_LongHelloServer) error {
	fmt.Printf("LongHello func invoked with streaming req")
	result := "Hello "

	for {
		req, err := stream.Recv()
		if err == io.EOF {
			// we finished
			return stream.SendAndClose(&hellopb.LongHelloResponse{
				Result: result,
			})
		}

		if err != nil {
			log.Fatalf("Error while reading client stream: %v", err)
		}

		firstName := req.GetHello().GetFirstName()
		result += "Hello " + firstName + "! "
	}
}
```

As for the client:

```go
func doClientStreaming(c hellopb.HelloServiceClient) {
	stream, err := c.LongHello(context.Background())

	requests := []*hellopb.LongHelloRequest{
		&hellopb.LongHelloRequest{
			Hello: &hellopb.Hello{
				FirstName: "Dennis",
			}
		},
		&hellopb.LongHelloRequest{
			Hello: &hellopb.Hello{
				FirstName: "Stacy",
			}
		},
		&hellopb.LongHelloRequest{
			Hello: &hellopb.Hello{
				FirstName: "Tracy",
			}
		},
		&hellopb.LongHelloRequest{
			Hello: &hellopb.Hello{
				FirstName: "Macy",
			}
		}
	}

	if err != nil {
		log.Fatalf("Error calling hello %v", err)
	}

	// iterate over slice and send message individually
	for _, req := range requests {
		stream.Send(req)
	}

	stream.Send(*hellopb.HelloManyTimesRequest)
}
```

## BiDi Streaming

BiDi is new thanks to HTTP/2. It can be used for things such as chat, etc.

We can also use it for a long-running client where we want to stream back and forward.

For the Protocol Buffer:

```proto
// BiDi
message HelloEveryoneRequest { Hello hello = 1; }

message HelloEveryoneResponse { Hello result = 1; }

service HelloService {
  // ... rest omitted

  // BiDi
  rpc HelloEveryone(stream HelloEveryoneRequest)
      returns (stream HelloEveryoneResponse) {}
}
```

For server:

```go
func (*server) HelloEveryone(stream hellopb.HelloService_HelloEveryoneServer) error {
	fmt.Printf("HelloEveryone fn invoked w/ streaming req\n")
	result := ""
	for {
		req, err := stream.Recv()

		if err == io.EOF {
			// we finished
			return stream.Send(&hellopb.HelloEveryoneResponse{
				Result: result,
			})
		}

		if err != nil {
			log.Fatalf("Error reading client stream: %v", err)
			return err
		}

		firstName := req.GetHello().GetFirstName()
		result += "Hello " + firstName + "! "
	}
}
```

For client:

```go
func doBiDiStreaming(c hellopb.HelloServiceClient) {
	fmt.Println("Starting to do BiDi Streaming RPC")

	// we create a stream by invoking the client
	stream, err := c.HelloEveryone(context.Background())
	if err != nil {
		log.Fatalf("Error while creating stream: %v", err)
		return
	}

	requests := []*hellopb.HelloEveryoneRequest{
		&hellopb.HelloEveryoneRequest{
			Hello: &hellopb.Hello{
				FirstName: "Dennis",
			},
		},
		&hellopb.HelloEveryoneRequest{
			Hello: &hellopb.Hello{
				FirstName: "Stacy",
			},
		},
		&hellopb.HelloEveryoneRequest{
			Hello: &hellopb.Hello{
				FirstName: "Tracy",
			},
		},
		&hellopb.HelloEveryoneRequest{
			Hello: &hellopb.Hello{
				FirstName: "Macy",
			},
		},
	}

	waitc := make(chan struct{})
	// we send a bunch of messages to the client
	go func() {
		// func to send a bunch
		for _, req := range requests {
			fmt.Printf("Sending message: %v\n", req)
			stream.Send(req)
		}
		stream.CloseSend()
	}()

	// we receive a bunch
	go func() {
		for {
			res, err := stream.Recv()
			if err == io.EOF {
				break
			}

			if err != nil {
				log.Fatalf("Error while receiving: %v", err)
			}

			fmt.Printf("Received: %v", res.GetResult())
		}

		close(waitc)
	}()

	// block until everything is done
	<-waitc
}
```
