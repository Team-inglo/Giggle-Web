import BaseHeader from '@/components/Common/Header/BaseHeader';
import { LoadingItem } from '@/components/Common/LoadingItem';
import SearchSortDropdown from '@/components/Common/SearchSortDropdown';
import EmployerPostCardList from '@/components/Employer/Post/EmployerPostCardList';
import {
  KO_ASCENDING_SORT_TYPE,
  MATCH_KO_EN_ASCENDING_SORT,
} from '@/constants/sort';
import { useGetEmployerPostList } from '@/hooks/api/usePost';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { KoAscendingSortType } from '@/types/common/sort';
import { EmployerPostItemType } from '@/types/post/employerPostItem';
import { useEffect, useState } from 'react';

const EmployerPostPage = () => {
  const [selectedSort, setSelectedSort] = useState<KoAscendingSortType>(
    KO_ASCENDING_SORT_TYPE.DESCENDING,
  );

  const [postListData, setPostListData] = useState<EmployerPostItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isInitialLoading,
  } = useGetEmployerPostList({
    size: 10,
    sorting: MATCH_KO_EN_ASCENDING_SORT[selectedSort],
  });

  const targetRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      setIsLoading(true);
      fetchNextPage().finally(() => setIsLoading(false));
    }
  }, !!hasNextPage);

  useEffect(() => {
    if (data && data.pages.length > 0) {
      const result = data.pages.flatMap((page) => page.data.job_posting_list);
      setPostListData(result);
    }
  }, [data]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <BaseHeader
        hasBackButton={false}
        hasMenuButton={false}
        title="내 공고 관리"
      />
      <section className="w-full bg-surface-base">
        <div className="px-4 py-[3.125rem]">
          <h1 className="pb-2 head-1 text-text-strong">
            내가 올린 공고를
            <br />
            관리할 수 있어요
          </h1>
          <p className="body-2 text-text-alternative">
            등록한 공고를 한눈에 확인하고,
            <br />
            지원자 현황도 살펴보세요!
          </p>
        </div>
        <div className="w-full p-4 flex justify-between items-center">
          <h3 className="caption text-text-alternative">
            {postListData.length} 개의 공고
          </h3>
          <SearchSortDropdown
            options={Object.values(KO_ASCENDING_SORT_TYPE)}
            value={selectedSort}
            onSelect={(sort) => setSelectedSort(sort as KoAscendingSortType)}
          />
        </div>
      </section>
      <EmployerPostCardList
        postListData={postListData}
        isInitialLoading={isInitialLoading}
      />
      {isLoading && <LoadingItem />}
      <div ref={targetRef} className="h-1"></div>
    </div>
  );
};

export default EmployerPostPage;
