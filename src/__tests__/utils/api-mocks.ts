/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from 'vitest';
import { createMockTalentList, createMockSearchResult } from '../mocks/talent.mock';

// API 함수들에 대한 모킹 헬퍼
export const mockApiSuccess = <T>(data: T) => {
  return vi.fn().mockResolvedValue({ data });
};

export const mockApiError = (
  message: string = 'API Error',
  status: number = 500,
) => {
  const error = new Error(message);
  (error as any).response = {
    status,
    data: { message },
  };
  return vi.fn().mockRejectedValue(error);
};

// 인재 검색 API 모킹
export const mockTalentSearchApi = (
  talentCount: number = 10,
  totalCount?: number,
) => {
  const talents = createMockTalentList(talentCount);
  const result = createMockSearchResult(talents, totalCount);
  return mockApiSuccess(result);
};

// 인재 상세 정보 API 모킹
export const mockTalentDetailApi = (talentId: number = 1) => {
  const talent = createMockTalentList(1)[0];
  talent.id = talentId;
  return mockApiSuccess(talent);
};

// 스크랩 API 모킹
export const mockScrapApi = (isScraped: boolean = true) => {
  return mockApiSuccess({ success: true, isScraped });
};

// 필터 옵션 API 모킹
export const mockFilterOptionsApi = () => {
  return mockApiSuccess({
    visas: ['D-2', 'F-4', 'E-7', 'D-10', 'F-2'],
    nationalities: ['스웨덴', '미국', '중국', '베트남', '일본', '기타'],
    industries: ['IT', '제조업', '서비스업', '금융업', '건설업'],
    majors: ['경영학', '공학', '의학', '법학', '문학'],
  });
};

// 네트워크 지연 시뮬레이션
export const mockApiWithDelay = <T>(data: T, delay: number = 100) => {
  return vi
    .fn()
    .mockImplementation(
      () =>
        new Promise((resolve) => setTimeout(() => resolve({ data }), delay)),
    );
};

// 페이지네이션 API 모킹
export const mockPaginatedApi = <T>(
  items: T[],
  page: number = 1,
  pageSize: number = 10,
) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedItems = items.slice(startIndex, endIndex);

  return mockApiSuccess({
    items: paginatedItems,
    totalCount: items.length,
    currentPage: page,
    totalPages: Math.ceil(items.length / pageSize),
    hasNextPage: endIndex < items.length,
    hasPreviousPage: page > 1,
  });
};

// 검색 필터 조합 API 모킹
export const mockFilteredSearchApi = (filters: Record<string, any>) => {
  // 실제로는 필터에 따라 다른 결과를 반환하도록 구현
  const mockTalents = createMockTalentList(Math.floor(Math.random() * 20) + 1);

  // 필터 적용 시뮬레이션
  let filteredTalents = mockTalents;

  if (filters.visa) {
    filteredTalents = filteredTalents.filter((talent) =>
      filters.visa.includes(talent.visa),
    );
  }

  if (filters.nationality) {
    filteredTalents = filteredTalents.filter((talent) =>
      filters.nationality.includes(talent.nationality),
    );
  }

  if (filters.koreanLevel) {
    filteredTalents = filteredTalents.filter(
      (talent) =>
        talent.koreanLevel &&
        filters.koreanLevel.includes(talent.koreanLevel.level),
    );
  }

  const result = createMockSearchResult(filteredTalents);
  return mockApiSuccess(result);
};

// MSW (Mock Service Worker) 대신 사용할 수 있는 전역 API 모킹
export const setupApiMocks = () => {
  // 실제 프로젝트에서 사용되는 API 모듈을 모킹

  vi.mock('@/api/auth', () => ({
    login: mockApiSuccess({
      token: 'mock-token',
      user: { id: 1, name: 'Test User' },
    }),
    logout: mockApiSuccess({ success: true }),
    getCurrentUser: mockApiSuccess({
      id: 1,
      name: 'Test User',
      role: 'company',
    }),
  }));
};

// API 모킹 정리
export const cleanupApiMocks = () => {
  vi.clearAllMocks();
  vi.resetAllMocks();
};
