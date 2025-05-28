import EditIcon from '@/assets/icons/ManageResume/EditIcon.svg?react';
import DeleteIcon from '@/assets/icons/ManageResume/DeleteIcon.svg?react';
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
          onCancelButton={() => setModalOpen(false)}
          onDeleteButton={handleDelete}
        />
      )}
      {/* 언어 레벨 선택 바텀 시트 */}
      {levelBottomSheetOpen && (
        <BottomSheetLayout
          hasHandlebar={true}
          isAvailableHidden={true}
          isShowBottomsheet={true}
          setIsShowBottomSheet={setLevelBottomSheetOpen}
        >
          <div className="heading-20-semibold text-[#1E1926] py-3 pb-8 text-center">
            Choose your {title} Grade
          </div>
          {/* 언어 등급 선택 (0 ~ maxLevel) */}
          <div className="w-full h-[48vh] overflow-x-scroll">
            {[...Array(maxLevel + 1).keys()].map((grade) => (
              <div
                key={grade}
                className="w-full flex items-center justify-between px-2.5 py-3"
              >
                <div className="ml-2 body-16-regular text-[#656565]">
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
          <div className="bg-grayGradient">
            <Button
              type="large"
              title="Select"
              isBorder={false}
              bgColor="bg-[#FEF387]"
              fontColor="text-[#1E1926]"
              onClick={handleLevelChange}
            />
          </div>
        </BottomSheetLayout>
      )}
      {/* 컴포넌트 시작 */}
      <div className="flex justify-between items-center w-full py-4">
        <div className="flex items-center gap-2">
          <h5 className="pb-[0.125rem] button-14-semibold text-[#464646]">
            {title}
          </h5>
          <div className="px-1 py-[0.188rem] rounded-sm text-[#0066FF] bg-[#0066FF1F] caption-12-regular">
            LEVEL {level}
          </div>
        </div>
        {etcLanguageId ? (
          <div className="flex justify-center items-center gap-2 ml-1">
            <EditIcon
              onClick={openLevelBottomSheet}
              className="cursor-pointer"
            />
            <DeleteIcon
              onClick={() => setModalOpen(true)}
              className="cursor-pointer"
            />
          </div>
        ) : (
          <EditIcon onClick={openLevelBottomSheet} className="cursor-pointer" />
        )}
      </div>
    </>
  );
};

export default LanguageCard;
