import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import { useNavigate } from 'react-router-dom';

const ApplicationDetailStep3 = ({ applicant_id }: { applicant_id: number }) => {
  const navigate = useNavigate();

  return (
    <section className="w-full px-4 pt-3 pb-[3.125rem]">
      <Button
        type={buttonTypeKeys.APPLY}
        bgColor={'bg-primary-normal'}
        fontColor="text-surface-invert"
        title="Check the application documents"
        onClick={() => navigate(`/application-documents/${applicant_id}`)}
      />
    </section>
  );
};

export default ApplicationDetailStep3;
