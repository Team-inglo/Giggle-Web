import Button from '@/components/Common/Button';
import { BottomSheet } from '@/components/Common/BottomSheet';

type LoginBottomSheetPropsType = {
  isShowBottomsheet: boolean;
  setIsShowBottomSheet: (isShowBottomsheet: boolean) => void;
};

const LoginBottomSheet = ({
  isShowBottomsheet,
  setIsShowBottomSheet,
}: LoginBottomSheetPropsType) => {
  return (
    <BottomSheet
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <BottomSheet.Content>
        <div className="w-full pt-2 pb-6 flex flex-col gap-6 items-center text-center">
          <h3 className="heading-18-semibold text-text-strong">
            Hold up! Let’s get you signed in 😊
          </h3>
          <p className="body-14-regular text-text-strong">
            Log in is required to use that menu!
          </p>
        </div>
      </BottomSheet.Content>
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

export default LoginBottomSheet;
