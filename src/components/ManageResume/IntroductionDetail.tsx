import EditIcon from '@/assets/icons/ManageResume/EditIcon.svg?react';
import DeleteIcon from '@/assets/icons/ManageResume/DeleteIcon.svg?react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDeleteIntroduction } from '@/hooks/api/useResume';
import { useState } from 'react';
import ResumeDeleteModal from '@/components/ManageResume/ResumeDeleteModal';
import { profileTranslation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';

type IntroductionDetailProps = {
  data: string;
};

const IntroductionDetail = ({ data }: IntroductionDetailProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { mutate } = useDeleteIntroduction();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };
  const handleDelete = () => {
    mutate();
  };

  return (
    <>
      {modalOpen && (
        <ResumeDeleteModal
          onCancelButton={handleCancel}
          onDeleteButton={handleDelete}
        />
      )}
      <div className="px-3 flex justify-between items-start">
        <div className="text-[#656565] flex flex-col">
          <p className="pb-2 body-3 text-[#9397A1]">
            {profileTranslation.introductionQuestion[isEmployer(pathname)]}
          </p>
          <p className="pb-2 body-3 text-[#252525] whitespace-pre-wrap break-all">
            {data}
          </p>
        </div>
        <div className="flex justify-center items-center gap-2 ml-1">
          <EditIcon
            onClick={() =>
              navigate('/resume/introduction', { state: { data } })
            }
            className="cursor-pointer"
          />
          <DeleteIcon onClick={openModal} className="cursor-pointer" />
        </div>
      </div>
    </>
  );
};

export default IntroductionDetail;
