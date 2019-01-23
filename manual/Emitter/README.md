---
name: README
menu: Emitter 
---
# Emitter

Use the Emitter to create funnels throughout apps and servers. This will help keep infomation decoupled.

## Levels

| Level   | Desc                                                                                                                                                                                                                                                                                                                                    |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TRACE   | This is a code smell if used in production. This should be used during development to track bugs, but never committed to your VCS.                                                                                                                                                                                                      |
| DEBUG   | Log at this level about anything that happens in the program. This is mostly used during debugging, and I’d advocate trimming down the number of debug statement before entering the production stage, so that only the most meaningful entries are left, and can be activated during troubleshooting.                                 |
| INFO    | Log at this level all actions that are user-driven, or system specific (ie regularly scheduled operations…)                                                                                                                                                                                                                             |
| NOTICE  | This will certainly be the level at which the program will run when in production. Log at this level all the notable event that are not considered an error.                                                                                                                                                                            |
| WARN    | Log at this level all event that could potentially become an error. For instance if one database call took more than a predefined time, or if a in memory cache is near capacity. This will allow proper automated alerting, and during troubleshooting will allow to better understand how the system was behaving before the failure. |
| ERROR   | Log every error conditions at this level. That can be API calls that return errors or internal error conditions.                                                                                                                                                                                                                        |
| FATAL   | Too bad it’s doomsday. Use this very scarcely, this shouldn’t happen a lot in a real program. Usually logging at this level signifies the end of the program. For instance, if a network daemon can’t bind a network socket, log at this level and exit is the only sensible thing to do.                                            |
| EVENT   | Log an event that gets sent out to various event resources. Examples include events that need to be sent out to Google analytics etc.                                                                                                                                                                                                   |
| SUCCESS | Anything that requires a success message to be sent out should go here. Examples include events that require a message to Slack etc.                                                                                                                                                                                                    |

There are just examples. You can create funnels by re-emitting particular events down certain pathways. These can be either higher order or lower order.

## Resources

-   [10 Commandments of Logging](http://www.masterzen.fr/2013/01/13/the-10-commandments-of-logging/)
