import { Language } from "./useLanguage";
import { ko } from "./languages/ko";
import { en } from "./languages/en";
import { ja } from "./languages/ja";

export const translations = {
  ko,
  en,
  ja,
} as const;

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

export type TranslationKey = NestedKeyOf<typeof translations.ko>;

export function getTranslation(language: Language, key: TranslationKey): string {
  const keys = key.split(".");
  let value: any = translations[language];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}
