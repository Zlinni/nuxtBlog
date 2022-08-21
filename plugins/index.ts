import { defineNuxtPlugin } from "#app";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/lib/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";
// import i18n from "../locales/main";
// import blogApi from "~~/api";
// import Particles from "particles.vue3";
export default defineNuxtPlugin(async (nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },
  });
  nuxtApp.vueApp.use(vuetify);
  // nuxtApp.vueApp.use(i18n);
  // nuxtApp.vueApp.use(Particles);
  // const router = useRouter();
  // 设置白名单
  // const allowEnterPath = ["/", "/blogs", "/links", "/logs", "/login", "/404"];
  // router.beforeEach((to, _, next) => {
  //   debugger;
  //   if (to.path === "/") {
  //     next({
  //       name: "home",
  //     });
  //   } else if (to.path === "/user") {
  //     next({
  //       name: "login",
  //     });
  //   } else {
  //     next();
  //   }
  //   // const token = localStorage.getItem("token");
  //   // if (allowEnterPath.some((path) => to.path === path)) {
  //   //   if (to.path === "/login" && token) {
  //   //     next({
  //   //       path: "/",
  //   //     });
  //   //   } else {
  //   //     next();
  //   //   }
  //   // }
  //   // if (!token) {
  //   //   next({
  //   //     path: "/login", // 未登录则跳转至login页面
  //   //     // query: {
  //   //     //   redirect: to.fullPath,
  //   //     // }, // 登陆成功后回到当前页面，这里传值给login页面，to.fullPath为当前点击的页面
  //   //   });
  //   // }
  // });

  return {
    provide: {
      // blogApi,
      getRuntimeConfig: useRuntimeConfig,
    },
  };
});
