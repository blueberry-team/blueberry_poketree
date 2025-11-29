import { signal } from "@preact/signals-react";

// 로그인 상태를 관리하는 signal
export const isLoggedIn = signal<boolean>(false);
export const userId = signal<string>('');

// 초기화 함수 (클라이언트 사이드에서만 실행)
export function initAuthState() {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("accessToken");
    isLoggedIn.value = !!token;
    userId.value = ''
  }
}

// 로그인 상태 설정
export function setLoggedIn(value: boolean) {
  isLoggedIn.value = value;
}

// 유저 ID 설정
export function setUserId(value: string) {
  userId.value = value;
}
