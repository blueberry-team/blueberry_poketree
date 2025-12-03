/* eslint-disable */
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ko } from "./languages/ko";
import { en } from "./languages/en";
import { ja } from "./languages/ja";

export type Language = "ko" | "en" | "ja";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// ===== Translation Types & Functions =====

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

// ===== Language Context & Provider =====

// 브라우저 언어 감지 함수
function detectBrowserLanguage(): Language {
  if (typeof window === "undefined") return "en";

  const browserLang = navigator.language?.toLowerCase();

  if (!browserLang) return "en";
  if (browserLang.startsWith("ko")) return "ko";
  if (browserLang.startsWith("ja")) return "ja";
  if (browserLang.startsWith("en")) return "en";
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // 서버/클라이언트 초기값을 동일하게 "en"으로 설정하여 hydration 불일치 방지
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  // 클라이언트 마운트 확인 및 localStorage 동기화
  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && ["ko", "en", "ja"].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    } else {
      // localStorage에 저장된 언어가 없으면 브라우저 언어 감지
      const detectedLang = detectBrowserLanguage();
      setLanguageState(detectedLang);
    }
  }, []);

  // pathname 변경 시 localStorage 재확인 (뒤로가기 대응)
  useEffect(() => {
    if (!mounted) return;

    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && ["ko", "en", "ja"].includes(savedLanguage)) {
      if (savedLanguage !== language) {
        setLanguageState(savedLanguage);
      }
    }
  }, [pathname, mounted, language]);

  // 언어 변경 함수
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  // SSR/hydration 중에는 렌더링하지 않아서 불일치 방지
  if (!mounted) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// ===== Translation Hook =====

export function useTranslation() {
  const { language } = useLanguage();

  const translate = (key: TranslationKey): string => {
    return getTranslation(language, key);
  };

  return { translate, language };
}
