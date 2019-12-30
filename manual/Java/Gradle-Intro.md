---
menu: Java
name: Gradle Intro
---

# Gradle Intro

References:

1. https://guides.gradle.org/consuming-jvm-libraries/

## Create Project + Add Gradle

Ensure you have [installed Gradle first](https://gradle.org/install).

For Mac users, `brew install gradle` will get you up and going.

```shell
mkdir consuming-jvm-libraries
cd consuming-jvm-libraries
gradle wrapper
```

You should get `BUILD SUCCESSUL` output.

## Generating base files

```shell
touch settings.gradle build.gradle

# write into settings.gradle
rootProject.name = "appName"

# write into build.gradle
apply plugin : 'java'

repositories {
    jcenter()
}
```

We are using `JCenter` as the repository to grab our external package.

> _In order to find artifacts you have to tell Gradle where to look. Gradle supports two specialized repository types - Maven & Ivy, among others. In addition, Gradle supports simplified configuration for the most popular centralized repositories - JCenter, Maven Central, and Google’s Android repository. In this guide you are using JCenter as it has access to all of the repositories hosted on Maven Central as well as many more that are published to Bintray._

## Adding the dependency

In this particular project, we want to use `JFiglet` to add some Ascii-art.

Add the following to the `build.gradle` file:

```java
dependencies {
    implementation 'com.github.lalyos:jfiglet:0.0.8'
}
```

Note that Gralde supports a variety of noitations. The one used here is known as `Maven coordinates`.

> _Adding a dependency has two parts: one is the dependency itself and the other is the configuration to which it is added. The latter term is used in Gradle to effectively group dependencies together by context. The current build uses the implementation configuration, which is provided by the Java Plugin._

The purpose of the `implementation` configuration is to collect dependencies that are used by a library or application and add them to the compilation classpath, but not export them via any of its APIs. As this is a stand-alone application, all dependencies can be placed in this configuration for purposes of application construction. This makes the use of the JFiglet library an implementation detail that can be changed a later date without affecting any clients.

You can inspect all of the dependencies you have added on a per-configuration basis, by using the dependencies task that is built into Gradle `./gradlew dependencies --configuration implementation`.

## Building the application

In the `src/main/java`, folder, place `AppName.java` with the following:

```java
import java.io.IOException;
import com.github.lalyos.jfiglet.FigletFont;

public class AppName {
    public static void main(String[] args) throws IOException {
        String asciiArt = FigletFont.convertOneLine("Hello, " + args[0]);
        System.out.println(asciiArt);
    }
}
```

Building the application is easy with `./gradlew jar`.

## Distribution

Given that this is a application that we will want to distribute, edit `build.gradle` again and add the Application plugin:

```java
apply plugin : 'application'
mainClassName = 'AppName'
```

If we now build with `./gradlew build` we will notice `build/distributions` has a `.zip` and `.tar` archive that we can use `./gradlew installDist` to install the application into the `build/install` folder for validation purposes.

We can now run our application with:

```bash
cd build/install/greeterApp
./bin/greeterApp Gradle

# output
  _   _          _   _                  ____                      _   _
 | | | |   ___  | | | |   ___          / ___|  _ __    __ _    __| | | |   ___
 | |_| |  / _ \ | | | |  / _ \        | |  _  | '__|  / _` |  / _` | | |  / _ \
 |  _  | |  __/ | | | | | (_) |  _    | |_| | | |    | (_| | | (_| | | | |  __/
 |_| |_|  \___| |_| |_|  \___/  ( )    \____| |_|     \__,_|  \__,_| |_|  \___|
                                |/
```

## Summary

You've now figured out how to:

1. How to configure repositories and dependencies.
2. Build an application consuming external dependencies.
3. Distribute an application with all external dependencies.
