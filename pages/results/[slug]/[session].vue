<template>
  <div>
    <NuxtLink target="_top" :to="solutionLink">View Soltions</NuxtLink>
    <h1>Single Session Results</h1>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Subject</th>
          <th scope="col">Correct</th>
          <th scope="col">Incorrect</th>
          <th scope="col">Unattempted</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="subject in results.data.subjects" :key="subject">
          <td>{{ subject }}</td>
          <td>{{ results.data.results.correct_points[subject] }}</td>
          <td>{{ results.data.results.incorrect_points[subject] }}</td>
          <td>{{ results.data.results.unattempted_points[subject] }}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <h3>Grand Total: {{ results.data.results.grand_total }}</h3>
    </div>
  </div>
</template>

<script>
import { useQuizStore } from "~~/stores/quiz";

export default {
  setup() {
    const store = useQuizStore();
    return { store };
  },
  created() {
    return this.getResults();
  },
  computed: {
    results() {
      return this.store.loadResults;
    },
    solutionLink() {
      return (
        "/solutions/" +
        `${this.$route.params.slug}/${this.$route.params.session}`
      );
    },
  },
  methods: {
    async getResults() {
      const results = await useFetch(
        `/api/quiz/${this.$route.params.slug}/getResults`,
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
      this.store.results = results;
    },
  },
};
</script>
