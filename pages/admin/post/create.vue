<template>
  <BaseCard style="background: white">
    <form @submit.prevent="createPost()">
      <div class="form-control">
        <label for="category">Choose a Category:</label>
        <select
          v-model="category"
          @change="fetchSubCategories($event)"
          name="category"
          id="categories"
        >
          <option disabled value="">Please select one</option>
          <option
            v-for="category in categories"
            :key="category.category_id"
            :value="category.title"
          >
            {{ category.title }}
          </option>
        </select>
      </div>
      <div class="form-control">
        <label for="category">Choose a Subject:</label>
        <select v-model="subCategory" name="sub-category" id="sub-categories">
          <option disabled value="">Please select one</option>
          <option
            v-for="category in subCategories"
            :key="category.slug"
            :value="category.slug"
          >
            {{ category.title }}
          </option>
        </select>
      </div>
      <div class="form-control">
        <label for="title">Title</label>
        <input type="text" id="title" v-model.trim="title.val" />
      </div>
      <div class="form-control">
        <label for="body">Body</label>
        <textarea rows="7" id="body" v-model.trim="body.val" />
      </div>
      <div class="form-control">
        <label for="description">Description</label>
        <input type="text" id="description" v-model.trim="description.val" />
      </div>
      <div class="form-control">
        <label for="tags">Keywords</label>
        <input type="text" id="keywords" v-model.trim="keywords.val" />
      </div>
      <div class="form-control">
        <label for="tags">Slug</label>
        <input type="text" id="slug" v-model.trim="slug.val" />
      </div>
      <BaseButton mode="flat" type="submit">Submit</BaseButton>
    </form>
  </BaseCard>
</template>

<script>
import BaseButton from "~~/components/UI/BaseButton.vue";
import BaseCard from "~~/components/UI/BaseCard.vue";
import { usePostStore } from "~~/stores/posts";
import { useCategoryStore } from "~~/stores/categories";

const { getCookie } = useCookies();

const store = usePostStore();

const catStore = useCategoryStore();
export default {
  name: "createPost",
  data() {
    return {
      category: "",
      subCategory: "",
      title: {
        val: "",
        isValid: true,
      },
      body: {
        val: "",
        isValid: true,
      },
      description: {
        val: "",
        isValid: true,
      },
      keywords: {
        val: "",
        isValid: true,
      },
      slug: {
        val: "",
        isValid: true,
      },
    };
  },
  setup() {
    useHead({
      title: "Create Post",
    });
  },
  computed: {
    categories() {
      return catStore.allCategories;
    },
    subCategories() {
      return catStore.allSubCategories;
    },
  },
  created() {
    this.loadCategories();
  },
  methods: {
    async loadCategories() {
      await catStore.allCategory();
    },
    async fetchSubCategories(event) {
      console.log("hello");
      await catStore.allSubCategory({
        id: event.target.value,
      });
    },
    async createPost() {
      try {
        const response = await store.createPost({
          title: this.title.val,
          body: this.body.val,
          description: this.description.val,
          keywords: this.keywords.val,
          slug: this.slug.val,
          user_id: getCookie("userid"),
          category: this.category,
          subcategory: this.subCategory,
          url: `${this.category.toLowerCase()}/${this.subCategory}/${
            this.slug.val
          }`,
        });
        if (response === "Post Created") {
          useRouter().replace("/admin/dashboard");
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
select,
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
