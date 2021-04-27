import { createContext } from "react";
import { i18nKey, i18nList } from ".";

const LanguageContext = createContext<{
  language: i18nKey;
  setLanguage: (newKey: i18nKey) => void;
}>({
  language: i18nList[0].key,
  setLanguage: () => {},
});

export default LanguageContext;
