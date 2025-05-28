import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';

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
    <BottomSheetLayout
      hasHandlebar={false}
      isAvailableHidden={false}
      isShowBottomsheet={isShowBottomsheet}
    >
      <div className="w-full pt-2 px-2 pb-6 flex flex-col gap-6 items-center text-center">
        <h3 className="heading-18-semibold text-text-normal">
          문제가 발생했어요 ! 😢
        </h3>
        <p className="body-14-regular text-text-normal">{errorMessage}</p>
      </div>
      <div className="w-full pt-3">
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor="bg-surface-primary"
          fontColor="text-text-normal"
          isBorder={false}
          title={'뒤로가기'}
          onClick={handleClickBackButton}
        />
      </div>
    </BottomSheetLayout>
  );
};

export default ApiErrorBottomSheet;
