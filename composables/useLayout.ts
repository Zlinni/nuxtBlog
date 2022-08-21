interface layoutProp<T extends Boolean> {
  appbar: T;
  drawer: T;
}
// 控制页面使用何种布局
const useLayout = () =>
  useState("layoutProp", (): layoutProp<boolean> => {
    return {
      appbar: true,
      drawer: true,
    };
  });
