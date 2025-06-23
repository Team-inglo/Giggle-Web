import BaseHeader from '@/components/Common/Header/BaseHeader';
import { LoadingItem } from '@/components/Common/LoadingItem';
import LoadingPostItem from '@/components/Common/LoadingPostItem';
import { POST_SEARCH_MENU } from '@/constants/postSearch';
import { useInfiniteGetPostList } from '@/hooks/api/usePost';
import { useInfiniteGetCareerList } from '@/hooks/api/useCareer';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import useNavigateBack from '@/hooks/useNavigateBack';
import { useUserStore } from '@/store/user';
import { JobPostingItemType } from '@/types/common/jobPostingItem';
import { useState } from 'react';
import EmptyJobIcon from '@/assets/icons/EmptyJobIcon.svg?react';
import { JobPostingCard } from '@/components/Common/JobPostingCard';
import CareerCardList from '@/components/PostSearch/CareerCardList';
import { useCurrentPostIdStore } from '@/store/url';
import { useNavigate } from 'react-router-dom';

const FILTERS = ['Job Posting', 'Career'] as const;
type FilterType = (typeof FILTERS)[number];

// JobPosting 리스트 렌더링 컴포넌트
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

  if (jobPostingData.length === 0) {
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

  const [selectedFilter, setSelectedFilter] =
    useState<FilterType>('Job Posting');

  // JobPosting 데이터 요청
  const postRequestParams = {
    size: 5,
    type: POST_SEARCH_MENU.BOOKMARKED,
    isCareer: false,
    isBookMarked: true,
  };

  const {
    data: postData,
    fetchNextPage: fetchPostNextPage,
    hasNextPage: hasPostNextPage,
    isFetchingNextPage: isFetchingPostNextPage,
    isLoading: isPostLoading,
  } = useInfiniteGetPostList(postRequestParams, isLogin);

  const postList =
    postData?.pages?.flatMap((page) => page.data.job_posting_list) || [];

  // Career 데이터 요청
  const careerRequestParams = {
    size: 5,
    sorting: 'RECENT',
    isBookMarked: true,
  };

  const {
    data: careerData,
    fetchNextPage: fetchCareerNextPage,
    hasNextPage: hasCareerNextPage,
    isFetchingNextPage: isFetchingCareerNextPage,
    isLoading: isCareerLoading,
  } = useInfiniteGetCareerList(careerRequestParams, isLogin);

  const careerList =
    careerData?.pages?.flatMap((page) => page.data.career_list) || [];

  // InfiniteScroll hook
  const targetRef = useInfiniteScroll(() => {
    if (selectedFilter === 'Job Posting') {
      if (hasPostNextPage && !isFetchingPostNextPage) fetchPostNextPage();
    } else {
      if (hasCareerNextPage && !isFetchingCareerNextPage) fetchCareerNextPage();
    }
  }, true);

  const isInitialLoading =
    selectedFilter === 'Job Posting' ? isPostLoading : isCareerLoading;
  const isFetchingNextPage =
    selectedFilter === 'Job Posting'
      ? isFetchingPostNextPage
      : isFetchingCareerNextPage;

  return (
    <div className="flex flex-col w-full min-h-screen">
      <BaseHeader
        hasBackButton
        onClickBackButton={handleBackButtonClick}
        hasMenuButton={false}
        title="Scrapped Posts"
      />

      {/* 필터 버튼 */}
      <div className="flex gap-2 px-4 pb-2">
        {FILTERS.map((filter) => {
          const isSelected = filter === selectedFilter;
          const count =
            filter === 'Job Posting' ? postList.length : careerList.length;

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
              <span>{count}</span>
            </button>
          );
        })}
      </div>

      {/* 데이터 렌더링 */}
      {isInitialLoading ? (
        <div className="flex flex-col items-center justify-center flex-1">
          <LoadingPostItem />
        </div>
      ) : (
        <div className="flex flex-row flex-1 gap-4 pb-6">
          {selectedFilter === 'Job Posting' ? (
            <ScrappedJobPostList jobPostingData={postList} />
          ) : (
            <CareerCardList
              careerData={careerList}
              isLoading={isFetchingNextPage}
              isInitialLoading={isInitialLoading}
            />
          )}
          {isFetchingNextPage && <LoadingItem />}
        </div>
      )}
      <div ref={targetRef} className="h-1"></div>
    </div>
  );
};

export default ScrappedJobPostsPage;
