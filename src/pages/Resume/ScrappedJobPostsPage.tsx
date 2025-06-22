import BaseHeader from '@/components/Common/Header/BaseHeader';
import { LoadingItem } from '@/components/Common/LoadingItem';
import LoadingPostItem from '@/components/Common/LoadingPostItem';
import { POST_SEARCH_MENU } from '@/constants/postSearch';
import { useInfiniteGetPostList } from '@/hooks/api/usePost';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import useNavigateBack from '@/hooks/useNavigateBack';
import { useUserStore } from '@/store/user';
import { JobPostingItemType } from '@/types/common/jobPostingItem';
import { useState } from 'react';
import EmptyJobIcon from '@/assets/icons/EmptyJobIcon.svg?react';
import { JobPostingCard } from '@/components/Common/JobPostingCard';
import { useCurrentPostIdStore } from '@/store/url';
import { useNavigate } from 'react-router-dom';

const FILTERS = ['Job Posting', 'Career'] as const;
type FilterType = (typeof FILTERS)[number];

const ScrappedJobPostList = ({
  jobPostingData,
}: {
  jobPostingData: JobPostingItemType[];
}) => {
  const { updateCurrentPostId } = useCurrentPostIdStore();
  const navigate = useNavigate();

  const goToPostDetailPage = (data: JobPostingItemType) => {
    updateCurrentPostId(Number(data.id));
    navigate(`/post/${data.id}`);
  };

  if (jobPostingData?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 gap-1">
        <EmptyJobIcon />
        <h3 className="heading-20-semibold text-[#252525]">
          No saved jobs yet!
        </h3>
        <p className="body-14-regular text-[#9397A1] text-center">
          Save jobs you like and apply later with one click!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {jobPostingData.map((post) => (
        <article
          className="w-full"
          key={post.id}
          onClick={() => goToPostDetailPage(post)}
        >
          <JobPostingCard {...post}>
            <JobPostingCard.Box>
              <div className="flex flex-col gap-1 pb-4">
                <JobPostingCard.DeadLineTag />
                <JobPostingCard.Header isBookMarkButton={true} />
                <JobPostingCard.CompanyInfo />
              </div>
              <JobPostingCard.HourlyRate />
              <p className="pt-[0.125rem] pb-2 caption-12-regular text-text-alternative whitespace-normal">
                <JobPostingCard.Visa />
                <span className="mx-2 inline-block px-[0.063rem] h-3 bg-border-alternative align-middle"></span>
                <JobPostingCard.WorkDayInfo />
              </p>
              <JobPostingCard.TagList />
            </JobPostingCard.Box>
          </JobPostingCard>
        </article>
      ))}
    </div>
  );
};

const ScrappedJobPostsPage = () => {
  const handleBackButtonClick = useNavigateBack();
  const { account_type } = useUserStore();
  const isLogin = !!account_type;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] =
    useState<FilterType>('Job Posting');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isInitialLoading,
  } = useInfiniteGetPostList(
    { size: 5, type: POST_SEARCH_MENU.BOOKMARKED },
    isLogin,
  );

  const allData =
    data?.pages?.flatMap((page) => page.data.job_posting_list) || [];
  const filteredData = allData.filter((post) => {
    if (selectedFilter === 'Job Posting') return !post.is_career;
    if (selectedFilter === 'Career') return post.is_career;
    return true;
  });

  const targetRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      setIsLoading(true);
      fetchNextPage().finally(() => setIsLoading(false));
    }
  }, !!hasNextPage);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <BaseHeader
        hasBackButton
        onClickBackButton={handleBackButtonClick}
        hasMenuButton={false}
        title="Scrapped Posts"
      />

      <div className="flex gap-2 px-4 pb-2">
        {FILTERS.map((filter) => {
          const isSelected = filter === selectedFilter;

          // 필터별 카운트 계산
          const count = allData.filter((post) => {
            if (filter === 'Job Posting') return !post.is_career;
            if (filter === 'Career') return post.is_career;
            return true;
          }).length;

          return (
            <button
              key={filter}
              className={`flex items-center gap-1 py-2 pl-[0.875rem] pr-[0.875rem] border border-border-disabled rounded-[3.125rem] body-14-regular ${
                isSelected
                  ? 'bg-surface-invert text-text-invert'
                  : 'text-text-alternative'
              }`}
              onClick={() => setSelectedFilter(filter)}
            >
              <p>{filter}</p>
              <span className="ml-1">{count}</span>
            </button>
          );
        })}
      </div>

      {isInitialLoading ? (
        <div className="flex flex-col items-center justify-center flex-1">
          <LoadingPostItem />
        </div>
      ) : (
        <div className="flex flex-row flex-1 gap-4 pb-6">
          <ScrappedJobPostList jobPostingData={filteredData} />
          {isLoading && <LoadingItem />}
        </div>
      )}
      <div ref={targetRef} className="h-1"></div>
    </div>
  );
};

export default ScrappedJobPostsPage;
