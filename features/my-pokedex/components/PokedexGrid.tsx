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
      <h1 className="text-sm font-bold mb-1">My Pokedex</h1>

      {/* 5x5 그리드 - 최대 5줄까지만 표시 */}
      <div
        className="overflow-y-auto overflow-x-hidden"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "3px",
          alignContent: "start",
          // 카드 너비 기준: (컨테이너 - 패딩) / 5
          // 카드 높이: 너비 * 6/5 (aspect ratio 5:6)
          // 5줄 높이: 카드높이 * 5 + 갭(3px) * 4
          height: "calc(((100vw - 24px) / 5) * (6/5) * 5 + 12px)",
          maxHeight: "calc(((390px - 24px) / 5) * (6/5) * 5 + 12px)", // 390px는 컨테이너 최대 너비
        }}
      >
        {pokemons.map((pokemon, index) => (
          <div
            key={pokemon.id}
            ref={index === selectedIndex ? selectedRef : null}
            className="border rounded flex items-center justify-center transition-all"
            style={{
              aspectRatio: "5 / 6",
              fontSize: "9px",
              fontWeight: "500",
              borderColor: index === selectedIndex ? "#90EE90" : "#ccc",
              backgroundColor: index === selectedIndex ? "#90EE90" : "white",
            }}
          >
            <Link href={`/my-pokedex/${pokemon.id}`} className="w-full h-full flex items-center justify-center">
              #{pokemon.id}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
