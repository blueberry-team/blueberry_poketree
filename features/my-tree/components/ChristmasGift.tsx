"use client";

import Image from "next/image";
import ChristmasEggCracked from "@/assets/images/components/christmas_egg_cracked.webp";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import { useCallback, useState } from "react";
import { ChristmasModal } from "@/features/shared/components/Modal/ChristmasModal";
import { getPokemonImage } from "@/features/shared/data/pokemonData";

/**
 * ChristmasGift 컴포넌트
 * 
 * 3가지 상태:
 * 1. LandingTree: hasMetamon=false, onGetXmasPokemon=undefined
 *    → 알 이미지 + 애니메이션, 클릭 불가
 * 
 * 2. Tree (주인, 메타몽 없음): hasMetamon=false, onGetXmasPokemon=존재
 *    → 알 이미지 + 애니메이션, 클릭 시 포켓몬 획득
 * 
 * 3. Tree (주인, 메타몽 있음): hasMetamon=true
 *    → 메타몽 이미지만, 애니메이션 없음
 */
interface ChristmasGiftProps {
  hasMetamon: boolean;
  onGetXmasPokemon?: () => Promise<void>;
  onComplete?: () => void;
}

export function ChristmasGift({ hasMetamon, onGetXmasPokemon, onComplete }: ChristmasGiftProps) {
  const { translate } = useTranslation();
  const [isXmasPokemonModalOpen, setIsXmasPokemonModalOpen] = useState(false);
  const giftText = translate("tree.christmasGift");
  
  // 텍스트 길이에 따라 동적 폰트 크기 결정
  const fontSize = giftText.length > 25 ? "text-[6px]" : giftText.length > 20 ? "text-[7px]" : "text-[8px]";
  
  // 주인이면서 메타몽을 아직 받지 않은 경우만 포켓몬 획득 가능
  const isClickable = !hasMetamon && onGetXmasPokemon !== undefined;
  
  const handleClick = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    // 메타몽이면 아무것도 안 함
    if (hasMetamon) return;

    // 애니메이션은 알 상태일 때 항상 실행
    const target = e.currentTarget;
    target.classList.add('christmas-gift-sway');
    
    // 애니메이션 완료 후 클래스 제거
    setTimeout(() => {
      target.classList.remove('christmas-gift-sway');
    }, 500);

    // 주인일 때만 포켓몬 획득 로직 실행
    if (onGetXmasPokemon) {
      try {
        await onGetXmasPokemon();
        setIsXmasPokemonModalOpen(true);
      } catch {
        return;
      }
    }
  }, [hasMetamon, onGetXmasPokemon]);

  const handleXmasPokemonModalComplete = useCallback(() => {
    onComplete?.();
    setIsXmasPokemonModalOpen(false);
  }, [onComplete]);

  return (
    <div className="relative">
      <button
        className={`absolute top-5 right-6 z-10 ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
        aria-label="크리스마스 선물"
        onClick={handleClick}
      >
        <div className="relative w-[72px] h-[75px]">
          {hasMetamon ? (
            // 케이스 3: 메타몽 이미지만 표시 (포켓몬 점프 애니메이션)
            <div
            className="cursor-pointer"
            onClick={(e) => {
              const target = e.currentTarget;
              target.classList.add('pokemon-jump');
              // 애니메이션 완료 후 클래스 제거
              setTimeout(() => {
                target.classList.remove('pokemon-jump');
              }, 400);
            }}
          >
            <Image
              src={getPokemonImage(81)}
              alt={giftText}
              width={72}
              height={75}
              className="object-contain absolute left-[6.5px] top-0"
            />
          </div>

            // <Image
            //   src={getPokemonImage(82)}
            //   alt={giftText}
            //   width={72}
            //   height={75}
            //   className="object-contain absolute left-[6.5px] top-0"
            // />
          ) : (
            // 케이스 1, 2: 깨진 알 이미지 + 애니메이션
            <div>
              <Image
                src={ChristmasEggCracked}
                alt={giftText}
                width={72}
                height={75}
                className="object-contain absolute left-[6.5px] top-0 hover:scale-110 transition-transform"
              />
              <div className="absolute left-[3px] top-[47px] w-[66px] h-[24px] bg-black/60 backdrop-blur-[2px] rounded-[4px] flex items-center justify-center px-1 overflow-hidden">
                <p className={`text-white ${fontSize} font-semibold leading-[9px] text-center whitespace-wrap`}>
                  {giftText}
                </p>
              </div>
            </div>
          )}
        </div>
      </button>
      
      <ChristmasModal
        isOpen={isXmasPokemonModalOpen}
        onComplete={handleXmasPokemonModalComplete}
      />
    </div>
  );
}
