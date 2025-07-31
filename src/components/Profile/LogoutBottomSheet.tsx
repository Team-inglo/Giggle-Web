import { useLocation } from 'react-router-dom';
import Button from '@/components/Common/Button';
import { profileTranslation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';
import { BottomSheet } from '@/components/Common/BottomSheet';

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
    <BottomSheet
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <BottomSheet.Header
        title={profileTranslation.wantLogout[isEmployer(pathname)]}
        align={BottomSheet.Header.Align.CENTER}
      />
      <BottomSheet.ButtonGroup
        variant={BottomSheet.ButtonGroupVariant.TWO_VERTICAL}
      >
        {/* 로그아웃 버튼 */}
        <Button
          type={Button.Type.PRIMARY}
          title={profileTranslation.yes[isEmployer(pathname)]}
          size={Button.Size.LG}
          isFullWidth
          onClick={handleLogout}
        />
        {/* 로그아웃 취소 버튼 */}
        <Button
          type={Button.Type.NEUTRAL}
          title={profileTranslation.no[isEmployer(pathname)]}
          size={Button.Size.LG}
          isFullWidth
          onClick={handleLogoutCancel}
        />
      </BottomSheet.ButtonGroup>
    </BottomSheet>
  );
};

export default LogoutBottomSheet;
