import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ja from "./locales/ja.json";
import en from "./locales/en.json";
import zh from "./locales/zh.json";
import ko from "./locales/ko.json";
import type { PortalPattern } from "@/lib/types";

const LANGUAGE_STORAGE_KEY = "autowifi_language";

export type SupportedLanguage = "ja" | "en" | "zh" | "ko";

const SUPPORTED_LANGUAGES: SupportedLanguage[] = ["ja", "en", "zh", "ko"];

const resources = {
  ja: { translation: ja },
  en: { translation: en },
  zh: { translation: zh },
  ko: { translation: ko },
};

// Detect device locale, default to "ja"
function getDeviceLanguage(): SupportedLanguage {
  try {
    const locale = Localization.getLocales()[0]?.languageCode ?? "ja";
    if (locale === "ja") return "ja";
    if (locale === "zh") return "zh";
    if (locale === "ko") return "ko";
    return "en";
  } catch {
    return "ja";
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: getDeviceLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: "v4",
});

// Load saved language preference
export async function loadSavedLanguage(): Promise<void> {
  try {
    const saved = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES.includes(saved as SupportedLanguage)) {
      await i18n.changeLanguage(saved);
    }
  } catch {
    // ignore
  }
}

// Change and persist language
export async function setLanguage(lang: SupportedLanguage): Promise<void> {
  await i18n.changeLanguage(lang);
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
}

// Get current language
export function getCurrentLanguage(): SupportedLanguage {
  return (i18n.language as SupportedLanguage) || "ja";
}

// Get pattern display name based on current language
export function getPatternName(pattern: PortalPattern): string {
  const lang = i18n.language;
  if (lang === "ja") return pattern.nameJa;
  if (lang === "zh") return pattern.nameZh ?? pattern.name;
  if (lang === "ko") return pattern.nameKo ?? pattern.name;
  return pattern.name;
}

export default i18n;
