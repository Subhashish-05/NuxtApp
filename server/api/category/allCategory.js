import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  const allCategories = await prisma.category.findMany({
    select: {
      slug: true,
      title: true,
    },
  });
  return allCategories;
});
