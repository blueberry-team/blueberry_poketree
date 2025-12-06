/**
 * POST /api/auth/login
 * 토큰 리프레시
 */

import { generateToken } from '../../_lib/auth';
import { createSuccessResponseWithToken } from '../../_lib/utils';

export async function POST() {
  // 목 서버에서는 간단하게 새 토큰 발급 (항상 상화 유저)
  const userId = '1';

  const token = generateToken(userId);
  return createSuccessResponseWithToken(null, token);
}
