import EmptyJobIcon from '@/assets/icons/EmptyJobIcon.svg?react';
import { JobPostingItemType } from '@/types/common/jobPostingItem';
import JobPostingCard from '@/components/Common/JobPostingCard';
import { useUserStore } from '@/store/user';
import LoadingPostItem from '@/components/Common/LoadingPostItem';
import LoadingItem from '@/components/Common/LoadingItem';
import { postTranslation } from '@/constants/translation';
import { isEmployerByAccountType } from '@/utils/signup';

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
          {
            postTranslation.emptySearchResultTitle[
              isEmployerByAccountType(account_type)
            ]
          }
        </h3>
        <p className="body-2 text-[#9397A1] text-center">
          {
            postTranslation.emptySearchResultContent[
              isEmployerByAccountType(account_type)
            ]
          }
        </p>
      </div>
    );
  }

  return (
    <>
      {postData.map((value: JobPostingItemType) => (
        <JobPostingCard key={value.id} jobPostingData={value} />
      ))}
      {isLoading && <LoadingItem />}
    </>
  );
};

export default PostSearchResult;
