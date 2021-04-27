import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  // load translation using http -> see /public/locales
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "zh", // 系统语言配置
    fallbackLng: "zh",
    debug: false,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

export type i18nKey = "zh" | "en";

export const i18nList: { key: i18nKey; label: string }[] = [
  { key: "zh", label: "中文" },
  { key: "en", label: "English" },
];
