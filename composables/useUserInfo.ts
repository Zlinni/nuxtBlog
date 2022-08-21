// 用户信息状态
const useUserInfo = () =>
  useState("userInfo", (): User.UserInfo => {
    return {
      _id: "",
      userName: "",
      auth: "",
      menu: "",
      status: "",
      role: "",
      avater: "",
    };
  });
// 获取用户信息
export const getUserInfo = () => {
  const userInfo = useUserInfo();
  return {
    ...userInfo.value,
    avater: useTransImg(userInfo.value.avater),
  };
};
// 获取cookie中的用户信息
export const getCookieUserInfo = () => {
  // const userId = Cookies.get('userId')
  const userId = useCookie("userId");
  if (userId) {
    return userId;
  }
};
// 设置用户信息
export const setUserInfo = (data: User.UserData) => {
  // Cookies.set("token", data.info);
  // Cookies.set("userName", data.userData.userName);
  // Cookies.set("avatar", data.userData.avater);
  // Cookies.set("userId", data.userData._id);
  useCookie("token").value = data.info;
  useCookie("userName").value = data.userData.userName;
  useCookie("avatar").value = data.userData.avater;
  useCookie("userId").value = data.userData._id;
  let userInfo = useUserInfo();
  userInfo.value = data.userData;
};
