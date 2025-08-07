import { useNavigate } from 'react-router-dom';
import { CareerListItemType } from '@/types/api/career';
import { CAREER_CATEGORY } from '@/constants/postSearch';
import { useMemo } from 'react';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import { useFormattedVisa } from '@/hooks/useFormattedVisa';

type HomeCareerPostCardProps = {
  careerData: CareerListItemType;
};

const HomeCareerPostCard = ({ careerData }: HomeCareerPostCardProps) => {
  const navigate = useNavigate();
  const { account_type } = useUserStore();
  const userType = account_type === UserType.OWNER ? '/employer' : '';
  const goToCareerDetailPage = () => {
    navigate(`/career/${careerData.id}`);
  };

  const visaList = useMemo(
    () => careerData.visa?.map((visa) => visa.replace(/_/g, '-')).sort(),
    [careerData.visa],
  );
  const RepresentedVisa = useFormattedVisa(visaList, userType);

  return (
    <article
      className="flex flex-col gap-2 w-[9.5rem] rounded-lg"
      onClick={goToCareerDetailPage}
    >
      <div className="flex flex-col gap-3">
        {careerData.img_urls && careerData.img_urls.length > 0 ? (
          <div className="relative w-[9.5rem] h-[7.125rem] overflow-hidden rounded-lg shrink-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${careerData.img_urls[0]})`,
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
              {careerData.title}
            </h3>
            <p className="caption-12-regular text-text-alternative whitespace-normal flex items-center">
              {careerData.organizer_name ?? '-'}
              <span className="w-px h-2.5 bg-border-alternative mx-1"></span>
              {careerData.host_name ?? '-'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1">
            {careerData.career_category && (
              <span className="caption-11-semibold bg-[#0066FF1F] text-text-success py-[0.188rem] px-[0.313rem] rounded-md">
                {CAREER_CATEGORY[careerData.career_category]}
              </span>
            )}
            {careerData.visa && careerData.visa.length > 0 && (
              <span className="caption-11-semibold bg-surface-secondary text-text-alternative py-[0.188rem] px-[0.313rem] rounded-md">
                {RepresentedVisa}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default HomeCareerPostCard;
