/**
 * GET /api/letter/get-open-letter/{user_id}/{letter_id}
 * 공개 편지 조회 (비로그인 방문자)
 */

import type { NextRequest } from 'next/server';
import { db } from '../../../../_lib/mockDB';
import { createSuccessResponse, createErrorResponse } from '../../../../_lib/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ user_id: string; letter_id: string }> }
) {
  const { user_id, letter_id } = await params;

  // 편지 조회
  const letter = db.getLetter(letter_id);
  if (!letter) {
    return createErrorResponse('LETTER_003', 'Letter not found', 404);
  }

  // 소유자 확인
  if (letter.owner_id !== user_id) {
    return createErrorResponse('LETTER_003', 'Letter does not belong to this user', 403);
  }

  // 공개 상태 확인
  if (!letter.is_open) {
    return createErrorResponse('LETTER_003', 'This letter is not public', 403);
  }

  return createSuccessResponse({
    letter_id: letter.letter_id,
    sender_name: letter.sender_name,
    is_open: 'true',
    letter_pokemon: letter.letter_pokemon,
    content: letter.content,
  });
}
