import { apiClient } from "@/features/shared/utils/api/apiClient";
import type { GetMyPokedexRequest } from "../models/req/GetMyPokedexRequest";
import type { GetMyPokedexResponse } from "../models/res/GetMyPokedexResponse";

// 보유한 포켓몬 ID 리스트 조회
export async function getMyPokedexGet(req: GetMyPokedexRequest): Promise<GetMyPokedexResponse> {
  return apiClient.get<GetMyPokedexResponse>(
    `/pokemon/get-my-pokemon?userId=${req.publicId}`,
    true
  );
}
