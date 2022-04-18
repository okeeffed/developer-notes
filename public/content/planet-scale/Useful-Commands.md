# PlanetScale - Useful Commands

## Resources

1. [PlanetScale - How to seed a database with Prisma and Next.js](https://planetscale.com/blog/how-to-seed-a-database-with-prisma-and-next-js)
2. [PlanetScale - Prisma quickstart](https://docs.planetscale.com/tutorials/prisma-quickstart)
3. [PlanetScale - org CLI commands](https://docs.planetscale.com/reference/org)
4. [PlanetScale - branching](https://docs.planetscale.com/concepts/branching)

## Working with Prisma on NPM projects

These scripts are designe for a "staging" branch on PlanetScale.

After creating a new database, create that `staging` branch on PlanetScale.

```s
# Creating the app + branch
$ pscale db create <APP> --region <REGION>
$ pscale branch create <APP> staging
```

> Note: You many also need to switch organisation with `pscale org switch <ORGANIZATION_NAME>`.

Then update `package.json` to the following:

```json
{
  "scripts": {
    "pscale:migrate": "NODE_ENV=production dotenv-flow npx prisma db push --preview-feature",
    "pscale:connect": "NODE_ENV=development dotenv-flow pscale connect wol-dev staging --port 3309"
  }
}
```

Run `npm run pscale:connect` in one terminal and `npm run pscale:migrate` in another. This will bring things up to date if successful.

For seeding, you can run `NODE_ENV=production dotenv-flow npx prisma db seed`.

## Promoting staging to main

The following can be used to promoto a database branch.

```s
$ pscale branch promote <DATABASE_NAME> <BRANCH_NAME>
# ...
```

So to promote staging:

```s
$ pscale branch promote <DATABASE_NAME> staging
# ...
```
