## Useful links

- https://gist.github.com/tfield/55064fc0c3f80fa67f624874f0b8d55e
- [jenv.be](https://www.jenv.be/)
- [sdkman](https://sdkman.io/)
- https://joerg-pfruender.github.io/software/java/2022/12/30/sdkman_j.html

In my case, I wanted to use something to manage which releases of Java I was using.

## Getting started

`curl -s "https://get.sdkman.io" | bash`

At this point, you can run `sdk version` to confirm it works (after opening a new terminal or sourcing the shell file).

You can install the latest JDK version with `sdk install java`.

## What is the JDK?

https://www.simplilearn.com/tutorials/java-tutorial/jdk-in-java
https://www.geeksforgeeks.org/jdk-in-java/

tl;dr the Java Development Kit is a bundle of software development tools and supporting libraries combined with the Java Runtime Environment (JRE) and Java Virtual Machine (JVM).

**JDK contains:**

- Java Runtime Environment (JRE),
- An interpreter/loader (Java),
- A compiler (javac),
- An archiver (jar) and many more.

The  Java Runtime Environment in JDK is usually called Private Runtime because it is separated from the regular JRE and has extra content. The Private Runtime in JDK contains a JVM and all the class libraries present in the production environment, as well as additional libraries useful to developers, e.g, internationalization libraries and the IDL libraries.

### **Most Popular JDKs:**

- **Oracle JDK:** the most popular JDK and the main distributor of Java11,
- **OpenJDK:** Ready for use: JDK 15, JDK 14, and JMC,
- **Azul Systems Zing:** efficient and low latency JDK for Linux os,
- **Azul Systems:** based Zulu brand for Linux, Windows, Mac OS X,
- **IBM J9 JDK:** for AIX, Linux, Windows, and many other OS,
- **Amazon Corretto:** the newest option with the no-cost build of OpenJDK and long-term support.
