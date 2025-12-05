"use client";

import { Language, useLanguage } from "../../utils/translate/useLanguage";
import { BaseModal } from "@/features/shared/components/Modal/BaseModal";

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LanguageModal({ isOpen, onClose }: LanguageModalProps) {
  const { language, setLanguage } = useLanguage();

  if (!isOpen) return null;

  const languages: { code: Language; label: string; useJaFont?: boolean }[] = [
    { code: "ko", label: "한국어" },
    { code: "en", label: "English" },
    { code: "ja", label: "日本語", useJaFont: true },
    { code: "es", label: "Español" },
    { code: "pt", label: "Português" },
    { code: "ru", label: "Русский" },
    { code: "vi", label: "Tieng Viet" },
    { code: "zh-CN", label: "简体中文" },
    { code: "zh-TW", label: "繁體中文" },
  ];

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      contentClassName="bg-white rounded-3xl px-4 sm:px-6 pt-8 sm:pt-10 pb-12 sm:pb-16 w-[360px] max-w-[90vw]"
    >
          <div className="flex flex-col gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`px-4 py-3 rounded transition-all text-black ${
                  language === lang.code
                    ? "bg-[#90EE90] font-regular"
                    : "bg-[#F5F5F5] hover:bg-gray-200"
                }`}
                style={{ fontFamily: lang.useJaFont ? "var(--font-pixel-mplus)" : "var(--font-pf-stardust)" }}
              >
                {lang.label}
              </button>
            ))}
          </div>
    </BaseModal>
  );
}
