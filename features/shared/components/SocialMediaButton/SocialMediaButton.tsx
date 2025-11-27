"use client";

import Image from "next/image";
import InstagramIcon from "@/assets/icon/instagramIcon.svg";
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

  return (
    <div className="w-full bg-[#DC0A2D] py-8">
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4">
        {/* 상단 텍스트 */}
        <p className="text-center text-2xl font-bold text-white">
          {translate("landing.visitSocial")}
        </p>

        {/* 소셜미디어 카드 */}
        <div
          onClick={handleSocialClick}
          className="flex items-center gap-5 w-full max-w-[320px] rounded-2xl border-2 border-[#EEF2F6] bg-white px-5 py-5 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
        >
          {/* 왼쪽 아이콘 */}
          <div className="flex h-[72px] w-[72px] items-center justify-center flex-shrink-0">
            <Image
              src={InstagramIcon}
              alt="Social Icon"
              width={72}
              height={72}
            />
          </div>

          {/* 가운데 텍스트 */}
          <div className="flex flex-1 flex-col justify-center gap-1">
            <span className="text-[24px] font-bold text-black">
              {translate("landing.socialName")}
            </span>
            <span className="text-[22px] font-bold text-[#DC0A2D]">
              {translate("landing.socialId")}
            </span>
          </div>

          {/* 오른쪽 화살표 */}
          <div className="flex items-center justify-center flex-shrink-0">
            <Image
              src={RightArrowIcon}
              alt="Arrow"
              width={10}
              height={18}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
