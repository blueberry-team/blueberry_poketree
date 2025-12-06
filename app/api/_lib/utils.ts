/**
 * Utility Functions
 * 공통 유틸리티 함수들
 */

import type { NextRequest } from 'next/server';
import type { ApiResponse, ApiError } from './types';

/**
 * 랜덤 포켓몬 ID 생성 (1-1025)
 */
export function getRandomPokemonId(): number {
  return Math.floor(Math.random() * 1025) + 1;
}

/**
 * 유니크 ID 생성
 */
export function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * 성공 응답 생성
 */
export function createSuccessResponse<T>(data: T): Response {
  const response: ApiResponse<T> = {
    message: 'success',
    data,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * 성공 응답 생성 (토큰 포함)
 */
export function createSuccessResponseWithToken<T>(data: T, token: string): Response {
  const response: ApiResponse<T> = {
    message: 'success',
    data,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'access-token': token,
    },
  });
}

/**
 * 에러 응답 생성
 */
export function createErrorResponse(errorCode: string, message?: string, status = 400): Response {
  const error: ApiError = {
    error_code: errorCode,
    message,
  };

  return new Response(JSON.stringify(error), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Request body 파싱
 */
export async function parseBody<T>(request: NextRequest): Promise<T | null> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
