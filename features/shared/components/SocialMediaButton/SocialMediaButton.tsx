"use client";

import Image from "next/image";
import InstagramIcon from "@/assets/icon/instagramIcon.svg";
import XIcon from "@/assets/icon/xIcon.svg";
import RightArrowIcon from "@/assets/icon/rightArrowIcon.svg";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";

/**
 * 소셜미디어 버튼 컴포넌트
 * - 언어별로 다른 소셜미디어 링크로 이동
 * - 한국어/영어: Instagram
 * - 일본어: Twitter
 */
export function SocialMediaButton() {
  const { translate, language } = useTranslation();

  const handleSocialClick = () => {
    const socialUrls = {
      ko: "https://instagram.com/poketree_kr",
      en: "https://instagram.com/poketree_official",
      ja: "https://twitter.com/poketree_jp",
    };
    window.open(socialUrls[language], "_blank");
  };

  // 언어별 아이콘 선택
  const socialIcon = language === "ja" ? XIcon : InstagramIcon;

  return (
    <div className="w-full bg-[#DC0A2D] py-8">
      <div className="mx-auto flex max-w-[320px] flex-col items-center gap-4 px-4">
        {/* 상단 텍스트 */}
        <p className="font-pf-stardust font-bold text-center text-[24px] leading-[1.34] tracking-[-0.6px] text-white">
          {translate("landing.visitSocial")}
        </p>

        {/* 소셜미디어 카드 */}
        <div
          onClick={handleSocialClick}
          className="flex h-[110px] w-[320px] items-center gap-[19.738px] rounded-[11.963px] border-[2.393px] border-[#EEF2F6] bg-white p-[19.14px] shadow-[5.981px_5.981px_14.355px_2.991px_rgba(0,0,0,0.10)] cursor-pointer hover:opacity-90 transition-opacity"
        >
          {/* 왼쪽: 아이콘 + 텍스트 */}
          <div className="flex items-center gap-[19.738px]">
            {/* 소셜미디어 아이콘 */}
            <Image
              src={socialIcon}
              alt="Social Icon"
              width={72.374}
              height={72.374}
              className="aspect-square"
            />

            {/* 텍스트 영역 */}
            <div className="flex flex-col items-start gap-[4.785px]">
              <span
                className={`font-pf-stardust font-bold text-left leading-[135%] tracking-[-0.598px] text-black ${
                  language === "en" ? "text-[14px]" : "text-[16px]"
                }`}
              >
                {translate("landing.socialName")}
              </span>
              <span
                className={`font-pf-stardust text-left font-extrabold leading-[135%] tracking-[-0.538px] text-[#DC0A2D] ${
                  language === "en" ? "text-[16px]" : "text-[18px]"
                }`}
              >
                {translate("landing.socialId")}
              </span>
            </div>
          </div>

          {/* 오른쪽 > 아이콘 */}
          <Image
            src={RightArrowIcon}
            alt="Arrow"
            width={9.6}
            height={17.13}
          />
        </div>
      </div>
    </div>
  );
}
