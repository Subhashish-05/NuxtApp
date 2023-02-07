import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.email || !body.password) {
    return;
  }

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
    select: {
      id: true,
      user_id: true,
      name: true,
      user_role: true,
    },
  });

  if (!user) {
    return;
  }

  const password = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  if (!password) {
    return;
  }

  const verified = await compare(body.password, password.password);

  if (!verified) {
    return;
  }

  return user;
});
