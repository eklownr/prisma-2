import { prisma } from "../../lib/prisma";

async function main() {
	const user = await prisma.user.findUnique({
		where: { email: "alice@prisma.io" },
	});
	console.log(user?.name);
}

export async function getUser(name: string) {
	if (!name) {
		throw new Error("Name is required");
	}

	const user = await prisma.user.findUnique({
		where: { name: name },
	});
	console.log(user?.name);
}
