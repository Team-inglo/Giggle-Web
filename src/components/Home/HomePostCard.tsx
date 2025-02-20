import Tag from '@/components/Common/Tag';
import { JobPostingItemType } from '@/types/common/jobPostingItem';
import { calculateDDay } from '@/utils/calculateDDay';
import { useNavigate } from 'react-router-dom';
import { useCurrentPostIdStore } from '@/store/url';
import { formatMoney } from '@/utils/formatMoney';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import { postTranslation } from '@/constants/translation';

type HomePostCardProps = {
  jobPostingData: JobPostingItemType;
};

const HomePostCard = ({ jobPostingData }: HomePostCardProps) => {
  const { account_type } = useUserStore();
  const { updateCurrentPostId } = useCurrentPostIdStore();

  const navigate = useNavigate();

  const goToPostDetailPage = () => {
    updateCurrentPostId(Number(jobPostingData.id));
    navigate(`/post/${jobPostingData.id}`);
  };

  const translateLanguage = () => {
    if (account_type === UserType.OWNER) return 'ko';
    return 'en';
  };

  return (
    <article
      className="flex flex-col gap-2 w-[9.063rem] m-2 rounded-lg"
      onClick={goToPostDetailPage}
    >
      {jobPostingData?.representative_img_url ? (
        <div
          className="w-full h-[6.75rem] min-w-[9.063rem] rounded-lg border border-[#E2E5EB] bg-cover bg-center"
          style={{
            backgroundImage: `url(${jobPostingData.representative_img_url})`,
          }}
        ></div>
      ) : (
        <div className="w-full h-[6.75rem] rounded-lg border border-[#E2E5EB] bg-[#F4F4F9]"></div>
      )}
      <div>
        <p className="caption text-[#252525]">{jobPostingData.company_name}</p>
        <h3 className="button-1 text-[#191919]">{jobPostingData.title}</h3>
        <div className="py-2 flex items-center flex-wrap gap-1">
          <Tag
            value={jobPostingData.tags.employment_type.toLowerCase()}
            padding="0.188rem 0.25rem"
            isRounded={false}
            hasCheckIcon={false}
            backgroundColor="#0066FF1F"
            color="#0066FF"
            fontStyle="caption"
          />
          <Tag
            value={jobPostingData.tags.visa.replace(/_/g, '-').toLowerCase()}
            padding="0.188rem 0.25rem"
            isRounded={false}
            hasCheckIcon={false}
            backgroundColor="#191919"
            color="#F4F4F9"
            fontStyle="caption"
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="head-3 text-[#9397A1]">
            {jobPostingData.recruitment_dead_line === '상시모집'
              ? postTranslation.dDay[translateLanguage()]
              : calculateDDay(jobPostingData.recruitment_dead_line)}
          </p>
          <p className="caption text-[#252525]">
            <span className="mr-[0.125rem] text-[#9397A1]">Hr</span>
            {formatMoney(jobPostingData.hourly_rate)}KRW
          </p>
        </div>
      </div>
    </article>
  );
};

export default HomePostCard;
