/**
 * Auth Utilities
 * JWT 토큰 생성 및 검증
 */

interface TokenPayload {
  userId: string;
  iat: number;
  exp: number;
}

/**
 * 간단한 Base64 인코딩 (JWT 시뮬레이션)
 */
function base64Encode(data: string): string {
  return Buffer.from(data).toString('base64');
}

/**
 * 간단한 Base64 디코딩
 */
function base64Decode(encoded: string): string {
  return Buffer.from(encoded, 'base64').toString('utf-8');
}

/**
 * JWT 토큰 생성 (간단한 버전)
 */
export function generateToken(userId: string): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: TokenPayload = {
    userId,
    iat: now,
    exp: now + 24 * 60 * 60, // 24시간
  };

  const header = base64Encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payloadEncoded = base64Encode(JSON.stringify(payload));
  const signature = base64Encode(`mock-signature-${userId}`);

  return `${header}.${payloadEncoded}.${signature}`;
}

/**
 * JWT 토큰 검증 (간단한 버전)
 */
export function verifyToken(token: string): { userId: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(base64Decode(parts[1])) as TokenPayload;

    // 만료 체크
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) return null;

    return { userId: payload.userId };
  } catch {
    return null;
  }
}

/**
 * Authorization 헤더에서 토큰 추출
 */
export function extractToken(authHeader: string | null): string | null {
  if (!authHeader) return null;
  const match = authHeader.match(/^Bearer (.+)$/);
  return match ? match[1] : null;
}
