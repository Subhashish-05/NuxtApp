import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const questionId = await prisma.quizQuestion.findFirst({
    where: {
      quiz_id: event.context.params.slug,
      section: event.context.params.subject,
      question_no: +event.context.params.qNo,
    },
  });
  if (!questionId) {
    return "No Question Found";
  }

  const quizQuestion = await prisma.questionBank.findFirst({
    where: {
      question_id: questionId.question_id,
      section: questionId.section,
    },
    select: {
      question: true,
      options: true,
      optionsLength: true,
    },
  });

  const currQues = {
    id: questionId.question_no,
    question: quizQuestion.question,
    options: quizQuestion.options,
    optionsLength: quizQuestion.optionsLength,
  };

  const body = await readBody(event);

  const Responses = await prisma.responses.findFirst({
    where: {
      session_id: body.session_id,
      quiz_id: event.context.params.slug,
      is_quiz_submitted: false,
    },
    select: {
      id: true,
      responses: true,
    },
  });

  const qId = [];

  const questionIds = await prisma.quizQuestion.findMany({
    where: {
      quiz_id: event.context.params.slug,
      section: event.context.params.subject,
    },
    select: {
      question_no: true,
    },
  });

  for (const id of questionIds) {
    const qI = id.question_no;
    qId.push(qI);
  }

  if (Responses.responses[event.context.params.subject] === undefined) {
    const initialResponses = [];

    for (const id of qId) {
      const response = {
        qNo: id,
        userSelection: 0,
      };
      initialResponses.push(response);
    }
    Responses.responses[event.context.params.subject] = initialResponses;

    await prisma.responses.update({
      data: {
        responses: Responses.responses,
      },
      where: {
        id: Responses.id,
      },
    });
  }

  const index = Responses.responses[event.context.params.subject].findIndex(
    (Res) => Res.qNo === +event.context.params.qNo
  );

  return {
    currentQ: currQues,
    responses: Responses.responses[event.context.params.subject][index],
  };
});
