import BaseHeader from '@/components/Common/Header/BaseHeader';
import BookmarkContactPanel from '@/components/ManageResume/BookmarkContactPanel';
import PostApplyResume from '@/components/PostApply/PostApplyResume';
import { useGetResumeDetail } from '@/hooks/api/useResume';
import useNavigateBack from '@/hooks/useNavigateBack';
import { useParams } from 'react-router-dom';

const EmploySearchDetailPage = () => {
  const handleBackButtonClick = useNavigateBack();
  const { id } = useParams();

  const { data: resumeData, isLoading } = useGetResumeDetail(id ?? '', true);
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
      {!isLoading && resumeData && (
        <BookmarkContactPanel
          isBookmarked={resumeData?.data?.is_bookmarked}
          phoneNumber={
            resumeData?.data?.personal_information?.phone_number ?? ''
          }
        />
      )}
    </>
  );
};

export default EmploySearchDetailPage;
