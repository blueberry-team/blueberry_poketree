import { logoutPost } from "../repositories/logoutPost";

// 로그아웃 유즈케이스
export async function logout(): Promise<void> {
    // TODO: 서버 개발 후 주석 해제
    // const res = await logoutPost();

    // if (res.message == "success") {
    //     sessionStorage.removeItem('accessToken');
    // }
    sessionStorage.removeItem('accessToken');
}
