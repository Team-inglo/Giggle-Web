import BaseHeader from '@/components/Common/Header/BaseHeader';
import { useNavigate } from 'react-router-dom';
import PostApplyResume from '@/components/PostApply/PostApplyResume';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import useNavigateBack from '@/hooks/useNavigateBack';

const ManageResumePage = () => {
  const handleBackButtonClick = useNavigateBack();
  const navigate = useNavigate();

  return (
    <>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={handleBackButtonClick}
        hasMenuButton={false}
        title="Manage Resume"
      />
      <PostApplyResume />
      <BottomButtonPanel>
        {/* 정보 입력 시마다 유효성을 검사해 모든 값이 유효하면 버튼이 활성화 */}
        <Button
          type="large"
          bgColor={'bg-[#fef387]'}
          fontColor={'text-[#191919]'}
          isBorder={false}
          title="Edit Resume"
          onClick={() => navigate('/profile/edit-resume')}
        />
      </BottomButtonPanel>
    </>
  );
};

export default ManageResumePage;
