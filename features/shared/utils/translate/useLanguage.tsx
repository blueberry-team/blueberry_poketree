"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "ko" | "en" | "ja";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 브라우저 언어 감지 함수
function detectBrowserLanguage(): Language {
  if (typeof window === "undefined") return "ko";

  const browserLang = navigator.language.toLowerCase();

  if (browserLang.startsWith("ko")) return "ko";
  if (browserLang.startsWith("ja")) return "ja";
  return "en";
}

// 초기 언어 설정 함수 (서버/클라이언트 모두 동작)
function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "ko";

  const savedLanguage = localStorage.getItem("language") as Language;
  if (savedLanguage && ["ko", "en", "ja"].includes(savedLanguage)) {
    return savedLanguage;
  }

  return detectBrowserLanguage();
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => getInitialLanguage());

  // 언어 변경 함수
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

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
