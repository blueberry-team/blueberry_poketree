// 기본구성 : 로고, poketree, 다국어버튼, 툴팁버튼
// / :  [기본구성], 로그인 버튼
// /signup-or-go : "<" 버튼, [기본구성]
// /my-tree :  [기본구성], 로그아웃 버튼
// /my-poket-message : "<" 버튼, [기본구성], 로그아웃 버튼
// /my-pokedex, /my-pokedex/[id] : "<" 버튼, [기본구성], 홈버튼

"use client";

import { useState, Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import LogoIcon from "@/assets/icon/logo.webp";
import HeaderBackground from "@/assets/images/background/header_background.webp";
import ButtonSmallBlue from "@/assets/images/components/button_small_blue.webp";
import PokedexDot from "@/assets/images/background/pokedex_dot.webp";
import { LanguageModal } from "../Modal/LanguageModal";
import { SettingModal } from "../Modal/SettingModal";
import { useTranslation } from "../../utils/translate/useLanguage";

function HeaderContent() {
  const pathname = usePathname();
  const router = useRouter();
  const { translate } = useTranslation();
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);

  // 경로별 조건 확인
  const isSignupOrGo = pathname === "/signup-or-go";
  const isMyPoketMessage = pathname === "/my-poket-message";
  const isMyPokedex = pathname?.startsWith("/my-pokedex");

  const isFullScrollPage = pathname === '/' || pathname === '/my-tree';

  // 뒤로가기 버튼 표시 여부
  const showBackButton = isSignupOrGo || isMyPoketMessage || isMyPokedex;

  const handleBack = () => {
    router.back();
  };

  return (
    <header
      className={`w-full h-[70px] shrink-0 bg-[#BF0120] overflow-hidden relative ${isFullScrollPage ? '' : 'sticky top-0 z-50'
        }`}
    >
      {/* 헤더 배경 이미지 */}
      <Image
        src={HeaderBackground}
        alt="헤더 배경"
        width={390}
        height={92}
        className="object-cover absolute -top-[20px] left-0 right-0 w-full h-[92px]"
      />
      <div className="relative z-10 w-full h-full">
        {/* 좌측: 뒤로가기 버튼 또는 로고 그룹 */}
        <div className="absolute left-4 bottom-4 flex items-center gap-2">
          {showBackButton && (
            <button
              onClick={handleBack}
              className="w-9 h-9 rounded flex items-center justify-center"
            >
              <span className="text-black text-xl font-bold">{"<"}</span>
            </button>
          )}
          {!showBackButton && (
            <Image
              src={LogoIcon}
              alt="로고"
              width={37}
              height={36}
              className="object-contain"
            />
          )}
          <div className="relative flex items-center">
            <Image
              src={PokedexDot}
              alt="도감 신호등"
              width={43}
              height={10}
              className="object-contain absolute -top-3 left-0"
            />
            <span className="text-white text-[18px]" style={{ fontFamily: 'var(--font-press-start)' }}>PokéTree</span>
          </div>
        </div>

        {/* 우측 버튼 그룹 */}
        <div className="absolute right-[16px] bottom-[9px] flex gap-[16px] items-center">
          {/* 언어 설정 버튼 */}
          <button
            onClick={() => setIsLanguageModalOpen(true)}
            className="relative flex items-center justify-center"
            style={{ width: "53px", height: "37px" }}
          >
            <Image src={ButtonSmallBlue} alt="언어 버튼" width={53} height={37} className="absolute inset-0" />
            <span className="relative z-10 text-black text-[12px] font-extrabold">{translate("header.language")}</span>
          </button>

          {/* 설정 버튼 */}
          <button
            onClick={() => setIsSettingModalOpen(true)}
            className="relative flex items-center justify-center"
            style={{ width: "53px", height: "37px" }}
          >
            <Image src={ButtonSmallBlue} alt="설정 버튼" width={53} height={37} className="absolute inset-0" />
            <span className="relative z-10 text-black text-[12px] font-extrabold">{translate("header.options")}</span>
          </button>
        </div>
      </div>

      {/* 언어 선택 모달 */}
      <LanguageModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
      />

      {/* 설정 모달 */}
      <SettingModal
        isOpen={isSettingModalOpen}
        onClose={() => setIsSettingModalOpen(false)}
      />
    </header>
  );
}

export function Header() {
  return (
    <Suspense fallback={
      <header className="w-full h-[70px] shrink-0 bg-[#BF0120] overflow-hidden relative">
        <Image
          src={HeaderBackground}
          alt="헤더 배경"
          width={390}
          height={92}
          className="object-cover absolute -top-[20px] left-0 right-0 w-full h-[92px]"
        />
      </header>
    }>
      <HeaderContent />
    </Suspense>
  );
}
