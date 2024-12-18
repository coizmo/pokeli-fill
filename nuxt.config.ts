import path from "path";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  app: {
    baseURL: "/pokeli-fill/",
  },

  devtools: { enabled: true },
  css: ["~/assets/css/main.css", "primeicons/primeicons.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  build: {
    transpile: ["vuetify"],
  },

  modules: ["nuxt-primevue", "@vueuse/nuxt"],

  primevue: {
    options: {
      unstyled: true,
    },
    importPT: { from: path.resolve(__dirname, "./presets/lara/") },
  },

  compatibilityDate: "2024-10-21",
});