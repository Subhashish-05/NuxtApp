<template>
  <div>
    <Head>
      <Title>{{ singlePost.title }}</Title>
      <Meta name="description" :content="singlePost.description" />
      <Meta name="keywords" :content="singlePost.keywords" />
    </Head>
    <h1>{{ singlePost.title }}</h1>

    <p>{{ singlePost.authorId }}</p>

    <p v-html="singlePost.body"></p>
  </div>
</template>

<script>
import { usePostStore } from "~~/stores/posts";

const store = usePostStore();

export default {
  computed: {
    singlePost() {
      return store.getSinglePost;
    },
  },
  created() {
    return this.loadSinglePost();
  },
  methods: {
    async loadSinglePost() {
      await store.singlePost({
        slug: this.route.params.slug,
        catId: this.route.params.catId,
      });
    },
  },
  setup() {
    const route = useRoute();

    return { route };
  },
};
</script>
