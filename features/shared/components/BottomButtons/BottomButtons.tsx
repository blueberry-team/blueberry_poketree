"use client";

import { useRouter, usePathname } from "next/navigation";
import { CrossButton } from "./CrossButton";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";

interface BottomButtonsProps {
  onUp?: () => void;
  onDown?: () => void;
  onLeft?: () => void;
  onRight?: () => void;
  selectedPokemonId?: number; // 포켓몬 도감에서 현재 선택된 포켓몬 ID
}

/**
 * 하단 버튼 그룹
 * - 포켓몬도감 버튼과 십자 버튼 포함
 * - Container 내부에서 사용
 */
export function BottomButtons({
  onUp,
  onDown,
  onLeft,
  onRight,
  selectedPokemonId
}: BottomButtonsProps) {
  const { translate } = useTranslation();
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

  const buttonLabel = isMyPokedex ? translate("pokedex.detail") : translate("pokedex.button");

  return (
    <>
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
      <CrossButton
        onUp={onUp}
        onDown={onDown}
        onLeft={onLeft}
        onRight={onRight}
      />
    </>
  );
}
