import Button from '@/components/Common/Button';
import { useNavigate, useParams } from 'react-router-dom';

const ApplicationDetailStep4 = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <section className="flex flex-col gap-2 w-full px-4 pt-3 pb-[3.125rem]">
        <Button
          type={Button.Type.PRIMARY}
          size={Button.Size.LG}
          isFullWidth
          title="Continue"
          onClick={() => navigate(`/application/${id}/school`)}
        />
        <Button
          type={Button.Type.NEUTRAL}
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
    </>
  );
};

export default ApplicationDetailStep4;
