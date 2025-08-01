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

// 공통 유틸
const safeJoin = (arr?: string[], separator = ',') =>
  (arr ?? []).join(separator);

// ---------------------------------------------------
// 1. 공고 검색 (Job Posting)
// ---------------------------------------------------

// 입력용 타입 (Input)
type PostSearchInput = {
  searchText: string;
  postSortType: string;
  filterList: PostSearchFilterItemType;
};

// 최종 API Request 타입
type PostSearchRequest = {
  size: number;
  search: string | null;
  sorting: PostSortingType | POST_SEARCH_MENU;
  region_1depth: string;
  region_2depth: string;
  region_3depth: string;
  industry: string;
  work_period: string;
  work_days_per_week: string;
  working_day: string;
  working_hours: string;
  recruitment_period: string;
  employment_type: string | null;
  visa: string | null;
};

export const formatPostSearchFilter = ({
  searchText = '',
  postSortType = 'POPULAR',
  filterList = initialFilterList,
}: PostSearchInput): PostSearchRequest => {
  return {
    size: 5,
    search: searchText ?? null,
    sorting: postSortType as PostSortingType | POST_SEARCH_MENU,
    region_1depth: safeJoin(filterList[FILTER_CATEGORY.REGION_1DEPTH]),
    region_2depth: safeJoin(
      filterList[FILTER_CATEGORY.REGION_2DEPTH]?.map((v) =>
        v === '전체' ? 'none' : v,
      ),
    ),
    region_3depth: safeJoin(
      filterList[FILTER_CATEGORY.REGION_3DEPTH]?.map((v) =>
        v === '' || v === '전체' ? 'none' : v,
      ),
    ),
    industry: safeJoin(filterList[FILTER_CATEGORY.INDUSTRY])
      .toUpperCase()
      .replace(/\s+/g, '_'),
    work_period: safeJoin(filterList[FILTER_CATEGORY.WORK_PERIOD])
      .toUpperCase()
      .replace(/\s+/g, '_'),
    work_days_per_week: safeJoin(filterList[FILTER_CATEGORY.WORK_DAYS_PER_WEEK])
      .toUpperCase()
      .replace(/\s+/g, '_'),
    working_day: safeJoin(filterList[FILTER_CATEGORY.WORKING_DAY])
      .toUpperCase()
      .replace(/\s+/g, '_'),
    working_hours: safeJoin(filterList[FILTER_CATEGORY.WORKING_HOURS])
      .toUpperCase()
      .replace(/\s+/g, '_'),
    recruitment_period: safeJoin(filterList[FILTER_CATEGORY.RECRUITMENT_PERIOD])
      .toUpperCase()
      .replace(/\s+/g, '_'),
    employment_type:
      filterList[FILTER_CATEGORY.EMPLOYMENT_TYPE]?.[0]?.toUpperCase() ?? null,
    visa: safeJoin(filterList[FILTER_CATEGORY.VISA]).replace(/-/g, '_') ?? null,
  };
};

// ---------------------------------------------------
// 2. 커리어 검색 (Career) - User
// ---------------------------------------------------
type CareerUserInput = {
  searchText?: string;
  careerSortType?: string;
  careerCategory?: string[];
  isBookMarked?: boolean;
  page?: number;
  size: number;
};

type CareerUserRequest = {
  size: number;
  page: number;
  search: string | null;
  sorting: PostSortingType | POST_SEARCH_MENU;
  category: string | null;
  isBookMarked: boolean;
};

export const formatCareerSearchFilterForUser = (
  input: CareerUserInput,
): CareerUserRequest => {
  const {
    searchText = '',
    careerSortType = 'POPULAR',
    careerCategory = [],
    isBookMarked = false,
    page = 1,
  } = input;

  return {
    size: 5,
    page,
    search: searchText ?? null,
    sorting: careerSortType as PostSortingType | POST_SEARCH_MENU,
    category: careerCategory.length > 0 ? careerCategory.join(',') : null,
    isBookMarked,
  };
};

// ---------------------------------------------------
// 3. 커리어 검색 (Career) - Guest
// ---------------------------------------------------
type CareerGuestInput = {
  searchText?: string;
  careerSortType?: string;
  careerCategory?: string[];
  page?: number;
  size: number;
};

type CareerGuestRequest = {
  size: number;
  page: number;
  search: string | null;
  sorting: PostSortingType | POST_SEARCH_MENU;
  category: string | null;
};

export const formatCareerSearchFilterForGuest = (
  input: CareerGuestInput,
): CareerGuestRequest => {
  const {
    searchText = '',
    careerSortType = 'POPULAR',
    careerCategory = [],
    page = 1,
  } = input;

  return {
    size: 5,
    page,
    search: searchText ?? null,
    sorting: careerSortType as PostSortingType | POST_SEARCH_MENU,
    category: careerCategory.length > 0 ? careerCategory.join(',') : null,
  };
};

// ---------------------------------------------------
// 4. 이력서 검색 (Resume)
// ---------------------------------------------------
type ResumeSearchInput = {
  sortType: PostSortingType;
  filterList: EmployeeSearchFilterItemType;
};

type ResumeSearchRequest = {
  size: number;
  sorting: PostSortingType;
  visa: string | null;
  korean: string | null;
  major: string | null;
  nationality: string | null;
  industry: string | null;
};

export const formatResumeSearchFilter = ({
  sortType,
  filterList,
}: ResumeSearchInput): ResumeSearchRequest => {
  return {
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
};
