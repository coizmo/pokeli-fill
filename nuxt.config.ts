import path from "path";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    cdnURL: '/pokeli-fill/',
  },
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  modules: ["nuxt-primevue"],
  primevue: {
    options: {
      unstyled: true,
    },
    importPT: { from: path.resolve(__dirname, "./presets/lara/") },
  },
});
