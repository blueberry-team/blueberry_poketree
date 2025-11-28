import { GetUserTreeRequest } from "../models/req/GetUserTreeRequest";
import { GetUserTreeResponse } from "../models/res/GetUserTreeResponse";
import { getUserTreeGet } from "../repositories/treeRepository";

/**
 * 유저 트리 정보를 조회합니다
 * @param req - userId를 포함한 요청
 * @returns 트리 데이터 (닉네임, 본인여부, 편지 목록, 포켓몬 목록)
 */
export async function getUserTree(req: GetUserTreeRequest): Promise<GetUserTreeResponse> {
  // validation
  if (!req.userId) {
    throw new Error("User ID is required");
  }

  // API request
  const res = await getUserTreeGet(req);

  return res;
}

