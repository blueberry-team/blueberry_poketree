import { Pokemon } from "../models/Pokemon";

const MOCK_POKEMONS: Pokemon[] = [
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

export const pokedexRepository = {
  getMyPokedex: async (): Promise<Pokemon[]> => {
    // API 호출로 대체
    return MOCK_POKEMONS;
  },

  getPokemonDetailById: async (id: number): Promise<Pokemon | undefined> => {
    // API 호출로 대체
    return MOCK_POKEMONS.find((pokemon) => pokemon.id === id);
  },
};
