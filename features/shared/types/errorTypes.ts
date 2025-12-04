/**
 * 서버 에러 코드 enum
 */
export enum ErrorCode {
  // Public errors
  PUBLIC_001 = "public001",

  // Auth errors
  AUTH_001 = "auth001",
  AUTH_002 = "auth002",
  AUTH_003 = "auth003",
  AUTH_004 = "auth004",
  AUTH_005 = "auth005",
  AUTH_006 = "auth006",
  AUTH_007 = "auth007",

  // Letter errors
  LETTER_001 = "letter001",
  LETTER_003 = "letter003",

  // Path errors
  PATH_001 = "path001",
}

/**
 * 에러 처리 방식 enum
 */
export enum ErrorHandlingType {
  ALERT = "alert",
  MODAL = "modal",
  REDIRECT = "redirect",
}

/**
 * 에러 정보 인터페이스
 */
export interface ErrorInfo {
  code: ErrorCode;
  message: string;
  handlingType: ErrorHandlingType;
}

/**
 * 에러 코드별 처리 방식 매핑
 */
export const ERROR_HANDLING_MAP: Record<ErrorCode, ErrorHandlingType> = {
  // Public errors - alert
  [ErrorCode.PUBLIC_001]: ErrorHandlingType.ALERT,

  // Auth errors
  [ErrorCode.AUTH_001]: ErrorHandlingType.ALERT,
  [ErrorCode.AUTH_002]: ErrorHandlingType.ALERT,
  [ErrorCode.AUTH_003]: ErrorHandlingType.MODAL,
  [ErrorCode.AUTH_004]: ErrorHandlingType.REDIRECT,
  [ErrorCode.AUTH_005]: ErrorHandlingType.REDIRECT,
  [ErrorCode.AUTH_006]: ErrorHandlingType.REDIRECT,
  [ErrorCode.AUTH_007]: ErrorHandlingType.REDIRECT,

  // Letter errors
  [ErrorCode.LETTER_001]: ErrorHandlingType.ALERT,
  [ErrorCode.LETTER_003]: ErrorHandlingType.MODAL,

  // Path errors
  [ErrorCode.PATH_001]: ErrorHandlingType.REDIRECT,
};

/**
 * 에러 코드별 메시지 매핑
 */
export const ERROR_MESSAGE_MAP: Record<ErrorCode, string> = {
  // Public errors
  [ErrorCode.PUBLIC_001]: "server error",

  // Auth errors
  [ErrorCode.AUTH_001]: "validation error",
  [ErrorCode.AUTH_002]: "wrong password or user exist",
  [ErrorCode.AUTH_003]: "user not found",
  [ErrorCode.AUTH_004]: "unexpected token",
  [ErrorCode.AUTH_005]: "expired token",
  [ErrorCode.AUTH_006]: "invalid token type",
  [ErrorCode.AUTH_007]: "The submitted token was not matched",

  // Letter errors
  [ErrorCode.LETTER_001]: "validation error",
  [ErrorCode.LETTER_003]: "letter not found",

  // Path errors
  [ErrorCode.PATH_001]: "wrong domain",
};
