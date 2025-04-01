import { useState } from 'react';
import ApplicationStatus from '@/components/Profile/ApplicationStatus';
import ProfileCard from '@/components/Profile/ProfileCard';
import ProfileMenuList from '@/components/Profile/ProfileMenuList';
import LogoutBottomSheet from '@/components/Profile/LogoutBottomSheet';
import { useLogout } from '@/hooks/api/useAuth';
import { useGetUserSummaries } from '@/hooks/api/useProfile';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import { headerTranslation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';
import { useLocation } from 'react-router-dom';

const ProfilePage = () => {
  const [bottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);
  const { pathname } = useLocation();

  const { data } = useGetUserSummaries(true);

  // 로그아웃 바텀시트 핸들러
  const handleLogoutClick = () => {
    setBottomSheetOpen(true);
  };

  // API - 1.2 사용자 로그아웃
  const { mutate } = useLogout();
  const handleLogout = () => {
    mutate();
  };

  const handleLogoutCancel = () => {
    setBottomSheetOpen(false);
  };

  return (
    <>
      {data && data.success && (
        <>
          {/* bottom sheet */}
          {bottomSheetOpen && (
            <LogoutBottomSheet
              handleLogout={handleLogout}
              handleLogoutCancel={handleLogoutCancel}
              isShowBottomsheet={bottomSheetOpen}
              setIsShowBottomSheet={setBottomSheetOpen}
            />
          )}
          <div className="w-full h-full min-h-[100vh] bg-[#f4f4f9]">
            {/* Profile 페이지 시작 */}
            <BaseHeader
              hasBackButton={false}
              hasMenuButton={false}
              title={headerTranslation.profile[isEmployer(pathname)]}
            />
            <div className="flex flex-col px-4 gap-4 pb-24">
              <ProfileCard data={data.data.user_information} />
              <ApplicationStatus />
              <ProfileMenuList onLogoutClick={handleLogoutClick} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfilePage;
