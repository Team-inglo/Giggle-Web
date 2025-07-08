import { UserType } from '@/constants/user';

// 프리로딩 상태 관리
const preloadedModules = new Set<string>();

// 네트워크 연결 인터페이스 정의
interface NetworkConnection {
  effectiveType?: string;
}

// 네비게이터 확장 인터페이스
interface NavigatorWithConnection extends Navigator {
  connection?: NetworkConnection;
}

// 모든 페이지의 동적 import 함수들을 미리 정의
const PAGE_IMPORTS = {
  // 공통 페이지들
  AlarmPage: () => import('@/pages/Alarm/AlarmPage'),
  PostSearchPage: () => import('@/pages/PostSearch/PostSearchPage'),
  SigninPage: () => import('@/pages/Signin/SigninPage'),
  SignupPage: () => import('@/pages/Signup/SignupPage'),
  // 일반 사용자 페이지들
  PostDetailPage: () => import('@/pages/PostDetail/PostDetailPage'),
  PostApplyPage: () => import('@/pages/PostApply/PostApplyPage'),
  ManageResumePage: () => import('@/pages/Resume/ManageResumePage'),
  ApplicationPage: () => import('@/pages/Application/ApplicationPage'),
  ProfilePage: () => import('@/pages/Profile/ProfilePage'),
  ScrappedJobPostsPage: () => import('@/pages/Resume/ScrappedJobPostsPage'),

  // 고용주 페이지들
  EmployerPostPage: () => import('@/pages/Employer/Post/EmployerPostPage'),
  EmployerProfilePage: () =>
    import('@/pages/Employer/Profile/EmployerProfilePage'),
  EmployerScrappedPage: () =>
    import('@/pages/Employer/Scrapped/EmployerScrappedPage'),
  EmployerPostDetailPage: () =>
    import('@/pages/Employer/PostDetail/EmployerPostDetailPage'),
  EmployerPostFormPage: () =>
    import('@/pages/Employer/Post/EmployerPostFormPage'),
  EmployerApplicantListPage: () =>
    import('@/pages/Employer/ApplicantList/EmployerApplicantListPage'),
  EmployerApplicantDetailPage: () =>
    import('@/pages/Employer/ApplicantDetail/EmployerApplicantDetailPage'),
} as const;

type PageKey = keyof typeof PAGE_IMPORTS;

// 사용자 타입 확장 (비로그인 사용자 포함)
type UserTypeWithGuest = UserType | 'GUEST';

// 사용자 타입별 핵심 페이지 정의
const CRITICAL_PAGES: Record<
  UserTypeWithGuest,
  Array<{ key: PageKey; priority: number }>
> = {
  // 비로그인 사용자 (가장 많이 접근하는 페이지들)
  GUEST: [
    { key: 'PostSearchPage' as PageKey, priority: 1 },
    { key: 'PostDetailPage' as PageKey, priority: 1 },
    { key: 'SigninPage' as PageKey, priority: 2 },
    { key: 'SignupPage' as PageKey, priority: 3 },
  ],
  [UserType.USER]: [
    { key: 'PostDetailPage' as PageKey, priority: 1 },
    { key: 'PostSearchPage' as PageKey, priority: 1 },
    { key: 'PostApplyPage' as PageKey, priority: 1 },
    { key: 'ApplicationPage' as PageKey, priority: 1 },
    { key: 'ScrappedJobPostsPage' as PageKey, priority: 1 },
    { key: 'ProfilePage' as PageKey, priority: 1 },
    { key: 'AlarmPage' as PageKey, priority: 1 },
    { key: 'ManageResumePage' as PageKey, priority: 2 },
  ],
  [UserType.OWNER]: [
    { key: 'EmployerPostPage' as PageKey, priority: 1 },
    { key: 'EmployerPostDetailPage' as PageKey, priority: 1 },
    { key: 'EmployerScrappedPage' as PageKey, priority: 1 },
    { key: 'EmployerProfilePage' as PageKey, priority: 1 },
    { key: 'PostSearchPage' as PageKey, priority: 1 },
    { key: 'EmployerPostFormPage' as PageKey, priority: 1 },
    { key: 'AlarmPage' as PageKey, priority: 1 },
    { key: 'EmployerApplicantListPage' as PageKey, priority: 2 },
    { key: 'EmployerApplicantDetailPage' as PageKey, priority: 2 },
  ],
};

// 네트워크 상태 확인
const isConnectionGood = (): boolean => {
  if ('connection' in navigator) {
    const connection = (navigator as NavigatorWithConnection).connection;
    // 빠른 연결이거나 연결 정보가 없으면 프리로드 진행
    return !connection || connection.effectiveType !== 'slow-2g';
  }
  return true;
};

// 개별 모듈 프리로드
const preloadModule = async (pageKey: PageKey): Promise<boolean> => {
  if (preloadedModules.has(pageKey)) {
    return true;
  }

  try {
    const importFn = PAGE_IMPORTS[pageKey];

    if (!importFn) {
      return false;
    }

    // 동적 import 실행
    await importFn();

    preloadedModules.add(pageKey);

    return true;
  } catch (error) {
    console.warn(error);
    return false;
  }
};

// 우선순위별 프리로딩
export const preloadCriticalPages = async (
  userType?: UserType,
): Promise<void> => {
  if (!isConnectionGood()) {
    return;
  }

  // 사용자 타입이 없으면 GUEST로 처리
  const targetUserType: UserTypeWithGuest = userType || 'GUEST';
  const pages = CRITICAL_PAGES[targetUserType];

  if (!pages) {
    return;
  }

  // 우선순위별로 그룹화
  const priorityGroups = pages.reduce(
    (groups, page) => {
      if (!groups[page.priority]) groups[page.priority] = [];
      groups[page.priority].push(page.key);
      return groups;
    },
    {} as Record<number, PageKey[]>,
  );

  // 우선순위 순서대로 처리
  for (const priority of Object.keys(priorityGroups).sort(
    (a, b) => parseInt(a) - parseInt(b),
  )) {
    const pageKeys = priorityGroups[parseInt(priority)];

    // 같은 우선순위는 병렬 처리
    await Promise.allSettled(pageKeys.map((key) => preloadModule(key)));

    // 다음 우선순위 그룹 전에 잠시 대기 (브라우저 부하 방지)
    if (
      parseInt(priority) < Math.max(...Object.keys(priorityGroups).map(Number))
    ) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
};

// 특정 페이지 프리로드 (즉시 필요한 경우)
export const preloadPage = async (pageKey: PageKey): Promise<boolean> => {
  return await preloadModule(pageKey);
};

// 프리로딩 상태 확인
export const isPagePreloaded = (pageKey: PageKey): boolean => {
  return preloadedModules.has(pageKey);
};
