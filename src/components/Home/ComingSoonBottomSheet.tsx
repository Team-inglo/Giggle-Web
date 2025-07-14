import Button from '@/components/Common/Button';
import { UserType } from '@/constants/user';
import { useUserStore } from '@/store/user';
import { BottomSheet } from '@/components/Common/BottomSheet';

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
    <BottomSheet
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
      <BottomSheet.ButtonGroup variant={BottomSheet.ButtonGroupVariant.SINGLE}>
        <Button
          type={Button.Type.PRIMARY}
          size={Button.Size.LG}
          isFullWidth
          title="Okay"
          onClick={() => setIsShowBottomSheet(false)}
        />
      </BottomSheet.ButtonGroup>
    </BottomSheet>
  );
};

export default CommingSoonBottomSheet;
