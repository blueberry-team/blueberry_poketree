# Mock Server 사용 가이드

## 개요

로컬 테스트를 위한 목 서버가 구현되었습니다. Vercel Serverless Functions를 사용하여 실제 백엔드 API와 동일한 엔드포인트를 제공합니다.

## 사용 방법

### 1. 서버 실행

```bash
npm run dev
```

`.env` 파일의 `NEXT_PUBLIC_BASE_API_URL` 설정에 따라 자동으로 목 서버 또는 실제 백엔드를 사용합니다.

### 2. 환경 변수 설정

**목 서버 사용 시** (`.env` 파일):
```env
# NEXT_PUBLIC_BASE_API_URL을 비워두거나 주석처리
# NEXT_PUBLIC_BASE_API_URL=
NODE_ENV="dev"
```

**실제 백엔드 사용 시** (`.env` 파일):
```env
NEXT_PUBLIC_BASE_API_URL=https://your-real-backend.com
NODE_ENV="dev"
```

## 구현된 엔드포인트

### Auth 엔드포인트
- `POST /api/auth/signup-or-go` - 회원가입 또는 로그인 (응답: `action: "signup"` 또는 `"login"`)
- `POST /api/auth/login` - 토큰 리프레시
- `DELETE /api/auth/logout` - 로그아웃

**참고**: 목 서버는 항상 기존 유저(상화)로 로그인되며 `action: "login"`을 반환합니다.

### Tree 엔드포인트
- `GET /api/tree/get-my-tree?userId={user_id}` - 트리 정보 조회

### Pokemon 엔드포인트
- `GET /api/pokemon/get-my-pokemon?userId={publicId}` - 포켓몬 리스트 조회

### Letter 엔드포인트
- `POST /api/letter/create-letter` - 편지 생성
- `GET /api/letter/{letter_id}` - 편지 상세 조회 (소유자)
- `GET /api/letter/get-open-letter/{user_id}/{letter_id}` - 공개 편지 조회
- `DELETE /api/letter/delete-letter` - 편지 삭제
- `PUT /api/letter/open-letter` - 편지 공개/비공개 토글

## 샘플 데이터

목 서버는 다음 샘플 데이터로 초기화됩니다:

### 샘플 사용자
1. **상화** (`1`)
   - 비밀번호: `1234`

2. **상일** (`2`)
   - 비밀번호: `1234`

3. **상추** (`3`)
   - 비밀번호: `1234`

## 특징

### 자동 기능
- ✅ JWT 토큰 자동 생성 및 검증
- ✅ 편지 읽음 처리 자동화
- ✅ 편지 공개/비공개 토글

**참고**: 목 서버는 포켓몬 자동 지급 기능이 구현되어 있지 않습니다. 실제 서버에서만 동작합니다.

### In-Memory 저장
- 서버 재시작 시 데이터 초기화
- 개발/테스트 목적으로 충분

## 테스트 예시

### 1. 회원가입/로그인
```bash
curl -X POST http://localhost:3000/api/auth/signup-or-go \
  -H "Content-Type: application/json" \
  -d '{"nickname": "TestUser", "password": "1234"}'
```

### 2. 트리 조회
```bash
curl http://localhost:3000/api/tree/get-my-tree?userId=1
```

### 3. 편지 생성
```bash
curl -X POST http://localhost:3000/api/letter/create-letter \
  -H "Content-Type: application/json" \
  -d '{
    "sender_name": "친구",
    "content": "메리 크리스마스!",
    "receiver_id": "1"
  }'
```

## 파일 구조

```
api/
├── _lib/                    # 공유 유틸리티
│   ├── types.ts            # 타입 정의
│   ├── mockDB.ts           # In-memory 데이터베이스
│   ├── auth.ts             # JWT 토큰 관리
│   └── utils.ts            # 유틸리티 함수
├── auth/
│   ├── signup-or-go.ts     # 회원가입/로그인
│   ├── login.ts            # 토큰 리프레시
│   └── logout.ts           # 로그아웃
├── tree/
│   └── get-my-tree.ts      # 트리 조회
├── pokemon/
│   └── get-my-pokemon.ts   # 포켓몬 조회
└── letter/
    ├── create-letter.ts    # 편지 생성
    ├── [letter_id]/
    │   └── route.ts        # 편지 상세
    ├── get-open-letter/
    │   └── [user_id]/
    │       └── [letter_id]/
    │           └── route.ts # 공개 편지
    ├── delete-letter.ts    # 편지 삭제
    └── open-letter.ts      # 편지 공개 토글
```

## 주의사항

1. **데이터 영구성**: In-memory 저장이므로 서버 재시작 시 모든 데이터가 초기화됩니다
2. **보안**: 목 서버는 개발 목적으로만 사용하세요. 프로덕션에서는 실제 백엔드를 사용하세요
3. **토큰**: 간단한 JWT 구현이므로 실제 보안 요구사항을 충족하지 않습니다

## 전환

목 서버에서 실제 백엔드로 전환하려면:
1. `.env` 파일에서 `NEXT_PUBLIC_BASE_API_URL` 설정
2. `npm run dev` 실행

코드 변경 없이 환경 변수만으로 전환 가능합니다! 🚀
