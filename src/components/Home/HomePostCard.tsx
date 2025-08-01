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
      className="flex flex-col gap-2 w-[9.063rem] rounded-lg"
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
        <h3 className="min-h-10 button-16-semibold text-text-normal line-clamp-2 whitespace-normal">
          {jobPostingData.title}
        </h3>
        <p className="caption-12-regular text-text-alternative whitespace-normal">
          {jobPostingData.company_name}
          <span className="mx-1 inline-block align-middle border h-3 bg-border-alternative"></span>
          {jobPostingData.summaries.address.split(' ').slice(0, 2).join(' ')}{' '}
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
          padding="py-[0.188rem] px-[0.25rem]"
          isRounded={false}
          hasCheckIcon={false}
          backgroundColor="bg-[#0066FF1F]"
          color="text-text-success"
          fontStyle="caption-12-regular"
        />
        <Tag
          value={RepresentedVisa}
          padding="py-[0.188rem] px-[0.25rem]"
          isRounded={false}
          hasCheckIcon={false}
          backgroundColor="bg-surface-secondary"
          color="text-text-alternative"
          fontStyle="caption-12-regular"
        />
      </div>
    </article>
  );
};

export default HomePostCard;
