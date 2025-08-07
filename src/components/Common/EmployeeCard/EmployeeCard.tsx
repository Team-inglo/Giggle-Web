import Tag from '@/components/Common/Tag';
import { EmployeeResumeListItemType } from '@/types/api/resumes';
import { useEmployeeCard } from '@/hooks/useEmployeeCard';
import EmployeeCardBookmark from '@/components/Common/EmployeeCard/EmployeeCardBookmark';

type EmployeeCardProps = {
  cardData: EmployeeResumeListItemType;
  variant: 'horizontal' | 'vertical';
};

const EmployeeCard = ({ cardData, variant }: EmployeeCardProps) => {
  const { handleClickBookmark, goToResumeDetailPage } =
    useEmployeeCard(cardData);

  if (variant === 'horizontal') {
    return (
      <article className="w-full p-4" onClick={goToResumeDetailPage}>
        <div className="pb-3 flex justify-between items-center gap-2">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={cardData.profile_img_url}
              alt="profile image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="w-full pb-[0.125rem] flex justify-between items-center">
              <p className="text-text-strong heading-18-semibold">
                {cardData?.name}{' '}
                <span className="pl-1 text-text-alternative caption-12-regular">
                  {cardData?.nationality}
                </span>
              </p>
              <EmployeeCardBookmark
                isBookmarked={cardData?.is_bookmarked}
                onBookmarkClick={handleClickBookmark}
                variant="icon-only"
              />
            </div>
            <p className="text-text-alternative body-14-regular">
              {cardData?.address}
            </p>
          </div>
        </div>
        <p className="text-text-normal body-14-medium">{cardData?.title}</p>
        <div className="pt-2 flex items-center gap-1 flex-wrap">
          <Tag
            value={cardData?.industry}
            padding="py-[0.188rem] px-[0.313rem]"
            isRounded={true}
            hasCheckIcon={false}
            backgroundColor="bg-status-blue-300/10"
            color="text-text-success"
            fontStyle="caption-12-semibold"
          />
          <Tag
            value={cardData?.visa?.replace(/_/g, '-')}
            padding="py-[0.188rem] px-[0.313rem]"
            isRounded={true}
            hasCheckIcon={false}
            backgroundColor="bg-surface-secondary"
            color="text-text-alternative"
            fontStyle="caption-12-semibold"
          />
        </div>
      </article>
    );
  }

  // Column 형 카드
  return (
    <article
      className="flex flex-col gap-2 w-[9.5rem] rounded-lg"
      onClick={goToResumeDetailPage}
    >
      <div className="flex flex-col gap-3">
        {cardData?.profile_img_url ? (
          <div className="relative w-[9.5rem] h-[7.125rem] overflow-hidden rounded-lg shrink-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${cardData.profile_img_url})`,
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
            <h3 className="button-16-semibold text-text-strong line-clamp-1 whitespace-normal max-h-42 min-h-0">
              {cardData.name}
            </h3>
            <p className="caption-12-regular text-text-alternative line-clamp-2 whitespace-normal">
              {cardData?.title}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-1">
            <div className="flex flex-wrap items-center gap-1">
              {cardData?.visa && (
                <Tag
                  value={cardData.visa?.replace(/_/g, '-')}
                  padding="py-[0.188rem] px-[0.313rem]"
                  isRounded={false}
                  hasCheckIcon={false}
                  backgroundColor="bg-surface-secondary"
                  color="text-text-alternative"
                  fontStyle="caption-11-semibold"
                />
              )}
            </div>
            <EmployeeCardBookmark
              isBookmarked={cardData?.is_bookmarked}
              bookmarkCount={cardData?.bookmark_count}
              onBookmarkClick={handleClickBookmark}
              variant="with-count"
            />
          </div>
        </div>
      </div>
    </article>
  );
};
export default EmployeeCard;
