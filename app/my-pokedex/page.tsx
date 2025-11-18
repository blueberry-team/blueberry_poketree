"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { BottomButtons } from "@/features/shared/components/BottomButtons/BottomButtons";

// 포켓몬 목록 페이지
export default function MyPokedexPage() {
  const pokemons = [
    { id: 1, name: "Bulbasaur" },
    { id: 2, name: "Ivysaur" },
    { id: 3, name: "Venusaur" },
    { id: 4, name: "Charmander" },
    { id: 5, name: "Charmeleon" },
    { id: 6, name: "Charizard" },
    { id: 7, name: "Squirtle" },
    { id: 8, name: "Wartortle" },
    { id: 9, name: "Blastoise" },
    { id: 10, name: "Caterpie" },
    { id: 11, name: "Metapod" },
    { id: 12, name: "Butterfree" },
    { id: 13, name: "Weedle" },
    { id: 14, name: "Kakuna" },
    { id: 15, name: "Beedrill" },
    { id: 16, name: "Pidgey" },
    { id: 17, name: "Pidgeotto" },
    { id: 18, name: "Pidgeot" },
    { id: 19, name: "Rattata" },
    { id: 20, name: "Raticate" },
    { id: 21, name: "Spearow" },
    { id: 22, name: "Fearow" },
    { id: 23, name: "Ekans" },
    { id: 24, name: "Arbok" },
    { id: 25, name: "Pikachu" },
    { id: 26, name: "Raichu" },
    { id: 27, name: "Sandshrew" },
    { id: 28, name: "Sandslash" },
    { id: 29, name: "Nidoran♀" },
    { id: 30, name: "Nidorina" },
    { id: 31, name: "Nidoqueen" },
    { id: 32, name: "Nidoran♂" },
    { id: 33, name: "Nidorino" },
    { id: 34, name: "Nidoking" },
    { id: 35, name: "Clefairy" },
    { id: 36, name: "Clefable" },
    { id: 37, name: "Vulpix" },
    { id: 38, name: "Ninetales" },
    { id: 39, name: "Jigglypuff" },
    { id: 40, name: "Wigglytuff" },
    { id: 41, name: "Zubat" },
    { id: 42, name: "Golbat" },
    { id: 43, name: "Oddish" },
    { id: 44, name: "Gloom" },
    { id: 45, name: "Vileplume" },
  ];

  const COLS = 5; // 가로 5개
  const [selectedIndex, setSelectedIndex] = useState(0);
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

  return (
    <BottomButtons
      onUp={handleUp}
      onDown={handleDown}
      onLeft={handleLeft}
      onRight={handleRight}
      selectedPokemonId={selectedPokemon?.id}
    >
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
    </BottomButtons>
  );
}
