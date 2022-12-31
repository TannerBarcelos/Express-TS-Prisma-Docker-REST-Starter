import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { Post } from '../src/utils/zodTypes';

const prismaClient = new PrismaClient();

function genRandomPosts(rounds: number = 5) {
  const posts: Pick<Post, 'content'>[] = [];
  for (let i = 0; i < rounds; i++) {
    posts.push({
      content: faker.lorem.lines(2),
    });
  }
  return posts;
}

async function main() {
  for (let i = 0; i < 25; i++) {
    const email = faker.internet.email();
    const name = faker.name.firstName() + ' ' + faker.name.lastName();
    const password = faker.internet.password(8);
    await prismaClient.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name,
        password,
        posts: {
          createMany: {
            data: genRandomPosts(),
          },
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });
