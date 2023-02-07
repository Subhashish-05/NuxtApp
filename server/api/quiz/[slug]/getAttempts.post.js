import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const results = await prisma.results.findMany({
    where: {
      quiz_id: event.context.params.slug,
    },
    select: {
      session_id: true,
    },
  });

  const sessions = [];

  for (const session of results) {
    const session_url = {
      url: `/results/${event.context.params.slug}/${session.session_id}`,
    };
    sessions.push(session_url.url);
  }

  return sessions;
});
