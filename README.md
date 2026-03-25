# User Language API

A simple API to manage user language data using Express, TypeScript, and Prisma.

## How to Run the Server

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

Set up your .env file with DATABASE_URL
Generate Prisma client:

```bash
npx prisma generate
```

Migrate you db:

```bash
pnpm exec prisma migrate dev --name create_shoping_orders
```

Start the server:

```bash
pnpm run dev
```

The server runs on http://localhost:3000

# How to Test Routes

Use curl, Postman, or any API client:

### GET all users:

GET /userlanguages

### Create a user:

POST /userlanguages

```json
{
	"name": "John Doe",
	"email": "john@example.com",
	"languages": ["English", "Spanish"],
	"age": 30
}
```

# New Routes Created

<span style="color:#ff5733"> GET, POST, UPDATE, PATH, DELETE </span>

```
GET /userlanguages – Returns all users
POST /userlanguages – Creates a new user with name, email, languages array, and age
GET /userlanguages/:language - Return all users that match language
UPDATE /userlanguages/:language - update language list for user with matching email
PATCH /userlanguages/:email - update email for user with matching email
DELETE /userlanguages/:age - set age to delete all less then age
```

# Usage prisma command

      $ npx prisma [command]

## Commands

                init   Set up Prisma for your app
                 dev   Start a local Prisma Postgres server for development
            generate   Generate artifacts (e.g. Prisma Client)
                  db   Manage your database schema and lifecycle
             migrate   Migrate your database
              studio   Browse your data with Prisma Studio
            validate   Validate your Prisma schema
              format   Format your Prisma schema
             version   Displays Prisma version info
               debug   Displays Prisma debug info
            platform   Prisma Data Platform commands
                 mcp   Starts an MCP server to use with AI development tools

## Flags

         --preview-feature   Run Preview Prisma commands
         --help, -h          Show additional information about a command

## Initialized Prisma in your project

prisma/
schema.prisma
prisma.config.ts
.env
.gitignore

## Next, choose how you want to set up your database:

CONNECT EXISTING DATABASE:

1. Configure your DATABASE_URL in prisma.config.ts
2. Run prisma db pull to introspect your database.

CREATE NEW DATABASE:
Local: npx prisma dev (runs Postgres locally in your terminal)
Cloud: npx create-db (creates a free Prisma Postgres database)

## Then, define your models in prisma/schema.prisma and run prisma migrate dev to apply your schema.

Learn more: https://pris.ly/getting-started
