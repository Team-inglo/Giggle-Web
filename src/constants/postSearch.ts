import { PostSearchFilterItemType } from '@/types/PostSearchFilter/PostSearchFilterItem';

export const enum POST_SEARCH_MENU {
  POPULAR = 'POPULAR',
  RECENTLY = 'RECENTLY',
  BOOKMARKED = 'BOOKMARKED',
  RECOMMEND = 'RECOMMEND',
  TRENDING = 'TRENDING',
}

export const POST_SORTING = {
  POPULAR: 'POPULAR',
  RECENT: 'RECENT',
} as const;

export const POST_SORTING_KR = {
  [POST_SORTING.POPULAR]: '인기순',
  [POST_SORTING.RECENT]: '최신순',
  ['최신순']: '최신순',
  ['인기순']: '인기순',
};

export const enum FILTER_CATEGORY {
  REGION_1DEPTH = 'Region 1depth', // 시, 도
  REGION_2DEPTH = 'Region 2depth', // 구
  REGION_3DEPTH = 'Region 3depth', // 동
  INDUSTRY = 'Industry',
  WORK_PERIOD = 'Work Period',
  WORK_DAYS_PER_WEEK = 'Work Days Per Week',
  WORKING_DAY = 'Working Day',
  WORKING_HOURS = 'Working Hours',
  RECRUITMENT_PERIOD = 'Recruitment Period',
  EMPLOYMENT_TYPE = 'Employment Type',
  VISA = 'Visa',
}

export const FILTER_CATEGORY_KR = {
  [FILTER_CATEGORY.REGION_1DEPTH]: '지역 1단계',
  [FILTER_CATEGORY.REGION_2DEPTH]: '지역 2단계',
  [FILTER_CATEGORY.REGION_3DEPTH]: '지역 3단계',
  [FILTER_CATEGORY.INDUSTRY]: '희망 업직종을 선택해주세요',
  [FILTER_CATEGORY.WORK_PERIOD]: '희망 근무 기간을 선택해주세요',
  [FILTER_CATEGORY.WORK_DAYS_PER_WEEK]: '희망 주당 근무 일자를 선택해주세요',
  [FILTER_CATEGORY.WORKING_DAY]: '희망 근무 요일을 선택해주세요',
  [FILTER_CATEGORY.WORKING_HOURS]: '희망 근무 시간을 선택해주세요',
  [FILTER_CATEGORY.RECRUITMENT_PERIOD]: '모집 상태를 선택해주세요',
  [FILTER_CATEGORY.EMPLOYMENT_TYPE]: '근무 유형을 선택해주세요',
  [FILTER_CATEGORY.VISA]: '비자를 선택해주세요',
};

type FilterOptionsType = {
  [key in Exclude<
    FILTER_CATEGORY,
    | FILTER_CATEGORY.REGION_1DEPTH
    | FILTER_CATEGORY.REGION_2DEPTH
    | FILTER_CATEGORY.REGION_3DEPTH
  >]: string[];
};

// 카테고리 별로 문자열 배열을 가지는 객체
export const FILTER_CATEGORY_OPTIONS: FilterOptionsType = {
  [FILTER_CATEGORY.INDUSTRY]: [
    'Food Service',
    'Store Management',
    'Service',
    'Office Work',
    'Customer Sales',
    'Production Construction',
    'IT Tech',
    'Design',
    'Media',
    'Driving Delivery',
    'Healthcare Research',
    'Education',
  ],
  [FILTER_CATEGORY.WORK_PERIOD]: [
    'One Day',
    'Less Than One Week',
    'One Week To One Month',
    'One Month To Three Months',
    'Three Months To Six Months',
    'Six Months To One Year',
    'More Than One Year',
  ],
  [FILTER_CATEGORY.WORK_DAYS_PER_WEEK]: [
    'One Day',
    'Two Days',
    'Three Days',
    'Four Days',
    'Five Days',
    'Six Days',
  ],
  [FILTER_CATEGORY.WORKING_DAY]: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
    'Negotiable',
  ],
  [FILTER_CATEGORY.WORKING_HOURS]: [
    'Morning',
    'Afternoon',
    'Evening',
    'Full Day',
    'Dawn',
    'Negotiable Hours',
  ],
  [FILTER_CATEGORY.RECRUITMENT_PERIOD]: ['Opening', 'Closed'],
  [FILTER_CATEGORY.EMPLOYMENT_TYPE]: ['PartTime', 'Internship'],
  [FILTER_CATEGORY.VISA]: [
    'D-2',
    'D-4',
    'D-10',
    'C-4',
    'F-2',
    'F-4',
    'F-5',
    'F-6',
    'H-1',
  ],
};

export const EN_FILTER_CATEGORY_OPTIONS: Record<string, string> = {
  'food service': '외식/음료',
  'store management': '매장관리/판매',
  service: '서비스',
  'office work': '사무직',
  'customer sales': '고객상담/리서치/영업',
  'production construction': '생산/건설/노무',
  'it tech': 'IT/기술',
  design: '디자인',
  media: '미디어',
  'driving delivery': '운전/배달',
  'healthcare research': '병원/간호/연구',
  education: '교육/강사',
  'one day': '하루(1일)',
  'less than one week': '1주일이하',
  'one week to one month': '1주일-1개월',
  'one month to three months': '1개월-3개월',
  'three months to six months': '3개월-6개월',
  'six months to one year': '6개월-1년',
  'more than one year': '1년이상',
  'two days': '주 2일',
  'three days': '주 3일',
  'four days': '주 4일',
  'five days': '주 5일',
  'six days': '주 6일',
  monday: '월',
  tuesday: '화',
  wednesday: '수',
  thursday: '목',
  friday: '금',
  saturday: '토',
  sunday: '일',
  negotiable: '협의 가능',
  morning: '오전',
  afternoon: '오후',
  evening: '저녁',
  'full day': '종일(8시간 이상)',
  dawn: '새벽',
  'negotiable hours': '시간 협의',
  opening: '현재진행중',
  closed: '마감된공고',
  parttime: '아르바이트',
  internship: '인턴십',
  'd-2': 'D-2',
  'd-4': 'D-4',
  'd-10': 'D-10',
  'c-4': 'C-4',
  'f-2': 'F-2',
  'f-4': 'F-4',
  'f-5': 'F-5',
  'f-6': 'F-6',
  'h-1': 'H-1',
};

export const initialFilterList: PostSearchFilterItemType = {
  [FILTER_CATEGORY.REGION_1DEPTH]: [],
  [FILTER_CATEGORY.REGION_2DEPTH]: [],
  [FILTER_CATEGORY.REGION_3DEPTH]: [],
  [FILTER_CATEGORY.INDUSTRY]: [],
  [FILTER_CATEGORY.WORK_PERIOD]: [],
  [FILTER_CATEGORY.WORK_DAYS_PER_WEEK]: [],
  [FILTER_CATEGORY.WORKING_DAY]: [],
  [FILTER_CATEGORY.WORKING_HOURS]: [],
  [FILTER_CATEGORY.RECRUITMENT_PERIOD]: [],
  [FILTER_CATEGORY.EMPLOYMENT_TYPE]: [],
  [FILTER_CATEGORY.VISA]: [],
};

// 공고 검색 페이지 메뉴
export const enum POST_SEARCH_PAGE_MENU {
  POST = 'POST',
  CAREER = 'CAREER',
}

// 커리어 검색 카테고리
export const CAREER_CATEGORY = {
  ACTIVITY: 'Activity',
  PROGRAM: 'Program',
  CONTEST: 'Contest',
  CLUB: 'Club',
} as const;
