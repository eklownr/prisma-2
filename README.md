# Products API

A simple API to manage products, user and order data using Express, TypeScript, and Prisma.

## How to Run the Server

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

### Set up your .env file with DATABASE_URL

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

The backend server runs on http://localhost:3000

## run frontend.html with five server

frontend server runs on http://localhost:5500

# How to Test Routes

Use curl, Postman, or any API client:

### GET all pruduct

GET /products

### Create new product

POST /products

### Update product

patch /products/:productId
