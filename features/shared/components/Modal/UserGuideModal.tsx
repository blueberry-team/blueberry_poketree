"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import TalkingBoxTop from "@/assets/images/components/talking_box_top.webp";
import TalkingBoxBottom from "@/assets/images/components/talking_box_bottom.webp";
import DoctorOh from "@/assets/images/signuporgo/doctor_oh.webp";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";

interface UserGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GuidePageConfig {
  // true면 talking_box_bottom, false/undefined면 talking_box_top
  useTopBox?: boolean; 
}

const GUIDE_PAGE_CONFIGS: GuidePageConfig[] = [
  { useTopBox: true }, // page1
  { useTopBox: false }, // page2
  { useTopBox: true },  // page3
  { useTopBox: false }, // page4
  { useTopBox: false }, // page5
  { useTopBox: false }, // page6
  { useTopBox: true },  // page7
];

export function UserGuideModal({ isOpen, onClose }: UserGuideModalProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const { translate } = useTranslation();

  // 모달이 열릴 때 body 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // 모달이 닫히면 페이지를 0으로 리셋
  useEffect(() => {
    if (!isOpen) {
      setCurrentPage(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentConfig = GUIDE_PAGE_CONFIGS[currentPage];
  const isLastPage = currentPage === GUIDE_PAGE_CONFIGS.length - 1;

  const handleNext = () => {
    if (isLastPage) {
      onClose();
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // 현재 페이지의 텍스트 가져오기
  const guidePages = [
    translate("guide.page1"),
    translate("guide.page2"),
    translate("guide.page3"),
    translate("guide.page4"),
    translate("guide.page5"),
    translate("guide.page6"),
    translate("guide.page7"),
  ];
  const currentText = guidePages[currentPage];

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={handleNext}
    >
      <div className="relative flex flex-col items-center">
        {/* 말풍선 */}
        <div className="relative mb-4">
          <Image
            src={currentConfig.useTopBox ? TalkingBoxTop : TalkingBoxBottom}
            alt="말풍선"
            width={350}
            height={200}
            className="object-contain"
            priority
          />
          {/* 말풍선 텍스트 */}
          <div className="absolute inset-0 flex items-center justify-center px-12 py-8">
            <p className="text-black text-base font-extrabold text-center whitespace-pre-line leading-relaxed">
              {currentText}
            </p>
          </div>
        </div>

        {/* 오박사 캐릭터 */}
        <div className="relative">
          <Image
            src={DoctorOh}
            alt="오박사"
            width={200}
            height={280}
            className="object-contain"
            priority
          />
        </div>

        {/* 페이지 인디케이터 */}
        <div className="flex gap-2 mt-4">
          {GUIDE_PAGE_CONFIGS.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentPage ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* 터치 영역 안내 텍스트 */}
        <p className="text-white/80 text-sm mt-4">
          {isLastPage ? translate("guide.tapToClose") : translate("guide.tapToNext")}
        </p>
      </div>
    </div>
  );
}
