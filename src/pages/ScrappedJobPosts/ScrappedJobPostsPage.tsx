import BaseHeader from '@/components/Common/Header/BaseHeader';
import HomePostCard from '@/components/Home/HomePostCard';
import { POST_SEARCH_MENU } from '@/constants/postSearch';
import { useGetPostList } from '@/hooks/api/usePost';
import useNavigateBack from '@/hooks/useNavigateBack';
import { useUserStore } from '@/store/user';
import { JobPostingItemType } from '@/types/common/jobPostingItem';
import { useEffect, useState } from 'react';

const ScrappedJobPostsPage = () => {
  const handleBackButtonClick = useNavigateBack();
  const { account_type } = useUserStore();
  const isLogin = !!account_type;

  const [jobPostingData, setJobPostingData] = useState<JobPostingItemType[]>(
    [],
  );

  // TODO: 무한스크롤 구현

  // 관심 공고
  const bookmarkedDataRequest = {
    size: 20,
    type: POST_SEARCH_MENU.BOOKMARKED,
  };
  const { data } = useGetPostList(bookmarkedDataRequest, isLogin);

  useEffect(() => {
    if (data?.data?.job_posting_list) {
      const updatedJobPostingData = data.data.job_posting_list.map(
        (item: JobPostingItemType) => ({
          ...item,
          is_book_marked: true,
        }),
      );
      setJobPostingData(updatedJobPostingData);
    }
  }, [data]);
  return (
    <>
      <BaseHeader
        hasBackButton
        onClickBackButton={handleBackButtonClick}
        hasMenuButton={false}
        title="Scrap Job Posting"
      />
      <div className="p-6 flex flex-row gap-4">
        {jobPostingData.map((post) => (
          <HomePostCard key={post.id} jobPostingData={post} />
        ))}
      </div>
    </>
  );
};

export default ScrappedJobPostsPage;
