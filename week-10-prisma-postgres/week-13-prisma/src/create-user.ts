import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["info", "query"] });

async function main() {
  // ... you will write your Prisma Client queries here
  await prisma.user.create({
    data: {
      email: "Sahunitins970@gmail.com",
      name: "Nitin Sahu",
    },
  });
}

main();
