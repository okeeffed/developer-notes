---
menu: Stripe
name: Java Spring Stripe Configuration
---

# Java Spring Stripe Configuration

In this short example, we are going to "Hello, World!" a Stripe charge!

## Resources

1. [Gradle Intro Docs](https://docs.dennisokeeffe.com/manual-java-gradle-intro)
2. [Spring Guide to Rest Services](https://spring.io/guides/gs/rest-service/)
3. [Stripe API](https://stripe.com/docs/api)
4. [Stripe with Spring](https://stackabuse.com/stripe-integration-with-java-spring-for-payment-processing/)
5. [Stripe Github Java Usage](https://github.com/stripe/stripe-java#usage)
6. [Spring ResponseEntity](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/http/ResponseEntity.html)
7. [Tutorials Point: Service Components](https://www.tutorialspoint.com/spring_boot/spring_boot_service_components.htm)
8. [Basic Spring Boot Gitignore file](https://gist.github.com/fteychene/1e5c30fc86d7623084d0)

## Setup

```shell
mkdir hello-spring-stripe && cd hello-spring-stripe
mkdir -p src/main/java/stripe
touch build.gradle src/main/java/stripe/StripeCharge.java src/main/java/stripe/StripeChageController.java src/main/java/stripe/Application.java .env
# init gradle
gradle wrapper
```

## Setup build.gradle

Add the following for Stripe + Spring:

```java
buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath("org.springframework.boot:spring-boot-gradle-plugin:2.2.1.RELEASE")
    }
}

apply plugin: 'java'
apply plugin: 'eclipse'
apply plugin: 'idea'
apply plugin: 'org.springframework.boot'
apply plugin: 'io.spring.dependency-management'

bootJar {
    baseName = 'hello-spring-jar'
    version =  '0.1.0'
}

repositories {
    mavenCentral()
}

sourceCompatibility = 1.8
targetCompatibility = 1.8

dependencies {
    compile("com.stripe:stripe-java:16.5.1")
    compile("org.springframework.boot:spring-boot-starter-web")
    compile("io.github.cdimascio:java-dotenv:5.1.3")
    testCompile('org.springframework.boot:spring-boot-starter-test')
}
```

## Set up dotenv file

We are using a local dotenv file for this "Hello, World!" level example.

```shell
# required
SK_TEST_KEY=sk_...
# not required
PK_TEST_KEY=pk_...
```

## Setting up the main application

In `src/main/java/stripe/Application.java`, add the following:

```java
package stripecharge;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }
}
```

## Setting up the model

In `src/main/java/stripe/StripeCharge.java`:

```java
package stripecharge;

import java.util.HashMap;
import java.util.Map;

public class StripeCharge {

  private final long amount;
  private final String receiptEmail;
  private final String source;
  private final String currency;

  public StripeCharge(long amount, String receiptEmail) {
    this.amount = amount;
    this.source = "tok_visa";
    this.currency = "usd";
    this.receiptEmail = receiptEmail;
  }

  public Map<String, Object> getCharge() {
    Map<String, Object> params = new HashMap<String, Object>();
    params.put("amount", this.amount);
    params.put("currency", this.currency);
    // source should obtained with Stripe.js
    params.put("source", this.source);
    params.put(
      "description",
      "My First Test Charge (created for API docs)"
    );
    params.put("receipt_email",this.receiptEmail);
    return params;
  }
}
```

## Setting up the controller

In `src/main/java/stripe/StripeChargeController.java`:

```java
package stripecharge;

// NOTE: RequestMapping + RequestParam not required for this demo
// but kept in for reference purposes if wanted to play around later
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestController;
import io.github.cdimascio.dotenv.Dotenv;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.net.RequestOptions;

@RestController
@RequestMapping("/api")
public class StripeChargeController {

  @PostMapping("/charge")
  public ResponseEntity<String> createCharge(@RequestBody StripeCharge stripeCharge) {
    try {
      // for demonstrations sake, using .env file
      Dotenv dotenv = Dotenv.load();

      // creating the charge
      Stripe.apiKey = dotenv.get("SK_TEST_KEY");
      Charge charge = Charge.create(stripeCharge.getCharge());
      System.out.println(charge);
      return new ResponseEntity<String>("Success", HttpStatus.CREATED);
    } catch (StripeException e) {
      e.printStackTrace();
      return new ResponseEntity<String>("Failure", HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }
}
```

## Build, Run and Ping

Run `./gradlew build` to build to project or `./gradlew bootRun` to build and run.

Once the project is running, we can ping `http POST http://localhost:8080/api/charge amount:=200 receiptEmail=hello@example.com` (using HTTPie) and we get a response like the following:

```s
HTTP/1.1 201
Content-Length: 7
Content-Type: application/json;charset=UTF-8
Date: Sun, 12 Jan 2020 03:33:10 GMT

Success
```

Check your Stripe Dashboard under `Developer > Events` and you'll see we have successfully made a payment! Hooray!
