<template>
  <BaseCard style="background-color: white">
    <form @submit.prevent="createCategory()">
      <div class="form-control">
        <label for="title">Title</label>
        <input type="text" id="title" v-model.trim="title.val" />
      </div>
      <div class="form-control">
        <label for="slug">Slug</label>
        <input type="text" id="slug" v-model.trim="slug.val" />
      </div>
      <div class="form-control">
        <label for="description">Description</label>
        <textarea
          id="description"
          rows="5"
          v-model.trim="description.val"
        ></textarea>
      </div>
      <BaseButton mode="flat" :type="submit">Create Category</BaseButton>
    </form>
  </BaseCard>
</template>

<script>
import BaseButton from "~~/components/UI/BaseButton.vue";
import BaseCard from "~~/components/UI/BaseCard.vue";

export default {
  name: "createCategory",
  data() {
    return {
      title: {
        val: "",
        isValid: true,
      },
      slug: {
        val: "",
        isValid: true,
      },
      description: {
        val: "",
        isValid: true,
      },
    };
  },
  setup() {
    const { getCookie } = useCookies();
    useHead({
      title: "Create Category",
    });
    return { getCookie };
  },
  methods: {
    async createCategory() {
      try {
        const response = await useFetch("/api/category/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            user_id: this.getCookie("userid"),
            title: this.title.val,
            slug: this.slug.val,
            description: this.description.val,
          },
        });
        if (response.data.value === "Category Created") {
          location.replace("/admin/dashboard");
        }
      } catch (error) {
        this.error = error.message || "Something Went Wrong";
      }
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
