import BaseHeader from '@/components/Common/Header/BaseHeader';
import PostApplyResume from '@/components/PostApply/PostApplyResume';
import useNavigateBack from '@/hooks/useNavigateBack';

const ManageResumePage = () => {
  const handleBackButtonClick = useNavigateBack();

  return (
    <>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={handleBackButtonClick}
        hasMenuButton={false}
        title="Manage Resume"
      />
      <PostApplyResume />
    </>
  );
};

export default ManageResumePage;
