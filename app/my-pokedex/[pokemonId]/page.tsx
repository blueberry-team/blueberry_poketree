"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { getMyPokedex, PokemonInDex } from "@/features/my-pokedex/usecases/getMyPokedex";

interface PokemonDetailPageProps {
  params: Promise<{ pokemonId: string }>;
}

export default function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  const [pokemon, setPokemon] = useState<PokemonInDex | null>(null);

  // URL params에서 포켓몬 ID를 추출하여 데이터를 가져오는 함수 (useCallback으로 params 변경 시에만 재생성)
  const fetchPokemonData = useCallback(async () => {
    const { pokemonId } = await params;

    // 포켓몬 데이터 가져오기
    const pokemons = await getMyPokedex();
    const found = pokemons.find((p) => p.id === Number(pokemonId));
    setPokemon(found || null);
  }, [params]);

  useEffect(() => {
    fetchPokemonData();
  }, [fetchPokemonData]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  const isOwned = pokemon.isOwned;

  return (
    <div className="flex-1 flex flex-col items-center justify-start px-6 pt-12">
      {/* 포켓몬 카드 - 그리드 디자인 그대로 */}
      <div
        className="flex flex-col transition-all mb-4"
        style={{
          width: "250px",
          aspectRatio: "5 / 6",
          fontSize: "9px",
          fontWeight: "500",
          backgroundColor: "white",
          opacity: isOwned ? 1 : 0.4,
        }}
      >
        {/* NO.001 형식의 이름표 */}
        <div className="w-full flex items-center justify-center pt-2 pointer-events-none">
          <span className="text-black text-2xl font-bold">
            No. {String(pokemon.id).padStart(3, "0")}
          </span>
        </div>
        {/* 포켓몬 이미지 */}
        <div className="flex-1 flex items-center justify-center pointer-events-none relative">
          <Image
            src={isOwned ? pokemon.imageActive : pokemon.imageInactive}
            alt={isOwned ? pokemon.name : "???"}
            className="object-contain"
            fill
            sizes="300px"
          />
        </div>
      </div>

      {/* 포켓몬 정보 영역 */}
      <div className="px-6 pb-6 flex flex-col gap-2">
        <div className="flex items-center justify-start gap-3 px-2">
          {/* NO. xxx */}
          <div className="text-black text-lg font-bold">
            No. {String(pokemon.id).padStart(3, "0")}
          </div>

          {/* 이름 */}
          <div className="text-black text-lg font-bold">
            {isOwned ? pokemon.name : "???"}
          </div>
        </div>

        {/* 설명 */}
        <div className="text-black text-sm">
          {isOwned ? pokemon.description : "???"}
        </div>
      </div>
    </div>
  );
}
