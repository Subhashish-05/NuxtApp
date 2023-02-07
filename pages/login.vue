<template>
  <BaseCard>
    <Logo />
    <form @submit.prevent="Login()">
      <div class="form-control">
        <label for="email">E-Mail</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="password" />
      </div>
      <div>
        <BaseButton mode="flat" :type="submit">Login</BaseButton>
        <p>
          Don't have an account?&nbsp;<BaseButton
            :link="true"
            mode="flat"
            to="/register"
            >Register Now</BaseButton
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
import BaseCard from "~~/components/UI/BaseCard.vue";
import BaseButton from "~~/components/UI/BaseButton.vue";

import Logo from "~~/components/UI/Logo.vue";
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async Login() {
      try {
        const response = await this.login(this.email, this.password);
        if (response.user_role === "User") {
          this.setCookie("isAuth", true);
          this.setCookie("userid", response.user_id);
          this.setCookie("userole", response.user_role);
          this.setCookie("name", response.name);
          useRouter().replace("/");
        } else if (response.user_role === "Admin") {
          this.setCookie("isAuth", true);
          this.setCookie("userid", response.user_id);
          this.setCookie("userole", response.user_role);
          this.setCookie("name", response.name);
          useRouter().replace("/admin/dashboard");
        }
      } catch (error) {
        this.error = error.message || "Something Went Wrong";
      }
    },
  },
  setup() {
    const { setCookie } = useCookies();
    const { login } = useAuth();
    return { login, setCookie };
  },
  components: { BaseCard, Logo, BaseButton },
};
</script>
