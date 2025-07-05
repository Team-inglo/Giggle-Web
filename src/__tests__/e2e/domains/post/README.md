# 공고 관리 E2E 테스트

## 개요

이 디렉토리는 공고 등록, 수정, 삭제 등 공고 관리와 관련된 모든 E2E 테스트를 포함합니다.

## 실행 방법

### 공고 관리 테스트만 실행

```bash
# 모든 공고 관리 테스트
pnpm exec playwright test src/__tests__/e2e/domains/post/

# 특정 테스트 파일만
pnpm exec playwright test creation.spec.ts
pnpm exec playwright test validation.spec.ts
```

### 디버깅 모드

```bash
# 헤드풀 모드로 실행
pnpm exec playwright test src/__tests__/e2e/domains/post/ --headed

# 단계별 디버깅
pnpm exec playwright test creation.spec.ts --debug
```

## 테스트 파일 구성

### 📁 파일 구조

```
domains/post/
├── README.md              # 이 파일
├── creation.spec.ts       # 공고 생성 전체 플로우
├── validation.spec.ts     # 단계별 유효성 검사
├── management.spec.ts     # 공고 수정/삭제 (예정)
└── fixtures/
    └── post-data.ts       # 공고 관련 테스트 데이터
```

### 📋 테스트 시나리오

#### ✅ creation.spec.ts - 공고 등록 전체 플로우

**시나리오:**

- 고용주 로그인 → 공고 등록 → 공고 상세 페이지 → 공고 삭제
- 1단계부터 5단계까지 전체 공고 등록 프로세스
- 공고 등록 성공 후 상세 페이지 확인
- 생성된 공고 삭제 및 확인

#### ✅ validation.spec.ts - 단계별 유효성 검사

**1단계 (기본 정보):**

- 초기 다음 버튼 비활성화 상태 확인
- 타입 기본값('알바') 확인
- 업직종 선택 전 다음 버튼 비활성화
- 공고 제목 100자 유효성 검사
- 모든 필드 입력 후 다음 버튼 활성화

**2단계 (근무 조건):**

- 초기 다음 버튼 비활성화 상태 확인
- 시급 최저임금 유효성 검사
- 근무 시간 최소 1개 이상 추가 필요
- 근무지 상세 주소 50자 유효성 검사
- 다음(Daum) 우편번호 API iframe 처리

**3단계 (모집 조건):**

- 초기 다음 버튼 비활성화 상태 확인
- 모집인원 기본값(0명) 확인
- 성별 기본값 확인
- 비자 선택 필수 검증
- 학력 선택 필수 검증

**4단계 (담당자 정보):**

- 초기 다음 버튼 비활성화 상태 확인
- 담당자 이름 10자 유효성 검사
- 담당자 이메일 형태 및 길이 유효성 검사
- 담당자 연락처 앞자리 선택 필수
- 연락처 NNNN-NNNN 형태 자동 포맷팅

**5단계 (상세 정보):**

- 초기 완료 버튼 비활성화 상태 확인
- 공고 상세 내용 1000자 유효성 검사
- 우대 조건 50자 유효성 검사
- 이미지 업로드 및 삭제 기능 테스트

## Helper 함수

### 단계별 완료 함수

`validation.spec.ts`에서 export되는 재사용 가능한 helper 함수들:

```typescript
import {
  completeStep1,
  completeStep2,
  completeStep3,
  completeStep4,
  completeStep5,
} from '@/__tests__/e2e/domains/post/validation.spec';

// 사용 예시
await completeStep1(page); // 1단계 완료
await completeStep2(page); // 2단계 완료
// ...
```

### 공통 네비게이션

```typescript
import { goToPostCreatePage } from '@/__tests__/e2e/shared/helpers/auth-helpers';

// 공고 등록 페이지로 직접 이동 (로그인 포함)
await goToPostCreatePage(page);
```

## UI 구조 상세 분석

### 로그인 페이지

- 이메일 input: `getByPlaceholder('이메일을 입력해주세요')`
- 비밀번호 input: `getByPlaceholder('Enter password')`
- 로그인 버튼: `getByRole('button', { name: '로그인' })`

### 공고 등록 1단계 (기본 정보)

- 타입 선택: 기본값 '알바' (라디오 버튼)
- 업직종 선택: `getByPlaceholder('업직종을 선택해주세요')` (dropdown)
- 공고제목: `getByPlaceholder('제목을 입력해주세요')` (100자 제한)
- 다음 버튼: `getByRole('button', { name: /다음/ })`

### 공고 등록 2단계 (근무 조건)

- 시급: `getByPlaceholder('0')` (최저임금 검증)
- 근무기간: `getByPlaceholder('근무기간을 선택해주세요')` (dropdown)
- 근무시간 추가: `getByText('추가하기')` → 요일무관/시간무관 선택
- 근무지주소: `getByPlaceholder('주소를 검색해주세요')` (다음 주소검색 API)
- 상세주소: `getByPlaceholder(/상세/)` (50자 제한)

### 공고 등록 3단계 (모집 조건)

- 모집인원: `getByPlaceholder('0')` (기본값 0명)
- 성별: 기본값 '남자' (라디오 버튼)
- 비자: `getByPlaceholder('비자를 선택해 주세요')` (다중 선택)
- 학력: `getByPlaceholder('학력을 선택해주세요')` (dropdown)

### 공고 등록 4단계 (담당자 정보)

- 담당자 이름: `getByPlaceholder('채용 담당자 이름을 입력해주세요')` (10자 제한)
- 담당자 이메일: `getByPlaceholder('채용 담당자 이메일을 입력해주세요')` (형식 검증)
- 담당자 연락처: `getByPlaceholder("'-' 없이 숫자만 입력")` (자동 포맷팅)

### 공고 등록 5단계 (상세 정보)

- 상세 내용: `getByPlaceholder('상세 내용을 입력해주세요')` (1000자 제한)
- 우대 조건: `getByPlaceholder('우대 조건을 입력해주세요')` (50자 제한)
- 이미지 업로드: `#logo-upload` (최대 10개, PNG/JPEG)

## 테스트 데이터

### 업직종 옵션

- `"외식/음료"`

### 근무기간 옵션

- `"1주 ~ 1개월"`

### 비자 옵션

- `"D-2 : 외국인 유학생 (학사, 석사, 박사 과정)"`
- `"D-4 : 외국인 한국어 연수 및 기술 연수 단기 및 방문 관련 비자"`

### 학력 옵션

- `"고등학교졸업"`

## 특별 처리 사항

### 1. 이미지 업로드 테스트

실제 파일 업로드 시뮬레이션:

```typescript
const fileInput = page.locator('#logo-upload');
await fileInput.setInputFiles({
  name: 'test-image.png',
  mimeType: 'image/png',
  buffer: Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    'base64',
  ),
});
```

### 2. 다음 우편번호 API iframe 처리

이중 iframe 구조 상호작용:

```typescript
// 외부 iframe → 내부 iframe 순차 접근
const outerFrame = page.frameLocator('iframe');
await outerFrame.locator('#__daum__viewerFrame_1').waitFor();

const daumFrame = outerFrame.frameLocator('#__daum__viewerFrame_1');
const searchInput = daumFrame.locator('#region_name');

await searchInput.waitFor({ state: 'visible' });
await searchInput.fill('서울특별시 강남구');
await searchInput.press('Enter');

// 검색 결과 클릭
const firstResult = daumFrame.locator('.link_post').first();
await firstResult.click();
```

## 트러블슈팅

### 자주 발생하는 문제

1. **주소 검색 실패**

   - 원인: `jibunAddress` vs `autoJibunAddress` 속성 차이
   - 해결: 테스트 데이터에서 안정적인 주소 사용

2. **iframe 요소 찾기 실패**

   - 원인: iframe 로딩 타이밍 이슈
   - 해결: `waitFor()` 메서드로 iframe 로딩 대기

3. **이미지 업로드 실패**
   - 원인: 파일 input이 숨겨져 있음
   - 해결: `setInputFiles()` 메서드 사용

### 디버깅 팁

```bash
# 특정 단계에서 중단하여 확인
pnpm exec playwright test validation.spec.ts --debug

# 느린 속도로 실행하여 단계별 확인
pnpm exec playwright test creation.spec.ts --headed --slowMo=1000
```

## 기여 가이드

### 새 테스트 추가 시

1. **파일명 컨벤션**: `{기능명}.spec.ts`
2. **테스트 그룹**: `test.describe('{기능명} - {세부설명}')`
3. **단계별 테스트**: `test.step()` 활용
4. **재사용 함수**: 공통 로직은 별도 함수로 분리

### 테스트 데이터 추가

```typescript
// fixtures/post-data.ts
export const TEST_POST_DATA = {
  step1: {
    industry: '외식/음료',
    title: '테스트 공고 제목',
  },
  // ...
};
```

---

이 가이드는 공고 관리 기능의 테스트 품질과 안정성을 높이기 위해 지속적으로 업데이트됩니다.
