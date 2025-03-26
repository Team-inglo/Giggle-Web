import EmptyJobIcon from '@/assets/icons/EmptyJobIcon.svg?react';
import { JobPostingItemType } from '@/types/common/jobPostingItem';
import { useUserStore } from '@/store/user';
import LoadingPostItem from '@/components/Common/LoadingPostItem';
import { LoadingItem } from '@/components/Common/LoadingItem';
import { postTranslation } from '@/constants/translation';
import { isEmployerByAccountType } from '@/utils/signup';
import { JobPostingCard } from '@/components/Common/JobPostingCard';
import { useCurrentPostIdStore } from '@/store/url';
import { useNavigate } from 'react-router-dom';
import { UserType } from '@/constants/user';

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
  const { updateCurrentPostId } = useCurrentPostIdStore();
  const navigate = useNavigate();

  const goToPostDetailPage = (data: JobPostingItemType) => {
    updateCurrentPostId(Number(data.id));
    if (account_type === UserType.OWNER) navigate(`/employer/post/${data.id}`);
    else navigate(`/post/${data.id}`);
  };

  if (isInitialLoading) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <LoadingPostItem />
      </div>
    );
  }

  if (postData?.length === 0) {
    return (
      <div className="w-full px-4 flex-1 flex flex-col justify-center items-center gap-1">
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
        <article
          className="w-full border-t border-b border-[#f8f8f8]"
          key={value.id}
          onClick={() => goToPostDetailPage(value)}
        >
          <JobPostingCard {...value}>
            <JobPostingCard.Box>
              <JobPostingCard.Header isBookMarkButton={true} />
              <div className="w-full flex flex-col gap-2">
                <JobPostingCard.Title isTwoLine={true} />
                <div className="w-full flex flex-col gap-[0.125rem]">
                  <JobPostingCard.Address />
                  <JobPostingCard.WorkPeriod />
                  <JobPostingCard.WorkDaysPerWeek />
                </div>
                <JobPostingCard.TagList />
                <JobPostingCard.Footer />
              </div>
            </JobPostingCard.Box>
          </JobPostingCard>
        </article>
      ))}
      {isLoading && <LoadingItem />}
    </>
  );
};

export default PostSearchResult;
