import {
  ErrorCode,
  ERROR_HANDLING_MAP,
  ERROR_MESSAGE_MAP,
} from "@/features/shared/types/errorTypes";

/**
 * 서버 에러를 처리하는 유틸리티 함수
 * 에러 코드에 따라 alert, modal, redirect 중 적절한 방식으로 처리
 */

/**
 * 에러 핸들러 옵션
 */
interface ErrorHandlerOptions {
  customMessage?: string;
  redirectUrl?: string;
  onModalClose?: () => void;
}

/**
 * 에러를 처리하고 처리 타입을 반환
 * @param errorCode - 에러 코드
 * @param options - 에러 핸들러 옵션
 * @returns 에러 처리 타입 (alert, modal, redirect)
 */
export const handleError = (
  errorCode: ErrorCode,
  options: ErrorHandlerOptions = {}
): "alert" | "modal" | "redirect" => {
  const { customMessage, redirectUrl = "/" } = options;
  const handlingType = ERROR_HANDLING_MAP[errorCode];
  const message = customMessage || ERROR_MESSAGE_MAP[errorCode];

  switch (handlingType) {
    case "alert":
      if (typeof window !== "undefined") {
        alert(message);
      }
      return "alert";

    case "modal":
      // modal은 컴포넌트에서 상태 관리로 처리해야 함
      return "modal";

    case "redirect":
      if (typeof window !== "undefined") {
        window.location.href = redirectUrl;
      }
      return "redirect";

    default:
      if (typeof window !== "undefined") {
        alert(message);
      }
      return "alert";
  }
};

/**
 * 에러 코드가 특정 처리 타입인지 확인
 */
export const isErrorType = (
  errorCode: ErrorCode,
  type: "alert" | "modal" | "redirect"
): boolean => {
  return ERROR_HANDLING_MAP[errorCode] === type;
};

/**
 * alert 타입 에러만 처리
 */
export const handleAlertError = (
  errorCode: ErrorCode,
  customMessage?: string
): void => {
  if (isErrorType(errorCode, "alert")) {
    const message = customMessage || ERROR_MESSAGE_MAP[errorCode];
    if (typeof window !== "undefined") {
      alert(message);
    }
  }
};

/**
 * redirect 타입 에러만 처리
 */
export const handleRedirectError = (
  errorCode: ErrorCode,
  redirectUrl: string = "/"
): void => {
  if (isErrorType(errorCode, "redirect")) {
    if (typeof window !== "undefined") {
      window.location.href = redirectUrl;
    }
  }
};

/**
 * 에러 응답에서 에러 코드 추출
 * 서버 응답에서 error_code 또는 code 필드를 찾아 반환
 */
export const extractErrorCode = (error: unknown): ErrorCode | null => {
  if (typeof error === "object" && error !== null) {
    const errorObj = error as Record<string, unknown>;
    const code = errorObj.error_code || errorObj.code || errorObj.errorCode;
    if (typeof code === "string" && isValidErrorCode(code)) {
      return code as ErrorCode;
    }
  }
  return null;
};

/**
 * 유효한 에러 코드인지 확인
 */
export const isValidErrorCode = (code: string): boolean => {
  return code in ERROR_MESSAGE_MAP;
};

/**
 * 에러 메시지 가져오기
 */
export const getErrorMessage = (errorCode: ErrorCode): string => {
  return ERROR_MESSAGE_MAP[errorCode];
};

/**
 * 에러 처리 타입 가져오기
 */
export const getErrorHandlingType = (
  errorCode: ErrorCode
): "alert" | "modal" | "redirect" => {
  return ERROR_HANDLING_MAP[errorCode];
};
