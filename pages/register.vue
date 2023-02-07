<template>
  <BaseCard>
    <Logo />
    <form @submit.prevent="Signup()">
      <div class="form-control">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="name" />
      </div>
      <div class="form-control">
        <label for="email">E-Mail</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div>
        <BaseButton mode="flat" :type="submit">Signup</BaseButton>
        <p>
          Already have an account?&nbsp;<BaseButton
            :link="true"
            mode="flat"
            to="/login"
            >Login</BaseButton
          >
        </p>
      </div>
    </form>
  </BaseCard>
</template>

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

input {
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

<script>
import BaseButton from "~~/components/UI/BaseButton.vue";

import BaseCard from "~~/components/UI/BaseCard.vue";
import Logo from "~~/components/UI/Logo.vue";
export default {
  name: "TheSignUp",
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },

  methods: {
    async Signup() {
      try {
        await this.signup(this.name, this.email, this.password);
      } catch (error) {
        this.error = error.message || "Something Went Wrong";
      }
    },
  },
  setup() {
    const { signup } = useAuth();
    return { signup };
  },
  components: { BaseCard, Logo, BaseButton },
};
</script>
