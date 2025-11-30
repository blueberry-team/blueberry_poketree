import { apiClient, type ApiResponse } from "../utils/api/apiClient";

/**
 * 로그아웃을 수행합니다
 * @param req - user_id를 포함한 요청 데이터
 * @returns 로그아웃 결과
 */
export async function logoutPost(): Promise<ApiResponse<null>> {
  return apiClient.delete<ApiResponse<null>>(
    `/auth/logout`,
    false // 토큰 필요
  );
}
