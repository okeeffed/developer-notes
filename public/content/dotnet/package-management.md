---
menu: Dotnet
name: Dotnet Package Management
---

# Dotnet Package Management

## Resources

1. [dotnet add package command](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-add-package)
2. [NuGet package manager](https://www.nuget.org/)
3. [Installing NuGet](https://docs.microsoft.com/en-us/nuget/install-nuget-client-tools)

## Installing a package on a Dotnet project

The tl;dr is that you run `dotnet add package [pkg]` in .NET projects. Example: `dotnet add package Newtonsoft.Json`.

As for an example of the Stripe installation, run `dotnet add package Stripe.net` and after a successful installation you will see the following in the `.csproj` file:

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>netcoreapp3.1</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <!-- The important reference for Stripe.net -->
    <PackageReference Include="Stripe.net" Version="34.13.0" />
  </ItemGroup>



</Project>
```

## Specific Examples

```shell
# add `Newtonsoft.Json` NuGet package
dotnet add package Newtonsoft.Json
# add specific version of package to a project
dotnet add ToDo.csproj package Microsoft.Azure.DocumentDB.Core -v 1.0.0
# add package using a specific NuGet source
dotnet add package Microsoft.AspNetCore.StaticFiles -s https://dotnet.myget.org/F/dotnet-core/api/v3/index.json
```

## Other useful commands

```shell
# show packages
dotnet list pacakge
# remove package
dotnet remove package $PACKAGE_NAME
```
