import CareerCardList from '@/components/PostSearch/CareerCardList';
import SearchSortDropdown from '@/components/Common/SearchSortDropdown';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { PostSearchType } from '@/hooks/usePostSearch';
import { useUserStore } from '@/store/user';
import { PostSortingType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import { formatCareerSearchFilter } from '@/utils/formatSearchFilter';
import { useEffect, useState } from 'react';
import { postSearchTranslation } from '@/constants/translation';
import { isEmployerByAccountType } from '@/utils/signup';
import {
  CAREER_CATEGORY,
  POST_SORTING,
  POST_SORTING_KR,
} from '@/constants/postSearch';
import { UserType } from '@/constants/user';
import { CareerListItemType } from '@/types/api/career';
import {
  useInfiniteGetCareerGuestList,
  useInfiniteGetCareerList,
} from '@/hooks/api/useCareer';

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

  const [careerData, setCareerData] = useState<CareerListItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    data: guestCareerData,
    fetchNextPage: guestFetchNextPage,
    hasNextPage: guesthasNextPage,
    isFetchingNextPage: guestIsFetchingNextPage,
    isLoading: guestIsInitialLoading,
  } = useInfiniteGetCareerGuestList(
    formatCareerSearchFilter(searchOption),
    !account_type ? true : false,
  );

  const {
    data: userCareerData,
    fetchNextPage: userFetchNextPage,
    hasNextPage: userhasNextPage,
    isFetchingNextPage: userIsFetchingNextPage,
    isLoading: careerIsInitialLoading,
  } = useInfiniteGetCareerList(
    formatCareerSearchFilter(searchOption),
    account_type === UserType.USER ? true : false,
  );

  const data = account_type ? userCareerData : guestCareerData;
  const isInitialLoading = account_type
    ? careerIsInitialLoading
    : guestIsInitialLoading;
  const fetchNextPage = account_type ? userFetchNextPage : guestFetchNextPage;
  const hasNextPage = account_type ? userhasNextPage : guesthasNextPage;
  const isFetchingNextPage = account_type
    ? userIsFetchingNextPage
    : guestIsFetchingNextPage;

  const targetRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      setIsLoading(true);
      fetchNextPage().finally(() => setIsLoading(false));
    }
  }, !!hasNextPage);

  useEffect(() => {
    if (data && data.pages.length > 0) {
      const result = data.pages.flatMap((page) => page.data.career_list);
      setCareerData(result);
    }
  }, [data]);

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
      <nav className="w-full min-h-8 px-4 py-3 flex items-center gap-2 overflow-x-scroll whitespace-nowrap no-scrollbar">
        {Object.entries(CAREER_CATEGORY).map(([key, label]) => {
          const isSelected = searchOption.careerCategory.includes(key);

          return (
            <button
              key={key}
              className={`py-2 px-[0.875rem] rounded-[3.125rem] body-3 ${isSelected ? 'text-text-invert bg-surface-invert' : 'text-text-strong bg-surface-secondary'}`}
              onClick={() =>
                handleUpdateCareerCategory(key as CareerCategoryKey)
              }
            >
              {label}
            </button>
          );
        })}
      </nav>
      <section className="flex-1 flex flex-col items-center w-full pb-24">
        <div className="w-full py-2 px-4 flex justify-between items-center">
          <h3 className="body-3 text-text-normal">
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
