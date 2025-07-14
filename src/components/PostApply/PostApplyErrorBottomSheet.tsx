import Button from '@/components/Common/Button';
import { BottomSheet } from '@/components/Common/BottomSheet';

type PostApplyErrorBottomSheetType = {
  isShowBottomsheet: boolean;
  setIsShowBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostApplyErrorBottomSheet = ({
  isShowBottomsheet,
  setIsShowBottomSheet,
}: PostApplyErrorBottomSheetType) => {
  return (
    <BottomSheet
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <BottomSheet.Header title="This is the announcement you've already applied for." />
      <BottomSheet.Content>
        <p className="px-[1.625rem] pb-[0.25rem] button-14-semibold text-[#7872ED]">
          The announcement you applied for can be found on the application
          document management menu.
        </p>
      </BottomSheet.Content>
      <BottomSheet.ButtonGroup>
        <Button
          type={Button.Type.PRIMARY}
          size={Button.Size.LG}
          isFullWidth
          title="OK"
          onClick={() => setIsShowBottomSheet(false)}
        />
      </BottomSheet.ButtonGroup>
    </BottomSheet>
  );
};

export default PostApplyErrorBottomSheet;
