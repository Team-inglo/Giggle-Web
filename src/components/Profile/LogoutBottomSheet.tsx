import { useLocation } from 'react-router-dom';
import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import Button from '@/components/Common/Button';
import { profileTranslation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';

type LogoutBottomSheetProps = {
  handleLogout: () => void;
  handleLogoutCancel: () => void;
  isShowBottomsheet: boolean;
  setIsShowBottomSheet: (isShowBottomsheet: boolean) => void;
};

const LogoutBottomSheet = ({
  handleLogout,
  handleLogoutCancel,
  isShowBottomsheet,
  setIsShowBottomSheet,
}: LogoutBottomSheetProps) => {
  const { pathname } = useLocation();

  return (
    <BottomSheetLayout
      hasHandlebar={true}
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <div className="w-full flex flex-col py-10">
        <div className="head-2 text-text-normal py-3 px-12 text-center">
          {profileTranslation.wantLogout[isEmployer(pathname)]}
        </div>
        <div className="flex flex-col gap-2">
          {/* 로그아웃 버튼 */}
          <Button
            type="large"
            title={profileTranslation.yes[isEmployer(pathname)]}
            isBorder={false}
            bgColor="bg-surface-primary"
            fontColor="text-text-normal"
            onClick={handleLogout}
          />
          {/* 로그아웃 취소 버튼 */}
          <Button
            type="large"
            title={profileTranslation.no[isEmployer(pathname)]}
            isBorder={false}
            bgColor="bg-surface-secondary"
            fontColor="text-text-normal"
            onClick={handleLogoutCancel}
          />
        </div>
      </div>
    </BottomSheetLayout>
  );
};

export default LogoutBottomSheet;
