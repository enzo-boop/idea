const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");
  let pass: string = await bcrypt.hash("Ciao123!", 10);
  const user = await prisma.user.upsert({
    where: { email: "admin@idea.com" },
    update: {},
    create: {
      email: "admin@idea.com",
      name: "admin",
      password: pass,
      createdAt: new Date(),
    },
  });

  console.log("Database seeded!", user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
