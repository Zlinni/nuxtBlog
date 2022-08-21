// 错误信息
export const useErrorMsg = () => useState("errorMsg", (): string => "");
// 触发全局错误模块
export const useIsError = () => useState("isError", (): boolean => false);
// 正确信息
export const useSuccessMsg = ()=>useState("successInfo",():string => ""); 