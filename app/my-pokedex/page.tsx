"use client";

import { useState, useEffect } from "react";
import { BottomButtons } from "@/features/shared/components/BottomButtons/BottomButtons";
import { PokedexGrid } from "@/features/my-pokedex/components/PokedexGrid";
import { getMyPokedex, PokemonInDex } from "@/features/my-pokedex/usecases/getMyPokedex";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";

// 포켓몬 목록 페이지
export default function MyPokedexPage() {
  const { translate } = useTranslation();
  const COLS = 5; // 가로 5개
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pokemons, setPokemons] = useState<PokemonInDex[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const data = await getMyPokedex();
      setPokemons(data);
    };
    fetchPokemons();
  }, []);

  const handleUp = () => {
    // 위로 이동 (같은 열의 이전 행)
    setSelectedIndex((prev) => {
      const newIndex = prev - COLS;
      return newIndex >= 0 ? newIndex : prev;
    });
  };

  const handleDown = () => {
    // 아래로 이동 (같은 열의 다음 행)
    setSelectedIndex((prev) => {
      const newIndex = prev + COLS;
      return newIndex < pokemons.length ? newIndex : prev;
    });
  };

  const handleLeft = () => {
    // 왼쪽으로 이동
    setSelectedIndex((prev) => {
      const col = prev % COLS;
      // 같은 행에서 왼쪽으로
      return col > 0 ? prev - 1 : prev;
    });
  };

  const handleRight = () => {
    // 오른쪽으로 이동
    setSelectedIndex((prev) => {
      const col = prev % COLS;
      const newIndex = prev + 1;
      // 같은 행에서 오른쪽으로, 다음 행의 첫 번째가 아닌지 확인
      return col < COLS - 1 && newIndex < pokemons.length ? newIndex : prev;
    });
  };

  const selectedPokemon = pokemons[selectedIndex];

  // 사용자 이름 (하드코딩)
  const userName = "상화";

  return (
    <div className="flex-1 flex flex-col">
      {/* 헤더 영역 */}
      <div className="px-4 py-3 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-black text-xl font-bold">
            {userName} {translate("pokedex.userPokedex")}
          </h1>
          {/* 포켓몬 마스터 배지 */}
          <button className="flex items-center gap-1 px-3 py-2 bg-black text-white text-sm font-bold" style={{ borderRadius: "8px" }}>
            <span>⭐</span>
            <span>{translate("pokedex.masterBadge")}</span>
          </button>
        </div>
      </div>

      {/* 그리드 영역 */}
      <div className="flex-1">
        <PokedexGrid pokemons={pokemons} selectedIndex={selectedIndex} />
      </div>

      {/* 버튼 영역 */}
      <BottomButtons
        onUp={handleUp}
        onDown={handleDown}
        onLeft={handleLeft}
        onRight={handleRight}
        selectedPokemonId={selectedPokemon?.id}
      />
    </div>
  );
}
