---
menu: Dotnet
name: Adding Models in Dotnet
---

# Adding Models

## Resources

1. [Microsoft Docs: Add a model to an ASP.NET Core MVC app](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/adding-model?view=aspnetcore-3.1&tabs=visual-studio)
2. [DataAnnotatons used in tutorial](https://docs.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations?view=netframework-4.8)

## Add a data model class

Update the `Models/Movie.cs` file with the following code:

```csharp
using System;
using System.ComponentModel.DataAnnotations;

namespace MvcMovie.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; }

        [DataType(DataType.Date)]
        public DateTime ReleaseDate { get; set; }
        public string Genre { get; set; }
        public decimal Price { get; set; }
    }
}
```

- The Movie class contains an `Id` field, which is required by the database for the primary key.
- The DataType attribute on ReleaseDate specifies the type of the data (Date). With this attribute:
  1. The user is not required to enter time information in the date field.
  2. Only the date is displayed, not time information.

DataAnnotations are covered in a later tutorial.

## Add NuGet Packages

Reference **Resource [1]** in order to see installation examples for Visual Studio for Mac.

_Note: I haven't confirmed, but you may be able to get away with installing through dotnet CLI. From what I see later in the tutorial, NuGet may be required._

Packages required in this tutorial:

1. Microsoft.EntityFrameworkCore.SQLite
2. Microsoft.VisualStudio.Web.CodeGeneration.Design (likely not needed if installing by CLI)
3. Microsoft.EntityFrameworkCore.SqlServer
4. Microsoft.EntityFrameworkCore.Design

## Create database context class

A database context class is needed to coordinate EF Core functionality (Create, Read, Update, Delete) for the Movie model. The database context is derived from `Microsoft.EntityFrameworkCore.DbContext` and specifies the entities to include in the data model.

Create a Data folder.

Add a Data/MvcMovieContext.cs file with the following code:

```cs
using Microsoft.EntityFrameworkCore;
using MvcMovie.Models;

namespace MvcMovie.Data
{
    public class MvcMovieContext : DbContext
    {
        public MvcMovieContext (DbContextOptions<MvcMovieContext> options)
            : base(options)
        {
        }

        public DbSet<Movie> Movie { get; set; }
    }
}
```

The preceding code creates a `DbSet<Movie>` property for the entity set. In Entity Framework terminology, an entity set typically corresponds to a database table. An entity corresponds to a row in the table.

## Register the database context

ASP.NET Core is built with dependency injection (DI). Services (such as the EF Core DB context) must be registered with DI during application startup. Components that require these services (such as Razor Pages) are provided these services via constructor parameters. The constructor code that gets a DB context instance is shown later in the tutorial. In this section, you register the database context with the DI container.

Add to the top of Startup.cs:

```cs
using MvcMovie.Data;
using Microsoft.EntityFrameworkCore;
```

Add the following for `Startup.ConfigureServices`:

```cs
public void ConfigureServices(IServiceCollection services)
{
    services.AddControllersWithViews();

    services.AddDbContext<MvcMovieContext>(options =>
            options.UseSqlite(Configuration.GetConnectionString("MvcMovieContext")));
}
```

## Add a database connection string

Add `ConnectionStrings` config to `appsettings.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "MvcMovieContext": "Data Source=MvcMovie.db"
  }
}
```

## Scaffold movie pages

Use the scaffolding tool to produce Create, Read, Update, and Delete (CRUD) pages for the movie model.

```shell
dotnet aspnet-codegenerator controller -name MoviesController -m Movie -dc MvcMovieContext --relativeFolderPath Controllers --useDefaultLayout --referenceScriptLibraries
```

The following table details the ASP.NET Core code generator parameters:

| Parameter                  | Description                                              |
| -------------------------- | -------------------------------------------------------- |
| -m                         | The name of the model.                                   |
| -dc                        | The data context.                                        |
| -udl                       | Use the default layout.                                  |
| --relativeFolderPath       | The relative output folder path to create the files.     |
| --useDefaultLayout         | The default layout should be used for the views.         |
| --referenceScriptLibraries | Adds \_ValidationScriptsPartial to Edit and Create pages |

Note: for more help run `dotnet aspnet-codegenerator controller -h`

## Initial migration

Use the EF Core Migrations feature to create the database. Migrations is a set of tools that let you create and update a database to match your data model.

```shell
dotnet ef migrations add InitialCreate
dotnet ef database update
```

## The InitialCreate class

Examine the `Migrations/{timestamp}_InitialCreate.cs` migration file:

```cs
public partial class Initial : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "Movie",
            columns: table => new
            {
                Id = table.Column<int>(nullable: false)
                    .Annotation("SqlServer:ValueGenerationStrategy",
                                 SqlServerValueGenerationStrategy.IdentityColumn),
                Title = table.Column<string>(nullable: true),
                ReleaseDate = table.Column<DateTime>(nullable: false),
                Genre = table.Column<string>(nullable: true),
                Price = table.Column<decimal>(nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Movie", x => x.Id);
            });
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "Movie");
    }
}
```

The `Up` method creates the `Movie` table and configures `Id` as the primary key. The `Down` method reverts the schema changes made by the `Up` migration.

## Dependency injection in the controller

Finish off the tutorial notes [from here](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/adding-model?view=aspnetcore-3.1&tabs=visual-studio-mac#dependency-injection-in-the-controller)

Note: Stopping since the context is enough for other work to be completed.
