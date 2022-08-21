import { animate } from "popmotion";
// 默认目录树
export const useTocList = () => useState("tocList", () => []);
// 设置目录树点击事件所移动的动画
export const useScrollToToc =
  () =>
  (to: number): void => {
    animate({
      from: window.scrollY, // 当前的位置
      to:to-100, // 目标位置
      onUpdate: (latest) => window.scrollTo(0, latest),
    });
  };
