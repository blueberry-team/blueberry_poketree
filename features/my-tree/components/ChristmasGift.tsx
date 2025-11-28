"use client";

import Image from "next/image";
import MonsterBallClose from "@/assets/images/components/monster_ball_close.png";

/**
 * ChristmasGift 컴포넌트
 * - 트리 화면 우상단에 닫혀있는 몬스터볼을 표시
 * - 추후 크리스마스 선물 주는 동작을 추가할 예정
 */

interface ChristmasGiftProps {
  onClick?: () => void;
}

export function ChristmasGift({ onClick }: ChristmasGiftProps) {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 right-4 z-10 cursor-pointer hover:scale-110 transition-transform"
      aria-label="크리스마스 선물"
    >
      <Image
        src={MonsterBallClose}
        alt="크리스마스 선물"
        width={64}
        height={64}
        className="object-contain"
      />
    </button>
  );
}
