<template>
  <BaseCard style="background: white">
    <div class="form-control">
      <label>Question</label><br />
      <textarea type="text" class="form-control" v-model="question" />
    </div>
    <div v-for="(item, index) in form" :key="item">
      <h3>Option {{ index + 1 }}</h3>
      <div>
        <textarea type="text" class="form-control" v-model="item.option" />
        <div
          style="
            display: flex;
            flex-wrap: wrap;
            gap: 25px;
            align-items: baseline;
          "
        >
          <input
            type="radio"
            :value="index + 1"
            class="form-control"
            @click="correctResponse(index + 1)"
            name="isCorrect"
            v-model="item.correct"
          />
          <label>Correct Answer</label>
        </div>
      </div>
      <div style="display: flex; justify-content: space-evenly">
        <BaseButton type="button" mode="flat" @click="addRow"> Add </BaseButton>
        <base-button type="button" mode="flat" @click="removeRow(index)">
          Remove
        </base-button>
      </div>
    </div>
    <BaseButton type="button" mode="flat" @click="saveItem">Save</BaseButton>
  </BaseCard>
</template>

<script>
import BaseButton from "~~/components/UI/BaseButton.vue";
import BaseCard from "~~/components/UI/BaseCard.vue";

export default {
  name: "HelloWorld",
  data() {
    return {
      options: [],
      correctOption: null,
      form: [{ option: "" }, { option: "" }],
    };
  },
  setup() {
    useHead({
      title: "Create Question",
    });
  },
  methods: {
    correctResponse(index) {
      return (this.correctOption = index);
    },
    saveItem() {
      for (let i = 0; i < this.form.length; i++) {
        this.options.push(this.form[i].option);
      }
      console.log(this.options);
      console.log(this.options.length);
      console.log(this.correctOption);
      this.options = [];
    },
    addRow() {
      this.form.push({ option: "" });
    },
    removeRow(index) {
      console.log(index);
      if (this.form.length > 1) {
        this.form.splice(index, 1);
      }
      this.correctOption = null;
    },
  },
  components: { BaseCard, BaseButton },
};
definePageMeta({
  layout: "admin-layout",
});
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
