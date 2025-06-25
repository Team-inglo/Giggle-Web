import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';

type PostApplyErrorBottomSheetType = {
  isShowBottomsheet: boolean;
  setIsShowBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostApplyErrorBottomSheet = ({
  isShowBottomsheet,
  setIsShowBottomSheet,
}: PostApplyErrorBottomSheetType) => {
  return (
    <BottomSheetLayout
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <div className="w-full flex flex-col items-center text-center">
        <h3 className="px-[1.625rem] pb-[2rem] heading-20-semibold text-[#1E1926]">
          This is the announcement you've already applied for.
        </h3>
        <p className="px-[1.625rem] pb-[0.25rem] button-14-semibold text-[#7872ED]">
          The announcement you applied for can be found on the application
          document management menu.
        </p>
      </div>
      <div className="w-full py-[3rem] flex flex-col gap-[0.5rem]">
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor="bg-[#FEF387]"
          fontColor="text-[#1E1926]"
          title="OK"
          onClick={() => setIsShowBottomSheet(false)}
        />
      </div>
    </BottomSheetLayout>
  );
};

export default PostApplyErrorBottomSheet;
