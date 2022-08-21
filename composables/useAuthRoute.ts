type inputs = {
  menuName: string;
  menuUrl: string;
  source: string;
  title: string;
  icon: string;
};
interface inputMenuGet {
  data: inputs[];
}
interface outputMenuGet {
  name: string;
  path: string;
  component: string;
  title: string;
  icon: string;
}
// 获取动态路由
export const useAuthRoute = async () => {
  let menuApi = useMenuApi().value;
  const userId = useCookie("userId").value;
  return await useNotLazyCustomFetch(menuApi.getMenuList.url, {
    method: menuApi.getMenuList.method,
    params: {
      userId,
    },
    transform(input: inputMenuGet): outputMenuGet[] {
      let resTemp = [];
      for (const item of input.data) {
        resTemp.push({
          name: item.menuName,
          path: "/" + item.menuUrl,
          component: item.source,
          title: item.title,
          icon: item.icon,
        });
      }
      useMenus().value = resTemp
      return resTemp;
    },
  });
};
interface Menus {
  title: string;
  icon: string;
  path: string;
}
// 设置menus给菜单
export const useMenus = () => useState("menus", (): Menus[] => []);
