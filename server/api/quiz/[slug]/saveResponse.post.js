import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const subject = body.subject;
  const correctAns = await prisma.quizQuestion.findFirst({
    where: {
      quiz_id: event.context.params.slug,
      question_no: body.question_no,
    },
    select: {
      correct: true,
    },
  });

  const response = {
    qNo: body.question_no,
    userSelection: body.selectedValue,
    compSelection: correctAns.correct,
  };

  const quizUserResponses = await prisma.responses.findFirst({
    where: {
      quiz_id: event.context.params.slug,
      session_id: body.session_id,
      is_quiz_submitted: false,
    },
  });

  if (quizUserResponses.responses[subject].length === 0) {
    return "Response Saved!";
  }

  const hasPreviousResponse = quizUserResponses.responses[subject].findIndex(
    (res) => res.qNo === response.qNo
  );

  const userResponse = quizUserResponses.responses[subject];

  if (hasPreviousResponse !== -1) {
    userResponse.splice(hasPreviousResponse, 1, response);
  } else {
    userResponse.push(response);
  }

  quizUserResponses.responses[subject] = userResponse;

  await prisma.responses.update({
    data: {
      responses: quizUserResponses.responses,
    },
    where: {
      id: quizUserResponses.id,
    },
  });

  return "Response Saved!";
});
