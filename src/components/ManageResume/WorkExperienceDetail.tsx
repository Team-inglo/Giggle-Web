import { WorkExperienceType } from '@/types/postApply/resumeDetailItem';
import EditIcon from '@/assets/icons/ManageResume/EditIcon.svg?react';
import DeleteIcon from '@/assets/icons/ManageResume/DeleteIcon.svg?react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDeleteWorkExperience } from '@/hooks/api/useResume';
import { useState } from 'react';
import ResumeDeleteModal from '@/components/ManageResume/ResumeDeleteModal';
import { formatDate } from '@/utils/editResume';
import { infoTranslation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';

type WorkExperienceDetailProps = {
  data: WorkExperienceType[];
};

const WorkExperienceDetail = ({ data }: WorkExperienceDetailProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { mutate } = useDeleteWorkExperience();

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
        {data.map((work) => (
          <div
            key={work.id}
            className="w-full p-4 flex justify-between items-start bg-[#F4F4F9] rounded-lg"
          >
            <div>
              <h5 className="pb-[0.125rem] button-2 text-[#252525]">
                {work.title}
              </h5>
              <p className="pb-2 caption text-[#252525] whitespace-pre">
                {work.description !== '-'
                  ? work.description
                  : infoTranslation.notEntered[isEmployer(pathname)]}
              </p>
              <div className="flex gap-[0.5rem] caption">
                <p className="text-[#656565]">
                  {formatDate(work.start_date)}~
                  {work?.end_date ? formatDate(work.end_date) : ''}
                </p>
                <p className="text-[#5592FC]">{work.duration} months</p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-2 ml-1">
              <EditIcon
                onClick={() =>
                  navigate(`/resume/work-experience/edit/${work.id}`)
                }
                className="cursor-pointer"
              />
              <DeleteIcon
                onClick={() => openModal(work.id)}
                className="cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WorkExperienceDetail;
