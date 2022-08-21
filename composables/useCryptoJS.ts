import CryptoJS from "crypto-js";
// 加密
export const useCryptoEncrypt = (val) => {
  // const { $getRuntimeConfig } = useNuxtApp();
  // const config = $getRuntimeConfig();
  const config = useRuntimeConfig();
  const cryptoSecret: string = config.public.cryptoSecret;
  return CryptoJS.AES.encrypt(val, cryptoSecret);
};
// 解密
export const useCryptoDecrypt = (val) => {
  // const { $getRuntimeConfig } = useNuxtApp();
  // const config = $getRuntimeConfig();
  const config = useRuntimeConfig();
  const cryptoSecret: string = config.public.cryptoSecret;
  return CryptoJS.AES.decrypt(val, cryptoSecret).toString(CryptoJS.enc.Utf8);
};
