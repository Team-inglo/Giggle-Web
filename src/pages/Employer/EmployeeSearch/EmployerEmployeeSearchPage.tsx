import BaseHeader from '@/components/Common/Header/BaseHeader';
import ResetIcon from '@/assets/icons/ResetIcon.svg?react';
import {
  EMPLOYEE_SEARCH_CATEGORY,
  EMPLOYEE_SEARCH_CATEGORY_KO,
  EMPLOYEE_SEARCH_OPTIONS,
  initialEmployerSearchFilterList,
} from '@/constants/manageResume';
import { useState } from 'react';
import { POST_SORTING, POST_SORTING_KR } from '@/constants/postSearch';
import {
  EmployeeSearchCategoryEnType,
  EmployeeSearchFilterItemType,
} from '@/types/api/resumes';
import { PostSortingType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import EmployerEmployeeSearchSortBottomSheet from '@/components/Employer/EmployeeSearch/EmployerEmployeeSearchSortBottomSheet';
import DownArrowIcon from '@/assets/icons/PostSearch/DownArrowIconSm.svg?react';
import EmployerEmployeeSearchFilterBottomSheet from '@/components/Employer/EmployeeSearch/EmployerEmployeeSearchFilterBottomSheet';
import { useInfiniteGetEmployeeResumeList } from '@/hooks/api/useResume';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { formatResumeSearchFilter } from '@/utils/formatSearchFilter';
import EmployerEmployeeCardList from '@/components/Employer/EmployeeSearch/EmployerEmployeeCardList';
import useNavigateBack from '@/hooks/useNavigateBack';
import Icon from '@/components/Common/Icon';
import Chip from '@/components/Common/Chip';
import { ChipState } from '@/types/common/chip';

export type EmployeeSearchOptionType = {
  filterList: EmployeeSearchFilterItemType;
  sortType: PostSortingType;
};

const EmployerEmployeeSearchPage = () => {
  const { account_type } = useUserStore();
  const handleBackButtonClick = useNavigateBack();

  const [searchOption, setSearchOption] = useState<EmployeeSearchOptionType>({
    sortType: POST_SORTING.RECENT,
    filterList: initialEmployerSearchFilterList,
  });

  const [selectedFilterType, setSelectedFilterType] =
    useState<EmployeeSearchCategoryEnType>(EMPLOYEE_SEARCH_CATEGORY.VISA);
  const [isOpenSortBottomSheet, setIsOpenSortBottomSheet] = useState(false);
  const [isOpenFilterBottomSheet, setIsOpenFilterBottomSheet] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isInitialLoading,
  } = useInfiniteGetEmployeeResumeList(
    formatResumeSearchFilter(searchOption),
    account_type === UserType.OWNER,
  );

  const resumeData = data?.pages?.flatMap((page) => page.data.resumes) || [];

  const targetRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      setIsLoading(true);
      fetchNextPage().finally(() => setIsLoading(false));
    }
  }, !!hasNextPage);

  const handleClickSort = (selectedSort: PostSortingType) => {
    setSearchOption((prev) => ({ ...prev, sortType: selectedSort }));
    setIsOpenSortBottomSheet(false);
  };

  const handleOpenFilter = (filterType: EmployeeSearchCategoryEnType) => {
    setSelectedFilterType(filterType);
    setIsOpenFilterBottomSheet(true);
  };

  const handleChangeFilter = (newFilterList: EmployeeSearchFilterItemType) => {
    setSearchOption((prev) => ({ ...prev, filterList: newFilterList }));
  };

  return (
    <>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={handleBackButtonClick}
        hasMenuButton={false}
        title={'인재찾기'}
      />
      <nav className="relative w-full">
        <div className="w-full py-2 px-4 flex items-center gap-1 overflow-x-scroll whitespace-nowrap no-scrollbar">
          <button
            className="mr-1 p-3 border border-border-disabled rounded-[3.125rem]"
            onClick={() => handleChangeFilter(initialEmployerSearchFilterList)}
          >
            <ResetIcon />
          </button>
          {Object.keys(EMPLOYEE_SEARCH_OPTIONS).map((category) => {
            const isSelected =
              searchOption.filterList[category as EmployeeSearchCategoryEnType]
                .length > 0;
            return (
              <Chip
                key={category}
                state={isSelected ? ChipState.ACTIVE : ChipState.DEFAULT}
                text={
                  EMPLOYEE_SEARCH_CATEGORY_KO[
                    category as EmployeeSearchCategoryEnType
                  ] +
                  (isSelected
                    ? ` ${searchOption.filterList[category as EmployeeSearchCategoryEnType].length}`
                    : '')
                }
                isDropdown={true}
                onClick={() =>
                  handleOpenFilter(category as EmployeeSearchCategoryEnType)
                }
              />
            );
          })}
        </div>
        <div className="absolute top-0 right-0 h-14 pl-12 pr-2 py-1 bg-gradient-to-r from-white/20 to-white/70"></div>
      </nav>
      <section className="w-full py-1 px-4 flex justify-between items-center">
        <h3 className="body-3 text-text-assistive body-14-regular">
          {resumeData.length}개의 검색결과
        </h3>
        <button
          onClick={() => setIsOpenSortBottomSheet(true)}
          className="flex items-center gap-1 text-text-assistive body-3 body-14-medium"
        >
          {POST_SORTING_KR[searchOption.sortType]}
          <div
            className={` transition-transform duration-300 ${
              isOpenSortBottomSheet && 'rotate-180'
            }`}
          >
            <Icon icon={DownArrowIcon} strokeColor={'stroke-text-assistive'} />
          </div>
        </button>
      </section>
      <EmployerEmployeeCardList
        resumeData={resumeData}
        isLoading={isLoading}
        isInitialLoading={isInitialLoading}
      />
      <div ref={targetRef} className="h-1"></div>
      <EmployerEmployeeSearchSortBottomSheet
        selectedSort={searchOption.sortType}
        handleClickSort={handleClickSort}
        isShowBottomsheet={isOpenSortBottomSheet}
        setIsShowBottomSheet={setIsOpenSortBottomSheet}
      />
      <EmployerEmployeeSearchFilterBottomSheet
        filterType={selectedFilterType}
        filterList={searchOption.filterList}
        handleChangeFilter={handleChangeFilter}
        isShowBottomsheet={isOpenFilterBottomSheet}
        setIsShowBottomSheet={setIsOpenFilterBottomSheet}
      />
    </>
  );
};

export default EmployerEmployeeSearchPage;
