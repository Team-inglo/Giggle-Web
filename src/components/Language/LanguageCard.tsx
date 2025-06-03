import MenuIcon from '@/assets/icons/ThreeDots.svg?react';
import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import { useState } from 'react';
import Button from '@/components/Common/Button';
import {
  useDeleteEtcLanguageLevel,
  usePatchEtcLanguageLevel,
  usePatchLanguagesLevel,
} from '@/hooks/api/useResume';
import NumberRadioButton from '@/components/Language/NumberRadioButton';
import { LanguagesLevelType } from '@/types/api/resumes';
import ResumeDeleteModal from '@/components/ManageResume/ResumeDeleteModal';
import { profileTranslation } from '@/constants/translation';
import { useLocation } from 'react-router-dom';
import { isEmployer } from '@/utils/signup';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';

type LanguageCardProps = {
  title: string;
  level: number;
  etcLanguageId?: number;
  maxLevel: number;
};

const LanguageCard = ({
  title,
  level,
  etcLanguageId,
  maxLevel,
}: LanguageCardProps) => {
  const pathname = useLocation().pathname;
  const { account_type } = useUserStore();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [levelBottomSheetOpen, setLevelBottomSheetOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(level);

  const { mutate: deleteEtcLanguage } = useDeleteEtcLanguageLevel();
  const { mutate: patchLanguagesLevel } = usePatchLanguagesLevel();
  const { mutate: patchEtcLanguageLevel } = usePatchEtcLanguageLevel();

  const handleLevelChange = () => {
    // 기타 언어 수정
    if (etcLanguageId) {
      patchEtcLanguageLevel({
        id: etcLanguageId,
        data: {
          language_name: title,
          level: selectedLevel,
        },
      });
    }
    // 기본 언어 수정
    else {
      const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
      patchLanguagesLevel({
        type:
          formattedTitle === 'social-integration'
            ? 'social-integration-program'
            : (formattedTitle as LanguagesLevelType),
        level: selectedLevel,
      });
    }
    setLevelBottomSheetOpen(false);
  };

  const openLevelBottomSheet = () => {
    setSelectedLevel(level);
    setLevelBottomSheetOpen(true);
  };

  const handleDelete = () => {
    if (etcLanguageId) deleteEtcLanguage(etcLanguageId);
  };

  return (
    <>
      {modalOpen && (
        <ResumeDeleteModal
          onEditButton={openLevelBottomSheet}
          onDeleteButton={handleDelete}
        />
      )}
      {/* 언어 레벨 선택 바텀 시트 */}
      {levelBottomSheetOpen && (
        <BottomSheetLayout
          hasHandlebar={false}
          isAvailableHidden={true}
          isShowBottomsheet={true}
          setIsShowBottomSheet={setLevelBottomSheetOpen}
        >
          <div className="heading-20-semibold text-text-strong pb-3">
            Choose your {title} Grade
          </div>
          {/* 언어 등급 선택 (0 ~ maxLevel) */}
          <div className="w-full h-[48vh] overflow-x-scroll no-scrollbar">
            {[...Array(maxLevel + 1).keys()].map((grade) => (
              <div
                key={grade}
                className="w-full flex items-center justify-between py-3"
              >
                <div className="body-16-regular text-text-normal">
                  Grade {grade}
                </div>
                <NumberRadioButton
                  value={grade}
                  setValue={() => setSelectedLevel(grade)}
                  isOn={selectedLevel === grade}
                />
              </div>
            ))}
          </div>
          <div className="">
            <Button
              type="large"
              title="Select"
              isBorder={false}
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
          <div className="px-1.5 py-0.5 rounded-sm text-statusBlue-300 bg-statusBlue-100 caption-11-semibold">
            {account_type === UserType.OWNER
              ? `${level} ${profileTranslation.level[isEmployer(pathname)]}`
              : `LEVEL ${level}`}
          </div>
        </section>
        <div className="flex items-center gap-2">
          {account_type === UserType.USER &&
            (etcLanguageId ? (
              <div className="flex justify-center items-center">
                <MenuIcon
                  onClick={() => setModalOpen(true)}
                  className="cursor-pointer"
                />
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <MenuIcon
                  onClick={openLevelBottomSheet}
                  className="cursor-pointer"
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default LanguageCard;
