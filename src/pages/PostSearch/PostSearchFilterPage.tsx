import BaseHeader from '@/components/Common/Header/BaseHeader';
import PostSearchFilterButtons from '@/components/PostSearchFilter/PostSearchFilterButtons';
import PostSearchFilterAreaInput from '@/components/PostSearchFilter/PostSearchFilterAreaInput';
import { useState } from 'react';
import { FILTER_CATEGORY_OPTIONS } from '@/constants/postSearch';
import PostSearchFilterList from '@/components/PostSearchFilter/PostSearchFilterList';
import { PostSearchFilterItemType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import PostSearchFilterArea from '@/components/PostSearchFilter/PostSearchFilterArea';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePostSearch } from '@/hooks/usePostSearch';

const PostSearchFilterPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { searchOption, updateFilterList } = usePostSearch(state);

  const [filterList, setFilterList] = useState<PostSearchFilterItemType>(
    searchOption.filterList,
  );
  const [isOpenAreaFilter, setIsOpenAreaFilter] = useState<boolean>(false);

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
          setIsOpenAreaFilter={setIsOpenAreaFilter}
          filterList={filterList}
          setFilterList={setFilterList}
        />
      ) : (
        // 정렬 선택 페이지
        <>
          <BaseHeader
            hasBackButton={true}
            onClickBackButton={goToPostSearchPage}
            hasMenuButton={false}
            title={'Filtering'}
          />
          <section className="flex flex-col gap-8 w-full p-4">
            <PostSearchFilterAreaInput
              setIsOpenAreaFilter={setIsOpenAreaFilter}
              filterList={filterList}
              setFilterList={setFilterList}
            />
            <PostSearchFilterList
              showCategories={Object.entries(FILTER_CATEGORY_OPTIONS)}
              filterList={filterList}
              setFilterList={setFilterList}
            />
          </section>
          <PostSearchFilterButtons
            setFilterList={setFilterList}
            onClickApply={onClickApply}
          />
        </>
      )}
    </>
  );
};

export default PostSearchFilterPage;
