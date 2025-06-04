import { EmployeeSearchFilterItemType } from '@/types/api/employee';
import {
  Industrys,
  Koreans,
  Majors,
  Nationalities,
  Visas,
} from '@/constants/manageResume';

// 인재 추천 검색 카테고리
export const EMPLOYEE_SEARCH_CATEGORY = {
  VISA: 'VISA',
  INDUSTRY: 'INDUSTRY',
  KOREAN: 'KOREAN',
  MAJOR: 'MAJOR',
  NATIONALITY: 'NATIONALITY',
} as const;

export const EMPLOYEE_SEARCH_CATEGORY_KO = {
  [EMPLOYEE_SEARCH_CATEGORY.VISA]: '비자',
  [EMPLOYEE_SEARCH_CATEGORY.INDUSTRY]: '업직종',
  [EMPLOYEE_SEARCH_CATEGORY.KOREAN]: '한국어',
  [EMPLOYEE_SEARCH_CATEGORY.MAJOR]: '전공',
  [EMPLOYEE_SEARCH_CATEGORY.NATIONALITY]: '국가',
} as const;

// 인재 추천 검색 카테고리 별 옵션
export const EMPLOYEE_SEARCH_OPTIONS = {
  [EMPLOYEE_SEARCH_CATEGORY.VISA]: Visas,
  [EMPLOYEE_SEARCH_CATEGORY.KOREAN]: Koreans,
  [EMPLOYEE_SEARCH_CATEGORY.INDUSTRY]: Industrys,
  [EMPLOYEE_SEARCH_CATEGORY.MAJOR]: Majors,
  [EMPLOYEE_SEARCH_CATEGORY.NATIONALITY]: Nationalities,
} as const;

// 인재 추천 검색 시에 초기값
export const initialEmployerSearchFilterList: EmployeeSearchFilterItemType = {
  [EMPLOYEE_SEARCH_CATEGORY.VISA]: [],
  [EMPLOYEE_SEARCH_CATEGORY.KOREAN]: [],
  [EMPLOYEE_SEARCH_CATEGORY.INDUSTRY]: [],
  [EMPLOYEE_SEARCH_CATEGORY.MAJOR]: [],
  [EMPLOYEE_SEARCH_CATEGORY.NATIONALITY]: [],
};
