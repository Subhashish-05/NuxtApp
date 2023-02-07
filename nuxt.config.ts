// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
  app: {
    head: {
      script: [{ src: "https://kit.fontawesome.com/405c97270a.js" }],
    },
  },
});
