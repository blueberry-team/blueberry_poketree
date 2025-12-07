"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PokedexGrid } from "@/features/my-pokedex/components/PokedexGrid";
import { getMyPokedex } from "@/features/my-pokedex/usecases/getMyPokedex";
import { useTranslation } from "@/features/shared/utils/translate/useLanguage";
import { isApiError } from "@/features/shared/utils/api/apiClient";
import { POKEMON_DATA } from "@/features/shared/data/pokemonData";

// 포켓몬 목록 페이지
function MyPokedexPageContent() {
  const { translate } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const publicId = searchParams.get('id');

  const [selectedIndex] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedIndex = localStorage.getItem("selectedIndex");
      if (savedIndex !== null) {
        return Number(savedIndex);
      }
    }
    return 0;
  });
  const [ownedPokemonIds, setOwnedPokemonIds] = useState<number[]>([]);
  const [isMaster, setIsMaster] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // publicId가 없으면 에러 페이지로 리다이렉트
    if (!publicId) {
      router.replace("/error?type=pokedex");
      return;
    }

    const fetchPokemons = async () => {
      try {
        const res = await getMyPokedex({ publicId });
        const { pokemon_list, nickname, isMaster } = res.data;

        setOwnedPokemonIds(pokemon_list ?? []);
        setUserName(nickname);
        // 문자열/불리언 모두 대응 (타입 단언으로 비교)
        const isMasterStr = isMaster as unknown as string;
        setIsMaster(isMasterStr === "true" || isMasterStr === "1");
      } catch (err) {
        // 에러 발생 시 에러 페이지로 리다이렉트 (에러 메시지 전달 시도)
        if (isApiError(err) && err.message) {
          router.replace(`/error?type=load&message=${encodeURIComponent(err.message)}`);
        } else if (err instanceof Error && err.message) {
          router.replace(`/error?type=load&message=${encodeURIComponent(err.message)}`);
        } else {
          router.replace("/error?type=load");
        }
      }
    };

    fetchPokemons();
  }, [publicId, router]);

  // 획득한 포켓몬 수 계산
  const ownedCount = ownedPokemonIds.length;
  const totalCount = POKEMON_DATA.length;

  return (
    <div className="flex-1 flex flex-col bg-[#BF0120] overflow-hidden w-full max-w-full">
      {/* 헤더 영역 */}
      <div className="px-4 py-3 shrink-0 w-full">
        <div className="flex flex-col gap-2 mb-2">
          <h1 className="text-white text-xl font-bold">
            {userName} {translate("pokedex.userPokedex")}
          </h1>
          {/* 포켓몬 마스터 배지 */}
          {isMaster ? (
            <div className="flex items-center gap-2 bg-black/60 rounded-[8px] px-3 py-2 w-fit">
              <span className="shrink-0">⭐</span>
              <span className="text-white text-[12px] font-extrabold">
                {translate("pokedex.masterBadge")}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-black/60 rounded-[8px] px-3 py-2 w-fit">
              <span className="text-white text-[12px] font-extrabold">
                {translate("pokedex.ownedStatus").replace("{total}", String(totalCount)).replace("{owned}", String(ownedCount))}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 그리드 영역 - 컨테이너 높이에서 헤더(110px)와 하단여백(10px)을 뺀 높이 */}
      <div className="h-[calc(100vh-120px)] md:h-[660px] overflow-hidden w-full max-w-full">
        <PokedexGrid ownedPokemonIds={ownedPokemonIds} selectedIndex={selectedIndex} />
      </div>

      {/* 하단 여백 */}
      <div className="h-[10px] shrink-0"></div>
    </div>
  );
}

export default function MyPokedexPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-[#BF0120]">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <MyPokedexPageContent />
    </Suspense>
  );
}
