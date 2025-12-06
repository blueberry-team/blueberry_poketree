/**
 * DELETE /api/letter/delete-letter
 * 편지 삭제 (소유자만)
 */

import type { NextRequest } from 'next/server';
import { db } from '../../_lib/mockDB';
import { verifyToken, extractToken } from '../../_lib/auth';
import { createSuccessResponse, createErrorResponse, parseBody } from '../../_lib/utils';

interface DeleteLetterRequest {
  letter_id: string;
}

export async function DELETE(request: NextRequest) {
  // 토큰 검증
  const authHeader = request.headers.get('authorization');
  const token = extractToken(authHeader);
  const tokenPayload = token ? verifyToken(token) : null;

  if (!tokenPayload) {
    return createErrorResponse('AUTH_005', 'Invalid or expired token', 401);
  }

  const body = await parseBody<DeleteLetterRequest>(request);
  if (!body || !body.letter_id) {
    return createErrorResponse('LETTER_001', 'letter_id is required');
  }

  const { letter_id } = body;

  // 편지 조회
  const letter = db.getLetter(letter_id);
  if (!letter) {
    return createErrorResponse('LETTER_003', 'Letter not found', 404);
  }

  // 소유자 확인
  if (letter.owner_id !== tokenPayload.userId) {
    return createErrorResponse('LETTER_003', 'Access denied', 403);
  }

  // 편지 삭제
  db.deleteLetter(letter_id);

  return createSuccessResponse(null);
}
