import { logoutPost } from "../repositories/logoutPost";
import { setLoggedIn } from "../../signup-or-go/stores/authStore";

// 로그아웃 유즈케이스
export async function logout(): Promise<void> {
  // TODO: 서버 개발 후 주석 해제
  // const res = await logoutPost();

  // if (res.message == "success") {
  //     sessionStorage.removeItem('accessToken');
  //     setLoggedIn(false);
  // }
  sessionStorage.removeItem("accessToken");

  // 로그아웃 상태로 업데이트
  setLoggedIn(false);
}
