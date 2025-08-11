import EmptyJobIcon from '@/assets/icons/EmptyJobIcon.svg?react';
import { useUserStore } from '@/store/user';
import LoadingPostItem from '@/components/Common/LoadingPostItem';
import { LoadingItem } from '@/components/Common/LoadingItem';
import { infoTranslation, postTranslation } from '@/constants/translation';
import { isEmployerByAccountType } from '@/utils/signup';
import Tag from '@/components/Common/Tag';
import { useNavigate } from 'react-router-dom';
import { UserType } from '@/constants/user';
import { CareerListItemType } from '@/types/api/career';
import BookmarkIcon from '@/assets/icons/BookmarkIcon.svg?react';
import BookmarkCheckedIcon from '@/assets/icons/BookmarkCheckedIcon.svg?react';
import { usePutCareerBookmark } from '@/hooks/api/useCareer';
import { MouseEvent } from 'react';
import { calculateTimeAgo } from '@/utils/calculateTimeAgo';
import { CAREER_CATEGORY } from '@/constants/postSearch';

const CareerCard = ({ careerData }: { careerData: CareerListItemType }) => {
  const navigate = useNavigate();
  const { account_type } = useUserStore();

  const { mutate } = usePutCareerBookmark();

  const onClickBookmark = (id: number, e: MouseEvent) => {
    e.stopPropagation();
    if (account_type === UserType.USER) mutate(id);
  };

  const formatLeftDays = () => {
    const leftDays = careerData?.left_days;
    const isEmployer = isEmployerByAccountType(account_type);

    if (leftDays === undefined) return infoTranslation.notEntered[isEmployer];

    if (leftDays >= 0)
      return `${leftDays}${postTranslation.daysLeft[isEmployer]}`;

    return postTranslation.closed[isEmployer];
  };

  const goToCareerDetailPage = (data: CareerListItemType) => {
    navigate(`/career/${data.id}`);
  };

  return (
    <article
      className="w-full p-4 bg-surface-base"
      onClick={() => goToCareerDetailPage(careerData)}
    >
      <div className="flex gap-3">
        {/* 왼쪽: 이미지 */}
        {careerData.img_urls && careerData.img_urls.length > 0 && (
          <div className="w-[8em] h-[6rem] rounded-lg overflow-hidden bg-surface-secondary flex-shrink-0">
            <img
              src={careerData.img_urls[0]}
              alt="커리어 대표 이미지"
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        )}
        
        {/* 오른쪽: 텍스트 영역 */}
        <div className="flex-1 flex flex-col gap-0.5">
          {/* CareerCardHeader */}
          <div className="flex justify-between w-full items-start">
            <h3 className="heading-16-semibold text-text-strong line-clamp-2">
              {careerData.title}
            </h3>
            <div className="w-6 h-6">
              {account_type === UserType.USER && (
                <button onClick={(e) => onClickBookmark(careerData.id, e)}>
                  {careerData.is_book_marked ? (
                    <BookmarkCheckedIcon />
                  ) : (
                    <BookmarkIcon />
                  )}
                </button>
              )}
            </div>
          </div>
          
          {/* CareerCardBody + CareerCardFooter */}
          <div className="flex flex-col gap-0.5">
            {/* CareerCardBody */}
            <div className="flex flex-col gap-0">
              {/* 묶음 1: organizer_name + host_name */}
              <div className="meta-inline caption-12-regular text-text-normal">
                {careerData.organizer_name && <span>{careerData.organizer_name}</span>}
                {careerData.host_name && <span>{careerData.host_name}</span>}
              </div>
              
              {/* 묶음 2: recruitment dates + visa */}
              <div className="meta-inline caption-12-regular text-text-alternative">
                {careerData.recruitment_start_date && careerData.recruitment_end_date && (
                  <span>{careerData.recruitment_start_date} ~ {careerData.recruitment_end_date}</span>
                )}
                {careerData.visa && careerData.visa.length > 0 && (
                  <span>{careerData.visa.join(', ').replace(/_/g, '-')}</span>
                )}
              </div>
            </div>
            
            {/* CareerCardFooter */}
            <div className="meta-inline caption-11-regular text-text-alternative">
              {careerData.career_category && (
                <span>{CAREER_CATEGORY[careerData.career_category]}</span>
              )}
              {careerData.created_at && (
                <span>{calculateTimeAgo(careerData.created_at, account_type)}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

type CareerCardListProps = {
  title?: string;
  careerData: CareerListItemType[];
  isLoading: boolean;
  isInitialLoading: boolean;
  onSeeMoreClick?: () => void;
};

const CareerCardList = ({
  title,
  careerData,
  isLoading,
  isInitialLoading,
  onSeeMoreClick,
}: CareerCardListProps) => {
  const { account_type } = useUserStore();

  if (isInitialLoading) {
    return (
      <div className="flex flex-col items-center justify-center flex-1">
        <LoadingPostItem />
      </div>
    );
  }

  if (careerData?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 w-full gap-1 px-4">
        <EmptyJobIcon />
        <h3 className="heading-20-semibold text-[#252525]">
          {
            postTranslation.emptySearchResultTitle[
              isEmployerByAccountType(account_type)
            ]
          }
        </h3>
        <p className="body-14-regular text-[#9397A1] text-center">
          {
            postTranslation.emptySearchResultContent[
              isEmployerByAccountType(account_type)
            ]
          }
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 gap-4">
      {/* 여기 title 영역만 추가 */}
      {title && (
        <div className="flex items-center justify-between px-2 py-1">
          <h3 className="text-black heading-18-semibold">{title}</h3>
          {onSeeMoreClick && (
            <button
              className="caption-12-regular text-[#9397A1]"
              onClick={onSeeMoreClick}
            >
              See More
            </button>
          )}
        </div>
      )}
      <div className="flex flex-wrap divide-y divide-border-disabled">
        {careerData.map((value: CareerListItemType) => (
          <CareerCard careerData={value} key={value.id} />
        ))}
      </div>
      {isLoading && <LoadingItem />}
    </div>
  );
};

export default CareerCardList;
