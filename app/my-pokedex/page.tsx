"use client";

import { useState, useEffect } from "react";
import { BottomButtons } from "@/features/shared/components/BottomButtons/BottomButtons";
import { PokedexGrid } from "@/features/my-pokedex/components/PokedexGrid";
import { getMyPokedex, PokemonInDex } from "@/features/my-pokedex/usecases/getMyPokedex";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";

// 포켓몬 목록 페이지
export default function MyPokedexPage() {
  const { translate } = useTranslation();

  const [selectedIndex, setSelectedIndex] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedIndex = localStorage.getItem("selectedIndex");
      if (savedIndex !== null) {
        return Number(savedIndex);
      }
    }
    return 0;
  });
  const [pokemons, setPokemons] = useState<PokemonInDex[]>([]);
  const [isMaster, setIsMaster] = useState(false);  //  포켓몬 마스터 여부

  useEffect(() => {
    const fetchPokemons = async () => {
      const data = await getMyPokedex();
      setPokemons(data);

      // 🔥 여기서 마스터 여부 체크
      const ownedCount = data.filter((p) => p.isOwned).length;
      const totalCount = data.length;
      setIsMaster(ownedCount === totalCount);
    };

    fetchPokemons();
  }, []);

  // 사용자 이름 (하드코딩)
  const userName = "상화";

  // 획득한 포켓몬 수 계산
  const ownedCount = pokemons.filter((p) => p.isOwned).length;
  const totalCount = pokemons.length;

  return (
    <div className="flex-1 flex flex-col bg-[#BF0120] overflow-hidden">
      {/* 헤더 영역 */}
      <div className="px-4 py-3 shrink-0">
        <div className="flex flex-col gap-2 mb-2">
          <h1 className="text-white text-xl font-bold">
            {userName} {translate("pokedex.userPokedex")}
          </h1>
          {/* 포켓몬 마스터 배지 */}
          {isMaster ? (
            <button className="flex items-center gap-1 px-3 py-2 bg-black/60 text-white text-sm font-bold w-fit rounded-lg">
              <span>⭐</span>
              <span>{translate("pokedex.masterBadge")}</span>
            </button>
          ) : (
            <button className="flex items-center gap-1 px-3 py-2 bg-black/60 text-white text-sm font-bold w-fit rounded-lg">
              <span>{translate("pokedex.ownedStatus").replace("{total}", String(totalCount)).replace("{owned}", String(ownedCount))}</span>
            </button>
          )}
        </div>
      </div>

      {/* 그리드 영역 - 컨테이너 높이에서 헤더(110px)와 하단여백(10px)을 뺀 높이 */}
      <div className="h-[calc(100vh-120px)] md:h-[660px] overflow-hidden">
        <PokedexGrid pokemons={pokemons} selectedIndex={selectedIndex} />
      </div>

      {/* 하단 여백 */}
      <div className="h-[10px] shrink-0"></div>
    </div>
  );
}
