import { Dispatch, SetStateAction } from 'react';
import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import NumberRadioButton from '@/components/Language/NumberRadioButton';
import Button from '@/components/Common/Button';

type LevelBottomSheetProps = {
  level: number;
  setLevel: Dispatch<SetStateAction<number>>;
  setBottomSheetOpen: Dispatch<SetStateAction<boolean>>;
};

const LevelBottomSheet = ({
  level,
  setLevel,
  setBottomSheetOpen,
}: LevelBottomSheetProps) => {
  return (
    <BottomSheetLayout
      isAvailableHidden={true}
      isShowBottomsheet={true}
      setIsShowBottomSheet={setBottomSheetOpen}
    >
      <div className="heading-20-semibold text-[#1E1926] py-3 pb-8 text-center">
        Select your Language Level
      </div>
      {/* ETC 언어 등급 선택 0~10 */}
      <div className="w-full h-[48vh] overflow-x-scroll">
        {[...Array(11).keys()].map((grade) => (
          <div
            key={grade}
            className="w-full flex items-center justify-between px-2.5 py-2.5"
          >
            <div className="ml-2 body-14-regular text-[#656565]">
              Grade {grade}
            </div>
            <NumberRadioButton
              value={grade}
              setValue={() => setLevel(grade)}
              isOn={level === grade}
            />
          </div>
        ))}
      </div>
      <div className="bg-grayGradient">
        <Button
          type="large"
          title="Select"
          bgColor="bg-[#FEF387]"
          fontColor="text-[#1E1926]"
          onClick={() => setBottomSheetOpen(false)}
        />
      </div>
    </BottomSheetLayout>
  );
};

export default LevelBottomSheet;
