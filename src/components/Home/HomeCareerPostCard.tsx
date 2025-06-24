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
      {/* 이미지 박스 - 기존 Job 공고와 동일하게 통일 */}
      {careerData.img_urls && careerData.img_urls.length > 0 ? (
        <div
          className="w-full h-[6.75rem] min-w-[9.063rem] rounded-lg border border-border-alternative bg-cover bg-center"
          style={{
            backgroundImage: `url(${careerData.img_urls[0]})`,
          }}
        ></div>
      ) : (
        <div className="w-full h-[6.75rem] min-w-[9.063rem] rounded-lg border border-border-alternative bg-surface-secondary flex items-center justify-center text-text-alternative">
          No Image
        </div>
      )}

      <div className="block">
        {/* 제목 */}
        <h3 className="whitespace-normal min-h-10 button-16-semibold text-text-normal line-clamp-2">
          {careerData.title}
        </h3>

        {/* 주관-주최 */}
        <p className="whitespace-normal caption-12-regular text-text-alternative">
          {careerData.organizer_name ?? '-'}
          <span className="inline-block h-3 mx-1 align-middle border bg-border-alternative"></span>
          {careerData.host_name ?? '-'}
        </p>

        {/* 태그 영역 */}
        <div className="flex flex-wrap items-center gap-1 mt-1">
          {careerData.career_category && (
            <span className="caption-12-regular bg-[#0066FF1F] text-text-success py-[0.188rem] px-[0.25rem] rounded">
              {CAREER_CATEGORY[careerData.career_category]}
            </span>
          )}
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
