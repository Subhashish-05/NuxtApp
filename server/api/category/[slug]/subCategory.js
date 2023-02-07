import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const allSubCategories = await prisma.subcategory.findMany({
    where: {
      title: event.context.params.slug,
    },
  });

  console.log(allSubCategories);
  return allSubCategories;
});
