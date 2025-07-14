import Button from '@/components/Common/Button';
import RecruiterIcon from '@/assets/icons/ApplicationDetail/RecruiterIcon.svg?react';
import {
  useGetEmployerApplicationSummary,
  usePatchInterviewFinish,
} from '@/hooks/api/useApplication';
import { useParams } from 'react-router-dom';
import { sendReactNativeMessage } from '@/utils/reactNativeMessage';
import { BottomSheet } from '@/components/Common/BottomSheet';

type EmployerApplicantContactBottomSheetType = {
  isShowBottomsheet: boolean;
  setIsShowBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
};

const EmployerApplicantContactBottomSheet = ({
  isShowBottomsheet,
  setIsShowBottomSheet,
}: EmployerApplicantContactBottomSheetType) => {
  const { id } = useParams();
  const { data } = useGetEmployerApplicationSummary(
    Number(id),
    !isNaN(Number(id)),
  );
  const { mutate } = usePatchInterviewFinish(Number(id));

  const sendPhoneNumberToApp = (phoneNumber: number) => {
    const message = {
      type: 'CALL_PHONE',
      payload: String(phoneNumber).replace(/-/g, ''),
    };
    sendReactNativeMessage(message);
  };
  const onClickComplete = () => {
    if (!isNaN(Number(id))) mutate(Number(id));
  };

  return (
    <BottomSheet
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <BottomSheet.Content>
        <h3 className="pb-6 heading-18-semibold text-text-normal">
          지원자에 먼저 연락할 수 있어요 💬📞
        </h3>
        <p className="pb-4 body-14-regular text-text-normal">
          지원자에게 연락 후 면접을 진행해보세요.
          <br />
          면접을 마쳤다면, 다음 단계로 넘어갈 수 있어요.
        </p>
        <button
          className="w-full p-4 flex items-center gap-4 bg-surface-secondary rounded-lg text-start"
          onClick={() =>
            sendPhoneNumberToApp(data?.data?.applicant_phone_number)
          }
        >
          <RecruiterIcon />
          <div>
            <p className="pb-1 button-16-semibold text-text-strong">
              {data?.data?.applicant_name}
            </p>
            <p className="body-14-regular text-text-alternative">
              {data?.data?.applicant_phone_number}
            </p>
          </div>
        </button>
      </BottomSheet.Content>
      <BottomSheet.ButtonGroup
        variant={BottomSheet.ButtonGroupVariant.TWO_VERTICAL}
      >
        <Button
          type={Button.Type.PRIMARY}
          size={Button.Size.LG}
          isFullWidth
          title={'이미 면접을 완료했어요'}
          onClick={onClickComplete}
        />
        <Button
          type={Button.Type.NEUTRAL}
          size={Button.Size.LG}
          isFullWidth
          title={'나중에 할게요'}
          onClick={() => setIsShowBottomSheet(false)}
        />
      </BottomSheet.ButtonGroup>
    </BottomSheet>
  );
};

export default EmployerApplicantContactBottomSheet;
