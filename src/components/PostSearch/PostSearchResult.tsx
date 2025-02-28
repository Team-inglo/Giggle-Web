import EmptyJobIcon from '@/assets/icons/EmptyJobIcon.svg?react';
import { JobPostingItemType } from '@/types/common/jobPostingItem';
import JobPostingCard from '@/components/Common/JobPostingCard';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import LoadingPostItem from '@/components/Common/LoadingPostItem';

type PostSearchResultProps = {
  postData: JobPostingItemType[];
  isLoading: boolean;
  isInitialLoading: boolean;
};

const PostSearchResult = ({
  postData,
  isLoading,
  isInitialLoading,
}: PostSearchResultProps) => {
  const { account_type } = useUserStore();

  if (isInitialLoading) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <LoadingPostItem />
      </div>
    );
  }

  if (postData?.length === 0) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center gap-1">
        <EmptyJobIcon />
        <h3 className="head-2 text-[#252525]">
          {account_type === UserType.OWNER
            ? '찾고 계신 공고가 없어요.'
            : 'No results found'}
        </h3>
        <p className="body-2 text-[#9397A1] text-center">
          {account_type === UserType.OWNER
            ? '필터를 변경하거나 다른 키워드로 검색해보세요!'
            : 'We couldn’t find any jobs matching your search. Try adjusting your filters!'}
        </p>
      </div>
    );
  }

  return (
    <>
      {postData.map((value: JobPostingItemType) => (
        <JobPostingCard key={value.id} jobPostingData={value} />
      ))}
      {isLoading && <LoadingPostItem />}
    </>
  );
};

export default PostSearchResult;
