<template>
  <div>
    <div>Single Quiz</div>
    <button @click="startQuiz()" type="button">Attempt Quiz</button>
    <div v-for="session of sessions.data" :key="session">
      <NuxtLink target="_top" :href="session">View</NuxtLink>
    </div>
  </div>
</template>

<script>
import { useQuizStore } from "~~/stores/quiz";
export default {
  methods: {
    startQuiz() {
      return this.$router.replace(`/session/${this.$route.params.slug}`);
    },
    async getAttempts() {
      const sessions = await useFetch(
        `/api/quiz/${this.$route.params.slug}/getAttempts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      this.store.sessions = sessions;
    },
  },
  computed: {
    sessions() {
      return this.store.getSessions;
    },
  },
  created() {
    return this.getAttempts();
  },
  setup() {
    const store = useQuizStore();

    return { store };
  },
};
</script>

<style></style>
