<template>
  <div class="container">
    <AdminHeader :key="adminHeader" :isAuthorized="isAuthorized" />
    <div class="app-container">
      <div class="aside-wrapper">
        <AdminSideBar />
      </div>
      <div class="body">
        <slot />
      </div>
    </div>
    <AdminFooter />
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.container {
  display: grid;
  min-height: 100vh;
  min-width: 100%;
  gap: 25px;
  grid-template-columns: 20% 1fr;
  grid-template-rows: 80px 1fr 40px;
  position: relative;
}

.app-container {
  display: grid;
  gap: 25px;
  width: 1333px;
  grid-template-columns: 20% 1fr;
  min-height: calc(100vh - 384px);
}

.aside-wrapper {
  position: relative;
  height: 100%;
}

.body {
  grid-column: 2 / -1;
  background-color: #f7f9fb;
  border: 2px solid black;
}
</style>

<script>
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
  },
  setup() {
    const { getCookie } = useCookies();
    return { getCookie };
  },
};
</script>
