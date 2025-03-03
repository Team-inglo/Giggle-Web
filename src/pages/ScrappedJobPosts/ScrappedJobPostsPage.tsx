import BaseHeader from '@/components/Common/Header/BaseHeader';
import LoadingItem from '@/components/Common/LoadingItem';
import LoadingPostItem from '@/components/Common/LoadingPostItem';
import { POST_SEARCH_MENU } from '@/constants/postSearch';
import { useInfiniteGetPostList } from '@/hooks/api/usePost';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import useNavigateBack from '@/hooks/useNavigateBack';
import { useUserStore } from '@/store/user';
import { JobPostingItemType } from '@/types/common/jobPostingItem';
import { useEffect, useState } from 'react';
import EmptyJobIcon from '@/assets/icons/EmptyJobIcon.svg?react';
import JobPostingCard from '@/components/Common/JobPostingCard';

const ScrappedJobPostList = ({
  jobPostingData,
}: {
  jobPostingData: JobPostingItemType[];
}) => {
  if (jobPostingData?.length === 0) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center gap-1">
        <EmptyJobIcon />
        <h3 className="head-2 text-[#252525]">No saved jobs yet!</h3>
        <p className="body-2 text-[#9397A1] text-center">
          Save jobs you like and apply later with one click!
        </p>
      </div>
    );
  }

  return (
    <>
      {jobPostingData.map((post) => (
        <JobPostingCard key={post.id} jobPostingData={post} />
      ))}
    </>
  );
};

const ScrappedJobPostsPage = () => {
  const handleBackButtonClick = useNavigateBack();
  const { account_type } = useUserStore();
  const isLogin = !!account_type;

  const [jobPostingData, setJobPostingData] = useState<JobPostingItemType[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 관심 공고
  const bookmarkedDataRequest = {
    size: 10,
    type: POST_SEARCH_MENU.BOOKMARKED,
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isInitialLoading,
  } = useInfiniteGetPostList(bookmarkedDataRequest, isLogin);

  const targetRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      setIsLoading(true);
      fetchNextPage().finally(() => setIsLoading(false));
    }
  }, !!hasNextPage);

  useEffect(() => {
    if (data && data.pages.length > 0) {
      const result = data.pages.flatMap((page) => page.data.job_posting_list);
      setJobPostingData(result);
    }
  }, [data]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <BaseHeader
        hasBackButton
        onClickBackButton={handleBackButtonClick}
        hasMenuButton={false}
        title="Scrap Job Posting"
      />
      {isInitialLoading ? (
        <div className="flex-1 flex flex-col justify-center items-center">
          <LoadingPostItem />
        </div>
      ) : (
        <div className="flex-1 p-6 flex flex-row gap-4">
          <ScrappedJobPostList jobPostingData={jobPostingData} />
          {isLoading && <LoadingItem />}
        </div>
      )}
      <div ref={targetRef} className="h-1"></div>
    </div>
  );
};

export default ScrappedJobPostsPage;
