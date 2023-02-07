<template>
  <div>
    <h1>Question: {{ question }}</h1>
    <div v-for="option in optionsLength" :key="option">
      <base-card
        v-if="option === correct && qData === 'correct'"
        style="background-color: green; color: white"
      >
        {{ options[option - 1] }}
      </base-card>
      <base-card
        v-else-if="option === correct && qData === 'incorrect'"
        style="background-color: green; color: white"
      >
        {{ options[option - 1] }}
      </base-card>
      <base-card
        v-else-if="option === userResponse && qData === 'incorrect'"
        style="background-color: red; color: white"
      >
        {{ options[option - 1] }}
      </base-card>
      <base-card
        v-else-if="option === correct && qData === 'unattempted'"
        style="background-color: green; color: white"
      >
        {{ options[option - 1] }}
      </base-card>
      <base-card v-else>
        {{ options[option - 1] }}
      </base-card>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "id",
    "qData",
    "question",
    "options",
    "optionsLength",
    "correct",
    "userResponse",
  ],
};
</script>
