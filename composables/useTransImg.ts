export const useTransImg = (imgUrl: string|undefined): string => {
  return !!imgUrl?"../." + imgUrl:'../img/head/waku.png';
};
