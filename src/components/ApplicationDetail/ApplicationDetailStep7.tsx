import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { ApplicationStepType } from '@/types/application/applicationItem';
import { APPLICATION_STEP } from '@/constants/application';
import SuccessIcon from '@/assets/icons/ApplicationDetail/SuccessIcon.svg?react';
import RejectIcon from '@/assets/icons/ApplicationDetail/RejectIcon.svg?react';

type ApplicationDetailStep7Props = {
  result: ApplicationStepType;
};

const ApplicationDetailStep7 = ({ result }: ApplicationDetailStep7Props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <section className="w-full px-4 pt-3 pb-[3.125rem]">
      {result === APPLICATION_STEP.APPLICATION_SUCCESS ? (
        <div className="flex items-center gap-1 mb-6 py-[0.625rem] px-2 bg-[#0066FF]/10 rounded">
          <SuccessIcon />
          <p className="caption text-text-success">
            This application is successed.
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-1 mb-6 py-[0.625rem] px-2 bg-[#ff5252]/10 rounded">
          <RejectIcon />
          <p className="caption text-text-error">
            This application is rejected.
          </p>
        </div>
      )}
      <Button
        type={buttonTypeKeys.APPLY}
        bgColor={'bg-primary-normal'}
        fontColor="text-surface-invert"
        isBorder={false}
        title="Check the application documents"
        onClick={() => navigate(`/application-documents/${id}`)}
      />
    </section>
  );
};

export default ApplicationDetailStep7;
