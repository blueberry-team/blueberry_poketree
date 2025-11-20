"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { PokemonInDex } from "@/features/my-pokedex/usecases/getMyPokedex";

interface PokedexGridProps {
  pokemons: PokemonInDex[];
  selectedIndex: number;
}

export function PokedexGrid({ pokemons, selectedIndex }: PokedexGridProps) {
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
    <div className="flex flex-col px-3 py-1" style={{ height: "100%" }}>
      {/* 5x5 그리드 - 최대 5줄까지만 표시 */}
      <div
        className="overflow-y-auto overflow-x-hidden scrollbar-hide"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          columnGap: "0px",
          rowGap: "6px",
          alignContent: "start",
          // 카드 너비 기준: (컨테이너 - 패딩) / 5
          // 카드 높이: 너비 * 6/5 (aspect ratio 5:6)
          // 5줄 높이: 카드높이 * 5 (세로 간격 없음)
          height: "calc(((100vw - 24px) / 5) * (6/5) * 5)",
          maxHeight: "calc(((390px - 24px) / 5) * (6/5) * 5)", // 390px는 컨테이너 최대 너비
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE and Edge
        }}
      >
        {pokemons.map((pokemon, index) => {
          const row = Math.floor(index / 5);
          const isNotFirstRow = row > 0;

          return (
            <div
              key={pokemon.id}
              ref={index === selectedIndex ? selectedRef : null}
              className="flex items-center justify-center transition-all"
              style={{
                aspectRatio: "5 / 6",
                fontSize: "9px",
                fontWeight: "500",
                backgroundColor: index === selectedIndex ? "#90EE90" : "white",
                marginTop: isNotFirstRow ? "-1px" : "0",
              }}
            >
              <Link href={`/my-pokedex/${pokemon.id}`} className="w-full h-full flex items-center justify-center">
                #{pokemon.id}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
