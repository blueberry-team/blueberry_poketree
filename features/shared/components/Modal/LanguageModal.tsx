"use client";

import Image from "next/image";
import { Language, useLanguage, useTranslation } from "../../utils/translate/useLanguage";
import CloseIcon from "@/assets/icon/closeIcon.png";

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
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* 모달 컨테이너 */}
      <div className="relative">
        {/* 닫기 버튼 - 모달 바깥 우측 상단 */}
        <button
          onClick={onClose}
          className="absolute bottom-[calc(100%+15px)] right-0 w-8 h-8 bg-black rounded flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors z-10"
          aria-label="닫기"
        >
          <Image
            src={CloseIcon}
            alt="닫기"
            width={20}
            height={20}
            className="object-contain"
          />
        </button>

        {/* 모달 내용 */}
        <div
          className="bg-white rounded-3xl px-6 pt-10 pb-16 w-[360px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`px-4 py-3 rounded border transition-all text-black ${
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
    </div>
  );
}
