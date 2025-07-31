import Tag from '@/components/Common/Tag';
import { useNavigate } from 'react-router-dom';
import EmptyJobIcon from '@/assets/icons/EmptyJobIcon.svg?react';
import BookmarkIcon from '@/assets/icons/BookmarkIcon.svg?react';
import BookmarkCheckedIcon from '@/assets/icons/BookmarkCheckedIcon.svg?react';
import LoadingPostItem from '@/components/Common/LoadingPostItem';
import { postTranslation } from '@/constants/translation';
import { EmployeeResumeListItemType } from '@/types/api/resumes';
import { LoadingItem } from '@/components/Common/LoadingItem';
import { MouseEvent } from 'react';
import { usePutScrapResume } from '@/hooks/api/useResume';

const EmployerEmployeeCard = ({
  cardData,
}: {
  cardData: EmployeeResumeListItemType;
}) => {
  const navigate = useNavigate();
  const { mutate } = usePutScrapResume();

  const handleClickBookmark = (e: MouseEvent) => {
    e.stopPropagation();
    mutate(cardData.id);
  };

  const goToResumeDetailPage = () => {
    navigate(`/employer/search/${cardData.id}`);
  };

  return (
    <article
      className="w-[9.063rem] flex flex-col gap-2 rounded-lg"
      onClick={goToResumeDetailPage}
    >
      {/* 이미지에만 border 적용 */}
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

      <div className="flex flex-col gap-[0.125rem] px-2 pb-2">
        <h3 className="min-h-10 button-16-semibold text-text-normal line-clamp-2">
          {cardData?.name}
        </h3>

        <p className="caption-12-regular text-text-alternative line-clamp-1">
          {cardData?.title || '친절한 서비스를 고객을 맞게 만들어보아요!'}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-1">
          <div className="flex flex-wrap items-center gap-1">
            {cardData?.industry && (
              <Tag
                value={cardData.industry}
                padding="py-[0.188rem] px-[0.25rem]"
                isRounded={false}
                hasCheckIcon={false}
                backgroundColor="bg-status-blue-300/10"
                color="text-text-success"
                fontStyle="caption-12-regular"
              />
            )}
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

          <div className="flex items-center gap-1 caption-12-regular text-text-alternative">
            <button onClick={handleClickBookmark}>
              {cardData?.is_bookmarked ? (
                <BookmarkCheckedIcon />
              ) : (
                <BookmarkIcon />
              )}
            </button>
            {cardData?.bookmark_count ?? 0}
          </div>
        </div>
      </div>
    </article>
  );
};

type EmployerEmployeeCardListProps = {
  title?: string;
  resumeData: EmployeeResumeListItemType[];
  isLoading: boolean;
  isInitialLoading: boolean;
  onSeeMoreClick?: () => void;
};

const EmployerEmployeeCardList = ({
  title,
  resumeData,
  isLoading,
  isInitialLoading,
  onSeeMoreClick,
}: EmployerEmployeeCardListProps) => {
  if (isInitialLoading) {
    return (
      <div className="pt-[20vh] flex flex-col justify-center items-center">
        <LoadingPostItem />
      </div>
    );
  }

  if (!resumeData || resumeData.length === 0) {
    return (
      <div className="w-full px-4 pt-[20vh] flex flex-col justify-center items-center gap-1">
        <EmptyJobIcon />
        <h3 className="heading-20-semibold text-text-strong">
          찾고 계신 인재가 없어요.
        </h3>
        <p className="text-center body-14-regular text-text-alternative">
          {postTranslation.emptySearchResultContent.ko}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {title && (
        <div className="flex items-center justify-between py-1 px-4">
          <h3 className="text-text-strong heading-18-semibold">{title}</h3>
          {onSeeMoreClick && (
            <button
              className="caption-12-regular text-text-alternative"
              onClick={onSeeMoreClick}
            >
              더보기
            </button>
          )}
        </div>
      )}

      <div className="flex gap-2 px-4 overflow-x-scroll whitespace-nowrap no-scrollbar">
        {resumeData.map((value) => (
          <EmployerEmployeeCard key={value.id} cardData={value} />
        ))}
      </div>

      {isLoading && <LoadingItem />}
    </div>
  );
};

export default EmployerEmployeeCardList;
