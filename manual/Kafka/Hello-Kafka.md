---
menu: Kafka
name: Hello Kafka
---

# Hello Kafka

## Resources

1. [Getting started with Kafka](https://medium.com/big-data-engineering/hello-kafka-world-the-complete-guide-to-kafka-with-docker-and-python-f788e2588cfc)
2. [Kafka Node Github](https://github.com/SOHU-Co/kafka-node)
3. [Original Kafka Docker Github](https://github.com/wurstmeister/kafka-docker)

## Getting Started with Nodejs

Run `git clone https://github.com/wurstmeister/kafka-docker.git` to clone wurstmeister's repo.

## Prerequisites

Make sure you have both Docker and Docker Compose installed.

## Docker Composing

```shell
docker-compose up -d
docker-compose scale kafka=3
# to see processes
docker-compose ps
# teardown
docker-compose stop
```

## Consume/Producing from within Docker Container

```shell
# from your terminal run:
docker exec -i -t -u root $(docker ps | grep docker_kafka | cut -d' ' -f1) /bin/bash
# $(docker ps | grep docker_kafka | cut -d' ' -f1) - Will return the docker process ID of the Kafka Docker running so you can access it

# create topic1 and topic2 for our examples
$KAFKA_HOME/bin/kafka-topics.sh --create --partitions 4 --bootstrap-server localhost:9092 --topic topic1
$KAFKA_HOME/bin/kafka-topics.sh --create --partitions 4 --bootstrap-server localhost:9092 --topic topic2

# optional: create a consumer
$KAFKA_HOME/bin/kafka-console-consumer.sh --from-beginning --bootstrap-server localhost:9092 --topic=topic1

# optional: create a producer
$KAFKA_HOME/bin/kafka-console-producer.sh --broker-list localhost:9092 --topic=topic1
```

Note: We use `localhost:9092` here instead of `kafka:9092` for our Node Kafka scripts.

When sending messages as a producer, note that we are latching onto particular partitions in the Node app and so only messages that head to a particular partition will be consumed.

## Node Kafka

Start a new project and install and prep the files we need:

```shell
yarn init -y
yarn add node-kafka
touch consumer.js producer.js
```

## Producer

```javascript
var kafka = require('kafka-node'),
  Producer = kafka.Producer,
  KeyedMessage = kafka.KeyedMessage,
  client = new kafka.KafkaClient(),
  producer = new Producer(client),
  km = new KeyedMessage('key', 'message'),
  payloads = [
    { topic: 'topic1', messages: 'hi', partition: 0 },
    { topic: 'topic2', messages: ['hello', 'world', km] },
  ];
producer.on('ready', function() {
  producer.send(payloads, function(err, data) {
    console.log(data);
  });
});

producer.on('error', function(err) {});
```

## Consumer

```javascript
var kafka = require('kafka-node'),
  Consumer = kafka.Consumer,
  client = new kafka.KafkaClient(),
  consumer = new Consumer(
    client,
    [{ topic: 'topic1', partition: 0 }, { topic: 'topic2', partition: 1 }],
    {
      autoCommit: false,
    },
  );
```

## Running it altogether

Ensure that you've created `topic1` and `topic2` from within the Docker container.

Once created, we can run `node consumer.js` in one terminal to listen for those topics on particular partitions and `node producer.js` to fire off some notifications.

All the received events on the consumer will then log to the terminal.
