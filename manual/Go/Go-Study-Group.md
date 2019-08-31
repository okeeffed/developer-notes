---
menu: Go
name: Go Study Group
---

# Go Study Group

- `go doc httputil` to get docs
- `httputil` docs show us we can use type `Reverse Proxy` that uses `NewSingleHostReverseProxy`
- `app := httputil.NewSingleHostReverseProxy('http://site:8000')` now creates a reverse proxy web gateway
- `middleware.Stack` is a useful function to ease multiple middleware
- Go design progressively writes the http response (works well for streaming)
- Go Proverbs library
