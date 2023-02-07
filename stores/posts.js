import { defineStore } from "pinia";

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: [],
    post: [],
  }),
  actions: {
    async createPost(payload) {
      const response = await useFetch("/api/post/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: payload.title,
          body: payload.body,
          description: payload.description,
          keywords: payload.keywords,
          slug: payload.slug,
          category: payload.category,
          sub_category: payload.subcategory,
          user_id: payload.user_id,
          slug: payload.slug,
          post_url: payload.url,
        }),
      });

      return response.data.value.message;
    },
    async allPosts() {
      const response = await useFetch("/api/post/allPosts");
      this.posts = response.data.value;
    },
    async singlePost(payload) {
      const response = await useFetch(
        "/api/post/" + payload.catId + "/" + payload.slug
      );
      this.post = response.data.value;
    },
  },
  getters: {
    getAllPosts(state) {
      return state.posts;
    },
    getSinglePost(state) {
      return state.post;
    },
  },
});
