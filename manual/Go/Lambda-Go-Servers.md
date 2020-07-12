---
menu: Go
name: Lambda Go Servers
---

# Lambda Go Servers

This following example uses Gin.

TODO: Add in the learnings from the local repo.

## Resources

1. [Gin + Lambda Go](https://github.com/appleboy/gin-lambda)
2. [Apex Gateway](https://github.com/apex/gateway)
3. [Gin + Lambda AWSLabs](https://github.com/awslabs/aws-lambda-go-api-proxy)
4. [TS Lambda](https://www.codeproject.com/Articles/5269904/Deploy-a-Typescript-Lambda-function-with-AWS-CDK-a)
5. [AWS CDK - API Gateway](https://docs.aws.amazon.com/cdk/api/latest/typescript/api/aws-apigateway.html)
6. [AWS CDK - First Go Lambda Function](https://www.alexedwards.net/blog/serverless-api-with-go-and-aws-lambda)

## Gin + Lambda with AWSLabs proxy

```go
package main

import (
	"log"
	"context"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/awslabs/aws-lambda-go-api-proxy/gin"
	"github.com/gin-gonic/gin"
)

var ginLambda *ginadapter.GinLambda

func init() {
	// stdout and stderr are sent to AWS CloudWatch Logs
	log.Printf("Gin cold start")
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	ginLambda = ginadapter.New(r)
}

// Handler will deal with Gin working with Lambda
func Handler(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	// If no name is provided in the HTTP request body, throw an error
	return ginLambda.ProxyWithContext(ctx, req)
}

func main() {
	lambda.Start(Handler)
}
```

## Gin + Lambda with Apex Gateway

```go
package main

import (
	"log"
	"net/http"
	"os"

	"github.com/apex/gateway"
	"github.com/gin-gonic/gin"
)

func helloHandler(c *gin.Context) {
	name := c.Param("name")
	c.String(http.StatusOK, "Hello %s", name)
}

func welcomeHandler(c *gin.Context) {
	c.String(http.StatusOK, "Hello World from Go")
}

func rootHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"text": "Welcome to gin lambda server.",
	})
}

func routerEngine() *gin.Engine {
	// set server mode
	gin.SetMode(gin.DebugMode)

	r := gin.New()

	// Global middleware
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	r.GET("/welcome", welcomeHandler)
	r.GET("/user/:name", helloHandler)
	r.GET("/", rootHandler)

	return r
}

func main() {
	addr := ":" + os.Getenv("PORT")
	log.Fatal(gateway.ListenAndServe(addr, routerEngine()))
}
```
