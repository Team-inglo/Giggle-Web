import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import SmallCheckGrayIcon from '@/assets/icons/ApplicationDetail/SmallCheckGrayIcon.svg?react';
import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';

type ApplicationDetailBottomSheetType = {
  isShowBottomsheet: boolean;
  setIsShowBottomSheet: (isShowBottomsheet: boolean) => void;
  blackButtonTitle: string;
  onClickBlackButton: () => void;
  yellowButtonTitle: string;
  onClickYellowButton: () => void;
};

const ApplicationDetailBottomSheet = ({
  isShowBottomsheet,
  setIsShowBottomSheet,
  blackButtonTitle,
  onClickBlackButton,
  yellowButtonTitle,
  onClickYellowButton,
}: ApplicationDetailBottomSheetType) => {
  return (
    <BottomSheetLayout
      hasHandlebar={true}
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <div className="w-full flex flex-col items-center text-center">
        <h3 className="px-[1.625rem] pb-[1rem] heading-20-semibold text-[#1E1926]">
          Please prepare the following documents before making contact
        </h3>
        <div className="grid grid-cols-2">
          <div className="flex items-center gap-[0.75rem] px-[0.75rem]">
            <SmallCheckGrayIcon />
            <p className="caption-12-regular text-[#464646]">
              시간제취업허가서
            </p>
          </div>
          <div className="flex items-center gap-[0.75rem] px-[0.75rem]">
            <SmallCheckGrayIcon />
            <p className="caption-12-regular text-[#464646]">근로계약서</p>
          </div>
          <div className="flex items-center gap-[0.75rem] px-[0.75rem]">
            <SmallCheckGrayIcon />
            <p className="caption-12-regular text-[#464646]">통합신청서</p>
          </div>
          <div className="flex items-center gap-[0.75rem] px-[0.75rem]">
            <SmallCheckGrayIcon />
            <p className="caption-12-regular text-[#464646]">외국인등록증</p>
          </div>
          <div className="flex items-center gap-[0.75rem] px-[0.75rem]">
            <SmallCheckGrayIcon />
            <p className="caption-12-regular text-[#464646]">여권</p>
          </div>
          <div className="flex items-center gap-[0.75rem] px-[0.75rem]">
            <SmallCheckGrayIcon />
            <p className="caption-12-regular text-[#464646]">사업자등록증</p>
          </div>
        </div>
      </div>
      <div className="w-full py-[3rem] flex flex-col gap-[1rem]">
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor="bg-[#1E1926]"
          fontColor="text-[#FEF387]"
          isBorder={false}
          title={blackButtonTitle}
          onClick={onClickBlackButton}
        />
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor="bg-[#FEF387]"
          fontColor="text-[#1E1926]"
          isBorder={false}
          title={yellowButtonTitle}
          onClick={onClickYellowButton}
        />
      </div>
    </BottomSheetLayout>
  );
};

export default ApplicationDetailBottomSheet;
