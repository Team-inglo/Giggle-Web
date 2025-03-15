import Tag from '@/components/Common/Tag';
import { JobPostingItemType } from '@/types/common/jobPostingItem';
import { calculateDDay } from '@/utils/calculateDDay';
import { useNavigate } from 'react-router-dom';
import { useCurrentPostIdStore } from '@/store/url';
import { formatMoney } from '@/utils/formatMoney';
import { useUserStore } from '@/store/user';
import { postTranslation } from '@/constants/translation';
import { isEmployerByAccountType } from '@/utils/signup';
import { UserType } from '@/constants/user';
import { EN_FILTER_CATEGORY_OPTIONS } from '@/constants/postSearch';

type HomePostCardProps = {
  jobPostingData: JobPostingItemType;
};

const HomePostCard = ({ jobPostingData }: HomePostCardProps) => {
  const { account_type } = useUserStore();
  const { updateCurrentPostId } = useCurrentPostIdStore();

  const navigate = useNavigate();

  const goToPostDetailPage = () => {
    updateCurrentPostId(Number(jobPostingData.id));
    if (account_type === UserType.OWNER)
      navigate(`/employer/post/${jobPostingData.id}`);
    else navigate(`/post/${jobPostingData.id}`);
  };

  return (
    <article
      className="flex flex-col gap-2 w-[9.063rem] m-2 rounded-lg"
      onClick={goToPostDetailPage}
    >
      {jobPostingData?.representative_img_url ? (
        <div
          className="w-full h-[6.75rem] min-w-[9.063rem] rounded-lg border border-border-alternative bg-cover bg-center"
          style={{
            backgroundImage: `url(${jobPostingData.representative_img_url})`,
          }}
        ></div>
      ) : (
        <div className="w-full h-[6.75rem] rounded-lg border border-border-alternative bg-surface-secondary"></div>
      )}
      <div className="block">
        <p className="caption text-text-normal line-clamp-1 whitespace-normal">
          {jobPostingData.company_name}
        </p>
        <h3 className="min-h-10 button-1 text-text-normal line-clamp-2 whitespace-normal">
          {jobPostingData.title}
        </h3>
        <div className="py-2 flex items-center flex-wrap gap-1">
          <Tag
            value={
              account_type === UserType.OWNER
                ? EN_FILTER_CATEGORY_OPTIONS[
                    jobPostingData.tags.employment_type.toLowerCase()
                  ]
                : jobPostingData.tags.employment_type.toLowerCase()
            }
            padding="py-[0.188rem] px-[0.25rem]"
            isRounded={false}
            hasCheckIcon={false}
            backgroundColor="bg-[#0066FF1F]"
            color="text-text-success"
            fontStyle="caption"
          />
          <Tag
            value={jobPostingData.tags.visa
              .join(',')
              .replace(/_/g, '-')
              .toLowerCase()}
            padding="py-[0.188rem] px-[0.25rem]"
            isRounded={false}
            hasCheckIcon={false}
            backgroundColor="bg-surface-invert"
            color="text-primary-neutral"
            fontStyle="caption"
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="head-3 text-text-alternative">
            {jobPostingData.recruitment_dead_line === '상시모집'
              ? postTranslation.dDay[isEmployerByAccountType(account_type)]
              : calculateDDay(jobPostingData.recruitment_dead_line)}
          </p>
          <p className="body-2 text-text-normal">
            <span className="mr-[0.125rem] caption text-text-alternative">
              {postTranslation.Hr[isEmployerByAccountType(account_type)]}
            </span>
            {formatMoney(jobPostingData.hourly_rate)}
            {postTranslation.KRW[isEmployerByAccountType(account_type)]}
          </p>
        </div>
      </div>
    </article>
  );
};

export default HomePostCard;
