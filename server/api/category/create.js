import { PrismaClient } from "@prisma/client";
import cryptoRandomString from "crypto-random-string";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = await prisma.user.findFirst({
    where: { user_id: body.user_id },
  });
  await prisma.category.create({
    data: {
      title: body.title,
      slug: body.slug,
      description: body.description,
      category_id: cryptoRandomString({ length: 6, type: "alphanumeric" }),
      authorId: user.user_id,
    },
  });
  return "Category Created";
});
