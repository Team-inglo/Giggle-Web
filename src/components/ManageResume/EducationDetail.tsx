import { EducationType } from '@/types/postApply/resumeDetailItem';
import { formatDate } from '@/utils/editResume';
import MenuIcon from '@/assets/icons/ThreeDots.svg?react';
import { useLocation } from 'react-router-dom';
import { useDeleteEducation } from '@/hooks/api/useResume';
import ResumeDeleteModal from '@/components/ManageResume/ResumeDeleteModal';
import { useState } from 'react';
import { profileTranslation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';

type EducationDetailProps = {
  data: EducationType[];
};

const EducationDetail = ({ data }: EducationDetailProps) => {
  const pathname = useLocation().pathname;
  const { account_type } = useUserStore();
  const { mutate } = useDeleteEducation();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const openModal = (id: number) => {
    setModalOpen(true);
    setSelectedId(id);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (selectedId) mutate(selectedId);
  };

  return (
    <>
      {modalOpen && (
        <ResumeDeleteModal
          onCancelButton={handleCancel}
          onDeleteButton={handleDelete}
        />
      )}
      <div className="flex flex-col gap-2">
        {data.map((education) => (
          <div key={education.id} className="flex justify-between items-start">
            <div>
              {/* 학력 정보 */}
              <div className="flex items-center gap-1 pb-[0.125rem]">
                <h5 className="button-2 text-text-strong">
                  {education.school_name}
                </h5>
              </div>
              <p className="pb-2 caption text-text-normal">{education.major}</p>
              <div className="flex gap-[0.5rem] caption">
                <p className="text-text-alternative">
                  {formatDate(education.start_date)}~
                  {formatDate(education.end_date)}
                </p>
                <p className="text-text-alternative">
                  {education.grade}
                  {profileTranslation.thGrade[isEmployer(pathname)]}
                </p>
              </div>
            </div>
            {/* 수정, 삭제 아이콘 */}
            {account_type === UserType.USER && (
              <div className="flex justify-center items-center">
                <MenuIcon
                  onClick={() => openModal(education.id)}
                  className="cursor-pointer"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default EducationDetail;
