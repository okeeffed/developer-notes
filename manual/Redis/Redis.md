---
name: Basic Redis
menu: Redis
---

# Redis

## tl;dr

| Command | Function                          | Example          |
| ------- | --------------------------------- | ---------------- |
| HGETALL | Get all fields and values in hash | HGETALL coin:btc |
| HKEYS   | Get all fields in hash            | HKEYS coin:btc   |
| HGET    | Get value of hash field           | HGET coin:btc id |

## Command list

| Function             | Command                                                                     |
| -------------------- | --------------------------------------------------------------------------- |
| Install              | brew install redis                                                          |
| Run server           | redis-server /usr/local/etc/redis.conf                                      |
| Uninstall            | brew uninstall redis && rm ~/Library/LaunchAgents/homebrew.mxcl.redis.plist |
| Info                 | brew info redis                                                             |
| Run Redis CLI client | redis-cli                                                                   |

## Redis commands

A full list can be found at https://redis.io/commands.