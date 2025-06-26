import { Dispatch, SetStateAction } from 'react';
import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import Button from '@/components/Common/Button';
import CheckIcon from '@/assets/icons/BottomSheetCheckIcon.svg?react';
import Icon from '@/components/Common/Icon';
import { languageProficiencyLevelsEn } from '@/constants/manageResume';

type LevelBottomSheetProps = {
  level: string;
  setLevel: Dispatch<SetStateAction<string>>;
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
      <div className="heading-18-semibold text-text-strong px-1 py-3 text-left">
        Select your Language Proficiency
      </div>
      {/* ETC 언어 등급 선택 0~10 */}
      <div className="w-full h-[48vh] px-1">
        {languageProficiencyLevelsEn.map((languageLevel) => (
          <div
            key={languageLevel}
            className="w-full flex items-center justify-between py-3"
            onClick={() => setLevel(languageLevel)}
          >
            <div className="body-16-regular text-text-strong text-left">
              {languageLevel}
            </div>
            {level === languageLevel && <Icon icon={CheckIcon} />}
          </div>
        ))}
      </div>
      <Button
        type={Button.Type.PRIMARY}
        size={Button.Size.LG}
        title="Select"
        onClick={() => setBottomSheetOpen(false)}
        isFullWidth
      />
    </BottomSheetLayout>
  );
};

export default LevelBottomSheet;
