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

  const goToResumeDetailPage = (id: string) => {
    navigate(`/employer/search/${id}`);
  };

  return (
    <article
      className="w-full p-4"
      onClick={() => goToResumeDetailPage(cardData.id)}
    >
      <div className="pb-3 flex justify-between items-center gap-2">
        <div className="w-20 h-20 rounded-full overflow-hidden">
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
            <button onClick={(e) => handleClickBookmark(e)}>
              {cardData?.is_bookmarked ? (
                <BookmarkCheckedIcon />
              ) : (
                <BookmarkIcon />
              )}
            </button>
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
};

type EmployerEmployeeCardListProps = {
  resumeData: EmployeeResumeListItemType[];
  isLoading: boolean;
  isInitialLoading: boolean;
};

const EmployerEmployeeCardList = ({
  resumeData,
  isLoading,
  isInitialLoading,
}: EmployerEmployeeCardListProps) => {
  if (isInitialLoading) {
    return (
      <div className="pt-[20vh] flex flex-col justify-center items-center">
        <LoadingPostItem />
      </div>
    );
  }

  if (resumeData?.length === 0) {
    return (
      <div className="w-full px-4 pt-[20vh] flex flex-col justify-center items-center gap-1">
        <EmptyJobIcon />
        <h3 className="heading-20-semibold text-text-strong">
          찾고 계신 인재가 없어요.
        </h3>
        <p className="body-14-regular text-text-alternative text-center">
          {postTranslation.emptySearchResultContent.ko}
        </p>
      </div>
    );
  }

  return (
    <>
      <main className="flex flex-col divide-y divide-[#F8F8F8]">
        {resumeData.map((value: EmployeeResumeListItemType) => (
          <EmployerEmployeeCard cardData={value} key={value.id} />
        ))}
      </main>
      {isLoading && <LoadingItem />}
    </>
  );
};

export default EmployerEmployeeCardList;
