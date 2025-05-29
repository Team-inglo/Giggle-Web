import {
  EMPLOYEE_SEARCH_CATEGORY,
  EMPLOYEE_SEARCH_CATEGORY_KO,
} from '@/constants/employee';

export type EmployeeSearchCategoryEnType =
  keyof typeof EMPLOYEE_SEARCH_CATEGORY; // 'VISA' | 'INDUSTRY' | ...
export type EmployeeSearchCategoryKoType =
  (typeof EMPLOYEE_SEARCH_CATEGORY_KO)[EmployeeSearchCategoryEnType]; // '비자' | '업직종' | ...

export type EmployeeSearchFilterItemType = {
  [key in EmployeeSearchCategoryEnType]: string[];
};
