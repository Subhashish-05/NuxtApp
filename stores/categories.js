import { defineStore } from "pinia";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [],
    subCategories: [],
  }),
  actions: {
    async createSubCategory(payload) {
      const response = await useFetch("/api/subCategory/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category_id: payload.category_id,
          title: payload.title,
          slug: payload.slug,
        }),
      });

      return response.data.value.message;
    },
    async allCategory() {
      const response = await useFetch("/api/category/allCategory");
      this.categories = response.data.value;
    },
    async allSubCategory(payload) {
      const response = await useFetch(
        "/api/category/" + payload.id + "/subCategory"
      );

      this.subCategories = response.data.value;
    },
  },
  getters: {
    allCategories(state) {
      return state.categories;
    },
    allSubCategories(state) {
      return state.subCategories;
    },
  },
});
