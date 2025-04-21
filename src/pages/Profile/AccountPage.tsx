import BaseHeader from '@/components/Common/Header/BaseHeader';
import DeleteModal from '@/components/Profile/DeleteModal';
import ProfileMenu from '@/components/Profile/ProfileMenu';
import { profileTranslation } from '@/constants/translation';
import { useUserStore } from '@/store/user';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '@/constants/user';

const AccountPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { account_type } = useUserStore();
  const navigate = useNavigate();
  // 계정 삭제 모달 핸들러
  const handleDeleteButton = (value: boolean) => {
    setModalOpen(value);
  };

  return (
    <>
      {/* 계정 삭제 modal */}
      {modalOpen && (
        <DeleteModal
          onDeleteButton={handleDeleteButton} // 계정 삭제 취소 버튼
        />
      )}
      <BaseHeader
        hasBackButton
        onClickBackButton={() =>
          navigate(
            account_type === UserType.USER ? '/profile' : '/employer/profile',
          )
        }
        hasMenuButton={false}
        title={account_type === UserType.USER ? 'Account' : '계정'}
      />
      <div className="w-full h-full min-h-[100vh] bg-white">
        <div className="flex flex-col gap-4 pb-4 bg-white rounded-lg">
          <div className="flex flex-col divide-y divide-gray-200">
            <ProfileMenu
              title={
                account_type === UserType.USER
                  ? profileTranslation.changePassword.en
                  : profileTranslation.changePassword.ko
              }
              onClick={() => navigate('/profile/change-password')}
            />
            <ProfileMenu
              title={
                account_type === UserType.USER
                  ? profileTranslation.deleteAccount.en
                  : profileTranslation.deleteAccount.ko
              }
              onClick={() => handleDeleteButton(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
