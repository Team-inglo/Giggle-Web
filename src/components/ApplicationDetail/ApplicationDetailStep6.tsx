import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import { useNavigate, useParams } from 'react-router-dom';

const ApplicationDetailStep6 = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <section className="flex flex-col gap-2 w-full px-4 pt-3 pb-[3.125rem]">
      <Button
        type={buttonTypeKeys.LARGE}
        bgColor={'bg-primary-normal'}
        fontColor="text-surface-invert"
        isBorder={false}
        title="Register the results"
        onClick={() => navigate(`/application/result/${id}`)}
      />
      <Button
        type={buttonTypeKeys.APPLY}
        bgColor={'bg-primary-neutral'}
        fontColor="text-surface-invert"
        isBorder={false}
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

export default ApplicationDetailStep6;
