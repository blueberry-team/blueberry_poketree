import { apiClient } from '@/features/shared/utils/api/apiClient';
import type { GetUserTreeRequest } from '../models/req/GetUserTreeRequest';
import type { GetUserTreeResponse } from '../models/res/GetUserTreeResponse';

/**
 * 토큰 요청을 보낼지 여부를 분리하였습니다.
 * 토큰이 있는 경우는 본인의 트리에 접근하는 경우
 * 토큰이 없는 경우는 타인의 트리에 접근하는 경우입니다.
 */

/**
 * 토큰과 함께 유저의 트리 정보를 가져옵니다
 * @param req - user_id를 포함한 요청 데이터
 * @returns 트리 정보 (닉네임, 본인여부, 편지 목록, 포켓몬 목록)
 */
export async function getUserTreeWithTokenGet(req: GetUserTreeRequest): Promise<GetUserTreeResponse> {
  // TODO: 서버 구현 후 주석 해제
  return apiClient.get<GetUserTreeResponse>(
    `/tree/get-my-tree?userId=${req.user_id}`,
    true
  );
}

/**
 * 토큰이 없이 유저의 트리 정보를 가져옵니다
 * @param req - user_id를 포함한 요청 데이터
 * @returns 트리 정보 (닉네임, 본인여부, 편지 목록, 포켓몬 목록)
 */
export async function getUserTreeWithoutTokenGet(req: GetUserTreeRequest): Promise<GetUserTreeResponse> {
    // TODO: 서버 구현 후 주석 해제
    return apiClient.get<GetUserTreeResponse>(
      `/tree/get-my-tree?userId=${req.user_id}`,
      false
    );
  }
