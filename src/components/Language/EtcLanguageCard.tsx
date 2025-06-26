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
import { getLanguageProficiencyLevelKoFromEnum } from '../../utils/resume';

type EtcLanguageCardProps = {
  title: string;
  level: LanguageProficiencyLevel;
  etcLanguageId: number;
};

const EtcLanguageCard = ({
  title,
  level,
  etcLanguageId,
}: EtcLanguageCardProps) => {
  const { account_type } = useUserStore();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [levelBottomSheetOpen, setLevelBottomSheetOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] =
    useState<LanguageProficiencyLevel>(level);

  const { mutate: deleteEtcLanguage } = useDeleteEtcLanguageLevel();
  const { mutate: patchEtcLanguageLevel } = usePatchEtcLanguageLevel();

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
      {modalOpen && (
        <ResumeDeleteModal
          onEditButton={openLevelBottomSheet}
          onDeleteButton={handleDelete}
          setIsShowBottomSheet={() => setModalOpen(false)}
        />
      )}
      {levelBottomSheetOpen && (
        <LevelBottomSheet
          level={selectedLevel}
          setLevel={(value) =>
            setSelectedLevel(value as LanguageProficiencyLevel)
          }
          setBottomSheetOpen={handleLevelChange}
        />
      )}
      <div className="flex justify-between items-center w-full py-4">
        <section className="flex gap-2 items-center">
          <h5 className="pb-[0.125rem] button-14-semibold text-text-strong">
            {title}
          </h5>
          <div className="px-1.5 py-0.5 rounded-sm text-status-blue-300 bg-status-blue-100 caption-11-semibold">
            {account_type === UserType.OWNER
              ? getLanguageProficiencyLevelKoFromEnum(level)
              : getLanguageProficiencyLevelEnFromEnum(level)}
          </div>
        </section>
        <div className="flex items-center gap-2">
          {account_type === UserType.USER && (
            <div className="flex justify-center items-center">
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

export default EtcLanguageCard;
