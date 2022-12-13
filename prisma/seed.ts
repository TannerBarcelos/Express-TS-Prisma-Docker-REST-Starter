import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 25; i++) {
    const email = faker.internet.email();
    const name = faker.name.firstName() + ' ' + faker.name.lastName();
    const password = faker.internet.password(8);
    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name,
        password,
        posts: {
          create: {
            content: faker.lorem.lines(2),
          },
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
