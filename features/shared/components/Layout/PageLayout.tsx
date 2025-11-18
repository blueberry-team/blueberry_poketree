"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { BottomCrossButton } from "../BottomCrossButton/BottomCrossButton";

interface PageLayoutProps {
  children: ReactNode;
  onUp?: () => void;
  onDown?: () => void;
  onLeft?: () => void;
  onRight?: () => void;
}

/**
 * 공통 하단 레이아웃
 * - 포켓몬도감 버튼과 십자 버튼 포함
 * - Container 내부에서 사용
 */
export function PageLayout({ children, onUp, onDown, onLeft, onRight }: PageLayoutProps) {
  const router = useRouter();

  const handlePokedex = () => {
    router.push("/my-pokedex");
  };

  return (
    <>
      {children}

      {/* 포켓몬도감 버튼 - 십자 버튼 좌측에 고정, 세로 중심 일치 */}
      <button
        onClick={handlePokedex}
        className="absolute left-8 bg-[#90EE90] rounded flex items-center justify-center z-40"
        style={{
          width: "138px",
          height: "70px",
          bottom: "calc(2rem + (101px - 70px) / 2)" // bottom-8 + (십자버튼 높이 - 포켓몬도감 높이) / 2
        }}
      >
        <span className="text-black text-sm font-bold">포켓몬도감</span>
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
