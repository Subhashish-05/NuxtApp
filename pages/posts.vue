<template>
  <div>
    <h1>All Posts</h1>
    <div v-for="post in posts" :key="post.id">
      <p>{{ post.title }}</p>
      <p>{{ post.description }}</p>
      <NuxtLink target="_top" :href="post.post_url">View</NuxtLink>
    </div>
  </div>
</template>

<script>
import { usePostStore } from "~~/stores/posts";

const store = usePostStore();

export default {
  created() {
    return this.loadPosts();
  },
  computed: {
    posts() {
      return store.getAllPosts;
    },
  },
  methods: {
    async loadPosts() {
      await store.allPosts();
    },
  },
  setup() {
    useHead({
      title: "All Posts",
    });
  },
};
</script>
