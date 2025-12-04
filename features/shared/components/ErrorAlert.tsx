"use client";

import { ErrorCode, ERROR_MESSAGE_MAP } from "@/features/shared/types/errorTypes";

/**
 * ErrorAlert - 서버 에러를 alert로 표시
 * @param errorCode - 에러 코드
 * @param customMessage - 커스텀 메시지 (선택사항)
 */
export const showErrorAlert = (errorCode: ErrorCode, customMessage?: string) => {
  const message = customMessage || ERROR_MESSAGE_MAP[errorCode];
  alert(message);
};

/**
 * ErrorAlert 컴포넌트
 * 직접 사용하기보다는 showErrorAlert 함수를 사용하는 것을 권장
 */
interface ErrorAlertProps {
  errorCode: ErrorCode;
  customMessage?: string;
  onConfirm?: () => void;
}

export default function ErrorAlert({
  errorCode,
  customMessage,
  onConfirm,
}: ErrorAlertProps) {
  const message = customMessage || ERROR_MESSAGE_MAP[errorCode];

  // 자동으로 alert 표시
  if (typeof window !== "undefined") {
    alert(message);
    onConfirm?.();
  }

  return null;
}
