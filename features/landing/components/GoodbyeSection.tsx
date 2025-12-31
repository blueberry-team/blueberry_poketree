"use client";

import { useMemo } from "react";
import Image from "next/image";
import InstagramIcon from "@/assets/icon/instagramIcon.svg";
import XIcon from "@/assets/icon/xIcon.svg";
import RightArrowIcon from "@/assets/icon/rightArrowIcon.svg";
import ButtonLargeGreen from "@/assets/images/components/button_large_green.webp";
import DoctorOhWithShadow from "@/assets/images/components/doctor_oh_with_shadow.webp";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import { trackButtonClick } from "@/features/shared/utils/analytics/analytics";
import { createButtonDebouncer } from "@/features/shared/utils/debounce/ButtonDebouncer";

/**
 * GoodbyeSection 컴포넌트
 * "Good Bye 2025!" 인사말부터 인스타그램 버튼, 의견 남기기 버튼까지 포함하는 섹션
 */
export function GoodbyeSection() {
  const { translate, language } = useTranslation();

  // 디바운서 생성
  const debouncer = useMemo(() => createButtonDebouncer(), []);

  // 인스타그램 클릭 핸들러
  const handleInstagramClick = useMemo(
    () => debouncer.debounceLeading(() => {
      const socialUrls = {
        ko: "https://instagram.com/poketree_kr",
        en: "https://instagram.com/poketree_official",
        ja: "https://twitter.com/poketree_jp",
        es: "https://instagram.com/poketree_official",
        pt: "https://instagram.com/poketree_official",
        ru: "https://instagram.com/poketree_official",
        vi: "https://instagram.com/poketree_official",
        "zh-CN": "https://instagram.com/poketree_official",
        "zh-TW": "https://instagram.com/poketree_official",
      };

      const platform = language === "ja" ? "twitter" : "instagram";
      trackButtonClick("button_click_social_media", {
        platform,
        language,
        url: socialUrls[language],
      });

      window.open(socialUrls[language], "_blank");
    }),
    [debouncer, language]
  );

  // 의견 남기기 버튼 클릭 핸들러
  const handleFeedbackClick = useMemo(
    () => debouncer.debounceLeading(() => {
      // 언어에 따라 다른 구글 폼 URL로 이동
    let feedbackUrl: string;

    switch (language) {
      case 'ja':
        feedbackUrl = 'https://forms.gle/FE4S7wm61q6q5CHU9'; // 일본어
        break;
      case 'ko':
        feedbackUrl = 'https://forms.gle/WFpBjmHn8rEKEvvj8'; // 한국어
        break;
      default:
        feedbackUrl = 'https://forms.gle/wH7LbWN65768vFor8'; // 공통
        break;
    }

    window.open(feedbackUrl, '_blank');
    }),
    [debouncer, language]
  );

  // 언어별 아이콘 선택
  const socialIcon = language === "ja" ? XIcon : InstagramIcon;

  return (
    <div className="flex flex-col items-center gap-6 px-8 py-8 h-full">
      {/* Good Bye 2025! 섹션 */}
      <div className="flex flex-col items-center gap-5 mb-8">
        {/* 텍스트 영역 */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="font-extrabold text-[28px] text-white text-left">
            {translate("landing.goodbyeTitle")}
          </h1>
          <p className="font-extrabold text-[28px] text-white text-center">
            {translate("landing.goodbyeSubtitle")}
          </p>
        </div>

        {/* 오박사 이미지 */}
        <div className="relative w-[84px] h-[148px]">
          <Image
            src={DoctorOhWithShadow}
            alt="Doctor Oh Santa"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* 의견 남기기 섹션 */}
      <div className="flex flex-col gap-4 w-full max-w-[323px]">
        {/* 설명 텍스트 */}
        <p className="font-bold text-[19px] text-white text-center">
          {translate("landing.feedbackDescription")}
        </p>

        {/* 의견 남기러 가기 버튼 */}
        <div
          onClick={handleFeedbackClick}
          className="relative w-full h-[60px] cursor-pointer hover:opacity-90 transition-opacity"
        >
          <Image
            src={ButtonLargeGreen}
            alt="Feedback Button Background"
            fill
            className="object-fill"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-extrabold text-[20px] text-black">
              {translate("landing.feedbackButton")}
            </span>
          </div>
        </div>
      </div>

            {/* 인스타그램 섹션 */}
            <div className="flex flex-col items-center gap-4 w-full max-w-[320px] mb-8">
        {/* 인스타그램 구경하러 가기 텍스트 */}
        <p className="font-bold text-[24px] text-white text-center">
          {translate("landing.visitSocial")}
        </p>

        {/* 인스타그램 버튼 */}
        <div
          onClick={handleInstagramClick}
          className="flex w-full items-center gap-5 rounded-xl bg-white py-5 px-5 shadow-[6px_6px_14px_3px_#0000001A] border-[2.4px] border-[#EEF2F6] cursor-pointer hover:opacity-90 transition-opacity"
        >
          {/* 왼쪽: 아이콘 */}
          <Image
            src={socialIcon}
            alt="Social Icon"
            width={72}
            height={72}
            className="shrink-0"
          />

          {/* 중앙: 텍스트 영역 */}
          <div className="flex flex-col gap-3 flex-1 min-w-0">
            <span className="font-bold text-[24px] text-black wrap-break-word">
              {translate("landing.socialName")}
            </span>
            <span className="font-extrabold text-[15px] text-[#DC0A2D] wrap-break-word">
              {translate("landing.socialId")}
            </span>
          </div>

          {/* 오른쪽: 화살표 아이콘 */}
          <Image
            src={RightArrowIcon}
            alt="Arrow"
            width={16}
            height={32}
            className="shrink-0"
          />
        </div>
      </div>
    </div>
  );
}

