import { PrismaClient } from "@prisma/client";
import cryptoRandomString from "crypto-random-string";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  await prisma.subcategory.create({
    data: {
      title: body.title,
      slug: body.slug,
      category: body.category_id,
      subCategoryId: cryptoRandomString({ length: 8, type: "distinguishable" }),
    },
  });

  return {
    message: "SubCategory Created!",
  };
});
