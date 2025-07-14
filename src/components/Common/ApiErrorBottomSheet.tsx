import Button from '@/components/Common/Button';
import { BottomSheet } from '@/components/Common/BottomSheet';

type ApiErrorBottomSheetPropsType = {
  errorMessage: string;
  isShowBottomsheet: boolean;
  setIsShowBottomSheet: (isShowBottomsheet: boolean) => void;
};

const ApiErrorBottomSheet = ({
  errorMessage,
  isShowBottomsheet,
  setIsShowBottomSheet,
}: ApiErrorBottomSheetPropsType) => {
  const handleClickBackButton = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = '/';

    setIsShowBottomSheet(false);
  };

  return (
    <BottomSheet
      isAvailableHidden={false}
      isShowBottomsheet={isShowBottomsheet}
    >
      <BottomSheet.Header
        title="문제가 발생했어요! 😢"
        align={BottomSheet.Header.Align.CENTER}
      />
      <BottomSheet.Content>
        <p className="body-14-regular text-text-normal">{errorMessage}</p>
      </BottomSheet.Content>
      <BottomSheet.ButtonGroup>
        <Button
          type={Button.Type.PRIMARY}
          size={Button.Size.LG}
          isFullWidth
          title={'뒤로가기'}
          onClick={handleClickBackButton}
        />
      </BottomSheet.ButtonGroup>
    </BottomSheet>
  );
};

export default ApiErrorBottomSheet;
