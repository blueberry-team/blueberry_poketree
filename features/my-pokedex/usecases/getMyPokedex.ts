import { GetMyPokedexRequest } from "../models/req/GetMyPokedexRequest";
import { GetMyPokedexResponse } from "../models/res/GetMyPokedexResponse";
import { getMyPokedexGet } from "../repositories/pokedexRepository";

// API 응답 그대로 반환하는 usecase
export async function getMyPokedex(
  req: GetMyPokedexRequest
): Promise<GetMyPokedexResponse> {
  // validation
  if (!req.publicId) {
    throw new Error("publicId is required");
  }

  // 서버에서 보유한 포켓몬 ID 리스트, 닉네임, 마스터 여부 가져오기
  const res = await getMyPokedexGet(req);

  return res;
}
