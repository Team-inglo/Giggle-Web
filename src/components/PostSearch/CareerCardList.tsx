import EmptyJobIcon from '@/assets/icons/EmptyJobIcon.svg?react';
import { useUserStore } from '@/store/user';
import LoadingPostItem from '@/components/Common/LoadingPostItem';
import { LoadingItem } from '@/components/Common/LoadingItem';
import { postTranslation } from '@/constants/translation';
import { isEmployerByAccountType } from '@/utils/signup';
import Tag from '@/components/Common/Tag';
import { useNavigate } from 'react-router-dom';
import { UserType } from '@/constants/user';
import { CareerListItemType } from '@/types/api/career';
import BookmarkIcon from '@/assets/icons/BookmarkIcon.svg?react';
import BookmarkCheckedIcon from '@/assets/icons/BookmarkCheckedIcon.svg?react';
import { usePutCareerBookmark } from '@/hooks/api/useCareer';
import { MouseEvent, useState } from 'react';
import { calculateTimeAgo } from '@/utils/calculateTimeAgo';
import { CAREER_CATEGORY } from '@/constants/postSearch';

type CareerCardListProps = {
  careerData: CareerListItemType[];
  isLoading: boolean;
  isInitialLoading: boolean;
};

const CareerCardList = ({
  careerData,
  isLoading,
  isInitialLoading,
}: CareerCardListProps) => {
  const { account_type } = useUserStore();
  const navigate = useNavigate();
  const { mutate } = usePutCareerBookmark();

  const [isBookmark, setIsBookmark] = useState<boolean>(false);

  const goToCareerDetailPage = (data: CareerListItemType) => {
    navigate(`/career/${data.id}`);
  };

  const onClickBookmark = (id: number, e: MouseEvent) => {
    e.stopPropagation();
    if (account_type === UserType.USER) {
      mutate(id);
      setIsBookmark(!isBookmark);
    }
  };

  if (isInitialLoading) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <LoadingPostItem />
      </div>
    );
  }

  if (careerData?.length === 0) {
    return (
      <div className="w-full px-4 flex-1 flex flex-col justify-center items-center gap-1">
        <EmptyJobIcon />
        <h3 className="head-2 text-[#252525]">
          {
            postTranslation.emptySearchResultTitle[
              isEmployerByAccountType(account_type)
            ]
          }
        </h3>
        <p className="body-2 text-[#9397A1] text-center">
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
    <>
      {careerData.map((value: CareerListItemType) => (
        <article
          className="w-full border-t border-border-disabled p-4 bg-surface-base"
          key={value.id}
          onClick={() => goToCareerDetailPage(value)}
        >
          <Tag
            value={`${value.left_days}`}
            padding="px-1 py-[0.188rem]"
            isRounded={false}
            hasCheckIcon={false}
            backgroundColor="bg-[#FF5252]/10"
            color="text-text-error"
            fontStyle="caption"
          />
          <div className="w-full py-1 flex justify-between items-center">
            <h3 className="head-3 text-text-strong line-clamp-2">
              {value.title}
            </h3>
            <div className="w-6 h-6">
              {account_type === UserType.USER && (
                <button onClick={(e) => onClickBookmark(value.id, e)}>
                  {value.is_book_marked ? (
                    <BookmarkCheckedIcon />
                  ) : (
                    <BookmarkIcon />
                  )}
                </button>
              )}
            </div>
          </div>
          <p className="pb-4 caption text-text-alternative whitespace-normal">
            {CAREER_CATEGORY[value.career_category]}
            <span className="mx-2 inline-block px-[0.063rem] h-3 bg-border-alternative align-middle"></span>
            {value.visa.join(', ').replace(/_/g, '-')}
          </p>
          <p className="pb-1 button-2 text-text-normal whitespace-normal">
            {value.organizer_name}
            <span className="mx-2 inline-block px-[0.063rem] h-3 bg-border-alternative align-middle"></span>
            {value.host_name}
          </p>
          <div className="w-full flex items-center justify-between">
            <p className="body-3 text-text-alternative">
              {value.recruitment_start_date} ~ {value.recruitment_end_date}
            </p>
            <p className="caption text-text-alternative">
              {calculateTimeAgo(value.created_at, account_type)}
            </p>
          </div>
        </article>
      ))}
      {isLoading && <LoadingItem />}
    </>
  );
};

export default CareerCardList;
