import SmallCheckIcon from '@/assets/icons/SmallCheckIcon.svg?react';
import Button from '@/components/Common/Button';
import { useNavigate } from 'react-router-dom';
import { BottomSheet } from '@/components/Common/BottomSheet';

type LoginBottomSheetPropsType = {
  isShowBottomsheet: boolean;
  setIsShowBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginBottomSheet = ({
  isShowBottomsheet,
  setIsShowBottomSheet,
}: LoginBottomSheetPropsType) => {
  const navigate = useNavigate();

  return (
    <BottomSheet
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <BottomSheet.Header title="You’re not logged in. Sign in for a better experience!" />
      <BottomSheet.Content>
        <div className="flex items-center gap-[0.25rem] pb-[0.25rem]">
          <SmallCheckIcon />
          <p className="caption-12-regular text-text-normal">
            continue exploring all our services
          </p>
        </div>
        <div className="flex items-center gap-[0.25rem] pb-[0.25rem]">
          <SmallCheckIcon />
          <p className="caption-12-regular text-text-normal">
            save your favorite jobs and track your applications!
          </p>
        </div>
        <div className="flex items-center gap-[0.25rem] pb-[0.75rem]">
          <SmallCheckIcon />
          <p className="caption-12-regular text-text-normal">
            access personalized recommendations
          </p>
        </div>
      </BottomSheet.Content>
      <BottomSheet.ButtonGroup>
        <Button
          type={Button.Type.PRIMARY}
          size={Button.Size.LG}
          isFullWidth
          title="Continue"
          onClick={() => navigate('/signin')}
        />
        <div className="flex justify-center gap-[0.5rem]">
          <p className="caption-12-regular text-[#7D8A95]">
            Don't have an account?
          </p>
          <button
            className="caption-12-regular text-[#7872ED]"
            onClick={() => navigate('/signin')}
          >
            Create Account
          </button>
        </div>
      </BottomSheet.ButtonGroup>
    </BottomSheet>
  );
};

export default LoginBottomSheet;
