import { EmployeeSearchFilterItemType } from '@/types/api/employee';

// 인재 추천 검색 카테고리
export const EMPLOYEE_SEARCH_CATEGORY = {
  VISA: 'VISA',
  INDUSTRY: 'INDUSTRY',
  KOREAN_LEVEL: 'KOREAN_LEVEL',
  MAJOR: 'MAJOR',
  NATIONALITY: 'NATIONALITY',
} as const;

export const EMPLOYEE_SEARCH_CATEGORY_KO = {
  [EMPLOYEE_SEARCH_CATEGORY.VISA]: '비자',
  [EMPLOYEE_SEARCH_CATEGORY.INDUSTRY]: '업직종',
  [EMPLOYEE_SEARCH_CATEGORY.KOREAN_LEVEL]: '한국어',
  [EMPLOYEE_SEARCH_CATEGORY.MAJOR]: '전공',
  [EMPLOYEE_SEARCH_CATEGORY.NATIONALITY]: '국가',
} as const;

// 인재 추천 검색 카테고리 별 옵션
export const EMPLOYEE_SEARCH_OPTIONS = {
  [EMPLOYEE_SEARCH_CATEGORY.VISA]: [
    {
      ko: 'D-2',
      en: 'D-2',
    },
    {
      ko: 'D-4',
      en: 'D-4',
    },
    {
      ko: 'D-10',
      en: 'D-10',
    },
    {
      ko: 'C-4',
      en: 'C-4',
    },
    {
      ko: 'F-2',
      en: 'F-2',
    },
    {
      ko: 'F-4',
      en: 'F-4',
    },
    {
      ko: 'F-5',
      en: 'F-5',
    },
    {
      ko: 'F-6',
      en: 'F-6',
    },
    {
      ko: 'H-1',
      en: 'H-1',
    },
  ],
  [EMPLOYEE_SEARCH_CATEGORY.INDUSTRY]: [
    {
      ko: '외식/음료',
      en: 'Food Service',
    },
    {
      ko: '매장관리/판매',
      en: 'Store Management',
    },
    {
      ko: '서비스',
      en: 'Service',
    },
    {
      ko: '사무직',
      en: 'Office Work',
    },
    {
      ko: '고객상담/리서치/영업',
      en: 'Customer Sales',
    },
    {
      ko: '생산/건설/노무',
      en: 'Production Construction',
    },
    {
      ko: 'IT/기술',
      en: 'IT Tech',
    },
    {
      ko: '디자인',
      en: 'Design',
    },
    {
      ko: '미디어',
      en: 'Media',
    },
    {
      ko: '운전/배달',
      en: 'Driving Delivery',
    },
    {
      ko: '병원/간호/연구',
      en: 'Healthcare Research',
    },
    {
      ko: '교육/강사',
      en: 'Education',
    },
  ],
  [EMPLOYEE_SEARCH_CATEGORY.KOREAN_LEVEL]: [
    {
      ko: '전혀 불가능',
      en: '',
    },
    {
      ko: '간단한 해석 가능',
      en: '',
    },
    {
      ko: '의사소통 가능',
      en: '',
    },
    {
      ko: '업무 능숙',
      en: '',
    },
    {
      ko: '고급 구사 가능',
      en: '',
    },
    {
      ko: '원어민 수준',
      en: '',
    },
  ],
  [EMPLOYEE_SEARCH_CATEGORY.MAJOR]: [
    {
      ko: '사업관리',
      en: '',
    },
    {
      ko: '경영/회계/사무',
      en: '',
    },
    {
      ko: '금융/보험',
      en: '',
    },
    {
      ko: '교육/자연/사회과학',
      en: '',
    },
    {
      ko: '법률/경찰/소방/교도/국방',
      en: '',
    },
    {
      ko: '보건/의료',
      en: '',
    },
    {
      ko: '사회복지/종료',
      en: '',
    },
    {
      ko: '문화/예술/디자인/방송',
      en: '',
    },
    {
      ko: '운전/운성',
      en: '',
    },
    {
      ko: '영업판매',
      en: '',
    },
    {
      ko: '경비/청소',
      en: '',
    },
    {
      ko: '이용/숙박/여행/오락/스포츠',
      en: '',
    },
    {
      ko: '음식서비스',
      en: '',
    },
    {
      ko: '건설',
      en: '',
    },
    {
      ko: '기계',
      en: '',
    },
    {
      ko: '재료',
      en: '',
    },
    {
      ko: '화학/바이오',
      en: '',
    },
    {
      ko: '섬유/의복',
      en: '',
    },
    {
      ko: '전기/전자',
      en: '',
    },
    {
      ko: '정보통신',
      en: '',
    },
    {
      ko: '식품가공',
      en: '',
    },
    {
      ko: '인쇄/목재/가구/공예',
      en: '',
    },
    {
      ko: '환경/에너지/안전',
      en: '',
    },
    {
      ko: '농립어업',
      en: '',
    },
  ],
  [EMPLOYEE_SEARCH_CATEGORY.NATIONALITY]: [
    {
      ko: '중국',
      en: '',
    },
    {
      ko: '베트남',
      en: '',
    },
    {
      ko: '우즈베키스탄',
      en: '',
    },
    {
      ko: '일본',
      en: '',
    },
    {
      ko: '프랑스',
      en: '',
    },
    {
      ko: '미국',
      en: '',
    },
    {
      ko: '기타',
      en: '',
    },
  ],
} as const;

// 인재 추천 검색 시에 초기값
export const initialEmployerSearchFilterList: EmployeeSearchFilterItemType = {
  [EMPLOYEE_SEARCH_CATEGORY.VISA]: [],
  [EMPLOYEE_SEARCH_CATEGORY.KOREAN_LEVEL]: [],
  [EMPLOYEE_SEARCH_CATEGORY.INDUSTRY]: [],
  [EMPLOYEE_SEARCH_CATEGORY.MAJOR]: [],
  [EMPLOYEE_SEARCH_CATEGORY.NATIONALITY]: [],
};
