import Button from '@/components/Common/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { usePatchResumeAccepted } from '@/hooks/api/useApplication';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';

const EmployerApplicantResumeButton = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { mutateAsync } = usePatchResumeAccepted();

  const onClickAcceptButton = async (isAccepted: boolean) => {
    if (isNaN(Number(id))) return;

    // data 사용 안 하고있어서 우선 제외
    const data = await mutateAsync({
      id: Number(id),
      isAccepted: { is_accepted: isAccepted },
    });

    if (data?.success) navigate(`/employer/applicant/${id}`);
  };

  return (
    <BottomButtonPanel>
      <div className="w-full flex gap-2">
        <Button
          type={Button.Type.NEUTRAL}
          layout={Button.Layout.SMALL_BUTTON}
          size={Button.Size.LG}
          title="거절"
          onClick={() => onClickAcceptButton(false)}
        />
        <Button
          type={Button.Type.PRIMARY}
          layout={Button.Layout.FLEX_BUTTON}
          size={Button.Size.LG}
          isFullWidth
          title="수락"
          onClick={() => onClickAcceptButton(true)}
        />
      </div>
    </BottomButtonPanel>
  );
};

export default EmployerApplicantResumeButton;
