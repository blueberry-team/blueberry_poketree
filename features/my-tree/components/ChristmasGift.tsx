"use client";

import Image from "next/image";
import ChristmasEggCracked from "@/assets/images/components/christmas_egg_cracked.webp";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";

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
  const { translate } = useTranslation();
  
  const giftText = translate("tree.christmasGift");
  // 텍스트 길이에 따라 동적 폰트 크기 결정
  const fontSize = giftText.length > 25 ? "text-[6px]" : giftText.length > 20 ? "text-[7px]" : "text-[8px]";
  
  return (
    <button
      // TODO: 크리스마스 날 기능 오픈 후 주석 해제
      className="absolute top-4 right-4 z-10 cursor-pointer hover:scale-110 transition-transform"
      // className="absolute top-6 right-6 z-10 cursor-pointer"
      aria-label="크리스마스 선물"
      onClick={(e) => {
        const target = e.currentTarget;
        target.classList.add('christmas-gift-sway');
        // 애니메이션 완료 후 클래스 제거
        setTimeout(() => {
          target.classList.remove('christmas-gift-sway');
        }, 500);
      }}
    >
      <div className="relative w-[72px] h-[75px]">
        <Image
          src={ChristmasEggCracked}
          alt={giftText}
          width={72}
          height={75}
          className="object-contain absolute left-[6.5px] top-0"
        />
        <div className="absolute left-[3px] top-[47px] w-[66px] h-[24px] bg-black/60 backdrop-blur-[2px] rounded-[4px] flex items-center justify-center px-1 overflow-hidden">
          <p className={`text-white ${fontSize} font-semibold leading-[9px] text-center whitespace-wrap`}>
            {giftText}
          </p>
        </div>
      </div>
    </button>
  );
}
