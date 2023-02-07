import { PrismaClient } from "@prisma/client";
import cryptoRandomString from "crypto-random-string";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = await prisma.user.findFirst({
    where: { user_id: body.user_id },
  });
  await prisma.post.create({
    data: {
      post_id: cryptoRandomString({ length: 10, type: "url-safe" }),
      category: body.category,
      sub_category: body.sub_category,
      title: body.title,
      body: body.body,
      description: body.description,
      keywords: body.keywords,
      slug: body.slug,
      post_url: body.post_url,
    },
  });
  return { message: "Post Created" };
});
