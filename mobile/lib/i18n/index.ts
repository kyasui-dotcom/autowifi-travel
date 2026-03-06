import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ja from "./locales/ja.json";
import en from "./locales/en.json";
import type { PortalPattern } from "@/lib/types";

const LANGUAGE_STORAGE_KEY = "autowifi_language";

const resources = {
  ja: { translation: ja },
  en: { translation: en },
};

// Detect device locale, default to "ja"
function getDeviceLanguage(): string {
  try {
    const locale = Localization.getLocales()[0]?.languageCode ?? "ja";
    return locale === "ja" ? "ja" : "en";
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
    if (saved && (saved === "ja" || saved === "en")) {
      await i18n.changeLanguage(saved);
    }
  } catch {
    // ignore
  }
}

// Change and persist language
export async function setLanguage(lang: "ja" | "en"): Promise<void> {
  await i18n.changeLanguage(lang);
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
}

// Get current language
export function getCurrentLanguage(): string {
  return i18n.language;
}

// Get pattern display name based on current language
export function getPatternName(pattern: PortalPattern): string {
  return i18n.language === "ja" ? pattern.nameJa : pattern.name;
}

export default i18n;
