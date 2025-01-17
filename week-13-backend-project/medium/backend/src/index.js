import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const connect = await prisma.$connect();
    console.log(connect);
}
main();
