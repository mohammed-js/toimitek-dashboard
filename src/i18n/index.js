import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en";
import ar from "./ar";
import { localStorageObjectExtractor } from "utils/generalUtils";

i18next.use(initReactI18next).init({
  // resources,
  resources: {
    en: {
      translation: en,
    },
    ar: {
      translation: ar,
    },
  },
  // lng: "en",
  lng: localStorageObjectExtractor("settings", "language"),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
