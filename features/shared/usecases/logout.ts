import { logoutPost } from "../repositories/logoutPost";
import { resetAuthState } from "../../signup-or-go/stores/authStore";
import { ApiResponse, isApiError } from "../utils/api/apiClient";
import { extractErrorCode } from "../utils/errorHandler";
import { ErrorCode } from "../types/errorTypes";

/**
 * 로그아웃을 수행합니다
 * authStore에서 user_id를 가져와 사용합니다
 * @returns void
 */
export async function logout(): Promise<ApiResponse<null>> {
  try {
    // API request
    const res = await logoutPost();

    if (res.message === "success") {
      resetAuthState();
      return res;
    } else {
      throw new Error(res.message);
    }
  } catch (err) {
    // AUTH005 에러인 경우에도 상태 초기화 (토큰 만료 후 로그아웃 시도)
    if (isApiError(err)) {
      const errorCode = extractErrorCode(err);
      if (errorCode === ErrorCode.AUTH_005) {
        resetAuthState();
      }
    }
    throw err;
  }
}
