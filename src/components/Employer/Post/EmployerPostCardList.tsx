import EmptyJobIcon from '@/assets/icons/EmptyJobIcon.svg?react';
import { EmployerPostItemType } from '@/types/post/employerPostItem';
import LoadingPostItem from '@/components/Common/LoadingPostItem';
import ApplicationPostCard from '@/components/Application/ApplicationPostCard';
import { useNavigate } from 'react-router-dom';
import { useCurrentPostIdStore } from '@/store/url';

type EmployerPostCardListProps = {
  postListData: EmployerPostItemType[];
  isInitialLoading: boolean;
};

const EmployerPostCardList = ({
  postListData,
  isInitialLoading,
}: EmployerPostCardListProps) => {
  const navigate = useNavigate();
  const { updateCurrentPostId } = useCurrentPostIdStore();

  if (isInitialLoading) {
    return (
      <div className="mt-10 flex flex-col justify-center items-center">
        <LoadingPostItem />
      </div>
    );
  }

  if (postListData.length === 0) {
    return (
      <div className="mt-10 flex flex-col justify-center items-center gap-1">
        <EmptyJobIcon />
        <h3 className="head-2 text-[#252525]">작성한 공고가 없어요.</h3>
        <p className="body-2 text-[#9397A1] text-center">
          새로운 공고를 작성해보세요!
        </p>
      </div>
    );
  }

  return (
    <section className="flex-1 flex flex-col gap-4 w-full px-4 pt-4 pb-24 bg-surface-secondary">
      {postListData?.map((data: EmployerPostItemType) => (
        <ApplicationPostCard
          key={data.id}
          postData={data}
          handleClickLeftButton={() => {
            updateCurrentPostId(data.id);
            navigate(`/employer/post/${data.id}`);
          }}
          leftButtonText="공고 상세보기"
          handleClickRightButton={() => {
            updateCurrentPostId(data.id);
            navigate(`/employer/post/${data.id}/applicant`);
          }}
          rightButtonText="지원자 확인 👥"
        />
      ))}
    </section>
  );
};

export default EmployerPostCardList;
