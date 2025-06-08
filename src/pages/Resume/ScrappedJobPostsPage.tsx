import BaseHeader from '@/components/Common/Header/BaseHeader';
import { LoadingItem } from '@/components/Common/LoadingItem';
import LoadingPostItem from '@/components/Common/LoadingPostItem';
import { POST_SEARCH_MENU, POST_SORTING } from '@/constants/postSearch';
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
import SearchSortDropdown from '@/components/Common/SearchSortDropdown';
import { PostSortingType } from '@/types/PostSearchFilter/PostSearchFilterItem';

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
      <div className="flex-1 flex flex-col justify-center items-center gap-1">
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
  const [selectedSorting, setSelectedSorting] = useState<PostSortingType>(
    POST_SORTING.RECENT,
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isInitialLoading,
  } = useInfiniteGetPostList(
    { size: 5, type: POST_SEARCH_MENU.BOOKMARKED, sorting: selectedSorting },
    isLogin,
  );

  const jobPostingData =
    data?.pages?.flatMap((page) => page.data.job_posting_list) || [];

  const targetRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      setIsLoading(true);
      fetchNextPage().finally(() => setIsLoading(false));
    }
  }, !!hasNextPage);

  const onChangeSortType = (selectedSorting: PostSortingType) => {
    setSelectedSorting(selectedSorting);
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <BaseHeader
        hasBackButton
        onClickBackButton={handleBackButtonClick}
        hasMenuButton={false}
        title="Scrapped Job Posts"
      />
      <div className="w-full pt-6 pb-2 px-4 flex justify-between items-center border-b border-border-disabled">
        <h3 className=" caption-12-regular text-text-alternative">
          {jobPostingData.length} scrapped Job Posts
        </h3>
        <SearchSortDropdown
          options={Object.values(POST_SORTING).map((value) =>
            value.toLowerCase(),
          )}
          value={selectedSorting.toLowerCase()}
          onSelect={(value) => onChangeSortType(value as PostSortingType)}
        />
      </div>
      {isInitialLoading ? (
        <div className="flex-1 flex flex-col justify-center items-center">
          <LoadingPostItem />
        </div>
      ) : (
        <div className="flex-1 pb-6 flex flex-row gap-4">
          <ScrappedJobPostList jobPostingData={jobPostingData} />
          {isLoading && <LoadingItem />}
        </div>
      )}
      <div ref={targetRef} className="h-1"></div>
    </div>
  );
};

export default ScrappedJobPostsPage;
