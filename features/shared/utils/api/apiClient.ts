import {
  extractErrorCode,
  handleRedirectError,
} from "@/features/shared/utils/errorHandler";
import type { ErrorCode } from "@/features/shared/types/errorTypes";

/**
 * API 성공 응답 구조
 * @template T - 응답 데이터의 타입
 * @property message - 응답 메시지
 * @property data - 응답 데이터
 */
export interface ApiResponse<T> {
  message: string;
  data: T;
}

/**
 * API 에러 응답 구조
 * @property error_code - 에러 코드
 * @property message - 에러 메시지 (선택)
 * @property status - 상태 정보 (선택)
 */
export interface ApiError {
  error_code: string;
  message?: string;
  status?: string;
}

/**
 * API 에러를 나타내는 커스텀 에러 클래스
 * 번역 키와 에러 코드 정보를 포함합니다.
 */
export class ApiClientError extends Error {
  public readonly errorCode: ErrorCode | null;
  public readonly translationKey: string | null;
  public readonly apiError: ApiError;

  constructor(
    message: string,
    errorCode: ErrorCode | null,
    translationKey: string | null,
    apiError: ApiError
  ) {
    super(message);
    this.name = "ApiClientError";
    this.errorCode = errorCode;
    this.translationKey = translationKey;
    this.apiError = apiError;
  }
}

/** API 기본 URL - 환경변수가 없으면 로컬 목 서버 사용 */
const BASE_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL ||
  (typeof window !== "undefined" ? `${window.location.origin}/api` : "/api");

/**
 * API 클라이언트 클래스
 * - HTTP 요청을 처리하고 인증 토큰을 관리합니다
 * - 응답 헤더에서 토큰을 자동으로 갱신합니다
 * - X-Token-Refresh-Required 헤더가 오면 응답은 즉시 반환하고 백그라운드에서 토큰 리프레시를 수행합니다
 * - 에러 응답을 처리하고 타입 안전성을 제공합니다
 */
export class ApiClient {
  /**
   * sessionStorage에서 인증 토큰을 가져옵니다
   * @returns 액세스 토큰 또는 null
   */
  private getAuthToken(): string | null {
    return sessionStorage.getItem("accessToken");
  }

  /**
   * sessionStorage에 인증 토큰을 저장합니다
   * @param token - 저장할 액세스 토큰
   */
  private setAuthToken(token: string): void {
    sessionStorage.setItem("accessToken", token);
  }

  /**
   * HTTP 요청 헤더를 구성합니다
   * @param requiresAuth - 인증이 필요한 요청인지 여부
   * @param customHeaders - 추가 커스텀 헤더 (선택)
   * @returns 구성된 HTTP 헤더
   */
  private buildHeaders(
    requiresAuth: boolean,
    customHeaders?: Record<string, string>
  ): HeadersInit {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (requiresAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    // 커스텀 헤더 병합
    if (customHeaders) {
      Object.assign(headers, customHeaders);
    }

    return headers;
  }

  /**
   * 토큰 리프레시를 위한 login API를 호출합니다
   * @throws Error - 로그인/리프레시 실패 시
   */
  private async login(): Promise<void> {
    const response = await fetch(`${BASE_API_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      // 에러 응답에서 에러 코드 추출
      try {
        const errorData: ApiError = await response.json();
        const errorCode = extractErrorCode(errorData);

        // 리다이렉트 타입 에러인 경우 리다이렉트 처리
        if (errorCode) {
          handleRedirectError(errorCode, "/signup-or-go");
        }
      } catch {
        // JSON 파싱 실패 시 기본 에러 처리
      }
      throw new Error("Token refresh failed");
    }

    // 응답 헤더에서 새로운 토큰이 있으면 저장
    const newAccessToken = response.headers.get("access-token");
    if (newAccessToken) {
      this.setAuthToken(newAccessToken);
    }
  }

  /**
   * HTTP 응답을 처리합니다
   * - 응답 헤더에서 새로운 토큰이 있으면 자동으로 갱신
   * - 에러 응답인 경우 Error 인스턴스를 throw (에러 코드 매핑된 메시지 포함)
   * @param response - Fetch API 응답 객체
   * @returns 파싱된 JSON 응답
   * @throws Error - 응답이 에러인 경우
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    // 토큰 자동 갱신
    const newAccessToken = response.headers.get("access-token");
    if (newAccessToken) {
      this.setAuthToken(newAccessToken);
    }

    // 에러 처리
    if (!response.ok) {
      const errorData: ApiError = await response.json();
      const errorCode = extractErrorCode(errorData);

      // 에러 코드를 번역 키로 변환 (예: "auth001" -> "error.auth001")
      // 번역 키가 있으면 번역 키를 메시지로 사용, 없으면 기본 메시지 사용
      const translationKey = errorCode ? `error.${errorCode}` : null;
      const errorMessage =
        translationKey || errorData.message || "An error occurred";

      // 커스텀 에러 클래스로 변환하여 던지기
      throw new ApiClientError(
        errorMessage,
        errorCode,
        translationKey,
        errorData
      );
    }

    return response.json();
  }

  /**
   * 기본 HTTP 요청을 수행합니다
   * - X-Token-Expired 또는 X-Token-Refresh-Required 헤더가 있으면 응답은 즉시 반환하고 백그라운드에서 토큰 리프레시를 수행합니다
   * @param endpoint - API 엔드포인트 경로
   * @param method - HTTP 메서드
   * @param requiresAuth - 인증이 필요한지 여부
   * @param body - 요청 본문 (선택)
   * @param customHeaders - 추가 커스텀 헤더 (선택)
   * @returns 응답 데이터
   */
  private async request<T>(
    endpoint: string,
    method: string,
    requiresAuth: boolean,
    body?: unknown,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    const response = await fetch(`${BASE_API_URL}${endpoint}`, {
      method,
      headers: this.buildHeaders(requiresAuth, customHeaders),
      // TODO: 쿠키 전송 필요 여부 확인 분기처리
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
    });

    // 응답 헤더에서 토큰 만료 또는 리프레시 필요 여부 확인
    const tokenExpiredHeader = response.headers.get("X-Token-Expired");
    const tokenRefreshRequiredHeader = response.headers.get(
      "X-Token-Refresh-Required"
    );
    const needsRefresh =
      tokenExpiredHeader === "true" || tokenRefreshRequiredHeader === "true";

    if (needsRefresh) {
      // 백그라운드에서 토큰 리프레시 수행 (await 없이 비동기로 실행)
      // 응답은 즉시 반환하여 딜레이를 방지하고, 다음 요청부터 갱신된 토큰 사용
      this.login().catch(() => {
        // 리프레시 실패는 조용히 처리 (다음 요청 시 다시 시도)
        // AUTH_005 같은 리다이렉트 에러는 login() 내부에서 처리됨
      });
    }

    // 응답을 즉시 처리하고 반환
    return this.handleResponse<T>(response);
  }

  /**
   * GET 요청을 수행합니다
   * @param endpoint - API 엔드포인트 경로
   * @param requiresAuth - 인증이 필요한지 여부 (기본값: false)
   * @param customHeaders - 추가 커스텀 헤더 (선택)
   * @returns 응답 데이터
   */
  async get<T>(
    endpoint: string,
    requiresAuth = false,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    return this.request<T>(
      endpoint,
      "GET",
      requiresAuth,
      undefined,
      customHeaders
    );
  }

  /**
   * POST 요청을 수행합니다
   * @param endpoint - API 엔드포인트 경로
   * @param body - 요청 본문 (선택)
   * @param requiresAuth - 인증이 필요한지 여부 (기본값: false)
   * @returns 응답 데이터
   */
  async post<T>(
    endpoint: string,
    body?: unknown,
    requiresAuth = false
  ): Promise<T> {
    return this.request<T>(endpoint, "POST", requiresAuth, body);
  }

  /**
   * PUT 요청을 수행합니다
   * @param endpoint - API 엔드포인트 경로
   * @param body - 요청 본문 (선택)
   * @param requiresAuth - 인증이 필요한지 여부 (기본값: false)
   * @returns 응답 데이터
   */
  async put<T>(
    endpoint: string,
    body?: unknown,
    requiresAuth = false
  ): Promise<T> {
    return this.request<T>(endpoint, "PUT", requiresAuth, body);
  }

  /**
   * DELETE 요청을 수행합니다
   * @param endpoint - API 엔드포인트 경로
   * @param requiresAuth - 인증이 필요한지 여부 (기본값: false)
   * @param body - 요청 본문 (선택)
   * @returns 응답 데이터
   */
  async delete<T>(
    endpoint: string,
    body?: unknown,
    requiresAuth = false
  ): Promise<T> {
    return this.request<T>(endpoint, "DELETE", requiresAuth, body);
  }

  /**
   * PATCH 요청을 수행합니다
   * @param endpoint - API 엔드포인트 경로
   * @param body - 요청 본문 (선택)
   * @param requiresAuth - 인증이 필요한지 여부 (기본값: false)
   * @returns 응답 데이터
   */
  async patch<T>(
    endpoint: string,
    body?: unknown,
    requiresAuth = false
  ): Promise<T> {
    return this.request<T>(endpoint, "PATCH", requiresAuth, body);
  }
}

/**
 * ApiClient의 기본 인스턴스
 * 애플리케이션 전체에서 이 인스턴스를 사용하는 것을 권장합니다
 */
export const apiClient = new ApiClient();

/**
 * 에러 객체가 ApiError 타입인지 확인하는 타입 가드 함수
 * @param error - 확인할 에러 객체
 * @returns ApiError 타입인지 여부
 */
export function isApiError(error: unknown): error is ApiError {
  return typeof error === "object" && error !== null && "error_code" in error;
}
