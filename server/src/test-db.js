import prisma from "./config/prisma.js";

async function testDatabase() {
  try {
    await prisma.$connect();

    const result = await prisma.user.count();

    console.log("✅ PostgreSQL + Prisma connected successfully!");
    console.log(`👤 Users in database: ${result}`);
  } catch (error) {
    console.error("❌ Database connection failed:");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();