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
            padding="py-[0.188rem] px-[0.25rem]"
            isRounded={true}
            hasCheckIcon={false}
            backgroundColor="bg-status-blue-300/10"
            color="text-text-success"
            fontStyle="caption-12-semibold"
          />
          <Tag
            value={cardData?.visa?.replace(/_/g, '-')}
            padding="py-[0.188rem] px-[0.25rem]"
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
      className="w-[9.063rem] flex flex-col gap-2 rounded-lg"
      onClick={goToResumeDetailPage}
    >
      <div className="w-[9.063rem] h-[6.75rem] rounded-lg overflow-hidden border border-border-alternative">
        {cardData?.profile_img_url ? (
          <img
            src={cardData.profile_img_url}
            alt="profile"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-white bg-gradient-to-r from-purple-500 to-pink-500">
            No Image
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <h3 className="button-16-semibold text-text-normal line-clamp-1 whitespace-normal pb-[0.125rem]">
          {cardData?.name}
        </h3>

        <p className="caption-12-regular text-text-alternative line-clamp-2 whitespace-normal mb-2">
          {cardData?.title || '친절한 서비스를 고객을 맞게 만들어보아요!'}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-1">
          <div className="flex flex-wrap items-center gap-1">
            {cardData?.visa && (
              <Tag
                value={cardData.visa.replace(/_/g, '-')}
                padding="py-[0.188rem] px-[0.25rem]"
                isRounded={false}
                hasCheckIcon={false}
                backgroundColor="bg-surface-secondary"
                color="text-text-alternative"
                fontStyle="caption-12-regular"
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
    </article>
  );
};

export default EmployeeCard;
