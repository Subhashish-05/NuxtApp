import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  const allPosts = await prisma.post.findMany({
    select: {
      post_id: true,
      title: true,
      description: true,
      post_url: true,
    },
  });

  return allPosts;
});
