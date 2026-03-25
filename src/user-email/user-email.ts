import { prisma } from "../../lib/prisma";
import { addUser } from "./addUser";

// Create some users
await addUser("lisa@prisma.io", "Lisa");
await addUser("bob@prisma.io", "Bob");
await addUser("Patrick@prisma.io", "Patrick");

// Fetch all users
console.log(
	"All users:",
	JSON.stringify(await prisma.user.findMany(), null, 2),
);

// Close the Prisma Client
await prisma.$disconnect();
