import { defineStore } from "pinia";

export const useQuizStore = defineStore("quiz", {
  state: () => ({
    data: [],
    sessId: null,
    initialQ: [],
    originalQ: [],
    question: [],
    subjects: [],
    questions: [],
    responses: [],
    totalQ: null,
    sessions: [],
    results: [],
    solutions: [],
  }),
  actions: {
    async loadData(payload) {
      const quizData = await useFetch(`/api/quiz/${payload.slug}`);
      this.data = quizData.data.value.quizInfo;
      this.initialQ = quizData.data.value.initialQuestionData;
      this.originalQ = quizData.data.value.originalQuestionData;
      this.questions = quizData.data.value.quizQuestionData;
      this.sessId = quizData.data.value.session_id;
      this.subjects = quizData.data.value.subjects;
      this.totalQ = quizData.data.value.totalQuestions;
    },
    async loadQuestion(payload) {
      const question = await useFetch(
        `/api/quiz/${payload.slug}/${payload.subject}/${payload.qNo}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            session_id: this.session,
          },
        }
      );

      this.question = question.data.value.currentQ;
      this.responses = question.data.value.responses;
    },
    async saveResponse(payload) {
      await useFetch(`/api/quiz/${payload.slug}/saveResponse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          subject: payload.subject,
          question_no: payload.question_no,
          selectedValue: payload.selectedValue,
          session_id: payload.session_id,
        },
      });
    },
    setSessions(payload) {
      this.sessions = payload;
    },
  },
  getters: {
    getData(state) {
      return state.data;
    },
    getSessId(state) {
      return state.sessId;
    },
    getInitQ(state) {
      return state.initialQ;
    },
    getOrigQ(state) {
      return state.originalQ;
    },
    getQuestion(state) {
      return state.question;
    },
    getResponses(state) {
      return state.responses;
    },
    getSubjects(state) {
      return state.subjects;
    },
    getQuestions(state) {
      return state.questions;
    },
    getTotalQ(state) {
      return state.totalQ;
    },
    getSessions(state) {
      return state.sessions;
    },
    loadResults(state) {
      return state.results;
    },
    loadSolutions(state) {
      return state.solutions;
    },
  },
});
