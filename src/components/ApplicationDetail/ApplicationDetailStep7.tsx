import Button from '@/components/Common/Button';
import { useNavigate, useParams } from 'react-router-dom';

const ApplicationDetailStep7 = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <section className="w-full px-4 pt-3 pb-[3.125rem]">
      <Button
        type={Button.Type.PRIMARY}
        size={Button.Size.LG}
        isFullWidth
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
