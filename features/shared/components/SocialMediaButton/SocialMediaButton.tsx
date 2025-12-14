"use client";

import { useMemo } from "react";
import Image from "next/image";
import InstagramIcon from "@/assets/icon/instagramIcon.svg";
import XIcon from "@/assets/icon/xIcon.svg";
import RightArrowIcon from "@/assets/icon/rightArrowIcon.svg";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import { trackButtonClick } from "@/features/shared/utils/analytics/analytics";
import { createButtonDebouncer } from "@/features/shared/utils/debounce/ButtonDebouncer";

/**
 * 소셜미디어 버튼 컴포넌트
 * - 언어별로 다른 소셜미디어 링크로 이동
 * - 한국어/영어: Instagram
 * - 일본어: Twitter
 */
export function SocialMediaButton() {
  const { translate, language } = useTranslation();

  // 디바운서 생성
  const debouncer = useMemo(() => createButtonDebouncer(), []);

  const handleSocialClick = useMemo(
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

  // 언어별 아이콘 선택
  const socialIcon = language === "ja" ? XIcon : InstagramIcon;

  return (
    <div className="bg-[#DC0A2D] pt-4 pb-8">
      <div className="flex flex-col items-center gap-4 px-4">
        {/* 상단 텍스트 */}
        <p className="font-pf-stardust font-bold text-center text-[24px] leading-normal tracking-tight text-white">
          {translate("landing.visitSocial")}
        </p>

        {/* 소셜미디어 카드 */}
        <div
          onClick={handleSocialClick}
          className="flex w-[85vw] max-w-[320px] h-[34.375vw] max-h-[110px] items-center gap-3 rounded-xl bg-white py-3 px-4 shadow-[6px_6px_14px_3px_#0000001A] cursor-pointer hover:opacity-90 transition-opacity"
        >
          {/* 왼쪽: 아이콘 + 텍스트 */}
          <div className="flex items-center gap-3">
            {/* 소셜미디어 아이콘 */}
            <Image
              src={socialIcon}
              alt="Social Icon"
              className="aspect-square w-[22vw] h-[22vw] max-w-[72px] max-h-[72px]"
            />

            {/* 텍스트 영역 */}
            <div className="flex flex-col items-start gap-0.5">
              <span
                className="font-pf-stardust font-bold text-left leading-snug tracking-tight text-black text-[24px]"
              >
                {translate("landing.socialName")}
              </span>
              <span
                className="font-pf-stardust text-left font-extrabold leading-snug tracking-tight text-[#DC0A2D] text-[16px]"
              >
                {translate("landing.socialId")}
              </span>
            </div>
          </div>

          {/* 오른쪽 > 아이콘 */}
          <Image
            src={RightArrowIcon}
            alt="Arrow"
            className="w-[2.5vw] h-[5vw] max-w-[8px] max-h-[16px]"
          />
        </div>
      </div>
    </div>
  );
}
