import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
  css: ["vuetify/lib/styles/main.sass"],
  buildModules: [
    // pinia plugin - https://pinia.esm.dev
    "@pinia/nuxt",
  ],
  vite: {
    logLevel: "info",
    optimizeDeps: {
      include: ["vue", "pinia"],
    },
    define: {
      "process.env.DEBUG": "false",
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  meta: {},
  intlify: {
    localeDir: "locales",
    vueI18n: {},
  },
});
