import { isLoggedIn } from "./authStore";

// signal을 직접 사용하기 위한 커스텀 훅
// 컴포넌트에서 isLoggedIn.value로 접근하면 자동으로 리렌더링됨
export function useAuth() {
  return {
    isLoggedIn,
  };
}

