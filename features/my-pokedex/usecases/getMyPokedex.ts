import { pokedexRepository } from "../repositories/pokedexRepository";
import { Pokemon } from "../models/Pokemon";

export const getMyPokedex = async (): Promise<Pokemon[]> => {
  return await pokedexRepository.getMyPokedex();
};
