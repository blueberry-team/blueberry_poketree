import type { ApiResponse } from "@/features/shared/utils/api/apiClient";

// 서버에서 받는 응답: 보유한 포켓몬 ID 리스트
export interface GetMyPokedexData {
  pokemon_list: number[];
}

export type GetMyPokedexResponse = ApiResponse<GetMyPokedexData>;
