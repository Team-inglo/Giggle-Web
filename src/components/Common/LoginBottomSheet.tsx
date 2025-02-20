import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import SmallCheckIcon from '@/assets/icons/SmallCheckIcon.svg?react';
import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';
import { useNavigate } from 'react-router-dom';

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
    <BottomSheetLayout
      hasHandlebar={true}
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <div className="w-full flex flex-col items-center text-center">
        <h3 className="px-[1.625rem] pb-[2rem] head-2 text-[#1E1926]">
          You’re not logged in.
          <br /> Sign in for a better experience!
        </h3>
        <p className="px-[1.625rem] pb-[0.25rem] button-2 text-[#7872ED]">
          Sign in for a better experience!
        </p>
        <div className="flex items-center gap-[0.25rem] pb-[0.25rem]">
          <SmallCheckIcon />
          <p className="body-3 text-[#464646]">
            continue exploring all our services
          </p>
        </div>
        <div className="flex items-center gap-[0.25rem] pb-[0.25rem]">
          <SmallCheckIcon />
          <p className="body-3 text-[#464646]">
            save your favorite jobs and track your applications!
          </p>
        </div>
        <div className="flex items-center gap-[0.25rem] pb-[0.75rem]">
          <SmallCheckIcon />
          <p className="body-3 text-[#464646]">
            access personalized recommendations
          </p>
        </div>
      </div>
      <div className="w-full py-[3rem] flex flex-col gap-[0.5rem]">
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor="bg-[#FEF387]"
          fontColor="text-[#1E1926]"
          isBorder={false}
          title="Continue"
          onClick={() => navigate('/signin')}
        />
        <div className="flex justify-center gap-[0.5rem]">
          <p className="caption text-[#7D8A95]">Don't have an account?</p>
          <button
            className="caption text-[#7872ED]"
            onClick={() => navigate('/signin')}
          >
            Create Account
          </button>
        </div>
      </div>
    </BottomSheetLayout>
  );
};

export default LoginBottomSheet;
