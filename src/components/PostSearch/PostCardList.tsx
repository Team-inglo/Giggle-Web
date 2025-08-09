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

type PostCardListProps = {
  postData: JobPostingItemType[];
  isLoading: boolean;
  isInitialLoading: boolean;
};

const PostCardList = ({
  postData,
  isLoading,
  isInitialLoading,
}: PostCardListProps) => {
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
        <h3 className="heading-20-semibold text-[#252525]">
          {
            postTranslation.emptySearchResultTitle[
              isEmployerByAccountType(account_type)
            ]
          }
        </h3>
        <p className="body-14-regular text-[#9397A1] text-center">
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
          className="w-full border-t border-border-disabled"
          key={value.id}
          onClick={() => goToPostDetailPage(value)}
        >
          <JobPostingCard {...value}>
            <JobPostingCard.Box>
              <div className="flex flex-col gap-1 pb-4">
                <JobPostingCard.DeadLineTag />
                <JobPostingCard.Header isBookMarkButton={true} />
                <JobPostingCard.CompanyInfo />
              </div>
              <JobPostingCard.HourlyRate />
              <p className="pt-[0.125rem] pb-2 caption-12-regular text-text-alternative whitespace-normal items-center">
                <JobPostingCard.Visa />
                <span className="inline-block w-0.5 h-0.5 bg-neutral-500 rounded-full mx-1 align-middle"></span>
                <JobPostingCard.WorkDayInfo />
              </p>
              <JobPostingCard.TagList />
            </JobPostingCard.Box>
          </JobPostingCard>
        </article>
      ))}
      {isLoading && <LoadingItem />}
    </>
  );
};

export default PostCardList;
