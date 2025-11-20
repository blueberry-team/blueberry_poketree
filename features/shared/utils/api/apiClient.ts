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

/** API 기본 URL */
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

/**
 * API 클라이언트 클래스
 * - HTTP 요청을 처리하고 인증 토큰을 관리합니다
 * - 응답 헤더에서 토큰을 자동으로 갱신합니다
 * - 에러 응답을 처리하고 타입 안전성을 제공합니다
 */
export class ApiClient {
  /**
   * sessionStorage에서 인증 토큰을 가져옵니다
   * @returns 액세스 토큰 또는 null
   */
  private getAuthToken(): string | null {
    return sessionStorage.getItem('accessToken');
  }

  /**
   * sessionStorage에 인증 토큰을 저장합니다
   * @param token - 저장할 액세스 토큰
   */
  private setAuthToken(token: string): void {
    sessionStorage.setItem('accessToken', token);
  }

  /**
   * HTTP 요청 헤더를 구성합니다
   * @param requiresAuth - 인증이 필요한 요청인지 여부
   * @returns 구성된 HTTP 헤더
   */
  private buildHeaders(requiresAuth: boolean): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (requiresAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  /**
   * HTTP 응답을 처리합니다
   * - 응답 헤더에서 새로운 토큰이 있으면 자동으로 갱신
   * - 에러 응답인 경우 ApiError를 throw
   * @param response - Fetch API 응답 객체
   * @returns 파싱된 JSON 응답
   * @throws ApiError - 응답이 에러인 경우
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    // 토큰 자동 갱신
    const newAccessToken = response.headers.get('access-token');
    if (newAccessToken) {
      this.setAuthToken(newAccessToken);
    }

    // 에러 처리
    if (!response.ok) {
      const error: ApiError = await response.json();
      throw error;
    }

    return response.json();
  }

  /**
   * 기본 HTTP 요청을 수행합니다
   * @param endpoint - API 엔드포인트 경로
   * @param method - HTTP 메서드
   * @param requiresAuth - 인증이 필요한지 여부
   * @param body - 요청 본문 (선택)
   * @returns 응답 데이터
   */
  private async request<T>(
    endpoint: string,
    method: string,
    requiresAuth: boolean,
    body?: unknown
  ): Promise<T> {
    const response = await fetch(`${BASE_API_URL}${endpoint}`, {
      method,
      headers: this.buildHeaders(requiresAuth),
      // TODO: 쿠키 전송 필요 여부 확인 분기처리
      credentials: 'include',
      body: body ? JSON.stringify(body) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  /**
   * GET 요청을 수행합니다
   * @param endpoint - API 엔드포인트 경로
   * @param requiresAuth - 인증이 필요한지 여부 (기본값: false)
   * @returns 응답 데이터
   */
  async get<T>(endpoint: string, requiresAuth = false): Promise<T> {
    return this.request<T>(endpoint, 'GET', requiresAuth);
  }

  /**
   * POST 요청을 수행합니다
   * @param endpoint - API 엔드포인트 경로
   * @param body - 요청 본문 (선택)
   * @param requiresAuth - 인증이 필요한지 여부 (기본값: false)
   * @returns 응답 데이터
   */
  async post<T>(endpoint: string, body?: unknown, requiresAuth = false): Promise<T> {
    return this.request<T>(endpoint, 'POST', requiresAuth, body);
  }

  /**
   * PUT 요청을 수행합니다
   * @param endpoint - API 엔드포인트 경로
   * @param body - 요청 본문 (선택)
   * @param requiresAuth - 인증이 필요한지 여부 (기본값: false)
   * @returns 응답 데이터
   */
  async put<T>(endpoint: string, body?: unknown, requiresAuth = false): Promise<T> {
    return this.request<T>(endpoint, 'PUT', requiresAuth, body);
  }

  /**
   * DELETE 요청을 수행합니다
   * @param endpoint - API 엔드포인트 경로
   * @param requiresAuth - 인증이 필요한지 여부 (기본값: false)
   * @returns 응답 데이터
   */
  async delete<T>(endpoint: string, requiresAuth = false): Promise<T> {
    return this.request<T>(endpoint, 'DELETE', requiresAuth);
  }

  /**
   * PATCH 요청을 수행합니다
   * @param endpoint - API 엔드포인트 경로
   * @param body - 요청 본문 (선택)
   * @param requiresAuth - 인증이 필요한지 여부 (기본값: false)
   * @returns 응답 데이터
   */
  async patch<T>(endpoint: string, body?: unknown, requiresAuth = false): Promise<T> {
    return this.request<T>(endpoint, 'PATCH', requiresAuth, body);
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
  return (
    typeof error === 'object' &&
    error !== null &&
    'error_code' in error
  );
}
