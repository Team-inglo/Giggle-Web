import { EducationType } from '@/types/postApply/resumeDetailItem';
import { formatDate } from '@/utils/editResume';
import EditIcon from '@/assets/icons/ManageResume/EditIcon.svg?react';
import DeleteIcon from '@/assets/icons/ManageResume/DeleteIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import { useDeleteEducation } from '@/hooks/api/useResume';
import { EDUCATION_PERIOD } from '@/constants/profile';
import ResumeDeleteModal from '@/components/ManageResume/ResumeDeleteModal';
import { useState } from 'react';

type EducationDetailProps = {
  data: EducationType[];
};

const EducationDetail = ({ data }: EducationDetailProps) => {
  const navigate = useNavigate();
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
          <div
            key={education.id}
            className="p-4 flex justify-between items-start bg-[#F4F4F9] rounded-lg"
          >
            <div>
              {/* 학력 정보 */}
              <div className="flex items-center gap-1 pb-[0.125rem]">
                <h5 className="button-2 text-[#252525]">
                  {education.school_name}
                </h5>
                <div className="px-1 py-[0.188rem] rounded-sm text-[#0066FF] bg-[#0066FF1F] caption">
                  {EDUCATION_PERIOD[education.education_level]} years program
                </div>
              </div>
              <p className="pb-2 caption text-[#252525]">{education.major}</p>
              <div className="flex gap-[0.5rem] caption">
                <p className="text-[#656565]">
                  {formatDate(education.start_date)}~
                  {formatDate(education.end_date)}
                </p>
                <p className="text-[#5592FC]">{education.grade}th grade</p>
              </div>
            </div>
            {/* 수정, 삭제 아이콘 */}
            <div className="flex justify-center items-center gap-2 ml-1">
              <EditIcon
                onClick={() =>
                  navigate(`/resume/education/edit/${education.id}`)
                }
                className="cursor-pointer"
              />
              <DeleteIcon
                onClick={() => openModal(education.id)}
                className="cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EducationDetail;
