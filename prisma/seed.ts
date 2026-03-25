
import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    await prisma.userLanguage.createMany({
      data: [
        { name: 'Alice Johnson', email: 'alice@example.com', languages: ['English', 'Spanish'], age: 29 },
        { name: 'Bob Smith', email: 'bob@example.com', languages: ['English', 'French'], age: 35 },
        { name: 'Charlie Lee', email: 'charlie@example.com', languages: ['English', 'Chinese'], age: 24 },
        { name: 'Diana King', email: 'diana@example.com', languages: ['English', 'German'], age: 31 },
        { name: 'Evan Brown', email: 'evan@example.com', languages: ['English', 'Italian'], age: 27 },
        { name: 'Fiona Davis', email: 'fiona@example.com', languages: ['English', 'Portuguese'], age: 33 },
        { name: 'George Wilson', email: 'george@example.com', languages: ['English', 'Japanese'], age: 26 },
        { name: 'Hannah Moore', email: 'hannah@example.com', languages: ['English', 'Russian'], age: 30 },
        { name: 'Ian Taylor', email: 'ian@example.com', languages: ['English', 'Korean'], age: 34 },
        { name: 'Julia White', email: 'julia@example.com', languages: ['English', 'Arabic'], age: 28 },
      ],
    });
    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
