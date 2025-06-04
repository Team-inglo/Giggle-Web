import Tag from '@/components/Common/Tag';
import { useNavigate } from 'react-router-dom';
import EmptyJobIcon from '@/assets/icons/EmptyJobIcon.svg?react';
import BookmarkIcon from '@/assets/icons/BookmarkIcon.svg?react';
import BookmarkCheckedIcon from '@/assets/icons/BookmarkCheckedIcon.svg?react';
import LoadingPostItem from '@/components/Common/LoadingPostItem';
import { postTranslation } from '@/constants/translation';
import { EmployeeResumeListItemType } from '@/types/api/resumes';
import { LoadingItem } from '@/components/Common/LoadingItem';

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
  const navigate = useNavigate();

  const goToResumeDetailPage = (id: string) => {
    navigate(`/employer/search/${id}`);
  };

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
      {resumeData.map((value: EmployeeResumeListItemType) => (
        <article
          className="w-full p-4 border-b border-[#F8F8F8]"
          key={value.id}
          onClick={() => goToResumeDetailPage(value.id)}
        >
          <div className="pb-3 flex justify-between items-center gap-2">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img
                src={value.profile_img_url}
                alt="profile image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="w-full pb-[0.125rem] flex justify-between items-center">
                <p className="text-text-strong heading-18-semibold">
                  {value?.name}{' '}
                  <span className="pl-1 text-text-alternative caption-12-regular">
                    {value?.nationality}
                  </span>
                </p>
                <button>
                  {value.is_bookmarked ? (
                    <BookmarkCheckedIcon />
                  ) : (
                    <BookmarkIcon />
                  )}
                </button>
              </div>
              <p className="text-text-alternative body-14-regular">주소 넣기</p>
            </div>
          </div>
          <p className="text-text-normal body-14-medium">{value.title}</p>
          <div className="pt-2 flex items-center gap-1 flex-wrap">
            <Tag
              value={value.industry}
              padding="py-[0.188rem] px-[0.25rem]"
              isRounded={true}
              hasCheckIcon={false}
              backgroundColor="bg-[#0066FF]/10"
              color="text-text-success"
              fontStyle="caption-12-semibold"
            />
            <Tag
              value={value.visa.replace(/_/g, '-')}
              padding="py-[0.188rem] px-[0.25rem]"
              isRounded={true}
              hasCheckIcon={false}
              backgroundColor="bg-surface-secondary"
              color="text-text-alternative"
              fontStyle="caption-12-semibold"
            />
          </div>
        </article>
      ))}
      {isLoading && <LoadingItem />}
    </>
  );
};

export default EmployerEmployeeCardList;
