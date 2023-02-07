<template>
  <div>
    <h1>All Quizzes</h1>
    <div v-for="quiz in quizzes" :key="quiz.quiz_id">
      <p>{{ quiz.title }}</p>
      <p>{{ quiz.body }}</p>
      <NuxtLink :to="quiz.quiz_url">View</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { data: quizzes } = useFetch("/api/quiz/allquiz");
useHead({
  title: "All Quizzes",
});
</script>
