import MenuIcon from '@/assets/icons/ThreeDots.svg?react';
import { useState } from 'react';
import Button from '@/components/Common/Button';
import { usePatchLanguagesLevel } from '@/hooks/api/useResume';
import { LanguagesLevelType } from '@/types/api/resumes';
import { BottomSheet } from '@/components/Common/BottomSheet';
import SelectListItem from '@/components/Common/Select/SelectListItem';

type LanguageSkillCardProps = {
  title: string;
  level: number;
  maxLevel: number;
};

const LanguageSkillCard = ({
  title,
  level,
  maxLevel,
}: LanguageSkillCardProps) => {
  const LEVEL_NOT_ENTERED = 0; // 언어 레벨 미입력 상태
  const [levelBottomSheetOpen, setLevelBottomSheetOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(level);

  const { mutate: patchLanguagesLevel } = usePatchLanguagesLevel();

  const handleLevelChange = () => {
    const formattedTitle = title.toLowerCase().replace(/\s+/g, '-'); // 언어 레벨 변경 시 포맷팅
    patchLanguagesLevel({
      type:
        formattedTitle === 'social-integration'
          ? 'social-integration-program'
          : (formattedTitle as LanguagesLevelType),
      level: selectedLevel as number,
    });
    // 언어 레벨 선택 바텀 시트 닫기
    setLevelBottomSheetOpen(false);
  };
  // 언어 레벨 선택 바텀 시트 열기
  const openLevelBottomSheet = () => {
    setSelectedLevel(level);
    setLevelBottomSheetOpen(true);
  };

  return (
    <>
      {/* 언어 레벨 선택 바텀 시트 */}
      {levelBottomSheetOpen && (
        <BottomSheet
          isAvailableHidden={true}
          isShowBottomsheet={true}
          setIsShowBottomSheet={setLevelBottomSheetOpen}
        >
          <BottomSheet.Header title={`Choose your ${title} Grade`} />
          <BottomSheet.Content>
            {/* 언어 등급 선택 (1 ~ maxLevel) */}
            {[...Array(maxLevel).keys()].map((grade) => (
              <SelectListItem
                key={grade}
                selectionType={SelectListItem.SelectionType.SINGLE}
                title={`Grade ${grade + 1}`}
                isSelected={selectedLevel === grade + 1}
                iconPosition={SelectListItem.IconPosition.RIGHT}
                onClick={() => setSelectedLevel(grade + 1)}
              />
            ))}
          </BottomSheet.Content>
          <BottomSheet.ButtonGroup
            variant={BottomSheet.ButtonGroupVariant.SINGLE}
          >
            <Button
              type={Button.Type.PRIMARY}
              size={Button.Size.LG}
              isFullWidth
              title="Select"
              onClick={handleLevelChange}
            />
          </BottomSheet.ButtonGroup>
        </BottomSheet>
      )}
      {/* 컴포넌트 시작 */}
      <div className="flex justify-between items-center w-full py-2">
        <section className="flex gap-2 items-center justify-center">
          <h5 className="pb-[0.125rem] heading-18-semibold  text-text-strong">
            {title}
          </h5>
          {/* TODO: 언어 레벨 표시, Badge 컴포넌트 완성되는대로 수정 */}
          <div className="px-1.5 py-0.5 rounded-md text-status-blue-300 bg-status-blue-100 caption-12-semibold">
            {level !== LEVEL_NOT_ENTERED && `LEVEL ${level}`}
          </div>
        </section>
        <div className="flex items-center gap-2">
          {level === LEVEL_NOT_ENTERED ? (
            <div className="flex justify-center items-center">
              <Button
                type={Button.Type.NEUTRAL}
                size={Button.Size.MD}
                title="Add"
                onClick={openLevelBottomSheet}
              />
            </div>
          ) : (
            <div className="flex w-6 h-6 justify-center items-center">
              <MenuIcon
                onClick={openLevelBottomSheet}
                className="cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LanguageSkillCard;
