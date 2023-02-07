import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const quiz = await prisma.quiz.findFirst({
    where: {
      quiz_id: event.context.params.slug,
    },
  });

  const subjects = JSON.parse(quiz.section_wise_subjects['"qSubjects"']);

  const Responses = await prisma.responses.findFirst({
    where: {
      quiz_id: event.context.params.slug,
      session_id: body.session_id,
    },
    select: {
      id: true,
      responses: true,
    },
  });

  const correct_points = {};
  const incorrect_points = {};
  const unattempted_points = {};
  const correct_questions = {};
  const incorrect_questions = {};
  const unattempted_questions = {};
  const sub_wise_questions = {};
  let grand_total = 0;

  for (const id of subjects) {
    const cQ = [];
    const wQ = [];
    const uQ = [];
    let tS = 0;
    let correct_score = 0;
    let incorrect_score = 0;
    let unattempted_score = 0;

    const length = Responses.responses[id].length;

    for (let i = 0; i < length; i++) {
      if (
        Responses.responses[id][i]["userSelection"] ===
        Responses.responses[id][i]["compSelection"]
      ) {
        tS++;
        sub_wise_questions[id] = tS;
        cQ.push(Responses.responses[id][i]["qNo"]);
        grand_total += quiz.correct_points;
        correct_score += quiz.correct_points;
        correct_questions[id] = cQ;
        correct_points[id] = correct_score;
      } else if (Responses.responses[id][i]["userSelection"] === 0) {
        tS += 0;
        sub_wise_questions[id] = tS;
        uQ.push(Responses.responses[id][i]["qNo"]);
        unattempted_questions[id] = uQ;
        unattempted_score++;
        grand_total += 0;
        unattempted_points[id] = unattempted_score;
      } else {
        tS -= 1;
        sub_wise_questions[id] = tS;
        wQ.push(Responses.responses[id][i]["qNo"]);
        incorrect_questions[id] = wQ;
        grand_total -= quiz.incorrect_points;
        incorrect_score -= quiz.incorrect_points;
        incorrect_points[id] = incorrect_score;
      }
    }
    if (correct_points[id] === undefined) {
      {
        correct_points[id] = 0;
      }
    }
    if (incorrect_points[id] === undefined) {
      {
        incorrect_points[id] = 0;
      }
    }
    if (unattempted_points[id] === undefined) {
      {
        unattempted_points[id] = 0;
      }
    }
    if (correct_questions[id] === undefined) {
      {
        correct_questions[id] = 0;
      }
    }
    if (incorrect_questions[id] === undefined) {
      {
        incorrect_questions[id] = 0;
      }
    }
    if (unattempted_questions[id] === undefined) {
      {
        unattempted_questions[id] = 0;
      }
    }
  }
  await prisma.responses.update({
    data: {
      is_quiz_submitted: true,
    },
    where: {
      id: Responses.id,
    },
  });

  await prisma.results.create({
    data: {
      quiz_id: event.context.params.slug,
      session_id: body.session_id,
      quiz_name: quiz.title,
      correct_points: correct_points,
      incorrect_points: incorrect_points,
      unattempted_points: unattempted_points,
      correct: correct_questions,
      incorrect: incorrect_questions,
      unattempted: unattempted_questions,
      grand_total: grand_total,
      subject_wise_points: sub_wise_questions,
    },
  });

  return "Quiz Successfully Submitted";
});
