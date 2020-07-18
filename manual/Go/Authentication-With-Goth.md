---
menu: Go
name: Authentication with Goth
---

# Authentication with Goth

## Resources

1. [Auth](https://github.com/markbates/goth/blob/master/examples/main.go)

## Example with GitHub

```go
package main

import (
	"fmt"
	"html/template"
	"net/http"
	"os"

	"sort"

  "log"
  "github.com/joho/godotenv"

  "github.com/gin-gonic/gin"

	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/github"
)

func main() {
	goth.UseProviders(
		github.New(os.Getenv("GITHUB_KEY"), os.Getenv("GITHUB_SECRET"), "http://localhost:3000/auth/github/callback"),
	)

	// OpenID Connect is based on OpenID Connect Auto Discovery URL (https://openid.net/specs/openid-connect-discovery-1_0-17.html)
	// because the OpenID Connect provider initialize it self in the New(), it can return an error which should be handled or ignored
	// ignore the error for now
	openidConnect, _ := openidConnect.New(os.Getenv("OPENID_CONNECT_KEY"), os.Getenv("OPENID_CONNECT_SECRET"), "http://localhost:3000/auth/openid-connect/callback", os.Getenv("OPENID_CONNECT_DISCOVERY_URL"))
	if openidConnect != nil {
		goth.UseProviders(openidConnect)
	}

	m := make(map[string]string)
	m["github"] = "Github"

	var keys []string
	for k := range m {
		keys = append(keys, k)
	}
	sort.Strings(keys)

	providerIndex := &ProviderIndex{Providers: keys, ProvidersMap: m}

	// load .env file
  err := godotenv.Load()
  if err != nil {
    log.Fatal("Error loading .env file")
  }

  // set up server
  r := gin.Default()
	r.GET("/auth/{provider}/callback", func(c *gin.Context) {

		user, err := gothic.CompleteUserAuth(res, req)
		if err != nil {
			fmt.Fprintln(res, err)
			return
    }

		c.JSON(200, gin.H{
        user
    })
	})

	r.GET("/logout/{provider}", func(res http.ResponseWriter, req *http.Request) {
		gothic.Logout(res, req)
		c.JSON(200, gin.H{
      "success": true
    })
	})

	r.GET("/auth/{provider}", func(res http.ResponseWriter, req *http.Request) {
		// try to get the user without re-authenticating
		if gothUser, err := gothic.CompleteUserAuth(res, req); err == nil {
			c.JSON(200, gin.H{
        gothUser
      })
		} else {
			gothic.BeginAuthHandler(res, req)
		}
	})


	log.Println("listening on localhost:8080")
	r.Run(":8080")
}

type ProviderIndex struct {
	Providers    []string
	ProvidersMap map[string]string
}
```
