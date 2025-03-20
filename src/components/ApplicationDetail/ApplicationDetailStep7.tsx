import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { ApplicationStepType } from '@/types/application/applicationItem';
import { APPLICATION_STEP } from '@/constants/application';

type ApplicationDetailStep7Props = {
  result: ApplicationStepType;
};

const ApplicationDetailStep7 = ({ result }: ApplicationDetailStep7Props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <section className="flex flex-col items-center gap-3 w-full px-6 pt-3 pb-[3.125rem]">
      {result == APPLICATION_STEP.APPLICATION_SUCCESS ? (
        <p className="button-2 text-[#7872ED]">
          This application is successed.
        </p>
      ) : (
        <p className="button-2 text-[#FF6F61]">This application is rejected.</p>
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
