// 포켓몬 목록 페이지

import Link from 'next/link';

export default function MyPokedexPage() {
  const pokemons = [
    { id: 1, name: 'Bulbasaur' },
    { id: 25, name: 'Pikachu' },
    { id: 150, name: 'Mewtwo' },
  ];

  return (
    <div>
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
    </div>
  );
}
