"use client";

import { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { BottomCrossButton } from "../BottomCrossButton/BottomCrossButton";

interface PageLayoutProps {
  children: ReactNode;
  onUp?: () => void;
  onDown?: () => void;
  onLeft?: () => void;
  onRight?: () => void;
  selectedPokemonId?: number; // 포켓몬 도감에서 현재 선택된 포켓몬 ID
}

/**
 * 공통 하단 레이아웃
 * - 포켓몬도감 버튼과 십자 버튼 포함
 * - Container 내부에서 사용
 */
export function PageLayout({
  children,
  onUp,
  onDown,
  onLeft,
  onRight,
  selectedPokemonId
}: PageLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isMyPokedex = pathname === "/my-pokedex";

  const handleButtonClick = () => {
    if (isMyPokedex && selectedPokemonId) {
      // 포켓몬 도감 페이지에서는 선택된 포켓몬 상세로 이동
      router.push(`/my-pokedex/${selectedPokemonId}`);
    } else {
      // 다른 페이지에서는 포켓몬 도감으로 이동
      router.push("/my-pokedex");
    }
  };

  const buttonLabel = isMyPokedex ? "자세히 보기" : "포켓몬도감";

  return (
    <>
      {children}

      {/* 포켓몬도감/자세히보기 버튼 - 십자 버튼 좌측에 고정, 세로 중심 일치 */}
      <button
        onClick={handleButtonClick}
        className="absolute left-8 bg-[#90EE90] rounded flex items-center justify-center z-40"
        style={{
          width: "138px",
          height: "70px",
          bottom: "calc(2rem + (101px - 70px) / 2)" // bottom-8 + (십자버튼 높이 - 포켓몬도감 높이) / 2
        }}
      >
        <span className="text-black text-sm font-bold">{buttonLabel}</span>
      </button>

      {/* 십자 버튼 */}
      <BottomCrossButton
        onUp={onUp}
        onDown={onDown}
        onLeft={onLeft}
        onRight={onRight}
      />
    </>
  );
}
