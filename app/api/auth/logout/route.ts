/**
 * DELETE /api/auth/logout
 * 로그아웃
 */

import type { NextRequest } from 'next/server';
import { createSuccessResponse } from '../../_lib/utils';

export async function DELETE(request: NextRequest) {
  // 목 서버에서는 단순히 성공 응답만 반환
  // 실제 토큰 무효화는 클라이언트에서 처리
  return createSuccessResponse(null);
}
