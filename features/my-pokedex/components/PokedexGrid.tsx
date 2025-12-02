"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { POKEMON_DATA } from "@/features/shared/data/pokemonData";

interface PokedexGridProps {
  ownedPokemonIds: number[]; // 보유한 포켓몬 ID 리스트
  selectedIndex: number;
}

export function PokedexGrid({ ownedPokemonIds, selectedIndex }: PokedexGridProps) {
  const selectedRef = useRef<HTMLDivElement>(null);

  // 선택된 항목으로 스크롤
  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  return (
    <div className="flex flex-col" style={{ height: "100%" }}>
      {/* 4열 그리드 - 남은 공간을 채움 */}
      <div
        className="overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none] bg-[#F7F7F7] px-5 py-8 border-b-2 border-black h-full"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          columnGap: "0px",
          rowGap: "6px",
          alignContent: "start",
        }}
      >
        {POKEMON_DATA.map((pokemon, index) => {
          const row = Math.floor(index / 4);
          const isNotFirstRow = row > 0;
          const isOwned = ownedPokemonIds.includes(pokemon.id);

          return (
            <div
              key={pokemon.id}
              className="flex flex-col transition-all "
              style={{
                aspectRatio: "5 / 6",
                marginTop: isNotFirstRow ? "10px" : "0",
              }}
            >
              {/* 포켓몬 이미지 */}
              <div className="flex-1 flex items-center justify-center pointer-events-none relative">
                <Image
                  src={isOwned ? pokemon.imageActive : pokemon.imageInactive}
                  alt={isOwned ? pokemon.id.toString() : "???"}
                  className="object-contain"
                  fill
                  sizes="(max-width: 410px) 25vw, 97px"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
