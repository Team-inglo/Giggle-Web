import MenuIcon from '@/assets/icons/ThreeDots.svg?react';
import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import { useState } from 'react';
import Button from '@/components/Common/Button';
import { usePatchLanguagesLevel } from '@/hooks/api/useResume';
import { LanguagesLevelType } from '@/types/api/resumes';
import { profileTranslation } from '@/constants/translation';
import { useLocation } from 'react-router-dom';
import { isEmployer } from '@/utils/signup';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import Icon from '@/components/Common/Icon';
import CheckIcon from '@/assets/icons/BottomSheetCheckIcon.svg?react';

type LanguageCardProps = {
  title: string;
  level: number;
  maxLevel: number;
};

const LanguageCard = ({ title, level, maxLevel }: LanguageCardProps) => {
  const pathname = useLocation().pathname;
  const { account_type } = useUserStore();
  const [levelBottomSheetOpen, setLevelBottomSheetOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(level);

  const { mutate: patchLanguagesLevel } = usePatchLanguagesLevel();

  const handleLevelChange = () => {
    const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
    patchLanguagesLevel({
      type:
        formattedTitle === 'social-integration'
          ? 'social-integration-program'
          : (formattedTitle as LanguagesLevelType),
      level: selectedLevel as number,
    });

    setLevelBottomSheetOpen(false);
  };

  const openLevelBottomSheet = () => {
    setSelectedLevel(level);
    setLevelBottomSheetOpen(true);
  };

  return (
    <>
      {/* 언어 레벨 선택 바텀 시트 */}
      {levelBottomSheetOpen && (
        <BottomSheetLayout
          isAvailableHidden={true}
          isShowBottomsheet={true}
          setIsShowBottomSheet={setLevelBottomSheetOpen}
        >
          <div className="heading-20-semibold text-text-strong pt-2 pb-3 px-1">
            Choose your {title} Grade
          </div>
          {/* 언어 등급 선택 (1 ~ maxLevel) */}
          <div className="w-full h-[48vh] px-1 no-scrollbar">
            {[...Array(maxLevel).keys()].map((grade) => (
              <div
                key={grade}
                className="w-full flex items-center justify-between py-3"
                onClick={() => setSelectedLevel(grade + 1)}
              >
                <div className="body-16-regular text-text-normal">
                  Grade {grade + 1}
                </div>
                {selectedLevel === grade + 1 && <Icon icon={CheckIcon} />}
              </div>
            ))}
          </div>
          <div className="">
            <Button
              type="large"
              title="Select"
              bgColor="bg-surface-primary"
              fontColor="text-text-strong"
              onClick={handleLevelChange}
            />
          </div>
        </BottomSheetLayout>
      )}
      {/* 컴포넌트 시작 */}
      <div className="flex justify-between items-center w-full py-4">
        <section className="flex gap-2 items-center">
          <h5 className="pb-[0.125rem] button-14-semibold  text-text-strong">
            {title}
          </h5>
          <div className="px-1.5 py-0.5 rounded-sm text-status-blue-300 bg-status-blue-100 caption-11-semibold">
            {account_type === UserType.OWNER
              ? `${level} ${profileTranslation.level[isEmployer(pathname)]}`
              : `LEVEL ${level}`}
          </div>
        </section>
        <div className="flex items-center gap-2">
          {account_type === UserType.USER && (
            <div className="flex justify-center items-center">
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

export default LanguageCard;
