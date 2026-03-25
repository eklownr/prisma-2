import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function seedData() {
	// Seed customers
	const customers = [
		{ name: "Customer 1", email: "customer1@example.com" },
		{ name: "Customer 2", email: "customer2@example.com" },
		{ name: "Customer 3", email: "customer3@example.com" },
	];

	await Promise.all(
		customers.map(async (customer) => {
			await prisma.customer.create({ data: customer });
		}),
	);

	// Seed categories
	const categories = [
		{ name: "Category 1" },
		{ name: "Category 2" },
		{ name: "Category 3" },
	];

	await Promise.all(
		categories.map(async (category) => {
			await prisma.category.create({ data: category });
		}),
	);

	// Seed products
	const products = [
		{ name: "Product 1", price: 10, stock: 50, categoryId: 1 },
		{ name: "Product 2", price: 20, stock: 30, categoryId: 1 },
		{ name: "Product 3", price: 15, stock: 70, categoryId: 2 },
		{ name: "Product 4", price: 25, stock: 40, categoryId: 2 },
		{ name: "Product 5", price: 30, stock: 60, categoryId: 3 },
		{ name: "Product 6", price: 35, stock: 80, categoryId: 3 },
	];

	await Promise.all(
		products.map(async (product) => {
			await prisma.product.create({ data: product });
		}),
	);

	// Seed orders
	const orders = [
		{ orderDate: new Date(), customerId: 1 },
		{ orderDate: new Date(), customerId: 2 },
		{ orderDate: new Date(), customerId: 3 },
	];

	await Promise.all(
		orders.map(async (order) => {
			await prisma.order.create({ data: order });
		}),
	);

	// Seed order items
	const orderItems = [
		{ orderId: 1, productId: 1, quantity: 2 },
		{ orderId: 1, productId: 2, quantity: 3 },
		{ orderId: 2, productId: 3, quantity: 1 },
		{ orderId: 2, productId: 4, quantity: 2 },
		{ orderId: 3, productId: 5, quantity: 3 },
		{ orderId: 3, productId: 6, quantity: 4 },
	];

	await Promise.all(
		orderItems.map(async (orderItem) => {
			await prisma.orderItem.create({ data: orderItem });
		}),
	);

	console.log("Data seeded successfully!");
}

seedData()
	.then(() => prisma.$disconnect())
	.catch((error) => {
		console.error("Error seeding data:", error);
		prisma.$disconnect();
	});
