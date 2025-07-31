import CareerCardList from '@/components/PostSearch/CareerCardList';
import SearchSortDropdown from '@/components/Common/SearchSortDropdown';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { PostSearchType } from '@/hooks/usePostSearch';
import { useUserStore } from '@/store/user';
import { PostSortingType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import {
  formatCareerSearchFilterForUser,
  formatCareerSearchFilterForGuest,
} from '@/utils/formatSearchFilter';
import { useState } from 'react';
import { postSearchTranslation } from '@/constants/translation';
import { isEmployerByAccountType } from '@/utils/signup';
import {
  CAREER_CATEGORY,
  POST_SORTING,
  POST_SORTING_KR,
} from '@/constants/postSearch';
import { UserType } from '@/constants/user';
import {
  useInfiniteGetCareerGuestList,
  useInfiniteGetCareerList,
} from '@/hooks/api/useCareer';
import Chip from '@/components/Common/Chip';
import { ChipState } from '@/types/common/chip';

type CareerCategoryKey = keyof typeof CAREER_CATEGORY;

type CareerSearchSectionProps = {
  searchOption: PostSearchType;
  updateSearchOption: <K extends keyof PostSearchType>(
    key: K,
    value: PostSearchType[K],
  ) => void;
};

const CareerSearchSection = ({
  searchOption,
  updateSearchOption,
}: CareerSearchSectionProps) => {
  const { account_type } = useUserStore();
  const isLogin = account_type === UserType.USER;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 게스트 요청
  const {
    data: guestCareerData,
    fetchNextPage: guestFetchNextPage,
    hasNextPage: guestHasNextPage,
    isFetchingNextPage: guestIsFetchingNextPage,
    isLoading: guestIsInitialLoading,
  } = useInfiniteGetCareerGuestList(
    formatCareerSearchFilterForGuest({
      page: 1,
      size: 5,
      searchText: searchOption.searchText,
      careerSortType: searchOption.careerSortType,
      careerCategory: searchOption.careerCategory,
    }),
    !isLogin,
  );

  // 유저 요청
  const {
    data: userCareerData,
    fetchNextPage: userFetchNextPage,
    hasNextPage: userHasNextPage,
    isFetchingNextPage: userIsFetchingNextPage,
    isLoading: userIsInitialLoading,
  } = useInfiniteGetCareerList(
    formatCareerSearchFilterForUser({
      page: 1,
      size: 5,
      searchText: searchOption.searchText,
      careerSortType: searchOption.careerSortType,
      careerCategory: searchOption.careerCategory,
      isBookMarked: false,
    }),
    isLogin,
  );

  const data = isLogin ? userCareerData : guestCareerData;
  const careerData =
    data?.pages?.flatMap((page) => page.data.career_list) || [];
  const isInitialLoading = isLogin
    ? userIsInitialLoading
    : guestIsInitialLoading;
  const fetchNextPage = isLogin ? userFetchNextPage : guestFetchNextPage;
  const hasNextPage = isLogin ? userHasNextPage : guestHasNextPage;
  const isFetchingNextPage = isLogin
    ? userIsFetchingNextPage
    : guestIsFetchingNextPage;

  const targetRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      setIsLoading(true);
      fetchNextPage().finally(() => setIsLoading(false));
    }
  }, !!hasNextPage);

  const handleUpdateCareerCategory = (category: CareerCategoryKey) => {
    const categorySet = new Set(searchOption.careerCategory);
    if (categorySet.has(category)) categorySet.delete(category);
    else categorySet.add(category);
    updateSearchOption('careerCategory', [...categorySet]);
  };

  const onChangeSortType = (selectedSortType: PostSortingType) => {
    updateSearchOption('careerSortType', selectedSortType);
  };

  return (
    <>
      <nav className="flex items-center w-full gap-2 px-4 py-3 overflow-x-scroll min-h-8 whitespace-nowrap no-scrollbar">
        {Object.entries(CAREER_CATEGORY).map(([key, label]) => {
          const isSelected = searchOption.careerCategory.includes(key);
          return (
            <Chip
              key={key}
              state={isSelected ? ChipState.ACTIVE : ChipState.PRESSED}
              text={label}
              onClick={() =>
                handleUpdateCareerCategory(key as CareerCategoryKey)
              }
            />
          );
        })}
      </nav>
      <section className="flex-1 flex flex-col items-center w-full pb-24">
        <div className="w-full py-2 px-4 flex justify-between items-center border-b border-border-disabled">
          <h3 className="caption-12-regular text-text-normal">
            {careerData.length}{' '}
            {
              postSearchTranslation.searchResults[
                isEmployerByAccountType(account_type)
              ]
            }
          </h3>
          <SearchSortDropdown
            options={Object.values(POST_SORTING).map((value) =>
              account_type === UserType.OWNER
                ? POST_SORTING_KR[value]
                : value.toLowerCase(),
            )}
            value={
              account_type === UserType.OWNER
                ? POST_SORTING_KR[
                    searchOption.careerSortType as PostSortingType
                  ]
                : searchOption.careerSortType.toLowerCase()
            }
            onSelect={(value) => onChangeSortType(value as PostSortingType)}
          />
        </div>
        <CareerCardList
          careerData={careerData}
          isLoading={isLoading}
          isInitialLoading={isInitialLoading}
        />
      </section>
      <div ref={targetRef} className="h-1"></div>
    </>
  );
};

export default CareerSearchSection;
