import BaseHeader from '@/components/Common/Header/BaseHeader';
import EmployerJobInfo from '@/components/Employer/Profile/EmployerJobInfo';
import EmployerProfileCard from '@/components/Employer/Profile/EmployerProfileCard';
import EmployerProfileMenuList from '@/components/Employer/Profile/EmployerProfileMenuList';
import LogoutBottomSheet from '@/components/Profile/LogoutBottomSheet';
import { headerTranslation } from '@/constants/translation';
import { useLogout } from '@/hooks/api/useAuth';
import { isEmployer } from '@/utils/signup';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const EmployerProfilePage = () => {
  const [logoutBottomSheet, setLogoutBottomSheet] = useState(false);
  const { pathname } = useLocation();
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout();
  };
  const handleBottomSheetOpen = () => {
    setLogoutBottomSheet(true);
  };

  return (
    <>
      {/* 로그아웃 바텀시트 */}
      {logoutBottomSheet && (
        <LogoutBottomSheet
          handleLogout={handleLogout} // 로그아웃 버튼
          handleLogoutCancel={() => setLogoutBottomSheet(false)} // 취소 버튼
          isShowBottomsheet={logoutBottomSheet}
          setIsShowBottomSheet={setLogoutBottomSheet}
        />
      )}
      <div className="w-full h-full min-h-[100vh] bg-[#f4f4f9]">
        <BaseHeader
          hasBackButton={false}
          hasMenuButton={false}
          title={headerTranslation.profile[isEmployer(pathname)]}
        />
        <div className="flex flex-col px-4 gap-4 pb-24">
          <EmployerProfileCard />
          <EmployerJobInfo />
          <EmployerProfileMenuList
            handleBottomSheetOpen={handleBottomSheetOpen}
          />
        </div>
      </div>
    </>
  );
};

export default EmployerProfilePage;
