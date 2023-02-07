<template>
  <BaseCard style="background: white">
    <form @submit.prevent="createSubscription()">
      <div class="form-control">
        <label for="plan_name">Subscription Name</label>
        <input type="text" name="plan_name" id="plan_name" ref="plan_name" />
      </div>
      <div class="form-control">
        <label for="plan_features">Subscription Features</label>
        <textarea
          rows="7"
          name="plan_features"
          id="plan_features"
          ref="plan_features"
        />
      </div>
      <div class="form-control">
        <label for="plan_price">Subscription Price</label>
        <input
          type="number"
          step=".01"
          name="plan_price"
          id="plan_price"
          ref="plan_price"
        />
      </div>
      <div class="form-control">
        <label for="plan_duration">Subscription Duration</label>
        <input
          type="number"
          name="plan_duration"
          id="plan_duration"
          ref="plan_duration"
        />
      </div>
      <BaseButton mode="flat" :type="submit">Submit</BaseButton>
    </form>
  </BaseCard>
</template>

<script>
import BaseButton from "~~/components/UI/BaseButton.vue";
import BaseCard from "~~/components/UI/BaseCard.vue";

export default {
  name: "createPost",
  methods: {
    async createSubscription() {
      try {
        await this.$store.dispatch("subscriptions/createSubscription", {
          plan_name: this.$refs.plan_name.value,
          plan_duration: this.$refs.plan_duration.value,
          plan_price: this.$refs.plan_price.value,
          plan_features: this.$refs.plan_features.value,
        });
      } catch (error) {
        this.error = error.message || "Something Went Wrong";
      }
    },
  },
  setup() {
    useHead({
      title: "Create Subscription",
    });
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

input,
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
