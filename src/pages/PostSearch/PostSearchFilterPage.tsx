import BaseHeader from '@/components/Common/Header/BaseHeader';
import PostSearchFilterButtons from '@/components/PostSearchFilter/PostSearchFilterButtons';
import PostSearchFilterAreaInput from '@/components/PostSearchFilter/PostSearchFilterAreaInput';
import { useCallback, useState } from 'react';
import PostSearchFilterList from '@/components/PostSearchFilter/PostSearchFilterList';
import { PostSearchFilterItemType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import PostSearchFilterArea from '@/components/PostSearchFilter/PostSearchFilterArea';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePostSearch } from '@/hooks/usePostSearch';
import { postSearchTranslation } from '@/constants/translation';
import { isEmployerByAccountType } from '@/utils/signup';
import { useUserStore } from '@/store/user';
import { FILTER_CATEGORY } from '@/constants/postSearch';

const PostSearchFilterPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { account_type } = useUserStore();
  const { searchOption, updateFilterList } = usePostSearch(state);

  const [filterList, setFilterList] = useState<PostSearchFilterItemType>(
    searchOption.filterList,
  );
  const [isOpenAreaFilter, setIsOpenAreaFilter] = useState<boolean>(false);

  const handleChangeFilterList = useCallback(
    (
      newValue:
        | PostSearchFilterItemType
        | ((prev: PostSearchFilterItemType) => PostSearchFilterItemType),
    ) => {
      setFilterList((prev) =>
        typeof newValue === 'function' ? newValue(prev) : newValue,
      );
    },
    [],
  );

  const handleChangeIsOpenAreaFilter = useCallback((value: boolean) => {
    setIsOpenAreaFilter(value);
  }, []);

  const goToPostSearchPage = () => {
    navigate(`/search`, { state: searchOption });
  };

  const onClickApply = () => {
    updateFilterList(filterList);
    navigate(`/search`, { state: { ...searchOption, filterList: filterList } });
  };

  return (
    <>
      {isOpenAreaFilter ? (
        // 지역 선택 페이지
        <PostSearchFilterArea
          setIsOpenAreaFilter={handleChangeIsOpenAreaFilter}
          filterList={filterList}
          setFilterList={handleChangeFilterList}
        />
      ) : (
        // 정렬 선택 페이지
        <>
          <BaseHeader
            hasBackButton={true}
            onClickBackButton={goToPostSearchPage}
            hasMenuButton={false}
            title={
              postSearchTranslation.postSearchTitle[
                isEmployerByAccountType(account_type)
              ]
            }
          />
          <section className="flex flex-col gap-8 w-full p-4">
            <PostSearchFilterAreaInput
              setIsOpenAreaFilter={handleChangeIsOpenAreaFilter}
              filterListRegion1={filterList[FILTER_CATEGORY.REGION_1DEPTH]}
              filterListRegion2={filterList[FILTER_CATEGORY.REGION_2DEPTH]}
              filterListRegion3={filterList[FILTER_CATEGORY.REGION_3DEPTH]}
              setFilterList={handleChangeFilterList}
            />
            <PostSearchFilterList
              filterList={filterList}
              setFilterList={handleChangeFilterList}
            />
          </section>
          <PostSearchFilterButtons
            setFilterList={handleChangeFilterList}
            onClickApply={onClickApply}
          />
        </>
      )}
    </>
  );
};

export default PostSearchFilterPage;
