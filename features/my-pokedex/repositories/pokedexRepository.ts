import { GetMyPokedexResponse } from "../models/res/GetMyPokedexResponse";

// Mock: 서버 응답 데이터
const MOCK_RESPONSE: GetMyPokedexResponse = {
  pokemonIds: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45,
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
