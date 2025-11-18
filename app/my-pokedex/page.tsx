"use client";

import { useState, useEffect } from "react";
import { BottomButtons } from "@/features/shared/components/BottomButtons/BottomButtons";
import { PokedexGrid } from "@/features/my-pokedex/components/PokedexGrid";
import { getMyPokedex } from "@/features/my-pokedex/usecases/getMyPokedex";
import { Pokemon } from "@/features/my-pokedex/models/Pokemon";

// 포켓몬 목록 페이지
export default function MyPokedexPage() {
  const COLS = 5; // 가로 5개
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

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

  return (
    <>
      <PokedexGrid pokemons={pokemons} selectedIndex={selectedIndex} />
      <BottomButtons
        onUp={handleUp}
        onDown={handleDown}
        onLeft={handleLeft}
        onRight={handleRight}
        selectedPokemonId={selectedPokemon?.id}
      />
    </>
  );
}
