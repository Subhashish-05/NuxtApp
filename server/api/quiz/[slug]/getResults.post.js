import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const quiz = await prisma.quiz.findFirst({
    where: {
      quiz_id: event.context.params.slug,
    },
  });

  const subjects = JSON.parse(quiz.section_wise_subjects['"qSubjects"']);

  const body = await readBody(event);

  const results = await prisma.results.findFirst({
    where: {
      quiz_id: event.context.params.slug,
      session_id: body.session_id,
    },
    select: {
      correct_points: true,
      incorrect_points: true,
      unattempted_points: true,
      subject_wise_points: true,
      grand_total: true,
    },
  });

  return { results: results, subjects: subjects };
});
