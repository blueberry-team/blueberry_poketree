/**
 * GET /api/tree/get-my-tree?userId={user_id}
 * 사용자의 트리 정보 조회
 */

import type { NextRequest } from 'next/server';
import { db } from '../../_lib/mockDB';
import { verifyToken, extractToken } from '../../_lib/auth';
import { createSuccessResponse, createErrorResponse } from '../../_lib/utils';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return createErrorResponse('PUBLIC_001', 'userId is required');
  }

  // 사용자 조회
  const user = db.getUser(userId);
  if (!user) {
    return createErrorResponse('AUTH_003', 'User not found', 404);
  }

  // 토큰으로 본인 확인
  const authHeader = request.headers.get('authorization');
  const token = extractToken(authHeader);
  const tokenPayload = token ? verifyToken(token) : null;
  const isOwner = tokenPayload?.userId === userId;

  // 사용자의 편지 조회
  const letters = db.getLettersByReceiver(userId);

  return createSuccessResponse({
    nickname: user.nickname,
    is_owner: isOwner ? 'true' : 'false',
    is_master: user.is_master ? 'true' : 'false',
    letters: letters.map(letter => ({
      letter_id: letter.letter_id,
      sender_name: letter.sender_name,
      is_open: letter.is_open ? 'true' : 'false',
      is_read: letter.is_read ? 'true' : 'false',
      letter_pokemon: letter.letter_pokemon,
    })),
    pokemon_list: user.pokemon_list,
  });
}
