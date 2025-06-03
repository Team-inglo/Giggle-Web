// 인재 타입 정의 (실제 타입은 types 폴더에서 import하거나 여기서 임시로 정의)
interface KoreanLevel {
  type: 'topik' | 'kiip' | 'sejong';
  level: number;
}

interface Talent {
  id: number;
  name: string;
  selfIntroTitle: string;
  selfIntroContent: string;
  nationality: string;
  major: string;
  visa: string | null;
  scrapCount: number;
  profileImage?: string;
  koreanLevel?: KoreanLevel;
  desiredIndustries: string[];
  gender?: 'male' | 'female';
  birthDate?: string;
  phone?: string;
  email?: string;
  desiredWorkRegion?: string[];
  desiredWorkType?: string[];
}

export const createMockTalent = (overrides: Partial<Talent> = {}): Talent => ({
  id: 1,
  name: '한은서',
  selfIntroTitle: 'Passionate about learning & growing in a new environment!',
  selfIntroContent:
    '안녕하세요! 저는 스웨덴에서 온 한은서입니다. 한국에서 비즈니스 관리를 공부하고 있으며, 소매업 분야에서 일하고 싶습니다.',
  nationality: '스웨덴',
  major: '경영학',
  visa: 'D-2',
  scrapCount: 15,
  profileImage: '/profile.jpg',
  koreanLevel: {
    type: 'topik',
    level: 4,
  },
  desiredIndustries: ['IT', '제조업'],
  gender: 'female',
  birthDate: '2001-08-06',
  phone: '010-7764-0565',
  email: 'fredrick0411@dgu.ac.kr',
  desiredWorkRegion: ['강남구', '서초구'],
  desiredWorkType: ['정규직', '계약직'],
  ...overrides,
});

export const createMockTalentList = (count: number = 5): Talent[] =>
  Array.from({ length: count }, (_, index) =>
    createMockTalent({
      id: index + 1,
      name: `인재${index + 1}`,
      scrapCount: Math.floor(Math.random() * 50),
      nationality: ['스웨덴', '미국', '중국', '베트남', '일본'][index % 5],
      visa: ['D-2', 'F-4', 'E-7', 'D-10', 'F-2'][index % 5],
    }),
  );

// 검색 결과 모킹
export const createMockSearchResult = (
  talents: Talent[],
  totalCount?: number,
) => ({
  talents,
  totalCount: totalCount ?? talents.length,
  currentPage: 1,
  totalPages: Math.ceil((totalCount ?? talents.length) / 10),
  hasNextPage: (totalCount ?? talents.length) > talents.length,
});

// 필터 옵션 모킹
export const mockFilterOptions = {
  visas: ['D-2', 'F-4', 'E-7', 'D-10', 'F-2'],
  nationalities: ['스웨덴', '미국', '중국', '베트남', '일본'],
  industries: ['IT', '제조업', '서비스업', '금융업', '건설업'],
  koreanLevels: [
    { level: 1, label: '전혀 불가능' },
    { level: 2, label: '간단한 해석 가능' },
    { level: 3, label: '의사소통 가능' },
    { level: 4, label: '업무 능숙' },
    { level: 5, label: '고급 구사 가능' },
    { level: 6, label: '원어민 수준' },
  ],
};

// 한국어 능력 변환 함수 (실제 구현 예시)
export const getKoreanLevelLabel = (koreanLevel?: KoreanLevel): string => {
  if (!koreanLevel) return '정보 없음';

  const { type, level } = koreanLevel;

  // TOPIK 기준 매핑
  if (type === 'topik') {
    switch (level) {
      case 1:
        return '간단한 해석 가능';
      case 2:
        return '의사소통 가능';
      case 3:
      case 4:
        return '업무 능숙';
      case 5:
        return '고급 구사 가능';
      case 6:
        return '원어민 수준';
      default:
        return '전혀 불가능';
    }
  }

  // 다른 시험 타입들도 필요시 추가
  return '정보 없음';
};
