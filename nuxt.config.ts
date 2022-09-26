import { defineNuxtConfig } from "nuxt";
export default defineNuxtConfig({
  pages: true,
  css: ["vuetify/lib/styles/main.sass"],
  buildModules: [
    // pinia plugin - https://pinia.esm.dev
    // "@pinia/nuxt",
  ],
  vite: {
    logLevel: "info",
    optimizeDeps: {
      // include: ["vue", "pinia"],
      include: ["vue"],
    },
    define: {
      "process.env.DEBUG": "false",
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  meta: {
    link: [
      {
        rel: "stylesheet",
        href: "https://unpkg.com/md-editor-v3@2.2.0/lib/style.css",
      },
    ],
  },
  intlify: {
    localeDir: "locales",
    vueI18n: {},
  },
  // hooks: {
  //   "pages:extend": (pages) => {
  //     // 404页面还是会保留的bug
  //     pages = pages.filter(item=>item.name !== '404')
  //     for (const page of pages) {
  //       if (page.path === "/") {
  //         const reg = /^[^management]/;
  //         page.children = page.children.filter((item) => reg.test(item.path));
  //       } 
  //     }
  //     // console.log(pages)
  //   },
  // },
  publicRuntimeConfig: {
    blogApi: process.env.BLOG_API || "nothing provided",
    cryptoSecret: process.env.CRYPTO_SECRET || "nothing provided",
    blogWebsocket: process.env.BLOG_WEBSOCKET || "nothing provided",
  },
});
