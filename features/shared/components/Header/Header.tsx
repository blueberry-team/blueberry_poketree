
// 기본구성 : 로고, poketree, 다국어버튼, 툴팁버튼
// / :  [기본구성], 로그인 버튼
// /signup-or-go : "<" 버튼, [기본구성]
// /my-tree :  [기본구성], 로그아웃 버튼
// /my-poket-message : "<" 버튼, [기본구성], 로그아웃 버튼
// /my-pokedex, /my-pokedex/[id] : "<" 버튼, [기본구성], 홈버튼

"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import HomeIcon from "@/assets/icon/homeIcon.svg";
import LogoIcon from "@/assets/icon/logo.png";
import HeaderBackground from "@/assets/images/background/header_background.png";
import ButtonSmallBlue from "@/assets/images/components/button_small_blue.png";
import { logout } from "../../usecases/logout";
import { LanguageModal } from "../Modal/LanguageModal";
import { useTranslation } from "../../utils/translate/useLanguage";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { translate } = useTranslation();
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  // 경로별 조건 확인
  const isHome = pathname === "/";
  const isSignupOrGo = pathname === "/signup-or-go";
  const isMyPoketMessage = pathname === "/my-poket-message";
  const isMyPokedex = pathname?.startsWith("/my-pokedex");

  // 뒤로가기 버튼 표시 여부
  const showBackButton = isSignupOrGo || isMyPoketMessage || isMyPokedex;

  // 로그인 버튼 표시 (홈에서만)
  const showLoginButton = isHome;

  // 로그아웃 버튼 표시 (my-poket-message에서만)
  const showLogoutButton = isMyPoketMessage;

  // 홈 버튼 표시 (my-pokedex에서만)
  const showHomeButton = isMyPokedex;

  const handleBack = () => {
    router.back();
  };

  const handleHome = () => {
    // TODO: 유저의 my-tree 페이지로 이동, 유저 id 삽입
    router.push("/my-tree");
  };

  const handleLogin = () => {
    // 로그인 페이지로 이동
    router.push("/signup-or-go");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="w-full h-[60px] sticky top-0 z-50 overflow-hidden bg-primary-red">
      {/* 헤더 배경 이미지 */}
      <Image
        src={HeaderBackground}
        alt="헤더 배경"
        fill
        className="object-cover"
      />
      <div className="relative w-full h-full">
        {/* 좌측: 뒤로가기 버튼 또는 로고 그룹 */}
        <div className="absolute left-4 top-3 flex items-center gap-2">
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
              width={36}
              height={36}
              className="object-contain"
            />
          )}
          <span className="text-white text-xl" style={{ fontFamily: 'var(--font-press-start)' }}>Pokétree</span>
        </div>

        {/* 우측 버튼 그룹 */}
        <div className="absolute right-0 top-[18px] flex items-center ">
          {/* 언어 설정 버튼 */}
          <button
            onClick={() => setIsLanguageModalOpen(true)}
            className="relative w-20 h-10 flex items-center justify-center"
          >
            <Image src={ButtonSmallBlue} alt="언어 버튼" fill className="object-contain absolute inset-0" />
            <span className="relative z-10 text-black text-12 font-bold">{translate("header.language")}</span>
          </button>

          {/* 도움말 버튼 */}
          <button
            onClick={() => router.push("/my-tree")}
            className="relative w-20 h-10 flex items-center justify-center"
          >
            <Image src={ButtonSmallBlue} alt="도움말 버튼" fill className="object-contain absolute inset-0" />
            <span className="relative z-10 text-black text-12 font-bold">{translate("header.help")}</span>
          </button>

          {/* 로그인 버튼 */}
          {showLoginButton && (
            <button
              onClick={handleLogin}
              className="w-[60px] h-[27px] bg-[#000000] rounded-sm flex items-center justify-center"
            >
              <span className="text-white text-xs font-bold">{translate("header.login")}</span>
            </button>
          )}

          {/* 로그아웃 버튼 */}
          {showLogoutButton && (
            <button
              onClick={handleLogout}
              className="w-[60px] h-[27px] bg-[#000000] rounded-sm flex items-center justify-center"
            >
              <span className="text-white text-xs font-bold">{translate("header.logout")}</span>
            </button>
          )}

          {/* 홈 버튼 */}
          {showHomeButton && (
            <button
              onClick={handleHome}
              className="w-[27px] h-[27px] bg-[#D9D9D9] rounded-[13.5px] flex items-center justify-center"
            >
              <Image src={HomeIcon} alt="홈" width={13} height={14} />
            </button>
          )}
        </div>
      </div>

      {/* 언어 선택 모달 */}
      <LanguageModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
      />
    </header>
  );
}
