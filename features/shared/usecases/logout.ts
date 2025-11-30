import { logoutPost } from "../repositories/logoutPost";
import {
  setLoggedIn,
  setUserId,
} from "../../signup-or-go/stores/authStore";
import { ApiResponse } from "../utils/api/apiClient";

/**
 * 로그아웃을 수행합니다
 * authStore에서 user_id를 가져와 사용합니다
 * @returns void
 */
export async function logout(): Promise<ApiResponse<null>> {
  // API request
  const res = await logoutPost();

  if (res.message === "success") {
    sessionStorage.removeItem("accessToken");
    setLoggedIn(false);
    setUserId(""); // userId도 초기화
    return res
  } else {
    console.log(res.message);
    throw new Error(res.message);
  }
}
