"use client";

import { Language, useLanguage } from "../../hooks/useLanguage";
import { useTranslation } from "../../hooks/useTranslation";

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LanguageModal({ isOpen, onClose }: LanguageModalProps) {
  const { language, setLanguage } = useLanguage();
  const { translate } = useTranslation();

  if (!isOpen) return null;

  const languages: { code: Language; label: string }[] = [
    { code: "ko", label: translate("language.korean") },
    { code: "en", label: translate("language.english") },
    { code: "ja", label: translate("language.japanese") },
  ];

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-[300px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4 text-center">
          {translate("language.title")}
        </h2>

        <div className="flex flex-col gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`px-4 py-3 rounded border transition-all ${
                language === lang.code
                  ? "bg-[#90EE90] border-[#90EE90] font-bold"
                  : "bg-white border-gray-300 hover:bg-gray-50"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
