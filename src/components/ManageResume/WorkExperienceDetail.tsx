import { WorkExperienceType } from '@/types/postApply/resumeDetailItem';
import MenuIcon from '@/assets/icons/ThreeDots.svg?react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDeleteWorkExperience } from '@/hooks/api/useResume';
import { useState } from 'react';
import ResumeDeleteModal from '@/components/ManageResume/ResumeDeleteModal';
import { formatDate } from '@/utils/editResume';
import { infoTranslation, profileTranslation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';

type WorkExperienceDetailProps = {
  data: WorkExperienceType[];
};

const WorkExperienceDetail = ({ data }: WorkExperienceDetailProps) => {
  const { pathname } = useLocation();
  const { account_type } = useUserStore();
  const { mutate } = useDeleteWorkExperience();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const openModal = (id: number) => {
    setModalOpen(true);
    setSelectedId(id);
  };

  const handleDelete = () => {
    if (selectedId) mutate(selectedId);
  };

  return (
    <>
      {modalOpen && (
        <ResumeDeleteModal
          onEditButton={() =>
            navigate(`/resume/work-experience/edit/${selectedId}`)
          }
          onDeleteButton={handleDelete}
          setIsShowBottomSheet={() => setModalOpen(false)}
        />
      )}
      <div className="flex flex-col gap-2 divide-y divide-surface-secondary">
        {data.map((work) => (
          <div
            key={work.id}
            className="w-full flex justify-between items-start pt-3"
          >
            <div className="flex flex-col gap-0.5">
              <h5 className="pb-[0.125rem] button-16-semibold text-text-strong">
                {work.title}
              </h5>
              <p className="pb-2 body-14-regular text-text-normal whitespace-pre-wrap break-all">
                {work.description !== '-'
                  ? work.description
                  : infoTranslation.notEntered[isEmployer(pathname)]}
              </p>
              <div className="flex gap-[0.5rem] caption-12-regular">
                <p className="text-text-alternative">
                  {formatDate(work.start_date)}~
                  {work?.end_date ? formatDate(work.end_date) : ''}
                </p>
                <p className="text-text-alternative">
                  {work.duration}
                  {profileTranslation.months[isEmployer(pathname)]}
                </p>
              </div>
            </div>
            {account_type === UserType.USER && (
              <div className="flex justify-center items-center">
                <MenuIcon
                  onClick={() => openModal(work.id)}
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

export default WorkExperienceDetail;
