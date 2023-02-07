<template>
  <div class="container">
    <div class="header">
      <Logo />
      <div class="auth-profile-logout" v-if="isAuthorized">
        <BaseButton mode="flat" @click="signout()">Logout</BaseButton>
      </div>
      <div class="auth-profile-login" v-else>
        <BaseButton :link="true" mode="flat" to="/register"
          >Register</BaseButton
        >
        <BaseButton :link="true" mode="flat" to="/login">Login</BaseButton>
      </div>
    </div>

    <div class="main">This is the Body</div>

    <div class="footer">
      <footer>This is the footer</footer>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  display: grid;
  grid-template-rows: 80px 1fr 50px;
}
.header {
  display: grid;
  grid-template-columns: 350px 1fr 200px;
  height: 80px;
  grid-row: 1/2;
}

.auth-profile-logout,
.auth-profile-login {
  grid-column: 3/-1;
  display: flex;
  align-items: center;
}
.auth-profile-login {
  flex-direction: row-reverse;
}
.main {
  height: 500px;
  grid-row: 2/3;
}
.footer {
  height: 50px;
  grid-row: 3/-1;
}
</style>

<script>
import { Head } from "@vueuse/head";
import Logo from "~~/components/UI/Logo.vue";

import BaseButton from "~~/components/UI/BaseButton.vue";
export default {
  data() {
    return {
      user: false,
      defaultStatus: false,
    };
  },

  created() {
    return this.isLogin();
  },
  computed: {
    isAuthorized() {
      return !this.user;
    },
  },
  methods: {
    isLogin() {
      this.user = !this.defaultStatus || !localStorage.getItem("isAuth");
      setTimeout(() => {
        this.hasUser();
      }, 25);
    },
    hasUser() {
      if (!this.getCookie("isAuth")) {
        this.setCookie("isAuth", false, 7);
      }
      if (!this.getCookie("isAuth")) {
        this.user = !this.defaultStatus || !this.getCookie("isAuth");
      } else if (this.getCookie("isAuth") && this.getCookie("userid")) {
        this.user = this.defaultStatus && this.getCookie("isAuth");
      } else {
        this.user = !this.defaultStatus && this.getCookie("isAuth");
      }
    },
    async signout() {
      try {
        const response = await this.logout();
        if (!response) {
          this.setCookie("isAuth", false, 1);
          this.defaultStatus = false;
          this.user = this.defaultStatus || localStorage.getItem("isAuth");
          this.deleteCookie("userid", "2022-31-01");
          this.deleteCookie("name", "2022-31-01");
          this.deleteCookie("userole", "2022-31-01");
          useRouter().replace("/");
          location.reload();
        }
      } catch (error) {
        this.error = error.message || "Something Went Wrong";
      }
    },
  },
  setup() {
    const { logout } = useAuth();
    const { getCookie, setCookie, deleteCookie } = useCookies();
    useServerSeoMeta({
      title: "My Amazing Site",
      ogTitle: "My Amazing Site",
      description: "This is my amazing site, let me tell you all about it.",
      ogDescription: "This is my amazing site, let me tell you all about it.",
      ogImage: "https://example.com/image.png",
      twitterCard: "summary_large_image",
    });
    return { logout, getCookie, setCookie, deleteCookie };
  },
  components: { Head, BaseButton, Logo },
};
</script>
