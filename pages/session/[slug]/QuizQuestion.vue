<template>
  <div>
    <p>{{ question }}</p>
    <div v-for="option in optionsLength" :key="option">
      <div v-if="option === userSelection">
        <input
          type="radio"
          checked
          :value="option"
          @change="submitResponse()"
          v-model="userValue"
          :name="id"
        />{{ options.options[option - 1] }}
      </div>
      <div v-else>
        <input
          type="radio"
          :value="option"
          @change="submitResponse()"
          v-model="userValue"
          :name="id"
        />{{ options.options[option - 1] }}
      </div>
    </div>
  </div>
</template>

<script>
import { useQuizStore } from "~~/stores/quiz";

export default {
  data() {
    return {
      userValue: "",
    };
  },
  props: [
    "id",
    "question",
    "options",
    "optionsLength",
    "userSelection",
    "resQNo",
    "subject",
  ],
  setup() {
    const store = useQuizStore();
    return { store };
  },
  methods: {
    async submitResponse() {
      const route = useRoute();
      try {
        await this.store.saveResponse({
          slug: route.params.slug,
          subject: this.subject,
          question_no: this.id,
          session_id: this.session,
          selectedValue: this.userValue,
        });
      } catch (error) {
        this.error = error.message || "Something Went Wrong";
      }
    },
  },
};
</script>
