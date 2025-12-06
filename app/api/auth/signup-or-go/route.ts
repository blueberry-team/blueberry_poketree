/**
 * POST /api/auth/signup-or-go
 * 회원가입 또는 로그인
 */

import type { NextRequest } from 'next/server';
import { db } from '../../_lib/mockDB';
import { generateToken } from '../../_lib/auth';
import {
  createSuccessResponseWithToken,
  createErrorResponse,
  parseBody,
} from '../../_lib/utils';

interface SignupOrGoRequest {
  nickname: string;
  password: string;
}

export async function POST(request: NextRequest) {
  const body = await parseBody<SignupOrGoRequest>(request);

  if (!body || !body.nickname || !body.password) {
    return createErrorResponse('AUTH_001', 'Nickname and password are required');
  }

  // URL의 from 파라미터 확인 (회원가입 페이지에서는 from=login이 없음)
  const searchParams = request.nextUrl.searchParams;
  const from = searchParams.get('from');
  const isSignup = from !== 'login';

  // 목 서버에서는 입력값과 상관없이 항상 상화 유저로 로그인
  const sanghwaUser = db.getUser('1');

  if (!sanghwaUser) {
    return createErrorResponse('AUTH_002', 'Mock user not found');
  }

  const token = generateToken(sanghwaUser.public_id);
  return createSuccessResponseWithToken(
    {
      nickname: sanghwaUser.nickname,
      public_id: sanghwaUser.public_id,
      action: isSignup ? 'signup' : 'login',
    },
    token
  );
}
