import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';
import RecruiterIcon from '@/assets/icons/ApplicationDetail/RecruiterIcon.svg?react';
import {
  useGetEmployerApplicationSummary,
  usePatchInterviewFinish,
} from '@/hooks/api/useApplication';
import { useParams } from 'react-router-dom';
import { sendReactNativeMessage } from '@/utils/reactNativeMessage';

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
    <BottomSheetLayout
      hasHandlebar={true}
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <main className="p-3 w-full flex flex-col items-center text-center">
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
      </main>
      <footer className="w-full pt-6 flex flex-col gap-2">
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor={'bg-primary-normal'}
          fontColor="text-surface-invert"
          title={'이미 면접을 완료했어요'}
          isBorder={false}
          onClick={onClickComplete}
        />
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor={'bg-primary-neutral'}
          fontColor="text-surface-invert"
          title={'나중에 할게요'}
          isBorder={false}
          onClick={() => setIsShowBottomSheet(false)}
        />
      </footer>
    </BottomSheetLayout>
  );
};

export default EmployerApplicantContactBottomSheet;
