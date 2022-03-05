---
menu: Dotnet
name: Getting Started with Dotnet
---

# Getting Start with Dotnet

## Resources

1. [Dotnet in 10 Minutes](https://dotnet.microsoft.com/learn/dotnet/hello-world-tutorial/intro)
2. [Setting up full stack .NET web on MacOS](https://codeburst.io/how-to-set-up-a-modern-full-stack-net-web-development-environment-on-mac-os-542dcd43a564)
3. [Dotnet install](https://dotnet.microsoft.com/download)
4. [Symlinking Dotnet to /usr/local/bin post-installation](https://stackoverflow.com/questions/53030531/dotnet-command-not-found-in-mac)
5. [First web application](https://dotnet.microsoft.com/learn/aspnet/hello-world-tutorial/intro)
6. [Building a web API](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-3.1&tabs=visual-studio)

## Getting started

Follow resources [3] and [4] for getting installation going (installation example above is for MacOS).

Afterwards, run `dotnet` to confirm things are working. If nothing happens after installation, ensure you have followed resource [4] to symlink the installation to your path (or add the folder to path).

## Creating a Console App

We simply run the following to start a new console app.

The following creates new app of type console into the `myApp` folder:

```shell
dotnet new console -o myApp
cd myApp
```

The above code will also generate a file named `Program.cs` into `myApp`, along with `myApp.csproj` config for library usage and an `obj` folder.

```csharp
// Program.cs
using System;

namespace myApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
    }
}
```

If we now fire `dotnet run` from the command line, we will see our `Hello World!` response. Hooray!

Moving further, we could add more lines into our `Main` program like `Console.WriteLine("The current time is " + DateTime.Now);` to update what we get.

## Creating a Web application

The following initialises a web application in the folder `myWebApp`:

```shell
# note that we are specifying not to enable https in this particular instance
dotnet new webApp -o myWebApp --no-https
```

Several files were created in the myWebApp directory, to give you a simple web application that is ready to run.

1. `Startup.cs` contains all the settings and configurations.
2. The `myWebApp/Pages` directory contains some example web pages for the application.
3. `myWebApp.csproj` defines what libraries are referenced etc.

If we run `dotnet run` we will have a local development environment open up at port `5000`.

## Updating the code in the application

Editing `Pages/Index.cshtml` with the following will edit the application to show the server time:

```csharp
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}

<div class="text-center">
    <h1>Hello, world!</h1>
    <p>The time on the server is @DateTime.Now</p>
</div>
```
