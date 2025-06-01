import BaseHeader from '@/components/Common/Header/BaseHeader';
import BookmarkContactPanel from '@/components/ManageResume/BookmarkContactPanel';
import PostApplyResume from '@/components/PostApply/PostApplyResume';
import useNavigateBack from '@/hooks/useNavigateBack';

const EmploySearchDetailPage = () => {
  const handleBackButtonClick = useNavigateBack();

  return (
    <>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={handleBackButtonClick}
        hasMenuButton={false}
        title="이력서 조회"
      />
      <div className="pb-28">
        <PostApplyResume />
      </div>
      <BookmarkContactPanel isBookmarked={false} />

    </>
  );
};

export default EmploySearchDetailPage;
