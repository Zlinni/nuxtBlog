import { createI18n } from "vue-i18n";
import ch from "./zh-cn/user.json";
import en from "./en/user.json";

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  globalInjection: true,
  messages: {
    "zh-cn": ch,
    en: en,
  },
});

export default i18n;
