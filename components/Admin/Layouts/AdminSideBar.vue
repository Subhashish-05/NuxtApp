<template>
  <div class="aside">
    <div class="aside-buttons">
      <BaseButton
        mode="flat"
        link="true"
        target="_top"
        to="/admin/subscription/create"
        >Create Subscription</BaseButton
      >

      <BaseButton
        mode="flat"
        link="true"
        target="_top"
        to="/admin/category/create"
        >Create Category</BaseButton
      >

      <BaseButton
        mode="flat"
        link="true"
        target="_top"
        to="/admin/subcategory/create"
        >Create Sub Category</BaseButton
      >

      <BaseButton mode="flat" link="true" target="_top" to="/admin/post/create"
        >Create Post</BaseButton
      >

      <BaseButton mode="flat" link="true" target="_top" to="/admin/quiz/create"
        >Create Quiz</BaseButton
      >

      <BaseButton
        mode="flat"
        link="true"
        target="_top"
        to="/admin/question/create"
        >Create Question</BaseButton
      >
    </div>
  </div>
</template>

<script>
import BaseButton from "~~/components/UI/BaseButton.vue";

export default { components: { BaseButton } };
</script>

<style scoped>
.aside {
  overflow-x: hidden;
  overflow-y: scroll;
  position: sticky;
  height: 450px;
  z-index: 2;
  top: 105px;
  left: 0px;
  background: white;
}
.aside-buttons {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-top: 20px;
}
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
