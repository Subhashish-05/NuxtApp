<template>
  <div>
    <h1>Quiz Panel</h1>
    <button @click="submitQuiz()" type="button">Submit Quiz</button>
    <div v-for="data in datas" :key="data.id">
      <p v-if="data.section === subject">
        <button
          type="button"
          @click="
            (itemId = data.section_id - 1),
              (qNo = data.question_no),
              loadQuestion()
          "
        >
          {{ data.question_no }}
        </button>
      </p>
    </div>

    <div>
      <div v-for="subject in subjectButtons.length" :key="subject">
        <button
          type="submit"
          @click="(itemId = subject - 1), (qNo = initialQ + 1), loadQuestion()"
        >
          {{ subjectButtons[subject - 1] }}
        </button>
      </div>
    </div>
    <QuizQuestion
      :key="question.id"
      :id="question.id"
      :question="question.question"
      :optionsLength="question.optionsLength"
      :userSelection="responses.userSelection"
      :resQNo="responses.qNo"
      :options="question.options"
      :subject="subject"
      :session="session"
    />

    <div>
      <div v-if="qNo === +questions">
        <button type="button" @click="qNo++, itemId++, loadQuestion()">
          Next
        </button>
      </div>
      <div v-else-if="qNo === +totalCount">
        <button type="button" @click="(qNo = 1), (itemId = 0), loadQuestion()">
          Next
        </button>
      </div>
      <div v-else>
        <button type="button" @click="qNo++, loadQuestion()">Next</button>
      </div>

      <div v-if="qNo === 1">
        <button type="button" disabled>Previous</button>
      </div>
      <div v-else-if="qNo === +originalQ && itemId === 0">
        <button
          type="button"
          mode="flat"
          @click="
            qNo--;
            loadQuestion();
          "
        >
          Previous
        </button>
      </div>
      <div v-else-if="qNo === +originalQ && itemId !== 0">
        <button type="button" @click="itemId--, qNo--, loadQuestion()">
          Previous
        </button>
      </div>
      <div v-else>
        <button type="button" @click="itemId--, qNo--, loadQuestion()">
          Previous
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuizStore } from "@/stores/quiz";
import QuizQuestion from "./QuizQuestion.vue";
export default {
  setup() {
    const store = useQuizStore();
    return { store };
  },
  data() {
    return {
      itemId: 0,
      qNo: "" || 1,
      userSelection: "",
    };
  },
  components: {
    QuizQuestion,
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const route = useRoute();
      try {
        await this.store.loadData({
          slug: route.params.slug,
        });
      } catch (error) {
        this.error = error.message || "Something Went Wrong";
      }
      this.store.loadQuestion({
        slug: route.params.slug,
        subject: this.subject,
        qNo: this.qNo,
      });
    },

    async loadQuestion() {
      const route = useRoute();
      try {
        await this.store.loadQuestion({
          slug: route.params.slug,
          subject: this.subject,
          qNo: this.qNo,
        });
      } catch (error) {
        this.error = error.message || "Something Went Wrong";
      }
    },

    async submitQuiz() {
      const route = useRoute();
      const router = useRouter();
      try {
        const submits = await useFetch(
          `/api/quiz/${route.params.slug}/submitQuiz`,
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
        if (submits.data.value === "Quiz Successfully Submitted") {
          router.replace("/");
        }
      } catch (error) {
        this.error = error.message || "Something Went Wrong";
      }
    },
  },
  computed: {
    datas() {
      return this.store.getData;
    },
    session() {
      return this.store.getSessId;
    },
    initialQ() {
      return this.store.getInitQ[this.itemId];
    },
    originalQ() {
      return this.store.getOrigQ[this.itemId];
    },
    question() {
      return this.store.getQuestion;
    },
    responses() {
      return this.store.getResponses;
    },
    subjectButtons() {
      return this.store.getSubjects;
    },
    subject() {
      return this.store.getSubjects[this.itemId];
    },
    questions() {
      return this.store.getQuestions[this.itemId];
    },
    totalCount() {
      return this.store.getTotalQ;
    },
  },
};
</script>

<style></style>
