import { signal } from "@preact/signals-react";

// 로그인 상태를 관리하는 signal
export const isLoggedIn = signal<boolean>(false);
export const userId = signal<string>("");

// my-tree 페이지에서 현재 트리의 주인 여부를 관리하는 signal
// null: my-tree 페이지가 아니거나 확인 중
// true: 주인
// false: 방문자
export const isTreeOwner = signal<boolean | null>(null);

// 초기화 함수 (클라이언트 사이드에서만 실행)
export function initAuthState() {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("accessToken");
    const storedUserId = sessionStorage.getItem("userId");
    isLoggedIn.value = !!token;
    userId.value = storedUserId || "";
  }
}

// 로그인 상태 설정
export function setLoggedIn(value: boolean) {
  isLoggedIn.value = value;
}

// 유저 ID 설정
export function setUserId(value: string) {
  userId.value = value;
  if (typeof window !== "undefined") {
    if (value) {
      sessionStorage.setItem("userId", value);
    } else {
      sessionStorage.removeItem("userId");
    }
  }
}

// 인증 상태 초기화 함수 (AUTH005 등으로 리다이렉트된 경우 사용)
export function resetAuthState() {
  isLoggedIn.value = false;
  userId.value = "";
  isTreeOwner.value = null;
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userId");
  }
}

// 트리 주인 여부 설정
export function setTreeOwner(isOwner: boolean | null) {
  isTreeOwner.value = isOwner;
}
