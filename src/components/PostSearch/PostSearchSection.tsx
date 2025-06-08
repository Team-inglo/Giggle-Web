import {
  useInfiniteGetPostGuestList,
  useInfiniteGetPostList,
} from '@/hooks/api/usePost';
import PostSearchFilterList from '@/components/PostSearch/PostSearchFilterList';
import PostCardList from '@/components/PostSearch/PostCardList';
import SearchSortDropdown from '@/components/Common/SearchSortDropdown';
import FilterIcon from '@/assets/icons/FilterIcon.svg?react';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { PostSearchType } from '@/hooks/usePostSearch';
import { useUserStore } from '@/store/user';
import {
  PostSearchFilterItemType,
  PostSortingType,
} from '@/types/PostSearchFilter/PostSearchFilterItem';
import { formatPostSearchFilter } from '@/utils/formatSearchFilter';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postSearchTranslation } from '@/constants/translation';
import { isEmployerByAccountType } from '@/utils/signup';
import { POST_SORTING, POST_SORTING_KR } from '@/constants/postSearch';
import { UserType } from '@/constants/user';

type PostSearchSectionProps = {
  searchOption: PostSearchType;
  updateSearchOption: <K extends keyof PostSearchType>(
    key: K,
    value: PostSearchType[K],
  ) => void;
};

const PostSearchSection = ({
  searchOption,
  updateSearchOption,
}: PostSearchSectionProps) => {
  const navigate = useNavigate();

  const { account_type } = useUserStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    data: guestPostData,
    fetchNextPage: guestFetchNextPage,
    hasNextPage: guesthasNextPage,
    isFetchingNextPage: guestIsFetchingNextPage,
    isLoading: guestIsInitialLoading,
  } = useInfiniteGetPostGuestList(
    formatPostSearchFilter(searchOption),
    !account_type ? true : false,
  );

  const {
    data: userPostData,
    fetchNextPage: userFetchNextPage,
    hasNextPage: userhasNextPage,
    isFetchingNextPage: userIsFetchingNextPage,
    isLoading: postIsInitialLoading,
  } = useInfiniteGetPostList(
    formatPostSearchFilter(searchOption),
    account_type ? true : false,
  );

  const data = account_type ? userPostData : guestPostData;
  const postData =
    data?.pages?.flatMap((page) => page.data.job_posting_list) || [];
  const isInitialLoading = account_type
    ? postIsInitialLoading
    : guestIsInitialLoading;
  const fetchNextPage = account_type ? userFetchNextPage : guestFetchNextPage;
  const hasNextPage = account_type ? userhasNextPage : guesthasNextPage;
  const isFetchingNextPage = account_type
    ? userIsFetchingNextPage
    : guestIsFetchingNextPage;

  const goToPostSearchFilterPage = () => {
    navigate(`/search/filter`, { state: searchOption });
  };

  const targetRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      setIsLoading(true);
      fetchNextPage().finally(() => setIsLoading(false));
    }
  }, !!hasNextPage);

  const handleUpdateFilterList = (newFilterList: PostSearchFilterItemType) => {
    updateSearchOption('filterList', newFilterList);
  };

  const onChangeSortType = (selectedSortType: PostSortingType) => {
    updateSearchOption('postSortType', selectedSortType);
  };

  return (
    <>
      <section className="relative w-full">
        <PostSearchFilterList
          filterList={searchOption.filterList}
          handleUpdateFilterList={handleUpdateFilterList}
        />
        <div className="absolute top-0 right-0 pl-9 pr-2 py-1 bg-gradient-to-r from-white/30 to-white">
          <button
            className="min-w-6 min-h-6 p-2 rounded-full bg-surface-secondary"
            onClick={goToPostSearchFilterPage}
          >
            <FilterIcon />
          </button>
        </div>
      </section>
      <section className="flex-1 flex flex-col items-center w-full pb-24">
        <div className="w-full py-2 px-4 flex justify-between items-center">
          <h3 className="caption-12-regular text-text-normal">
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
                ? POST_SORTING_KR[searchOption.postSortType as PostSortingType]
                : searchOption.postSortType.toLowerCase()
            }
            onSelect={(value) => onChangeSortType(value as PostSortingType)}
          />
        </div>
        <PostCardList
          postData={postData}
          isLoading={isLoading}
          isInitialLoading={isInitialLoading}
        />
      </section>
      <div ref={targetRef} className="h-1"></div>
    </>
  );
};

export default PostSearchSection;
