import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import express from "express";
import "dotenv/config";
import cors from "cors";

const { PrismaClient } = pkg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express();
app.use(express.json());
app.use(cors());

// Create a product (req.body)
app.post("/products", async (req, res) => {
	try {
		const newProduct = await prisma.product.create({ data: req.body });
		res.json(newProduct);
	} catch (error) {
		res.status(500).send(
			error instanceof Error ? error.message : "Unknown error",
		);
	}
});

// get alla products in stock
app.get("/products", async (req, res) => {
	try {
		const products = await prisma.product.findMany({
			where: { stock: { gt: 0 } },
		});
		res.json(products);
	} catch (error) {
		res.status(500).send(
			error instanceof Error ? error.message : "Unknown error",
		);
	}
});

// Get product by category (req.params)
app.get("/products/:categoryId", async (req, res) => {
	try {
		const products = await prisma.product.findMany({
			where: { categoryId: Number(req.params.categoryId) },
		});
		res.json(products);
	} catch (error) {
		res.status(500).send(
			error instanceof Error ? error.message : "Unknown error",
		);
	}
});

// Update product by id (req.params)
app.patch("/products/:productId", async (req, res) => {
	try {
		const updated = await prisma.product.update({
			where: { id: Number(req.params.productId) },
			data: req.body,
		});
		res.json(updated);
	} catch (error) {
		res.status(500).send(
			error instanceof Error ? error.message : "Unknown error",
		);
	}
});

// Delete product by id (req.params)
app.delete("/orders/:orderId", async (req, res) => {
	try {
		const orderId = Number(req.params.orderId);

		if (isNaN(orderId)) {
			return res.status(400).json({ error: "Invalid order ID" });
		}

		const deletedOrder = await prisma.order.delete({
			where: { id: orderId },
		});

		res.json(deletedOrder);
	} catch (error) {
		if (error instanceof Error) {
			if (error.message.includes("No result")) {
				return res.status(404).json({ error: "Order not found" });
			}
		}
		res.status(500).json({ error: "Failed to delete order" });
	}
});

// Start the server
app.listen(3000, () => {
	console.log("Server is running on http://localhost:3000");
});
