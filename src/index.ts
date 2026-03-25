import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import express from "express";
import "dotenv/config";

const { PrismaClient } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express();
app.use(express.json());

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

// // GET all users
// app.get('/userlanguages', async (req, res) => {
//   try {
//     const users = await prisma.userLanguage.findMany();
//     res.json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch users' });
//   }
// });
//
// // GET user by language
// app.get('/userlanguages/:language', async (req, res) => {
//   try {
//     const { language } = req.params;
//     const users = await prisma.userLanguage.findMany({
//       where: { languages: { has: language } },
//     });
//     res.json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch users' });
//   }
// });
//
// // add user
// app.post('/userlanguages', async (req, res) => {
//   try {
//     const { name, email, languages, age } = req.body;
//     const user = await prisma.userLanguage.create({
//       data: { name, email, languages, age },
//     });
//     res.json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to create user' });
//   }
// });
//
// // Return the updated user, picked by email
// app.put('/userlanguages/:email', async (req, res) => {
//   try {
//     const { email } = req.params;
//     const { languages } = req.body;
//     const user = await prisma.userLanguage.update({
//       where: { email },
//       data: { languages },
//     });
//     res.json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to update user' });
//   }
// });
//
// //Change email
// app.patch('/userlanguages/:email', async (req, res) => {
//   try {
//     const { email } = req.params;
//     const { email: newEmail } = req.body;
//     const user = await prisma.userLanguage.update({
//       where: { email },
//       data: { email: newEmail },
//     });
//     res.json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to update user' });
//   }
// });
//
// // Delete the user by age less then 18 years
// app.delete('/userlanguages/:age', async (req, res) => {
//   try {
//     const { age } = req.params;
//     const user = await prisma.userLanguage.deleteMany({
//       where: { age: { lt: Number(age) } },
//     });
//     res.json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to delete user' });
//   }
// });

app.listen(3000, () => {
	console.log("Server is running on http://localhost:3000");
});
