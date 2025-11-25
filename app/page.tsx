"use client";

import { Tree } from "@/features/my-tree/components/Tree";
import { ALL_POKEMON_IMAGES } from "@/features/shared/data/pokemonData";
import { ChristmasCountdown } from "@/features/landing/components/ChristmasCountdown/ChristmasCountdown";
import { LandingFooter } from "@/features/landing/components/LandingFooter/LandingFooter";

// 랜딩 페이지
export default function LandingPage() {
  const currentPage = 0;
  const displayedPokemons = ALL_POKEMON_IMAGES.slice(0, 6);
  const totalMessageCount = 15;

  // 정적 화면이므로 인터렉션 없음
  const handleLetterClick = () => { };

  return (
    <div className="flex-1 flex flex-col">
      <div className="px-4 py-3 shrink-0">
        {/* 헤더 영역 */}
        <ChristmasCountdown />
      </div>

      {/* 바디 영역 */}
      <Tree
        obtainedPokemons={displayedPokemons}
        totalMessageCount={totalMessageCount}
        currentPage={currentPage}
        onLetterClick={handleLetterClick}
      />

      {/* 푸터 영역 */}
      <LandingFooter />

    </div>
  );
}
