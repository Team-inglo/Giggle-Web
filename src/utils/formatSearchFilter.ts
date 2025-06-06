import { EMPLOYEE_SEARCH_CATEGORY } from '@/constants/manageResume';
import {
  FILTER_CATEGORY,
  initialFilterList,
  POST_SEARCH_MENU,
} from '@/constants/postSearch';
import { EmployeeSearchFilterItemType } from '@/types/api/resumes';
import {
  PostSearchFilterItemType,
  PostSortingType,
} from '@/types/PostSearchFilter/PostSearchFilterItem';

// 공고 검색 시에 request 형식으로 변경
export const formatPostSearchFilter = ({
  searchText = '',
  postSortType = 'POPULAR',
  filterList = initialFilterList,
}: {
  searchText: string;
  postSortType: string;
  filterList: PostSearchFilterItemType;
}) => {
  const newSearchFilter = {
    size: 5,
    search: searchText ?? null,
    sorting: postSortType as PostSortingType | POST_SEARCH_MENU,
    region_1depth: filterList[FILTER_CATEGORY.REGION_1DEPTH].join(','),
    region_2depth: filterList[FILTER_CATEGORY.REGION_2DEPTH]
      .map((value) => (value === '전체' ? 'none' : value))
      .join(','),
    region_3depth: filterList[FILTER_CATEGORY.REGION_3DEPTH]
      .map((value) => (value === '' || value === '전체' ? 'none' : value))
      .join(','),
    industry: filterList[FILTER_CATEGORY.INDUSTRY]
      .join(',')
      .toUpperCase()
      .replace(/\s+/g, '_'),
    work_period: filterList[FILTER_CATEGORY.WORK_PERIOD]
      .join(',')
      .toUpperCase()
      .replace(/\s+/g, '_'),
    work_days_per_week: filterList[FILTER_CATEGORY.WORK_DAYS_PER_WEEK]
      .join(',')
      .toUpperCase()
      .replace(/\s+/g, '_'),
    working_day: filterList[FILTER_CATEGORY.WORKING_DAY]
      .join(',')
      .toUpperCase()
      .replace(/\s+/g, '_'),
    working_hours: filterList[FILTER_CATEGORY.WORKING_HOURS]
      .join(',')
      .toUpperCase()
      .replace(/\s+/g, '_'),
    recruitment_period: filterList[FILTER_CATEGORY.RECRUITMENT_PERIOD]
      .join(',')
      .toUpperCase()
      .replace(/\s+/g, '_'),
    employment_type:
      filterList[FILTER_CATEGORY.EMPLOYMENT_TYPE]?.[0]?.toUpperCase() ?? null,
    visa:
      filterList[FILTER_CATEGORY.VISA]?.join(',')?.replace(/-/g, '_') ?? null,
  };

  return newSearchFilter;
};

// 커리어 검색 시에 request 형식으로 변경
export const formatCareerSearchFilter = ({
  searchText = '',
  careerSortType = 'POPULAR',
  careerCategory = [],
}: {
  searchText: string;
  careerSortType: string;
  careerCategory: string[];
}) => {
  const newSearchFilter = {
    size: 5,
    search: searchText ?? null,
    sorting: careerSortType as PostSortingType | POST_SEARCH_MENU,
    category: careerCategory.join(','),
  };

  return newSearchFilter;
};

// (고용주) 인재 이력서 검색 시에 request 형식으로 변경
export const formatResumeSearchFilter = ({
  sortType,
  filterList,
}: {
  sortType: PostSortingType;
  filterList: EmployeeSearchFilterItemType;
}) => {
  const newSearchFilter = {
    size: 5,
    sorting: sortType,
    visa:
      filterList[EMPLOYEE_SEARCH_CATEGORY.VISA]
        ?.join(',')
        ?.replace(/-/g, '_') ?? null,
    korean: filterList[EMPLOYEE_SEARCH_CATEGORY.KOREAN]?.join(',') ?? null,
    major: filterList[EMPLOYEE_SEARCH_CATEGORY.MAJOR]?.join(',') ?? null,
    nationality:
      filterList[EMPLOYEE_SEARCH_CATEGORY.NATIONALITY]?.join(',') ?? null,
    industry: filterList[EMPLOYEE_SEARCH_CATEGORY.INDUSTRY]?.join(',') ?? null,
  };

  return newSearchFilter;
};
