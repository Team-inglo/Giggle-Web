import {
  FILTER_CATEGORY,
  initialFilterList,
  POST_SEARCH_MENU,
} from '@/constants/postSearch';
import {
  PostSearchFilterItemType,
  PostSortingType,
} from '@/types/PostSearchFilter/PostSearchFilterItem';

export const formatSearchFilter = (
  searchText: string = '',
  sortType: string = 'POPULAR',
  filterList: PostSearchFilterItemType = initialFilterList,
) => {
  const newSearchFilter = {
    size: 5,
    search: searchText ?? null,
    sorting: sortType as PostSortingType | POST_SEARCH_MENU,
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
