<template>
  <BaseCard style="background: white">
    <form @submit.prevent="createSubCategory()">
      <div class="form-control">
        <label for="category">Choose a Category:</label>
        <select
          @change="fetchSubCategories($event)"
          v-model="category"
          name="category"
          id="categories"
        >
          <option disabled value="">Please select one</option>
          <option
            v-for="category in categories"
            :key="category.category_id"
            :value="category.category_id"
          >
            {{ category.title }}
          </option>
        </select>
      </div>
      <div class="form-control">
        <label for="sub-category">Sub Category</label>
        <input type="text" id="sub-category" v-model.trim="subCategory.val" />
      </div>
      <div class="form-control">
        <label for="slug">Slug</label>
        <input type="text" id="slug" v-model.trim="slug.val" />
      </div>
      <BaseButton mode="flat" :type="submit">Create Sub Category</BaseButton>
    </form>
    <div v-if="subCategories.length === 0">No Sub Categories Found</div>
    <div v-else v-for="subCategory in subCategories" :key="subCategory.id">
      {{ subCategory.title }}
    </div>
  </BaseCard>
</template>

<script>
import BaseButton from "~~/components/UI/BaseButton.vue";
import BaseCard from "~~/components/UI/BaseCard.vue";
import { useCategoryStore } from "~~/stores/categories";

const store = useCategoryStore();

export default {
  data() {
    return {
      category: "",
      subCategory: {
        val: "",
      },
      slug: {
        val: "",
      },
    };
  },
  created() {
    this.loadCategories();
  },
  methods: {
    async loadCategories() {
      await store.allCategory();
    },
    async fetchSubCategories(event) {
      await store.allSubCategory({
        id: event.target.value,
      });
    },
    async createSubCategory() {
      const response = await store.createSubCategory({
        category_id: this.category,
        title: this.subCategory.val,
        slug: this.slug.val,
      });
      if (response === "SubCategory Created!") {
        useRouter().replace("/admin/dashboard");
      }
    },
  },
  computed: {
    categories() {
      return store.allCategories;
    },
    subCategories() {
      return store.allSubCategories;
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
select {
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
