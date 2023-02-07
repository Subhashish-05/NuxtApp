<template>
  <div class="header">
    <Logo />
  </div>
</template>

<script>
import Logo from "~~/components/UI/Logo.vue";

export default {
  props: ["isAuthorized"],
  components: { Logo },
};
</script>

<style scoped>
.header {
  position: sticky;
  top: 0px;
  z-index: 3;
  grid-column: 1 / -1;
  grid-row: 1 / 2;
  background: white;
  height: 80px;
}
.header {
  display: grid;
  grid-template-columns: 350px 1fr 200px;
  height: 80px;
  grid-row: 1/2;
}
</style>
