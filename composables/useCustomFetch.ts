import type {
  AsyncDataOptions,
  _Transform,
} from "nuxt/dist/app/composables/asyncData";
import { UseFetchOptions } from "nuxt/dist/app/composables/fetch";
import type { FetchOptions } from "ohmyfetch";
const getAuthToken = (): string => {
  try {
    // return "Bearer " + localStorage.getItem("token");
    return localStorage.getItem("token");

  } catch (error) {
    return " ";
  }
};
export type lazyFetch = FetchOptions & AsyncDataOptions<any>;
// 懒fetch 配合default使用
export const useCustomFetch = (url: string, options?: lazyFetch) => {
  return useLazyFetch(url, {
    ...options,
    headers: {
      Authorization: getAuthToken(),
    },
    async onResponse({ request, response, options }) {
      console.log("[fetch response]");
    },
    async onResponseError({ request, response, options }) {
      console.log("[fetch response error]");
    },

    async onRequest({ request, options }) {
      console.log("[fetch request]");
    },
    async onRequestError({ request, options, error }) {
      console.log("[fetch request error]");
      useIsError().value = true;
      useErrorMsg().value = error?.message
    },
  });
};
// 常规fetch 配合await使用
export const useNotLazyCustomFetch = (url: string, options?: UseFetchOptions<any>) => {
  return useFetch(url, {
    ...options,
    headers: {
      Authorization: getAuthToken(),
    },
    async onResponse({ request, response, options }) {
      console.log("[fetch response]");
      if(response._data.code===-1&&response._data.message){
        
        useIsError().value = true;
        useErrorMsg().value = response._data.message
      }
    },
    async onResponseError({ request, response, options }) {
      console.log("[fetch response error]");
    },

    async onRequest({ request, options }) {
      console.log("[fetch request]");
    },
    async onRequestError({ request, options, error }) {
      console.log("[fetch request error]");
      useIsError().value = true;
      useErrorMsg().value = error?.message
    },
  });
};