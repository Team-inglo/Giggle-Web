import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';
import { UserType } from '@/constants/user';
import { useUserStore } from '@/store/user';

type CommingSoonBottomSheetPropsType = {
  isShowBottomsheet: boolean;
  setIsShowBottomSheet: (isShowBottomsheet: boolean) => void;
};

const CommingSoonBottomSheet = ({
  isShowBottomsheet,
  setIsShowBottomSheet,
}: CommingSoonBottomSheetPropsType) => {
  const { account_type } = useUserStore();

  return (
    <BottomSheetLayout
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <div className="w-full pt-2 px-2 pb-6 flex flex-col gap-6 items-center text-center">
        {account_type === UserType.OWNER ? (
          <>
            <h3 className="heading-18-semibold text-[#252525]">
              현재 준비 중인 메뉴입니다 🚀
            </h3>
            <p className="body-14-regular text-[#252525]">
              이 기능은 아직 제공되지 않았지만
              <br />곧 출시될 예정입니다!
            </p>
          </>
        ) : (
          <>
            <h3 className="heading-18-semibold text-[#252525]">
              Smart Job Matches? Almost there! 🚀
            </h3>
            <p className="body-14-regular text-[#252525]">
              This feature isn’t available yet,
              <br />
              but it’s coming soon!
            </p>
          </>
        )}
      </div>
      <div className="w-full pt-3">
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor="bg-[#FEF387]"
          fontColor="text-[#1E1926]"
          isBorder={false}
          title="Okay"
          onClick={() => setIsShowBottomSheet(false)}
        />
      </div>
    </BottomSheetLayout>
  );
};

export default CommingSoonBottomSheet;
