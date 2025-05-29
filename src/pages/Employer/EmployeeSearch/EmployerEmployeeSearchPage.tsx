import BaseHeader from '@/components/Common/Header/BaseHeader';
import { useNavigate } from 'react-router-dom';
import ResetIcon from '@/assets/icons/ResetIcon.svg?react';
import {
  EMPLOYEE_SEARCH_CATEGORY,
  EMPLOYEE_SEARCH_CATEGORY_KO,
  EMPLOYEE_SEARCH_OPTIONS,
  initialEmployerSearchFilterList,
} from '@/constants/employee';
import { useState } from 'react';
import { POST_SORTING, POST_SORTING_KR } from '@/constants/postSearch';
import {
  EmployeeSearchCategoryEnType,
  EmployeeSearchFilterItemType,
} from '@/types/api/employee';
import { PostSortingType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import EmployerEmployeeSearchSortBottomSheet from '@/components/Employer/EmployeeSearch/EmployerEmployeeSearchSortBottomSheet';
import DownArrowIcon from '@/assets/icons/PostSearch/DownArrowIcon.svg?react';
import EmployerEmployeeSearchFilterBottomSheet from '@/components/Employer/EmployeeSearch/EmployerEmployeeSearchFilterBottomSheet';
import DisclosureIcon from '@/assets/icons/DisclosureIcon';

export type EmployeeSearchOptionType = {
  filterList: EmployeeSearchFilterItemType;
  sortType: PostSortingType;
};

const EmployerEmployeeSearchPage = () => {
  const navigate = useNavigate();

  const [searchOption, setSearchOption] = useState<EmployeeSearchOptionType>({
    sortType: POST_SORTING.RECENT,
    filterList: initialEmployerSearchFilterList,
  });

  const [selectedFilterType, setSelectedFilterType] =
    useState<EmployeeSearchCategoryEnType>(EMPLOYEE_SEARCH_CATEGORY.VISA);
  const [isOpenSortBottomSheet, setIsOpenSortBottomSheet] = useState(false);
  const [isOpenFilterBottomSheet, setIsOpenFilterBottomSheet] = useState(false);

  const goToHomePage = () => {
    navigate(`/`);
  };

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
        onClickBackButton={goToHomePage}
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
              <button
                key={category}
                className={`flex items-center py-2 pl-[0.875rem] pr-[0.625rem] border border-border-disabled rounded-[3.125rem] ${isSelected ? 'bg-surface-invert text-text-invert' : 'text-text-alternative'}`}
                onClick={() =>
                  handleOpenFilter(category as EmployeeSearchCategoryEnType)
                }
              >
                <p>
                  {
                    EMPLOYEE_SEARCH_CATEGORY_KO[
                      category as EmployeeSearchCategoryEnType
                    ]
                  }
                  {isSelected &&
                    `${' '}${searchOption.filterList[category as EmployeeSearchCategoryEnType].length}`}
                </p>
                <DisclosureIcon strokeColor={isSelected ? '#fff' : '#8F919D'} />
              </button>
            );
          })}
        </div>
        <div className="absolute top-0 right-0 h-14 pl-12 pr-2 py-1 bg-gradient-to-r from-white/20 to-white/70"></div>
      </nav>
      <section className="w-full py-1 px-4 flex justify-between items-center">
        <h3 className="body-3 text-text-assistive">1개의 검색결과</h3>
        <button
          onClick={() => setIsOpenSortBottomSheet(true)}
          className="flex items-center gap-1 text-text-assistive body-3"
        >
          {POST_SORTING_KR[searchOption.sortType]}
          <div
            className={` transition-transform duration-300 ${
              isOpenSortBottomSheet && 'rotate-180'
            }`}
          >
            <DownArrowIcon />
          </div>
        </button>
      </section>
      <main>검색 결과 보여주기</main>
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
