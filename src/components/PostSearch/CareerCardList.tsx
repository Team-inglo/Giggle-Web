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
      <Tag
        value={formatLeftDays()}
        padding="px-[0.313rem] py-[0.188rem]"
        isRounded={false}
        hasCheckIcon={false}
        backgroundColor="bg-status-red-100"
        color="text-text-error"
        fontStyle="caption-11-semibold"
      />
      <div className="flex items-center justify-between w-full py-1">
        <h3 className="heading-18-semibold text-text-strong line-clamp-2">
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
      <p className="pb-4 whitespace-normal caption-12-regular text-text-alternative flex items-center">
        {careerData.career_category &&
          CAREER_CATEGORY[careerData.career_category]}
        <span className="w-0.5 h-0.5 bg-neutral-500 rounded-full mx-1"></span>
        {careerData.visa?.join(', ')?.replace(/_/g, '-')}
      </p>
      <p className="pb-1 whitespace-normal button-14-semibold text-text-strong flex items-center">
        {careerData.organizer_name}
        <span className="w-0.5 h-0.5 bg-neutral-600 rounded-full mx-1"></span>
        {careerData.host_name}
      </p>
      <div className="flex items-center justify-between w-full">
        <p className="caption-12-regular text-text-alternative">
          {careerData.recruitment_start_date} ~{' '}
          {careerData.recruitment_end_date}
        </p>
        <p className="caption-12-regular text-text-alternative">
          {careerData.created_at &&
            calculateTimeAgo(careerData.created_at, account_type)}
        </p>
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
