// // this line is optional if you're using auto-imports
// // this is only defined on server
// // const { $getRuntimeConfig } = useNuxtApp()
// // const config = $getRuntimeConfig()
// // console.log(config.public.blogApi);
// // this is always accessible
// // const config = useRuntimeConfig();
// // console.log(config,'config');
// // const baseUrl = config.public.blogApi;
// const baseUrl = 'http://localhost:9980'
// // const preLink: string = "/blog";
// const blogApi = {
//   // 获取文章列表
//   getList: {
//     url: baseUrl + "/posts/getList",
//     method: "get",
//   },
//   // 获取文章具体内容
//   readPost: {
//     url: baseUrl + "/posts/readPost",
//     method: "get",
//   },
//   // 获取最新文章列表
//   getLastestPost: {
//     url: baseUrl + "/posts/getLastestPost",
//     method: "get",
//   },
//   // 获取标签列表
//   getTags: {
//     url: baseUrl + "/tag/getTags",
//     method: "get",
//   },
//   // 添加标签
//   addTags: {
//     url: baseUrl + "/tag/addTags",
//     method: "post",
//   },
//   // 删除标签
//   deleteTags: {
//     url: baseUrl + "/tag/deleteTags",
//     method: "post",
//   },
//   // 修改标签
//   modifyTags: {
//     url: baseUrl + "/tag/modifyTags",
//     method: "post",
//   },
//   // 获取带指定标签的文章列表
//   getTagList: {
//     url: baseUrl + "/posts/getTagsList",
//     method: "get",
//   },
//   // 获取目录列表
//   getCategories: {
//     url: baseUrl + "/category/getCategories",
//     method: "get",
//   },
//   // 新增目录
//   addCategory: {
//     url: baseUrl + "/category/addCategories",
//     method: "post",
//   },
//   // 修改目录
//   modifyCategory: {
//     url: baseUrl + "/category/modifyCategories",
//     method: "post",
//   },
//   // 删除目录
//   deleteCategory: {
//     url: baseUrl + "/category/deleteCategories",
//     method: "post",
//   },
//   // 获取带指定目录的文章列表
//   getCategoryList: {
//     url: baseUrl + "/posts/getCategoriesList",
//     method: "get",
//   },
// };
// const userApi = {

// }
// export default blogApi;
