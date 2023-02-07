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

  const Solutions = await prisma.results.findFirst({
    where: {
      quiz_id: event.context.params.slug,
      session_id: body.session_id,
    },
    select: {
      correct: true,
      incorrect: true,
      unattempted: true,
    },
  });

  for (const id of subjects) {
    const correctLength = Solutions.correct[id].length;
    for (let i = 0; i < correctLength; i++) {
      const correctAns = await prisma.quizQuestion.findFirst({
        where: {
          quiz_id: event.context.params.slug,
          question_no: Solutions.correct[id][i],
        },
        select: {
          question_id: true,
        },
      });
      const question = await prisma.questionBank.findFirst({
        where: {
          question_id: correctAns.question_id,
        },
        select: {
          id: true,
          question: true,
          options: true,
          correct: true,
        },
      });
      Solutions.correct[id].splice(i, 1, question);
    }
    const incorrectLength = Solutions.incorrect[id].length;
    for (let i = 0; i < incorrectLength; i++) {
      const incorrectAns = await prisma.quizQuestion.findFirst({
        where: {
          quiz_id: event.context.params.slug,
          question_no: Solutions.incorrect[id][i],
        },
        select: {
          question_id: true,
        },
      });
      const question = await prisma.questionBank.findFirst({
        where: {
          question_id: incorrectAns.question_id,
        },
        select: {
          id: true,
          question: true,
          options: true,
          correct: true,
        },
      });
      const response = await prisma.responses.findFirst({
        where: {
          quiz_id: event.context.params.slug,
          session_id: body.session_id,
        },
        select: {
          responses: true,
        },
      });
      const userResponse = response.responses[id][i]["userSelection"];
      Solutions.incorrect[id].splice(i, 1, { question, userResponse });
    }
    const unattemptedLength = Solutions.unattempted[id].length;
    for (let i = 0; i < unattemptedLength; i++) {
      const unattemptedAns = await prisma.quizQuestion.findFirst({
        where: {
          quiz_id: event.context.params.slug,
          question_no: Solutions.unattempted[id][i],
        },
        select: {
          question_id: true,
        },
      });
      const question = await prisma.questionBank.findFirst({
        where: {
          question_id: unattemptedAns.question_id,
        },
        select: {
          id: true,
          question: true,
          options: true,
          correct: true,
        },
      });
      Solutions.unattempted[id].splice(i, 1, question);
    }
  }

  return { solutions: Solutions, subjects: subjects };
});
