export default defineNuxtPlugin(async ({ ssrContext }) => {
  const router = useRouter();
  if (process.server && ssrContext) {
    const { res, url } = ssrContext;
    const { path } = router.resolve(url);
    if (path === "/private") {
      res.writeHead(302, { Location: "/" });
      res.end();
    }
  } else if (process.client) {
    const allowEnterPath = [
      "/blogs",
      "/links",
      "/logs",
      "/login",
      "/404",
      "/home",
      "/test",
    ];
    let isGetRouteAuth = false; //这个是用于判断动态路由是否已经被获取
    const token = useCookie("token").value;
    // 如果登陆了，就直接在beforeeach外面调用动态路由
    // vite的动态导入
    let modules = import.meta.glob('../pages/**/*.vue')
    if (token) {
      
      const pageData = await useAuthRoute();
      let routes = [...router.options.routes];
      for (const item of routes) {
        if (item.path === "/") {
          
          for (const page of pageData.data.value) {
            const { name, path } = page;
            router.addRoute("index", {
              name,
              path,
              component: modules[`../pages${page.component}.vue`],
            });
          }
        }
      }
      console.log(router.getRoutes())
    } else {
      router.beforeEach(async (to, from, next) => {
        if (to.path === "/") {
          next("/home");
        }
        
        if (
          allowEnterPath.some((path) => to.path === path) ||
          to.path.startsWith("/blog")
        ) {
          next();
        }
        if (!useCookie("token").value) {
          next({ path: "/login" });
        } else {
          if (isGetRouteAuth) {
            next();
          } else {
            const pageData = await useAuthRoute();
            let routes = [...router.options.routes];
            for (const item of routes) {
              if (item.path === "/") {
                
                for (const page of pageData.data.value) {
                  const { name, path } = page;
                  router.addRoute("index", {
                    name,
                    path,
                    component: modules[`../pages${page.component}.vue`],
                  });
                }
              }
            }
            isGetRouteAuth = true;
            // 跳转
            to.name = "";
            to.matched = [];
            router.push({ ...to, replace: true });
          }
        }
      });
    }
  }
});
// type inputs = {
//   menuName: string;
//   menuUrl: string;
//   source: string;
// };
// interface inputMenuGet {
//   data: inputs[];
// }
// interface outputMenuGet {
//   name: string;
//   path: string;
//   component: Function;
// }
// const getRouteAuth = async () => {
//   let menuApi = useMenuApi().value;
//   const userId = useCookie("userId").value;
//   return await useNotLazyCustomFetch(menuApi.getMenuList.url, {
//     method: menuApi.getMenuList.method,
//     params: {
//       userId,
//     },
//     transform(input: inputMenuGet): outputMenuGet[] {
//       let resTemp = [];
//       for (const item of input.data) {
//         resTemp.push({
//           name: item.menuName,
//           path: "/" + item.menuUrl,
//           component: () => import(`../pages${item.source}`),
//         });
//       }
//       return resTemp;
//     },
//   });

//   // debugger
//   // for (const item of routes) {
//   //   if (item.path === "/") {
//   //     debugger
//   //     for (const page of pageData.value) {
//   //       router.addRoute("index",page);
//   //     }
//   //   }
//   // }
// };
// const loadView = view => {
//   // 路由懒加载
//   return resolve => require([`@/views/${view}`], resolve);
// };

// const getRouteAuth = async () => {

//   const userId = useCookie("userId").value;
//   if (userId) {
//     let menuApi = useMenuApi().value;
//     const { data: pageData } = await useNotLazyCustomFetch(
//       menuApi.getMenuList.url,
//       {
//         method: menuApi.getMenuList.method,
//         params: {
//           userId,
//         },
//         transform(input: any) {
//           return {
//             route: input.data,
//           };
//         },
//       }
//     );
//     const authRoute = useAuthRoute();
//     const myroute = [];
//     
//     for (const routes of pageData.value.route) {
//       const routeObj = {
//         name: "",
//         path: "",
//         component: "",
//       };
//       routeObj.name = routes.menuName;
//       routeObj.path = '/'+routes.menuUrl;
//       routeObj.component = `()=>import(@${routes.source})`;
//       // myroute.push(routeObj);
//       router.addRoute('/',routeObj)
//     }
//     // authRoute.value = myroute;
//   }
// };
