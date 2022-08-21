// 文章api地址
export const useBlogApi = () =>
  useState("blogApi", () => {
    // const { $getRuntimeConfig } = useNuxtApp();
    // const config = $getRuntimeConfig();
    const config = useRuntimeConfig();
    const baseUrl = config.public.blogApi;
    return {
      // 获取文章列表
      getList: {
        url: baseUrl + "/posts/getList",
        method: "get",
      },
      // 获取文章具体内容
      readPost: {
        url: baseUrl + "/posts/readPost",
        method: "get",
      },
      // 获取最新文章列表
      getLastestPost: {
        url: baseUrl + "/posts/getLastestPost",
        method: "get",
      },
      // 获取标签列表
      getTags: {
        url: baseUrl + "/tag/getTags",
        method: "get",
      },
      // 添加标签
      addTags: {
        url: baseUrl + "/tag/addTags",
        method: "post",
      },
      // 删除标签
      deleteTags: {
        url: baseUrl + "/tag/deleteTags",
        method: "post",
      },
      // 修改标签
      modifyTags: {
        url: baseUrl + "/tag/modifyTags",
        method: "post",
      },
      // 获取带指定标签的文章列表
      getTagList: {
        url: baseUrl + "/posts/getTagsList",
        method: "get",
      },
      // 获取目录列表
      getCategories: {
        url: baseUrl + "/category/getCategories",
        method: "get",
      },
      // 新增目录
      addCategory: {
        url: baseUrl + "/category/addCategories",
        method: "post",
      },
      // 修改目录
      modifyCategory: {
        url: baseUrl + "/category/modifyCategories",
        method: "post",
      },
      // 删除目录
      deleteCategory: {
        url: baseUrl + "/category/deleteCategories",
        method: "post",
      },
      // 获取带指定目录的文章列表
      getCategoryList: {
        url: baseUrl + "/posts/getCategoriesList",
        method: "get",
      },
    };
  });
// 用户api地址
export const useUserApi = () =>
  useState("userApi", () => {
    // const { $getRuntimeConfig } = useNuxtApp();
    // const config = $getRuntimeConfig();
    const config = useRuntimeConfig();

    const baseUrl: string = config.public.blogApi;
    return {
      // 注册列表
      register: {
        url: baseUrl + "/user/register",
        method: "POST",
      },
      // 登陆
      login: {
        url: baseUrl + "/user/login",
        method: "POST",
      },
      // 获取用户具体内容
      getUserList: {
        url: baseUrl + "/user/getUserList",
        method: "GET",
      },
      // 修改用户
      modifyUser: {
        url: baseUrl + "/user/modifyUser",
        method: "POST",
      },
      // 删除用户
      deleteUser: {
        url: baseUrl + "/user/deleteUser",
        method: "POST",
      },
    };
  });
// 菜单api地址
export const useMenuApi = () =>
  useState("menuApi", () => {
    const config = useRuntimeConfig();
    const baseUrl: string = config.public.blogApi;
    return {
      // 获取权限菜单列表
      getMenuList: {
        url: baseUrl + "/menu/findAll",
        method: "GET",
      },
      // 添加菜单
      addMenu: {
        url: baseUrl + "/menu/addMenu",
        method: "POST",
      },
      // 修改菜单
      modifyMenu: {
        url: baseUrl + "/menu/modifyMenu",
        method: "POST",
      },
      // 删除菜单
      deleteMenu: {
        url: baseUrl + "/menu/deleteMenu",
        method: "POST",
      },
    };
  });
export const useWebsocketApi = () =>
  useState("wsApi", (): string => {
    const config = useRuntimeConfig();
    const baseUrl: Readonly<string> = config.public.blogWebsocket;
    return baseUrl;
  });
