# E2E 테스트 가이드

## 개요

이 디렉토리는 Giggle Web의 end-to-end 테스트를 포함합니다. Playwright를 사용하여 실제 사용자 관점에서 전체 애플리케이션 플로우를 검증합니다.

## 실행 방법

### 전체 E2E 테스트 실행

```bash
# 모든 E2E 테스트 실행
pnpm exec playwright test src/__tests__/e2e/

# 헤드풀 모드 (브라우저 UI 보기)
pnpm exec playwright test src/__tests__/e2e/ --headed

# 특정 브라우저만
pnpm exec playwright test --project=chromium
```

### 도메인별 테스트 실행

```bash
# 공고 관리 테스트
pnpm exec playwright test src/__tests__/e2e/domains/post/

# 이력서 관리 테스트
pnpm exec playwright test src/__tests__/e2e/domains/resume/

# 고용주 관리 테스트
pnpm exec playwright test src/__tests__/e2e/domains/employer/
```

### 디버깅 모드

```bash
# 단계별 실행 (디버깅)
pnpm exec playwright test --debug

# 트레이스 뷰어로 실행 결과 분석
pnpm exec playwright show-trace trace.zip

# HTML 리포트 확인
pnpm exec playwright show-report
```

## 테스트 구조

### 📁 디렉토리 구조

```
src/__tests__/e2e/
├── domains/                    # 도메인별 테스트 시나리오
│   ├── post/                   # 공고 관리
│   │   ├── README.md           # 공고 관련 테스트 가이드
│   │   ├── creation.spec.ts    # 공고 생성 테스트
│   │   ├── validation.spec.ts  # 유효성 검사 테스트
│   │   └── fixtures/           # 공고 관련 테스트 데이터
│   ├── resume/                 # 이력서 관리
│   ├── employer/               # 고용주 관리
│   └── application/            # 지원 관리
├── shared/                     # 공통 요소
│   ├── fixtures/               # 공통 테스트 데이터
│   │   ├── users.ts           # 테스트 계정 정보
│   │   └── common-data.ts     # 공통 데이터
│   ├── helpers/                # 공통 헬퍼 함수
│   │   ├── auth-helpers.ts    # 인증 관련
│   │   └── navigation-helpers.ts
│   ├── mocks/                  # 외부 API 모킹
│   │   └── external-apis.ts
│   └── utils/                  # 공통 유틸리티
├── flows/                      # 크로스 도메인 플로우
│   ├── end-to-end-journey.spec.ts
│   └── user-onboarding.spec.ts
└── README.md                   # 이 파일
```

## 도메인별 테스트 가이드

### 📋 구현 완료된 도메인

#### [공고 관리 (Post Management)](./domains/post/README.md)

- ✅ 공고 등록 전체 플로우
- ✅ 단계별 유효성 검사 (1-5단계)
- ✅ 공고 수정 및 삭제
- ✅ 이미지 업로드 및 주소 검색

#### 이력서 관리 (Resume Management)

- 🚧 이력서 작성 플로우
- 🚧 이력서 수정 및 관리
- 🚧 경력/학력 입력

#### 고용주 관리 (Employer Management)

- 🚧 고용주 회원가입
- 🚧 프로필 관리
- 🚧 지원자 관리

#### 지원 관리 (Application Management)

- 🚧 공고 지원 플로우
- 🚧 지원 현황 확인
- 🚧 서류 제출

### 🔄 크로스 도메인 플로우

- 🚧 전체 사용자 여정 (회원가입 → 이력서 작성 → 공고 지원)
- 🚧 고용주 여정 (회원가입 → 공고 등록 → 지원자 관리)

## 공통 가이드

### 🔐 인증 및 로그인

모든 E2E 테스트에서 사용하는 공통 인증 헬퍼:

```typescript
// shared/helpers/auth-helpers.ts
import {
  loginAsEmployer,
  loginAsJobSeeker,
} from '@/__tests__/e2e/shared/helpers/auth-helpers';

// 사용 예시
test.beforeEach(async ({ page }) => {
  await loginAsEmployer(page); // 고용주로 로그인
  // 또는
  await loginAsJobSeeker(page); // 구직자로 로그인(추가예정)
});
```

### 🎭 외부 API 모킹

외부 서비스 의존성을 제거하기 위한 모킹 전략:

```typescript
// 카카오맵 API 모킹 (주소 검색용)
await page.addInitScript({
  content: `window.kakao = { /* mock implementation */ };`,
});

// 파일 업로드 모킹
await fileInput.setInputFiles({
  name: 'test-image.png',
  mimeType: 'image/png',
  buffer: Buffer.from('...', 'base64'),
});
```

### 📊 테스트 데이터 관리

일관된 테스트 데이터 사용을 위한 공통 fixtures:

```typescript
// shared/fixtures/users.ts
export const TEST_USERS = {
  employer: { email: 'mylittlesentry@gmail.com', password: 'testEmployer123@' },
  employee: { email: 'hwj0518@naver.com', password: 'testEmployee123@' }, // 추가예정
};

// 사용 시
import { TEST_USERS } from '@/__tests__/e2e/shared/fixtures';
```

## 베스트 프랙티스

### ✅ 권장사항

1. **Page Object Model 사용**

```typescript
// 좋은 예: 재사용 가능한 페이지 클래스
class PostCreationPage {
  constructor(private page: Page) {}

  async fillTitle(title: string) {
    await this.page.getByPlaceholder('제목을 입력해주세요').fill(title);
  }
}
```

2. **의미 있는 대기**

```typescript
// 좋은 예: 구체적인 상태 대기
await page.waitForLoadState('networkidle');
await page.waitForSelector('[data-testid="success-message"]');

// 나쁜 예: 임의의 시간 대기
await page.waitForTimeout(5000);
```

3. **안정적인 locator 사용**

```typescript
// 우선순위: placeholder > role > text > CSS selector
page.getByPlaceholder('이메일을 입력해주세요'); // 1순위
page.getByRole('button', { name: '로그인' }); // 2순위
page.getByText('제출하기'); // 3순위
page.locator('[data-testid="submit"]'); // 4순위
```

### ❌ 피해야 할 패턴

1. **하드코딩된 값 사용**

```typescript
// 나쁜 예
await page.fill('#title', '테스트 공고');

// 좋은 예
await page.fill('#title', TEST_POST_DATA.title);
```

2. **테스트 간 의존성**

```typescript
// 나쁜 예: 이전 테스트 결과에 의존
test('공고 수정', async () => {
  // 이전 테스트에서 생성된 공고를 가정
});

// 좋은 예: 독립적인 테스트
test('공고 수정', async () => {
  await createTestPost(); // 테스트 데이터 직접 생성
});
```

## 환경 설정

### Node.js 및 패키지 요구사항

```json
{
  "engines": {
    "node": ">=18.19.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0"
  }
}
```

### Playwright 설정

```typescript
// playwright.config.ts
export default defineConfig({
  testDir: './src/__tests__/e2e',
  timeout: 30000,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
});
```

## 트러블슈팅

### 자주 발생하는 문제들

1. **Element not found 오류**

   - 원인: 동적 콘텐츠 로딩 지연
   - 해결: `waitFor()` 메서드 사용

2. **테스트 불안정성 (Flaky Tests)**

   - 원인: 네트워크 지연, 애니메이션
   - 해결: 적절한 대기 조건 설정

3. **iframe 상호작용 실패**
   - 원인: iframe 로딩 타이밍
   - 해결: `frameLocator()` 및 대기 조건 활용

### 디버깅 도구 활용

```bash
# 단계별 실행으로 문제점 파악
pnpm exec playwright test --debug

# 실행 과정 녹화 및 분석
pnpm exec playwright test --trace on

# 브라우저 개발자 도구 활용
pnpm exec playwright test --headed --slowMo=1000
```

## 기여 가이드

### 새 도메인 테스트 추가

1. `domains/` 하위에 새 디렉토리 생성
2. 해당 도메인의 `README.md` 작성
3. 테스트 파일 및 fixtures 추가
4. 이 메인 README에 도메인 링크 추가

### 공통 헬퍼 함수 추가

1. `shared/helpers/` 에 적절한 파일 추가
2. 재사용성과 확장성 고려
3. JSDoc으로 사용법 문서화
4. 기존 테스트에서 검증 후 배포

---

이 가이드는 E2E 테스트의 품질과 유지보수성을 높이기 위해 지속적으로 업데이트됩니다.
