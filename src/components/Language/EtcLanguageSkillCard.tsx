import MenuIcon from '@/assets/icons/ThreeDots.svg?react';
import { useState } from 'react';
import {
  useDeleteEtcLanguageLevel,
  usePatchEtcLanguageLevel,
} from '@/hooks/api/useResume';
import { LanguageProficiencyLevel } from '@/types/api/resumes';
import ResumeDeleteModal from '@/components/ManageResume/ResumeDeleteModal';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import {
  getLanguageProficiencyLevelEnFromEnum,
  getLanguageProficiencyLevelEnumFromEn,
} from '@/utils/resume';
import LevelBottomSheet from '@/components/Language/LevelBottomSheet';
import { getLanguageProficiencyLevelKoFromEnum } from '@/utils/resume';
import { useLocation } from 'react-router-dom';

type EtcLanguageCardProps = {
  title: string;
  level: LanguageProficiencyLevel;
  etcLanguageId: number;
};

const EtcLanguageSkillCard = ({
  title,
  level,
  etcLanguageId,
}: EtcLanguageCardProps) => {
  const { pathname } = useLocation();
  const { account_type } = useUserStore();
  const [modalOpen, setModalOpen] = useState<boolean>(false); // 언어 삭제 모달 상태
  const [levelBottomSheetOpen, setLevelBottomSheetOpen] = useState(false); // 언어 레벨 선택 바텀 시트 상태
  const [selectedLevel, setSelectedLevel] =
    useState<LanguageProficiencyLevel>(level); // 선택된 언어 레벨

  const { mutate: deleteEtcLanguage } = useDeleteEtcLanguageLevel(); // 언어 삭제 함수
  const { mutate: patchEtcLanguageLevel } = usePatchEtcLanguageLevel(); // 언어 레벨 변경 함수

  const getPadding = () => {
    if (pathname === '/resume/language/edit') {
      return 'py-2';
    }
    return 'py-4';
  };
  // 언어 레벨 변경 함수
  const handleLevelChange = () => {
    patchEtcLanguageLevel({
      id: etcLanguageId,
      data: {
        language_name: title,
        level: getLanguageProficiencyLevelEnumFromEn(
          selectedLevel,
        ) as LanguageProficiencyLevel,
      },
    });
    setLevelBottomSheetOpen(false);
    setModalOpen(false);
  };

  const openLevelBottomSheet = () => {
    setSelectedLevel(level);
    setLevelBottomSheetOpen(true);
  };

  const handleDelete = () => {
    deleteEtcLanguage(etcLanguageId);
  };

  return (
    <>
      {/* 언어 삭제 모달 */}
      {modalOpen && (
        <ResumeDeleteModal
          onEditButton={openLevelBottomSheet}
          onDeleteButton={handleDelete}
          setIsShowBottomSheet={() => setModalOpen(false)}
        />
      )}
      {/* 언어 레벨 선택 바텀 시트 */}
      {levelBottomSheetOpen && (
        <LevelBottomSheet
          level={selectedLevel}
          setLevel={(value) =>
            setSelectedLevel(value as LanguageProficiencyLevel)
          }
          setBottomSheetOpen={handleLevelChange}
        />
      )}
      <div
        className={`flex justify-between items-center w-full ${getPadding()}`}
      >
        <section className="flex gap-2 items-center justify-center">
          <h5
            className={`${
              pathname === '/resume/language/edit'
                ? 'heading-18-semibold'
                : 'button-14-semibold'
            } pb-[0.125rem] text-text-strong`}
          >
            {title}
          </h5>
          {/* 언어 레벨 표시 */}
          <div className="px-1.5 py-0.5 rounded-md text-status-blue-300 bg-status-blue-100 caption-12-semibold">
            {account_type === UserType.OWNER
              ? getLanguageProficiencyLevelKoFromEnum(level)
              : getLanguageProficiencyLevelEnFromEnum(level)}
          </div>
        </section>
        <div className="flex items-center gap-2">
          {/* 언어 편집/삭제 메뉴(PostLanguagePage) */}
          {pathname === '/resume/language/edit' && (
            <div className="flex justify-center items-center w-6 h-6">
              <MenuIcon
                onClick={() => setModalOpen(true)}
                className="cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EtcLanguageSkillCard;
