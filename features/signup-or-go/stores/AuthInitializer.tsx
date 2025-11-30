"use client";

import { useEffect } from "react";
import { initAuthState } from "./authStore";

/**
 * 앱 초기화 시 인증 상태를 복원하는 컴포넌트
 */
export function AuthInitializer() {
  useEffect(() => {
    initAuthState();
  }, []);

  return null;
}

