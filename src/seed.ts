import { faker } from "@faker-js/faker";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

import { Pool } from "@neondatabase/serverless";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
	// Rensa befintliga data
	await prisma.orderItem.deleteMany();
	await prisma.order.deleteMany();
	await prisma.product.deleteMany();
	await prisma.category.deleteMany();
	await prisma.customer.deleteMany();

	// Skapa kunder
	const customers = await Promise.all(
		Array.from({ length: 10 }, () =>
			prisma.customer.create({
				data: {
					name: faker.person.fullName(),
					email: faker.internet.email(),
				},
			}),
		),
	);

	// Skapa kategorier
	const categories = await Promise.all(
		["Electronics", "Clothing", "Books", "Home", "Sports"].map((name) =>
			prisma.category.create({ data: { name } }),
		),
	);

	// Skapa produkter
	const products = await Promise.all(
		Array.from({ length: 30 }, () =>
			prisma.product.create({
				data: {
					name: faker.commerce.productName(),
					price: parseFloat(faker.commerce.price()),
					stock: faker.number.int({ min: 0, max: 100 }),
					categoryId:
						categories?.[
							Math.floor(
								Math.random() * (categories?.length ?? 0),
							)
						]?.id ?? null,
				},
			}),
		),
	);

	// Skapa ordrar och order-rader
	await Promise.all(
		customers.map(async (customer) => {
			const order = await prisma.order.create({
				data: {
					customerId: customer.id,
				},
			});

			// Lägg till 1–5 produkter i varje order
			const orderProducts = faker.helpers.arrayElements(products, {
				min: 1,
				max: 5,
			});
			await Promise.all(
				orderProducts.map((product) =>
					prisma.orderItem.create({
						data: {
							orderId: order.id,
							productId: product.id,
							quantity: faker.number.int({ min: 1, max: 3 }),
						},
					}),
				),
			);
		}),
	);

	console.log("✅ Database seeded successfully!");
}

main()
	.catch((e) => {
		console.error("Error seeding database:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
