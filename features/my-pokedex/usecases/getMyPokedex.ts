import { GetMyPokedexRequest } from "../models/req/GetMyPokedexRequest";
import { getMyPokedexGet } from "../repositories/pokedexRepository";
import { PokemonInfo, POKEMON_DATA } from "@/features/my-pokedex/models/data/pokemonData";

// 포켓몬 도감에서 표시할 포켓몬 (보유 여부 포함)
export interface PokemonInDex extends PokemonInfo {
  isOwned: boolean;
}

export async function getMyPokedex(
  req: GetMyPokedexRequest
): Promise<PokemonInDex[]> {
  // validation
  if (!req.publicId) {
    throw new Error("publicId is required");
  }

  // 1. 서버에서 보유한 포켓몬 ID 리스트 가져오기
  const response = await getMyPokedexGet(req);
  const ownedIdSet = new Set(response.data.pokemon_list);

  // 2. 클라이언트 데이터와 합쳐서 도감 정보 생성
  return POKEMON_DATA.map((pokemonInfo) => ({
    ...pokemonInfo,
    isOwned: ownedIdSet.has(pokemonInfo.id),
  }));
}
