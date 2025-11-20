import { GetMyPokedexResponse } from "../models/res/GetMyPokedexResponse";

// Mock: 서버 응답 데이터
const MOCK_RESPONSE: GetMyPokedexResponse = {
  pokemonIds: [
    2, 3
  ],
};

export const pokedexRepository = {
  // 보유한 포켓몬 ID 리스트 조회
  getMyPokedex: async (): Promise<GetMyPokedexResponse> => {
    // TODO: API 호출로 대체
    // const response = await fetch('/api/pokedex/owned');
    // const data: GetMyPokedexResponse = await response.json();
    // return data;
    return MOCK_RESPONSE;
  },
};
