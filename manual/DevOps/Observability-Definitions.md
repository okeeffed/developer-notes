---
menu: DevOps
name: Observability Definitions
---

# Observability Definitions

## Resources

1. [Monitoring best practises](https://www.integralist.co.uk/posts/monitoring-best-practices)

## Observability

> Observability is a measure of how well internal states of a system can be inferred from knowledge of its external outputs – Wikipedia

The umbrella term for how your system is doing. You'll find both "monitoring" and "instrumentation" under this term.

## Monitoring

> Monitoring is the translation of IT metrics into business meaning – Wikipedia
> Word to talk about tools for viewing data that has been recorded by your systems (time series data, logging etc). Monitoring helps you define the “what” and “why” something has gone wrong.

## Instrumentation

> Instrumentation refers to an ability to monitor or measure the level of a product’s performance, to diagnose errors and to write trace information – Wikipedia
> Instrumentation is talking about how you are recording data to be viewed and monitored.

## Telemetry

> Telemetry is the process of gathering remote information that is collected by instrumentation – MSDN

Telemetry refers to the mechanisms for acquiring the data that has been gathered by instrumentation (tools like FluentD, Syslog etc). It is also referred to in some monitoring tools as breadcrumbs.

## Different Types of Monitoring

- Server monitoring: monitor the health of your servers and ensure they stay operating efficiently. Load balancers are an example of something can health check a server.
- Configuration change monitoring: monitor your system configuration to identify if and when changes to your infrastructure impact your application.
- Application performance monitoring: look inside your application and services to make sure they are operating as expected (also known as APM tooling). APM tooling examples include New Relic.
- Synthetic testing: real time interactions to verify how your application is functioning from the perspective of your users (hopefully to catch errors before they do).
- Alerting: notify the service owners when problems occur so they can resolve them, minimizing the impact to your customers. This could come from services like CloudWatch, PagerDuty etc.
