import { PrismaClient } from "@prisma/client";
import cryptoRandomString from "crypto-random-string";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const quiz = await prisma.quiz.findFirst({
    where: {
      quiz_id: event.context.params.slug,
    },
  });

  if (!quiz) {
    return "No Quiz Found!";
  }

  const quizQuestions = await prisma.quizQuestion.findMany({
    where: {
      quiz_id: event.context.params.slug,
    },
  });

  const Responses = await prisma.responses.findFirst({
    where: {
      quiz_id: event.context.params.slug,
      is_quiz_submitted: false,
    },
    select: {
      responses: true,
      session_id: true,
    },
  });

  const subjects = JSON.parse(quiz.section_wise_subjects['"qSubjects"']);
  const initialArray = JSON.parse(quiz.section_wise_questions['"qQuestions"']);

  let questionData = [];
  const calc = (array, i1, i2) => {
    let result = 0;
    array.slice(i1, i2 + 1).forEach((e) => (result += +e));
    return result;
  };
  for (let i = 0; i < initialArray.length; i++) {
    questionData[i] = calc(initialArray, 0, i);
  }

  let questionD = [];
  const calcu = (array, i1, i2) => {
    let result = 0;
    array.slice(i1, i2 - i1).forEach((e) => (result += +e));
    return result;
  };
  for (let i = 0; i < initialArray.length; i++) {
    questionD[i] = calcu(initialArray, 0, i);
  }

  const sessionId = cryptoRandomString({ length: 10 });

  if (!Responses) {
    await prisma.responses.create({
      data: {
        quiz_id: event.context.params.slug,
        quiz: quiz.title,
        responses: {},
        session_id: sessionId,
        is_quiz_submitted: false,
      },
    });
    return {
      subjects: subjects,
      session_id: sessionId,
      quizQuestionData: questionData,
      totalQuestions: questionData.pop(),
      initialQuestionData: questionD,
      originalQuestionData: initialArray,
      quizInfo: quizQuestions,
    };
  }

  if (!Responses.is_quiz_submitted) {
    return {
      subjects: subjects,
      session_id: Responses.session_id,
      quizQuestionData: questionData,
      totalQuestions: questionData.pop(),
      initialQuestionData: questionD,
      originalQuestionData: initialArray,
      quizInfo: quizQuestions,
    };
  }
});
