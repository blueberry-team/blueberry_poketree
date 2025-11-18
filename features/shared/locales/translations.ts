import { Language } from "../hooks/useLanguage";
import { ko } from "./languages/ko";
import { en } from "./languages/en";
import { ja } from "./languages/ja";

export const translations = {
  ko,
  en,
  ja,
} as const;

export type TranslationKey = keyof typeof translations.ko;

export function getTranslation(language: Language, key: TranslationKey): string {
  return translations[language][key] || key;
}
