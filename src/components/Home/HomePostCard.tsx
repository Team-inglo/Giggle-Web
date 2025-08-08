import Tag from '@/components/Common/Tag';
import { JobPostingItemType } from '@/types/common/jobPostingItem';
import { useNavigate } from 'react-router-dom';
import { useCurrentPostIdStore } from '@/store/url';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import { EN_FILTER_CATEGORY_OPTIONS } from '@/constants/postSearch';
import { useMemo } from 'react';
import { useFormattedVisa } from '@/hooks/useFormattedVisa';

type HomePostCardProps = {
  jobPostingData: JobPostingItemType;
};

const HomePostCard = ({ jobPostingData }: HomePostCardProps) => {
  const { account_type } = useUserStore();
  const userType = account_type === UserType.OWNER ? '/employer' : '';
  const { updateCurrentPostId } = useCurrentPostIdStore();

  const navigate = useNavigate();

  const goToPostDetailPage = () => {
    updateCurrentPostId(Number(jobPostingData.id));
    if (account_type === UserType.OWNER)
      navigate(`/employer/post/${jobPostingData.id}`);
    else navigate(`/post/${jobPostingData.id}`);
  };

  const visaList = useMemo(
    () =>
      jobPostingData.tags.visa.map((visa) => visa.replace(/_/g, '-')).sort(),
    [jobPostingData.tags.visa],
  );
  const RepresentedVisa = useFormattedVisa(visaList, userType);

  return (
    <article
      className="flex flex-col gap-2 w-[9.5rem] rounded-lg"
      onClick={goToPostDetailPage}
    >
      <div className="flex flex-col gap-3">
        {jobPostingData?.representative_img_url ? (
          <div className="relative w-[9.5rem] h-[7.125rem] overflow-hidden rounded-lg shrink-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${jobPostingData.representative_img_url})`,
              }}
            />
            <div className="absolute inset-0 border border-[#8F919D1A] rounded-lg pointer-events-none" />
          </div>
        ) : (
          <div className="relative w-[9.5rem] h-[7.125rem] bg-surface-secondary flex items-center justify-center rounded-lg shrink-0">
            <div className="absolute inset-0 border border-[#8F919D1A] rounded-lg pointer-events-none" />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-0.5">
            <h3 className="button-16-semibold text-text-strong line-clamp-2 whitespace-normal max-h-42 min-h-0">
              {jobPostingData.title}
            </h3>
            <p className="caption-12-regular text-text-alternative whitespace-normal flex items-center">
              {jobPostingData.company_name}
              <span className="w-0.5 h-0.5 bg-neutral-500 rounded-full mx-1"></span>
              {jobPostingData.summaries.address.split(' ').slice(0, 2).join(' ')}
            </p>
          </div>
          <div className="flex items-center flex-wrap gap-1">
            <Tag
              value={
                account_type === UserType.OWNER
                  ? EN_FILTER_CATEGORY_OPTIONS[
                      jobPostingData.tags.employment_type.toLowerCase()
                    ]
                  : jobPostingData.tags.employment_type.toLowerCase()
              }
              padding="py-[0.188rem] px-[0.313rem]"
              isRounded={false}
              hasCheckIcon={false}
              backgroundColor="bg-status-blue-100"
              color="text-text-success"
              fontStyle="caption-11-semibold"
            />
            <Tag
              value={RepresentedVisa}
              padding="py-[0.188rem] px-[0.313rem]"
              isRounded={false}
              hasCheckIcon={false}
              backgroundColor="bg-surface-secondary"
              color="text-text-alternative"
              fontStyle="caption-11-semibold"
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default HomePostCard;
