<template>
  <div>
    <h1>Solutions</h1>
    {{}}
    <div v-for="id in subjects.length" :key="id">
      <button type="button" @click="itemId = id - 1">
        {{ subjects[id - 1] }}
      </button>
    </div>
    <div v-for="qtype in Qtype" :key="qtype">
      <button type="button" @click="qData = qtype">
        {{ qtype.charAt(0).toUpperCase() + qtype.slice(1) }}
      </button>
    </div>
    <div v-if="!subject || !solutions.data.solutions[qData][subject][0]">
      <h3>
        No {{ qData.charAt(0).toUpperCase() + qData.slice(1) }} Questions Found
        in {{ subject }}
      </h3>
    </div>
    <div v-else>
      <div
        v-for="solution in solutions.data.solutions[qData][subject]"
        :key="solution"
      >
        <div v-if="qData === 'incorrect'">
          <QuizSolution
            :qData="qData"
            :key="solution['question']['id']"
            :id="solution['question']['id']"
            :question="solution['question']['question']"
            :options="solution['question']['options'].options"
            :optionsLength="solution['question']['options'].options.length"
            :correct="solution['question']['correct']"
            :userResponse="solution['userResponse']"
          />
        </div>
        <div v-else>
          <QuizSolution
            :qData="qData"
            :key="solution['id']"
            :id="solution['id']"
            :question="solution['question']"
            :options="solution['options'].options"
            :optionsLength="solution['options'].options.length"
            :correct="solution['correct']"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuizStore } from "~~/stores/quiz";
import QuizSolution from "./QuizSolution.vue";
export default {
  data() {
    return {
      qId: 0,
      itemId: 0,
      qData: "" || "correct",
      Qtype: ["correct", "incorrect", "unattempted"],
    };
  },
  components: {
    QuizSolution,
  },
  setup() {
    const store = useQuizStore();
    return { store };
  },
  created() {
    return this.getSolutions();
  },
  computed: {
    solutions() {
      return this.store.loadSolutions;
    },
    subject() {
      return this.store.getSubjects[this.itemId];
    },
    subjects() {
      return this.store.getSubjects;
    },
  },
  methods: {
    async getSolutions() {
      const solutions = await useFetch(
        `/api/quiz/${this.$route.params.slug}/getSolution`,
        {
          method: "POST",
          body: {
            session_id: this.$route.params.session,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      this.store.subjects = solutions.data.value.subjects;
      this.store.solutions = solutions;
    },
  },
};
</script>
