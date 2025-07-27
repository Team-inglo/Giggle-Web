export interface PageTransitionConfig {
  /** 전환 애니메이션 활성화 여부 */
  enabled: boolean;
  /** 애니메이션 지속 시간 (ms) */
  duration?: number;
}

/**
 * 메인 탭 페이지들 정의
 */
export const MAIN_TAB_PAGES = [
  '/',
  '/search',
  '/application',
  '/profile',
  '/resume/scrapped',
] as const;

/**
 * 경로가 메인 탭 페이지인지 확인
 */
export const isMainTabPage = (pathname: string): boolean => {
  return MAIN_TAB_PAGES.includes(pathname as (typeof MAIN_TAB_PAGES)[number]);
};

/**
 * 두 경로가 모두 메인 탭 페이지인지 확인 (dissolve 전환 조건)
 */
export const shouldUseDissolveTransition = (
  fromPath: string,
  toPath: string,
): boolean => {
  return isMainTabPage(fromPath) && isMainTabPage(toPath);
};

export const PAGE_TRANSITION_CONFIG: Record<string, PageTransitionConfig> = {
  // 홈 관련 페이지들
  '/': { enabled: true },
  '/banner/:id': { enabled: true },

  // 인증 관련 페이지들
  '/signin': { enabled: true },
  '/signup': { enabled: true },
  '/find-password': { enabled: true },
  '/information': { enabled: true },

  // 메인 탭 페이지들
  '/search': { enabled: true },
  '/application': { enabled: true },
  '/profile': { enabled: true },
  '/resume/scrapped': { enabled: true },

  // 상세 페이지들
  '/post/:id': { enabled: true },
  '/post/apply/:id': { enabled: true },
  '/career/:id': { enabled: true },
  '/application/:id': { enabled: true },
  '/application/:id/school': { enabled: true },
  '/application/result/:id': { enabled: true },
  '/application-documents/:id': { enabled: true },

  // 프로필 및 설정 페이지들
  '/profile/edit': { enabled: true },
  '/profile/account': { enabled: true },
  '/profile/about': { enabled: true },
  '/profile/change-password': { enabled: true },
  '/profile/manage-resume': { enabled: true },
  '/profile/language': { enabled: true },

  // 이력서 관련 페이지들
  '/resume/introduction': { enabled: true },
  '/resume/language/add': { enabled: true },
  '/resume/language/edit': { enabled: true },
  '/resume/education': { enabled: true },
  '/resume/education/:id': { enabled: true },
  '/resume/work-experience': { enabled: true },
  '/resume/work-experience/edit/:id': { enabled: true },
  '/resume/work-preference': { enabled: true },

  // 문서 관련 페이지들
  '/write-documents/:id': { enabled: true },
  '/document-preview/:id': { enabled: true },
  '/document-view/:id': { enabled: false }, // 문서 뷰어는 전환 효과 비활성화
  '/request-modify/:id': { enabled: true },

  // 고용주 페이지들
  '/employer/signup': { enabled: true },
  '/employer/signup/information': { enabled: true },
  '/employer/post': { enabled: true },
  '/employer/post/create': { enabled: true },
  '/employer/post/edit/:id': { enabled: true },
  '/employer/post/:id': { enabled: true },
  '/employer/post/:id/applicant': { enabled: true },
  '/employer/applicant/:id': { enabled: true },
  '/employer/applicant/:id/resume': { enabled: true },
  '/employer/applicant/:id/resume/accept': { enabled: true },
  '/employer/applicant/document-detail/:id': { enabled: true },
  '/employer/write-documents/:id': { enabled: true },
  '/employer/search': { enabled: true },
  '/employer/search/:id': { enabled: true },
  '/employer/profile': { enabled: true },
  '/employer/profile/edit': { enabled: true },
  '/employer/scrapped': { enabled: true },

  // 특수 페이지들 (전환 효과 비활성화)
  '/splash': { enabled: false },
  '/alarm': { enabled: true },
  '/search/filter': { enabled: true },
};

/**
 * 기본 전환 설정
 */
export const DEFAULT_TRANSITION_CONFIG: PageTransitionConfig = {
  enabled: true,
  duration: 300,
};

export const getPageTransitionConfig = (
  pathname: string,
): PageTransitionConfig => {
  // 정확한 경로 매칭 우선
  if (PAGE_TRANSITION_CONFIG[pathname]) {
    return PAGE_TRANSITION_CONFIG[pathname];
  }

  // 동적 경로 매칭 (예: /post/:id)
  const matchingRoute = Object.keys(PAGE_TRANSITION_CONFIG).find((route) => {
    if (route.includes(':')) {
      // 동적 경로를 정규식으로 변환
      const pattern = route.replace(/:[^/]+/g, '[^/]+');
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(pathname);
    }
    return false;
  });

  if (matchingRoute) {
    return PAGE_TRANSITION_CONFIG[matchingRoute];
  }

  // 기본 설정 반환
  return DEFAULT_TRANSITION_CONFIG;
};
