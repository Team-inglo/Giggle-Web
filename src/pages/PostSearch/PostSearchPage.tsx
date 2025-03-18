import TextFieldHeader from '@/components/Common/Header/TextFieldHeader';
import PostSearchFilterList from '@/components/PostSearch/PostSearchFilterList';
import PostSearchResult from '@/components/PostSearch/PostSearchResult';
import { UserType } from '@/constants/user';
import {
  useInfiniteGetPostGuestList,
  useInfiniteGetPostList,
} from '@/hooks/api/usePost';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { usePostSearch } from '@/hooks/usePostSearch';
import { useUserStore } from '@/store/user';
import { GetPostListReqType } from '@/types/api/post';
import { JobPostingItemType } from '@/types/common/jobPostingItem';
import {
  PostSearchFilterItemType,
  PostSortingType,
} from '@/types/PostSearchFilter/PostSearchFilterItem';
import { formatSearchFilter } from '@/utils/formatSearchFilter';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchSortDropdown from '@/components/Common/SearchSortDropdown';
import { POST_SORTING, POST_SORTING_KR } from '@/constants/postSearch';
import { postSearchTranslation } from '../../constants/translation';
import { isEmployerByAccountType } from '@/utils/signup';

const PostSearchPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { searchOption, updateSearchText, updateFilterList, updateSortType } =
    usePostSearch(state);

  const { account_type } = useUserStore();

  const [searchParams, setSearchParams] = useState<GetPostListReqType>(
    formatSearchFilter(
      searchOption.searchText,
      searchOption.sortType,
      searchOption.filterList,
    ),
  );

  const [postData, setPostData] = useState<JobPostingItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    data: guestPostData,
    fetchNextPage: guestFetchNextPage,
    hasNextPage: guesthasNextPage,
    isFetchingNextPage: guestIsFetchingNextPage,
    isLoading: guestIsInitialLoading,
  } = useInfiniteGetPostGuestList(searchParams, !account_type ? true : false);

  const {
    data: userPostData,
    fetchNextPage: userFetchNextPage,
    hasNextPage: userhasNextPage,
    isFetchingNextPage: userIsFetchingNextPage,
    isLoading: postIsInitialLoading,
  } = useInfiniteGetPostList(searchParams, account_type ? true : false);

  const data = account_type ? userPostData : guestPostData;
  const isInitialLoading = account_type
    ? postIsInitialLoading
    : guestIsInitialLoading;
  const fetchNextPage = account_type ? userFetchNextPage : guestFetchNextPage;
  const hasNextPage = account_type ? userhasNextPage : guesthasNextPage;
  const isFetchingNextPage = account_type
    ? userIsFetchingNextPage
    : guestIsFetchingNextPage;

  const onClickSearch = (text: string) => {
    updateSearchText(text);
    const newSearchParams = formatSearchFilter(
      text,
      searchOption.sortType,
      searchOption.filterList,
    );
    setSearchParams(newSearchParams);
  };

  const handleUpdateFilterList = (newFilterList: PostSearchFilterItemType) => {
    updateFilterList(newFilterList);
    const newSearchParams = formatSearchFilter(
      searchOption.searchText,
      searchOption.sortType,
      newFilterList,
    );
    setSearchParams(newSearchParams);
  };

  const onChangeSortType = (selectedSortType: PostSortingType) => {
    updateSortType(selectedSortType);
    setSearchParams((prev) => ({ ...prev, sorting: selectedSortType }));
  };

  const goToPostSearchFilterPage = () => {
    navigate(`/search/filter`, { state: searchOption });
  };

  const targetRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      setIsLoading(true);
      fetchNextPage().finally(() => setIsLoading(false));
    }
  }, !!hasNextPage);

  useEffect(() => {
    if (data && data.pages.length > 0) {
      const result = data.pages.flatMap((page) => page.data.job_posting_list);
      setPostData(result);
    }
  }, [data]);

  // 새로 고침 시에 검색필터를 모두 초기화 위해 사용
  useEffect(() => {
    const isReload =
      (
        performance.getEntriesByType(
          'navigation',
        )[0] as PerformanceNavigationTiming
      )?.type === 'reload';

    if (isReload) {
      navigate('/search', {
        state: {},
        replace: true,
      });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <TextFieldHeader
        handleSearch={onClickSearch}
        placeholder={
          account_type === UserType.OWNER
            ? '이름으로 검색'
            : 'Search for job posting name'
        }
        initialValue={searchOption.searchText}
        handleClickFilter={goToPostSearchFilterPage}
      />
      <PostSearchFilterList
        filterList={searchOption.filterList}
        handleUpdateFilterList={handleUpdateFilterList}
      />
      <section className="flex-1 flex flex-col items-center w-full pb-24">
        <div className="w-full py-4 px-6 flex justify-between items-center">
          <h3 className="caption text-text-alternative">
            {postData.length}{' '}
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
                ? POST_SORTING_KR[searchOption.sortType as PostSortingType]
                : searchOption.sortType.toLowerCase()
            }
            onSelect={(value) => onChangeSortType(value as PostSortingType)}
          />
        </div>
        <PostSearchResult
          postData={postData}
          isLoading={isLoading}
          isInitialLoading={isInitialLoading}
        />
      </section>
      <div ref={targetRef} className="h-1"></div>
    </div>
  );
};

export default PostSearchPage;
