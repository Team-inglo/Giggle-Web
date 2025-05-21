import { FILTER_CATEGORY, POST_SORTING } from '@/constants/postSearch';

export type PostSearchFilterItemType = {
  [key in FILTER_CATEGORY]: string[];
};

export type PostSortingType = keyof typeof POST_SORTING;

export type RegionDataType = {
  [key: string]: {
    [key: string]: string[];
  };
};