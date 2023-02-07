import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  const allQuizzes = await prisma.quiz.findMany({
    select: {
      quiz_id: true,
    title: true,
      body: true,
      quiz_url: true,
    },
  });
  const allQuiz = [];
  for (const quizData of allQuizzes) {
    const quiz = {
      ...quizData,
      quiz_url: `/quiz/${quizData.quiz_url}`,
    };
    allQuiz.push(quiz);
  }
  return allQuiz;
});
