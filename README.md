# PokéTree (포켓트리) 🎄✨

크리스마스 시즌 익명 편지 교환 플랫폼입니다. 자신만의 크리스마스 트리를 만들고, 익명의 편지를 받으며 포켓몬을 수집하세요!

## 프로젝트 소개

### 핵심 컨셉

PokéTree는 익명 메시지 플랫폼과 수집 게임을 결합한 크리스마스 시즌 이벤트 서비스입니다. 사용자는 자신의 포켓트리를 만들고 공유하여 친구들로부터 익명의 편지를 받을 수 있으며, 편지를 받을 때마다 랜덤 포켓몬을 획득합니다.

## 기술 스택

**버전**: 0.1.0
**브랜치**: release/blueberry_poketree_2025

- Next.js 16.0.3 (App Router)
- React 19.2.0
- TypeScript 5
- Tailwind CSS 4

## 기술 정보

- **프레임워크**: Next.js 16 (App Router)
- **UI 라이브러리**: React 19
- **스타일링**: Tailwind CSS 4
- **타입 체크**: TypeScript 5
- **린팅**: ESLint

## 라우트

### 페이지 구조

| 경로                | 설명               |
| ------------------- | ------------------ |
| `/`                 | 랜딩 페이지        |
| `/signup-or-go`     | 회원가입/로그인    |
| `/my-tree`          | 내 트리 페이지     |
| `/my-poket-message` | 포켓 메시지        |
| `/my-pokedex`       | 포켓몬 도감 목록   |
| `/my-pokedex/[id]`  | 포켓몬 상세 페이지 |

### 구현 세부사항

- **동적 라우팅**: `/my-pokedex/[id]` 경로에서 Next.js 15+ async params 패턴 적용
- **샘플 데이터**: 포켓몬 도감에 Bulbasaur, Pikachu, Mewtwo 테스트 데이터 포함
- **타입 안정성**: 모든 페이지에 TypeScript 타입 적용

## 시작하기

### 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 빌드

```bash
npm run build
npm run start
```

### 린트

```bash
npm run lint
```

## 프로젝트 구조

```
src/
├── app/                          # Next.js 라우팅 (페이지/스크린만, hooks 사용)
│   ├── signup-or-go/
│   │   └── page.tsx              # 회원가입/로그인 스크린
│   ├── my-tree/
│   │   └── page.tsx              # 내 트리 스크린
│   ├── my-poket-message/
│   │   └── page.tsx              # 포켓 메시지 스크린
│   ├── my-pokedex/
│   │   ├── page.tsx              # 포켓몬 목록 스크린
│   │   └── [id]/
│   │       └── page.tsx          # 포켓몬 상세 스크린
│   ├── page.tsx                  # 랜딩 페이지
│   ├── layout.tsx                # 루트 레이아웃
│   └── globals.css               # 전역 스타일
│
├── features/                     # 기능별 모듈 (Feature-based Architecture)
│   │
│   ├── signup-or-go/             # Auth 기능
│   │   ├── components/
│   │   │   └── AuthForm.tsx
│   │   ├── usecases/
│   │   │   └── signupOrGo.ts
│   │   ├── repositories/
│   │   │   └── authRepository.ts
│   │   └── models/
│   │       ├── req/
│   │       │   └── AuthRequest.ts
│   │       └── res/
│   │           └── AuthResponse.ts
│   │
│   ├── my-tree/                  # 트리 기능
│   │   ├── components/
│   │   │   ├── ShareLinkModal.tsx
│   │   │   ├── WriteLetterModal.tsx
│   │   │   └── Tree.tsx
│   │   ├── usecases/
│   │   │   ├── getUserTree.ts
│   │   │   ├── getLetter.ts
│   │   │   └── writeLetter.ts
│   │   ├── repositories/
│   │   │   └── treeRepository.ts
│   │   └── models/
│   │       ├── req/
│   │       │   ├── GetUserTreeRequest.ts
│   │       │   ├── GetLetterRequest.ts
│   │       │   └── WriteLetterRequest.ts
│   │       └── res/
│   │           ├── GetUserTreeResponse.ts
│   │           └── GetLetterResponse.ts
│   │
│   ├── my-poket-message/         # 메시지 목록 기능
│   │   ├── components/
│   │   │   └── MessageList.tsx
│   │   ├── usecases/
│   │   │   └── getMessages.ts
│   │   ├── repositories/
│   │   │   └── messageRepository.ts
│   │   └── models/
│   │       ├── req/
│   │       │   └── GetMessagesRequest.ts
│   │       └── res/
│   │           └── GetMessagesResponse.ts
│   │
│   ├── my-pokedex/               # 포켓몬 도감 기능
│   │   ├── components/
│   │   │   ├── PokemonList.tsx
│   │   │   ├── PokemonCard.tsx
│   │   │   └── PokemonDetail.tsx
│   │   ├── usecases/
│   │   │   ├── getMyPokedex.ts
│   │   │   └── getPokemonDetailById.ts
│   │   ├── repositories/
│   │   │   └── pokedexRepository.ts
│   │   └── models/
│   │       ├── req/
│   │       │   ├── GetMyPokedexRequest.ts
│   │       │   └── GetPokemonDetailByIdRequest.ts
│   │       └── res/
│   │           ├── GetMyPokedexResponse.ts
│   │           └── GetPokemonDetailByIdResponse.ts
│   │
│   └── shared/                   # 공통 컴포넌트 및 유틸리티
│       ├── components/
│       │   ├── Header/
│       │   │   └── Header.tsx
│       │   ├── Container/
│       │   │   └── Container.tsx
│       │   ├── BottomButtons/
│       │   │   ├── BottomButtons.tsx
│       │   │   └── CrossButton.tsx
│       │   ├── Card/
│       │   └── Modals/
│       │       ├── LetterModal.ts
│       │       ├── TooltipModal.ts
│       │       └── LanguageSettingModal.ts
│       ├── utils/
│       ├── usecases/
│       ├── repositories/
│       │   └── translate/
│       │       ├── useLanguage.tsx
│       │       └── languages/
│       │           ├── ko.ts
│       │           ├── en.ts
│       │           └── ja.ts
│       └── models/
│
└── assets/                       # 정적 리소스
    ├── images/
    │   ├── logos/
    │   ├── background/
    │   └── pokemon/
    └── fonts/
```

## 의존성 관리

프로젝트는 명확한 **단방향 의존성 흐름**을 유지합니다.

### 기본 원칙

#### 페이지 기능 의존성 방향

```
[Component] ↔ [Page] ← [UseCase] ← [Repository]
```

- **Page**: 비즈니스 로직 조율 (usecase 호출, 상태 관리, 라우팅)
- **Component**: UI 렌더링 및 사용자 이벤트 처리 (Page와 양방향 통신)
- **UseCase**: 비즈니스 로직 및 검증
- **Repository**: API 통신 및 데이터 소스 추상화

**규칙**:

- ✅ Page는 usecase를 직접 import하여 사용
- ✅ Component는 Page로부터 props(데이터/콜백)를 받아 사용
- ❌ Component가 직접 usecase를 import하지 않음

#### 공통 컴포넌트 예외 처리

`features/shared/components/`의 전역 컴포넌트(예: Header, Footer)는 예외적으로 **직접 usecase import를 허용**합니다.

```typescript
// ✅ 허용: shared 컴포넌트에서 usecase 직접 사용
// features/shared/components/Header/Header.tsx
import { logout } from "@/features/shared/usecases/logout";

export function Header() {
  const handleLogout = () => {
    logout();
    router.push("/");
  };
  // ...
}
```

**이유**:

- Header/Footer는 layout에서 사용되며 중간 Page가 없음
- 여러 페이지에서 공유되는 전역 UI이므로 직접 로직 접근 필요

### 예시: 로그인 기능

```typescript
// ✅ 올바른 구조
// app/signup-or-go/page.tsx
import { signupOrGo } from "@/features/signup-or-go/usecases/signupOrGo";
import { AuthForm } from "@/features/signup-or-go/components/AuthForm";

export default function SignupOrGoPage() {
  const handleSubmit = async (data) => {
    const result = await signupOrGo(data); // usecase 호출
    if (result.success) router.push("/my-tree");
  };

  return <AuthForm onSubmit={handleSubmit} />; // Component에 콜백 전달
}

// features/signup-or-go/components/AuthForm.tsx
export function AuthForm({ onSubmit }) {
  return <form onSubmit={onSubmit}>...</form>; // Page로부터 받은 콜백 사용
}
```

```typescript
// ❌ 잘못된 예시
// features/signup-or-go/components/AuthForm.tsx
import { signupOrGo } from "../usecases/signupOrGo"; // Component가 직접 usecase import

export function AuthForm() {
  const handleSubmit = () => signupOrGo(); // ❌ 의존성 방향 위반
}
```

## 스타일링 규칙

### CSS 작성 원칙

프로젝트는 **Utility-First 접근 방식**을 채택합니다:

#### 1. 공통 스타일 → `globals.css`

다음과 같은 전역 스타일을 `app/globals.css`에 작성합니다:

- **디자인 토큰** (CSS Variables)

  ```css
  :root {
    --color-primary: #ff6b6b;
    --color-secondary: #4ecdc4;
    --spacing-unit: 8px;
  }
  ```

- **기본 리셋 및 베이스 스타일**

  ```css
  * {
    box-sizing: border-box;
  }
  body {
    font-family: "Pretendard", sans-serif;
  }
  ```

- **재사용되는 공통 패턴**

  ```css
  .christmas-gradient {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  ```

- **Tailwind @layer 확장**
  ```css
  @layer components {
    .btn-primary {
      @apply px-4 py-2 bg-blue-500 text-white rounded-lg;
    }
  }
  ```

#### 2. 개별 스타일 → Tailwind 인라인 클래스

컴포넌트별 고유한 스타일은 Tailwind 유틸리티 클래스로 작성합니다:

```tsx
// ✅ 좋은 예
<button className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg">
  포켓몬세상 보내기
</button>

// ❌ 피해야 할 예 - 인라인 style 대신 Tailwind 사용
<button style={{ padding: '8px 16px', backgroundColor: 'green' }}>
  버튼
</button>
```

#### 3. 조건부 스타일링

복잡한 조건부 스타일은 `clsx` 또는 `cn` 유틸리티 사용:

```tsx
import { cn } from '@/shared/utils/cn';

<div className={cn(
  "base-class",
  isActive && "active-class",
  isPending && "pending-class"
)}>
```

## 네이밍 컨벤션

프로젝트는 **React, Next.js, TypeScript 공식 가이드**를 따릅니다:

### 파일명 규칙

| 파일 유형           | 컨벤션                     | 예시                                        |
| ------------------- | -------------------------- | ------------------------------------------- |
| React 컴포넌트      | **PascalCase**             | `Button.tsx`, `PokemonCard.tsx`, `Tree.tsx` |
| 함수/유틸리티       | **camelCase**              | `getUserTree.ts`, `formatDate.ts`           |
| Custom Hooks        | **camelCase** (use prefix) | `useAuth.ts`, `useFetch.ts`                 |
| 타입/모델 파일      | **PascalCase**             | `AuthRequest.ts`, `UserResponse.ts`         |
| Repository          | **camelCase**              | `authRepository.ts`, `treeRepository.ts`    |
| Next.js 라우트 폴더 | **kebab-case**             | `signup-or-go/`, `my-tree/`, `my-pokedex/`  |
| Next.js 예약 파일   | **소문자**                 | `page.tsx`, `layout.tsx`, `loading.tsx`     |

### 코드 내부 규칙

```typescript
// ✅ 컴포넌트 - PascalCase
export function PokemonCard() {}
export const UserProfile = () => {};

// ✅ 타입 - PascalCase
type User = { id: string; name: string };
interface AuthRequest {
  email: string;
  password: string;
}

// ✅ 변수/함수 - camelCase
const userName = "John";
const isAuthenticated = true;
function getUserTree() {}

// ✅ 전역 상수 - UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3;
const API_BASE_URL = "https://api.example.com";

// ✅ 로컬 상수 - camelCase
const defaultTimeout = 5000;
```

### 폴더/파일 구조 예시

```typescript
features/
├── my-pokedex/                     # kebab-case (폴더)
│   ├── components/
│   │   └── PokemonCard.tsx         # PascalCase (컴포넌트)
│   ├── usecases/
│   │   └── getMyPokedex.ts         # camelCase (함수)
│   ├── repositories/
│   │   └── pokedexRepository.ts    # camelCase (인스턴스)
│   └── models/
│       ├── req/
│       │   └── GetMyPokedexRequest.ts    # PascalCase (타입)
│       └── res/
│           └── GetMyPokedexResponse.ts   # PascalCase (타입)
```

## 커밋 컨벤션

프로젝트는 **기능 구현 단위로 커밋을 작성**하며, 다음 타입만 사용합니다:

### 커밋 메시지 형식

```
<type>: <subject>
```

### 커밋 타입

| 타입       | 설명                           | 예시                                 |
| ---------- | ------------------------------ | ------------------------------------ |
| `feat`     | 새로운 기능 추가               | `feat: 로그인 폼 컴포넌트 구현`      |
| `fix`      | 버그 수정                      | `fix: 포켓몬 이미지 로딩 오류 수정`  |
| `refactor` | 코드 리팩토링 (기능 변경 없음) | `refactor: authRepository 코드 정리` |

### 커밋 작성 규칙

1. **기능 단위로 커밋 분리**

   - 하나의 기능 구현이 완료되면 즉시 커밋
   - 너무 큰 단위로 묶지 않기

2. **제목 작성 규칙**

   - 제목은 50자 이내로 작성
   - 명령문 형태 사용 (예: "추가한다" ❌ → "추가" ✅)
   - 마침표 사용하지 않음

3. **예시**
   ```bash
   git commit -m "feat: 회원가입 API 연동"
   git commit -m "fix: 트리 이미지 렌더링 버그 수정"
   git commit -m "refactor: 포켓몬 데이터 구조 개선"
   ```

## Pull Request 가이드

### PR 작성 규칙

모든 Pull Request는 다음 정보를 **필수**로 포함해야 합니다:

#### 1. 구현한 기능 설명

```markdown
## 구현 내용

- 로그인/회원가입 폼 UI 구현
- AuthForm 컴포넌트 작성
- 입력 필드 validation 추가

## 변경 사항

- `features/signup-or-go/components/AuthForm.tsx` 생성
- 로그인 API 연동 (`signupOrGo` usecase)
- 에러 핸들링 추가
```

#### 2. 스크린샷 첨부 (필수)

UI 변경이 있는 경우 **반드시** 스크린샷을 첨부해야 합니다:

```markdown
## 스크린샷

### 로그인 화면

![로그인 화면](https://...)

### 에러 처리

![에러 메시지](https://...)

### 반응형 (모바일)

![모바일 화면](https://...)
```

### PR 템플릿 예시

```markdown
## 구현 내용

간단한 기능 설명 작성

## 변경 사항

- 변경된 파일 및 주요 로직 설명

## 스크린샷

(필수) UI 변경 사항 이미지 첨부

```

### PR 리뷰 프로세스

1. PR 생성 시 위 정보를 모두 포함
2. 코드 리뷰 진행
3. 수정 사항 반영
4. Approve 후 main/release 브랜치에 머지

## 참고 자료

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
