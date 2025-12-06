/**
 * PUT /api/letter/open-letter
 * 편지 공개/비공개 토글
 */

import type { NextRequest } from 'next/server';
import { db } from '../../_lib/mockDB';
import { verifyToken, extractToken } from '../../_lib/auth';
import { createSuccessResponse, createErrorResponse, parseBody } from '../../_lib/utils';

interface OpenLetterRequest {
  letter_id: string;
  is_open: string; // "true" or "false"
}

export async function PUT(request: NextRequest) {
  // 토큰 검증
  const authHeader = request.headers.get('authorization');
  const token = extractToken(authHeader);
  const tokenPayload = token ? verifyToken(token) : null;

  if (!tokenPayload) {
    return createErrorResponse('AUTH_005', 'Invalid or expired token', 401);
  }

  const body = await parseBody<OpenLetterRequest>(request);
  if (!body || !body.letter_id || body.is_open === undefined) {
    return createErrorResponse('LETTER_001', 'letter_id and is_open are required');
  }

  const { letter_id, is_open } = body;

  // 편지 조회
  const letter = db.getLetter(letter_id);
  if (!letter) {
    return createErrorResponse('LETTER_003', 'Letter not found', 404);
  }

  // 소유자 확인
  if (letter.owner_id !== tokenPayload.userId) {
    return createErrorResponse('LETTER_003', 'Access denied', 403);
  }

  // 공개 상태 업데이트
  const isOpenBool = is_open === 'true';
  db.updateLetter(letter_id, { is_open: isOpenBool });

  return createSuccessResponse(null);
}
