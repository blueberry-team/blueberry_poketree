"use client";

import Link from "next/link";
import { PageLayout } from "@/features/shared/components/Layout/PageLayout";

// 포켓몬 목록 페이지
export default function MyPokedexPage() {
  const pokemons = [
    { id: 1, name: "Bulbasaur" },
    { id: 25, name: "Pikachu" },
    { id: 150, name: "Mewtwo" },
  ];

  const handleUp = () => {
    console.log("이전 포켓몬");
  };

  const handleDown = () => {
    console.log("다음 포켓몬");
  };

  const handleLeft = () => {
    console.log("필터 변경");
  };

  const handleRight = () => {
    console.log("정렬 변경");
  };

  return (
    <PageLayout
      onUp={handleUp}
      onDown={handleDown}
      onLeft={handleLeft}
      onRight={handleRight}
    >
      <h1>My Pokedex</h1>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <Link href={`/my-pokedex/${pokemon.id}`}>
              {pokemon.name} (#{pokemon.id})
            </Link>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}
