// addUser.ts
import { prisma } from "../../lib/prisma";

export async function addUser(email: string, name: string) {
	try {
		await prisma.user.upsert({
			where: { email: email },
			update: {},
			create: { email: email, name: name },
		});
	} catch (error) {
		if (
			error instanceof Error &&
			"code" in error &&
			error.code === "P2002"
		) {
			throw new Error("User with this email already exists");
		}
		throw error;
	}
}
