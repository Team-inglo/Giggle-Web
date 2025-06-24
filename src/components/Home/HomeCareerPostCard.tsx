import { useNavigate } from 'react-router-dom';
import { CareerListItemType } from '@/types/api/career';
import { CAREER_CATEGORY } from '@/constants/postSearch';
import { useCurrentPostIdStore } from '@/store/url';

type HomeCareerPostCardProps = {
  careerData: CareerListItemType;
};

const HomeCareerPostCard = ({ careerData }: HomeCareerPostCardProps) => {
  const { updateCurrentPostId } = useCurrentPostIdStore();
  const navigate = useNavigate();

  const goToCareerDetailPage = () => {
    updateCurrentPostId(careerData.id);
    navigate(`/career/${careerData.id}`);
  };

  return (
    <article
      className="flex flex-col gap-2 w-[9.063rem] m-1 rounded-lg"
      onClick={goToCareerDetailPage}
    >
      {/* 썸네일 영역 (CareerListItemType에는 img가 없는 상태라 빈 박스로 처리) */}
      <div className="w-full h-[6.75rem] rounded-lg border border-border-alternative bg-surface-secondary">
        {careerData.img_urls && careerData.img_urls.length > 0 ? (
          <img
            src={careerData.img_urls[0] ? careerData.img_urls[0] : ''}
            alt="career-thumbnail"
            className="object-cover w-full h-full rounded-lg"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-text-alternative">
            No Image
          </div>
        )}
      </div>

      <div className="block">
        {/* 제목 */}
        <h3 className="whitespace-normal min-h-10 button-16-semibold text-text-normal line-clamp-2">
          {careerData.title}
        </h3>

        {/* 주관 - 주최 */}
        <div className="flex items-center justify-between">
          <p className="caption-12-regular text-text-alternative">
            {careerData.organizer_name ?? '-'}
          </p>
          <p className="caption-12-regular text-text-alternative">
            {careerData.host_name ?? '-'}
          </p>
        </div>

        {/* 하단 태그 */}
        <div className="flex flex-wrap gap-1 mt-1">
          {/* 커리어 카테고리 */}
          {careerData.career_category && (
            <span className="caption-12-regular bg-[#0066FF1F] text-text-success py-[0.188rem] px-[0.25rem] rounded">
              {CAREER_CATEGORY[careerData.career_category]}
            </span>
          )}

          {/* 비자 유형 */}
          {careerData.visa && careerData.visa.length > 0 && (
            <span className="caption-12-regular bg-surface-secondary text-text-alternative py-[0.188rem] px-[0.25rem] rounded">
              {careerData.visa.join(', ').replace(/_/g, '-')}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default HomeCareerPostCard;
