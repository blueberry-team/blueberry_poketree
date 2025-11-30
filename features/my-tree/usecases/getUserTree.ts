import { isLoggedIn, userId } from "@/features/signup-or-go/stores/authStore";
import { GetUserTreeRequest } from "../models/req/GetUserTreeRequest";
import { GetUserTreeResponse } from "../models/res/GetUserTreeResponse";
import { getUserTreeWithTokenGet, getUserTreeWithoutTokenGet } from "../repositories/treeRepository";

/**
 * 유저 트리 정보를 조회합니다
 * @param req - user_id를 포함한 요청
 * @returns 트리 데이터 (닉네임, 본인여부, 편지 목록, 포켓몬 목록)
 */
export async function getUserTree(req: GetUserTreeRequest): Promise<GetUserTreeResponse> {
  // validation
  if (!req.user_id) {
    throw new Error("User ID is required");
  }

  // API request
  if (isLoggedIn.value && userId.value === req.user_id) {
    const res = await getUserTreeWithTokenGet(req);
    return res;
  } else {
    const res = await getUserTreeWithoutTokenGet(req);
    return res;
  }
}

