# 페이지 전환 애니메이션 시스템

React와 react-transition-group을 활용한 네이티브 앱과 같은 부드러운 페이지 전환 효과를 제공합니다.

## 📋 개요

### 전환 타입

1. **슬라이드 전환** (일반 페이지)

   - **앞으로 가기**: 새 페이지가 오른쪽에서 슬라이드하며 이전 페이지를 덮음
   - **뒤로 가기**: 새 페이지가 왼쪽에서 슬라이드하며 현재 페이지를 덮음

2. **Dissolve 전환** (메인 탭 간)
   - **메인 탭 ↔ 메인 탭**: 300ms fade-in/out 효과

### 메인 탭 페이지

```typescript
// 다음 페이지들 간 이동 시 dissolve 전환 적용
'/', '/search', '/application', '/profile', '/resume/scrapped';
```

## 🎯 자동 적용

시스템이 `App.tsx`에 통합되어 있어 **별도 설정 없이 자동으로 작동**합니다.

```tsx
// TransitionRoutes가 모든 라우팅을 자동으로 감싸고 있음
<TransitionRoutes>
  <Route path="/" element={<HomePage />} />
  <Route path="/post/:id" element={<PostDetailPage />} />
  {/* 모든 라우트에 자동으로 전환 효과 적용 */}
</TransitionRoutes>
```

## ⚙️ 페이지별 설정

`src/constants/pageTransition.ts`에서 페이지별 전환 설정을 관리합니다:

```typescript
export const PAGE_TRANSITION_CONFIG: Record<string, PageTransitionConfig> = {
  // 전환 효과 활성화
  '/': { enabled: true },
  '/post/:id': { enabled: true },

  // 전환 효과 비활성화 (즉시 전환)
  '/document-view/:id': { enabled: false },

  // 커스텀 지속시간
  '/special-page': { enabled: true, duration: 500 },
};
```

### 설정 옵션

- `enabled`: 전환 애니메이션 활성화 여부 (boolean)
- `duration`: 애니메이션 지속 시간 (ms, 기본값: 300)

### 동적 경로 지원

```typescript
// 동적 경로 패턴 지원
'/post/:id': { enabled: true },        // /post/123, /post/456 등 모두 적용
'/user/:userId/profile': { enabled: true }, // 중첩 동적 경로 지원
```

## 🧭 네비게이션 방향 감지

`useNavigationDirection` 훅이 자동으로 전환 방향을 감지합니다:

### 방향 감지 원리

```typescript
// 전역 네비게이션 스택으로 브라우저 히스토리 추적
let globalNavigationStack: string[] = [];
let globalStackPointer = -1;

// 방향 판단 로직
if (현재경로가_스택에_존재하고_이전위치) {
  direction = 'back'; // 뒤로 가기
} else {
  direction = 'forward'; // 앞으로 가기
}
```

### 방향별 전환 효과

- **Forward**: `/ → /post/4` (오른쪽에서 슬라이드 인)
- **Back**: `/post/4 → /` (왼쪽에서 슬라이드 인)
- **Dissolve**: `/search → /application` (fade 전환)

## 🎨 CSS 구조

### 슬라이드 애니메이션

```css
/* Forward 애니메이션 */
.page-slide-forward-enter {
  transform: translateX(100%); /* 오른쪽에서 시작 */
}
.page-slide-forward-enter-active {
  transform: translateX(0); /* 중앙으로 이동 */
  transition: transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Back 애니메이션 */
.page-slide-back-enter {
  transform: translateX(-100%); /* 왼쪽에서 시작 */
}
.page-slide-back-enter-active {
  transform: translateX(0); /* 중앙으로 이동 */
  transition: transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

### Dissolve 애니메이션

```css
/* Dissolve 전환 (메인 탭 간) */
.page-dissolve-enter {
  opacity: 0;
}
.page-dissolve-enter-active {
  opacity: 1;
  transition: opacity 300ms ease-in-out;
}
```

## 🔧 고급 활용

### 새 페이지 추가

```typescript
// 1. 라우트 추가 (App.tsx)
<Route path="/new-page" element={<NewPage />} />

// 2. 전환 설정 추가 (pageTransition.ts)
'/new-page': { enabled: true },

// 자동으로 전환 효과 적용됨!
```

### 커스텀 전환 패턴

```typescript
// 특별한 페이지에 긴 전환 시간 적용
'/onboarding/:step': { enabled: true, duration: 600 },

// 데이터 집약적 페이지는 전환 비활성화
'/analytics/dashboard': { enabled: false },
```

### 메인 탭 페이지 수정

```typescript
// constants/pageTransition.ts
export const MAIN_TAB_PAGES = [
  '/',
  '/search',
  '/application',
  '/profile',
  '/resume/scrapped',
  '/new-main-tab', // 새 메인 탭 추가
] as const;
```

## 📱 접근성 및 성능

### 모션 감소 설정 자동 지원

```css
/* 사용자가 모션 감소를 선호하는 경우 자동 적용 */
@media (prefers-reduced-motion: reduce) {
  .page-slide-forward-enter-active,
  .page-slide-back-enter-active,
  .page-dissolve-enter-active {
    transition-duration: 0.01ms !important;
  }
}
```

### GPU 가속 최적화

- `transform3d` 사용으로 하드웨어 가속
- `z-index` 동적 관리로 레이어 충돌 방지
- CSS-only 애니메이션으로 메모리 효율성 극대화

## 🔧 문제 해결

### 전환 효과가 작동하지 않는 경우

1. **페이지 설정 확인**:

   ```typescript
   // pageTransition.ts에서 해당 경로 확인
   export const PAGE_TRANSITION_CONFIG = {
     '/your-page': { enabled: true }, // 이 설정이 있는지 확인
   };
   ```

2. **동적 경로 패턴 확인**:

   ```typescript
   // 잘못된 패턴
   '/post/123': { enabled: true }, // ❌ 특정 ID만 매칭

   // 올바른 패턴
   '/post/:id': { enabled: true }, // ✅ 모든 post ID 매칭
   ```

### 전환이 끊어지거나 어색한 경우

1. **CSS 확인**:

   ```css
   /* pageTransition.css가 올바르게 import되었는지 확인 */
   @import './styles/pageTransition.css';
   ```

2. **브라우저 호환성**:
   - 모던 브라우저 권장 (Chrome 60+, Safari 12+, Firefox 55+)
   - `transform3d` 지원 필요

## 🏗️ 아키텍처 구조

### 핵심 컴포넌트

```
src/
├── components/Common/
│   └── TransitionRoutes.tsx     # 메인 전환 컨트롤러
├── hooks/
│   └── useNavigationDirection.ts # 방향 감지 로직
├── constants/
│   └── pageTransition.ts        # 전환 설정
└── styles/
    └── pageTransition.css       # 애니메이션 스타일
```

### 데이터 흐름

```
1. 라우트 변경 감지 (React Router)
       ↓
2. 방향 계산 (useNavigationDirection)
       ↓
3. 전환 타입 결정 (dissolve vs slide)
       ↓
4. CSS 클래스 적용 (react-transition-group)
       ↓
5. 애니메이션 실행 (CSS transitions)
```

## 🚀 확장 가능성

현재 시스템은 다음과 같은 확장을 지원할 예정입니다:

- **새로운 전환 패턴 추가** (vertical slide, zoom 등)
- **제스처 기반 네비게이션** (스와이프)
- **조건부 전환** (사용자 설정, 디바이스 성능 기반)
- **전환 완료 콜백** (GA 이벤트, 로깅 등)


