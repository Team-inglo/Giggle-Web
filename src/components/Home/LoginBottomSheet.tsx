import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';

type LoginBottomSheetPropsType = {
  isShowBottomsheet: boolean;
  setIsShowBottomSheet: (isShowBottomsheet: boolean) => void;
};

const LoginBottomSheet = ({
  isShowBottomsheet,
  setIsShowBottomSheet,
}: LoginBottomSheetPropsType) => {
  return (
    <BottomSheetLayout
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <div className="w-full pt-2 px-2 pb-6 flex flex-col gap-6 items-center text-center">
        <h3 className="heading-18-semibold text-[#252525]">
          Hold up! Let’s get you signed in 😊
        </h3>
        <p className="body-14-regular text-[#252525]">
          Log in is required to use that menu!
        </p>
      </div>
      <div className="w-full pt-3">
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor="bg-[#FEF387]"
          fontColor="text-[#1E1926]"
          title="Okay"
          onClick={() => setIsShowBottomSheet(false)}
        />
      </div>
    </BottomSheetLayout>
  );
};

export default LoginBottomSheet;
