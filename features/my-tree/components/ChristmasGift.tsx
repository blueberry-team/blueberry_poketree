"use client";

import Image from "next/image";
import GiftBox from "@/assets/images/components/gift_box.png";

/**
 * ChristmasGift 컴포넌트
 * - 트리 화면 우상단에 닫혀있는 몬스터볼을 표시
 * - 당일에 크리스마스 선물 주는 동작을 추가할 예정
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
        src={GiftBox}
        alt="크리스마스 선물"
        width={96}
        height={96}
        className="object-contain"
      />
    </button>
  );
}
