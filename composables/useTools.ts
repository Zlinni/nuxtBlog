// 获取root树的键值对
export const useGetTreeKey = (
  data: Array<any>,
  key: string,
  callback: Function
) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].name == key) {
      return callback(data[i], i, data);
    }
    if (data[i].children) {
      useGetTreeKey(data[i].children, key, callback);
    }
  }
};
// 判断数组且长度大于0
export const useIsArrayAndLength = (val:any) => {
  return Array.isArray(val) && val?.length > 0;
};
// // 所查找到的节点要存储的方法
// let Obj = "";
// loop(arr, "index-blogs", (item, index, arr) => {
//   Obj = item;
// });

// // 此时就是Obj对应的要查找的节点
// console.log(Obj);
