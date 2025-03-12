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

export type FilterOptionsType = {
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
    'General Interpretation Translation',
    'Food Service Assistant',
    'General Administrative Support',
    'English Kids Cafe',
    'General Cafe',
    'Part Time Work',
    'Tour Guide And Duty Free Assistant',
    'Manufacturing',
  ],
  [FILTER_CATEGORY.WORK_PERIOD]: [
    'One Day',
    'Less Than One Week',
    'One Week To One Month',
    'One Month To Three Months',
    'Three Months To Six Months',
    'One Month To One Year',
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
  'General Interpretation Translation': '일반통번역',
  'Food Service Assistant': '음식점보조',
  'General Administrative Support': '일반사무보조',
  'English Kids Cafe': '영어키즈카페',
  'General Cafe': '일반카페',
  'Part Time Work': '시간제근로',
  'Tour Guide And Duty Free Assistant': '관광안내보조 및 면세점판매보조',
  Manufacturing: '제조업',
  'One Day': '하루(1일)',
  'Less Than One Week': '1주일이하',
  'One Week To One Month': '1주일-1개월',
  'One Month To Three Months': '1개월-3개월',
  'Three Months To Six Months': '3개월-6개월',
  'One Month To One Year': '6개월-1년',
  'More Than One Year': '1년이상',
  'Two Days': '주 2일',
  'Three Days': '주 3일',
  'Four Days': '주 4일',
  'Five Days': '주 5일',
  'Six Days': '주 6일',
  Monday: '월',
  Tuesday: '화',
  Wednesday: '수',
  Thursday: '목',
  Friday: '금',
  Saturday: '토',
  Sunday: '일',
  Negotiable: '협의 가능',
  Morning: '오전',
  Afternoon: '오후',
  Evening: '저녁',
  'Full Day': '종일(8시간 이상)',
  Dawn: '새벽',
  'Negotiable Hours': '시간 협의',
  Opening: '현재진행중',
  Closed: '마감된공고',
  PartTime: '아르바이트',
  Internship: '인턴십',
  'D-2': 'D-2',
  'D-4': 'D-4',
  'D-10': 'D-10',
  'C-4': 'C-4',
  'F-2': 'F-2',
  'F-4': 'F-4',
  'F-5': 'F-5',
  'F-6': 'F-6',
  'H-1': 'H-1',
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
