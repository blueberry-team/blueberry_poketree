"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ko");

  // 초기화: localStorage에서 언어 설정 불러오기 또는 브라우저 언어 감지
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && ["ko", "en", "ja"].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    } else {
      // localStorage에 저장된 값이 없으면 브라우저 언어 감지
      const detectedLang = detectBrowserLanguage();
      setLanguageState(detectedLang);
    }
  }, []);

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
