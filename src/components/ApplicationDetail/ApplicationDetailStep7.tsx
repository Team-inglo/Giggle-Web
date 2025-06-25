import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import { useNavigate, useParams } from 'react-router-dom';

const ApplicationDetailStep7 = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <section className="w-full px-4 pt-3 pb-[3.125rem]">
      <Button
        type={buttonTypeKeys.APPLY}
        bgColor={'bg-primary-normal'}
        fontColor="text-surface-invert"
        title="Check the application documents"
        onClick={() =>
          navigate(`/application-documents/${id}`, {
            state: {
              isComplete: true,
            },
          })
        }
      />
    </section>
  );
};

export default ApplicationDetailStep7;
