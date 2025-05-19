import { useState } from 'react';
import {
  initialFilterList,
  POST_SEARCH_MENU,
  POST_SORTING,
} from '@/constants/postSearch';
import {
  PostSearchFilterItemType,
  PostSortingType,
} from '@/types/PostSearchFilter/PostSearchFilterItem';

export type PostSearchType = {
  searchText: string;
  postSortType: PostSortingType | POST_SEARCH_MENU;
  careerSortType: PostSortingType | POST_SEARCH_MENU;
  filterList: PostSearchFilterItemType;
  careerCategory: string[];
};

export const usePostSearch = (initialState: Partial<PostSearchType> = {}) => {
  const [state, setState] = useState<PostSearchType>({
    searchText: initialState?.searchText ?? '',
    postSortType: initialState?.postSortType ?? POST_SORTING.RECENT,
    careerSortType: initialState?.careerSortType ?? POST_SORTING.RECENT,
    filterList: initialState?.filterList ?? initialFilterList,
    careerCategory: initialState?.careerCategory ?? [],
  });

  const updateSearchOption = <K extends keyof PostSearchType>(
    key: K,
    value: PostSearchType[K],
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  return {
    searchOption: state,
    updateSearchOption,
  };
};
