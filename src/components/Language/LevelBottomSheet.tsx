import { Dispatch, SetStateAction } from 'react';
import Button from '@/components/Common/Button';
import CheckIcon from '@/assets/icons/BottomSheetCheckIcon.svg?react';
import Icon from '@/components/Common/Icon';
import { languageProficiencyLevelsEn } from '@/constants/manageResume';
import { BottomSheet } from '@/components/Common/BottomSheet';

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
    <BottomSheet
      isAvailableHidden={true}
      isShowBottomsheet={true}
      setIsShowBottomSheet={setBottomSheetOpen}
    >
      <BottomSheet.Header title="Select your Language Proficiency" />
      <BottomSheet.Content>
        {/* ETC 언어 등급 선택 0~10 */}
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
      </BottomSheet.Content>
      <BottomSheet.ButtonGroup variant={BottomSheet.ButtonGroupVariant.SINGLE}>
        <Button
          type={Button.Type.PRIMARY}
          size={Button.Size.LG}
          title="Select"
          onClick={() => setBottomSheetOpen(false)}
          isFullWidth
        />
      </BottomSheet.ButtonGroup>
    </BottomSheet>
  );
};

export default LevelBottomSheet;
