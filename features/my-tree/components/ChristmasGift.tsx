"use client";

import Image from "next/image";
import GiftBox from "@/assets/images/components/gift_box.png";

/**
 * ChristmasGift 컴포넌트
 * - 트리 화면 우상단에 닫혀있는 몬스터볼을 표시
 * - 당일에 크리스마스 선물 주는 동작을 추가할 예정
 */

// TODO: 크리스마스 날 기능 오픈
// interface ChristmasGiftProps {
//   onClick?: () => void;
// }

export function ChristmasGift() {
  return (
    <button
      // TODO: 크리스마스 날 기능 오픈 후 주석 해제
      // className="absolute top-4 right-4 z-10 cursor-pointer hover:scale-110 transition-transform"
      className="absolute top-4 right-4 z-10"
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
