
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
  const isMyTree = pathname === "/my-tree";
  const isMyPoketMessage = pathname === "/my-poket-message";
  const isMyPokedex = pathname?.startsWith("/my-pokedex");

  // 뒤로가기 버튼 표시 여부
  const showBackButton = isSignupOrGo || isMyPoketMessage || isMyPokedex;

  // 로그인 버튼 표시 (홈에서만)
  const showLoginButton = isHome;

  // 로그아웃 버튼 표시 (my-tree, my-poket-message에서만)
  const showLogoutButton = isMyTree || isMyPoketMessage;

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
    <header className="w-full h-[60px] bg-[#828282] sticky top-0 z-50">
      <div className="relative w-full h-full">
        {/* 좌측: 뒤로가기 버튼 또는 로고 그룹 */}
        <div className="absolute left-4 top-3 flex items-center gap-4">
          {showBackButton && (
            <button
              onClick={handleBack}
              className="w-9 h-9 rounded flex items-center justify-center"
            >
              <span className="text-black text-xl font-bold">{"<"}</span>
            </button>
          )}
          {!showBackButton && (
            <div className="w-9 h-9 bg-[#B5B5B5] flex items-center justify-center">
              <span className="text-black text-base font-normal">로고</span>
            </div>
          )}
          <span className="text-black text-xl font-normal">PokeTree</span>
        </div>

        {/* 우측 버튼 그룹 */}
        <div className="absolute right-4 top-[18px] flex items-center gap-2.5">
          {/* 언어 설정 버튼 */}
          <button
            onClick={() => setIsLanguageModalOpen(true)}
            className="w-[27px] h-[27px] bg-[#D9D9D9] rounded-[13.5px] flex items-center justify-center"
          >
            <span className="text-black text-base font-bold">文</span>
          </button>

          {/* 도움말 버튼 - 임시로 my-tree로 이동 */}
          <button
            onClick={() => router.push("/my-tree")}
            className="w-[27px] h-[27px] bg-[#D9D9D9] rounded-[13.5px] flex items-center justify-center"
          >
            <span className="text-black text-base font-bold">?</span>
          </button>

          {/* 로그인 버튼 */}
          {showLoginButton && (
            <button
              onClick={handleLogin}
              className="w-[60px] h-[27px] bg-[#000000] rounded-[4px] flex items-center justify-center"
            >
              <span className="text-white text-xs font-bold">{translate("header.login")}</span>
            </button>
          )}

          {/* 로그아웃 버튼 */}
          {showLogoutButton && (
            <button
              onClick={handleLogout}
              className="w-[60px] h-[27px] bg-[#000000] rounded-[4px] flex items-center justify-center"
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
