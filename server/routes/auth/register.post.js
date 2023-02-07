import cryptoRandomString from "crypto-random-string";
import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const hashed = await hash(body.password, 12);

  await prisma.user.create({
    data: {
      user_id: cryptoRandomString({ length: 10, type: "distinguishable" }),
      name: body.name,
      email: body.email,
      password: hashed,
      subscriptions: {},
    },
  });
  return "User Saved";
});
