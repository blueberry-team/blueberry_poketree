/**
 * GET /api/pokemon/get-my-pokemon?userId={publicId}
 * 사용자의 포켓몬 리스트 조회
 */

import type { NextRequest } from 'next/server';
import { db } from '../../_lib/mockDB';
import { createSuccessResponse, createErrorResponse } from '../../_lib/utils';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const publicId = searchParams.get('userId');

  if (!publicId) {
    return createErrorResponse('PUBLIC_001', 'userId is required');
  }

  // 사용자 조회
  const user = db.getUser(publicId);
  if (!user) {
    return createErrorResponse('AUTH_003', 'User not found', 404);
  }

  return createSuccessResponse({
    pokemon_list: user.pokemon_list,
    nickname: user.nickname,
    isMaster: user.is_master ? 'true' : 'false',
  });
}
