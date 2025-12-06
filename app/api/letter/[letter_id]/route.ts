/**
 * GET /api/letter/{letter_id}
 * 편지 상세 조회 (소유자만)
 */

import type { NextRequest } from 'next/server';
import { db } from '../../_lib/mockDB';
import { verifyToken, extractToken } from '../../_lib/auth';
import { createSuccessResponse, createErrorResponse } from '../../_lib/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ letter_id: string }> }
) {
  const { letter_id: letterId } = await params;

  // 토큰 검증
  const authHeader = request.headers.get('authorization');
  const token = extractToken(authHeader);
  const tokenPayload = token ? verifyToken(token) : null;

  if (!tokenPayload) {
    return createErrorResponse('AUTH_005', 'Invalid or expired token', 401);
  }

  // 편지 조회
  const letter = db.getLetter(letterId);
  if (!letter) {
    return createErrorResponse('LETTER_003', 'Letter not found', 404);
  }

  // 소유자 확인
  if (letter.owner_id !== tokenPayload.userId) {
    return createErrorResponse('LETTER_003', 'Access denied', 403);
  }

  // 읽음 처리
  if (!letter.is_read) {
    db.updateLetter(letterId, { is_read: true });
  }

  return createSuccessResponse({
    letter_id: letter.letter_id,
    sender_name: letter.sender_name,
    is_open: letter.is_open ? 'true' : 'false',
    letter_pokemon: letter.letter_pokemon,
    content: letter.content,
  });
}
