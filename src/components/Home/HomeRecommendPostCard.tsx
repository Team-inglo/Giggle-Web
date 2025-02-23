import MessageIcon from '@/assets/icons/Home/MessageIcon.svg?react';
import { useUserStore } from '@/store/user';
import { RecommendJobPostingItemType } from '@/types/home/recommendJobPostingItem';
import { calculateDDay } from '@/utils/calculateDDay';
import { useNavigate } from 'react-router-dom';

type HomeRecommendPostCardProps = {
  jobPostingData: RecommendJobPostingItemType;
};

const HomeRecommendPostCard = ({
  jobPostingData,
}: HomeRecommendPostCardProps) => {
  const navigate = useNavigate();

  const { name } = useUserStore();

  return (
    <article
      className="flex flex-col justify-between min-w-[11.25rem] w-[11.25rem] h-[8.75rem] pt-[0.75rem] pb-[1.125rem] px-[1.125rem] rounded-[1.5rem] border-[0.031rem] border-[#F4F4F9] shadow-cardShadow bg-cover bg-center bg-[url('/src/assets/images/yellowGradient.png')]"
      onClick={() => navigate(`/post/${jobPostingData.id}`)}
    >
      <div className="flex justify-end gap-[0.375rem]">
        <div className="h-fit py-[0.125rem] px-[0.438rem] border-[0.031rem] border-[#1E1926] rounded-[0.5rem]  bg-[#FFFFFFCC] text-[#1E1926] caption">
          {jobPostingData.recruitment_dead_line === '상시모집'
            ? '상시모집'
            : calculateDDay(jobPostingData.recruitment_dead_line)}
        </div>
        <div className="h-fit py-[0.125rem] px-[0.438rem] border-[0.031rem] border-[#1E1926] rounded-[0.5rem]  bg-[#1E1926] text-[#F4F4F9] caption break-words whitespace-normal">
          {jobPostingData.job_category.replace(/_/g, ' ').toLowerCase()}
        </div>
      </div>
      <div className="min-h-[1.875rem]">
        <MessageIcon />
      </div>
      <div>
        <p className="pb-[0.5rem] caption text-[#656565] break-words whitespace-normal">
          The recommendation notice for {name.replace(/-/g, ' ')} has arrived !
        </p>
        <div className="button-2 text-[#1E1926] break-words whitespace-normal line-clamp-2">
          Job Title {')'} {jobPostingData.title}
        </div>
      </div>
    </article>
  );
};

export default HomeRecommendPostCard;
