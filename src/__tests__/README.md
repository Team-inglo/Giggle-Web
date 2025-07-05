# Giggle Web 테스트 가이드

## 개요

이 디렉토리는 Giggle Web 애플리케이션의 모든 테스트를 포함합니다.

> 📚 **전략적 가이드**: 테스트 철학, 팀 컨벤션, CI/CD 전략은 [Wiki 테스트 가이드](https://github.com/Team-inglo/Giggle-Web/wiki/TEST_GUIDE)를 참조하세요.

## 빠른 시작

### 환경 설정

```bash
# 의존성 설치
pnpm install

# Playwright 브라우저 설치 (E2E 테스트용)
pnpm exec playwright install
```

### 테스트 실행

```bash
# 모든 테스트 실행
pnpm test

# 타입별 테스트 실행
pnpm test:unit       # 단위 테스트 (Vitest + RTL)
pnpm test:integration # 통합 테스트
pnpm test:e2e        # E2E 테스트 (Playwright)

# 커버리지 포함 실행
pnpm test:coverage

# Watch 모드
pnpm test:unit --watch
```

### 개발 중 유용한 명령어

```bash
# 특정 파일/패턴 테스트
pnpm test Button
pnpm test src/components/Common/

# E2E 테스트 디버깅
pnpm test:e2e --headed
pnpm test:e2e --debug

# 테스트 리포트 확인
pnpm test:e2e --reporter=html
```

## 📁 프로젝트 테스트 구조

```
src/
├── components/
│   └── Common/
│       └── Button/
│           ├── Button.tsx
│           ├── Button.test.tsx      # 컴포넌트 테스트
│           └── index.ts
├── hooks/
│   ├── useAuth.ts
│   └── useAuth.test.ts              # 커스텀 훅 테스트
├── utils/
│   ├── formatters.ts
│   └── formatters.test.ts           # 유틸리티 테스트
└── __tests__/
    ├── setup.ts                     # 테스트 환경 설정
    ├── utils/                       # 재사용 가능한 테스트 유틸
    ├── mocks/                       # 공통 Mock 데이터
    ├── integration/                 # 통합 테스트
    └── e2e/                         # E2E 테스트
        ├── README.md                # E2E 상세 가이드
        ├── domains/                 # 도메인별 E2E 테스트
        └── shared/                  # 공통 E2E 헬퍼
```

## 🛠️ 개발자 도구

### 테스트 작성 템플릿

#### 컴포넌트 테스트

```typescript
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('클릭 이벤트가 정상적으로 호출되어야 한다', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>클릭</Button>);
    await user.click(screen.getByRole('button', { name: '클릭' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

#### 커스텀 훅 테스트

```typescript
// useAuth.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useAuth } from './useAuth';

describe('useAuth', () => {
  it('로그인 성공 시 사용자 정보를 반환해야 한다', async () => {
    const { result } = renderHook(() => useAuth());

    await result.current.login('test@example.com', 'password');

    await waitFor(() => {
      expect(result.current.user).toBeDefined();
      expect(result.current.isAuthenticated).toBe(true);
    });
  });
});
```

### 공통 테스트 유틸리티

#### 테스트 렌더러 (RTL with Providers)

```typescript
// src/__tests__/utils/test-utils.tsx
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

#### Mock 데이터 팩토리

```typescript
// src/__tests__/mocks/user.ts
export const createMockUser = (overrides = {}) => ({
  id: 1,
  email: 'test@example.com',
  name: '테스트 사용자',
  role: 'user',
  ...overrides,
});

// src/__tests__/mocks/api.ts
export const mockApiSuccess = <T>(data: T) =>
  vi.fn().mockResolvedValue({ data });

export const mockApiError = (message: string) =>
  vi.fn().mockRejectedValue(new Error(message));
```

## 🔧 자주 사용하는 패턴

### 1. API 호출 테스트

```typescript
// API 모킹
vi.mock('@/api/user', () => ({
  getUserProfile: vi.fn(),
}));

// 테스트에서 사용
const mockGetUserProfile = vi.mocked(getUserProfile);
mockGetUserProfile.mockResolvedValue(mockUser);
```

### 2. React Router 테스트

```typescript
// Router 모킹
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
}));
```

### 3. 비동기 상태 테스트

```typescript
// 로딩 상태 확인
expect(screen.getByText('로딩 중...')).toBeInTheDocument();

// 완료 대기
await waitFor(() => {
  expect(screen.getByText('완료')).toBeInTheDocument();
});
```

## 🐛 일반적인 문제 해결

### 자주 발생하는 에러와 해결법

#### 1. act() 경고

```typescript
// ❌ 문제
fireEvent.click(button);

// ✅ 해결
const user = userEvent.setup();
await user.click(button);
```

#### 2. 비동기 타이밍 이슈

```typescript
// ❌ 문제
expect(screen.getByText('결과')).toBeInTheDocument();

// ✅ 해결
await screen.findByText('결과');
// 또는
await waitFor(() => {
  expect(screen.getByText('결과')).toBeInTheDocument();
});
```

#### 3. Provider 없음 에러

```typescript
// ❌ 문제
render(<ComponentUsingQuery />);

// ✅ 해결
import { render } from '@/__tests__/utils/test-utils'; // Provider 포함
render(<ComponentUsingQuery />);
```

### 디버깅 도구

#### 1. DOM 상태 확인

```typescript
// 현재 DOM 출력
screen.debug();

// 특정 요소만 출력
screen.debug(screen.getByRole('button'));
```

#### 2. 쿼리 가능한 역할 확인

```typescript
import { logRoles } from '@testing-library/react';

const { container } = render(<Component />);
logRoles(container);
```

#### 3. Vitest UI 사용

```bash
# 브라우저에서 테스트 실행 및 디버깅
pnpm test --ui
```

## 📊 커버리지 확인

### 커버리지 리포트

```bash
# 커버리지 생성
pnpm test:coverage

# 브라우저에서 상세 리포트 확인
open coverage/index.html
```

### 목표 커버리지

- **전체 프로젝트**: 80% 이상
- **신규 기능**: 90% 이상
- **중요 비즈니스 로직**: 95% 이상

## 🎯 테스트 가이드 참조

### 📚 상세 가이드 문서

- **[Wiki - TEST_GUIDE](https://github.com/Team-inglo/Giggle-Web/wiki/TEST_GUIDE)**: 테스트 전략, 팀 컨벤션, CI/CD 연동
- **[Wiki - E2ETEST_GUIDE](https://github.com/Team-inglo/Giggle-Web/wiki/E2ETEST_GUIDE)**: E2E 테스트 전략 및 QA 시나리오
- **[E2E 테스트 가이드](./e2e/README.md)**: E2E 테스트 실행 및 작성 방법

### 🛠️ 실용 가이드 (이 문서)

- 빠른 시작 및 실행 방법
- 개발자 도구 및 유틸리티 사용법
- 일반적인 문제 해결
- 코드베이스별 구체적 예시

## 🤝 기여하기

### 새 테스트 추가 시

1. 적절한 위치에 테스트 파일 생성 (`*.test.tsx` 또는 `*.test.ts`)
2. 공통 Mock이나 유틸리티는 `__tests__/` 디렉토리에 추가
3. 복잡한 셋업이 필요한 경우 도움 요청

### 테스트 실패 시

1. 로컬에서 재현 확인
2. 디버깅 도구 활용하여 원인 분석
3. 해결 방법을 팀과 공유

---

💡 **Tip**: 테스트 작성이나 문제 해결에 어려움이 있다면 언제든 팀 슬랙 #dev-testing 채널에서 도움을 요청하세요!
